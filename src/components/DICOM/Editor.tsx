"use client"

import { type_image } from "@/interfaces/Uploader"
import { Box, Button, Paper, Slider, Typography } from "@mui/material"
import { FC, useEffect, useState } from "react"

type Props = {
    image: type_image
    updateViewPort: (width: number, center: number) => void
}

export const Editor: FC<Props> = ({ image, updateViewPort }) => {
    const [center, setCenter] = useState(2048)
    const [width, setWidth] = useState(4096)

    const handleChangeWidth = (event: Event, value: number | number[]) => {
        const val = value as number
        setWidth(val)
        updateViewPort(val, center)

    }

    const handleChangeCenter = (event: Event, value: number | number[]) => {
        const val = value as number
        setCenter(val)
        updateViewPort(width, val)

    }

    useEffect(() => {
        if (typeof image?.slope === 'undefined') return
        const { slope, windowCenter, windowWidth, intercept } = image
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
