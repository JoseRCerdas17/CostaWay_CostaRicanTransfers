"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const t = useTranslations();
  const pathname = usePathname();

  const navItems = [
    { href: "/routes", label: "nav.search", icon: "search" },
    { href: "/booking", label: "nav.bookings", icon: "directions_car" },
    { href: "#support", label: "nav.support", icon: "support_agent" },
    { href: "/admin/login", label: "nav.account", icon: "person" },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-outline-variant/30 shadow-lg md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname.includes(item.href.replace("/", ""));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? "text-[--color-tide]"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px] mb-xs"
                style={{ fontVariationSettings: "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="font-data-label text-[10px]">{t(item.label)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}