"use client"
import { initializeCornerstone } from '@/lib/initializeCornerstone';
import { useAppSelector } from '@/store';
import React, { FC, useRef } from 'react';
//@ts-ignore
import CornerstoneViewport from 'react-cornerstone-viewport'
import { useDispatch } from 'react-redux';
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import { CustomEventType } from '@cornerstonejs/core/dist/types/types';
import cornerstone from 'cornerstone-core';
import { setElement, updateStatistics } from '@/store/DICOM/slice';
import { commonProps, ROI_1, ROI_2, ROI_3, ROI_4, ROI_5, ROI_6, textBox } from '@/constants/roi';
import { ERROR_IMAGE } from '@/constants/tables';
import { Box, CircularProgress, Typography } from '@mui/material';
import { stats } from '@/interfaces';
import { QUICK_GUIDE } from '@/constants';
import { relative } from 'path';


export const Viewer: FC = () => {
    const imageId = useAppSelector(state => state.dicom.imageId)
    const statistics = useAppSelector(state => state.dicom.statistics)

    const info = useAppSelector(state => state.dicom.info)
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
        const element = event.detail.element;
        viewportRef.current = element
        dispatch(setElement(element))
        const { pixelSpacing, imageWidth, imageHeight } = info
        const x_factor = parseFloat(pixelSpacing.split('\\')[0])
        const y_factor = parseFloat(pixelSpacing.split('\\')[1])

        const ROI_OFFSET_mm = 20
        const ROI_SIZE_mm = 20

        const roi_offset_px = [ROI_OFFSET_mm / x_factor, ROI_OFFSET_mm / y_factor]
        const roi_size_px = [ROI_SIZE_mm / x_factor, ROI_SIZE_mm / y_factor]
        const image_size_px = [imageWidth, imageHeight]

        let x_left, y_top, x_right, y_bottom, x_center, y_center

        x_left = 0
        y_top = roi_offset_px[1]
        x_right = image_size_px[0] - roi_offset_px[0] - roi_size_px[0]
        y_bottom = image_size_px[1] - roi_offset_px[1] - roi_size_px[1]
        x_center = (image_size_px[0] - roi_offset_px[0] - roi_size_px[0]) / 2
        y_center = (image_size_px[1] - roi_offset_px[1] - roi_size_px[0]) / 2

        const roiToolData = [
            {
                handles:
                {
                    uuid: ROI_1,
                    start: { x: x_left, y: y_top, active: false, moving: false, highlight: true },
                    end: { x: x_left + roi_size_px[0], y: y_top + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox
                },
                ...commonProps,
                color: 'orange'
            },
            {
                handles:
                {
                    uuid: ROI_3,
                    initialRotation: 0,
                    start: { x: x_right, y: y_top, active: false, moving: false, highlight: true },
                    end: { x: x_right + roi_size_px[0], y: y_top + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                },
                ...commonProps,
                color: 'white'

            },
            {
                handles:
                {
                    uuid: ROI_5,
                    initialRotation: 0,
                    start: { x: x_center, y: y_center, active: false, moving: false, highlight: true },
                    end: { x: x_center + roi_size_px[0], y: y_center + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                },
                ...commonProps,
                color: 'darkGray'

            },
            {
                handles:
                {
                    uuid: ROI_2,
                    initialRotation: 0,
                    start: { x: x_left, y: y_bottom, active: false, moving: false, highlight: true },
                    end: { x: x_left + roi_size_px[0], y: y_bottom + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                },
                ...commonProps,
                color: 'orange'

            },

            {
                handles:
                {
                    uuid: ROI_4,
                    initialRotation: 0,
                    start: { x: x_right, y: y_bottom, active: false, moving: false, highlight: true },
                    end: { x: x_right + roi_size_px[0], y: y_bottom + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                },
                ...commonProps,
                color: 'white'


            },
            {
                handles:
                {
                    uuid: ROI_6,
                    initialRotation: 0,
                    start: { x: x_left, y: y_top, active: false, moving: false, highlight: true },
                    end: { x: image_size_px[0] - roi_offset_px[0], y: image_size_px[1] - roi_offset_px[1], active: false, moving: false, highlight: true },
                    textBox,
                },
                ...commonProps,
                color: 'darkGray'
            },
        ]

        roiToolData.map(item => cornerstoneTools.addToolState(element, 'RectangleRoi', item))
        cornerstone.updateImage(element);
        await calcData()
    }

    if (imageId) return (
        <Box sx={{ position: 'relative', flex: '1 1 100px' }}>
            <CornerstoneViewport
                viewport
                // tools={tools}
                imageIds={[imageId]}
                style={{ height: '100%' }}
                eventListeners={
                    [
                        {
                            target: 'element',
                            eventName: 'cornerstoneimagerendered',
                            handler: handleImageRendered
                        },
                    ]
                }
            />
            {
                statistics.length === 0 ?
                    <CircularProgress
                        thickness={7} // Aumenta el grosor de la línea
                        size={200} // Aumenta el tamaño del círculo de progreso
                        color='secondary'
                        sx={{
                            position: 'absolute',
                            zIndex: 1,
                            top: '40%',
                            left: '40%',
                        }} /> : <></>
            }
        </Box>
    )

    return (
        <Box sx={{ flex: '1 1 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography align='center' color={'red'} variant='h2'>{ERROR_IMAGE}</Typography>
            <>
                {
                    QUICK_GUIDE.map((value, index) => (
                        <Typography sx={{ my: 0.5 }} align='justify' variant='h5' key={`qg-${index}`}>{value}</Typography>
                    ))
                }
            </>
        </Box>
    )
}
