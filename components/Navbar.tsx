import Image from 'next/image'
import { Toolbar, Box } from '@mui/material'
import AppBar from '@mui/material/AppBar'

export default function Navbar() {
  return (
    <AppBar sx={{ boxShadow: 'none' }}>
      <Toolbar
        sx={{
          backgroundColor: '#eee',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ position: 'relative', width: 140, height: 40 }}>
          <Image
            src="/logo.avif"
            alt="logo"
            objectFit="contain"
            fill
            loading="eager"
            priority
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
