import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './Card';

const Store: React.FC = () => {
  return (
    <>
      <Grid pt={{ sm: 5 }} spacing={2} container justifyContent="center">
        <Grid item>
          <ProductCard
            id="1"
            name="Aramis"
            image={{ src: '/product-images/aramis.jpg', alt: 'Aramis perfume' }}
            price={100}
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto alias, eaque, aliquid, voluptate nesciunt unde autem est corrupti odit expedita cum delectus at temporibus? Nemo illum excepturi fugit "
          />
        </Grid>
        <Grid item>
          <ProductCard
            id="2"
            name="Aramis"
            price={150}
            image={{ src: '/product-images/aramis.jpg', alt: 'Aramis perfume' }}
            text="Lorem, ipsum do, eaque, aliquid, voluptate nesciunt unde autem est corrupti odit expedita cum delectus at temporibus? Nemo illum excepturi fugit "
          />
        </Grid>
        <Grid item>
          <ProductCard
            id="3"
            name="Aramis"
            price={120}
            image={{ src: '/product-images/aramis.jpg', alt: 'Aramis perfume' }}
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto alias, eaque, aliquid, voluptate nesciunt unde autem est corrupti odit expedita cum delectus at temporibus? Nemo illum excepturi fugit "
          />
        </Grid>
        <Grid item>
          <ProductCard
            id="4"
            name="Aramis"
            price={310}
            image={{ src: '/product-images/aramis.jpg', alt: 'Aramis perfume' }}
            text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto alias, eaque, aliquid, voluptate nesciunt unde autem est corrupti odit expedita cum delectus at temporibus? Nemo illum excepturi fugit "
            soldOut={true}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Store;
