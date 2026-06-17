"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getRoutes } from "@/lib/api";
import { Route } from "@/lib/api";

const fallbackRoutes = [
  {
    slug: "sjo-airport-la-fortuna",
    origin: "SJO",
    destination: "Liberia",
    duration: "4h 30m",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
  {
    slug: "liberia-tamarindo",
    origin: "SJO",
    destination: "Tamarindo",
    duration: "5h",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=800&q=80",
  },
  {
    slug: "san-jose-manuel-antonio",
    origin: "LIR",
    destination: "La Fortuna",
    duration: "3h",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=800&q=80",
  },
];

const vehicleIcons: Record<string, string> = {
  private_suv: "directions_car",
  shared_van: "airport_shuttle",
  premium_sedan: "directions_car",
  van_boat_van: "sailing",
};

export default function PopularRoutes() {
  const t = useTranslations();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRoutes() {
      try {
        const data = await getRoutes();
        setRoutes(data.slice(0, 5));
      } catch {
        // Use fallback data if API fails
      } finally {
        setLoading(false);
      }
    }
    fetchRoutes();
  }, []);

  const displayRoutes = routes.length > 0 ? routes.map(r => ({
    slug: r.slug,
    origin: r.origin.split(" ")[0],
    destination: r.destination.split(" ")[0],
    duration: r.duration_estimate,
    price: r.price,
    imageUrl: r.image_url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  })) : fallbackRoutes;

  return (
    <section className="py-xl px-gutter max-w-container-max mx-auto w-full">
      <motion.h2
        className="font-headline text-[32px] text-primary mb-lg"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t("routes.topDestinations")}
      </motion.h2>

      <div className="flex overflow-x-auto gap-md pb-8 snap-x snap-mandatory hide-scrollbar">
        {displayRoutes.map((route, index) => (
          <motion.div
            key={route.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`/routes/${route.slug}`}
              className="route-card min-w-[300px] flex-none rounded-lg overflow-hidden snap-start flex flex-col cursor-pointer"
            >
              <div className="relative h-40 bg-surface-container-low group-hover:scale-105 transition-transform duration-500">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full"
                >
                  <Image
                    alt={`${route.origin} to ${route.destination}`}
                    src={route.imageUrl}
                    fill
                    className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                    unoptimized
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-1 bg-[--color-tide] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-md flex flex-col flex-grow bg-surface-container-lowest">
                <div className="flex justify-between items-start mb-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-data-value text-[16px] text-on-surface font-medium">{route.origin}</span>
                    <motion.span
                      className="material-symbols-outlined text-[--color-tide] text-[16px]"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    >
                      arrow_forward
                    </motion.span>
                    <span className="font-data-value text-[16px] text-on-surface font-medium">{route.destination}</span>
                  </div>
                </div>

                <div className="elevation-line w-full mb-md"></div>

                <p className="font-body text-[14px] text-on-surface-variant mb-md flex-grow">
                  Approx. {route.duration} transfer time.
                </p>

                <motion.div
                  className="flex justify-between items-center pt-4 border-t border-outline-variant/20"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="font-data-label text-[14px] text-[--color-stone]">FROM ${route.price}</span>
                  <span className="font-data-label text-[14px] text-primary underline cursor-pointer">{t("routes.viewAll")}</span>
                </motion.div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .route-card {
          border: 1px solid rgba(74, 93, 83, 0.2);
          background-color: #ffffff;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .route-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(31, 58, 46, 0.1);
        }
      `}</style>
    </section>
  );
}
