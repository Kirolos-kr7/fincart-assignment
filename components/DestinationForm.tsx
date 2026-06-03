import { useFormStore } from '@/store/formStore'
import { DestinationDetails, destinationDetailsSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import countriesList from 'country-list'
import { useEffect } from 'react'
import CountriesSelect from './CountriesSelect'

export default function DestinationForm({
  onNext,
  onBack,
}: {
  onBack: () => void
  onNext: () => void
}) {
  const { destinationDetails, setDestinationDetails } = useFormStore()
  const countries = countriesList.getData()
  const form = useForm<DestinationDetails>({
    resolver: zodResolver(destinationDetailsSchema),
    defaultValues: destinationDetails,
  })

  const onSubmit = (data: DestinationDetails) => {
    setDestinationDetails(data)
    onNext()
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      setDestinationDetails(value as DestinationDetails)
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Grid
      container
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{
        maxWidth: 600,
        mx: 'auto',
      }}
      spacing={2}
    >
      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Receiver Details
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="destinationName"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              label="Full Name"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="destinationPhone"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              label="Phone"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
          Location
        </Typography>
      </Grid>

      <Grid size={12}>
        <Controller
          control={form.control}
          name="destinationCountry"
          render={({ field, fieldState }) => (
            <CountriesSelect field={field} fieldState={fieldState} />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="destinationCity"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              label="City"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="destinationAddress"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              fullWidth
              size="small"
              label="Address"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onBack}
        >
          Back
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Grid>
  )
}
