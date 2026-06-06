'use client';
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useState } from 'react'
import Summary from '@/components/Summary'
import { useFormStore } from '@/store/formStore'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
const OriginForm = dynamic(() => import('@/components/OriginForm'))
const DestinationForm = dynamic(() => import('@/components/DestinationForm'))
const PackageForm = dynamic(() => import('@/components/PackageForm'))

const steps = ['Origin Details', 'Destination Details', 'Package Details']

export default function HomePage() {
  const originDetails = useFormStore((state) => state.originDetails)
  const destinationDetails = useFormStore((state) => state.destinationDetails)
  const packageDetails = useFormStore((state) => state.packageDetails)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => setActiveStep(activeStep - 1)

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && <OriginForm onNext={handleNext} />}
          {activeStep === 1 && (
            <DestinationForm onNext={handleNext} onBack={handleBack} />
          )}
          {activeStep === 2 && <PackageForm onBack={handleBack} />}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Summary
            order={{
              id: crypto.randomUUID(),
              originDetails,
              destinationDetails,
              packageDetails,
              createdAt: new Date(),
            }}
            step={activeStep}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
