import factory 
from datetime import datetime, timezone
from app_domain.entities.user import User

class UserFactory(factory.Factory):
    class Meta:
        model = User

    id = factory.Faker("uuid4")
    username = factory.Faker("user_name")
    email = factory.Faker("email")
    password = factory.Faker("password")
    firstname = factory.Faker("first_name")
    lastname = factory.Faker("last_name")
    age = factory.Faker("random_int", min=18, max=80)
    country = factory.Faker("country_code")
    study_field = factory.Faker("job")
    
    created_at = factory.LazyAttribute(lambda x: datetime.now(timezone.utc))