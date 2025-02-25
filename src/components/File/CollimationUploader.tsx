'use client'

import { CLEAN_IMAGE, FILE_ERROR, NO_FILE } from '@/constants/file'
import { readFile } from '@/lib'
import { Box, Button, Typography } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import dicomParser from 'dicom-parser'
import { useDispatch } from 'react-redux'
import { setCollimatorImageId, updateCollimationImage } from '@/store/DICOM/slice'
import { loadAndViewImageBlob } from '@/lib/initializeCornerstone'
import { EMPTY_IMAGE } from '@/interfaces'
import { useAppSelector } from '@/store'

export const CollimationUploader: FC = () => {
	const dispatch = useDispatch()
	const collimatorImageId = useAppSelector((state) => state.dicom.collimatorImageId)
	const name = useAppSelector((state) => state.dicom.collimatorImage.name)

	const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		const loadedImageId = loadAndViewImageBlob(file)
		dispatch(setCollimatorImageId(loadedImageId))

		// DICOM READ
		const base64String = (await readFile(file)) as string
		const base64Image = base64String.split(';base64,').pop()
		const dicomBuffer = Buffer.from(base64Image!, 'base64')
		const dataSet = dicomParser.parseDicom(dicomBuffer as Uint8Array)

		//DATA FOR EDITOR
		const slope = parseInt(dataSet.string('x00281053') || '1')
		const intercept = parseInt(dataSet.string('x00281052') || '0')
		const windowCenter = parseInt(dataSet.string('x00281050') || '2048')
		const windowWidth = parseInt(dataSet.string('x00281051') || '4096')

		// DATA FROM IMAGE
		const imageWidth = dataSet.uint16('x00280011') || 0
		const imageHeight = dataSet.uint16('x00280010') || 0
		const pixelDataElement = dataSet.elements.x7fe00010
		const bytesPerPixel = 2 // Para imágenes de 16 bits
		const pixelData = new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / bytesPerPixel)

		dispatch(
			updateCollimationImage({
				name: file.name,
				imageWidth,
				imageHeight,
				pixelData,
				slope,
				windowCenter,
				windowWidth,
				intercept,
				file: file,
			})
		)
	}

	const handleClean = () => {
		dispatch(updateCollimationImage(EMPTY_IMAGE))
		dispatch(setCollimatorImageId(''))
	}

	if (collimatorImageId) {
		return (
			<Box
				sx={{
					width: '100%',
					gap: 2,
					display: 'flex',
					justifyContent: 'left',
					alignItems: 'center',
				}}
			>
				<Button sx={{ fontWeight: 600, fontSize: '1rem' }} color="error" variant="contained" component="span" onClick={handleClean}>
					{CLEAN_IMAGE}
				</Button>
				<Typography variant="h4">{name}</Typography>
			</Box>
		)
	}

	return (
		<Box
			sx={{
				width: '100%',
				gap: 2,
				display: 'flex',
				justifyContent: 'left',
				alignItems: 'center',
			}}
		>
			<label htmlFor="Image">
				<input style={{ display: 'none' }} id="Image" name="Image" type="file" onChange={handleChangeImage} />
				<Button sx={{ fontWeight: 600, fontSize: '1rem' }} color="secondary" variant="contained" component="span">
					{FILE_ERROR}
				</Button>
			</label>
			<Typography variant="h4">{NO_FILE}</Typography>
		</Box>
	)
}
