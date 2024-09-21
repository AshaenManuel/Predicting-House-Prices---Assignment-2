import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler

# Load and preprocess data
df = pd.read_csv("finalData.csv")

# Scale all features using StandardScaler
scaler = StandardScaler()

# Define features and target
features = ['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt']
X = df[features]
X_scaled = scaler.fit_transform(X)

# Scale the target (Price)
y = df['Price in $1,000,000']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Create and train the linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict on test data
y_pred = model.predict(X_test)

# Print model performance
print('Mean Squared Error: %.2f' % mean_squared_error(y_test, y_pred))
print('R^2 Score: %.2f' % r2_score(y_test, y_pred))
print('Mean Absolute Error: %.2f' % mean_absolute_error(y_test, y_pred))

# Visualize the results for just Bedrooms as a feature
plt.figure(figsize=(10, 6))
features = ['Distance']
X = df[features]
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
plt.scatter(X_test, y_test, color='black', label='Actual values')
plt.plot(X_test, y_pred, color='blue', linewidth=3, label='Predicted values')
plt.xlabel('Scaled Distance')
plt.ylabel('Price in Million($)')
plt.title('Linear Regression on Melbourne Housing Dataset')
plt.legend()
plt.show()