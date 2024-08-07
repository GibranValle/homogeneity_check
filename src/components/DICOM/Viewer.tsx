"use client"
import { initializeCornerstone } from '@/lib/initializeCornerstone';
import { useAppSelector } from '@/store';
import React, { FC, useRef, useState } from 'react';
//@ts-ignore
import CornerstoneViewport from 'react-cornerstone-viewport'
import { useDispatch } from 'react-redux';
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import { CustomEventType } from '@cornerstonejs/core/dist/types/types';
import cornerstone from 'cornerstone-core';
import { setCalcFinished, setElement } from '@/store/DICOM/slice';
import { commonProps, ROI_1, ROI_2, ROI_3, ROI_4, ROI_5, ROI_6, textBox } from '@/constants/roi';


export const Viewer: FC = () => {
    const imageId = useAppSelector(state => state.dicom.imageId)
    const info = useAppSelector(state => state.dicom.info)
    const updater = useAppSelector(state => state.dicom.updater)

    const [isReady, setIsReady] = useState(false)

    const viewportRef = useRef(null)
    const dispatch = useDispatch()

    initializeCornerstone()

    const handleImageRendered = (event: CustomEventType) => {
        if (!updater) {

        }
        // last rendering detected!
        if (isReady) {
            dispatch(setCalcFinished())
        }
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
        x_center = image_size_px[0] / 2 - roi_offset_px[0] + roi_size_px[0] / 2
        y_center = image_size_px[1] / 2 - roi_offset_px[1] + roi_size_px[0] / 2

        const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
        cornerstoneTools.addTool(RectangleRoiTool);
        cornerstoneTools.setToolPassive('RectangleRoi', {
            mouseButtonMask: 1
        })

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
        setIsReady(true)
    }


    return (
        <>
            {
                imageId ?
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
                    /> : <></>
            }
        </>
    )
}
