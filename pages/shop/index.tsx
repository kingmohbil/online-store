import React, { useEffect } from 'react';
import AppBar from '@/components/AppBar';
import ShopBar from '@/components/ShopBar';
import SideBar from '@/components/SideBar';
import ProductsShop from '@/components/ProductsShop';
import { Box, Divider } from '@mui/material';
import { shopPageXMargins } from '@/constants';
import { useDispatch } from 'react-redux';
import { loadProducts } from '@/lib/slices/productSlice';
import { useRouter } from 'next/router';
import BackToTop from '@/components/BackToTop';
import dbConnect from '@/lib/database/dbConnect';
import { GetServerSidePropsContext } from 'next';
import productType from '@/types/productType';

interface PropsType {
  products: productType[];
}

function ShopPage({ products }: PropsType) {
  const dispatch = useDispatch();
  const router = useRouter();
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query }: any = context;
  let data = [];
  try {
    const Products = require('@/lib/database/models/productModel');
    await dbConnect();

    if (isEmptyObject(query)) data = await Products.find({}).select('-__v');
    else {
      const filters = query.category.split(' ');
      for (let i = 0; i < filters.length; i++)
        if (
          filters[i] !== 'men' &&
          filters[i] !== 'women' &&
          filters[i] !== 'unisex'
        )
          break;
      if (filters.length === 1)
        data = await Products.find({ category: filters[0] }).select('-__v');
      else if (filters.length === 2)
        data = await Products.find({
          category: filters[0] || filters[1],
        }).select('-__');
      else
        data = await Products.find({
          category: filters[0] || filters[1] || filters[2],
        });
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

function isEmptyObject(obj: {}) {
  return Object.getOwnPropertyNames(obj).length === 0;
}
