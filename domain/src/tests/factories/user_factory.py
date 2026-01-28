import factory
from datetime import datetime
from src.entities.user import User

class UserFactory(factory.Factory):
    class Meta:
        model = User

    id = factory.Faker("uuid4")
    username = factory.Faker("user_name")
    email = factory.Faker("email")
    password = factory.Faker("password")
    created_at = factory.LazyFunction(datetime.now)