from pydantic import BaseModel, EmailStr, Field
from datetime import date, datetime
from typing import Optional
from app.models.quote_request import QuoteRequestStatus


class QuoteRequestBase(BaseModel):
    origin: str = Field(min_length=2)
    destination: str = Field(min_length=2)
    travel_date: Optional[date] = None
    passengers: int = Field(ge=1, le=50)
    customer_name: str = Field(min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    notes: Optional[str] = None


class QuoteRequestCreate(QuoteRequestBase):
    pass


class QuoteRequestUpdate(BaseModel):
    status: Optional[QuoteRequestStatus] = None
    quoted_price: Optional[float] = None
    payment_link: Optional[str] = None


class QuoteRequestResponse(QuoteRequestBase):
    id: int
    status: QuoteRequestStatus
    quoted_price: Optional[float] = None
    payment_link: Optional[str] = None
    converted_booking_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}