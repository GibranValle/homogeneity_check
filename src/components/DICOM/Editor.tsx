"use client"

import { useAppSelector } from "@/store"
import { updateViewport } from "@/store/DICOM/slice"
import { Box, Button, Paper, Slider, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';

export const Editor: FC = () => {

    const image = useAppSelector(state => state.dicom.image)
    const element = useAppSelector(state => state.dicom.element)
    const [bestCenter, setBestCenter] = useState<number>(2048)
    const [bestWidth, setBestWidth] = useState<number>(4096)

    const dispatch = useDispatch()

    const [center, setCenter] = useState(2048)
    const [width, setWidth] = useState(4096)

    const handleClick = () => {
        setCenter(Math.round(bestCenter))
        setWidth(Math.round(bestWidth))
        triggerChange(bestWidth, bestCenter)
        cornerstone.updateImage(element);
    }

    const triggerChange = (w: number = width, c: number = center) => {
        dispatch(updateViewport({ windowWidth: w, windowCenter: c }))
    }

    const handleChangeWidth = (event: Event, value: number | number[]) => {
        const val = value as number
        setWidth(val)
        triggerChange()
    }

    const handleChangeCenter = (event: Event, value: number | number[]) => {
        const val = value as number
        setCenter(val)
        triggerChange()
    }

    useEffect(() => {
        if (!element) return
        if (typeof image?.slope === 'undefined') return

        const state = cornerstoneTools.getToolState(element, 'RectangleRoi')
        const stats = state.data.find((item: any) => item.handles.uuid === 'Completo')
        const c = stats.cachedStats.mean
        const w = stats.cachedStats.mean * stats.cachedStats.stdDev / 100
        setBestCenter(c)
        setBestWidth(w)
    }, [image, element])



    return (
        <Box
            component={Paper} elevation={3}
            sx={{
                width: '100%',
                gap: 2,
                p: 2,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <Box sx={{ width: '100%' }}>
                <Typography gutterBottom>
                    {`Window center: ${center}`}
                </Typography>
                <Slider max={4096} min={0} value={center} onChange={handleChangeCenter} />
            </Box>

            <Box sx={{ width: '100%' }}>
                <Typography gutterBottom>
                    {`Window width: ${width}`}
                </Typography>
                <Slider value={width} max={4096} min={0} onChange={handleChangeWidth} />
            </Box>

            <Box>
                <Button variant="contained" onClick={handleClick}>Contrastar</Button>
            </Box>

        </Box>
    )
}
