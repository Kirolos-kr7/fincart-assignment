import { z } from 'zod'
import { getCodes } from 'country-list'

const countries = getCodes()

export const originDetailsSchema = z.object({
  originName: z.string().nonempty(),
  originPhone: z.string().nonempty(),
  originCountry: z.enum(countries),
  originCity: z.string().nonempty(),
  originAddress: z.string().nonempty(),
})

export const destinationDetailsSchema = z.object({
  destinationName: z.string().nonempty(),
  destinationPhone: z.string().nonempty(),
  destinationCountry: z.enum(countries),
  destinationCity: z.string().nonempty(),
  destinationAddress: z.string().nonempty(),
})

export const packageDetailsSchema = z.object({
  quantity: z.number().min(1),
  weight: z.number().min(1),
  collectCash: z.boolean(),
  collectionAmount: z.number(),
  courierId: z.number().min(1),
})

export type OriginDetails = z.infer<typeof originDetailsSchema>
export type DestinationDetails = z.infer<typeof destinationDetailsSchema>
export type PackageDetails = z.infer<typeof packageDetailsSchema>
export type Details = OriginDetails & DestinationDetails & PackageDetails
