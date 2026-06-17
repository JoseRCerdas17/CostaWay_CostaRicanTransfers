"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n";
import BookingForm from "@/components/booking/BookingForm";
import { useTranslations } from "next-intl";

interface RouteDetailProps {
  slug: string;
  locale: string;
}

const routeData: Record<string, {
  origin: string;
  destination: string;
  price: number;
  duration: string;
  vehicleType: string;
  description: string;
  imageUrl: string;
  vehicleTypeLabel: string;
  transferType: string;
}> = {
  "sjo-airport-la-fortuna": {
    origin: "SJO Airport",
    destination: "La Fortuna",
    price: 180,
    duration: "4h 30m",
    vehicleType: "privateSuv",
    vehicleTypeLabel: "Mercedes Sprinter",
    transferType: "Private Transfer",
    description: "A scenic, direct private transfer crossing the diverse landscapes of Costa Rica, delivering you safely from the capital to the stunning beaches of Guanacaste.",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
  "liberia-tamarindo": {
    origin: "LIR Airport",
    destination: "Tamarindo",
    price: 45,
    duration: "1h 30m",
    vehicleType: "sharedVan",
    vehicleTypeLabel: "Shared Van",
    transferType: "Shared Transfer",
    description: "Transition from Daniel Oduber Quirós International Airport to the vibrant beach town of Tamarindo.",
    imageUrl: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80",
  },
  "san-jose-manuel-antonio": {
    origin: "San Jose City",
    destination: "Manuel Antonio",
    price: 160,
    duration: "3h 00m",
    vehicleType: "premiumSedan",
    vehicleTypeLabel: "Premium Sedan",
    transferType: "Private Transfer",
    description: "Travel from Costa Rica's capital city to the pristine beaches of Manuel Antonio National Park.",
    imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&q=80",
  },
};

export default function RouteDetail({ slug, locale }: RouteDetailProps) {
  const t = useTranslations("routes");
  const route = routeData[slug];

  if (!route) {
    return (
      <div className="text-center py-xl">
        <h1 className="font-display text-[32px] text-primary mb-md">Route not found</h1>
        <Link href="/routes" className="text-primary hover:underline flex items-center justify-center gap-xs">
          <ArrowLeft className="w-4 h-4" />
          Back to routes
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
      {/* Left Column: Route Details */}
      <div className="lg:col-span-7 flex flex-col gap-lg">
        {/* Route Header & Elevation */}
        <section>
          <p className="font-data-label text-[14px] text-[--color-tide] mb-2 uppercase tracking-wider">
            {route.transferType}
          </p>
          <h1 className="font-display text-[48px] font-bold text-primary mb-md leading-[1.1] tracking-tight">
            {route.origin} to {route.destination}
          </h1>

          {/* Elevation Profile */}
          <div className="relative py-md mb-md">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path
                d="M0,80 L20,75 L40,85 L60,50 L80,60 L100,20"
                fill="none"
                stroke="#2F6B6B"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="0" cy="80" fill="#faf9f7" r="3" stroke="#2F6B6B" strokeWidth="1.5" />
              <circle cx="100" cy="20" fill="#faf9f7" r="3" stroke="#2F6B6B" strokeWidth="1.5" />
            </svg>
            <div className="flex justify-between mt-2 font-data-label text-[14px] text-[--color-stone]">
              <span>{route.origin} (0m)</span>
              <span>{route.destination} (Sea Level)</span>
            </div>
          </div>

          <p className="font-body text-[18px] leading-[1.6] text-on-surface-variant">
            {route.description}
          </p>
        </section>

        {/* Vehicle Specifications (Bento-style Grid) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-md">
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
              directions_car
            </span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Vehicle</span>
            <span className="font-data-value text-[16px] text-primary font-medium">{route.vehicleTypeLabel}</span>
          </div>
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
              group
            </span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Capacity</span>
            <span className="font-data-value text-[16px] text-primary font-medium">Up to 8</span>
          </div>
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
              timer
            </span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Est. Time</span>
            <span className="font-data-value text-[16px] text-primary font-medium">{route.duration}</span>
          </div>
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>
              luggage
            </span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Luggage</span>
            <span className="font-data-value text-[16px] text-primary font-medium">1 Large/Pax</span>
          </div>
        </section>

        {/* Included / Not Included */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-md bg-surface-container-low p-md rounded card-border">
          <div>
            <h3 className="font-headline text-[24px] text-primary mb-4">Included</h3>
            <ul className="flex flex-col gap-3 font-data-value text-[14px] text-on-surface">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-tide] text-[18px]">check_circle</span>
                Professional Bilingual Driver
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-tide] text-[18px]">check_circle</span>
                Air Conditioning
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-tide] text-[18px]">check_circle</span>
                On-board Wi-Fi
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-tide] text-[18px]">check_circle</span>
                Bottled Water
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-tide] text-[18px]">check_circle</span>
                Highway Tolls & Taxes
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-[24px] text-primary mb-4">Not Included</h3>
            <ul className="flex flex-col gap-3 font-data-value text-[14px] text-on-surface-variant">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-stone] text-[18px]">cancel</span>
                Driver Gratuity (Optional)
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-stone] text-[18px]">cancel</span>
                Additional spontaneous stops
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[--color-stone] text-[18px]">cancel</span>
                Meals or snacks
              </li>
            </ul>
          </div>
        </section>

        {/* Vehicle Imagery */}
        <section>
          <div className="aspect-video w-full rounded overflow-hidden card-border bg-surface-container-highest relative">
            <Image
              alt={`${route.vehicleTypeLabel} - Costa Rica Transfer`}
              src={route.imageUrl}
              fill
              className="object-cover grayscale-[20%]"
              unoptimized
            />
          </div>
        </section>
      </div>

      {/* Right Column: Booking Form */}
      <aside className="lg:col-span-5">
        <div className="bg-surface-container-lowest p-md rounded-lg card-border sticky top-24 shadow-sm">
          <h2 className="font-headline text-[32px] text-primary mb-md">Book Your Transfer</h2>
          <BookingForm routeSlug={slug} price={route.price} locale={locale} />
        </div>
      </aside>
    </div>
  );
}