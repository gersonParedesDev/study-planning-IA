import factory
from app_infrastructure.database.models.subject import SubjectModel
from app_infrastructure.tests.factories.user_factory import UserModelFactory # Importa el factory de usuario

class SubjectModelFactory(factory.alchemy.SQLAlchemyModelFactory):
    class Meta:
        model = SubjectModel
        sqlalchemy_session_persistence = "commit"

    
    id = factory.Faker("uuid4", cast_to=None)
    name = factory.Sequence(lambda n: f"Materia {n}")
    description = factory.Faker("sentence")

    user_id = factory.LazyAttribute(lambda o: o.user.id if hasattr(o, 'user') else None)