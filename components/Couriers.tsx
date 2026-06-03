import {
  Alert,
  Badge,
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import { money } from '@/utils/money'
import { useFormStore } from '@/store/formStore'
import { Info } from '@mui/icons-material'
import {
  COURIER_DETAILS,
  COURIERS_LIMITS,
  INTERNATIONAL_RATE,
  VAT,
} from '@/utils/couriers'
import { calculateShippingCost } from '@/utils/shipping'
import { useEffect, useState } from 'react'

export default function Couriers({
  selectedCourierId,
  setSelectedCourierId,
}: {
  selectedCourierId: number | null
  setSelectedCourierId: (courierId: number | null) => void
}) {
  const { originDetails, destinationDetails, packageDetails } = useFormStore()
  const originCountry = originDetails.originCountry
  const destinationCountry = destinationDetails.destinationCountry
  const isInternational = originCountry !== destinationCountry

  const [initial, setInitial] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [courierDetails, setCourierDetails] = useState<typeof COURIER_DETAILS>(
    [],
  )
  const [courierLimits, setCourierLimits] = useState<typeof COURIERS_LIMITS>([])

  useEffect(() => {
    loadCouriers()
  }, [])

  const loadCouriers = async () => {
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    if (!initial) {
      setCourierDetails(COURIER_DETAILS)
      setCourierLimits(COURIERS_LIMITS)
      setError(null)
    } else {
      setError('Failed to load couriers')
      setInitial(false)
    }

    setLoading(false)
  }

  const filteredCouriers = courierDetails
    .filter(
      (courier) =>
        (courier.countries.includes(originCountry) ||
          courier.countries.includes('*')) &&
        (courier.countries.includes(destinationCountry) ||
          courier.countries.includes('*')),
    )
    .filter((courier) => {
      const limits = courierLimits.filter(
        (limit) =>
          limit.courierId === courier.id &&
          limit.weight >= packageDetails.weight,
      )
      return limits.length > 0
    })

  useEffect(() => {
    if (!filteredCouriers.length) setSelectedCourierId(null)
  }, [packageDetails.weight])

  let cheapestId = 0
  let cheapestCost = Infinity
  courierLimits
    .filter((limit) => limit.weight >= packageDetails.weight)
    .forEach((limit) => {
      if (limit.cost < cheapestCost) {
        cheapestCost = limit.cost
        cheapestId = limit.courierId
      }
    })

  let fastestId = 0
  let fastestDays = Infinity
  courierLimits
    .filter((limit) => limit.weight >= packageDetails.weight)
    .forEach((limit) => {
      if (limit.days < fastestDays) {
        fastestDays = limit.days
        fastestId = limit.courierId
      }
    })

  const renderCourierDetails = (courier: (typeof COURIER_DETAILS)[0]) => {
    const { cost, days } = calculateShippingCost({
      courierId: courier.id,
      weight: packageDetails.weight,
      isInternational,
    })

    return (
      <>
        <Typography variant="body1" sx={{ fontWeight: '500', fontSize: 14 }}>
          {money(cost)} + {(cost * VAT).toFixed(2)} (VAT)
        </Typography>

        <Typography variant="body2" sx={{ fontSize: 12 }}>
          Estimated delivery {days} day
        </Typography>
      </>
    )
  }

  const selectedCourierPricing =
    selectedCourierId != null
      ? calculateShippingCost({
          courierId: selectedCourierId,
          weight: packageDetails.weight,
          isInternational,
        })
      : null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 3 }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: -1 }}>
        Couriers{' '}
        {isInternational
          ? '(International + ' + INTERNATIONAL_RATE * 100 + '%)'
          : '(Domestic)'}
      </Typography>

      <Grid container spacing={2}>
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6 }}>
              <Skeleton
                variant="rectangular"
                sx={{ borderRadius: 2 }}
                height={100}
              />
            </Grid>
          ))
        ) : !filteredCouriers.length ? (
          error ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                py: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  width: '100%',
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              >
                There was an issue while loading the couriers
              </Typography>
              <Button variant="contained" onClick={loadCouriers}>
                Retry
              </Button>
            </Box>
          ) : (
            <Typography
              variant="body1"
              sx={{
                width: '100%',
                color: 'text.secondary',
                textAlign: 'center',
                py: 3,
              }}
            >
              No couriers available
            </Typography>
          )
        ) : (
          <>
            {filteredCouriers.map((courier: (typeof COURIER_DETAILS)[0]) => (
              <Grid
                key={courier.id}
                size={{ xs: 12, sm: 6 }}
                sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
              >
                <Button
                  key={courier.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    border: '1px solid #ccc',
                    padding: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor:
                      selectedCourierId === courier.id
                        ? 'ButtonShadow'
                        : 'transparent',
                    transition: 'background-color 0.3s ease',
                    color: 'text.primary',
                  }}
                  onClick={() => setSelectedCourierId(courier.id)}
                >
                  <ExtraBadge
                    extra={
                      courier.id === cheapestId
                        ? 'CHEAPEST'
                        : courier.id === fastestId
                          ? 'FASTEST'
                          : undefined
                    }
                  />
                  <Box
                    sx={{
                      position: 'relative',
                      width: 100,
                      height: 50,
                    }}
                  >
                    <Image
                      src={courier.image}
                      alt={courier.name}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {renderCourierDetails(courier)}
                  </Box>
                </Button>
              </Grid>
            ))}
          </>
        )}
      </Grid>

      {selectedCourierPricing && (
        <Alert
          variant="standard"
          sx={{ mt: 2, bgcolor: 'secondary.main' }}
          iconMapping={{
            success: <Info fontSize="small" sx={{ color: 'text.primary' }} />,
          }}
          slotProps={{
            icon: {
              sx: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            },
          }}
        >
          <Typography variant="body1" sx={{ fontSize: 16, fontWeight: '600' }}>
            Total after VAT: {money(selectedCourierPricing.costAfterVat)}
          </Typography>
        </Alert>
      )}
    </Box>
  )
}

const ExtraBadge = ({ extra }: { extra: string | undefined }) => {
  if (!extra) return null

  return (
    <Badge
      color={extra === 'FASTEST' ? 'error' : 'primary'}
      sx={{
        position: 'absolute',
        top: '0',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
      badgeContent={<Typography sx={{ fontSize: 12 }}>{extra}</Typography>}
    />
  )
}
