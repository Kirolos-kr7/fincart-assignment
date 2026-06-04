import { useFormStore } from '@/store/formStore'
import { OriginDetails, originDetailsSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import CountriesSelect from './CountriesSelect'

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function OriginForm({ onNext }: { onNext: () => void }) {
  const { originDetails, setOriginDetails } = useFormStore()

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
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: -0.5 }}>
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
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: -0.5 }}>
          Location
        </Typography>
      </Grid>

      <Grid size={12}>
        <Controller
          control={form.control}
          name="originCountry"
          render={({ field, fieldState }) => (
            <CountriesSelect field={field} fieldState={fieldState} />
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
