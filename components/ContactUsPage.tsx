import React from 'react';
import ContactCard from '@/components/ContactCard';
import { Grid, Typography, Box } from '@mui/material';
import {
  whatsAppNumber,
  instagramProfileName,
  supportEmail,
} from '@/constants';

const firstCard = {
  title: 'WhatsApp',
  description: 'You can contact us on whatsapp.',
  href: `https://api.whatsapp.com/send?phone=${whatsAppNumber}`,
  image: {
    src: '/WhatsApp.webp',
    height: 70,
    width: 70,
    alt: 'whatsapp link',
  },
  buttonText: 'Go to whatsapp',
};

const secondCard = {
  title: 'Instagram',
  description: 'You can contact us on Instagram profile.',
  href: `https://www.instagram.com/${instagramProfileName}/`,
  image: {
    src: '/Instagram.webp',
    height: 70,
    width: 70,
    alt: 'instagram link',
  },
  buttonText: 'Go to instagram',
};

const thirdCard = {
  title: 'Gmail',
  description: 'You can contact us on our gmail.',
  href: `mailto:${supportEmail}/`,
  image: {
    src: '/Gmail.png',
    height: 59,
    width: 70,
    alt: 'email link',
  },
  buttonText: 'Go to gmail',
};

function ContactUs() {
  return (
    <>
      <Box px={{ xs: 1, sm: 2 }}>
        <Typography variant="h4" color="white" pt={2} textAlign={'center'}>
          Contact Us
        </Typography>
        <Typography
          variant="h6"
          fontWeight={300}
          color="white"
          pt={1}
          textAlign={'center'}
        >
          Get in touch and let us know how we can help.
        </Typography>
        <Grid container py={5} spacing={{ xs: 5 }} sx={{ minWidth: '0px' }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ContactCard {...firstCard} />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <ContactCard {...secondCard} />
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <ContactCard {...thirdCard} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default ContactUs;
