from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

from backend.app.api.v1.auth_controller import router as auth_router

app = FastAPI()
app.include_router(auth_router)
