'use client'

import { Box } from '@mui/material'
import { Card, Chart, CollimationResults, CollimationViewer, Editor, Uploader } from '@/components'

export default function Collimation() {
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
				<Uploader />
				<Editor />
				<CollimationResults />
			</Card>

			<Card proportion={4}>
				<CollimationViewer />
			</Card>
		</Box>
	)
}
