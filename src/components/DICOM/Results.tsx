"use client"
//@ts-ignore
import cornerstoneTools from 'cornerstone-tools';

import { useAppSelector } from '@/store'
import { ChangeEvent, FC, useEffect, useState } from 'react'
import React from 'react';
import { Final, Lineal, NoLineal } from '.';
import { Box, CircularProgress, Typography } from '@mui/material';
import { linealStats, results, stats } from '@/interfaces/Statistics';
import { ERROR_IMAGE } from '@/constants/tables';

export const Results: FC = () => {
    const calcFinished = useAppSelector(state => state.dicom.calcFinished)
    const calcStarted = useAppSelector(state => state.dicom.calcStarted)
    const element = useAppSelector(state => state.dicom.element)
    const [statistics, setStatistics] = useState<stats[]>([])
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
        statistics.map((item, index) => {
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
        if (!calcFinished && !element) return
        const temp: any = []
        const state = cornerstoneTools.getToolState(element, 'RectangleRoi')
        state.data.map((item: any) => {
            temp.push({ ...item.cachedStats, id: item.handles.uuid, color: item.color })
        })
        setStatistics(temp)
    }, [calcFinished, element])

    useEffect(() => {
        if (!calcFinished) return
        calcData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statistics])

    useEffect(() => {
        if (!calcFinished) return
        calcResults()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [linealStatistics])

    if (calcFinished && isReady) return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <NoLineal statistics={statistics} />
            <Lineal statistics={linealStatistics} a={a} b={b} handleTextChange={handleTextChange} calcData={handleClick} />
            <Final statistics={results} />
        </Box>
    )

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {
                calcStarted ? <CircularProgress color='secondary' thickness={10} size={200} sx={{
                    animationDuration: '1000ms',
                }} /> :
                    <Typography align='center' color={'red'} variant='h2'>{ERROR_IMAGE}</Typography>
            }
        </Box>
    )
}