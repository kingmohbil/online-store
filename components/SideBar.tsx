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
} from '@mui/material';

const SideBar: React.FC = () => {
  const [checked, setChecked] = useState(['Men']);

  useEffect(() => {
    //TODO Adding on handler for the change event
    console.log(checked);
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
  return (
    <>
      <List
        sx={{ width: 200, bgcolor: 'transparent', color: 'white' }}
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
              <ListItemButton
                role={'button'}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    sx={{
                      color: 'var(--gold-color)',
                    }}
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
