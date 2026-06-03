import { useFormStore } from '@/store/formStore'
import { OriginDetails, originDetailsSchema } from '@/utils/schema'
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
import { watch } from 'fs'

export default function OrginForm({ onNext }: { onNext: () => void }) {
  const { originDetails, setOriginDetails } = useFormStore()
  const countries = countriesList.getData()

  const form = useForm<OriginDetails>({
    resolver: zodResolver(originDetailsSchema),
    defaultValues: originDetails,
    context: {
      setOriginDetails: (data: OriginDetails) => {
        setOriginDetails(data)
        form.setValue('originName', data.originName)
        form.setValue('originPhone', data.originPhone)
        form.setValue('originCountry', data.originCountry)
        form.setValue('originCity', data.originCity)
        form.setValue('originAddress', data.originAddress)
      },
    },
  })

  const onSubmit = (data: OriginDetails) => {
    setOriginDetails(data)
    onNext()
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      setOriginDetails(value as OriginDetails)
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
          Sender Details
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="originName"
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
          name="originPhone"
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

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="originCountry"
          render={({ field, fieldState }) => (
            <>
              <Autocomplete
                options={countries}
                fullWidth
                size="small"
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                getOptionLabel={(option) => option.name.replace('(the)', '')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
                onChange={(event, value) => {
                  field.onChange(value?.code)
                }}
                value={countries.find(
                  (country) => country.code === field.value,
                )}
              />
            </>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="originCity"
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
          name="originAddress"
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

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </Grid>
  )
}
