import React, { useState } from 'react';
import Link from 'next/link';
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
import { websiteName, mainPageXMargins, navItems } from '@/constants';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 260;

const AppBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCartClick = () => {
    //TODO implement on cart Click function
    console.log('Cart Clicked');
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {websiteName}
      </Typography>
      <Divider />
      <List>
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
              onClick={handleCartClick}
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
      <Box>
        <MUIAppBar
          component="nav"
          sx={{
            background: 'transparent',
            boxShadow: 'none',
          }}
        >
          <Toolbar
            sx={{
              ...mainPageXMargins,
              my: { md: '16px' },
              py: { md: '16px !important' },
              borderBottom: { md: '1px dashed rgba(255, 255, 255, 0.5)' },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
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
                  <Button sx={{ color: '#fff', fontWeight: '400' }}>
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
            <Button
              variant="outlined"
              onClick={handleCartClick}
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
      </Box>
    </>
  );
};

export default AppBar;
