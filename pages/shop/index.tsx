import React, { useEffect } from 'react';
import Head from 'next/head';
import AppBar from '@/components/AppBar';
import ShopBar from '@/components/ShopBar';
import SideBar from '@/components/SideBar';
import ProductsShop from '@/components/ProductsShop';
import { Box, Divider } from '@mui/material';
import { shopPageXMargins } from '@/constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { loadProducts } from '@/lib/slices/productSlice';
import { useRouter } from 'next/router';
import BackToTop from '@/components/BackToTop';
import dbConnect from '@/lib/database/dbConnect';
import productType from '@/types/productType';
import { GetServerSidePropsContext } from 'next';

interface PropsType {
  products: productType[];
}

function ShopPage({ products }: PropsType) {
  const dispatch = useDispatch();
  const category = useSelector((state: RootState) => state.filters.category);
  const router = useRouter();
  useEffect(() => {
    dispatch(loadProducts({ products }));
  });

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta
          name="description"
          content="The shop page were you browse a list of the perfumes"
        />
      </Head>
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

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  try {
    const Products = require('@/lib/database/models/productModel');
    await dbConnect();
    let data: productType[] = [];
    if (typeof query.category !== 'string')
      data = await Products.find({}).select('-__v -category');
    else {
      const categories = query.category?.split(' ');
      let proceed = false;
      categories.map((category) => {
        if (category === 'men' || category === 'women' || category === 'unisex')
          proceed = true;
      });

      if (proceed)
        data = await Products.find({ category: { $in: categories } }).select(
          '-__v -category -detailed_description'
        );
    }
    const products = data.map((product: any) => {
      return {
        id: product.id,
        name: product.name,
        image: product.image_url,
        description: product.description,
        price: product.price,
        available: product.available,
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
