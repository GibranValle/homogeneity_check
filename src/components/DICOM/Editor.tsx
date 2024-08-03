"use client"

import { useAppSelector } from "@/store"
import { updateViewport } from "@/store/DICOM/slice"
import { Box, Paper, Slider, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export const Editor: FC = () => {

    const image = useAppSelector(state => state.dicom.image)
    const dispatch = useDispatch()

    const [center, setCenter] = useState(2048)
    const [width, setWidth] = useState(4096)

    const handleChangeWidth = (event: Event, value: number | number[]) => {
        const val = value as number
        setWidth(val)
        dispatch(updateViewport({ windowWidth: val, windowCenter: center }))

    }

    const handleChangeCenter = (event: Event, value: number | number[]) => {
        const val = value as number
        setCenter(val)
        dispatch(updateViewport({ windowWidth: width, windowCenter: val }))
    }

    useEffect(() => {
        if (typeof image?.slope === 'undefined') return
        const { windowCenter, windowWidth } = image
        setCenter(windowCenter)
        setWidth(windowWidth)
    }, [image])

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

        </Box>
    )
}
