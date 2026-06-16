from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class AdminUser(SQLModel, table=True):
    __tablename__ = "admin_users"

    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(unique=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)