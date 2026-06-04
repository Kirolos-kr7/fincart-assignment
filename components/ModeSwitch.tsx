'use client';
import { useColorScheme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';

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
