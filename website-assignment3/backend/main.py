from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model import SimpleModel

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # URL of React application
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the model
model = SimpleModel()

@app.get("/")
async def root():
    return {"message": "Welcome to the House Price Prediction API"}

@app.get("/predict/{bathroom}/{rooms}/{distance}/{bedroom}/{yearbuilt}/{population}/{education}")
async def predict_price(bathroom: int, rooms: int, distance: int, bedroom: int, yearbuilt: int, population: int, education: int):
    model.load_model()
    price = model.predict(bathroom, rooms, distance, bedroom, yearbuilt, population, education)[0]
    return {"predicted_price": price}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)