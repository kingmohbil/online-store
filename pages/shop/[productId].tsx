import React from 'react';
import { Box } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { mainPageXMargins } from '../../constants';
import BackToTop from '../../components/BackToTop';
import AppBar from '../../components/AppBar';
import ProductPreview from '../../components/ProductPreview';
import dbConnect from '../../lib/database/dbConnect';

interface PropsType {
  JSONProduct: string;
}

interface ProductType {
  _id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  price: number;
  available: boolean;
}

function ProductPage({ JSONProduct }: PropsType) {
  const product: ProductType = JSON.parse(JSONProduct);
  return (
    <>
      <AppBar />
      <Box sx={{ mx: { xs: 1, sm: 6.5, md: 12.5, lg: 19, xl: 40 } }} mt={4}>
        <ProductPreview {...product} />
      </Box>
      <BackToTop />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const Products = require('@/lib/database/models/productModel');
  const productId = context.params?.productId;
  try {
    await dbConnect();
    const product = await Products.findById(productId).select({
      __v: 0,
    });
    return {
      props: {
        JSONProduct: JSON.stringify(product),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        JSONProduct: '',
      },
    };
  }
}

export default ProductPage;
