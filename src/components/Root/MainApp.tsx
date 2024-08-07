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

            <Card>
                <Uploader />
                <Chart />
                <Editor />
            </Card>

            <Card>
                <Viewer />
            </Card>

            <Card>
                <Results />
            </Card>

        </Box>
    );
}


