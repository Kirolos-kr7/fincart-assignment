import {
  OriginDetails,
  DestinationDetails,
  PackageDetails,
} from '@/utils/schema'
import { create } from 'zustand'

interface FormState {
  originDetails: OriginDetails
  destinationDetails: DestinationDetails
  packageDetails: PackageDetails
  setOriginDetails: (data: OriginDetails) => void
  setDestinationDetails: (data: DestinationDetails) => void
  setPackageDetails: (data: PackageDetails) => void
}

export const useFormStore = create<FormState>((set) => ({
  originDetails: {
    originName: '',
    originPhone: '',
    originCountry: '',
    originCity: '',
    originAddress: '',
  },
  destinationDetails: {
    destinationName: '',
    destinationPhone: '',
    destinationCountry: '',
    destinationCity: '',
    destinationAddress: '',
  },
  packageDetails: {
    quantity: 1,
    weight: 0,
    courierId: 0,
    collectCash: false,
    collectionAmount: 0,
  },
  setOriginDetails: (data: OriginDetails) => set({ originDetails: data }),
  setDestinationDetails: (data: DestinationDetails) =>
    set({ destinationDetails: data }),
  setPackageDetails: (data: PackageDetails) => set({ packageDetails: data }),
}))
