"use client"

import { Box, Paper } from "@mui/material";
import { Chart, Editor, Results, Uploader, ViewerTest } from '@/components'

export default function MainApp() {

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
                <Uploader />
                <Chart />
                <Editor />
            </Box>

            <Box component={Paper} elevation={3}
                sx={{
                    height: '100%',
                    flex: '1 1 100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ViewerTest />

            </Box>
            {/* 
            <Box component={Paper} elevation={3}>
                <Results />
            </Box> */}

        </Box>
    );
}


