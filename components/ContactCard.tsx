import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Paper, Box, Typography, Button } from '@mui/material';

interface PropsType {
  image: {
    src: string;
    height: number;
    width: number;
    alt: string;
  };
  imagePosition?: {};
  buttonStyles?: {};
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

function ContactCard(props: PropsType) {
  return (
    <>
      <Paper
        sx={{
          height: '250px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '39%', sm: '43%', md: '42%' },
            top: -30,
            ...props.imagePosition,
          }}
        >
          <Link href={props.href} target="_blank">
            <Image
              src={props.image.src}
              height={props.image.height}
              width={props.image.width}
              alt={props.image.alt}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" textAlign="center" gutterBottom>
            {props.title}
          </Typography>
          <Typography textAlign="center">{props.description}</Typography>
        </Box>
        <Link href={props.href} target="_blank" style={{ width: '100%' }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: 'black',
              borderRadius: '0',
              width: '100%',
              ...props.buttonStyles,
            }}
          >
            {props.buttonText}
          </Button>
        </Link>
      </Paper>
    </>
  );
}

export default ContactCard;
