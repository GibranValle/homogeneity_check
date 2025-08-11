'use client'

import { CLEAN_IMAGE, FILE_ERROR, NO_FILE } from '@/constants/file'
import { readFile } from '@/lib'
import { Box, Button, Typography } from '@mui/material'
import { ChangeEvent, FC } from 'react'
import dicomParser from 'dicom-parser'
import { useDispatch } from 'react-redux'
import { setImageId, setInnerRoi, updateImage, updateInfo } from '@/store/DICOM/slice'
import { loadAndViewImageBlob } from '@/lib/initializeCornerstone'
import { EMPTY_IMAGE, EMPTY_INFO } from '@/interfaces'
import { useAppSelector } from '@/store'

export const CollimationUploader: FC = () => {
	const dispatch = useDispatch()
	const imageId = useAppSelector((state) => state.dicom.imageId)
	const name = useAppSelector((state) => state.dicom.image.name)

	const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		const loadedImageId = loadAndViewImageBlob(file)
		dispatch(setImageId(loadedImageId))

		// DICOM READ
		const base64String = (await readFile(file)) as string
		const base64Image = base64String.split(';base64,').pop()
		const dicomBuffer = Buffer.from(base64Image!, 'base64')
		const dataSet = dicomParser.parseDicom(dicomBuffer as Uint8Array)
		const KV = dataSet.string('x00180060') || ''
		const exposure = dataSet.string('x00181152') || ''
		const date = dataSet.string('x0018700c') || ''
		const sensitivity = dataSet.string('x00186000') || ''
		const filter = dataSet.string('x00187050') || ''
		const mode = dataSet.string('x00187060') || ''
		const serialNumber = dataSet.string('x00181000') || ''
		const version = dataSet.string('x00181020') || ''
		const grid = dataSet.string('x00181166') || ''
		const anode = dataSet.string('x00181191') || ''
		const thickness = dataSet.string('x001811a0') || ''
		const force = dataSet.string('x001811a2') || ''
		const paddle = dataSet.string('x001811a4') || ''
		const menu = dataSet.string('x00181400') || ''
		const presentation = dataSet.string('x00080068') || ''
		const modality = dataSet.string('x00080060') || ''
		const institution = dataSet.string('x00080080') || ''
		const station = dataSet.string('x00081010') || ''
		const patientName = dataSet.string('x00100010') || ''
		const pixelSpacing = dataSet.string('x00181164') || ''
		const laterality = dataSet.string('x00200062') || ''

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
			updateImage({
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

		dispatch(
			updateInfo({
				KV,
				sensitivity,
				date,
				filter,
				mode,
				serialNumber,
				version,
				exposure,
				grid,
				anode,
				thickness,
				force,
				paddle,
				menu,
				presentation,
				modality,
				institution,
				station,
				patientName,
				pixelSpacing,
				imageHeight,
				imageWidth,
				laterality,
			})
		)
	}

	const handleClean = () => {
		dispatch(updateImage(EMPTY_IMAGE))
		dispatch(setImageId(''))
		dispatch(setInnerRoi(null))
		dispatch(updateInfo(EMPTY_INFO))
	}

	if (imageId) {
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
