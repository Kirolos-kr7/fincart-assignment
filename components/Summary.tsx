import { Order } from '@/store/ordersStore'
import { COURIER_DETAILS } from '@/utils/couriers'
import { money } from '@/utils/money'
import { calculateShippingCost } from '@/utils/shipping'
import { Box, Typography } from '@mui/material'
import CountryFlag from 'react-country-flag'
import countriesList from 'country-list'

export default function Summary({
  order,
  step,
}: {
  order: Order
  step: number
}) {
  const { originDetails, destinationDetails, packageDetails } = order

  const selectedCourier = COURIER_DETAILS.find(
    (courier) => courier.id === packageDetails.courierId,
  )

  const isInternational =
    originDetails.originCountry !== destinationDetails.destinationCountry
  const { cost, costAfterVat, days } = calculateShippingCost({
    courierId: packageDetails.courierId,
    weight: packageDetails.weight,
    isInternational,
  })

  return (
    <Box
      sx={{
        backgroundColor: 'secondary.main',
        p: 2,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {step >= 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Origin
          </Typography>
          <Typography variant="body2">
            Name: {originDetails.originName}
          </Typography>
          <Typography variant="body2">
            Phone: {originDetails.originPhone}
          </Typography>
          <Typography variant="body2">
            Country:{' '}
            <CountryFlag
              countryCode={originDetails.originCountry}
              svg
              style={{
                width: '2em',
              }}
            />
            {countriesList
              .getName(originDetails.originCountry)
              ?.replace('(the)', '')}
          </Typography>
          <Typography variant="body2">
            City: {originDetails.originCity}
          </Typography>
          <Typography variant="body2">
            Address: {originDetails.originAddress}
          </Typography>
        </Box>
      )}

      {step >= 1 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', pt: 1, borderTop: '1px dashed #333' }}
          >
            Destination
          </Typography>
          <Typography variant="body2">
            Name: {destinationDetails.destinationName}
          </Typography>
          <Typography variant="body2">
            Phone: {destinationDetails.destinationPhone}
          </Typography>
          <Typography variant="body2">
            Country:{' '}
            <CountryFlag
              countryCode={destinationDetails.destinationCountry}
              svg
              style={{
                width: '2em',
              }}
            />
            {countriesList
              .getName(destinationDetails.destinationCountry)
              ?.replace('(the)', '')}
          </Typography>
          <Typography variant="body2">
            City: {destinationDetails.destinationCity}
          </Typography>
          <Typography variant="body2">
            Address: {destinationDetails.destinationAddress}
          </Typography>
        </Box>
      )}

      {step >= 2 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 'bold', pt: 1, borderTop: '1px dashed #333' }}
          >
            Package
          </Typography>
          <Typography variant="body2">
            Quantity: {packageDetails.quantity || 0}
          </Typography>
          <Typography variant="body2">
            Weight: {packageDetails.weight}
          </Typography>
          <Typography variant="body2">
            Courier: {selectedCourier?.name}
          </Typography>
          <Typography variant="body2">
            International: {isInternational ? 'Yes' : 'No'}
          </Typography>
          <Typography variant="body2">Cost: {money(cost)}</Typography>
          <Typography variant="body2">
            Cost after VAT: {money(costAfterVat)}
          </Typography>
          <Typography variant="body2">Days: {days}</Typography>
          <Typography variant="body2">
            Collect Cash: {packageDetails.collectCash ? 'Yes' : 'No'}
          </Typography>
          {packageDetails.collectCash && (
            <Typography variant="body2">
              Collection Amount: {packageDetails.collectionAmount}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  )
}
