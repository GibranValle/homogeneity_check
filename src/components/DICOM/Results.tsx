"use client"
//@ts-ignore
import { useAppSelector } from '@/store'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import React from 'react';
import { Final, Lineal, NoLineal } from '.';
import { Box, CircularProgress, Typography } from '@mui/material';
import { linealStats, results, stats } from '@/interfaces/Statistics';
import { ERROR_IMAGE } from '@/constants/tables';

export const Results: FC = () => {
    const statistics = useAppSelector(state => state.dicom.statistics)
    const imageId = useAppSelector(state => state.dicom.imageId)

    const [nonLinearStats, setNonLinearStats] = useState<stats[]>([])
    const [linealStatistics, setLinealStatistics] = useState<linealStats[]>([])
    const [results, setResults] = useState<results[]>([])
    const [isReady, setIsReady] = useState(false)
    const [a, setA] = useState(443.666666666667)
    const [b, setB] = useState(158.7511111)

    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target
        if (id === 'a') setA(parseFloat(value))
        else if (id === 'b') setB(parseFloat(value))
    }

    const handleClick = () => {

    }

    const calcData = () => {
        const newStatistics: linealStats[] = []
        nonLinearStats.map((item, index) => {
            const vmp = Math.exp(((item.mean) - b) / a)
            const dtp = vmp * item.stdDev / a
            newStatistics.push({ roi: index + 1, id: item.id, vmp, dtp, color: item.color })
        })
        setLinealStatistics(newStatistics)
    }

    const calcResults = () => {
        const rsr: number[] = []
        linealStatistics.map((item, index) => {
            if (index < linealStatistics.length - 1) rsr.push(item.vmp / item.dtp)
        })
        const sumRSR = rsr.reduce((prev, cur) => {
            prev = prev + cur
            return prev
        }, 0)
        const avgRSR = sumRSR / (linealStatistics.length - 1)
        console.log(avgRSR, sumRSR)
        const newResults: results[] = []
        rsr.map((item, index) => {
            const { roi, vmp, dtp, id, color } = linealStatistics[index]
            const stdDevRSR = 100 * (item - avgRSR) / avgRSR
            newResults.push({ roi, id, vmp, dtp, rsr: item, stdDevRSR, threshold: '< ±20', color })
        })
        setResults(newResults)
        setIsReady(true)
    }

    useEffect(() => {
        if (!statistics) return
        setNonLinearStats(statistics)
    }, [statistics])

    useEffect(() => {
        if (!statistics) return
        calcData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nonLinearStats])

    useEffect(() => {
        if (!nonLinearStats) return
        calcResults()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [linealStatistics])

    if (statistics.length > 0 && isReady) return (
        <Box sx={{
            flex: '1 1 100px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            justifyContent: 'space-around'
        }}>
            <NoLineal statistics={nonLinearStats} />
            <Lineal statistics={linealStatistics} a={a} b={b} handleTextChange={handleTextChange} calcData={handleClick} />
            <Final statistics={results} />
        </Box>
    )

    if (imageId) return (
        <Box sx={{ position: 'relative', flex: '1 1 100px' }}>
            <CircularProgress
                thickness={7} // Aumenta el grosor de la línea
                size={200} // Aumenta el tamaño del círculo de progreso
                color='secondary'
                sx={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '40%',
                    left: '40%',
                }} />
        </Box>
    )

    return (
        <Box sx={{ flex: '1 1 100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography align='center' color={'red'} variant='h2'>{ERROR_IMAGE}</Typography>
        </Box>
    )
}