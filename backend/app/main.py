from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
app = FastAPI(title="Multi-Agent AI Assistant")



port = int(os.environ.get("PORT", 8000))


# CORS (important for React later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routes import chat

app.include_router(chat.router, prefix="/chat", tags=["Chat"])
from app.database.db import engine
try:
    conn = engine.connect()
    print("DB Connected")
except Exception as e:
    print("DB Error:", e)

from app.routes import upload

app.include_router(upload.router, prefix="/upload", tags=["Upload"])

@app.get("/")
def root():
    return {"message": "AI Assistant Backend Running 🚀"}


@app.get("/health")
def health_check():
    return {"status": "OK"}