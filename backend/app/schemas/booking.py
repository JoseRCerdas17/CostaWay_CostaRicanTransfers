from pydantic import BaseModel, EmailStr, Field
from datetime import date, time, datetime
from typing import Optional
from app.models.booking import PaymentType, PaymentStatus, BookingStatus


class BookingBase(BaseModel):
    customer_name: str = Field(min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    date: date
    time: time
    passengers: int = Field(ge=1, le=50)
    flight_number: Optional[str] = None


class BookingCreate(BookingBase):
    route_slug: Optional[str] = None
    quote_request_id: Optional[int] = None
    payment_type: PaymentType = PaymentType.FULL


class BookingUpdate(BaseModel):
    customer_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    date: Optional[date] = None
    time: Optional[time] = None
    passengers: Optional[int] = None
    flight_number: Optional[str] = None
    status: Optional[BookingStatus] = None
    provider_status: Optional[str] = None
    payment_status: Optional[PaymentStatus] = None


class BookingResponse(BookingBase):
    id: int
    route_id: Optional[int] = None
    quote_request_id: Optional[int] = None
    amount_due: float
    payment_type: PaymentType
    deposit_percentage: int
    payment_status: PaymentStatus
    stripe_payment_id: Optional[str] = None
    stripe_session_id: Optional[str] = None
    status: BookingStatus
    provider_status: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}