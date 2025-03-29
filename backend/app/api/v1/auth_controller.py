import os
from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from backend.app.schemas.auth_schema import (
    LoginRequest,
    SignupRequest,
    AuthResponse,
)
from backend.app.services.auth_service import AuthService
from backend.app.utils.jwt_utils import create_access_token

root_path = os.getenv("ROOT_PATH", "/backend")
router = APIRouter(prefix=f"{root_path}/api/v1/auth", tags=["Authentication"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{root_path}/api/v1/auth/login")


@router.post("/signup", response_model=AuthResponse)
async def signup(request: SignupRequest):
    auth_service = AuthService()
    user = await auth_service.signup(
        request.username, request.email, request.password
    )
    if not user:
        raise HTTPException(
            status_code=400, detail="Username or email already exists"
        )
    access_token = create_access_token(data={"sub": user.user_id})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    auth_service = AuthService()
    user = await auth_service.login(request.username, request.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": user.user_id})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    # Ở đây không cần logic phức tạp vì JWT là stateless, chỉ cần thông báo thành công
    return {"detail": "Successfully logged out"}
