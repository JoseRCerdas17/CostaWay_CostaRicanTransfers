"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const heroImage = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80";

interface HeroSectionProps {
  locale: string;
}

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations();
  const router = useRouter();
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1-3",
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (formData.from) params.set("from", formData.from);
    if (formData.to) params.set("to", formData.to);
    if (formData.date) params.set("date", formData.date);
    if (formData.passengers) params.set("passengers", formData.passengers);
    router.push(`/${locale}/routes?${params.toString()}`);
  };

  return (
    <section className="relative pt-xl pb-lg px-gutter flex flex-col items-center justify-center min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 40%, black 100%)",
        }}
      />

      {/* Gradient Overlay for smooth fade into background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, rgba(250, 249, 247, 0.7) 0%, rgba(250, 249, 247, 0.3) 30%, transparent 60%)",
        }}
      />

      <div className="max-w-container-max mx-auto w-full relative z-10 text-center flex flex-col items-center">
        <motion.p
          className="font-data-label text-[14px] text-[--color-tide] uppercase tracking-wider mb-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t("hero.professionalLabel")}
        </motion.p>

        <motion.h1
          className="font-display text-[32px] md:text-[48px] text-primary max-w-4xl mb-md leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          className="font-body text-[18px] text-on-surface-variant max-w-2xl mb-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t("hero.subtitle")}
        </motion.p>

        <motion.div
          className="bg-surface-container-lowest w-full max-w-5xl rounded-lg card-border p-md flex flex-col md:flex-row gap-md items-end shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex-1 w-full flex flex-col gap-xs input-bottom-border pb-2 group">
            <label className="font-data-label text-[14px] text-[--color-stone] uppercase tracking-wider text-left">
              {t("hero.from")}
            </label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[--color-stone] text-[20px]">flight_land</span>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[16px] text-primary placeholder:text-outline-variant"
                placeholder={t("hero.fromPlaceholder")}
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center pb-4 px-2">
            <span className="material-symbols-outlined text-[--color-tide] text-[20px]">arrow_forward</span>
          </div>

          <div className="flex-1 w-full flex flex-col gap-xs input-bottom-border pb-2 group">
            <label className="font-data-label text-[14px] text-[--color-stone] uppercase tracking-wider text-left">
              {t("hero.to")}
            </label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[--color-stone] text-[20px]">location_on</span>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[16px] text-primary placeholder:text-outline-variant"
                placeholder={t("hero.toPlaceholder")}
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-xs input-bottom-border pb-2 group">
            <label className="font-data-label text-[14px] text-[--color-stone] uppercase tracking-wider text-left">
              {t("hero.date")}
            </label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[--color-stone] text-[20px]">calendar_today</span>
              <input
                type="date"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[16px] text-primary text-opacity-50"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="flex-1 w-full flex flex-col gap-xs input-bottom-border pb-2 group">
            <label className="font-data-label text-[14px] text-[--color-stone] uppercase tracking-wider text-left">
              {t("hero.passengers")}
            </label>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[--color-stone] text-[20px]">group</span>
              <select
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-[16px] text-primary"
                value={formData.passengers}
                onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
              >
                <option value="1-3">1-3 (Sedan)</option>
                <option value="4-7">4-7 (Van)</option>
                <option value="8+">8+ (Minibus)</option>
              </select>
            </div>
          </div>

          <motion.button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[--color-sunset] text-white font-data-label text-[14px] px-8 py-4 rounded hover:bg-opacity-90 transition-opacity whitespace-nowrap flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t("hero.searchRoutes")}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}