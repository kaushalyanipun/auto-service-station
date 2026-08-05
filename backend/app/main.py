from fastapi import FastAPI
from app.vehicles.routes import router as vehicles_router

app = FastAPI(title="Auto Service Station API")

app.include_router(vehicles_router)

@app.get("/")
def read_root():
    return {"message": "Auto Service Station Backend is running successfully!"}