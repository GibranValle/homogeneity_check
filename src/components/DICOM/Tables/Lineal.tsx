'use client'

import { BUTTON_CALC, LABEL_A, LABEL_B, TABLE_2_HEADERS, TITLE_TABLE_2 } from '@/constants/tables'
import { linealStats } from '@/interfaces/Statistics'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody, Box, TextField, Button } from '@mui/material'
import { ChangeEvent } from 'react'

type Props = {
    statistics: linealStats[]
    a: number
    b: number
    handleTextChange: (event: ChangeEvent<HTMLInputElement>) => void
    calcData: () => void
}

export const Lineal = ({ statistics, a, b, handleTextChange, calcData }: Props) => {

    return (
        <Box sx={{ flexDirection: 'column', display: 'flex' }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', gap: 1, p: 1, mb: 1 }}>
                <TextField sx={{ flex: '1 1 100px' }} label={LABEL_A} variant='filled' id='a' value={a} onChange={handleTextChange} />
                <TextField sx={{ flex: '1 1 100px' }} label={LABEL_B} variant='filled' id='b' value={b} onChange={handleTextChange} />
                <Button variant='contained' color='secondary' onClick={calcData}>{BUTTON_CALC}</Button>
            </Box>

            <TableContainer component={Paper} elevation={3} sx={{ p: 1 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={TABLE_2_HEADERS.length}>
                                <Typography align='center' color={'gray'} variant='h3'>{TITLE_TABLE_2}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            {
                                TABLE_2_HEADERS.map((item, index) =>
                                    <TableCell key={`t2-h-${index}`}>
                                        <Typography align='center' color={'gray'}>{item}</Typography>
                                    </TableCell>
                                )
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            statistics.map((item, index) => (
                                <TableRow key={`t2-r-${index}`}>
                                    <TableCell>
                                        <Typography align='center' variant='h6' color={item.color}>{item.roi}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography align='center' variant='h6' color={item.color}>{item.id.toUpperCase()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography align='center' variant='h6' color={item.color}>{item.vmp.toFixed(2)}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography align='center' variant='h6' color={item.color}>{item.dtp.toFixed(2)}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

            </TableContainer>
        </Box>
    )
}
