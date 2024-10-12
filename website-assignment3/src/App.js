import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Button, Tab, Tabs,
  TextField, Grid2, Snackbar, Alert, Paper
} from '@mui/material';

function App() {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    suburb: '',
    rooms: '',
    distance: '',
    yearBuilt: '',
    price: '',
    population: '',
    educationScore: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log(formData);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container component="main" sx={{ padding: 0 }}>
      <Typography 
        variant="h2" 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white', 
          p: 2, 
          marginBottom: 0
        }}
      >
        Melbourne Housing Price Predictor
      </Typography>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main', marginTop: 0 }}> {/* Ensure no margin */}
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', border: '1px solid black'}}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
            <Tabs value={value} onChange={handleChange} textColor="inherit">
              <Tab label="Home" />
              <Tab label="Predict" />
              <Tab label="About" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      
      {value === 1 && (
          <Box sx={{ mt: 4 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              backgroundColor: 'primary.light', 
              padding: 1, 
              textAlign: 'center'
            }}
          >
            Enter Data of the House for Prediction
          </Typography>
            <Box
              component="form"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              <TextField label="Suburb" variant="outlined" />
              <TextField label="Number of Rooms" variant="outlined" />
              <TextField label="Distance (km)" variant="outlined" />
              <TextField label="Year Built" variant="outlined" />
              <TextField label="Price in $1,000,000" variant="outlined" />
              <TextField label="Population" variant="outlined" />
              <TextField label="Education Score" variant="outlined" />
              <Button variant="contained" sx={{ mt: 2, mb: 4 }}>Predict</Button>
            </Box>
          </Box>
        )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Prediction submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
