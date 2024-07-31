import { type_info } from '@/interfaces/Uploader'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { FC } from 'react'

type Props = {
    info: type_info
}

export const Chart: FC<Props> = ({ info }) => {
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