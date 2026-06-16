"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";

export default function MobileNav() {
  const t = useTranslations();

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant/30 shadow-sm flex justify-around items-center h-16 md:hidden">
      <Link
        href="/routes"
        className="flex flex-col items-center justify-center text-primary font-data-label text-data-label w-full h-full scale-95 transition-transform"
      >
        <span className="material-symbols-outlined mb-xs">search</span>
        {t("nav.search")}
      </Link>
      <Link
        href="/booking"
        className="flex flex-col items-center justify-center text-on-surface-variant font-data-label text-data-label w-full h-full hover:bg-surface-container-low scale-95 transition-transform"
      >
        <span className="material-symbols-outlined mb-xs">directions_car</span>
        {t("nav.bookings")}
      </Link>
      <Link
        href="#support"
        className="flex flex-col items-center justify-center text-on-surface-variant font-data-label text-data-label w-full h-full hover:bg-surface-container-low scale-95 transition-transform"
      >
        <span className="material-symbols-outlined mb-xs">support_agent</span>
        {t("nav.support")}
      </Link>
      <Link
        href="/admin/login"
        className="flex flex-col items-center justify-center text-on-surface-variant font-data-label text-data-label w-full h-full hover:bg-surface-container-low scale-95 transition-transform"
      >
        <span className="material-symbols-outlined mb-xs">person</span>
        {t("nav.account")}
      </Link>
    </nav>
  );
}