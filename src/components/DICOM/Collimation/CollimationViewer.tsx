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
import { setElement, setInnerRoi } from '@/store/DICOM/slice'
import { commonProps, ROI_1, textBox } from '@/constants/roi'
import { ERROR_IMAGE } from '@/constants/tables'
import { Box, Typography } from '@mui/material'
import { QUICK_GUIDE_COLLIMATION } from '@/constants'

export const CollimationViewer: FC = () => {
	const collimatorImageId = useAppSelector((state) => state.dicom.collimatorImageId)

	const viewportRef = useRef(null)
	const dispatch = useDispatch()

	initializeCornerstone()

	const getCollimatedField = async () => {
		if (!viewportRef.current) return
		const image = await cornerstone.loadImage(collimatorImageId)
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
	}

	if (collimatorImageId)
		return (
			<Box sx={{ position: 'relative', flex: '1 1 100px' }}>
				<CornerstoneViewport
					viewport
					// tools={tools}
					imageIds={[collimatorImageId]}
					style={{ height: '850px' }}
					eventListeners={[
						{
							target: 'element',
							eventName: 'cornerstoneimagerendered',
							handler: handleImageRendered,
						},
					]}
				/>
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
