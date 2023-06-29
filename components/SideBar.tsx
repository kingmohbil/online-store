import React, { useState, useEffect } from 'react';
import {
  Divider,
  Checkbox,
  List,
  ListItem,
  ListSubheader,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Box,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SideBar: React.FC = () => {
  const [checked, setChecked] = useState(['Men']);

  useEffect(() => {
    //TODO Adding on handler for the change event
  }, [checked]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Mobile Version */}
      <List sx={{ display: { sm: 'none' } }}>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Sort By" sx={{ color: 'white' }} />
          {open ? (
            <ExpandLess sx={{ color: 'white' }} />
          ) : (
            <ExpandMore sx={{ color: 'white' }} />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {['Men', 'Women', 'Unisex'].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton
                    role={'button'}
                    onClick={handleToggle(value)}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        style={{ color: 'var(--gold-color)' }}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value}
                      sx={{ color: 'white' }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
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
            <ListSubheader sx={{ bgcolor: 'transparent', color: 'white' }}>
              Sort By
            </ListSubheader>
            <Divider sx={{ borderColor: '#fff7' }} />
          </>
        }
      >
        {['Men', 'Women', 'Unisex'].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton role={'button'} onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    style={{ color: 'var(--gold-color)' }}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SideBar;
