import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import AppBar from '@/components/AppBar';
import SideNav from '@/components/DashboardSide';
import { shopPageXMargins } from '@/constants';
import Orders from '@/components/ShowOrders';

function Dashboard() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('refreshToken') != null) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  if (!loggedIn) router.push('/');

  return (
    <>
      {loggedIn && (
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
            <Orders />
          </Box>
        </>
      )}
    </>
  );
}

export default Dashboard;
