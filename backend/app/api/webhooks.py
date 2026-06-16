from fastapi import APIRouter, Request, HTTPException, status, Depends
from sqlmodel import Session
import logging
from app.database import get_session
from app.models.booking import Booking, PaymentStatus
from app.services.stripe_service import construct_webhook_event

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
                logger.info(f"Booking {booking.id} payment marked as paid")

        return {"status": "success"}

    except Exception as e:
        logger.error(f"Error processing webhook event: {e}")
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing webhook event",
        )