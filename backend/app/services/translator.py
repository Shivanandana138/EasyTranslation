import os

from dotenv import load_dotenv
from google import genai


load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured.")

client = genai.Client(api_key=GEMINI_API_KEY)


MODEL_NAME = "gemini-3.1-flash-lite"


def translate_text(
    text: str,
    source_language: str,
    target_language: str,
) -> str:

    prompt = f"""
You are a professional translation assistant for an Indian language
translation application called EasyTranslation.

Translate the user's input into natural Malayalam.

Supported source inputs:
- Kannada script
- Kannada written using English letters (Kanglish)
- English
- Automatically detect the source language when source_language is "auto"

Rules:
1. Preserve the original meaning.
2. Produce natural, grammatically correct Malayalam.
3. If the input is Kanglish, understand it as Kannada written in Latin characters.
4. Do not explain the translation.
5. Return ONLY the Malayalam translation.
6. Preserve names, numbers, URLs, and important proper nouns where appropriate.
7. Do not add quotation marks around the translation.

Source language:
{source_language}

Target language:
{target_language}

Text to translate:
{text}
"""

    response = client.models.generate_content(
        model=MODEL_NAME,
        contents=prompt,
    )

    if not response.text:
        raise RuntimeError("Gemini returned an empty response.")

    return response.text.strip()