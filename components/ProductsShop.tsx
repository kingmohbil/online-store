import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import Flash from './FlashMessage';
import ProductCard from './Card';

function Store() {
  const products = useSelector((state: RootState) => state.products.products);

  const [flash, setFlash] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setFlash(false);
  };

  return (
    <>
      <Flash
        message="Cart Updated"
        duration={1000}
        handleClose={handleClose}
        active={flash}
      ></Flash>
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
                soldOut={!product.available}
                triggerAddToCart={() => {
                  setFlash(true);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

export default Store;
