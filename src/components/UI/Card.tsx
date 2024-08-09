import { Box } from "@mui/material"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
    proportion?: number
    minWidth?: number
    maxWidth?: number
}
export const Card = ({ children, proportion = 1, minWidth = 600, maxWidth = 800 }: Props) => {
    return (
        <Box sx={{
            flex: `${proportion} 1 100px`,
            minHeight: 850,
            minWidth: minWidth,
            maxWidth,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
        }}>
            {children}
        </Box>
    )
}
