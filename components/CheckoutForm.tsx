import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  Grid,
  Divider,
} from '@mui/material';
import ListingCart from '@/components/ListingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { websiteName } from '@/constants';

const textFieldStyles = {
  width: '100%',
};

function CheckoutForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
  });

  const handleBackClick = () => router.back();

  const handleFirstNameChange = (
    input: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({ ...formValues, firstName: input.target.value });
  };

  const handleLastNameChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, lastName: input.target.value });
  };

  const handleEmailChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, email: input.target.value });
  };

  const handlePhoneNumberChange = (
    input: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormValues({ ...formValues, phoneNumber: input.target.value });
  };

  const handleLocationChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, location: input.target.value });
  };

  const checkout = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Typography variant="h4" fontFamily="var(--elegant-font)" px={2}>
        {websiteName}
      </Typography>

      <IconButton aria-label="go back" sx={{ color: 'black' }}>
        <ArrowBackIcon onClick={handleBackClick} />
      </IconButton>
      <Box>
        <form onSubmit={checkout} id="checkout-form">
          <Grid container spacing={2} pt={2}>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="First Name*"
                  variant="filled"
                  value={formValues.firstName}
                  onChange={handleFirstNameChange}
                  sx={{ ...textFieldStyles }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Last Name*"
                  variant="filled"
                  value={formValues.lastName}
                  onChange={handleLastNameChange}
                  sx={{ ...textFieldStyles }}
                />
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Email*"
                  variant="filled"
                  value={formValues.email}
                  onChange={handleEmailChange}
                  sx={{ ...textFieldStyles }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Phone Number*"
                  variant="filled"
                  value={formValues.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  sx={{ ...textFieldStyles }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location*"
                variant="filled"
                value={formValues.location}
                onChange={handleLocationChange}
                sx={{ ...textFieldStyles }}
              />
            </Grid>
          </Grid>
        </form>
        <Box>
          <Typography variant="h5" pt={2} gutterBottom>
            ORDER SUMMARY
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <ListingCart />
          <Button
            type="submit"
            variant="contained"
            form="checkout-form"
            sx={{ width: '100%', mt: 2, p: 1.5 }}
          >
            Place Order
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CheckoutForm;
