import React, { useState } from 'react';
import {
  Typography,
  Box,
  FormControl,
  MenuItem,
  Autocomplete,
  TextField,
} from '@mui/material';
import { shopPageXMargins } from '../constants';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

const ShopBar: React.FC = () => {
  const [sortingMethod, setSortingMethod] = useState('most selling');
  const results = useSelector(
    (state: RootState) => state.products.products.length
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSortingMethod(event.target.value);
  };

  return (
    <>
      <Box
        sx={{
          ...shopPageXMargins,
          display: 'flex',
          borderBottom: '1px solid white',
          px: { xs: 0.1, sm: 4 },
          pb: 1,
        }}
      >
        <Box>
          <Typography
            component="h1"
            variant="h6"
            color="white"
            fontWeight={400}
          >
            Perfumes
          </Typography>
          <Typography
            pl={{ xs: 0, sm: 1 }}
            color="#fff9"
            fontSize={16}
            fontWeight={300}
          >
            1 - 10 of Results: {results}
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flex: 'auto',
            justifyContent: 'center',
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={['producr1']}
            sx={{
              width: { sm: 200, md: 300 },
              display: { xs: 'none', sm: 'flex' },
            }}
            renderInput={(params) => {
              console.log(params);
              return <TextField {...params} label="Search here" />;
            }}
          />
        </Box>

        <Box display="flex" alignItems="end">
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
    </>
  );
};

export default ShopBar;
