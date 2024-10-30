import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
  return (
<Box sx={{ mt: 4 }}>
          <Typography variant="h5" align="center">
            About This App
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            The Melbourne Housing Price Predictor was built by Ashaen, Disen and Tri. We started with planning out our project, then made our 
            Machine Learning Model to be able to predict housing prices, and then made this website to let users test our model.
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            The reason why we chose to build Machine Learning Algorithms to predict housing prices was so that it will be useful for us in the long run.
            It gave us an idea of what factors that affect housing prices in Melbourne. There were not so obvious factors too. If our model is deemed to be
            really good, we can even use our own website if we are looking at buying Houses in the future in Melbourne!
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            To provide a brief overview of how this website was created, we started with deciding who was gonna do which section of this full-stack
            web development assignment. We decided that Ashaen would do the front end, Disen back end, and Tri would do the AI model intergration. To
            create the front end, we used React JS, D3.JS, MUI to provide a clean, intuitive and professional look to the user. For the back end, we used
            Fast API, to connect the front end to the back end and then AI integration to connect the variables from the front end to the back end and return the predicted price and the chart.
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            Some features of this website include, the ability for users to interact with 3 charts: Zoomable Bar Chart, Pannable Bar Chart, and 
            Brushable Scatter Plot Chart. This improves the engagement of the user with the website. We have also added a way for users to provide
            feedback regarding the website to the developers. This is through the purple icon at the bottom right of the screen.
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            All in all, this felt like a very successful assignment. We all dedicated lot of time and hard-work to completing this assignment as we are
            targetting an HD grade. 
          </Typography>
        </Box>
  );
};

export default About;
