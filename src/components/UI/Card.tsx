import { Box } from "@mui/material"
import { ReactNode } from "react"

type Props = {
    children: ReactNode
}
export const Card = ({ children }: Props) => {
    return (
        <Box sx={{
            flex: '1 1 100px',
            maxWidth: 700,
            maxHeight: 1300,
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: 500,
            minHeight: 900
        }}>
            {children}
        </Box>
    )
}
