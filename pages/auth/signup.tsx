import React from 'react';
import Head from 'next/head';
import SignUpForm from '@/components/SignupForm';
import { Paper, Box } from '@mui/material';

function SignUpPage() {
  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
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
              xs: 300,
              sm: 500,
              md: 700,
            },
          }}
          elevation={10}
        >
          <Box>
            <SignUpForm />
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default SignUpPage;
