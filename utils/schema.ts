import { z } from 'zod'
import { getCodes } from 'country-list'

const countries = getCodes()

export const originDetailsSchema = z.object({
  originName: z.string().nonempty({ message: 'Full name is required' }),
  originPhone: z.string().nonempty({ message: 'Phone is required' }),
  originCountry: z.enum(countries, { error: 'Country is required' }),
  originCity: z.string().nonempty({ message: 'City is required' }),
  originAddress: z.string().nonempty({ message: 'Address is required' }),
})

export const destinationDetailsSchema = z.object({
  destinationName: z.string().nonempty({ message: 'Full name is required' }),
  destinationPhone: z.string().nonempty({ message: 'Phone is required' }),
  destinationCountry: z.enum(countries, {
    error: 'Please select a valid country',
  }),
  destinationCity: z.string().nonempty({ message: 'City is required' }),
  destinationAddress: z.string().nonempty({ message: 'Address is required' }),
})

export const packageDetailsSchema = z.object({
  quantity: z.number().min(1, { message: 'Quantity is required' }),
  weight: z.number().min(1, { message: 'Weight is required' }),
  collectCash: z.boolean(),
  collectionAmount: z.number(),
  courierId: z.number().min(1, { message: 'Courier is required' }),
})

export type OriginDetails = z.infer<typeof originDetailsSchema>
export type DestinationDetails = z.infer<typeof destinationDetailsSchema>
export type PackageDetails = z.infer<typeof packageDetailsSchema>
export type Details = OriginDetails & DestinationDetails & PackageDetails
