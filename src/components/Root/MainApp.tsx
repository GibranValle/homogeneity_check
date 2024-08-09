"use client"

import { Box } from "@mui/material";
import { Card, Chart, Editor, Results, Uploader, Viewer } from '@/components'

export default function MainApp() {

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: {
                xs: 'start',
                md: 'center'
            },
            flexWrap: 'wrap',
            padding: 2,
            gap: 2,
            height: '100%',
        }}>

            <Card minWidth={450} maxWidth={450}>
                <Uploader />
                <Chart />
                <Editor />
            </Card>

            <Card proportion={4}>
                <Viewer />
            </Card>

            <Card proportion={2}>
                <Results />
            </Card>

        </Box>
    );
}


