import React, { useState } from 'react';
import {
  Container, TextField, Button, Box, Typography, Snackbar, Alert
} from '@mui/material';

function PredictionForm() {
  const [formData, setFormData] = useState({
    suburb: '',
    numberOfRooms: '',
    distance: '',
    yearBuilt: '',
    price: '',
    population: '',
    educationScore: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform prediction logic here
    console.log('Form submitted:', formData);
    // Show success message
    setSnackbarMessage('Prediction submitted successfully!');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Housing Price Prediction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            name="suburb"
            label="Suburb"
            variant="outlined"
            value={formData.suburb}
            onChange={handleChange}

          />
          <TextField
            name="numberOfRooms"
            label="Number of Rooms"
            type="number"
            variant="outlined"
            value={formData.numberOfRooms}
            onChange={handleChange}

          />
          <TextField
            name="distance"
            label="Distance (km)"
            type="number"
            variant="outlined"
            value={formData.distance}
            onChange={handleChange}

          />
          <TextField
            name="yearBuilt"
            label="Year Built"
            type="number"
            variant="outlined"
            value={formData.yearBuilt}
            onChange={handleChange}

          />
          <TextField
            name="price"
            label="Price in $1,000,000"
            type="number"
            variant="outlined"
            value={formData.price}
            onChange={handleChange}

          />
          <TextField
            name="population"
            label="Population"
            type="number"
            variant="outlined"
            value={formData.population}
            onChange={handleChange}

          />
          <TextField
            name="educationScore"
            label="Education Score"
            type="number"
            variant="outlined"
            value={formData.educationScore}
            onChange={handleChange}

          />
          <Button type="submit" variant="contained" color="primary">
            Predict
          </Button>
        </Box>
      </form>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default PredictionForm;
