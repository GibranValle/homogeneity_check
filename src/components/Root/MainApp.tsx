"use client"

import { Box, Paper } from "@mui/material";
import { Card, Chart, Editor, Results, Uploader, Viewer } from '@/components'
import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

export default function MainApp() {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            flexWrap: 'wrap',
            padding: 2,
            gap: 2
        }}>

            <Card maxWidth={500}>
                <Uploader />
                <Chart />
                <Editor />
            </Card>

            <Card proportion={3}>
                <Viewer />
            </Card>

            <Card proportion={3}>
                <Results />
            </Card>

        </Box>
    );
}


