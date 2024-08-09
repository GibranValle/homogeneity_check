import { Box, Typography } from '@mui/material';
import Image from 'next/image';

export default function About() {
    return (
        <Box sx={{
            flex: '1 1 100px',
            width: '100%',
            display: 'flex', flexDirection: 'column', gap: 2, p: 2, justifyContent: 'center',
            px: 10,
            backgroundColor: 'lightgray'
        }}>
            <Typography color={'gray'} variant='h2'>
                Acerca de nosotros
            </Typography>

            <Typography color={'black'} variant='body1' textAlign={'justify'}>
                En <strong>Fujifilm de México [Healthcare]</strong>, nuestra línea de negocio dedicada a la mastografía se ha consolidado este año como una unidad independiente, marcando un emocionante nuevo capítulo en nuestra historia. Estamos comprometidos en establecer procesos y metodologías que garanticen la excelencia en cada uno de nuestros servicios.
            </Typography>

            <Typography color={'gray'} variant='h3'>
                Nuestro equipo
            </Typography>

            <Typography color={'black'} variant='body1'>
                Está conformado por 10 ingenieros altamente calificados en mastografía, así como por 2 técnicas radiólogas especializadas en la salud mamaria. Juntos, combinamos conocimientos técnicos avanzados y una dedicación profunda para ofrecer soluciones de la más alta calidad a nuestros clientes.
            </Typography>

            <Typography color={'gray'} variant='h3'>
                Nuestro líder
            </Typography>

            <Typography color={'black'} variant='body1'>
                <strong>Angel Reyes</strong>, con más de 11 años de experiencia en servicio técnico especializado, dirige nuestra unidad de mastografía. Su liderazgo y experiencia son fundamentales para guiar a nuestro equipo en la implementación de las mejores prácticas y en la búsqueda constante de la innovación y la mejora continua.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={'/background.png'} alt='bg' width={1000} height={500} />
            </Box>

        </Box>
    )
}


