from pydantic import BaseModel, Field


class TranslationRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=2000)
    source_language: str = "auto"
    target_language: str = "malayalam"


class TranslationResponse(BaseModel):
    translation: str
    source_language: str
    target_language: str