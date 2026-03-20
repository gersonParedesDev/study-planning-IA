import os
from .base_openai_provider import OpenAICompatibleProvider

class DeepSeekProvider(OpenAICompatibleProvider):
    def __init__(self):
        self.url = "https://api.deepseek.com/v1/chat/completions"
        self.model = "deepseek-chat"
        self.api_key = os.getenv("DEEPSEEK_API_KEY") or ""