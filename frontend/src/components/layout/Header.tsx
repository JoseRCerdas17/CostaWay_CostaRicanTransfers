"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();

  const navItems = [
    { href: "/routes", label: "nav.search", isActive: pathname.includes("/routes") },
    { href: "/booking", label: "nav.bookings", isActive: pathname.includes("/booking") },
    { href: "#support", label: "nav.support", isActive: false },
  ];

  return (
    <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-sm group">
            <motion.div
              className="w-10 h-10 rounded-lg bg-[--color-tide]/10 flex items-center justify-center"
              whileHover={{ backgroundColor: "rgba(47, 107, 107, 0.2)", scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Truck className="w-5 h-5 text-[--color-tide]" />
            </motion.div>
            <span className="font-display text-[24px] font-bold tracking-tight text-primary">
              {t("common.siteName")}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={`px-md py-sm rounded-lg font-data-label text-[14px] transition-colors ${
                    item.isActive
                      ? "bg-[--color-tide]/10 text-[--color-tide]"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container-low"
                  }`}
                >
                  {t(item.label)}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center gap-sm">
            <Link
              href={pathname.startsWith("/en") ? "/es" : "/en"}
              className="flex items-center gap-xs px-sm py-xs rounded-lg text-[--color-stone] hover:text-primary hover:bg-surface-container-low transition-colors font-data-label text-[12px] uppercase tracking-wider"
            >
              {locale === "en" ? "ES" : "EN"}
            </Link>

            <Link
              href="/admin/login"
              className="flex items-center gap-xs px-sm py-xs rounded-lg text-[--color-stone] hover:text-primary hover:bg-surface-container-low transition-colors"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="material-symbols-outlined text-[20px]">account_circle</span>
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}