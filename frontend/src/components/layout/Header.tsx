"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant/20">
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-sm">
          <Truck className="w-6 h-6 text-primary" />
          <span className="font-headline-sm text-headline-sm font-bold tracking-tight text-primary">
            {t("common.siteName")}
          </span>
        </Link>
        <nav className="hidden md:flex gap-lg items-center">
          <Link
            href="/routes"
            className="text-primary font-semibold hover:text-primary-container transition-colors cursor-pointer active:opacity-80"
          >
            {t("nav.search")}
          </Link>
          <Link
            href="/booking"
            className="text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer active:opacity-80"
          >
            {t("nav.bookings")}
          </Link>
          <Link
            href="#support"
            className="text-on-surface-variant hover:text-primary-container transition-colors cursor-pointer active:opacity-80"
          >
            {t("nav.support")}
          </Link>
        </nav>
        <div className="flex items-center gap-sm">
          <Link
            href={pathname.startsWith("/en") ? "/es" : "/en"}
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            {locale === "en" ? "ES" : "EN"}
          </Link>
          <Link
            href="/admin/login"
            className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">account_circle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}