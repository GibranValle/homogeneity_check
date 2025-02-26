'use client'
import { AppBar, Toolbar, Typography } from '@mui/material'
import { usePathname } from 'next/navigation'

const NAVIGATION = [
	{ name: 'Homogeneidad', path: '/' },
	{ name: 'Colimación', path: '/collimation' },
	{ name: 'Teoría', path: '/theory' },
	{ name: 'Acerca de', path: '/about' },
]

export const Navbar = () => {
	const pathname = usePathname()

	const handleNavigation = (path: string) => {
		if (pathname !== path) {
			window.location.href = path // 🔄 Full refresh
		}
	}

	return (
		<AppBar position="sticky">
			<Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', height: '0' }} variant="dense">
				{NAVIGATION.map((item, index) => (
					<Typography
						key={`ni-${index}`}
						variant="h3"
						onClick={() => handleNavigation(item.path)}
						color={pathname === item.path ? 'white' : 'gray'}
						sx={{ cursor: 'pointer' }}
					>
						{item.name}
					</Typography>
				))}
			</Toolbar>
		</AppBar>
	)
}
