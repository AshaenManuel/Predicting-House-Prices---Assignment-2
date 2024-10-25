from fastapi import FastAPI
from routes.index import suburb

app = FastAPI()


# @app.get("/")
# def read_something():
#     return {"msg" : "Hello world"}

app.include_router(suburb)

