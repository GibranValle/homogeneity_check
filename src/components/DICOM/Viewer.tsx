"use client"
import { initializeCornerstone } from '@/lib/initializeCornerstone';
import { useAppSelector } from '@/store';
import { CircularProgress } from '@mui/material';
import React, { FC, useRef } from 'react';
//@ts-ignore
import CornerstoneViewport from 'react-cornerstone-viewport'
import { useDispatch } from 'react-redux';
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import { CustomEventType } from '@cornerstonejs/core/dist/types/types';
import cornerstone from 'cornerstone-core';




export const ViewerTest: FC = () => {
    const imageId = useAppSelector(state => state.dicom.imageId)
    const info = useAppSelector(state => state.dicom.info)

    const dispatch = useDispatch()
    const isLoading = useAppSelector(state => state.dicom.isLoading)
    const viewportRef = useRef(null)

    initializeCornerstone()

    const handleImageRendered = (event: CustomEventType) => {
        if (viewportRef.current) return
        const element = event.detail.element;
        viewportRef.current = element
        // const image = cornerstone.getImage(element)
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
        x_center = image_size_px[0] / 2 - roi_offset_px[0] + roi_size_px[0] / 2
        y_center = image_size_px[1] / 2 - roi_offset_px[1] + roi_size_px[0] / 2

        const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
        cornerstoneTools.addTool(RectangleRoiTool);
        cornerstoneTools.setToolPassive('RectangleRoi', {
            mouseButtonMask: 1
        })

        const commonProps = {
            lineDash: [5, 3],
            color: 'yellow',
            invalidated: true,
            unit: '',
        }

        const textBox = {
            active: true,
            movesIndependently: true,
            drawnIndependently: true,
            allowedOutsideImage: true,
            x: -1000,
            y: -1000,
            moving: false,
            hasBoundingBox: true,
            boundingBox: {
                height
                    :
                    65,
                left
                    :
                    -1000,
                top
                    :
                    -1000,
                width
                    :
                    150.9033203125
            }
        }

        const roiToolData = [
            {
                handles:
                {
                    uuid: 'torax-izquierda',
                    start: { x: x_left, y: y_top, active: false, moving: false, highlight: true },
                    end: { x: x_left + roi_size_px[0], y: y_top + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox
                },
                ...commonProps
            },
            {
                handles:
                {
                    uuid: 'torax-derecha',
                    initialRotation: 0,
                    start: { x: x_left, y: y_bottom, active: false, moving: false, highlight: true },
                    end: { x: x_left + roi_size_px[0], y: y_bottom + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                    color: 'yellow', // Color del rectángulo
                },
                ...commonProps
            },
            {
                handles:
                {
                    uuid: 'fondo-izquierda',
                    initialRotation: 0,
                    start: { x: x_right, y: y_top, active: false, moving: false, highlight: true },
                    end: { x: x_right + roi_size_px[0], y: y_top + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                    color: 'yellow', // Color del rectángulo
                },
                ...commonProps
            },
            {
                handles:
                {
                    uuid: 'fondo-derecha',
                    initialRotation: 0,
                    start: { x: x_right, y: y_bottom, active: false, moving: false, highlight: true },
                    end: { x: x_right + roi_size_px[0], y: y_bottom + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                    color: 'yellow', // Color del rectángulo
                },
                ...commonProps

            },
            {
                handles:
                {
                    uuid: 'centro',
                    initialRotation: 0,
                    start: { x: x_center, y: y_center, active: false, moving: false, highlight: true },
                    end: { x: x_center + roi_size_px[0], y: y_center + roi_size_px[1], active: false, moving: false, highlight: true },
                    textBox,
                    active: false,
                    hasMoved: false,
                    color: 'yellow', // Color del rectángulo
                },
                ...commonProps

            },
            {
                handles:
                {
                    uuid: 'completo',
                    initialRotation: 0,
                    start: { x: x_left, y: y_top, active: false, moving: false, highlight: true },
                    end: { x: image_size_px[0] - roi_offset_px[0], y: image_size_px[1] - roi_offset_px[1], active: false, moving: false, highlight: true },
                    textBox,
                },
                ...commonProps,
                color: 'green'
            },
        ]

        roiToolData.map(item => cornerstoneTools.addToolState(element, 'RectangleRoi', item))

        // renderTool.renderToolData = (evt: CustomEventType) => {
        //     const { eventData } = evt.detail;
        //     const { handleRadius, color, handleColor } = eventData;
        //     eventData.toolData.data.forEach((data: any) => {
        //         data.handles.textBox = null;  // Hide textBox
        //     });

        //     originalRenderTool(evt);
        // };
        cornerstone.updateImage(element);
    }

    const handleMeasured = (event: CustomEventType) => {
        // return
        const element = event.detail.element;
        const b = cornerstoneTools.getToolState(element, 'RectangleRoi')
        console.log(b)
    }


    return (
        <>
            {
                imageId ? isLoading ? <CircularProgress /> :
                    <CornerstoneViewport
                        viewport
                        // tools={tools}
                        imageIds={[imageId]}
                        style={{ width: '100%', height: '100%' }}
                        eventListeners={
                            [
                                {
                                    target: 'element',
                                    eventName: 'cornerstoneimagerendered',
                                    handler: handleImageRendered
                                },
                                {
                                    target: 'element',
                                    eventName: 'cornerstonetoolsmeasurementmodified',
                                    handler: handleMeasured
                                },
                            ]
                        }
                    /> : <></>
            }
        </>
    )
}
