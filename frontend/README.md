# CostaWay - Costa Rican Transfers Frontend

Bilingual (EN/ES) Next.js 15 web application for booking tourist transfer services in Costa Rica.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Internationalization**: next-intl
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **HTTP Client**: Fetch API

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── [locale]/           # Locale-based routing
│   │   │   ├── booking/[id]/  # Booking pages
│   │   │   ├── quote-request/  # Quote request page
│   │   │   ├── route/[id]/     # Route detail page
│   │   │   ├── admin/         # Admin panel
│   │   │   ├── layout.tsx      # Root layout
│   │   │   ├── page.tsx        # Homepage
│   │   │   └── sitemap.ts     # SEO sitemap
│   │   ├── api/                # API routes (if needed)
│   │   ├── globals.css         # Global styles + Tailwind
│   │   └── layout.tsx          # Root layout without locale
│   ├── components/
│   │   ├── booking/            # Booking form components
│   │   ├── layout/             # Header, Footer, MobileNav
│   │   ├── quote/              # Quote request form
│   │   ├── route/              # Route display components
│   │   └── admin/              # Admin panel components
│   ├── i18n/                   # i18n configuration
│   │   ├── navigation.ts       # next-intl navigation setup
│   │   └── routing.ts          # Routing configuration
│   ├── messages/               # Translation files
│   │   ├── en.json             # English translations
│   │   └── es.json             # Spanish translations
│   └── types/                  # TypeScript type definitions
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next.config.ts              # Next.js configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## API Integration

The frontend communicates with the FastAPI backend at `NEXT_PUBLIC_API_URL`. Key endpoints:

- `POST /api/v1/bookings` - Create a booking
- `POST /api/v1/payments/session` - Create Stripe checkout session
- `POST /api/v1/quote-requests` - Submit quote request
- `GET /api/v1/routes` - List all routes
- `POST /api/v1/auth/login` - Admin login

## Internationalization

Translations are managed in `src/messages/`. To add new strings:

1. Add the key to both `en.json` and `es.json`
2. Use the `useTranslations` hook in components:

```tsx
import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations();
  return <h1>{t("section.title")}</h1>;
}
```

## Admin Panel

Access admin at `/en/admin/login`. Requires backend authentication.

## Design System

Uses Material Design 3-inspired tokens:

- **Primary**: `#005D90` (Ocean Blue)
- **Secondary**: `#FF7F50` (Coral)
- **Surface**: `#F5F5F5`
- **Fonts**: Playfair Display (headlines), Source Sans 3 (body)
