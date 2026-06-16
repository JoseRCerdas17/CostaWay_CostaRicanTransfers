from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class Route(SQLModel, table=True):
    __tablename__ = "routes"

    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(unique=True, index=True)
    origin: str
    destination: str
    price: float
    currency: str = Field(default="USD")
    vehicle_type: str
    duration_estimate: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    active: bool = Field(default=True)
    sort_order: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)