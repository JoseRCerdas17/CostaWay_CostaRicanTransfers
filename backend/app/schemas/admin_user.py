from pydantic import BaseModel, EmailStr


class AdminUserCreate(BaseModel):
    email: EmailStr
    password: str


class AdminUserResponse(BaseModel):
    id: int
    email: str
    is_superadmin: bool

    model_config = {"from_attributes": True}


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


class TokenData(BaseModel):
    user_id: int
    email: str
    is_superadmin: bool