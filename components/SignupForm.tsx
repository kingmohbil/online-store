import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import {
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  InputAdornment,
  FormHelperText,
  FilledInput,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Flash from '@/components/FlashMessage';

function SignUpForm() {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  };
  const [formValues, setFormValues] = useState(initialState);

  const [formErrors, setFormErrors] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);

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

  const textFieldStyles = {
    width: '100%',
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputsChange = (input: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [input.target.name]: input.target.value });
  };

  // function to toggle the error state on a given state field
  const toggleError = (errorsMessage: string) => errorsMessage !== '';

  const validate = (): boolean => {
    // This regular expression validates for number only
    // starting with 079, 077, 078
    const regex = /^(079|078|077)\d+$/;
    // This regular expression makes sure no invalid inputs
    // or malicious code injected
    const injectionRegex = /^[A-Za-z_@#]*$/;

    const passwordRegex = /^[A-Za-z0-9_@$]*$/;

    // Extracting the values from the state
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = formValues;

    let temp = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
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

    // validating password length and malicious inputs
    temp.password =
      password.length < 8
        ? 'Password must be at least 8 characters'
        : temp.password;

    temp.password = !passwordRegex.test(password)
      ? 'Invalid characters'
      : temp.password;

    temp.confirmPassword =
      password !== confirmPassword ? "Passwords doesn't match" : temp.password;

    setFormErrors({ ...temp });

    return Object.values(temp).every((v) => v === '');
  };

  const handleSuccessfulRequest = (code: number) => {
    switch (code) {
      case 201: {
        setFormValues(initialState);
        setFlash(true);
        break;
      }
    }
  };

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
    } = formValues;
    try {
      const response = await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        confirmPassword,
      });
      console.log(response);
      handleSuccessfulRequest(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flash
        message="Created User successfully"
        duration={5000}
        handleClose={handleClose}
        active={flash}
      />
      <Typography variant="h4">Sign Up</Typography>
      <form onSubmit={signUp} noValidate>
        <Grid container spacing={2} pt={2}>
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

          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: '100%' }} variant="filled">
              <InputLabel htmlFor="password">Password *</InputLabel>
              <FilledInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formValues.password}
                onChange={handleInputsChange}
                error={toggleError(formErrors.password)}
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formErrors.password != ''}>
                {formErrors.password}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl sx={{ width: '100%' }} variant="filled">
              <InputLabel htmlFor="confirmPassword">
                Confirm Password*
              </InputLabel>
              <FilledInput
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                type={showPassword ? 'text' : 'password'}
                onChange={handleInputsChange}
                error={toggleError(formErrors.confirmPassword)}
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formErrors.confirmPassword != ''}>
                {formErrors.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Stack display="flex" flexDirection="column" spacing={1}>
              <Typography variant="body1">
                Already a member?{' '}
                <Link
                  href="/auth/login"
                  style={{ color: 'var(--gold-color)', textDecoration: 'none' }}
                >
                  Login
                </Link>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.85)',
                  },
                }}
              >
                Create Account
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default SignUpForm;
