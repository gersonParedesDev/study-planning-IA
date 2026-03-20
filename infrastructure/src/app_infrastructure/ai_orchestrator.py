import os
from app_domain.ports.output.ai_provider import AIProvider, Message
from app_infrastructure.services.providers.groq_provider import GroqProvider
from app_infrastructure.services.providers.deepseek_provider import DeepSeekProvider
from typing import List

class AIOrchestrator:
    def __init__(self):
        self.providers = {
            "groq": GroqProvider(),
            "deepseek": DeepSeekProvider(),
        }
        self.default = os.getenv("AI_PROVIDER", "groq")

        # Reglas: qué proveedor usar según la tarea
        self.task_providers = {
            "quick":      "groq",      # respuestas rápidas, V/F
            "reasoning":  "deepseek",  # plan de estudio, razonamiento
            "default":    self.default
        }

    def chat(self, system_prompt: str, messages: List[Message], task: str = "default") -> str:
        provider_name = self.task_providers.get(task, self.default)
        provider: AIProvider = self.providers[provider_name]
        return provider.chat(system_prompt, messages)

orchestrator = AIOrchestrator()