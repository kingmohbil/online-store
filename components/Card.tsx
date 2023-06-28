import React, { useState } from 'react';
import { Box, Card, CardMedia, CardContent } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch } from 'react-redux';
import { addItem } from '@/lib/slices/cartSlice';

interface CardProps {
  name: string;
  id: string;
  image: {
    src: string;
    alt: string;
  };
  price: number;
  text: string;
  soldOut?: boolean;
}

const lineWithTriangleStyles = {
  width: { xs: '100px', sm: '120px', md: '200px' },
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
function ProductCard({
  id,
  name,
  text,
  image,
  price,
  soldOut = false,
}: CardProps) {
  const [like, setLike] = useState(false);

  const handleLikeChange = () => setLike((previous) => !previous);

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (soldOut) return;
    dispatch(addItem({ id, name, price }));
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: 290, sm: 345 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={image.src}
        alt={image.alt}
      />
      {soldOut ? (
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
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" textAlign="center">
          {name}
        </Typography>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            pb={1}
            flexGrow={1}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ ...lineWithTriangleStyles }}></Box>
            </Box>
            {/* //TODO: Adding a functionality to the shop now button */}
            <Box mx={{ xs: 1.5, md: 3 }} display={'flex'}>
              <Typography sx={{ color: 'var(--gold-color)' }}>JOD </Typography>
              <Typography sx={{ color: 'var(--gold-color)' }}>
                {` ${price.toFixed(2)}`}
              </Typography>
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
        </Box>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/*//TODO: The Like And Share button functionality*/}
        {/* <IconButton aria-label="add to favorites" onClick={handleLikeChange}>
          {like ? (
            <FavoriteIcon
              aria-label="added to favorites"
              sx={{ color: 'var(--gold-color)' }}
            />
          ) : (
            <FavoriteBorderIcon
              aria-label="removed from favorites"
              sx={{ color: 'var(--gold-color)' }}
            />
          )}
        </IconButton>
        <IconButton aria-label="share" title="share">
          <ShareIcon sx={{ color: 'var(--gold-color)' }} />
        </IconButton> */}

        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          title="Add to shopping cart"
          onClick={handleAddToCart}
        >
          <AddShoppingCartIcon sx={{ color: 'var(--gold-color)' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
