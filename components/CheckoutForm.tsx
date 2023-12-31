import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Button,
  Grid,
  Alert,
  Divider,
} from '@mui/material';
import ListingCart from '@/components/ListingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { websiteName } from '@/constants';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { clear } from '@/lib/slices/cartSlice';

const textFieldStyles = {
  width: '100%',
};

function CheckoutForm() {
  const cart = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const router = useRouter();
  // The state for the values of the inputs
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
  });

  // The error State for Each input
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    location: '',
  });

  const validate = (): boolean => {
    // This regular expression validates for number only
    // starting with 079, 077, 078
    const regex = /^(079|078|077)\d+$/;
    // This regular expression makes sure no invalid inputs
    // or malicious code injected
    const injectionRegex = /^[A-Za-z_@#]*$/;

    // Extracting the values from the state
    const { firstName, lastName, email, phoneNumber, location } = formValues;

    let temp = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      location: '',
    };

    // Checking for the length of the first name field and,
    // malicious code inputs
    temp.firstName =
      firstName.length < 3
        ? 'First Name at least is 3 characters '
        : temp.firstName;

    temp.firstName =
      firstName.length > 20 ? 'First Name is too long' : temp.firstName;

    temp.firstName = !injectionRegex.test(firstName)
      ? 'Invalid characters'
      : temp.firstName;

    // Checking for the length of the last name field and,
    // malicious code inputs
    temp.lastName =
      lastName.length < 3
        ? 'Last Name at least is 3 characters '
        : temp.lastName;
    temp.lastName =
      lastName.length > 20 ? 'Last Name is too long' : temp.lastName;

    temp.lastName = !injectionRegex.test(lastName)
      ? 'Invalid characters'
      : temp.lastName;

    // validating for valid email addresses
    temp.email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
      ? ''
      : 'Email is not valid';

    // validating for phone number length and formats
    temp.phoneNumber =
      phoneNumber.length < 10 ? 'Please Enter a valid phone number format' : '';

    temp.phoneNumber = regex.test(phoneNumber)
      ? temp.phoneNumber
      : 'Please Enter a valid phone number';

    temp.phoneNumber =
      phoneNumber.length > 10 ? 'Phone number is too long' : temp.phoneNumber;

    //validating for location field
    temp.location =
      location.length < 10
        ? 'Please provide a detailed location'
        : temp.location;

    setFormErrors({ ...temp });

    return Object.values(temp).every((v) => v === '');
  };

  const handleBackClick = () => router.back();

  const handleInputsChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [input.target.name]: input.target.value });
  };

  // function to handle the checkout process
  const checkout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const order = {
      products: cart,
      delivery_fees: 2.0,
    };
    try {
      const items: any = {};
      cart.map((item) => {
        items[item.id] = item.count;
      });
      const product_ids = Object.getOwnPropertyNames(items);

      const response = await axios.post('/api/checkout', {
        payment_method: 'cash',
        first_name: formValues.firstName,
        last_name: formValues.lastName,
        email: formValues.email,
        phone_number: formValues.phoneNumber,
        location_details: {
          city: 'Amman',
          location: formValues.location,
        },
        order_details: order,
        items,
        product_ids,
      });
      if (response.status === 201) {
        // clear the cart
        dispatch(clear());

        // clear the state
        setFormValues({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          location: '',
        });

        // redirecting to success page with the order id
        router.push('/success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function to toggle the error state on a given state field
  const toggleError = (errorsMessage: string) => errorsMessage !== '';

  return (
    <>
      <Typography variant="h4" fontFamily="var(--elegant-font)" px={2}>
        {websiteName}
      </Typography>

      <IconButton
        aria-label="go back"
        sx={{ color: 'black' }}
        onClick={handleBackClick}
      >
        <ArrowBackIcon />
      </IconButton>
      {cart.length < 1 ? (
        ''
      ) : (
        <Box>
          <Alert severity="success">
            Submit your order and view with this account aren{"'"}t you thrilled
            &#128526; admin@gamil.com password: admin@admin
          </Alert>
          <form onSubmit={checkout} id="checkout-form">
            <Grid container spacing={2} pt={2}>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="firstName"
                    label="First Name*"
                    variant="filled"
                    value={formValues.firstName}
                    onChange={handleInputsChange}
                    error={toggleError(formErrors.firstName)}
                    helperText={formErrors.firstName}
                    sx={{ ...textFieldStyles }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="lastName"
                    label="Last Name*"
                    variant="filled"
                    value={formValues.lastName}
                    onChange={handleInputsChange}
                    error={toggleError(formErrors.lastName)}
                    helperText={formErrors.lastName}
                    sx={{ ...textFieldStyles }}
                  />
                </Grid>
              </Grid>
              <Grid container item spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="email"
                    label="Email*"
                    variant="filled"
                    value={formValues.email}
                    onChange={handleInputsChange}
                    error={toggleError(formErrors.email)}
                    helperText={formErrors.email}
                    sx={{ ...textFieldStyles }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="phoneNumber"
                    label="Phone Number*"
                    variant="filled"
                    value={formValues.phoneNumber}
                    onChange={handleInputsChange}
                    error={toggleError(formErrors.phoneNumber)}
                    helperText={formErrors.phoneNumber}
                    sx={{ ...textFieldStyles }}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location*"
                  variant="filled"
                  value={formValues.location}
                  onChange={handleInputsChange}
                  error={toggleError(formErrors.location)}
                  helperText={formErrors.location}
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
            <Box>
              <Typography variant="caption">
                All of our perfumes are composed not original.
              </Typography>
              <br />
              <Typography variant="caption">
                If you have an allergy to any kind of perfume be sure to check
                it
                {"'"}s contents.
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              form="checkout-form"
              sx={{
                width: '100%',
                mt: 1,
                p: 1.5,
                backgroundColor: 'black',
                '&:hover': {
                  background: 'rgba(0, 0, 0, 0.9)',
                },
              }}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default CheckoutForm;
