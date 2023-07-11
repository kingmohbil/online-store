import React from 'react';
import AppBar from '@/components/AppBar';
import { Box } from '@mui/material';
import SideNav from '@/components/DashboardSide';
import { shopPageXMargins } from '@/constants';

function Dashboard() {
  return (
    <>
      <AppBar />
      <Box
        display="flex"
        sx={{
          ...shopPageXMargins,
          flexDirection: { xs: 'column', sm: 'row' },
          pb: 5,
        }}
      >
        <SideNav />
        {/* <DashboardPage></DashboardPage>  */}
      </Box>
    </>
  );
}

export default Dashboard;
