import { Box, Paper } from "@mui/material"
import { ReactNode } from "react"

type Props = {
    key: number
    children: ReactNode
}

export const TextBox = ({ key, children }: Props) => {
    return (
        <Box key={`rc-${key}`} component={Paper} elevation={4}
            sx={{
                p: 2,
                flex: '1 1 100px',
                minWidth: {
                    xs: '100%',
                    sm: '100%',
                    md: '45%',
                    lg: '30%',
                    xl: '20%',
                },
                maxWidth: {
                    xs: '100%',
                    sm: '100%',
                    md: '48%',
                    lg: '32%',
                    xl: '24%',
                },
            }}>
            {children}
        </Box>
    )
}
