import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import {
  mainPageXMargins,
  whatsAppNumber,
  instagramProfileName,
  supportEmail,
} from '../constants';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function Footer() {
  return (
    <>
      <Box
        sx={{
          ...mainPageXMargins,

          pb: 1,
        }}
      >
        <Box display="flex" justifyContent="right">
          <Box>
            <Typography sx={{ pb: 1, color: 'var(--gold-color)' }}>
              Contact us
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Link
                href={`https://api.whatsapp.com/send?phone=${whatsAppNumber}`}
                target="_blank"
                aria-label="Link to contact us whatsapp"
              >
                <WhatsAppIcon sx={{ color: 'var(--gold-color)' }} />
              </Link>
              <Link
                href={`https://www.instagram.com/${instagramProfileName}/`}
                target="_blank"
                aria-label="Link to contact us instagram"
              >
                <InstagramIcon sx={{ color: 'var(--gold-color)' }} />
              </Link>
              <Link
                href={`mailto:${supportEmail}/`}
                target="_blank"
                aria-label="Link to contact us email"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`mailto:${supportEmail}/`, '_system');
                }}
              >
                <EmailOutlinedIcon sx={{ color: 'var(--gold-color)' }} />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Footer;
