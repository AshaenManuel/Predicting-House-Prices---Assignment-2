import math
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
from sklearn import svm

# Load and preprocess data
df = pd.read_csv("finalData.csv")

# Scale all features using StandardScaler
scaler = StandardScaler()

# Define features and target
features = ['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt']
Xint = df[features]
Xint_scaled = scaler.fit_transform(Xint)

# Scale the target (Price)
df['Price Catergory']= pd.qcut(df['Price in $1,000,000'],3, labels=['low','medium','high'])
y = df['Price Catergory']
print(df)

# Split the dataset into training and testing sets
Xint_train, Xint_test, yint_train, yint_test = train_test_split(Xint_scaled, y, test_size=0.2, random_state=42)

# Create and train the linear regression model
model = svm.SVC(kernel='rbf')
model.fit(Xint_train, yint_train)

# Predict on test data
yint_pred = model.predict(Xint_test)

# Print model performance

print(classification_report(yint_test, yint_pred))
cm = confusion_matrix(yint_test, yint_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()

#Repeating initial process to show improvements using additional dataset
features = ['Bathroom', 'Number of Rooms', 'Distance', 'Number of Bedroom', 'YearBuilt', 'Population', 'Education Score', 'State Rank']
Xfin = df[features]
Xfin_scaled = scaler.fit_transform(Xfin)

y= df['Price in $1,000,000']

Xfin_train, Xfin_test, yint_train, yint_test = train_test_split(Xfin_scaled, y, test_size=0.2, random_state=42)

model = svm.SVR()
model.fit(Xfin_train, yint_train)

yint_pred = model.predict(Xfin_test)

print('Final Evualtion:')
print('Final Mean Squared Error: %.2f' % mean_squared_error(yint_test, yint_pred))
print('Final Root Mean Squared Error: %.2f' % math.sqrt(mean_squared_error(yint_test, yint_pred)))
print('Final R^2 Score: %.2f' % r2_score(yint_test, yint_pred))
print('Final Mean Absolute Error: %.2f' % mean_absolute_error(yint_test, yint_pred))


# Visualize the results for just Bedrooms as a feature
plt.figure(figsize=(10, 6))
X = df[['Distance']]
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
model = svm.SVR()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
plt.scatter(X_test, y_test, color='black', label='Actual values')
plt.plot(X_test, y_pred, color='blue', linewidth=3, label='Predicted values')
plt.xlabel('Scaled Distance from CBD')
plt.ylabel('Price in Million($)')
plt.title('Supported Vector Regression on Melbourne Housing Dataset')
plt.legend()
plt.show()