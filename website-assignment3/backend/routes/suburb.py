from fastapi import APIRouter
from config.db import conn
from models.index import suburbs
from schemas.index import Suburb
from ml_model.model import predict_price

suburb = APIRouter()

@suburb.get("/")
async def read_data():
    return conn.execute(suburbs.select()).mappings().all()

@suburb.get("/{id}")
async def read_single_data(id:int):
    return conn.execute(suburbs.select().where(suburbs.c._EMPTY == id)).mappings().all()

@suburb.post("/")
async def write_data(sunurb: Suburb):
    conn.execute(suburbs.insert().values(
        Suburb= sunurb.Suburb,
        Number_of_Rooms= sunurb.Number_of_Rooms,
        Distance= sunurb.Distance,
        Number_of_Bedroom= sunurb.Number_of_Bedroom,
        Bathroom= sunurb.Bathroom,
        YearBuilt= sunurb.YearBuilt,
        Price_in_1000000= sunurb.Price_in_1000000,
        Education_Score= sunurb.Education_Score,
        State= sunurb.State,
        State_Rank= sunurb.State_Rank
    ))
    return conn.execute(suburb.select()).mappings().all()

@suburb.put("/{id}")
async def update_data(id:int, sunurb: Suburb):
    conn.execute(suburbs.update(
        Suburb= sunurb.Suburb,
        Number_of_Rooms= sunurb.Number_of_Rooms,
        Distance= sunurb.Distance,
        Number_of_Bedroom= sunurb.Number_of_Bedroom,
        Bathroom= sunurb.Bathroom,
        YearBuilt= sunurb.YearBuilt,
        Price_in_1000000= sunurb.Price_in_1000000,
        Education_Score= sunurb.Education_Score,
        State= sunurb.State,
        State_Rank= sunurb.State_Rank
    ).where(suburbs.c._EMPTY == id))
    return conn.execute(suburb.select()).mappings().all()

    
@suburb.delete("/{id}")
async def delete_data(id:int):
    conn.execute(suburbs.delete().where(suburbs.c._EMPTY == id))
    return conn.execute(suburb.select()).mappings().all()

@suburb.post("/predict-date")
async def predict_data_from_ai_model(sunurb: Suburb):
    result = predict_price(
        sunurb.Suburb,
        sunurb.Number_of_Rooms,
        sunurb.Number_of_Bedroom,
        sunurb.Bathroom,
        sunurb.Distance,
        sunurb.YearBuilt,
        sunurb.Population,
        sunurb.Education_Score
    )
    result = f"${result:.2f} million"
    return {'value':result}

