"use client"

import { useAppSelector } from '@/store'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { FC } from 'react'


export const Chart: FC = () => {
    const info = useAppSelector(state => state.dicom.info)

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