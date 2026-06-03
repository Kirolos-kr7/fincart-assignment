export const VAT = 0.12

export const COURIER_DETAILS = [
  {
    id: 1,
    name: 'Aramex',
    image: '/couriers/aramex.png',
    countries: ['EG', 'SA', 'AE'],
  },
  {
    id: 2,
    name: 'FedEx',
    image: '/couriers/fedex.avif',
    countries: ['*'],
  },
  {
    id: 3,
    name: 'J&T Express',
    image: '/couriers/jtexpress.png',
    countries: ['EG', 'SA', 'AE'],
  },
  {
    id: 4,
    name: 'PDC',
    image: '/couriers/pdc.avif',
    countries: ['*'],
  },
]

export const COURIERS_LIMITS = [
  {
    id: 1,
    courierId: 1,
    weight: 10,
    cost: 85,
    days: 6,
  },
  {
    id: 2,
    courierId: 1,
    weight: 20,
    cost: 165,
    days: 9,
  },
  {
    id: 3,
    courierId: 1,
    weight: 30,
    cost: 245,
    days: 12,
  },

  {
    id: 4,
    courierId: 2,
    weight: 10,
    cost: 120,
    days: 4,
  },
  {
    id: 5,
    courierId: 2,
    weight: 20,
    cost: 220,
    days: 6,
  },
  {
    id: 6,
    courierId: 2,
    weight: 30,
    cost: 310,
    days: 8,
  },
  {
    id: 7,
    courierId: 2,
    weight: 40,
    cost: 395,
    days: 11,
  },
  {
    id: 8,
    courierId: 3,
    weight: 10,
    cost: 70,
    days: 8,
  },
  {
    id: 9,
    courierId: 3,
    weight: 30,
    cost: 195,
    days: 13,
  },
  {
    id: 10,
    courierId: 3,
    weight: 40,
    cost: 255,
    days: 16,
  },
  {
    id: 11,
    courierId: 4,
    weight: 10,
    cost: 95,
    days: 5,
  },
  {
    id: 12,
    courierId: 4,
    weight: 20,
    cost: 175,
    days: 8,
  },
  {
    id: 13,
    courierId: 4,
    weight: 30,
    cost: 260,
    days: 11,
  },
].toSorted((a, b) => a.weight - b.weight)
