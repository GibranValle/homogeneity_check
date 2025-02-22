'use client'
import { initializeCornerstone } from '@/lib/initializeCornerstone'
import { useAppSelector } from '@/store'
import React, { FC, useRef } from 'react'
//@ts-ignore
import CornerstoneViewport from 'react-cornerstone-viewport'
import { useDispatch } from 'react-redux'
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools'
import { CustomEventType } from '@cornerstonejs/core/dist/types/types'
import cornerstone from 'cornerstone-core'
import { setElement, setInnerRoi, updateStatistics } from '@/store/DICOM/slice'
import { commonProps, ROI_1, ROI_2, ROI_3, ROI_4, ROI_5, ROI_6, textBox } from '@/constants/roi'
import { ERROR_IMAGE } from '@/constants/tables'
import { Box, CircularProgress, Paper, Typography } from '@mui/material'
import { stats } from '@/interfaces'
import { QUICK_GUIDE, QUICK_GUIDE_COLLIMATION } from '@/constants'

export const CollimationViewer: FC = () => {
	const imageId = useAppSelector((state) => state.dicom.imageId)
	const statistics = useAppSelector((state) => state.dicom.statistics)

	const info = useAppSelector((state) => state.dicom.info)
	const viewportRef = useRef(null)
	const dispatch = useDispatch()

	initializeCornerstone()

	const calcData = async () => {
		if (!viewportRef.current) return
		const temp: any[] = []
		const state = cornerstoneTools.getToolState(viewportRef.current, 'RectangleRoi')
		const image = await cornerstone.loadImage(imageId)
		state.data.map((measurementData: any) => {
			const { color, handles } = measurementData
			const { start, end, uuid } = handles
			const { width, height } = image
			const { rows, columns } = image
			// Convertir las coordenadas a índices dentro de la imagen
			const startX = Math.max(Math.floor(start.x), 0)
			const startY = Math.max(Math.floor(start.y), 0)
			const endX = Math.min(Math.floor(end.x), columns)
			const endY = Math.min(Math.floor(end.y), rows)
			let sum = 0
			let sumSquared = 0
			let count = 0

			// Iterar sobre los píxeles dentro del ROI
			for (let y = startY; y < endY; y++) {
				for (let x = startX; x < endX; x++) {
					const pixelValue = image.getPixelData()[y * width + x]
					sum += pixelValue
					sumSquared += pixelValue * pixelValue
					count++
				}
			}

			const mean = sum / count
			const variance = sumSquared / count - mean * mean
			const stdDev = Math.sqrt(variance)
			const a: stats = { id: uuid, mean, stdDev, color }
			// stats.push({ id: uuid, mean, stdDev })
			temp.push(a)
		})
		dispatch(updateStatistics(temp))
	}

	const getCollimatedField = async () => {
		if (!viewportRef.current) return
		const image = await cornerstone.loadImage(imageId)
		const { width, height } = image

		// FIRST RUN TO FUN MAXIMUMS
		// get max
		let maxVerticalOnX = 0
		let maxVertical = -Infinity
		for (let x = 0; x < width; x++) {
			const y = width / 2
			const pixelValue = image.getPixelData()[y * width + x]
			if (pixelValue > maxVertical) {
				maxVertical = pixelValue
				maxVerticalOnX = x
			}
		}

		// get max
		let maxHorizontalOnY = 0
		let maxHorizontal = -Infinity
		for (let y = 0; y < height; y++) {
			const x = height / 2
			const pixelValue = image.getPixelData()[y * width + x]
			if (pixelValue > maxHorizontal) {
				maxHorizontal = pixelValue
				maxHorizontalOnY = y
			}
		}

		// SECOND RUN FOR FIND BORDERS
		// ------------------ VERTICAL RUN -------------------------
		let startX = 0
		let endX = 0
		let targetValueVertical = maxVertical - (6 * maxVertical) / 100
		// LEFT TO RIGHT
		for (let x = 0; x < width; x++) {
			const y = width / 2
			const pixelValue = image.getPixelData()[y * width + x]
			if (pixelValue >= targetValueVertical) {
				console.log(x, pixelValue, targetValueVertical)
				startX = x
				break
			}
		}
		// RIGHT TO LEFT
		targetValueVertical = maxVertical - (10 * maxVertical) / 100
		for (let x = width; x > startX; x--) {
			const y = width / 2
			const pixelValue = image.getPixelData()[y * width + x]
			if (pixelValue >= targetValueVertical) {
				console.log(x, pixelValue, targetValueVertical)
				endX = x
				break
			}
		}

		// --------------------- HORIZONTAL RUN --------------------
		let targetValueHorizontal = maxHorizontal - (12 * maxHorizontal) / 100
		let startY = 0
		let endY = 0
		// TOP TO BOTTOM
		for (let y = 0; y < height; y++) {
			const x = height / 2
			const pixelValue = image.getPixelData()[y * width + x]
			if (pixelValue > targetValueHorizontal) {
				startY = y
				console.log(y, pixelValue, targetValueVertical)
				break
			}
		}
		// BOTTOM TO TOP
		targetValueHorizontal = maxHorizontal - (6 * maxHorizontal) / 100
		for (let y = height; y > startY; y--) {
			const x = height / 2
			const pixelValue = image.getPixelData()[y * width + x]
			if (pixelValue > targetValueHorizontal) {
				endY = y
				console.log(y, pixelValue, targetValueVertical)
				break
			}
		}
		console.log(`maxHorizontal: ${maxHorizontal} on ${maxHorizontalOnY}`)
		console.log(`maxVertical: ${maxVertical} on ${maxVerticalOnX}`)

		console.log(`rect found on ${startX}, ${startY}, ${endX}, ${endY}`)
		dispatch(setInnerRoi({ startX, startY, endX, endY }))
		return { startX, startY, endX, endY }
	}

	const handleImageRendered = async (event: CustomEventType) => {
		// unlimited renders fixed!
		if (viewportRef.current) return
		const element = event.detail.element
		viewportRef.current = element
		dispatch(setElement(element))
		const { pixelSpacing, imageWidth, imageHeight } = info
		const x_factor = parseFloat(pixelSpacing.split('\\')[0])
		const y_factor = parseFloat(pixelSpacing.split('\\')[1])
		const results = await getCollimatedField()
		if (!results) return
		const { startX, startY, endX, endY } = results
		console.log(startX, startY, endX, endY)
		const roiToolData = [
			{
				handles: {
					uuid: ROI_1,
					start: { x: startX, y: startY, active: false, moving: false, highlight: true },
					end: { x: endX, y: endY, active: false, moving: false, highlight: true },
					textBox,
				},
				...commonProps,
				color: 'orange',
			},
		]

		roiToolData.map((item) => cornerstoneTools.addToolState(element, 'RectangleRoi', item))
		cornerstone.updateImage(element)
		await calcData()
	}

	if (imageId)
		return (
			<Box sx={{ position: 'relative', flex: '1 1 100px' }}>
				<CornerstoneViewport
					viewport
					// tools={tools}
					imageIds={[imageId]}
					style={{ height: '850px' }}
					eventListeners={[
						{
							target: 'element',
							eventName: 'cornerstoneimagerendered',
							handler: handleImageRendered,
						},
					]}
				/>
				{statistics.length === 0 ? (
					<CircularProgress
						thickness={7} // Aumenta el grosor de la línea
						size={200} // Aumenta el tamaño del círculo de progreso
						color="secondary"
						sx={{
							position: 'absolute',
							zIndex: 1,
							top: '40%',
							left: '40%',
						}}
					/>
				) : (
					<></>
				)}
			</Box>
		)

	return (
		<Box sx={{ flex: '1 1 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
			<Typography align="center" color={'red'} variant="h2">
				{ERROR_IMAGE}
			</Typography>
			<>
				{QUICK_GUIDE_COLLIMATION.map((value, index) => (
					<Typography sx={{ my: 0.5 }} align="justify" variant="h5" key={`qg-${index}`}>
						{value}
					</Typography>
				))}
			</>
		</Box>
	)
}
