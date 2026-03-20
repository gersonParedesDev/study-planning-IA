import requests
import os
from typing import List
from app_domain.ports.output.ai_provider import AIProvider, Message, RoleMessageType

class OpenAICompatibleProvider(AIProvider):
    url: str
    model: str
    api_key: str

    def chat(self, system_prompt: str, messages: List[Message]) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

        all_messages = [{"role": RoleMessageType.SYSTEM.value, "content": system_prompt}]
        all_messages += [{"role": m.role.value, "content": m.content} for m in messages]
        payload = {
            "model": self.model,
            "messages": all_messages,
            "max_tokens": 4096,
            "temperature": 0.7,
        }

        response = requests.post(self.url, headers=headers, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]