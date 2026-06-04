import { useFormStore } from '@/store/formStore'
import { PackageDetails, packageDetailsSchema } from '@/utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import Couriers from './Couriers'
import { useEffect, useState } from 'react'
import { useOrdersStore } from '@/store/ordersStore'
import { useSnackbar } from 'material-ui-snackbar-provider'
import { useRouter } from 'next/navigation'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function PackageForm({ onBack }: { onBack: () => void }) {
  const router = useRouter()
  const { showMessage } = useSnackbar()
  const { addOrder } = useOrdersStore()
  const {
    packageDetails,
    setPackageDetails,
    originDetails,
    destinationDetails,
  } = useFormStore()

  const form = useForm<PackageDetails>({
    resolver: zodResolver(packageDetailsSchema),
    defaultValues: packageDetails,
  })

  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: PackageDetails) => {
    setPackageDetails(data)
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (Math.random() > 0.5)
        throw new Error(
          'This is a simulated error happens 50% of the time \n Please try again',
        )

      addOrder({
        id: crypto.randomUUID(),
        originDetails: originDetails,
        destinationDetails: destinationDetails,
        packageDetails: data,
        createdAt: new Date(),
      })

      showMessage('Order created successfully')

      router.push('/orders')
    } catch (error: any) {
      showMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const subscription = form.watch((value) => {
      setPackageDetails(value as PackageDetails)
    })

    return () => subscription.unsubscribe()
  }, [form.watch])

  return (
    <Grid
      container
      component="form"
      onSubmit={form.handleSubmit(onSubmit, (errors) => {
        console.log(errors)
      })}
      sx={{
        maxWidth: 600,
        mx: 'auto',
      }}
      spacing={2}
    >
      <Grid size={12}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: -0.5 }}>
          Package
        </Typography>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="quantity"
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              onChange={(event) => {
                field.onChange(
                  event.target.value == '' ? '' : Number(event.target.value),
                )
              }}
              type="number"
              fullWidth
              size="small"
              label="Quantity"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="weight"
          render={({ field, fieldState }) => (
            <TextField
              type="number"
              {...field}
              onChange={(event) => {
                field.onChange(
                  event.target.value == '' ? '' : Number(event.target.value),
                )
              }}
              fullWidth
              size="small"
              label="Weight (kg)"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 12 }}>
        <Controller
          control={form.control}
          name="courierId"
          render={({ field, fieldState }) => (
            <>
              <Couriers
                selectedCourierId={field.value}
                setSelectedCourierId={(courierId) => field.onChange(courierId)}
              />

              <Typography variant="caption" sx={{ color: 'error.main', px: 2 }}>
                {fieldState.error?.message}
              </Typography>
            </>
          )}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Controller
          control={form.control}
          name="collectCash"
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} />}
              label="Collect Cash"
            />
          )}
        />
      </Grid>

      {form.watch('collectCash') && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            control={form.control}
            name="collectionAmount"
            render={({ field, fieldState }) => (
              <TextField
                value={field.value || ''}
                onChange={(event) => {
                  field.onChange(
                    event.target.value == '' ? '' : Number(event.target.value),
                  )
                }}
                fullWidth
                size="small"
                label="Collection Amount"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Grid>
      )}

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
          disabled={loading}
        >
          Back
        </Button>
        <Button
          disabled={form.watch('courierId') === null}
          type="submit"
          variant="contained"
          color="primary"
          loading={loading}
        >
          Submit
        </Button>
      </Box>
    </Grid>
  )
}
