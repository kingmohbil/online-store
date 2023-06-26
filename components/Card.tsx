import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
const ProductCard: React.FC = () => {
  const [like, setLike] = useState(false);

  const handleLikeChange = () => setLike((previous) => !previous);
  return (
    <Card sx={{ maxWidth: { xs: 290, sm: 345 } }}>
      <CardMedia
        component="img"
        height="194"
        image="/product-images/aramis.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLikeChange}>
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
        <IconButton aria-label="share">
          <ShareIcon sx={{ color: 'var(--gold-color)' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
