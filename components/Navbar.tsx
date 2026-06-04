import Image from 'next/image'
import AppBar from '@mui/material/AppBar'
import ModeSwitch from './ModeSwitch'

import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function Navbar() {
  return (
    <AppBar sx={{ boxShadow: 'none' }}>
      <Toolbar
        sx={{
          backgroundColor: 'secondary.main',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: 32,
            height: 32,
            display: { xs: 'block', sm: 'none' },
          }}
          component={Link}
          href="/"
        >
          <Image
            src={'/logo-sm.avif'}
            alt="logo"
            style={{ objectFit: 'contain' }}
            fill
            loading="eager"
            priority
            sizes="32px 32px"
          />
        </Box>

        <Box
          sx={{
            position: 'relative',
            width: 140,
            height: 40,
            display: { xs: 'none', sm: 'block' },
          }}
          component={Link}
          href="/"
        >
          <Image
            src={'/logo.avif'}
            alt="logo"
            style={{ objectFit: 'contain' }}
            fill
            loading="eager"
            priority
            sizes="140px 40px"
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link href="/">New Order</Link>
          <Link href="/orders">Orders</Link>
          <ModeSwitch />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
