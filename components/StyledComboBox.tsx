import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material';

const StyledAutocomplete = styled(Autocomplete)({
  '& #combo-box-label': {
    color: 'white',
  },

  '&.Mui-focused .MuiInputLabel-outlined': {
    color: 'var(--gold-color) !important',
  },
  '& .MuiAutocomplete-inputRoot': {
    color: 'white',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type ': {
      color: 'white',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--gold-color)',
    },

    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--gold-color)',
    },
    '.MuiSvgIcon-root ': {
      fill: 'var(--gold-color) !important',
    },
  },
});

interface PropsType {
  options: { label: string; id: string }[];
  styles?: {};
  label: string;
}

function StyledComboBox({ options, styles, label }: PropsType) {
  return (
    <>
      <StyledAutocomplete
        disablePortal
        id="combo-box"
        options={options}
        sx={{
          ...styles,
        }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    </>
  );
}

export default StyledComboBox;
