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

# Create a categorical value for target field
df['Price Catergory']= pd.qcut(df['Price in $1,000,000'], 3, labels=['low','medium','high'])
y = df['Price Catergory']

# Split the dataset into training and testing sets
Xint_train, Xint_test, yint_train, yint_test = train_test_split(Xint_scaled, y, test_size=0.2, random_state=42)

# Create and train the linear regression model
model = svm.SVC(kernel='rbf')
model.fit(Xint_train, yint_train)

# Predict on test data
yint_pred = model.predict(Xint_test)

# Print model performance
print("Initial Evaluation:")
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


Xfin_train, Xfin_test, yfin_train, yfin_test = train_test_split(Xfin_scaled, y, test_size=0.2, random_state=42)

model = svm.SVC(kernel='rbf')
model.fit(Xfin_train, yfin_train)

yfin_pred = model.predict(Xfin_test)

print("Final Evaluation")
print(classification_report(yfin_test, yfin_pred))
cm = confusion_matrix(yfin_test, yfin_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.show()


