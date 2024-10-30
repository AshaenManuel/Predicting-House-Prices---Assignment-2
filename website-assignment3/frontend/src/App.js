import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, Tab, Tabs, Snackbar, Alert, TextField, IconButton, Fab, Paper } from '@mui/material';
import Home from './components/Home';
import Predict from './components/Predict';
import About from './components/About';
import Feedback from './components/Feedback';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import suburbsData from './finaldata.json';
import {Line} from 'react-chartjs-2'
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components with ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  // State to manage tab selection, form inputs, and chart data
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

  // Data preparation for bar, pannable, and scatter plots
  const barChartData = Object.values(
    suburbsData.Sheet1.reduce((acc, item) => {
      const suburb = item.Suburb;
      const price = item['Price in $1,000,000'];

      // Initialize the suburb entry in the accumulator if it doesn't exist
      if (!acc[suburb]) {
        acc[suburb] = {
          suburb: suburb,
          totalPrice: price // Start with the current price
        };
      } else {
        // Accumulate the price for the existing suburb
        acc[suburb].totalPrice += price;
      }

      return acc;
    }, {})
  )
    .sort((a, b) => b.totalPrice - a.totalPrice) // Sort by total price in descending order
    .slice(0, 10) // Get the top 10 suburbs
    .map(item => ({ suburb: item.suburb, price: item.totalPrice }));

  const pannableChartData = Object.values(
    suburbsData.Sheet1.reduce((acc, item) => {
      const suburb = item.Suburb;
      const price = item['Price in $1,000,000'];

      // Initialize the suburb entry in the accumulator if it doesn't exist
      if (!acc[suburb]) {
        acc[suburb] = {
          suburb: suburb,
          totalPrice: price // Start with the current price
        };
      } else {
        // Accumulate the price for the existing suburb
        acc[suburb].totalPrice += price;
      }

      return acc;
    }, {})
  )
    .map(item => ({ suburb: item.suburb, price: item.totalPrice }))
    .sort((a, b) => a.suburb.localeCompare(b.suburb)); // Sort by suburb in alphabetical order  

  const scatterPlotData = Object.values(
    suburbsData.Sheet1.reduce((acc, item) => {
      const suburb = item.Suburb;
      const price = item['Price in $1,000,000'];
      const educationScore = item['Education Score'];

      // Initialize the suburb entry in the accumulator if it doesn't exist
      if (!acc[suburb]) {
        acc[suburb] = {
          suburb: suburb,
          totalPrice: price, // Start with the current price
          totalEducationScore: educationScore, // Start with the current education score
          count: 1 // Start count at 1
        };
      } else {
        // Accumulate price and education score, and increment count for existing suburb
        acc[suburb].totalPrice += price;
        acc[suburb].totalEducationScore += educationScore;
        acc[suburb].count += 1;
      }

      return acc;
    }, {})
  )
    .map(item => ({
      suburb: item.suburb,
      averagePrice: item.totalPrice / item.count, // Calculate average price
      averageEducationScore: item.totalEducationScore / item.count // Calculate average education score
    }));
  
  // State for suburb list, feedback, snackbar notifications, and chart data
  const [suburbs, setSuburbs] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    feedback: ''
  });

  // Fetch unique suburbs on component mount
  useEffect(() => {
    document.title = "Melbourne Housing Price Predictor";
    const suburbList = suburbsData.Sheet1.map((item) => item.Suburb);
    const uniqueSuburbs = [...new Set(suburbList)].sort();
    setSuburbs(uniqueSuburbs);
  }, []);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Handle form input change with validation for specific fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'rooms' || name === 'bedrooms' || name === 'bathrooms' || name === 'year') {
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

  // State to store predicted price and error/loading indicators
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  // Form submission handler for making prediction request
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setPredictedPrice(null);
    setLoading(true);
    
    if (!formData.suburb) {
      alert("Please select a suburb.");
      return;
    }
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

    try {
      // Axios call to the backend to predict house price
      const response = await axios.get(`http://localhost:8000/predict/${formData.bathrooms}/${formData.rooms}/${formData.distance}/${formData.bedrooms}/${formData.year}/${formData.population}/${formData.educationScore}`);
      setPredictedPrice(response.data.predicted_price);

      // Create data for line chart showing predictions at various distances
      const distance = [10, 20, 30, 40, 50];
      const predictions = await Promise.all(
        distance.map(dis =>
          axios.get(`http://localhost:8000/predict/${dis}/${formData.bathrooms}/${formData.rooms}/${formData.bedrooms}/${formData.year}/${formData.population}/${formData.educationScore}`)
            .then(res => res.data.predicted_price)
        )
      );

     const newChartData ={
      labels: distance, // X-axis labels (square footage)
        datasets: [
          {
            label: 'Predicted Prices in $ millions',
            data: predictions,  // Y-axis data (predicted prices)
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.1
          },
          {
            label: 'Your Prediction',
            data: [{x: parseInt(formData.distance), y: response.data.predicted_price}],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            pointRadius: 8,
            pointHoverRadius: 12,
            showLine: false // Show only the point for the user's prediction
          }
        ]
      };

      setChartData(newChartData);  // Set the chart data in state
     
   } catch (err) {
     setError('Error predicting price. Please try again.');
     console.error(err);
   } finally {
     setLoading(false);
   }
    // Proceed with form submission
    console.log(formData);
    setSnackbarOpen(true);
  };

  // Snackbar and Feedback Handlers
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  // Handle Feedback Click (opens the feedback Snackbar)
  const handleFeedbackClick = () => {
    setFeedbackOpen(true);
  };

  // Handle Feedback Input Change
  const handleFeedbackInputChange = (event) => {
    const { name, value } = event.target;
    setFeedbackData({ ...feedbackData, [name]: value });
  };

  // Handle Feedback Submission
  const handleFeedbackSubmit = () => {
    if (feedbackData.name === '' || feedbackData.feedback === '') {
      alert('Please provide both name and feedback.');
      return;
    }

    alert(`Feedback submitted!\nName: ${feedbackData.name}\nFeedback: ${feedbackData.feedback}`);

    // Reset feedback data and close the Snackbar
    setFeedbackData({ name: '', feedback: '' });
    setFeedbackOpen(false);
  };

  // Handle closing the feedback Snackbar
  const handleFeedbackClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setFeedbackOpen(false);
  };

  // App's component layout with AppBar, Tab Panels, and Snackbar for form notifications
  return (
    <Container component="main" sx={{ padding: 0 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" sx={{backgroundColor: 'primary.main', color: 'white', p: 2, marginBottom: 0}}>
        Melbourne Housing Price Predictor
      </Typography>
      <AppBar position="static" sx={{ backgroundColor: 'primary.main', marginTop: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', border: '1px solid black' }}>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
            <Tabs value={value} onChange={handleChange} textColor="inherit">
              <Tab label="Home" />
              <Tab label="Predict" />
              <Tab label="About" />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
      {value === 0 && <Home barChartData={barChartData} pannableChartData={pannableChartData} scatterPlotData={scatterPlotData} />}
      {value === 1 && <Predict formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} suburbs={suburbs}/>}
      {value === 1 && predictedPrice && (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Predicted Price: ${predictedPrice.toLocaleString()}
              </Typography>
              {chartData && (
                <Box sx={{ mt: 3 }}>
                  <Line 
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: true,
                          text: 'Price Predictions by Distance'
                        }
                      },
                      scales: {
                        x: {
                          type: 'linear',
                          position: 'bottom',
                          title: {
                            display: true,
                            text: 'Distance'
                          }
                        },
                        y: {
                          title: {
                            display: true,
                            text: 'Predicted Price ($)'
                          }
                        }
                      }
                    }}
                  />
                </Box>
              )}
            </Paper>
          )}
      {value === 2 && <About />}
      <Feedback open={snackbarOpen} onClose={handleSnackbarClose} />
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Prediction submitted successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={feedbackOpen}
        autoHideDuration={null} // Stay open until manually closed
        onClose={handleFeedbackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: 1, width: '300px', border: '1px solid black'}}>
          <Typography variant="h6" sx={{ mb: 2 }}>Submit Feedback</Typography>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            name="name"
            value={feedbackData.name}
            onChange={handleFeedbackInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Feedback"
            fullWidth
            variant="outlined"
            name="feedback"
            value={feedbackData.feedback}
            onChange={handleFeedbackInputChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFeedbackSubmit}
            >
              Submit
            </Button>
            <IconButton color="inherit" onClick={handleFeedbackClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Snackbar>
      <Fab
        color="secondary"
        aria-label="feedback"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleFeedbackClick}
      >
        <FeedbackIcon />
      </Fab>
      <Box component="footer" sx={{ py: 6, mt: 'auto', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <Typography variant="body1">
            Predicting Housing Prices: Group05-05-Not Like Us
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </Container>

  );
}

export default App;
