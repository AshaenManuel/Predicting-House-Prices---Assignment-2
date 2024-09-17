import processing_tri
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
from sklearn import svm

# Load and preprocess data
df = processing_tri.cleanData


# Modify the original DataFrame
df.loc[:, 'Price($)'] = df['Price($)'] / 1000

# Scale all features using StandardScaler
scaler = StandardScaler()

# Define features and target
features = ['Bathroom', 'Landsize', 'Number of Bedrooms']
X = df[features]
X_scaled = scaler.fit_transform(X)

# Scale the target (Price)
y = df['Price($)']/1000

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Create and train the linear regression model
model = svm.LinearSVR()
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Print model performance
print('Mean Squared Error: %.2f' % mean_squared_error(y_test, y_pred))
print('R^2 Score: %.2f' % r2_score(y_test, y_pred))