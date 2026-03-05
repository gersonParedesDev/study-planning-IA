from abc import ABC, abstractmethod
from app_domain.entities.resource import Resource

class ResourceRepository(ABC):

    @abstractmethod
    def save(self, resource: Resource) -> Resource:
        pass