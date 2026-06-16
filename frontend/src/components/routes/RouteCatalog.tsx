"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import Image from "next/image";

const routes = [
  { slug: "sjo-airport-la-fortuna", origin: "SJO Airport", destination: "La Fortuna", duration: "3.5h", vehicleType: "privateSuv", price: 180, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJe2B0-uOgLdzdUb7ZdrMFJnwCK4Y5MspY6clTC5TNNl_dxhUs5DWrZ-PJ2-sSlB70luPqn1XBc4A-miKMlLhhL46fVGoNWEoOn8Q9EGE7r9AwIYTWc3-7PjwuFFdQ9sNjDyXTXIZTCkfBjhzJ2xQ2_olN1dxPISbjORlq-r1NVIyTn1ufyYmY6VzWEzyHlCzrxoBAUNKptR8kEI-2ektoKWd7XXlb5q9a_BLGDtZZXIF9vVYOldkQq9xTZUGacCoqh6POXiDatrM" },
  { slug: "liberia-tamarindo", origin: "LIR Airport", destination: "Tamarindo", duration: "1.5h", vehicleType: "sharedVan", price: 45, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxTIPEsDkmpxey1rQv_FsBVXRfA-6-3FYAXTEST5Ij61Gk_uUiKkFUtcWpojgfbr-tOx0I4ckzZQ69ocCvv4glAosxmPQNPBE3hp7mrXnMcLS2-f-IAmvxJ_P626OFVbJH9Q7s3xG2yB8mEtbuf8cPm3yni-no6QaVfLo4c4sNp10bfyfojorT9dO7xg5tu8FNnTruJsoy5G2uHtRtYAPlvrNmoalynvKwNQ-IaoLEOf5bZVxaRY1k_pRo5grHPdaFP1isGt35RsU" },
  { slug: "san-jose-manuel-antonio", origin: "San Jose City", destination: "Manuel Antonio", duration: "3.0h", vehicleType: "premiumSedan", price: 160, imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBRJNy9Y5lmJPfl11bnBZPDsoHSTJpwNxcgbH2FpSFOzEBoJDiW8WtGB2dmvxUBK2rtDCazt8Yk-bk5I2teVS8ZC4ME15YxxO652cZpyDhjcvuEg-FuQ5ZdVPL-F9gXu-YOrOmnaRnr5-itawI1HVqduuLVMclhcrGwj5kvC2TiLZ2skkkI8TkOHDgTcx89p5iGuz0ZOTUUJaYglx94ZjukBhuKeIHlWLY9Gh6tNVMPQqNBF7sok8c3ZG13W0lJgB3zTDF5J-AFQUY" },
];

export default function RouteCatalog() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
      {routes.map((route) => (
        <Link
          key={route.slug}
          href={`/routes/${route.slug}`}
          className="bg-surface-container-lowest border border-outline/20 rounded-lg overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow relative"
        >
          <div className="h-48 bg-surface-container-low relative">
            <Image alt={route.origin + " to " + route.destination} src={route.imageUrl} fill className="object-cover desaturate-50 mix-blend-multiply opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 w-full elevation-line"></div>
          </div>
          <div className="p-gutter flex flex-col flex-grow gap-sm">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="font-data-label text-[14px] text-secondary uppercase">{route.origin}</span>
                <span className="font-headline-sm text-[24px] text-primary mt-xs">{route.destination}</span>
              </div>
              <span className="font-data-label text-[14px] text-primary-container bg-primary-fixed/30 px-xs py-1 rounded">{route.duration}</span>
            </div>
            <div className="mt-auto flex justify-between items-end pt-md border-t border-outline-variant/30">
              <span className="font-body-sm text-[14px] text-on-surface-variant flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">directions_car</span>
                {t(`routes.${route.vehicleType}`)}
              </span>
              <span className="font-data-value text-[16px] text-primary font-semibold">{t("routes.fromPrice")} ${route.price}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}