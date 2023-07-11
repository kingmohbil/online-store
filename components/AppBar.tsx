import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { websiteName, mainPageXMargins, navItems } from '@/constants';
import CartDrawer from './CartPage';
import axios from 'axios';
import MUIAppBar from '@mui/material/AppBar';
import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  IconButton,
  Button,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 260;

interface AppBarProps {
  style?: {};
}

function AppBar({ style }: AppBarProps) {
  const router = useRouter();
  // The State That Controls The Opening Of The Drawer
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // The Function For Opening And Closing Of The Drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // The Function For Setting The Logging Status
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('refreshToken') != null) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  const logout = async () => {
    const token = localStorage.getItem('refreshToken');

    if (!token) return;
    try {
      const logoutResponse = await axios.get('/api/auth/logout', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      if (logoutResponse.status === 200) {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        setLoggedIn(false);
        router.push('/');
      }
    } catch (error) {}
  };

  const handleCartToggle = () => {
    setCartOpen((prevState) => !prevState);
  };
  //! mobile navigation drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {/* The Title For The Drawer */}
      <Typography
        variant="h6"
        sx={{ my: 2, fontFamily: 'var(--elegant-font)' }}
      >
        {websiteName}
      </Typography>
      <Divider />
      <List>
        {/* The Links Displayed On The List In The Drawer */}
        {loggedIn ? (
          <>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={'Logout'} onClick={logout} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <Link
                  href={'/dashboard'}
                  style={{
                    color: 'inherit',
                    font: 'inherit',
                    textDecoration: 'inherit',
                    width: '100%',
                  }}
                >
                  <ListItemText primary={'Dashboard'} />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center', justifyContent: 'center' }}
            >
              <Link
                href="/auth/login"
                style={{
                  textDecoration: 'inherit',
                  fontFamily: 'Roboto, sans-serif',
                  color: '#000000DE',
                  fontWeight: '400',
                  fontSize: '1rem',
                }}
              >
                Login
              </Link>
            </ListItemButton>
          </ListItem>
        )}
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link
                href={item.path}
                style={{
                  color: 'inherit',
                  font: 'inherit',
                  textDecoration: 'inherit',
                  width: '100%',
                }}
              >
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton>
            <Button
              variant="outlined"
              onClick={handleCartToggle}
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
                width: '100%',
                fontWeight: 'inherit',
                color: 'inherit',
                border: 'none',
                '&:hover': {
                  border: 'none',
                  background: 'transparent',
                },
              }}
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Box position="static">
        <MUIAppBar
          component="nav"
          sx={{
            background: 'transparent',
            boxShadow: 'none',
            position: 'static',
          }}
        >
          <Toolbar
            sx={{
              ...mainPageXMargins,
              ...style,
              my: { md: '16px' },
              py: { xs: 0, md: '16px !important' },
              borderBottom: { md: '1px dashed rgba(255, 255, 255, 0.5)' },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, p: 0 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                display: {
                  xs: 'none',
                  md: 'block',
                },
                fontFamily: 'var(--elegant-font)',
              }}
            >
              {websiteName}
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: 'center',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {navItems.map((item) => (
                <Link href={item.path} key={item.text}>
                  <Button
                    sx={{
                      color: '#fff',
                      fontWeight: '400',
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
              {loggedIn ? (
                <>
                  <Button>
                    <Link
                      href="/dashboard"
                      style={{
                        textDecoration: 'inherit',
                        color: '#fff',
                      }}
                    >
                      Dashboard
                    </Link>
                  </Button>
                  <Button
                    sx={{
                      color: '#fff',
                      fontWeight: '400',
                    }}
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button>
                  <Link
                    href="/auth/login"
                    style={{
                      textDecoration: 'inherit',
                      color: '#fff',
                    }}
                  >
                    Login
                  </Link>
                </Button>
              )}
            </Box>
            <Button
              variant="outlined"
              onClick={handleCartToggle}
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
                color: '#fff',
                border: '2px solid #fff',
                py: 1,
                px: 3,
                borderRadius: '24px',
                '&:hover': {
                  border: '2px solid #fff',
                  bgcolor: 'white',
                  color: '#000',
                },
              }}
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button>
          </Toolbar>
        </MUIAppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: {
                  xs: drawerWidth,
                  sm: 406,
                },
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={cartOpen}
            onClose={handleCartToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: {
                  xs: drawerWidth,
                  sm: 406,
                  md: 800,
                },
              },
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CartDrawer />
            </Box>
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

export default AppBar;
