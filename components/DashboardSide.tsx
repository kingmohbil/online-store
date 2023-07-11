import React, { useState } from 'react';

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

function DashboardNav() {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

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
              <ListItemButton role={'button'} sx={{ pl: 4 }}>
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
          <ListItemButton role={'button'}>
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
