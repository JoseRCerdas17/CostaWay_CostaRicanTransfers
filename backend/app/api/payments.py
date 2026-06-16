from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.database import get_session
from app.models.booking import Booking, PaymentStatus
from app.services.stripe_service import create_checkout_session

router = APIRouter(prefix="/payments", tags=["payments"])


@router.post("/session")
async def create_payment(
    booking_id: int,
    session: Session = Depends(get_session),
):
    """Create a Stripe checkout session for a booking."""
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    if booking.payment_status == PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already paid",
        )

    stripe_result = create_checkout_session(
        booking_id=booking.id,
        amount=int(booking.amount_due),
        deposit_percentage=booking.deposit_percentage,
    )

    booking.stripe_session_id = stripe_result["session_id"]
    session.add(booking)
    session.commit()
    session.refresh(booking)

    return stripe_result