import React from 'react';
import {
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { mainPageXMargins } from '../constants';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const ShopBar: React.FC = () => {
  const [sortingMethod, setSortingMethod] = React.useState('most selling');

  const handleChange = (event: SelectChangeEvent) => {
    setSortingMethod(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          ...mainPageXMargins,
          borderBottom: '1px solid white',
          mt: 14,
          px: 4,
        }}
      >
        <Typography variant="h6" color="white" fontWeight={400}>
          Perfumes
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={1}
        >
          <Typography pl={1} color="#fff9" fontSize={16} fontWeight={300}>
            1 - 10 of Results: 700
          </Typography>
          <Box display="flex">
            <Box>
              <FormControl
                fullWidth
                sx={{
                  minWidth: 120,
                }}
              >
                <Select
                  sx={{
                    height: 30,

                    color: 'white',
                    fontWeight: 400,
                    fontSize: '14px',
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--gold-color) !important',
                      borderRadius: '20px',
                      outline: 'none',
                    },
                    '.MuiSvgIcon-root ': {
                      fill: 'var(--gold-color) !important',
                    },
                  }}
                  labelId="sorting-method"
                  id="sorting-method"
                  value={sortingMethod}
                  onChange={handleChange}
                >
                  <MenuItem value="most selling" defaultChecked>
                    Most Selling
                  </MenuItem>
                  <MenuItem value="highest rated">Highest rating</MenuItem>
                  <MenuItem value="high to low">Price: High to low </MenuItem>
                  <MenuItem value="low to high">Price: Low to high</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ShopBar;
