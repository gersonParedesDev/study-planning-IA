import factory 
from datetime import datetime, timezone
from app_domain.entities.subject import Subject

class SubjectFactory(factory.Factory):
    class Meta:
        model = Subject

    id = factory.Faker("uuid4")
    user_id = factory.Faker("uuid4")
    area_id = factory.Faker("uuid4")
    name = factory.Faker("word")
    
    created_at = factory.LazyAttribute(lambda x: datetime.now(timezone.utc))