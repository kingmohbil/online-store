import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';

function BackToTop() {
  const [hide, setHide] = useState(0);
  useEffect(() => {
    function handleChange(this: Window) {
      if (this.scrollY >= 300) setHide(1);
      else setHide(0);
    }
    window.addEventListener('scroll', handleChange);

    () => window.removeEventListener('scroll', handleChange);
  }, []);
  return (
    <>
      <IconButton
        sx={{
          position: 'fixed',
          right: { xs: '0px', sm: '10px' },
          bottom: '0px',
          transform: 'rotate(180deg)',
          zIndex: 1,
          color: { xs: 'var(--gold-color)' },
          opacity: hide,
        }}
        size="large"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <ExpandCircleDownIcon />
      </IconButton>
    </>
  );
}

export default BackToTop;
