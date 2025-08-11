'use client'
//@ts-ignore
import { useAppSelector } from '@/store'
import { FC, useEffect, useState } from 'react'
import React from 'react'
import { Box, Paper, TextField, Typography } from '@mui/material'
import { DICOM_HEIGHT, DICOM_WIDTH } from '@/constants/roi'

export const CollimationResults: FC = () => {
	const imageId = useAppSelector((state) => state.dicom.imageId)
	const innerRoi = useAppSelector((state) => state.dicom.inner_roi)
	const laterality = useAppSelector((state) => state.dicom.info.laterality)

	const [margin, setMargin] = useState<any>(null)

	useEffect(() => {
		if (!innerRoi || !laterality) return
		console.log(laterality)
		const { startX, startY, endX, endY } = innerRoi
		const right = startY * 0.05 + 4
		const left = (DICOM_HEIGHT - endY) * 0.05 + 4
		let front, back
		if (laterality === 'L') {
			front = startX * 0.05 + 4
			back = (DICOM_WIDTH - endX) * 0.05 + 4
		} else if (laterality === 'R') {
			back = startX * 0.05 + 4
			front = (DICOM_WIDTH - endX) * 0.05 + 4
		}
		console.log('lado: ', laterality)
		console.log(front, back)
		setMargin({ front, back, right, left })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [innerRoi, laterality])

	if (!innerRoi || !imageId || !margin) return null

	return (
		<Box
			component={Paper}
			elevation={2}
			sx={{ p: 2, display: 'flex', gap: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
		>
			<Typography variant="h3" textAlign={'right'} minWidth={'250px'}>
				{`Valores de ajuste del colimador`}
			</Typography>
			<Typography variant="h4" textAlign={'center'} minWidth={'250px'}>
				{`Laterality: ${laterality}`}
			</Typography>
			<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', gap: 3 }}>
				<Typography textAlign={'right'} minWidth={'250px'}>
					Right Side Blade [mm]: &#8593;
				</Typography>
				<TextField
					sx={{ input: { fontWeight: 700, color: 'white', fontSize: '1.25rem', textAlign: 'center' }, flex: '1 1 100px' }}
					value={`${margin.right.toFixed(2)}`}
					disabled
				/>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', gap: 3 }}>
				<Typography textAlign={'right'} minWidth={'250px'}>
					Left Side Blade [mm]: &#8595;
				</Typography>
				<TextField
					sx={{ input: { fontWeight: 700, color: 'white', fontSize: '1.25rem', textAlign: 'center' }, flex: '1 1 100px' }}
					value={`${margin.left.toFixed(2)}`}
					disabled
				/>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', gap: 3 }}>
				<Typography textAlign={'right'} minWidth={'250px'}>
					Front Side Blade [mm]: &#8594;
				</Typography>
				<TextField
					sx={{ input: { fontWeight: 700, color: 'white', fontSize: '1.25rem', textAlign: 'center' }, flex: '1 1 100px' }}
					value={`${margin.front.toFixed(2)}`}
					disabled
				/>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', gap: 3 }}>
				<Typography textAlign={'right'} minWidth={'250px'}>
					Back Side Blade [mm]: &#8592;
				</Typography>
				<TextField
					sx={{ input: { fontWeight: 700, color: 'white', fontSize: '1.25rem', textAlign: 'center' }, flex: '1 1 100px' }}
					value={`${margin.back.toFixed(2)}`}
					disabled
				/>
			</Box>
			<Typography variant="subtitle2" color={'warning.main'} textAlign={'justify'}>
				Nota: Valores de 4mm indican que no hubo colimación.
			</Typography>
		</Box>
	)
}
