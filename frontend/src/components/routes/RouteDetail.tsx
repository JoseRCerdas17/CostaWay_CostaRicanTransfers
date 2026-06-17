"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n";
import BookingForm from "@/components/booking/BookingForm";
import { useTranslations } from "next-intl";
import { getRoute } from "@/lib/api";
import { useEffect, useState } from "react";

interface RouteDetailProps {
  slug: string;
  locale: string;
}

interface RouteData {
  id: number;
  slug: string;
  origin: string;
  destination: string;
  price: number;
  vehicle_type: string;
  duration_estimate: string;
  description: string | null;
  image_url: string | null;
}

const vehicleLabels: Record<string, string> = {
  private_suv: "Private SUV",
  shared_van: "Shared Van",
  premium_sedan: "Premium Sedan",
  van_boat_van: "Van-Boat-Van",
};

export default function RouteDetail({ slug, locale }: RouteDetailProps) {
  const t = useTranslations("routes");
  const [route, setRoute] = useState<RouteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const data = await getRoute(slug);
        setRoute(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load route");
      } finally {
        setLoading(false);
      }
    }
    fetchRoute();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-tide border-r-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !route) {
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

  const vehicleLabel = vehicleLabels[route.vehicle_type] || route.vehicle_type;
  const imageUrl = route.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
      <div className="lg:col-span-7 flex flex-col gap-lg">
        <section>
          <p className="font-data-label text-[14px] text-[--color-tide] mb-2 uppercase tracking-wider">
            Private Transfer
          </p>
          <h1 className="font-display text-[48px] font-bold text-primary mb-md leading-[1.1] tracking-tight">
            {route.origin} to {route.destination}
          </h1>

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

        <section className="grid grid-cols-2 md:grid-cols-4 gap-md">
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary">directions_car</span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Vehicle</span>
            <span className="font-data-value text-[16px] text-primary font-medium">{vehicleLabel}</span>
          </div>
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary">group</span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Capacity</span>
            <span className="font-data-value text-[16px] text-primary font-medium">Up to 8</span>
          </div>
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary">timer</span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Est. Time</span>
            <span className="font-data-value text-[16px] text-primary font-medium">{route.duration_estimate}</span>
          </div>
          <div className="bg-surface-container-lowest p-md card-border rounded interactive-shadow flex flex-col gap-2">
            <span className="material-symbols-outlined text-primary">luggage</span>
            <span className="font-data-label text-[14px] text-on-surface-variant">Luggage</span>
            <span className="font-data-value text-[16px] text-primary font-medium">1 Large/Pax</span>
          </div>
        </section>

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

        <section>
          <div className="aspect-video w-full rounded overflow-hidden card-border bg-surface-container-highest relative">
            <Image
              alt={`${vehicleLabel} - Costa Rica Transfer`}
              src={imageUrl}
              fill
              className="object-cover grayscale-[20%]"
              unoptimized
            />
          </div>
        </section>
      </div>

      <aside className="lg:col-span-5">
        <div className="bg-surface-container-lowest p-md rounded-lg card-border sticky top-24 shadow-sm">
          <h2 className="font-headline text-[32px] text-primary mb-md">Book Your Transfer</h2>
          <BookingForm routeSlug={slug} price={route.price} locale={locale} />
        </div>
      </aside>
    </div>
  );
}
