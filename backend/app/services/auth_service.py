from backend.app.models.User import User
from backend.app.repositories.user_repository import UserRepository
from backend.app.database.dynamodb_connection import DynamoDBConnection
from passlib.context import CryptContext
import uuid


class AuthService:
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        db_connection = DynamoDBConnection()
        self.user_repository = UserRepository(
            db_connection.get_dynamodb_resource()
        )

    async def signup(self, username: str, email: str, password: str):
        existing_user = await self.user_repository.get_user_by_username(
            username
        )
        if existing_user:
            return None
        password_hash = self.pwd_context.hash(password)
        user = User(
            user_id=str(uuid.uuid4()),
            username=username,
            email=email,
            password_hash=password_hash,
        )
        await self.user_repository.create_user(user)
        return user

    async def login(self, username: str, password: str):
        user = await self.user_repository.get_user_by_username(username)
        if not user or not self.pwd_context.verify(
            password, user.password_hash
        ):
            return None
        return user
