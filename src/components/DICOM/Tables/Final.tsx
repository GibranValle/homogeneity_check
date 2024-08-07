'use client'

import { FAIL, SUCCESS, TABLE_3_HEADERS, TITLE_TABLE_3 } from '@/constants/tables'
import { results } from '@/interfaces/Statistics'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Typography, TableBody } from '@mui/material'

type Props = {
    statistics: results[]
}

export const Final = ({ statistics }: Props) => {

    return (
        <TableContainer component={Paper} elevation={3} sx={{ p: 1 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={TABLE_3_HEADERS.length}>
                            <Typography align='center' color={'gray'} variant='h3'>{TITLE_TABLE_3}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        {
                            TABLE_3_HEADERS.map((item, index) =>
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
                                <TableCell>
                                    <Typography align='center' variant='h6' color={item.color}>{item.rsr.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography align='center' variant='h6' color={item.color}>{item.stdDevRSR.toFixed(2)}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography align='center' variant='h6' color={item.color}>{item.threshold}</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography align='center' variant='h6' color={Math.abs(item.stdDevRSR) < 20 ? 'green' : 'red'}>{Math.abs(item.stdDevRSR) < 20 ? SUCCESS : FAIL}</Typography>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </TableContainer>
    )
}
