from backend.app.models.User import User


class UserRepository:
    def __init__(self, dynamodb):
        self.dynamodb = dynamodb
        self.table_name = "Users"

    async def create_user(self, user: User):
        table = self.dynamodb.Table(self.table_name)
        await table.put_item(Item=user.dict())

    async def get_user_by_username(self, username: str):
        table = self.dynamodb.Table(self.table_name)
        response = await table.get_item(Key={"username": username})
        return User(**response["Item"]) if "Item" in response else None
