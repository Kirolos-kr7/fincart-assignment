'use client'

import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { useState } from 'react'
import { Container, Grid } from '@mui/material'
import OrginForm from '@/components/OrginForm'
import DestinationForm from '@/components/DestinationForm'
import PackageForm from '@/components/PackageForm'
import Summary from '@/components/Summary'
import { useFormStore } from '@/store/formStore'

const steps = ['Origin Details', 'Destination Details', 'Package Details']

export default function HomePage() {
  const { originDetails, destinationDetails, packageDetails } = useFormStore()
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

          {activeStep === 0 && <OrginForm onNext={handleNext} />}
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
