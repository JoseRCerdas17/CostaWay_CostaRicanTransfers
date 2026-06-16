# CostaWay - Costa Rica Transfers

Bilingual (EN/ES) tourist transfer booking platform. Next.js 15 frontend + FastAPI backend.

## Repositories

- `frontend/` - Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next-intl
- `backend/` - FastAPI, SQLModel, Pydantic v2, PostgreSQL

## Developer Commands

### Frontend
```bash
cd frontend
npm run dev      # Dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint (ESLint 9 config format: eslint.config.js)
```

### Backend
```bash
cd backend
uvicorn app.main:app --reload   # Dev server at localhost:8000
pytest                           # Run tests
python -m py_compile app/main.py # Syntax check
```

## Architecture

- Frontend uses locale-based routing via `next-intl` (`/[locale]/...` pattern)
- All Link components must use `@/i18n` Link, NOT `next-intl/link`
- Backend API prefix: `/api/v1` (applied in `app/main.py`)
- Payment flow: Booking → Stripe session → Webhook → Confirmation email

## Key Patterns

### Frontend i18n
```tsx
import { useTranslations } from "next-intl";
const t = useTranslations();
```
Translations in `frontend/src/messages/en.json` and `es.json`.

### Backend Entry Point
`backend/app/main.py` - FastAPI app with routes mounted at `/api/v1`

### Form Validation
React Hook Form + Zod (not manual state). See `BookingForm.tsx`, `QuoteRequestForm.tsx`.

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
SECRET_KEY=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:3000
```

## Design Tokens (Material Design 3-inspired)

- Primary: `#005D90` (Ocean Blue)
- Secondary: `#FF7F50` (Coral)
- Fonts: Playfair Display (headlines), Source Sans 3 (body)
