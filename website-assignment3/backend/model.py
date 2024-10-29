import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error, r2_score
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn import svm

class SimpleModel:
    def __init__(self):
        self.model = svm.SVR(kernel='rbf')
        self.scaler = StandardScaler()

    def train(self):
        data = pd.read_csv("finalData.csv")
        X = data[['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt', 'Population', 'Education Score']].values
        y = data['Price in $1,000,000'].values
        
        # Fit the scaler to the training data
        X_scaled = self.scaler.fit_transform(X)
        
        # Train the model
        self.model.fit(X_scaled, y)
        
        # Save the model and scaler
        joblib.dump(self.model, 'simple_model.pkl')
        joblib.dump(self.scaler, 'scaler.pkl')

        # Evaluation
        predictions = self.model.predict(X_scaled)
        mse = mean_squared_error(y, predictions)
        r2 = r2_score(y, predictions)
        print(f"Model trained. MSE: {mse}, R²: {r2}")

    def load_model(self):
        self.model = joblib.load('simple_model.pkl')
        self.scaler = joblib.load('scaler.pkl')

    def predict(self, bathroom, rooms, distance, bedroom, yearbuilt, population, education):
        # Scale the input features
        scaled_features = self.scaler.transform([[bathroom, rooms, distance, bedroom, yearbuilt, population, education]])
        return self.model.predict(scaled_features)

if __name__ == "__main__":
    model = SimpleModel()
    model.train()
