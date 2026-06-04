import countriesList from 'country-list'
import ReactCountryFlag from 'react-country-flag'
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CountriesSelect({
  field,
  fieldState,
}: {
  field: ControllerRenderProps<any, any>
  fieldState: ControllerFieldState
}) {
  const countries = countriesList.getData()
  const selectedCountry =
    countries.find((country) => country.code === field.value) ?? null

  return (
    <Autocomplete
      options={countries}
      fullWidth
      size="small"
      isOptionEqualToValue={(option, value) =>
        value == null || option.code === value.code
      }
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
      onChange={(_, value) => {
        field.onChange(value?.code ?? '')
      }}
      onBlur={field.onBlur}
      value={selectedCountry}
    />
  )
}
