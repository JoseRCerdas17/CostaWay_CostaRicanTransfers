# CostaWay - Costa Rican Transfers Backend

FastAPI backend for the CostaWay tourist transfer booking platform.

## Tech Stack

- **Framework**: FastAPI
- **Language**: Python 3.10+
- **ORM**: SQLModel
- **Validation**: Pydantic v2
- **Database**: PostgreSQL
- **Authentication**: JWT (python-jose)
- **Payments**: Stripe
- **Email**: Resend

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── routes.py           # Route CRUD endpoints
│   │   ├── bookings.py         # Booking management + Stripe
│   │   ├── quote_requests.py   # Quote request handling
│   │   ├── payments.py         # Stripe checkout sessions
│   │   ├── webhooks.py         # Stripe webhook handler
│   │   └── auth.py             # Admin authentication
│   ├── core/
│   │   ├── config.py           # Environment configuration
│   │   ├── database.py         # Database connection
│   │   └── security.py         # JWT utilities
│   ├── models/
│   │   ├── route.py            # Route SQLModel
│   │   ├── booking.py          # Booking SQLModel
│   │   ├── quote_request.py    # QuoteRequest SQLModel
│   │   └── admin_user.py       # AdminUser SQLModel
│   ├── schemas/
│   │   ├── route.py            # Route Pydantic schemas
│   │   ├── booking.py          # Booking Pydantic schemas
│   │   ├── quote_request.py     # QuoteRequest schemas
│   │   └── admin_user.py        # Admin user schemas
│   ├── services/
│   │   ├── stripe_service.py   # Stripe integration
│   │   └── email_service.py    # Resend email integration
│   ├── main.py                 # FastAPI app entry point
│   └── constants.py            # Application constants
├── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL database
- Stripe account
- Resend account

### Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/costaway
SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:3000
```

### Run Development Server

```bash
uvicorn app.main:app --reload
```

API docs available at [http://localhost:8000/docs](http://localhost:8000/docs).

### Run Tests

```bash
pytest
```

## API Endpoints

### Routes
- `GET /api/v1/routes` - List all active routes
- `POST /api/v1/routes` - Create route (admin)
- `GET /api/v1/routes/{id}` - Get route details
- `PUT /api/v1/routes/{id}` - Update route (admin)
- `DELETE /api/v1/routes/{id}` - Soft-delete route (admin)

### Bookings
- `POST /api/v1/bookings` - Create booking
- `GET /api/v1/bookings/{id}` - Get booking details
- `GET /api/v1/bookings` - List bookings (admin)

### Payments
- `POST /api/v1/payments/session` - Create Stripe checkout session
- `POST /api/v1/webhooks/stripe` - Stripe webhook handler

### Quote Requests
- `POST /api/v1/quote-requests` - Submit quote request
- `GET /api/v1/quote-requests` - List quote requests (admin)
- `PUT /api/v1/quote-requests/{id}` - Update quote request (admin)

### Auth
- `POST /api/v1/auth/login` - Admin login
- `POST /api/v1/auth/logout` - Admin logout

## Database Models

### Route
- id, name, description, origin, destination, duration_minutes
- price_private_suv, price_shared_van, price_premium_sedan
- active (soft delete flag)

### Booking
- id, route_id, customer_name, customer_email, customer_phone
- travel_date, num_passengers, vehicle_type
- special_requests, stripe_session_id, stripe_payment_intent_id
- payment_status, booking_status, total_amount
- created_at, updated_at

### QuoteRequest
- id, origin, destination, travel_date, num_passengers
- customer_name, customer_email, customer_phone
- special_requirements, status (pending/quoted/converted/rejected)
- quoted_price, created_at

### AdminUser
- id, email, hashed_password, is_active
- created_at

## Payment Flow

1. Customer submits booking form
2. Backend creates Stripe checkout session (full amount or 30% deposit)
3. Customer redirected to Stripe checkout
4. On success, customer redirected to confirmation page
5. Stripe webhook updates booking payment status
6. Confirmation email sent via Resend

## Email Templates

- Booking confirmation to customer
- New booking notification to admin
- Quote request notification to admin
