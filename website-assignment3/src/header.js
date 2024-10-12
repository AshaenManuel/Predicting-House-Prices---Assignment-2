import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Header = ({ onNavigate }) => {
  return (
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
  );
};

export default Header;
