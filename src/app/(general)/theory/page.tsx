"use client"
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GLOSSARY, IMPORTANCE, METHODOLOGY, REFERENCES, ROI } from '@/constants/theory';
import Link from '@mui/material/Link';
import { TextBox } from '@/components';


export default function Theory() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            {/* GLOSARIO */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ py: 0, px: 3, margin: '0px !important' }}
                >
                    <Typography variant='h2'>Glosario</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0,
                        pb: 2,
                        px: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}>
                    {
                        GLOSSARY.map((item, index) => (
                            <TextBox key={index}>
                                <Typography variant='h4' sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Typography sx={{ lineHeight: 1.25, textAlign: 'justify' }}>
                                    {item.description}
                                </Typography>
                            </TextBox>
                        ))
                    }

                </AccordionDetails>
            </Accordion>
            {/* GLOSARIO */}

            {/* Importancia */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ py: 0, px: 3, margin: '0px !important' }}
                >
                    <Typography variant='h2'>
                        Importancia
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0,
                        pb: 2,
                        px: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}>
                    {
                        IMPORTANCE.map((item, index) => (
                            <TextBox key={index}>
                                <Typography variant='h4' sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Typography sx={{ lineHeight: 1.25, textAlign: 'justify' }}>
                                    {item.description}
                                </Typography>
                            </TextBox>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
            {/* Importancia */}

            {/* METHODOLOGY */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ py: 0, px: 3, margin: '0px !important' }}
                >
                    <Typography variant='h2'>
                        Metodología
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0,
                        pb: 2,
                        px: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}>
                    {
                        METHODOLOGY.map((item, index) => (
                            <TextBox key={index}>
                                <Typography variant='h4' sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Typography sx={{ lineHeight: 1.25, textAlign: 'justify' }}>
                                    {item.description}
                                </Typography>

                                {
                                    item.content.map((subitem, idx) => (
                                        <Typography key={`mc-${idx}`} sx={{ mb: 1 }}>
                                            <strong>{subitem.subtitle}:</strong> {subitem.text}
                                        </Typography>
                                    ))
                                }
                            </TextBox>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
            {/* METHODOLOGY */}

            {/* ROI */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ py: 0, px: 3, margin: '0px !important' }}
                >
                    <Typography variant='h2'>
                        Definición del ROI
                    </Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0,
                        pb: 2,
                        px: 2,
                        display: 'flex',
                        justifyContent: 'space-around',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}>
                    {
                        ROI.map((item, index) => (
                            <TextBox key={index}>
                                <Typography variant='h4' sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Typography sx={{ lineHeight: 1.25, textAlign: 'justify' }}>
                                    {item.description}
                                </Typography>

                                {
                                    item.content.map((subitem, idx) => (
                                        <Typography key={`mc-${idx}`} sx={{ mb: 1 }}>
                                            <strong>{subitem.subtitle}:</strong> {subitem.text}
                                        </Typography>
                                    ))
                                }
                            </TextBox>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
            {/* ROI */}


            {/* REFERENCIAS */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    sx={{ py: 0, px: 3, margin: '0px !important' }}
                >
                    <Typography variant='h2'>Referencias</Typography>
                </AccordionSummary>
                <AccordionDetails
                    sx={{
                        pt: 0,
                        pb: 2,
                        px: 2,
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}>
                    {
                        REFERENCES.map((item, index) => (
                            <TextBox key={index}>
                                <Typography variant='h4' sx={{ mb: 1 }}>
                                    {item.title}
                                </Typography>

                                <Typography sx={{ lineHeight: 1.25, textAlign: 'justify' }}>
                                    {item.description}
                                </Typography>

                                <Typography>
                                    [<Link href={item.url}>Disponible aquí</Link>]
                                </Typography>
                            </TextBox>
                        ))
                    }
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}


