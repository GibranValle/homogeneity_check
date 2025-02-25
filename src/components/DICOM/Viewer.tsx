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
import { setElement, updateStatistics } from '@/store/DICOM/slice'
import { commonProps, ROI_1, ROI_2, ROI_3, ROI_4, ROI_5, ROI_6, textBox } from '@/constants/roi'
import { Box, CircularProgress } from '@mui/material'
import { stats } from '@/interfaces'

export const Viewer: FC = () => {
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

	const handleImageRendered = async (event: CustomEventType) => {
		// unlimited renders fixed!
		if (viewportRef.current) return
		const laterality = info.laterality
		const element = event.detail.element
		viewportRef.current = element
		dispatch(setElement(element))
		const { pixelSpacing, imageWidth, imageHeight } = info
		const x_factor = parseFloat(pixelSpacing.split('\\')[0])
		const y_factor = parseFloat(pixelSpacing.split('\\')[1])

		const ROI_OFFSET_mm = 20
		const ROI_SIZE_mm = 20

		const roi_x_offset_px = ROI_OFFSET_mm / x_factor
		const roi_y_offset_px = ROI_OFFSET_mm / y_factor

		const roi_x_size_px = ROI_SIZE_mm / x_factor
		const roi_y_size_px = ROI_SIZE_mm / y_factor

		let x_left, y_top, x_right, y_bottom, x_center, y_center, roi_x_offset_px_end

		y_top = roi_y_offset_px
		y_bottom = imageHeight - roi_y_offset_px - roi_y_size_px
		y_center = (imageHeight - roi_y_offset_px) / 2

		let ROI_LEFT_TOP, ROI_RIGHT_TOP, ROI_LEFT_BOTTOM, ROI_RIGHT_BOTTOM

		let right_color, left_color

		// SMART DETECTION
		if (laterality === 'R') {
			x_left = roi_x_offset_px
			x_right = imageWidth - roi_x_offset_px
			x_center = (imageWidth - roi_x_size_px + roi_x_offset_px) / 2
			roi_x_offset_px_end = 0
			ROI_LEFT_TOP = ROI_4
			ROI_LEFT_BOTTOM = ROI_3
			ROI_RIGHT_TOP = ROI_2
			ROI_RIGHT_BOTTOM = ROI_1
			right_color = 'orange'
			left_color = 'white'
		} else {
			x_left = 0
			x_right = imageWidth - roi_x_offset_px - roi_x_size_px
			x_center = (imageWidth - roi_x_offset_px - roi_x_size_px) / 2
			roi_x_offset_px_end = roi_x_offset_px
			ROI_LEFT_TOP = ROI_1
			ROI_LEFT_BOTTOM = ROI_2
			ROI_RIGHT_TOP = ROI_3
			ROI_RIGHT_BOTTOM = ROI_4
			right_color = 'white'
			left_color = 'orange'
		}

		const roiToolData = [
			{
				handles: {
					uuid: ROI_LEFT_TOP,
					start: { x: x_left, y: y_top, active: false, moving: false, highlight: true },
					end: { x: x_left + roi_x_size_px, y: y_top + roi_y_size_px, active: false, moving: false, highlight: true },
					textBox,
				},
				...commonProps,
				color: left_color,
			},
			{
				handles: {
					uuid: ROI_RIGHT_TOP,
					initialRotation: 0,
					start: { x: x_right, y: y_top, active: false, moving: false, highlight: true },
					end: { x: x_right + roi_x_size_px, y: y_top + roi_y_size_px, active: false, moving: false, highlight: true },
					textBox,
					active: false,
					hasMoved: false,
				},
				...commonProps,
				color: right_color,
			},
			{
				handles: {
					uuid: ROI_5,
					initialRotation: 0,
					start: { x: x_center, y: y_center, active: false, moving: false, highlight: true },
					end: { x: x_center + roi_x_size_px, y: y_center + roi_y_size_px, active: false, moving: false, highlight: true },
					textBox,
					active: false,
					hasMoved: false,
				},
				...commonProps,
				color: 'darkGray',
			},
			{
				handles: {
					uuid: ROI_LEFT_BOTTOM,
					initialRotation: 0,
					start: { x: x_left, y: y_bottom, active: false, moving: false, highlight: true },
					end: { x: x_left + roi_x_size_px, y: y_bottom + roi_y_size_px, active: false, moving: false, highlight: true },
					textBox,
					active: false,
					hasMoved: false,
				},
				...commonProps,
				color: left_color,
			},

			{
				handles: {
					uuid: ROI_RIGHT_BOTTOM,
					initialRotation: 0,
					start: { x: x_right, y: y_bottom, active: false, moving: false, highlight: true },
					end: { x: x_right + roi_x_size_px, y: y_bottom + roi_y_size_px, active: false, moving: false, highlight: true },
					textBox,
					active: false,
					hasMoved: false,
				},
				...commonProps,
				color: right_color,
			},
			// COMPLETO
			{
				handles: {
					uuid: ROI_6,
					initialRotation: 0,
					start: { x: x_left, y: y_top, active: false, moving: false, highlight: true },
					end: { x: imageWidth - roi_x_offset_px_end, y: imageHeight - roi_y_offset_px, active: false, moving: false, highlight: true },
					textBox,
				},
				...commonProps,
				color: 'darkGray',
			},
		]

		roiToolData.map((item) => cornerstoneTools.addToolState(element, 'RectangleRoi', item))
		cornerstone.updateImage(element)
		await calcData()
	}

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
}
