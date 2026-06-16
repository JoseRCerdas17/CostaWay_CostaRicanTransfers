from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class RouteBase(BaseModel):
    slug: str
    origin: str
    destination: str
    price: float
    currency: str = "USD"
    vehicle_type: str
    duration_estimate: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    active: bool = True
    sort_order: int = 0


class RouteCreate(RouteBase):
    pass


class RouteUpdate(BaseModel):
    slug: Optional[str] = None
    origin: Optional[str] = None
    destination: Optional[str] = None
    price: Optional[float] = None
    currency: Optional[str] = None
    vehicle_type: Optional[str] = None
    duration_estimate: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    active: Optional[bool] = None
    sort_order: Optional[int] = None


class RouteResponse(RouteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}