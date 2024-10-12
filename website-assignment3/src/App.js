import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Box, Button, Tab, Tabs,
  TextField, Snackbar, Alert, Select, MenuItem
} from '@mui/material';
import suburbsData from './finaldata.json';

function App() {
  const [value, setValue] = useState(0);
  const [formData, setFormData] = useState({
    suburb: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    distance: '',
    yearBuilt: '',
    population: '',
    educationScore: ''
  });
  const [suburbs, setSuburbs] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const suburbList = suburbsData.Sheet1.map((item) => item.Suburb);
    const uniqueSuburbs = [...new Set(suburbList)].sort();
    setSuburbs(uniqueSuburbs);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'rooms' || name === 'bedrooms' || name ==='bathrooms' || name === 'year') {
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue) && numericValue.toString() === value) {
        setFormData({ ...formData, [name]: numericValue });
      } else if (value === '') {
        setFormData({ ...formData, [name]: '' });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (formData.rooms < 1 || formData.rooms > 8) {
      alert("Number of rooms must be between 1 and 8.");
      return;
    }
    if (formData.bedrooms < 0 || formData.bedrooms > 10) {
      alert("Number of bedrooms must be between 0 and 10.");
      return;
    }
    if (formData.bathrooms < 0 || formData.bathrooms > 6) {
      alert("Number of bathrooms must be between 0 and 6.");
      return;
    }
    if (formData.distance < 1) {
      alert("Distance from the CBD must be greater than 0.");
      return;
    }
    if (formData.year > 2024) {
      alert("Year built must be before this year.");
      return;
    }
    if (formData.population < 1) {
      alert("Population must be greater than 0.");
      return;
    }
    if (formData.educationScore < 1) {
      alert("Education Score must be greater than 0.");
      return;
    }
    // Proceed with form submission
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
              <Select
                value={formData.suburb}
                onChange={handleInputChange}
                name="suburb"
                displayEmpty
                variant="outlined"
              >
                <MenuItem value="" disabled>
                  Select Suburb
                </MenuItem>
                {suburbs.map((suburb, index) => (
                  <MenuItem key={index} value={suburb}>
                    {suburb}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Number of Rooms"
                variant="outlined"
                type="number"
                name="rooms"
                value={formData.rooms}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    min: 1,
                    max: 8,
                  }
                }}
              />
              <TextField
                label="Number of Bedrooms"
                variant="outlined"
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 10,
                  }
                }}
              />
              <TextField
                label="Number of Bathrooms"
                variant="outlined"
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 6,
                  }
                }}
              />
              <TextField
                label="Distance (km) from CBD"
                variant="outlined"
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    min: 1,
                  }
                }}
              />
              <TextField
                label="Year Built"
                variant="outlined"
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    max: 2024,
                  }
                }}
              />
              <TextField
                label="Population"
                variant="outlined"
                type="number"
                name="population"
                value={formData.population}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    min: 1,
                  }
                }}
              />
              <TextField
                label="Education Score"
                variant="outlined"
                type="number"
                name="educationscore"
                value={formData.educationScore}
                onChange={handleInputChange}
                slotProps={{
                  htmlInput: {
                    min: 1,
                  }
                }}
              />
              <Button variant="contained" sx={{ mt: 2, mb: 4 }} onClick={handleSubmit}>Predict</Button>
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
