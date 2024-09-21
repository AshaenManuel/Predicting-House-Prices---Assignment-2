import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler

#Load the pre-processed dataframe
df = pd.read_csv("finalData.csv")

# Define Features and target variable
X = df[['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt']].values
y = df['Price in $1,000,000'].values

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

alpha = 1.0
model = Ridge(alpha=alpha)

# Fit the model
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)

# Evaluate the model
mse = mean_squared_error(y_test, y_pred)
print(f'Ridge Regression Mean Squared Error: {mse:.2f}')

#Visualise coefficients and feature indexes on a bar chart
plt.bar(range(len(model.coef_)), model.coef_)
plt.xlabel('Feature Index')
plt.ylabel('Coefficient Value')
plt.title('Ridge Regression Coefficients')
plt.show()