from sqlmodel import SQLModel, Field
from datetime import datetime, date, time
from typing import Optional
from enum import Enum


class PaymentType(str, Enum):
    FULL = "full"
    DEPOSIT = "deposit"


class PaymentStatus(str, Enum):
    PENDING = "pending"
    PAID = "paid"
    FAILED = "failed"
    REFUNDED = "refunded"


class BookingStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    CANCELLED = "cancelled"


class Booking(SQLModel, table=True):
    __tablename__ = "bookings"

    id: Optional[int] = Field(default=None, primary_key=True)
    route_id: Optional[int] = Field(default=None, foreign_key="routes.id")
    quote_request_id: Optional[int] = Field(default=None, foreign_key="quote_requests.id")

    customer_name: str
    email: str
    phone: Optional[str] = None

    date: date
    time: time
    passengers: int
    flight_number: Optional[str] = None

    amount_due: float
    payment_type: PaymentType = PaymentType.FULL
    deposit_percentage: int = Field(default=100)

    payment_status: PaymentStatus = PaymentStatus.PENDING
    stripe_payment_id: Optional[str] = None
    stripe_session_id: Optional[str] = None

    status: BookingStatus = BookingStatus.PENDING
    provider_status: Optional[str] = None

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)