import React from 'react';
import AppBar from '@/components/AppBar';
import Contact from '@/components/ContactUsPage';
import { Box } from '@mui/material';
import { mainPageXMargins } from '@/constants';

function ContactUsPage() {
  return (
    <>
      <AppBar />
      <Box sx={{ mx: { xs: 1, sm: 6.5, md: 8, lg: 14, xl: 25 } }}>
        <Contact />
      </Box>
    </>
  );
}

export default ContactUsPage;
