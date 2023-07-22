import React from 'react';
import Head from 'next/head';
import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import { websiteName, mainPageXMargins } from '@/constants';
function SuccessPage() {
  return (
    <>
      <Head>
        <title>Success</title>
        <meta
          name="description"
          content="Success Page after submitting an order"
        />
      </Head>
      <Box sx={{ ...mainPageXMargins, mt: 20 }}>
        <Typography color="white" variant="h3">
          Your order submitted successfully an email sent with order details,
          Thank you for using{' '}
          <Link
            href="/"
            style={{
              color: 'var(--gold-color)',
              textDecoration: 'none',
              fontFamily: 'var(--elegant-font)',
              position: 'relative',
              bottom: '-4px',
            }}
          >
            {websiteName + '.'}
          </Link>
        </Typography>
      </Box>
    </>
  );
}

export default SuccessPage;
