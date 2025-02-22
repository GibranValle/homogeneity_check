'use client'
import { AppBar, Toolbar, Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from 'next/navigation'

const NAVIGATION = [
    { name: 'Homogeneidad', path: '/' },
    { name: 'Colimación', path: '/collimation' },
    { name: 'Teoría', path: '/theory' },
    { name: 'Acerca de', path: '/about' }

]

export const Navbar = () => {
    const pathname = usePathname()
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', height: '0' }}
                variant="dense">
                {
                    NAVIGATION.map((item, index) => (
                        <Link key={`ni-${index}`} href={item.path}>
                            <Typography variant="h3" color={pathname === item.path ? 'white' : 'gray'}>
                                {item.name}
                            </Typography>
                        </Link>
                    ))
                }
            </Toolbar>
        </AppBar>
    )
}
