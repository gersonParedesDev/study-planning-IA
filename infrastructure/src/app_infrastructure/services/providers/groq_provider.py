import os
from .base_openai_provider import OpenAICompatibleProvider

class GroqProvider(OpenAICompatibleProvider):
    def __init__(self):
        self.url = "https://api.groq.com/openai/v1/chat/completions"
        self.model = "llama-3.3-70b-versatile"
        self.api_key = os.getenv("GROQ_API_KEY") or ""