import openai
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routers import job
from app.api.routers import interview
from app.database import engine
from app.models import profile, chat_session, message, job_description
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv()) # read local .env file
openai.api_key = os.environ['OPENAI_API_KEY']

def create_tables():
    profile.Base.metadata.create_all(bind=engine)
    chat_session.Base.metadata.create_all(bind=engine)
    message.Base.metadata.create_all(bind=engine)
    job_description.Base.metadata.create_all(bind=engine)  

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],  # Hoặc chỉ định ["GET", "POST", "PATCH", "DELETE"]
    allow_headers=["*"],  # Hoặc chỉ định ["Authorization", "Content-Type"]
)

@app.on_event("startup")
async def on_startup():
    create_tables()

app.include_router(job.router, prefix="/api", tags=["jobs"])  
app.include_router(interview.router, prefix="/api", tags=["interviews"])  