import React from 'react';
import { Paper, Box } from '@mui/material';
import CheckoutForm from '@/components/CheckoutForm';

function CheckoutPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          px: {
            xs: 2,
          },
          pt: {
            xs: 5,
          },
          pb: {
            xs: 3,
          },
          width: {
            xs: 290,
            sm: 590,
            md: 700,
          },
        }}
        elevation={10}
      >
        <Box>
          <CheckoutForm />
        </Box>
      </Paper>
    </Box>
  );
}

export default CheckoutPage;
