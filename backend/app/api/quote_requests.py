from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.quote_request import QuoteRequest, QuoteRequestStatus
from app.models.booking import Booking, BookingStatus, PaymentType, PaymentStatus
from app.models.admin_user import AdminUser
from app.schemas.quote_request import QuoteRequestCreate, QuoteRequestUpdate, QuoteRequestResponse
from app.services.email_service import send_internal_notification
from app.services.stripe_service import create_checkout_session
from app.auth.jwt_auth import RoleChecker

router = APIRouter(prefix="/quote-requests", tags=["quote-requests"])
get_current_admin = RoleChecker(required_superadmin=True)


@router.get("/", response_model=list[QuoteRequestResponse])
async def list_quote_requests(
    status: QuoteRequestStatus = None,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
):
    """List all quote requests (admin only)."""
    query = select(QuoteRequest)
    if status:
        query = query.where(QuoteRequest.status == status)
    query = query.order_by(QuoteRequest.created_at.desc())
    quote_requests = session.exec(query).all()
    return quote_requests


@router.get("/{request_id}", response_model=QuoteRequestResponse)
async def get_quote_request(request_id: int, session: Session = Depends(get_session)):
    """Get a quote request by ID."""
    quote_request = session.get(QuoteRequest, request_id)
    if not quote_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found",
        )
    return quote_request


@router.post("/", response_model=QuoteRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_quote_request(
    quote_data: QuoteRequestCreate,
    session: Session = Depends(get_session),
):
    """Create a new quote request."""
    quote_request = QuoteRequest.model_validate(quote_data)
    session.add(quote_request)
    session.commit()
    session.refresh(quote_request)

    try:
        send_internal_notification(
            {
                "id": quote_request.id,
                "customer_name": quote_request.customer_name,
                "email": quote_request.email,
                "phone": quote_request.phone,
                "origin": quote_request.origin,
                "destination": quote_request.destination,
                "date": str(quote_request.travel_date) if quote_request.travel_date else "N/A",
                "passengers": quote_request.passengers,
                "notes": quote_request.notes,
            },
            notification_type="quote_request",
        )
    except Exception:
        pass

    return quote_request


@router.patch("/{request_id}", response_model=QuoteRequestResponse)
async def update_quote_request(
    request_id: int,
    quote_data: QuoteRequestUpdate,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
):
    """Update a quote request - assign price, status, payment link (admin only)."""
    quote_request = session.get(QuoteRequest, request_id)
    if not quote_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found",
        )

    update_data = quote_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(quote_request, key, value)

    session.add(quote_request)
    session.commit()
    session.refresh(quote_request)
    return quote_request


@router.post("/{request_id}/convert", response_model=QuoteRequestResponse)
async def convert_quote_to_booking(
    request_id: int,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
):
    """Convert a quoted request into a confirmed booking (admin only)."""
    quote_request = session.get(QuoteRequest, request_id)
    if not quote_request:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quote request not found",
        )

    if quote_request.status == QuoteRequestStatus.CONVERTED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quote request already converted",
        )

    if quote_request.status != QuoteRequestStatus.QUOTED:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Quote must have a price assigned before conversion",
        )

    from datetime import time as time_type

    booking = Booking(
        quote_request_id=quote_request.id,
        customer_name=quote_request.customer_name,
        email=quote_request.email,
        phone=quote_request.phone,
        date=quote_request.travel_date,
        time=time_type(12, 0),
        passengers=quote_request.passengers,
        amount_due=quote_request.quoted_price,
        payment_type=PaymentType.FULL,
        deposit_percentage=100,
        payment_status=PaymentStatus.PENDING,
        status=BookingStatus.PENDING,
    )

    session.add(booking)
    session.commit()
    session.refresh(booking)

    try:
        stripe_result = create_checkout_session(
            booking_id=booking.id,
            amount=int(booking.amount_due),
            deposit_percentage=100,
        )
        booking.stripe_session_id = stripe_result["session_id"]
        session.add(booking)
        session.commit()
        session.refresh(booking)
    except Exception:
        pass

    quote_request.status = QuoteRequestStatus.CONVERTED
    quote_request.converted_booking_id = booking.id
    session.add(quote_request)
    session.commit()

    return quote_request