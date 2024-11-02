# Melbourne Housing Price Predictor #

This project is a web-based application that predicts housing prices in Melbourne based on various property features. It includes data visualization, a user-friendly input form, and a prediction model using Support Vector Regression (SVR) to estimate property prices.

## Project Structure ##

Frontend: A React application for the user interface, form inputs, and interactive data visualizations.
Backend: A FastAPI application to handle prediction requests, integrate the AI model, and provide a REST API for the frontend.
AI Model: An SVR model to process and predict housing prices based on user inputs.

### Set Up Instructions ###

1. Download the Project File System
2. Install Node.js
3. If havent already, include the node_modules folder in the frontend directory.
3. Using pip and npm commands, install python, material ui, d3.js, chart.js, fastapi, uvicorn, scikit-learn, joblib, pandas, numpy
4. If there are anymore libraries missing, please install them as recommended
5. Navigate to the backend directory and type `python model.py`. This will train the model and generate simple_model.pkl and scaler.pkl if havent already and set up AI model integration.
6. Run `uvicorn main:app --reload`. This will run the backend server.
7. Navigate to the frontend directory and type `npm start`. This will start the website.

### How to Use the Website ###

1. In the Home page, you can interact with the charts.
2. In the Predict page, you can submit data to predict a housing price
3. In the About page, you can read about how we made this project.



