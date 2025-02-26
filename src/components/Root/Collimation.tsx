'use client'

import { Box, Container, Paper, Typography } from '@mui/material'
import { Card, CollimationResults, CollimationUploader, CollimationViewer, CollimatorEditor } from '@/components'
import { QUICK_GUIDE_COLLIMATION } from '@/constants'
import { ERROR_IMAGE, INSTRUCTIONS } from '@/constants/tables'
import { useAppSelector } from '@/store'

export default function Collimation() {
	const imageId = useAppSelector((state) => state.dicom.imageId)

	if (!imageId)
		return (
			<Container sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Typography color={'red'} sx={{ my: 0.5 }} align="center" variant="h2">
					{ERROR_IMAGE}
				</Typography>

				<Paper sx={{ p: 2 }} elevation={2}>
					<CollimationUploader />
				</Paper>

				<Box component={Paper} elevation={1} sx={{ p: 2, flex: '1 1 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
					<Typography align="center" color={'green'} variant="h2">
						{INSTRUCTIONS}
					</Typography>
					{QUICK_GUIDE_COLLIMATION.map((value, index) => (
						<Typography sx={{ my: 0.5 }} align="justify" variant="h5" key={`qg-${index}`}>
							{value}
						</Typography>
					))}
				</Box>
			</Container>
		)
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-around',
				alignItems: {
					xs: 'start',
					md: 'center',
				},
				flexWrap: 'wrap',
				padding: 2,
				gap: 2,
				height: '100%',
			}}
		>
			<Card minWidth={450} maxWidth={450}>
				<CollimationUploader />
				<CollimatorEditor />
				<CollimationResults />
			</Card>

			<Card proportion={4}>
				<CollimationViewer />
			</Card>
		</Box>
	)
}
