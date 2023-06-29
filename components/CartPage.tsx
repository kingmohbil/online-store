import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../lib/store';
import { addItem, removeItem } from '@/lib/slices/cartSlice';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  IconButton,
  Button,
} from '@mui/material';
import { websiteName } from '../constants';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function CartPage() {
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {}, [cart]);
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
        <List>
          {cart.items.map((item, index) => {
            return (
              <>
                <ListItem key={index} sx={{ display: 'flex' }}>
                  <Typography
                    variant={'body1'}
                    fontWeight={500}
                    sx={{ fontSize: { xs: 16, sm: 18 } }}
                  >
                    {item.name}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexGrow: 1,
                      justifyContent: 'center',
                    }}
                  >
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
                  <Typography
                    variant={'body1'}
                    sx={{ fontSize: { xs: 16, sm: 18 } }}
                  >
                    JOD {item.price.toFixed(2)}
                  </Typography>
                </ListItem>
              </>
            );
          })}
          <Divider sx={{ pt: 1 }} />
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              variant={'body1'}
              fontWeight={500}
              sx={{ fontSize: { xs: 16, sm: 18 } }}
            >
              Total
            </Typography>
            <Typography
              variant={'body1'}
              fontWeight={500}
              sx={{ fontSize: { xs: 16, sm: 18 } }}
            >
              JOD {cart.total.toFixed(2)}
            </Typography>
          </ListItem>
          <ListItem sx={{ justifyContent: 'center' }}>
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
          </ListItem>
        </List>
      )}
    </>
  );
}

export default CartPage;
