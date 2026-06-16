from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.quote_request import QuoteRequest, QuoteRequestStatus
from app.schemas.quote_request import QuoteRequestCreate, QuoteRequestUpdate, QuoteRequestResponse
from app.services.email_service import send_internal_notification

router = APIRouter(prefix="/quote-requests", tags=["quote-requests"])


@router.get("/", response_model=list[QuoteRequestResponse])
async def list_quote_requests(
    status: QuoteRequestStatus = None,
    session: Session = Depends(get_session),
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
                "date": str(quote_request.date) if quote_request.date else "N/A",
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