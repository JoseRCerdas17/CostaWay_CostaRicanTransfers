"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    passengers: "1",
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
    <section className="relative pt-xl pb-lg px-gutter max-w-container-max mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-lg items-start">
        <div className="flex-1 flex flex-col gap-md">
          <h1 className="font-display text-[32px] leading-[1.2] md:text-[48px] md:leading-[1.1] md:tracking-[-0.02em] md:font-bold text-primary">
            {t("hero.title")}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            {t("hero.subtitle")}
          </p>
        </div>
        <div className="w-full md:w-[480px] bg-surface-container-lowest border border-outline/20 p-md rounded-lg shadow-sm flex flex-col gap-sm">
          <div className="grid grid-cols-1 gap-0">
            <div className="relative pb-xs border-b-2 border-outline-variant focus-within:border-[#2F6B6B] transition-colors">
              <label className="font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-secondary mb-xs block">
                {t("hero.from")}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 focus:ring-0 font-data-value text-[16px] leading-[1.4] text-on-surface placeholder:text-on-surface-variant/50"
                placeholder={t("hero.fromPlaceholder")}
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              />
            </div>
            <div className="relative py-sm border-b-2 border-outline-variant focus-within:border-[#2F6B6B] transition-colors">
              <label className="font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-secondary mb-xs block">
                {t("hero.to")}
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-none p-0 focus:ring-0 font-data-value text-[16px] leading-[1.4] text-on-surface placeholder:text-on-surface-variant/50"
                placeholder={t("hero.toPlaceholder")}
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-sm py-sm">
              <div className="relative border-b-2 border-outline-variant focus-within:border-[#2F6B6B] transition-colors">
                <label className="font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-secondary mb-xs block">
                  {t("hero.date")}
                </label>
                <input
                  type="date"
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-data-value text-[16px] leading-[1.4] text-on-surface"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="relative border-b-2 border-outline-variant focus-within:border-[#2F6B6B] transition-colors">
                <label className="font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-secondary mb-xs block">
                  {t("hero.passengers")}
                </label>
                <select
                  className="w-full bg-transparent border-none p-0 focus:ring-0 font-data-value text-[16px] leading-[1.4] text-on-surface"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                >
                  <option value="1">{t("hero.passengerOptions.1")}</option>
                  <option value="2">{t("hero.passengerOptions.2")}</option>
                  <option value="3-4">{t("hero.passengerOptions.3-4")}</option>
                  <option value="5+">{t("hero.passengerOptions.5+")}</option>
                </select>
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="mt-sm cta-button font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium py-sm px-md rounded transition-colors w-full text-center"
          >
            {t("hero.searchRoutes")}
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full opacity-30 pointer-events-none elevation-line"></div>
    </section>
  );
}