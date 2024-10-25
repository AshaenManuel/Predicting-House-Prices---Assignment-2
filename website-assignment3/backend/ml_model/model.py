import math
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, r2_score, mean_absolute_error
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.svm import SVR
import os

# Load and preprocess data
file_path = os.path.join(os.path.dirname(__file__), 'finalData.csv')
df = pd.read_csv(file_path)

# Define features and target
features = ['Suburb', 'Number of Rooms', 'Number of Bedroom', 'Bathroom', 'Distance', 'YearBuilt', 'Population', 'Education Score']
X = df[features]
y = df['Price in $1,000,000']

# Preprocess the data
# One-hot encode the 'Suburb' column and scale the other numerical features
preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), ['Number of Rooms', 'Number of Bedroom', 'Bathroom', 'Distance', 'YearBuilt', 'Population', 'Education Score']),
        ('cat', OneHotEncoder(), ['Suburb'])
    ])

# Create a pipeline with preprocessing and model
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', SVR())
])

# Train the model
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)

# Function to predict price based on user inputs
def predict_price(suburb, num_rooms, num_bedrooms, num_bathrooms, distance, year_built, population, education_score):
    # Create a DataFrame for the input data
    input_data = pd.DataFrame({
        'Suburb': [suburb],
        'Number of Rooms': [num_rooms],
        'Number of Bedroom': [num_bedrooms],
        'Bathroom': [num_bathrooms],
        'Distance': [distance],
        'YearBuilt': [year_built],
        'Population': [population],
        'Education Score': [education_score]
    })

    # Predict the price using the trained pipeline
    predicted_price = pipeline.predict(input_data)
    return predicted_price[0]

# Get the prediction
predicted_price = predict_price('Abbotsford', 3, 2, 3, 5, 2000, 9000, 1000)
print(f"The predicted housing price is: ${predicted_price:.2f} million")
