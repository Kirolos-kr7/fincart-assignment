import {
  COURIERS_LIMITS,
  INTERNATIONAL_RATE,
  VAT,
} from '@/utils/couriers'

export function getCourierLimit(courierId: number, weight: number) {
  return COURIERS_LIMITS.find(
    (limit) => limit.courierId === courierId && limit.weight >= weight,
  )
}

export function calculateShippingCost({
  courierId,
  weight,
  isInternational,
}: {
  courierId: number
  weight: number
  isInternational: boolean
}) {
  const limit = getCourierLimit(courierId, weight)
  const baseCost = limit?.cost ?? 0
  const cost =
    baseCost + (isInternational ? baseCost * INTERNATIONAL_RATE : 0)
  const costAfterVat = cost + cost * VAT

  return {
    baseCost,
    cost,
    costAfterVat,
    days: limit?.days ?? 0,
  }
}
