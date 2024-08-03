"use client"

import { useAppSelector } from '@/store'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { FC } from 'react'

const ROI_SIZE_mm = 20
const ROI_NUM = 5

export const Results: FC = () => {

    const info = useAppSelector(state => state.dicom.info)

    const pixelSpacingWidth = parseFloat(info.pixelSpacing.split('\\')[0])
    const pixelSpacingHeight = parseFloat(info.pixelSpacing.split('\\')[1])
    const roiWidth_pixel = ROI_SIZE_mm / pixelSpacingWidth
    const roiHeight_pixel = ROI_SIZE_mm / pixelSpacingHeight

    return (
        <TableContainer component={Paper} elevation={3} sx={{ p: 1 }}>
            <Table>
                <TableHead>
                    <TableRow >
                        <TableCell >
                            <Typography align='center' variant='h5'>Parámetro</Typography>
                        </TableCell>

                        <TableCell>
                            <Typography align='center' variant='h5'>Valor</Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        Object.entries(info).map((item, index) => (
                            <TableRow key={`${index}`}>
                                <TableCell>
                                    <Typography align='right' >{item[0].toUpperCase()}</Typography>
                                </TableCell>
                                <TableCell sx={{ minWidth: 300 }}>
                                    <Typography align='left' variant='h6'>{item[1]}</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}