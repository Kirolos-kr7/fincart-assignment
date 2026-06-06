'use client';

import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

export default function ModeSwitch() {
  const { setMode } = useColorScheme()

  return (
    <Box suppressHydrationWarning sx={{ display: 'inline-flex' }}>
      <IconButton
        onClick={() => setMode('dark')}
        aria-label="Switch to dark mode"
        sx={{
          display: 'none',
          'html:not(.dark) &': { display: 'inline-flex' },
        }}
      >
        <DarkMode />
      </IconButton>
      <IconButton
        onClick={() => setMode('light')}
        aria-label="Switch to light mode"
        sx={{
          display: 'none',
          'html.dark &': { display: 'inline-flex' },
        }}
      >
        <LightMode />
      </IconButton>
    </Box>
  )
}
