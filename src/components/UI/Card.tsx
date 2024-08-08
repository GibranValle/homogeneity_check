import { Box } from "@mui/material"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
    proportion?: number
    maxWidth?: number
}
export const Card = ({ children, proportion = 1, maxWidth = 700 }: Props) => {
    return (
        <Box sx={{
            flex: `${proportion} 1 100px`,
            maxWidth,
            maxHeight: 1300,
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 100,
            minHeight: 900
        }}>
            {children}
        </Box>
    )
}
