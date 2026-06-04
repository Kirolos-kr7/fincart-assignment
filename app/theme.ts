'use client'
import { createTheme } from '@mui/material/styles'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#0164FA',
        },
        secondary: {
          main: '#E8FAF5',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#0164FA',
        },
        secondary: {
          main: '#212121',
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 20,
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

export default theme
