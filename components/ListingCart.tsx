import React from 'react';
import { Grid, Divider, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../lib/store';

interface PropsType {
  DeliveryFees?: number;
}

function CartList({ DeliveryFees }: PropsType) {
  const cart = useSelector((state: RootState) => state.cart);
  return (
    <>
      <Grid container spacing={1}>
        {cart.items.map((item) => (
          <Grid container item key={item.id}>
            <Grid item xs={8}>
              <Typography variant="body1" fontWeight={500}>
                {item.count} x {item.name}
              </Typography>
            </Grid>
            <Grid item xs={4} display="flex" justifyContent={'flex-end'}>
              <Typography fontWeight={300}>${item.price.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container item>
          <Grid item xs={8}>
            <Typography variant="body1" fontWeight={700}>
              Subtotal
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body1"
              fontWeight={300}
              display="flex"
              justifyContent={'flex-end'}
            >
              ${cart.total.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={8}>
            <Typography variant="body1" fontWeight={700}>
              Delivery Fees
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body1"
              fontWeight={300}
              display="flex"
              justifyContent={'flex-end'}
            >
              ${(DeliveryFees || 0).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        <Grid container item>
          <Grid item xs={8}>
            <Typography variant="body1" fontWeight={700}>
              Order Total
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="body1"
              fontWeight={300}
              display="flex"
              justifyContent={'flex-end'}
            >
              ${(cart.total + (DeliveryFees || 0)).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default CartList;
