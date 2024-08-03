"use client"
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { setUpdater } from '@/store/DICOM/slice';
import { Box, Button, CircularProgress } from '@mui/material';
import cornerstone from 'cornerstone-core';
//@ts-ignore
import cornerstoneMath from 'cornerstone-math';
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';

const MAX = Math.pow(2, 16)
const width = 4728;
const height = 5928;
const numPixels = width * height;
const pixelData = new Uint16Array(numPixels);
let index = 0;
for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        pixelData[index] = Math.random() * MAX;
        index++;
    }
}

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.init();


const ROI_SIZE_mm = 20
const OFFSET_mm = 20

export const Viewer: FC = () => {
    const elementRef = useRef<HTMLDivElement>(null)
    const [cornerstoneImage, setCornerStoneImage] = useState<any>(null)

    const dispatch = useDispatch()
    const image = useAppSelector(state => state.dicom.image)
    const isLoading = useAppSelector(state => state.dicom.isLoading)
    const info = useAppSelector(state => state.dicom.info)

    const pixelSpacingWidth = parseFloat(info.pixelSpacing.split('\\')[0])
    const pixelSpacingHeight = parseFloat(info.pixelSpacing.split('\\')[1])
    const roiWidth_pixel = ROI_SIZE_mm / pixelSpacingWidth
    const roiHeight_pixel = ROI_SIZE_mm / pixelSpacingHeight
    const X_pixel = info.imageWidth
    const Y_pixel = info.imageHeight
    const offset_x_pixel = OFFSET_mm / pixelSpacingWidth
    const offset_y_pixel = OFFSET_mm / pixelSpacingHeight

    const handleClick = () => {
        console.log('click')
        const element = elementRef.current




        const roiStates = [
            // IZQUIERDA ARRIBA
            {
                handles: {
                    start: { x: 50, y: offset_y_pixel, active: true, highlight: true, },
                    end: { x: roiWidth_pixel, y: roiWidth_pixel + offset_y_pixel, active: true, highlight: true, },
                    textBox: {
                        x: 0,
                        y: 0,
                        active: false,
                        hasMoved: false,
                        drawnIndependently: false,
                        movesIndependently: false,
                        allowedOutsideImage: true,
                        hasBoundingBox: false,
                    },
                },
                color: 'yellow',
                lineWidth: 5,
            },
            // // DERECHA ARRIBA
            // {
            //     handles: {
            //         start: { x: X_pixel - offset_x_pixel - roiWidth_pixel, y: offset_y_pixel, highlight: true, active: true },
            //         end: { x: X_pixel - offset_x_pixel, y: roiHeight_pixel + offset_y_pixel, highlight: true, active: true },
            //         textBox: {
            //             x: 200,
            //             y: 90,
            //             active: false,
            //             hasMoved: true,
            //             drawnIndependently: true,
            //             movesIndependently: false,
            //             allowedOutsideImage: true,
            //             hasBoundingBox: false,
            //             text: '1', // Add label "1"
            //         },
            //     },
            //     color: 'yellow',
            //     lineWidth: 5,
            // },
            // //CENTRO
            // {
            //     handles: {
            //         start: { x: (X_pixel - offset_x_pixel - roiWidth_pixel) / 2, y: (Y_pixel - offset_y_pixel - roiHeight_pixel) / 2, highlight: true, active: true },
            //         end: { x: (X_pixel - offset_x_pixel + roiWidth_pixel) / 2, y: (Y_pixel - offset_y_pixel + roiHeight_pixel) / 2, highlight: true, active: true },
            //         textBox: {
            //             x: 200,
            //             y: 90,
            //             active: false,
            //             hasMoved: true,
            //             drawnIndependently: true,
            //             movesIndependently: false,
            //             allowedOutsideImage: true,
            //             hasBoundingBox: false,
            //             text: '1', // Add label "1"
            //         },
            //     },
            //     color: 'yellow',
            //     lineWidth: 5,
            // },
            // //DERECHA ABAJO
            // {
            //     handles: {
            //         start: { x: X_pixel - offset_x_pixel - roiWidth_pixel, y: Y_pixel - offset_y_pixel - roiHeight_pixel, highlight: true, active: true },
            //         end: { x: X_pixel - offset_x_pixel, y: Y_pixel - offset_y_pixel, highlight: true, active: true },
            //         textBox: {
            //             x: 200,
            //             y: 90,
            //             active: false,
            //             hasMoved: true,
            //             drawnIndependently: true,
            //             movesIndependently: false,
            //             allowedOutsideImage: true,
            //             hasBoundingBox: false,
            //             text: '1', // Add label "1"
            //         },
            //     },
            //     color: 'yellow',
            //     lineWidth: 5,
            // },
            // //IZQUIERDA ABAJO
            // {
            //     handles: {
            //         start: { x: 0, y: Y_pixel - offset_y_pixel - roiHeight_pixel, highlight: true, active: true },
            //         end: { x: roiWidth_pixel, y: Y_pixel - offset_y_pixel, highlight: true, active: true },
            //         textBox: {
            //             x: 200,
            //             y: 90,
            //             active: false,
            //             hasMoved: true,
            //             drawnIndependently: true,
            //             movesIndependently: false,
            //             allowedOutsideImage: true,
            //             hasBoundingBox: false,
            //             text: '1', // Add label "1"
            //         },
            //     },
            //     color: 'yellow',
            //     lineWidth: 5,
            // },
        ]

        roiStates.forEach((toolState, index) => {
            console.log(toolState)
            // Use addToolState from cornerstoneTools global tool state manager
            cornerstoneTools.addToolState(element, 'RectangleRoi', toolState);
        });
        cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 0 });

        cornerstone.updateImage(element!);
    }

    // FUNCTION TO PASS TO 
    const updateViewport = (center: number, width: number) => {
        console.log('updating')
        const element = elementRef.current
        if (element) {
            const viewport = cornerstone.getViewport(element);
            if (viewport) {
                viewport.voi.windowWidth = width
                viewport.voi.windowCenter = center
                cornerstone.setViewport(element, viewport);
            }
        }
    }

    // RENDER TEST IMAGE
    useEffect(() => {
        const getPixelData = () => pixelData
        setCornerStoneImage({
            imageId: 'testImage',
            minPixelValue: 0,
            maxPixelValue: MAX,
            slope: 0.1,
            intercept: 0,
            windowCenter: Math.pow(2, 11),
            windowWidth: Math.pow(2, 12),
            render: cornerstone.renderGrayscaleImage,
            getPixelData: getPixelData,
            rows: height,
            columns: width,
            height: height,
            width: width,
            color: false,
            columnPixelSpacing: 1.0,
            rowPixelSpacing: 1.0,
            invert: false,
            sizeInBytes: numPixels * 2
        })
    }, []);

    // RENDER LOADED IMAGE
    useEffect(() => {
        if (image) {
            const { imageHeight, imageWidth, pixelData, name, slope, intercept, windowCenter, windowWidth } = image
            if (name === 'NA') return
            const width = imageWidth;
            const height = imageHeight;
            const numPixels = width * height;
            const getPixelData = () => pixelData
            const newImage = {
                imageId: 'UploadedImage',
                minPixelValue: 0,
                maxPixelValue: MAX,
                slope,
                intercept,
                windowCenter,
                windowWidth,
                render: cornerstone.renderGrayscaleImage,
                getPixelData: getPixelData,
                rows: height,
                columns: width,
                height: height,
                width: width,
                color: false,
                columnPixelSpacing: 1.0,
                rowPixelSpacing: 1.0,
                invert: false,
                sizeInBytes: numPixels * 2
            };
            setCornerStoneImage(newImage)
            const RectangleRoiTool = cornerstoneTools.RectangleRoiTool;
            cornerstoneTools.addTool(RectangleRoiTool, {
                configuration: {
                    renderDashed: false,
                    handleRadius: 6,
                    drawHandles: false,
                    shadow: true,
                    shadowColor: 'rgba(0, 0, 0, 0.75)',
                    color: 'yellow',
                },
            });
            cornerstoneTools.setToolActive('RectangleRoi', { mouseButtonMask: 0 });
        }
    }, [image]);

    useEffect(() => {
        const element = elementRef.current;
        if (element && cornerstoneImage) {
            if (image.name === 'NA') {
                cornerstone.enable(element);
                dispatch(setUpdater({ updateViewport }))
                cornerstone.displayImage(element, cornerstoneImage);
            }
            cornerstone.displayImage(element, cornerstoneImage);
        }
    }, [cornerstoneImage])

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
            <CircularProgress color="secondary" thickness={7} size={150}
                sx={{
                    position: 'absolute', animationDuration: '500ms', strokeLinecap: 'round',
                    display: isLoading ? 'inline-block' : 'none'
                }} />
            <Box sx={{ flex: '1 1 100px', width: '100%' }}>
                <div
                    ref={elementRef} id="dicomImage" style={{ width: '100%', height: '100%' }}>
                </div>
            </Box>
            <Button onClick={handleClick}>Calcular</Button>
        </Box>
    )
}