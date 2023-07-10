import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

const textFieldStyles = {
  width: '100%',
};

const initialState = {
  email: '',
  password: '',
};

function LoginForm() {
  const router = useRouter();
  const [formValues, setFormValues] = useState(initialState);

  const [formErrors, setFormErrors] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);

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
    const { email, password } = formValues;

    let temp = { ...initialState };

    // validating for valid email addresses
    temp.email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
      ? ''
      : 'Email is not valid';

    // validating password length and malicious inputs
    temp.password =
      password.length < 8
        ? 'Password must be at least 8 characters'
        : temp.password;

    temp.password = !passwordRegex.test(password)
      ? 'Invalid characters'
      : temp.password;

    setFormErrors({ ...temp });

    return Object.values(temp).every((v) => v === '');
  };

  const handleSuccessfulRequest = (code: number, data: any) => {
    switch (code) {
      case 200: {
        localStorage.setItem('refreshToken', data.refreshToken);
        localStorage.setItem('accessToken', data.accessToken);
        router.push('/');
        break;
      }
    }
  };

  const handleErrors = (code: any, data: any) => {
    switch (code) {
      case 400: {
        setFormErrors({
          password: data.errors.password || '',
          email: data.errors.email || '',
        });
        break;
      }
      default: {
        setFormErrors({
          password: data.errorMessage || '',
          email: data.errorMessage || '',
        });
      }
    }
  };

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    try {
      const response = await axios.post('/api/auth/login', {
        email: formValues.email,
        password: formValues.password,
      });
      handleSuccessfulRequest(response.status, response.data);
    } catch (error: any) {
      handleErrors(error.response.status, error.response.data);
    }
  };

  return (
    <>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={login} noValidate>
        <Grid container spacing={2} pt={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
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
          <Grid item xs={12} display="flex" justifyContent="center">
            <Stack display="flex" flexDirection="column" spacing={1}>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                You Don{"'"}t have an account?{' '}
                <Link
                  href="/auth/signup"
                  style={{
                    color: 'var(--gold-color)',
                    textDecoration: 'none',
                  }}
                >
                  Create Account
                </Link>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  px: 10,
                  alignSelf: 'center',
                  bgcolor: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.85)',
                  },
                }}
              >
                Login
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default LoginForm;
