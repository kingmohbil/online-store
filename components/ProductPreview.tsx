import React from 'react';
import Image from 'next/image';
import { Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/slices/cartSlice';

interface PropsType {
  _id: string;
  name: string;
  image_url: string;
  description: string;
  detailed_description: string;
  price: number;
  available: boolean;
  category: string;
}

const lineWithTriangleStyles = {
  width: { xs: '70px', sm: '140px' },
  height: 0,
  borderBottom: '2px solid black',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-6.1px',
    left: 'calc(100%)',
    borderWidth: '10px 0 0 10px',
    borderStyle: 'solid',
    borderColor: 'transparent transparent transparent black',
    transform: 'rotate(45deg)',
  },
};

function ProductPreview(props: PropsType) {
  const dispatch = useDispatch();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              height: {
                xs: '350px',
                sm: '400px',
                md: '550px',
              },
              width: {
                xs: '300px',
                sm: '350px',
                md: '450px',
              },
            }}
          >
            <Image src={props.image_url} alt={props.name} fill={true} />
            {!props.available ? (
              <Box
                position={'absolute'}
                top={'10px'}
                sx={{ bgcolor: 'red', px: 2, borderBottomRightRadius: 100 }}
              >
                <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Sold out
                </Typography>
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: {
              xs: 'center',
              md: 'flex-start',
            },
          }}
        >
          <Typography
            variant={'h3'}
            color="white"
            sx={{
              textAlign: { xs: 'center', md: 'start' },
            }}
          >
            {props.name}
          </Typography>
          <Box
            display={'flex'}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            alignItems="center"
          >
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
                alignItems: 'center',
              }}
            >
              <Box sx={{ ...lineWithTriangleStyles }}></Box>
            </Box>
            <Box mx={{ xs: 1.5, sm: 4, md: 0 }} display={'flex'}>
              <Typography
                variant={'body1'}
                color="var(--gold-color)"
                fontSize={24}
                gutterBottom
                sx={{
                  position: {
                    xs: 'relative',
                    md: 'static',
                  },
                  top: {
                    xs: 3.5,
                  },
                }}
              >
                {props.price.toFixed(2)} JOD
              </Typography>
            </Box>
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
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

          <Typography
            variant={'body2'}
            color="rgba(255, 255, 255, 0.8)"
            textAlign={{
              xs: 'center',
              md: 'start',
            }}
            gutterBottom
          >
            {props.description} {props.detailed_description}
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{
                background: 'black',
                color: 'white',
                py: 1,
                px: 1,
                width: {
                  xs: 200,
                },
                '&:hover': {
                  background: 'white',
                  color: 'black',
                },
                '&:disabled': {
                  background: 'black',
                  color: 'grey',
                },
              }}
              disabled={!props.available}
              onClick={() => {
                props.available &&
                  dispatch(
                    addItem({
                      id: props._id,
                      name: props.name,
                      price: props.price,
                    })
                  );
              }}
            >
              ADD TO CART
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductPreview;
