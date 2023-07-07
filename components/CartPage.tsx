import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../lib/store';
import { addItem, removeItem } from '@/lib/slices/cartSlice';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button,
  Grid,
} from '@mui/material';
import { websiteName } from '../constants';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);
  const checkout = async () => {};

  const dispatch = useDispatch();
  useEffect(() => {});
  return (
    <>
      <Typography
        variant="h6"
        sx={{ my: 2, fontFamily: 'var(--elegant-font)' }}
      >
        {websiteName}
      </Typography>
      <Divider />
      {cart.items.length === 0 ? (
        <Typography variant="body1" pt={1}>
          The cart is empty.
        </Typography>
      ) : (
        <Grid container>
          {cart.items.map((item, index) => {
            return (
              <Grid key={index} container item px={2}>
                <Grid
                  item
                  xs={4}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    variant={'body1'}
                    fontWeight={500}
                    sx={{ fontSize: { xs: 12, sm: 18 } }}
                  >
                    {item.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      aria-label={`Remove Item ${item.name}`}
                      size="small"
                      onClick={() => {
                        dispatch(removeItem({ id: item.id }));
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: { xs: 16, sm: 18 } }}>
                      {item.count}
                    </Typography>
                    <IconButton
                      aria-label={`Add Item ${item.name}`}
                      size="small"
                      onClick={() => {
                        dispatch(
                          addItem({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                          })
                        );
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={4} display="flex" alignItems="center">
                  <Typography
                    variant={'body1'}
                    display="flex"
                    justifyContent="flex-end"
                    sx={{ fontSize: { xs: 12, sm: 18 }, flexGrow: 1 }}
                  >
                    JOD {item.price.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <Grid item xs={12}>
            <Divider sx={{ pt: 1 }} />
          </Grid>
          <Grid container item xs={12} px={2} py={2}>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-start'}>
              <Typography
                variant={'body1'}
                fontWeight={500}
                sx={{ fontSize: { xs: 16, sm: 18 } }}
              >
                Total
              </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
              <Typography
                variant={'body1'}
                fontWeight={500}
                sx={{ fontSize: { xs: 16, sm: 18 } }}
              >
                JOD {cart.total.toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Link href="/checkout">
              <Button
                variant="outlined"
                sx={{
                  borderColor: 'var(--gold-color)',
                  color: 'black',
                  fontWeight: 500,
                  fontSize: { xs: 16, sm: 18 },
                }}
              >
                Proceed to checkout
              </Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default CartPage;
