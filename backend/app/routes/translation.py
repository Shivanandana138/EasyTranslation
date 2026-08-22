from fastapi import APIRouter

from app.schemas.translation import (
    TranslationRequest,
    TranslationResponse,
)
from app.services.translator import translate_text


router = APIRouter(
    prefix="/translate",
    tags=["Translation"],
)


@router.post("", response_model=TranslationResponse)
def translate(request: TranslationRequest):
    translation = translate_text(
        text=request.text,
        source_language=request.source_language,
        target_language=request.target_language,
    )

    return TranslationResponse(
        translation=translation,
        source_language=request.source_language,
        target_language=request.target_language,
    )