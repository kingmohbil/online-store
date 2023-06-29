import React, { useEffect } from 'react';
import AppBar from '@/components/AppBar';
import ShopBar from '@/components/ShopBar';
import SideBar from '@/components/SideBar';
import ProductsShop from '@/components/ProductsShop';
import { Box, Divider } from '@mui/material';
import { shopPageXMargins } from '@/constants';
import { useDispatch } from 'react-redux';
import { loadProducts } from '@/lib/slices/productSlice';
import BackToTop from '@/components/BackToTop';
import dbConnect from '@/lib/database/dbConnect';

interface PropsType {
  products: [];
}

function ShopPage({ products }: PropsType) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProducts({ products }));
  });
  return (
    <>
      <BackToTop />
      <AppBar style={{ ...shopPageXMargins }} />
      <ShopBar />
      <Box
        display="flex"
        sx={{
          ...shopPageXMargins,
          flexDirection: { xs: 'column', sm: 'row' },
          pb: 5,
        }}
      >
        <SideBar />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            alignSelf: 'start',
            height: 300,
            pl: 2,
            mt: 1,
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              borderColor: '#fff7',
            }}
          />
        </Box>
        <ProductsShop />
      </Box>
    </>
  );
}

export default ShopPage;

export async function getStaticProps() {
  const Products = require('@/lib/database/models/productModel');
  try {
    await dbConnect();
    const data = await Products.find({}).select('-__v');

    const products = data.map((product: any) => {
      return {
        id: product.id,
        name: product.name,
        image: product.image_url,
        description: product.description,
        price: product.price,
        available: product.available,
        category: product.category,
      };
    });
    return {
      props: {
        products,
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { products: [] } };
  }
}
