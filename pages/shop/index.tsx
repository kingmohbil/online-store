import React from 'react';
import AppBar from '@/components/AppBar';
import ShopBar from '@/components/ShopBar';
import SideBar from '@/components/SideBar';
import ProductsShop from '@/components/ProductsShop';
import { Box, Divider } from '@mui/material';
import { mainPageXMargins } from '@/constants';

const ShopPage: React.FC = () => {
  return (
    <>
      <AppBar />
      <ShopBar />
      <Box display="flex" sx={{ ...mainPageXMargins }}>
        <SideBar />
        <Box
          sx={{
            display: 'flex',
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
};

export default ShopPage;
