import React from 'react';
import AppBar from '@/components/AppBar';
import ShopBar from '@/components/ShopBar';
import SideBar from '@/components/SideBar';
import ProductsShop from '@/components/ProductsShop';
import { Box, Divider } from '@mui/material';
import { shopPageXMargins } from '@/constants';

const ShopPage: React.FC = () => {
  return (
    <>
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
};

export default ShopPage;
