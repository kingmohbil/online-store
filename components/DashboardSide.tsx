import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loadOrders } from '@/lib/slices/orderSlice';
import {
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemButton,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  clearTokensFromLocalStorage,
  logoutTokens,
  requestAccessToken,
} from '@/lib/helpers/tokenHelpers';
import { CatchingPokemonSharp } from '@mui/icons-material';

function DashboardNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleClick = () => setOpen(!open);

  const dispatch = useDispatch();

  const getOrdersBtnEvent = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && refreshToken) {
      logoutTokens(refreshToken);
      router.push('/auth/login');
    } else if (accessToken && refreshToken) {
      try {
        const data = await fetchAllOrders(accessToken);
        dispatch(loadOrders({ orders: data.orders }));
      } catch (error: any) {
        if (error.response.status === 401) {
          console.log('requesting access token');
          try {
            const accessToken = await requestAccessToken(refreshToken);
            localStorage.setItem('accessToken', accessToken);
            const data = await fetchAllOrders(accessToken);
            console.log(data);
          } catch (error) {
            clearTokensFromLocalStorage();
            return router.push('/auth/login');
          }
        }
      }
    }
  };

  return (
    <>
      {/* Mobile Version */}
      <List sx={{ display: { sm: 'none' } }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
          {open ? (
            <ExpandLess sx={{ color: 'white' }} />
          ) : (
            <ExpandMore sx={{ color: 'white' }} />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* <ListItem disablePadding>
              <ListItemButton role={'button'} sx={{ pl: 4 }}>
                <ListItemText
                  primary={'Profile'}
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  }}
                />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding>
              <ListItemButton
                role={'button'}
                sx={{ pl: 4 }}
                onClick={getOrdersBtnEvent}
              >
                <ListItemText
                  primary={'Orders'}
                  sx={{
                    color: 'white',
                    textTransform: 'capitalize',
                    textAlign: 'center',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <List
        sx={{
          width: { xs: 100, sm: 200 },
          bgcolor: 'transparent',
          color: 'white',
          maxHeight: { xs: 0, sm: 300 },
          display: { xs: 'none', sm: 'block' },
        }}
        subheader={
          <>
            <ListSubheader
              sx={{
                bgcolor: 'transparent',
                color: 'white',
                letterSpacing: 1,
              }}
            >
              Dashboard
            </ListSubheader>
            <Divider sx={{ borderColor: '#fff7' }} />
          </>
        }
      >
        {/* <ListItem disablePadding>
          <ListItemButton role={'button'}>
            <ListItemText
              primary={'Profile'}
              sx={{ textTransform: 'capitalize' }}
            />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton role={'button'} onClick={getOrdersBtnEvent}>
            <ListItemText
              primary={'Orders'}
              sx={{ textTransform: 'capitalize' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default DashboardNav;

async function fetchAllOrders(accessToken: string) {
  try {
    const response = await axios.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
