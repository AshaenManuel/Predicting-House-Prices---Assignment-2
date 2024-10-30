import React from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';

const Predict = ({ formData, handleInputChange, handleSubmit, suburbs }) => {
  return (
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
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <Select
          value={formData.suburb}
          onChange={handleInputChange}
          name="suburb"
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="" disabled>Select Suburb</MenuItem>
          {suburbs.map((suburb, index) => (
            <MenuItem key={index} value={suburb}>{suburb}</MenuItem>
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
              max: 8
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
              max: 10
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
              max: 6
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
          name="educationScore"
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
  );
};

export default Predict;
