"use client"
import { initializeCornerstone } from '@/lib/initializeCornerstone';
import { useAppSelector } from '@/store';
import { setImageId } from '@/store/DICOM/slice';
import { CircularProgress } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
//@ts-ignore
import CornerstoneViewport from 'react-cornerstone-viewport'
import { useDispatch } from 'react-redux';
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core'


export const ViewerTest: FC = () => {

    const imageId = useAppSelector(state => state.dicom.imageId)
    const dispatch = useDispatch()
    const isLoading = useAppSelector(state => state.dicom.isLoading)
    const viewportRef = useRef(null);

    const [count, setCount] = useState(0);

    const handleMouseDown = () => {
        console.log("count:", count);
    };

    useEffect(() => {
        initializeCornerstone()
        const dicomPath = '/newImage.dcm'; // Ruta relativa a public
        const imageId = `wadouri:${window.location.origin}${dicomPath}`;
        dispatch(setImageId(imageId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // useEffect(() => {
    //     const viewport: CornerstoneViewport = viewportRef.current
    //     if (!viewport || isLoading || !imageId) return
    //     const { element } = viewport
    //     const toolStateManager = cornerstoneTools.getElementToolStateManager(element);
    //     const toolState = toolStateManager.saveToolState();
    //     cornerstoneTools.clearToolState(element, 'RectangleRoi');
    //     cornerstone.loadImage(imageId).then(image => {
    //         const middleX = image.width / 2;
    //         const middleY = image.height / 2;
    //         const width = 100;
    //         const height = 100;

    //         const data = {
    //             visible: true,
    //             active: true,
    //             handles: {
    //                 start: { x: middleX - width / 2, y: middleY - height / 2, highlight: true, active: false },
    //                 end: { x: middleX + width / 2, y: middleY + height / 2, highlight: true, active: false },
    //                 initialRotation: 0,
    //                 textBox: {
    //                     active: false,
    //                     hasMoved: false,
    //                     movesIndependently: false,
    //                     drawnIndependently: false,
    //                     allowedOutsideImage: true,
    //                     hasBoundingBox: false,
    //                 },
    //             },
    //             color: 'white',
    //             invalidated: false,
    //         };

    //         cornerstoneTools.addToolState(element, 'RectangleRoi', data);
    //         cornerstone.updateImage(element);
    //     })

    //     console.log(toolStateManager)

    // }, [viewportRef, imageId, isLoading])


    return (
        <>
            {
                imageId ? isLoading ? <CircularProgress /> :
                    <CornerstoneViewport
                        ref={viewportRef}
                        viewport
                        tools={[
                            { name: 'Zoom', mode: 'active', modeOptions: { mouseButtonMask: 4 } },
                            { name: 'Pan', mode: 'active', modeOptions: { mouseButtonMask: 1 } },

                        ]}
                        // tools={[
                        //     { name: 'Zoom', mode: 'active', modeOptions: { mouseButtonMask: 1 } },
                        //     // { name: 'Wwwc', mode: 'active', modeOptions: { mouseButtonMask: 1 } },
                        //     { name: 'Pan', mode: 'active', modeOptions: { mouseButtonMask: 4 } },
                        // ]}
                        imageIds={[imageId]}
                        style={{ width: '100%', height: '100%' }}

                    /> : <></>
            }
        </>
    )
}
