# CostaWay - Costa Rica Transfers

Bilingual (EN/ES) tourist transfer booking platform. Next.js 16 frontend + FastAPI backend.

## Repositories

- `frontend/` - Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, next-intl
- `backend/` - FastAPI, SQLModel, Pydantic v2, PostgreSQL, Alembic migrations

## Developer Commands

### Frontend
```bash
cd frontend
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint (ESLint 9)
```

### Backend
```bash
cd backend
# Create .env from .env.example first
cp .env.example .env

# Run with venv
& ".venv/Scripts/python.exe" -m uvicorn app.main:app --reload

# Migrations
alembic upgrade head           # Apply migrations
alembic revision --autogenerate -m "msg"  # Generate migration
```

## Architecture

- Frontend uses locale-based routing via `next-intl` (`/[locale]/...` pattern)
- All `<Link>` components must use `import { Link } from "@/i18n"`, NOT `next-intl/link`
- Backend API prefix: `/api/v1` (defined in `app/main.py`)
- Payment flow: Booking → Stripe session → Webhook → Confirmation email
- Pricing is **per vehicle**, not per person

## Key Patterns

### Frontend i18n
```tsx
import { useTranslations } from "next-intl";
const t = useTranslations();
// Keys: t("nav.account"), t("routes.bookNow"), etc.
```
Translations: `frontend/src/messages/en.json`, `es.json`

### Backend Entry Point
`backend/app/main.py` - FastAPI app with routes mounted at `/api/v1`

### Form Validation
React Hook Form + Zod (not manual state). See `BookingForm.tsx`, `QuoteRequestForm.tsx`.

### Admin Auth
- JWT-based, token stored in `localStorage.admin_token`
- Protected endpoints require `RoleChecker(required_superadmin=True)` dependency
- Token payload includes `user_id`, `email`, `is_superadmin`

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/login` | No | Admin login |
| POST | `/api/v1/auth/register` | No | Admin registration |
| GET | `/api/v1/auth/me` | JWT | Get current user |
| GET | `/api/v1/routes` | No | List routes |
| POST | `/api/v1/routes` | Admin | Create route |
| POST | `/api/v1/bookings` | No | Create booking |
| GET | `/api/v1/bookings/{id}` | No | Get booking |
| GET | `/api/v1/bookings` | Admin | List bookings |
| PATCH | `/api/v1/bookings/{id}` | Admin | Update booking |
| POST | `/api/v1/payments/session` | Admin | Create Stripe session |
| POST | `/api/v1/payments/refund/{id}` | Admin | Refund booking |
| POST | `/api/v1/quote-requests` | No | Create quote request |
| POST | `/api/v1/quote-requests/{id}/convert` | Admin | Convert to booking |
| POST | `/api/v1/webhooks/stripe` | Stripe sig | Stripe webhook |

## Design Tokens (globals.css)

```css
--color-primary: #082419   /* Dark green */
--color-cta: #FF6B4A      /* Coral/sunset for CTAs */
--color-tide: #2F6B6B     /* Teal accent */
--color-stone: #4A5D53    /* Muted text */
--color-sunset: #FF6B4A    /* Same as cta */
```

Custom classes: `.card-border`, `.form-input`, `.interactive-shadow`, `.elevation-line`

## Environment Variables

### Frontend (frontend/.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (backend/.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/costaway
JWT_SECRET=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=CostaWay <noreply@costaway.com>
ADMIN_EMAIL=admin@costaway.com
CORS_ORIGINS=["http://localhost:3000"]
```

## Common Mistakes

- **Duplicate JSON keys**: next-intl fails silently. Don't add duplicate keys to `en.json`/`es.json` (e.g., don't add `account` to both `common` AND `nav`)
- **Per-vehicle pricing**: Backend `bookings.py` sets `amount_due = route.price` (not `route.price * passengers`)
- **API URL in form**: Use `NEXT_PUBLIC_API_URL || "http://localhost:8000"` in fetch calls
- **Link imports**: Always use `import { Link } from "@/i18n"` - never `next-intl/link`
