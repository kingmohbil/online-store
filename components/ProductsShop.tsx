import React from 'react';
import { Grid } from '@mui/material';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import productType from '@/types/productType';

import ProductCard from './Card';

function Store() {
  const products = useSelector((state: RootState) => state.products.products);
  return (
    <>
      <Grid pt={{ sm: 5 }} spacing={2} container justifyContent="center">
        {products.map((product, index) => {
          return (
            <Grid item key={index}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={{
                  src: product.image,
                  alt: `${product.name} perfume`,
                }}
                text={product.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Store;
