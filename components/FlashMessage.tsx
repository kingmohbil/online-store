import React from 'react';
import { Button, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PropsType {
  message: string;
  duration: number;
  active: boolean;
  handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

function FlashMessage({ message, duration, active, handleClose }: PropsType) {
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div>
      <Snackbar
        open={active}
        autoHideDuration={duration}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
}

export default FlashMessage;
