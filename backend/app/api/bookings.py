from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.database import get_session
from app.models.booking import Booking, BookingStatus, PaymentStatus, PaymentType
from app.models.route import Route
from app.models.admin_user import AdminUser
from app.schemas.booking import BookingCreate, BookingUpdate, BookingResponse
from app.services.stripe_service import create_checkout_session
from app.services.email_service import send_internal_notification
from app.auth.jwt_auth import RoleChecker

router = APIRouter(prefix="/bookings", tags=["bookings"])
get_current_admin = RoleChecker(required_superadmin=True)


@router.get("/", response_model=list[BookingResponse])
async def list_bookings(
    status_filter: BookingStatus = None,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
):
    """List all bookings (admin only)."""
    query = select(Booking)
    if status_filter:
        query = query.where(Booking.status == status_filter)
    query = query.order_by(Booking.created_at.desc())
    bookings = session.exec(query).all()
    return bookings


@router.get("/{booking_id}", response_model=BookingResponse)
async def get_booking(booking_id: int, session: Session = Depends(get_session)):
    """Get a booking by ID."""
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )
    return booking


@router.post("/", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking_data: BookingCreate,
    session: Session = Depends(get_session),
):
    """Create a new booking."""
    route = None
    amount_due = 0

    if booking_data.route_slug:
        route = session.query(Route).filter(Route.slug == booking_data.route_slug).first()
        if not route:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Route not found",
            )
        amount_due = route.price

    deposit_percentage = 100 if booking_data.payment_type == PaymentType.FULL else 30

    booking = Booking(
        route_id=route.id if route else None,
        customer_name=booking_data.customer_name,
        email=booking_data.email,
        phone=booking_data.phone,
        date=booking_data.date,
        time=booking_data.time,
        passengers=booking_data.passengers,
        flight_number=booking_data.flight_number,
        amount_due=amount_due,
        payment_type=booking_data.payment_type,
        deposit_percentage=deposit_percentage,
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
            deposit_percentage=deposit_percentage,
        )
        booking.stripe_session_id = stripe_result["session_id"]
        session.add(booking)
        session.commit()
        session.refresh(booking)
    except Exception:
        pass

    try:
        route_info = {"origin": route.origin, "destination": route.destination} if route else {"origin": "Custom", "destination": "Quote"}
        send_internal_notification(
            {
                "id": booking.id,
                "customer_name": booking.customer_name,
                "email": booking.email,
                "phone": booking.phone,
                "origin": route_info["origin"],
                "destination": route_info["destination"],
                "date": str(booking.date),
                "time": str(booking.time),
                "passengers": booking.passengers,
                "amount_due": booking.amount_due,
                "payment_status": booking.payment_status.value,
            },
            notification_type="booking",
        )
    except Exception:
        pass

    return booking


@router.patch("/{booking_id}", response_model=BookingResponse)
async def update_booking(
    booking_id: int,
    booking_data: BookingUpdate,
    session: Session = Depends(get_session),
    current_user: AdminUser = Depends(get_current_admin),
):
    """Update a booking (admin only)."""
    booking = session.get(Booking, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found",
        )

    update_data = booking_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(booking, key, value)

    session.add(booking)
    session.commit()
    session.refresh(booking)
    return booking