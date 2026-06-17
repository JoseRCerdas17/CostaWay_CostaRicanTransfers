from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session
from app.database import get_session
from app.models.admin_user import AdminUser
from app.schemas.admin_user import AdminUserCreate, AdminUserResponse, Token
from app.auth.jwt_auth import (
    authenticate_user,
    create_access_token,
    get_password_hash,
    get_current_user,
)

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    """Authenticate admin user and return JWT token."""
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"user_id": user.id, "email": user.email, "is_superadmin": user.is_superadmin}
    )
    return Token(access_token=access_token)


@router.post("/register", response_model=AdminUserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: AdminUserCreate,
    session: Session = Depends(get_session),
):
    """Register a new admin user."""
    existing = session.query(AdminUser).filter(AdminUser.email == user_data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    hashed_password = get_password_hash(user_data.password)
    user = AdminUser(
        email=user_data.email,
        password_hash=hashed_password,
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.get("/me", response_model=AdminUserResponse)
async def get_current_user_info(
    current_user: AdminUser = Depends(get_current_user),
):
    """Get current authenticated user info."""
    return current_user