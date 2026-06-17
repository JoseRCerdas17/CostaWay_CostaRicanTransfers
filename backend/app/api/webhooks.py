from fastapi import APIRouter, Request, HTTPException, status, Depends
from sqlmodel import Session
import logging
from app.database import get_session
from app.models.booking import Booking, PaymentStatus
from app.models.route import Route
from app.services.stripe_service import construct_webhook_event
from app.services.email_service import send_confirmation_email

router = APIRouter(prefix="/webhooks", tags=["webhooks"])

logger = logging.getLogger(__name__)


@router.post("/stripe")
async def stripe_webhook(
    request: Request,
    session: Session = Depends(get_session),
):
    """Handle Stripe webhook events."""
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")

    if not sig_header:
        logger.warning("Stripe webhook received without signature header")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Missing stripe-signature header",
        )

    try:
        event = construct_webhook_event(payload, sig_header)
    except ValueError as e:
        logger.error(f"Stripe webhook signature verification failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Webhook signature verification failed: {str(e)}",
        )

    logger.info(f"Received Stripe webhook event: {event['type']}")

    try:
        if event["type"] == "checkout.session.completed":
            session_id = event["data"]["object"]["id"]
            payment_intent = event["data"]["object"]["payment_intent"]

            booking = session.query(Booking).filter(
                Booking.stripe_session_id == session_id
            ).first()

            if booking:
                booking.payment_status = PaymentStatus.PAID
                booking.stripe_payment_id = payment_intent
                session.add(booking)
                session.commit()

                route = session.get(Route, booking.route_id) if booking.route_id else None
                route_info = {
                    "origin": route.origin if route else "Custom",
                    "destination": route.destination if route else "Quote",
                }

                deposit_amount = int(booking.amount_due * booking.deposit_percentage / 100)

                try:
                    send_confirmation_email(
                        to_email=booking.email,
                        customer_name=booking.customer_name,
                        booking_id=booking.id,
                        route_info=route_info,
                        date=str(booking.date),
                        time=str(booking.time),
                        passengers=booking.passengers,
                        amount_paid=deposit_amount,
                    )
                    logger.info(f"Confirmation email sent for booking {booking.id}")
                except Exception as e:
                    logger.error(f"Failed to send confirmation email for booking {booking.id}: {e}")

                logger.info(f"Booking {booking.id} payment marked as paid")

        return {"status": "success"}

    except Exception as e:
        logger.error(f"Error processing webhook event: {e}")
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing webhook event",
        )