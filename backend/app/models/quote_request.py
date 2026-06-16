from sqlmodel import SQLModel, Field
from datetime import datetime, date
from typing import Optional
from enum import Enum


class QuoteRequestStatus(str, Enum):
    PENDING = "pending"
    QUOTED = "quoted"
    CONVERTED = "converted"
    REJECTED = "rejected"


class QuoteRequest(SQLModel, table=True):
    __tablename__ = "quote_requests"

    id: Optional[int] = Field(default=None, primary_key=True)

    origin: str
    destination: str
    date: Optional[date] = None
    passengers: int

    customer_name: str
    email: str
    phone: Optional[str] = None
    notes: Optional[str] = None

    status: QuoteRequestStatus = QuoteRequestStatus.PENDING
    quoted_price: Optional[float] = None
    payment_link: Optional[str] = None
    converted_booking_id: Optional[int] = Field(default=None, foreign_key="bookings.id")

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)