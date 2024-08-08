"use client"

import { useAppSelector } from "@/store"
import { Box, Button, Paper, Slider, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';
import cornerstone from 'cornerstone-core';
import SearchIcon from '@mui/icons-material/Search';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import { ZOOM_LIST } from "@/constants/tools"

export const Editor: FC = () => {

    const image = useAppSelector(state => state.dicom.image)

    const element = useAppSelector(state => state.dicom.element)
    const [bestCenter, setBestCenter] = useState<number>(2048)
    const [bestWidth, setBestWidth] = useState<number>(4096)

    const [originalValues, setOriginalValues] = useState([2048, 4096])

    const [center, setCenter] = useState(2048)
    const [width, setWidth] = useState(4096)

    const handleContrast = () => {
        setCenter(Math.round(bestCenter))
        setWidth(Math.round(bestWidth))
        triggerChange(bestWidth, bestCenter)
        cornerstone.updateImage(element);
    }

    const handleOriginal = () => {
        const [c, w] = originalValues
        setCenter(c)
        setWidth(w)
        triggerChange(w, c)
        cornerstone.updateImage(element);
    }

    const updateViewport = (windowWidth: number, windowCenter: number) => {
        let viewport = cornerstone.getViewport(element)
        if (!viewport) return
        viewport.voi.windowWidth = windowWidth
        viewport.voi.windowCenter = windowCenter
        cornerstone.setViewport(element, viewport)
    }

    const updateZoom = (zoom: number) => {
        let viewport = cornerstone.getViewport(element)
        if (!viewport) return
        viewport.scale = zoom / 100
        cornerstone.setViewport(element, viewport)
    }

    const updateTranslation = (x: number, y: number) => {
        let viewport = cornerstone.getViewport(element)
        if (!viewport) return
        console.log(viewport)
        viewport.translation.x = x;
        viewport.translation.y = y;
        cornerstone.setViewport(element, viewport)
    }

    const handleCenter = () => updateTranslation(0, 0)

    const triggerChange = (w: number = width, c: number = center) => {
        updateViewport(w, c)
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
        setOriginalValues([image.windowCenter, image.windowWidth])
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
                gap: 1,
                p: 2,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <Box sx={{ width: '95%' }}>
                <Typography variant="h6">
                    {`Window center: ${center}`}
                </Typography>
                <Slider sx={{
                    p: 2
                }} max={4096} min={0} value={center} onChange={handleChangeCenter} />
            </Box>

            <Box sx={{ width: '95%' }}>
                <Typography variant="h6">
                    {`Window width: ${width}`}
                </Typography>
                <Slider sx={{
                    p: 2
                }} value={width} max={4096} min={0} onChange={handleChangeWidth} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <Button variant="contained" onClick={handleOriginal}>Original</Button>
                <Button variant="contained" onClick={handleContrast}>Contrastar</Button>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', gap: 2, mt: 1 }}>
                {
                    ZOOM_LIST.map((item, index) => (
                        <Button fullWidth key={`bz-${index}`} title={`${item}`} color="secondary" variant="contained" onClick={() => updateZoom(item)}><SearchIcon /> {item}%</Button>
                    ))
                }
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', gap: 2, mt: 1 }}>
                <Button fullWidth variant="contained" onClick={handleCenter}><ControlCameraIcon /> Centrar</Button>

            </Box>

        </Box>
    )
}
