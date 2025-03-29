from pydantic import BaseModel
from typing import Optional


class User(BaseModel):
    user_id: str
    username: str
    email: str
    password_hash: str  # Lưu mật khẩu đã mã hóa
    role: Optional[str] = "member"
