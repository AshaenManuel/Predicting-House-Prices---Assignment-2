import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler
import math

#Load the pre-processed dataframe
df = pd.read_csv("finalData.csv")

# Scale all features using StandardScaler
scaler = StandardScaler()

# Define features and target
features = ['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt']
Xint = df[features]
Xint_scaled = scaler.fit_transform(Xint)

# Scale the target (Price)
y = df['Price in $1,000,000']

# Split the dataset into training and testing sets
Xint_train, Xint_test, yint_train, yint_test = train_test_split(Xint_scaled, y, test_size=0.2, random_state=42)

alpha = 1.0
model = Ridge(alpha=alpha)

# Fit the model
model.fit(Xint_train, yint_train)

# Make predictions
yint_pred = model.predict(Xint_test)

# Print model performance
print("Initial Evaluation:")
print('Initial Mean Squared Error: %.2f' % mean_squared_error(yint_test, yint_pred))
print('Final Root Mean Squared Error: %.2f' % math.sqrt(mean_squared_error(yint_test, yint_pred)))
print('Initial R^2 Score: %.2f' % r2_score(yint_test, yint_pred))
print('Initial Mean Absolute Error: %.2f' % mean_absolute_error(yint_test, yint_pred))
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

print("Final Evaluation:")
print('Final Mean Squared Error: %.2f' % mean_squared_error(yfin_test, yfin_pred))
print('Final Root Mean Squared Error: %.2f' % math.sqrt(mean_squared_error(yint_test, yfin_pred)))
print('Final R^2 Score: %.2f' % r2_score(yfin_test, yfin_pred))
print('Final Mean Absolute Error: %.2f' % mean_absolute_error(yfin_test, yfin_pred))

#Visualise coefficients and feature indexes on a bar chart
plt.bar(range(len(model.coef_)), model.coef_)
plt.xlabel('Feature Index')
plt.ylabel('Coefficient Value')
plt.title('Ridge Regression Coefficients')
plt.show()