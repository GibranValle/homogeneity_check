'use client';

import * as React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/themes/theme';

interface ThemeRegistryProps {
    children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    );
}
