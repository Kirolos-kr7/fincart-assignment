import { DestinationDetails, OriginDetails } from '@/utils/schema'
import { Autocomplete, TextField } from '@mui/material'
import countriesList from 'country-list'
import ReactCountryFlag from 'react-country-flag'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

export default function CountriesSelect({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState
}) {
  const countries = countriesList.getData()

  return (
    <Autocomplete
      options={countries}
      fullWidth
      size="small"
      isOptionEqualToValue={(option, value) => option.code === value.code}
      getOptionLabel={(option) => option.name.replace('(the)', '')}
      renderOption={(props, option) => (
        <li {...props} key={option.code}>
          <ReactCountryFlag
            key={option.code}
            countryCode={option.code}
            svg
            style={{ marginRight: 8 }}
          />
          {option.name.replace('(the)', '')}
        </li>
      )}
      renderValue={(value) => (
        <>
          <ReactCountryFlag
            countryCode={value?.code}
            svg
            style={{ marginLeft: 8, marginRight: 8 }}
          />
          {value?.name.replace('(the)', '')}
        </>
      )}
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
      value={countries.find((country) => country.code === field.value)}
    />
  )
}
