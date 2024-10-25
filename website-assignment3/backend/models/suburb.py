from sqlalchemy import Table, Column, Integer, String, Numeric
from config.db import metadata

# Define the User table
suburbs = Table(
    "suburb",
    metadata,
    Column("_EMPTY", Integer, primary_key=True),
    Column("Suburb", String(50), nullable=False),
    Column("Number_of_Rooms", Integer, nullable=False),
    Column("Distance", Numeric(4, 1), nullable=False),
    Column("Number_of_Bedroom", Integer, nullable=False),
    Column("Bathroom", Integer, nullable=False),
    Column("YearBuilt", Integer, nullable=False),
    Column("Price_in_1000000", Numeric(8, 6), nullable=False),
    Column("Population", Integer, nullable=False),
    Column("Education_Score", Integer, nullable=False),
    Column("State", String(3), nullable=False),
    Column("State_Rank", Integer, nullable=False)
)