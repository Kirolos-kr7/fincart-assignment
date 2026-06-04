'use client';
import theme from '@/app/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { SnackbarProvider } from 'material-ui-snackbar-provider'

import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            SnackbarProps={{
              autoHideDuration: 2000,
              anchorOrigin: { vertical: 'top', horizontal: 'right' },
            }}
          >
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  )
}
