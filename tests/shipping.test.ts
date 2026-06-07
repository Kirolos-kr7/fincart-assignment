import { describe, expect, it } from 'vitest'
import { calculateShippingCost, getCourierLimit } from '@/utils/shipping'

describe('getCourierLimit', () => {
  it('returns the smallest weight tier that fits the package', () => {
    expect(getCourierLimit(1, 8)).toMatchObject({ weight: 10, cost: 85, days: 6 })
    expect(getCourierLimit(1, 15)).toMatchObject({
      weight: 20,
      cost: 165,
      days: 9,
    })
  })

  it('uses the exact tier when weight matches a tier boundary', () => {
    expect(getCourierLimit(1, 10)).toMatchObject({ weight: 10, cost: 85 })
  })

  it('returns undefined when no tier supports the weight', () => {
    expect(getCourierLimit(1, 50)).toBeUndefined()
    expect(getCourierLimit(999, 10)).toBeUndefined()
  })
})

describe('calculateShippingCost', () => {
  it('calculates domestic cost with VAT and no international surcharge', () => {
    const result = calculateShippingCost({
      courierId: 1,
      weight: 8,
      isInternational: false,
    })

    expect(result).toEqual({
      baseCost: 85,
      cost: 85,
      costAfterVat: 95.2,
      days: 6,
    })
  })

  it('applies international surcharge before VAT', () => {
    const result = calculateShippingCost({
      courierId: 1,
      weight: 8,
      isInternational: true,
    })

    expect(result).toEqual({
      baseCost: 85,
      cost: 102,
      costAfterVat: 114.24,
      days: 6,
    })
  })

  it('selects the next weight tier when package exceeds the current tier', () => {
    const result = calculateShippingCost({
      courierId: 1,
      weight: 15,
      isInternational: false,
    })

    expect(result).toEqual({
      baseCost: 165,
      cost: 165,
      costAfterVat: 184.8,
      days: 9,
    })
  })

  it('returns zero cost and days when no tier is available', () => {
    const result = calculateShippingCost({
      courierId: 1,
      weight: 50,
      isInternational: false,
    })

    expect(result).toEqual({
      baseCost: 0,
      cost: 0,
      costAfterVat: 0,
      days: 0,
    })
  })
})
