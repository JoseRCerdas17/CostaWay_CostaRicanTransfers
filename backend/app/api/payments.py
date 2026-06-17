from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from app.database import get_session
from app.models.booking import Booking, PaymentStatus
from app.models.admin_user import AdminUser
from app.services.stripe_service import create_checkout_session, refund_payment
from app.auth.jwt_auth import RoleChecker

router = APIRouter(prefix="/payments", tags=["payments"])
get_current_admin = RoleChecker(required_superadmin=True)


@router.post("/session")
async def create_payment(
    booking_id: int,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
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


@router.post("/refund/{booking_id}")
async def refund_booking(
    booking_id: int,
    amount: int = None,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
):
    """Refund a booking payment (admin only)."""
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    if booking.payment_status != PaymentStatus.PAID:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking has not been paid",
        )

    if booking.payment_status == PaymentStatus.REFUNDED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Booking already refunded",
        )

    if not booking.stripe_payment_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No payment intent found for this booking",
        )

    refund_result = refund_payment(booking.stripe_payment_id, amount)

    booking.payment_status = PaymentStatus.REFUNDED
    session.add(booking)
    session.commit()

    return refund_result