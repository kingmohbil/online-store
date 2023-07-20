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
import { add, toggle } from '@/lib/slices/filterSlice';
import { RootState } from '@/lib/store';
import StyledComboBox from './StyledComboBox';

const SideBar: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const category = useSelector((state: RootState) => state.filters.category);
  const router = useRouter();
  const dispatch = useDispatch();

  const checked = (value: string) => category.indexOf(value) !== -1;

  useEffect(() => {
    if (typeof router.query.category === 'string') {
      const categories = router.query.category.split(' ');
      if (categories !== undefined)
        dispatch(
          add({
            values: categories,
            value: '',
          })
        );
    } else if (
      typeof router.query.category === 'undefined' &&
      category.length !== 0
    ) {
      dispatch(toggle({ value: category[0] }));
    }
  }, [router.query.category]);

  const handleToggle = (value: string) => () => {
    const query = router.query;
    if (query.category !== undefined) {
      if (typeof query.category === 'string') {
        const categories = query.category.split(' ');
        const index = categories.indexOf(value);
        if (index === -1) {
          categories.push(value);
          router.push({
            query: {
              category: categories.reduce((prev, cur) => `${prev} ${cur}`),
            },
          });
        } else {
          categories.splice(index, 1);
          if (categories.length > 0) {
            router.push({
              query: {
                category: categories.reduce((prev, cur) => `${prev} ${cur}`),
              },
            });
          } else {
            delete router.query.category;
            router.push(
              { pathname: '/shop', query: { ...router.query } },
              undefined
            );
          }
        }
      }
    } else {
      router.push({
        query: {
          category: value,
        },
      });
    }
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Mobile Version */}
      <StyledComboBox
        label="search here"
        options={[
          ...products.map((product) => ({
            id: product.id,
            label: product.name,
          })),
        ]}
        styles={{
          paddingTop: 1,
          display: {
            sm: 'none',
          },
        }}
      />
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
