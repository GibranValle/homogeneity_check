import { TABLE_1_HEADERS, TITLE_TABLE_1 } from '@/constants/tables'
import { stats } from '@/interfaces/Statistics'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody } from '@mui/material'
import React from 'react'

type Props = {
    statistics: stats[]
}

export const NoLineal = ({ statistics }: Props) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ p: 1, width: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={TABLE_1_HEADERS.length}>
                            <Typography align='center' color='grey' variant='h3'>{TITLE_TABLE_1}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        {
                            TABLE_1_HEADERS.map((item: string, index: number) => (
                                <TableCell key={`t1-h-${index}`}>
                                    <Typography color={'gray'} align='center' variant='h4'>{item}</Typography>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>

                <TableBody sx={{ display: statistics.length > 0 ? 'auto' : 'none' }}>
                    {
                        statistics.map((item: any, index: number) => (
                            <TableRow key={`t1-r-${index}`}>
                                <TableCell sx={{ p: 2 }}>
                                    <Typography color={item.color} variant='h6' align='center'>{index + 1}</Typography>
                                </TableCell>
                                <TableCell sx={{ p: 2 }}>
                                    <Typography color={item.color} variant='h6' align='center' sx={{ minWidth: '200px' }}>{item.id.toUpperCase()}</Typography>
                                </TableCell>
                                <TableCell sx={{ p: 2 }}>
                                    <Typography color={item.color} variant='h6' align='center'>{item.mean.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell sx={{ p: 2 }}>
                                    <Typography color={item.color} variant='h6' align='center'>{item.stdDev.toFixed(2)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
