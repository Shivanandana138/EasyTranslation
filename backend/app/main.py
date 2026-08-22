from fastapi import FastAPI
from app.routes.translation import router as translation_router

app = FastAPI(
    title="EasyTranslation API",
    description="Backend API for translating Kannada, Kanglish and English into Malayalam.",
    version="0.1.0",
)
app.include_router(translation_router)


@app.get("/")
def root():
    return {
        "message": "EasyTranslation API is running!",
        "version": "0.1.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }