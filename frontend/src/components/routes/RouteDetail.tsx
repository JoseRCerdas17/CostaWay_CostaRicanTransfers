"use client";

import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n";
import BookingForm from "@/components/booking/BookingForm";

const routeData: Record<string, { origin: string; destination: string; price: number; duration: string; vehicleType: string; description: string; imageUrl: string }> = {
  "sjo-airport-la-fortuna": { origin: "SJO Airport", destination: "La Fortuna", price: 180, duration: "3.5 hours", vehicleType: "privateSuv", description: "Start your Costa Rica adventure with a comfortable private transfer from Juan Santamaría International Airport to the stunning Arenal volcano area.", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJe2B0-uOgLdzdUb7ZdrMFJnwCK4Y5MspY6clTC5TNNl_dxhUs5DWrZ-PJ2-sSlB70luPqn1XBc4A-miKMlLhhL46fVGoNWEoOn8Q9EGE7r9AwIYTWc3-7PjwuFFdQ9sNjDyXTXIZTCkfBjhzJ2xQ2_olN1dxPISbjORlq-r1NVIyTn1ufyYmY6VzWEzyHlCzrxoBAUNKptR8kEI-2ektoKWd7XXlb5q9a_BLGDtZZXIF9vVYOldkQq9xTZUGacCoqh6POXiDatrM" },
  "liberia-tamarindo": { origin: "LIR Airport", destination: "Tamarindo", price: 45, duration: "1.5 hours", vehicleType: "sharedVan", description: "Transition from Daniel Oduber Quirós International Airport to the vibrant beach town of Tamarindo.", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxTIPEsDkmpxey1rQv_FsBVXRfA-6-3FYAXTEST5Ij61Gk_uUiKkFUtcWpojgfbr-tOx0I4ckzZQ69ocCvv4glAosxmPQNPBE3hp7mrXnMcLS2-f-IAmvxJ_P626OFVbJH9Q7s3xG2yB8mEtbuf8cPm3yni-no6QaVfLo4c4sNp10bfyfojorT9dO7xg5tu8FNnTruJsoy5G2uHtRtYAPlvrNmoalynvKwNQ-IaoLEOf5bZVxaRY1k_pRo5grHPdaFP1isGt35RsU" },
  "san-jose-manuel-antonio": { origin: "San Jose City", destination: "Manuel Antonio", price: 160, duration: "3 hours", vehicleType: "premiumSedan", description: "Travel from Costa Rica's capital city to the pristine beaches of Manuel Antonio National Park.", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRJNy9Y5lmJPfl11bnBZPDsoHSTJpwNxcgbH2FpSFOzEBoJDiW8WtGB2dmvxUBK2rtDCazt8Yk-bk5I2teVS8ZC4ME15YxxO652cZpyDhjcvuEg-FuQ5ZdVPL-F9gXu-YOrOmnaRnr5-itawI1HVqduuLVMclhcrGwj5kvC2TiLZ2skkkI8TkOHDgTcx89p5iGuz0ZOTUUJaYglx94ZjukBhuKeIHlWLY9Gh6tNVMPQqNBF7sok8c3ZG13W0lJgB3zTDF5J-AFQUY" },
};

export default function RouteDetail({ slug, locale }: { slug: string; locale: string }) {
  const route = routeData[slug];

  if (!route) return <div className="text-center py-xl"><h1 className="font-headline-md text-[32px] text-primary">Route not found</h1><Link href="/routes" className="text-primary hover:underline flex items-center justify-center gap-xs"><ArrowLeft className="w-4 h-4" />Back to routes</Link></div>;

  return (
    <div className="flex flex-col gap-xl">
      <Link href="/routes" className="text-on-surface-variant hover:text-primary flex items-center gap-xs w-fit"><ArrowLeft className="w-4 h-4" />Back to routes</Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
        <div className="flex flex-col gap-md">
          <div className="h-64 md:h-80 bg-surface-container-low rounded-lg overflow-hidden relative">
            <Image alt={route.origin + " to " + route.destination} src={route.imageUrl} fill className="object-cover desaturate-50 mix-blend-multiply" />
            <div className="absolute bottom-0 left-0 w-full elevation-line"></div>
          </div>
          <div className="flex items-center gap-sm text-secondary"><span className="material-symbols-outlined text-[20px]">schedule</span><span className="font-data-label text-[14px]">{route.duration}</span></div>
          <div className="flex items-center gap-sm text-secondary"><span className="material-symbols-outlined text-[20px]">directions_car</span><span className="font-data-label text-[14px]">{route.vehicleType}</span></div>
          <p className="font-body-lg text-[18px] leading-[1.6] text-on-surface-variant mt-sm">{route.description}</p>
        </div>
        <div className="bg-surface-container-lowest border border-outline/20 rounded-lg p-md">
          <div className="mb-md"><span className="font-data-label text-[14px] text-secondary uppercase">{route.origin}</span><span className="font-data-label text-[14px] text-secondary mx-sm">→</span><span className="font-data-label text-[14px] text-secondary uppercase">{route.destination}</span></div>
          <div className="flex items-baseline gap-xs mb-md"><span className="font-display text-[32px] font-bold text-primary">${route.price}</span><span className="font-data-label text-[14px] text-on-surface-variant">per person</span></div>
          <BookingForm routeSlug={slug} price={route.price} locale={locale} />
        </div>
      </div>
    </div>
  );
}