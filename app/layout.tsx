import { Box } from '@mui/material'
import Providers from './providers'
import Navbar from '@/components/Navbar'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          <Box component="main" sx={{ marginTop: 6, paddingBlock: 4 }}>
            {props.children}
          </Box>
        </Providers>
      </body>
    </html>
  )
}
