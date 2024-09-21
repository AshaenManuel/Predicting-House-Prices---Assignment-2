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
Xint = df[['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt']].values
y = df['Price in $1,000,000'].values

# Scale features
scaler = StandardScaler()
Xint_scaled = scaler.fit_transform(Xint)

# Split data into training and testing sets
Xint_train, Xint_test, yint_train, yint_test = train_test_split(Xint_scaled, y, test_size=0.2, random_state=42)

alpha = 1.0
model = Ridge(alpha=alpha)

# Fit the model
model.fit(Xint_train, yint_train)

# Make predictions
yint_pred = model.predict(Xint_test)

# Evaluate the model
mse = mean_squared_error(yint_test, yint_pred)
print('Initial Evaluation:')
print(f'Initial Ridge Regression Mean Squared Error: {mse:.2f}')
print('\n')

#Repeating initial process to show improvements using additional dataset
Xfin = df[['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt', 'Population', 'Education Score', 'State Rank']].values

scaler = StandardScaler()
Xfin_scaled = scaler.fit_transform(Xfin)

Xfin_train, Xfin_test, yfin_train, yfin_test = train_test_split(Xfin_scaled, y, test_size=0.2, random_state=42)

alpha = 1.0
model = Ridge(alpha=alpha)

model.fit(Xfin_train, yfin_train)

yfin_pred = model.predict(Xfin_test)

mse = mean_squared_error(yfin_test, yfin_pred)
print('Final Evaluation:')
print(f'Final Ridge Regression Mean Squared Error: {mse:.2f}')

#Visualise coefficients and feature indexes on a bar chart
plt.bar(range(len(model.coef_)), model.coef_)
plt.xlabel('Feature Index')
plt.ylabel('Coefficient Value')
plt.title('Ridge Regression Coefficients')
plt.show()