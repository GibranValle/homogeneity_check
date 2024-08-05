'use client'

import { FILE_CHANGE, FILE_ERROR, NO_FILE } from "@/constants/file"
import { readFile } from "@/lib"
import { Box, Button, Typography } from "@mui/material"
import { ChangeEvent, FC, useState } from "react"
import dicomParser from "dicom-parser";
import { useDispatch } from "react-redux"
import { setImageId, toggleIsLoading, updateImage, updateInfo } from "@/store/DICOM/slice"
import { useAppSelector } from "@/store"
import { loadAndViewImageBlob } from "@/lib/initializeCornerstone"


export const Uploader: FC = () => {

    const dispatch = useDispatch()
    const [name, setName] = useState(NO_FILE)
    const imageId = useAppSelector(state => state.dicom.imageId)

    const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleIsLoading())
        const file = e.target.files![0]
        const loadedImageId = loadAndViewImageBlob(file);
        dispatch(setImageId(loadedImageId))
        setName(file.name)


        // const res = await fetch(API_POST_IMAGE, {
        //     method: 'POST',
        //     body: JSON.stringify({ base64String, name: 'newImage.dcm' })
        // })
        // // const { dicomPath } = await res.json()
        // const dicomPath = '/test.dcm'; // Ruta relativa a public
        // DICOM READ
        const base64String = await readFile(file) as string
        const base64Image = base64String.split(";base64,").pop();
        const dicomBuffer = Buffer.from(base64Image!, "base64");
        const dataSet = dicomParser.parseDicom(dicomBuffer);
        const KV = dataSet.string("x00180060") || '';
        const sensitivity = dataSet.string("x00186000") || '';
        const date = dataSet.string("x0018700c") || '';
        const filter = dataSet.string("x00187050") || '';
        const mode = dataSet.string("x00187060") || '';
        const serialNumber = dataSet.string("x00181000") || '';
        const version = dataSet.string("x00181020") || '';
        const exposure = dataSet.string("x00181152") || '';
        const grid = dataSet.string("x00181166") || '';
        const anode = dataSet.string("x00181191") || '';
        const thickness = dataSet.string("x001811a0") || '';
        const force = dataSet.string("x001811a2") || '';
        const paddle = dataSet.string("x001811a4") || '';
        const menu = dataSet.string("x00181400") || '';
        const presentation = dataSet.string("x00080068") || '';
        const modality = dataSet.string("x00080060") || '';
        const institution = dataSet.string("x00080080") || '';
        const station = dataSet.string("x00081010") || '';
        const patientName = dataSet.string("x00100010") || '';
        const pixelSpacing = dataSet.string("x00181164") || '';

        // console.log(dataSet.elements)
        // console.log(Object.values(dataSet.elements).length)
        // Object.keys(dataSet.elements).map(item => {
        //     console.log(item)
        // })

        //DATA FOR EDITOR
        const slope = parseInt(dataSet.string('x00281053') || '1');
        const intercept = parseInt(dataSet.string('x00281052') || '0');
        const windowCenter = parseInt(dataSet.string('x00281050') || '2048')
        const windowWidth = parseInt(dataSet.string('x00281051') || '4096')

        // DATA FROM IMAGE
        const imageWidth = dataSet.uint16("x00280011") || 0;
        const imageHeight = dataSet.uint16("x00280010") || 0;
        const pixelDataElement = dataSet.elements.x7fe00010;
        const bytesPerPixel = 2; // Para imágenes de 16 bits
        const pixelData = new Uint16Array(
            dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length / bytesPerPixel);

        dispatch(updateInfo({
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
            imageWidth
        }))

        dispatch(updateImage({
            name: file.name,
            imageWidth,
            imageHeight,
            pixelData,
            slope,
            windowCenter,
            windowWidth,
            intercept,
            file: file
        }))
        dispatch(toggleIsLoading())

    }

    return (
        <Box
            sx={{
                width: '100%',
                gap: 2,
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
            }}>
            <label htmlFor='Image'>
                <input
                    style={{ display: 'none' }}
                    id='Image'
                    name='Image'
                    type='file'
                    onChange={handleChangeImage} />
                <Button color='secondary' variant='contained' component='span'>
                    {name === NO_FILE ? FILE_ERROR : FILE_CHANGE}
                </Button>
            </label>
            <Typography>{name}</Typography>
        </Box>
    )
}
