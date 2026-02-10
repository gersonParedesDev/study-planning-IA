import uuid
from factory.faker import Faker
from factory.declarations import LazyFunction 
from factory.alchemy import SQLAlchemyModelFactory 
from app_infrastructure.database.models.user import UserModel

class UserModelFactory(SQLAlchemyModelFactory):
    class Meta:
        model = UserModel
        sqlalchemy_session_persistence = "commit"
        sqlalchemy_session = None

    id = LazyFunction(uuid.uuid4)
    
    username = Faker("user_name")
    email = Faker("email")
    password = Faker("password")
    
    firstname = Faker("first_name")
    lastname = Faker("last_name")
    
    age = Faker("random_int", min=19, max=90)
    country = Faker("country")
    study_field = "Computer Science"