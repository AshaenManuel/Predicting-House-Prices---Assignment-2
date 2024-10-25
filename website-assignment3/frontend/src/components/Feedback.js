import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Feedback = ({ open, onClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
      Prediction submitted successfully!
    </Alert>
  </Snackbar>
);

export default Feedback;
