import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import './CustomDialogue.css';

const CustomDialogue = ({ open, onClose, title, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className="custom-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent className="custom-dialog-content">
        <DialogContentText
          id="alert-dialog-description"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </DialogContent>
      <DialogActions className="custom-dialog-actions">
        <Button onClick={onClose} className="custom-dialog-button" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialogue;