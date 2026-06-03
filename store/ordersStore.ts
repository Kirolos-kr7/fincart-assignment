import {
  OriginDetails,
  DestinationDetails,
  PackageDetails,
} from '@/utils/schema'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Order {
  id: string
  originDetails: OriginDetails
  destinationDetails: DestinationDetails
  packageDetails: PackageDetails
  createdAt: Date
}

interface OrdersState {
  orders: Order[]
  addOrder: (order: Order) => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order: Order) =>
        set((state) => ({ orders: [...state.orders, order] })),
    }),
    {
      name: 'orders',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
