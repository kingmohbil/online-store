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
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from '@/lib/slices/filterSlice';
import { RootState } from '@/lib/store';

const SideBar: React.FC = () => {
  const category = useSelector((state: RootState) => state.filters.category);
  const dispatch = useDispatch();

  const checked = (value: string) => category.indexOf(value) !== -1;

  const handleToggle = (value: string) => () => {
    dispatch(toggle({ value }));
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

  const [open, setOpen] = useState(false);

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
            {['men', 'women', 'unisex'].map((value) => {
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
                        checked={checked(value)}
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
                      sx={{ color: 'white', textTransform: 'capitalize' }}
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
        {['men', 'women', 'unisex'].map((value) => {
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton role={'button'} onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked(value)}
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
                  sx={{ textTransform: 'capitalize' }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SideBar;
