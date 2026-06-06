'use client';
import { Order, useOrdersStore } from '@/store/ordersStore'
import Summary from '@/components/Summary'

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function OrdersPage() {
  const orders = useOrdersStore((state) => state.orders)
  const clearOrders = useOrdersStore((state) => state.clearOrders)

  return (
    <Container>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
        Orders
      </Typography>

      {orders.length === 0 && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            my: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', textAlign: 'center' }}
          >
            No orders found, start by creating a new order
          </Typography>
          <Button variant="contained" color="primary" href="/">
            Create New Order
          </Button>
        </Box>
      )}

      <Box>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}

        {orders.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => clearOrders()}
            >
              Clear Orders
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  )
}

function OrderCard({ order }: { order: Order }) {
  if (!order) return null

  return (
    <Accordion variant="outlined">
      <AccordionSummary sx={{ backgroundColor: 'secondary.main' }}>
        <Box
          component="div"
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            gap: 2,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {order?.id}
          </Typography>

          <Typography variant="body2" sx={{ textAlign: 'center' }}>
            {order?.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : 'N/A'}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 2 }}>
        <Summary order={order} step={3} />
      </AccordionDetails>
    </Accordion>
  )
}
