import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './Card';

const Store: React.FC = () => {
  return (
    <>
      <Grid pt={{ sm: 5 }} spacing={2} container justifyContent="center">
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
        <Grid item>
          <ProductCard />
        </Grid>
      </Grid>
    </>
  );
};

export default Store;
