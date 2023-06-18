import React from 'react';
import AppBar from '@/components/AppBar';
import ShopBar from '@/components/ShopBar';
import SideBar from '@/components/SideBar';
import { Box, Divider } from '@mui/material';
import { mainPageXMargins } from '@/constants';

const ShopPage: React.FC = () => {
  return (
    <>
      <AppBar />
      <ShopBar />
      <Box display="flex" sx={{ ...mainPageXMargins }}>
        <SideBar />
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            pl: 2,
            mt: 1,
            borderColor: '#fff9',
          }}
        />
      </Box>
    </>
  );
};

export default ShopPage;
