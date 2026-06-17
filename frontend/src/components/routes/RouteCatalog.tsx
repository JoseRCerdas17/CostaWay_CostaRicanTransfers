"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import Image from "next/image";
import { motion } from "framer-motion";

const routes = [
  {
    slug: "sjo-airport-tamarindo",
    origin: "SJO",
    destination: "Tamarindo",
    duration: "4.5 hrs",
    originFull: "San Jose Airport (SJO)",
    vehicleType: "sharedVan",
    vehicleLabel: "Shared Van",
    price: 55,
    priceLabel: "/seat",
    badge: "popular",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
  {
    slug: "liberia-nosara",
    origin: "LIR",
    destination: "Nosara",
    duration: "2.5 hrs",
    originFull: "Liberia Airport (LIR)",
    vehicleType: "privateSuv",
    vehicleLabel: "Private SUV",
    price: 140,
    priceLabel: "/vehicle",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80",
  },
  {
    slug: "la-fortuna-monteverde",
    origin: "FRT",
    destination: "MTV",
    duration: "3.0 hrs",
    originFull: "La Fortuna (Arenal)",
    vehicleType: "vanBoatVan",
    vehicleLabel: "Van-Boat-Van",
    price: 35,
    priceLabel: "/person",
    badge: "scenicRoute",
    imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&q=80",
  },
  {
    slug: "san-jose-manuel-antonio",
    origin: "SJO City",
    destination: "MA",
    duration: "3.5 hrs",
    originFull: "San Jose City",
    vehicleType: "sharedVan",
    vehicleLabel: "Shared Van",
    price: 49,
    priceLabel: "/seat",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
  {
    slug: "liberia-playa-del-coco",
    origin: "LIR",
    destination: "Coco",
    duration: "1.0 hrs",
    originFull: "Liberia Airport (LIR)",
    vehicleType: "privateSuv",
    vehicleLabel: "Private SUV",
    price: 55,
    priceLabel: "/vehicle",
    badge: "",
    imageUrl: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800&q=80",
  },
  {
    slug: "san-jose-puerto-viejo",
    origin: "SJO",
    destination: "P.Viejo",
    duration: "5.0 hrs",
    originFull: "San Jose City",
    vehicleType: "privateSuv",
    vehicleLabel: "Private SUV",
    price: 195,
    priceLabel: "/vehicle",
    badge: "popular",
    imageUrl: "https://images.unsplash.com/photo-1552083375-1447ce886485?w=800&q=80",
  },
];

export default function RouteCatalog() {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
      {routes.map((route, index) => (
        <motion.article
          key={route.slug}
          className="bg-surface-container-lowest border border-stone-20 flex flex-col p-md group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ y: -4 }}
        >
          <div className="mb-lg">
            <div className="flex justify-between items-start mb-sm">
              {route.badge ? (
                <motion.span
                  className="font-data-label text-[10px] text-[--color-stone] border border-stone-20 px-2 py-1 uppercase tracking-widest"
                  whileHover={{ scale: 1.05 }}
                >
                  {route.badge === "popular" ? t("routes.popular") : t("routes.scenicRoute")}
                </motion.span>
              ) : (
                <span className="font-data-label text-[10px] text-transparent border border-transparent px-2 py-1 uppercase tracking-widest">
                  Placeholder
                </span>
              )}
              <motion.span
                className="material-symbols-outlined text-[--color-stone] text-[20px] cursor-pointer"
                whileHover={{ scale: 1.2, color: "#FF6B4A" }}
              >
                favorite_border
              </motion.span>
            </div>

            <motion.div
              className="relative h-32 mb-md rounded overflow-hidden bg-surface-container-low"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                alt={`${route.originFull} to ${route.destination}`}
                src={route.imageUrl}
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                unoptimized
              />
              <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-[--color-tide]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <h3 className="font-headline text-[24px] text-primary-container leading-tight mb-sm">
              {route.originFull} <br /> <span className="text-[--color-stone] font-body text-[16px]">to</span> {route.destination}
            </h3>

            <div className="elevation-line mt-md mb-sm"></div>

            <div className="flex justify-between font-data-value text-[12px] text-[--color-stone]">
              <span>{route.origin}</span>
              <span>{route.duration}</span>
              <span>{route.destination}</span>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-sm mb-md">
            <div className="flex flex-col">
              <span className="font-data-label text-[10px] text-[--color-stone] uppercase">{t("routes.service")}</span>
              <span className="font-body text-[14px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary-container">
                  {route.vehicleType === "sharedVan" ? "airport_shuttle" : route.vehicleType === "privateSuv" ? "directions_car" : "sailing"}
                </span>
                {route.vehicleLabel}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-data-label text-[10px] text-[--color-stone] uppercase">
                {route.priceLabel === "/vehicle" ? t("routes.flatRate") : t("routes.startingFrom")}
              </span>
              <span className="font-data-value text-[16px] text-primary-container font-medium">
                ${route.price} <span className="text-[12px] text-[--color-stone]">{route.priceLabel}</span>
              </span>
            </div>
          </div>

          <Link href={`/routes/${route.slug}`}>
            <motion.button
              className="w-full border border-primary-container text-primary-container py-2 font-data-label text-[14px] hover:bg-primary-container hover:text-on-primary transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {route.priceLabel === "/vehicle" ? t("routes.bookPrivate") : t("routes.viewSchedules")}
            </motion.button>
          </Link>
        </motion.article>
      ))}

      {/* Custom Request CTA Card */}
      <motion.article
        className="bg-primary-container text-on-primary border border-stone-20 flex flex-col p-md justify-center items-center text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <motion.span
          className="material-symbols-outlined text-[48px] mb-sm"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          map
        </motion.span>
        <h3 className="font-headline text-[24px] mb-sm">{t("routes.customRouteTitle")}</h3>
        <p className="font-body text-[14px] mb-md text-primary-fixed-dim">{t("routes.customRouteSubtitle")}</p>
        <Link href="/routes/quote-request">
          <motion.button
            className="bg-sunset text-on-primary px-lg py-sm font-data-label text-[14px] hover:bg-opacity-90 transition-colors w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("routes.requestQuote")}
          </motion.button>
        </Link>
      </motion.article>
    </div>
  );
}