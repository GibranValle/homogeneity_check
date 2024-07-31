"use client"

import { type_image, EMPTY_IMAGE, type_info, EMPTY_INFO } from "@/interfaces/Uploader";
import { Box, Paper } from "@mui/material";
import { useState } from "react";
import { Chart, Editor, Uploader } from '@/components'
import * as cornerstone from 'cornerstone-core'

import dynamic from 'next/dynamic'

const Viewer = dynamic(() => import('../components/DICOM/Viewer'), { ssr: false })

export default function Home() {

  const [image, setImage] = useState<type_image>(EMPTY_IMAGE)
  const [info, setInfo] = useState<type_info>(EMPTY_INFO)
  const [viewPort, setViewPort] = useState<any>(null)
  const [element, setElement] = useState<any>(null)

  const updateViewPort = (width: number = 2048, center: number = 4096) => {
    viewPort!.voi.windowWidth = width;
    viewPort!.voi.windowCenter = center;
    cornerstone.setViewport(element, viewPort);
  }

  return (
    <Box component={Paper}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        p: 2,
        gap: 2,
        alignItems: 'start',
      }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'start',
        flex: '0 1 450px',
        gap: 2,
      }}>
        <Uploader setImage={setImage} setInfo={setInfo} />
        <Chart info={info} />
        <Editor image={image} updateViewPort={updateViewPort} />
      </Box>

      <Box component={Paper} elevation={3}
        sx={{
          height: '100%',
          flex: '1 1 100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Viewer image={image} cornerstone={cornerstone} setViewPort={setViewPort} setElement={setElement} updateViewPort={updateViewPort} />
      </Box>

    </Box>
  );
}


