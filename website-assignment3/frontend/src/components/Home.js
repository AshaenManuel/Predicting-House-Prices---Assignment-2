import React from 'react';
import { Box, Typography } from '@mui/material';
import ZoomableBarChart from "./../charts/zoomablebarchart";
import PannableChart from "./../charts/pannablechart";
import ScatterPlot from "./../charts/scatterplot";

const Home = ({ barChartData, pannableChartData, scatterPlotData }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" align="center">
        Welcome to the Melbourne Housing Price Predictor!
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        This application helps you predict housing prices based on various parameters such as suburb, number of rooms, number of bedrooms,
        number of bathrooms, distance from the CBD, year built, population and education score.
      </Typography>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
        The barchart below shows the top 5 most expensive suburbs based on the accumulated cost of houses in each suburb.
      </Typography>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        {barChartData && barChartData.length > 0 ? (
          <ZoomableBarChart data={barChartData} />
        ) : (
          <Typography variant="body1" align="center">No data available for the chart.</Typography>
        )}
      </Box>
      <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            The Pannable Chart below shows the accumulated cost of houses in all suburbs in Melbourne. Again, the y axis 
            resembles the total price in $1,000,000 and the x axis resembles all the suburbs in Melbourne.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <PannableChart data={pannableChartData} />
          </Box>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            The Brushable Scatterplot Chart below shows the how the Education Score affects the Price in $1,000,000 for all suburbs in Melbourne.
            Keep in mind that the values shown are the average of each suburb.
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <ScatterPlot data={scatterPlotData.map(item => ({
              price: item.averagePrice,
              educationScore: item.averageEducationScore,
            }))} />
          </Box>
    </Box>
  );
};

export default Home;
