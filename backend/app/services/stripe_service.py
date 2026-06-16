import stripe
from app.config import Settings

settings = Settings()

stripe.api_key = settings.STRIPE_SECRET_KEY


def create_checkout_session(
    booking_id: int,
    amount: int,
    currency: str = "usd",
    success_url: str = "http://localhost:3000/en/booking/{booking_id}/confirmation",
    cancel_url: str = "http://localhost:3000/en/booking/{booking_id}",
    deposit_percentage: int = 100,
) -> dict:
    """
    Create a Stripe checkout session.
    Returns the session ID and URL.
    """
    if deposit_percentage < 100:
        amount = int(amount * deposit_percentage / 100)

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[
            {
                "price_data": {
                    "currency": currency.lower(),
                    "product_data": {
                        "name": f"Transfer Booking #{booking_id}",
                        "description": f"Payment {'deposit' if deposit_percentage < 100 else 'full amount'} for transfer service",
                    },
                    "unit_amount": amount * 100,
                },
                "quantity": 1,
            }
        ],
        mode="payment",
        success_url=success_url.format(booking_id=booking_id),
        cancel_url=cancel_url.format(booking_id=booking_id),
        metadata={
            "booking_id": str(booking_id),
            "deposit_percentage": str(deposit_percentage),
        },
    )

    return {
        "session_id": session.id,
        "url": session.url,
    }


def retrieve_checkout_session(session_id: str) -> dict:
    """Retrieve a checkout session from Stripe."""
    return stripe.checkout.Session.retrieve(session_id)


def construct_webhook_event(payload: bytes, sig_header: str) -> stripe.Event:
    """Construct a webhook event from the raw payload."""
    return stripe.Webhook.construct_event(
        payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
    )