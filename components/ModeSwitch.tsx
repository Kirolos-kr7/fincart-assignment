'use client'

import { IconButton } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { DarkMode, LightMode } from '@mui/icons-material'

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme()
  if (!mode) {
    return null
  }
  return (
    <IconButton onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  )
}
