'use client'

import theme from '@/app/theme'
import {
  CssBaseline,
  InitColorSchemeScript,
  ThemeProvider,
} from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { SnackbarProvider } from 'material-ui-snackbar-provider'

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
