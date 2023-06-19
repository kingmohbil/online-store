import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './Card';

const Store: React.FC = () => {
  return (
    <>
      <Grid pt={5} pl={10} spacing={2} container>
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
