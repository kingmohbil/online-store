import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';
import { Paper, Box } from '@mui/material';

function LoginPage() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('refreshToken') != null) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);
  if (loggedIn) {
    router.push('/');
  } else {
    return (
      <>
        <Head>
          <title>Login</title>
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
              },
            }}
            elevation={10}
          >
            <Box>
              <LoginForm />
            </Box>
          </Paper>
        </Box>
      </>
    );
  }
}

export default LoginPage;
