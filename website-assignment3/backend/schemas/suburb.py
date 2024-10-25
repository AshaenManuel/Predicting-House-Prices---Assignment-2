from pydantic import BaseModel

class Suburb(BaseModel):
    _EMPTY:int
    Suburb:str
    Number_of_Rooms: int
    Distance: float
    Number_of_Bedroom: int
    Bathroom: int
    YearBuilt: int
    Price_in_1000000: float
    Population: int
    Education_Score: int
    State: str
    State_Rank: int