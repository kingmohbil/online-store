import React from 'react';
import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';
import { mainPageXMargins } from '@/constants';
import { NodeNextRequest } from 'next/dist/server/base-http/node';

const TypographyStyles = {
  fontFamily: 'var(--elegant-font)',
  fontWeight: '400',
  fontStyle: 'regular',
  textAlign: 'center',
  fontSize: {
    xs: '42px',
    sm: '64px',
    lg: '76px',
    xl: '110px',
  },
};

const lineWithTriangleStyles = {
  width: { xs: '50px', sm: '120px', md: '200px' },
  height: 0,
  borderBottom: '2px solid var(--gold-color)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8.4px',
    left: 'calc(100%)',
    borderWidth: '15px 0 0 15px',
    borderStyle: 'solid',
    borderColor: 'transparent transparent transparent var(--gold-color)',
    transform: 'rotate(45deg)',
  },
};

const responsiveStylesDescription = {
  fontSize: {
    xs: '12px',
    md: '16px',
  },
};

const HomeComponent: React.FC = () => {
  return (
    <>
      <Box mt={20} sx={{ ...mainPageXMargins }}>
        <Typography variant="h1" color="#fff" sx={{ ...TypographyStyles }}>
          Discover Your Perfect
        </Typography>
        <Typography
          variant="h1"
          color="transparent"
          sx={{
            ...TypographyStyles,
            backgroundImage:
              'linear-gradient(to right, #e3ca7c 0, #e3ca7c 22%, #e4c975 35%, #f6f2c0 50%, #f6e27a 55%, #e4c975 78%, #e4c975 100%)',
            WebkitBackgroundClip: 'text',
          }}
        >
          Perfume
        </Typography>
        <Box display="flex">
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                pl: { xs: '8px', md: '12px' },
                ml: { xs: '10px' },
                display: { xs: 'block', md: 'block' },
                borderLeft: '2px solid white',
                color: 'white',
                position: 'absolute',
                top: { xs: '80px', sm: '-30px', md: '-25px', lg: '-50px' },
                width: '400px',
              }}
            >
              <Typography sx={{ ...responsiveStylesDescription }}>
                Discover the perfect
              </Typography>
              <Typography sx={{ ...responsiveStylesDescription }}>
                perfume for you with our
              </Typography>
              <Typography sx={{ ...responsiveStylesDescription }}>
                wide collection of perfumes.
              </Typography>
            </Box>
          </Box>
          <Box position="relative">
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '120px' },
                height: { xs: '200px' },
                transform: 'rotate(70deg)',
                left: { xs: '50px', sm: '100px', md: '50px' },
                top: { xs: '100px', sm: '-10px', md: 0 },
              }}
            >
              <Image src="/butterfly.png" fill alt="butterfly image" />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                display: { xs: 'none', sm: 'block' },
                width: { sm: '90px' },
                height: { sm: '150px' },
                transform: 'rotate(-10deg)',
                top: { sm: '150px', md: '180px' },
                left: { sm: '170px', md: '150px' },
              }}
            >
              <Image src="/butterfly.png" fill alt="butterfly image" />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pt={{ xs: 2, md: 5, lg: 2 }}
            flexGrow={1}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ ...lineWithTriangleStyles }}></Box>
            </Box>
            {/* //TODO: Adding a functionality to the shop now button */}
            <Box mx={{ xs: 2, md: 7 }}>
              <Button
                variant="outlined"
                sx={{
                  color: 'var(--gold-color)',
                  border: '2px solid var(--gold-color)',
                  py: 1,
                  px: 3,
                  borderRadius: '24px',
                  fontWeight: '400',
                  '&:hover': {
                    border: '2px solid var(--gold-color)',
                    bgcolor: 'var(--gold-color)',
                    color: 'white',
                  },
                }}
              >
                SHOP NOW!
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                transform: 'rotate(180deg)',
              }}
            >
              <Box
                sx={{
                  ...lineWithTriangleStyles,
                }}
              ></Box>
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                position: 'absolute',
                width: { xs: '150px' },
                height: { xs: '270px' },
                top: { xs: '-30px', sm: '-90px', md: '-50px', lg: '-110px' },
                right: {
                  xs: '30px',
                  sm: '-10px',
                  md: '20px',
                  lg: '50px',
                  xl: '120px',
                },
              }}
            >
              <Image src="/butterfly.png" fill alt="butterfly image" />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomeComponent;
