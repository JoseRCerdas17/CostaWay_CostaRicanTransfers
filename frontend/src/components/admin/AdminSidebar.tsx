"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck, Calendar, FileText, LogOut, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/en/admin/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/en/admin/routes", label: "routes", icon: Truck },
  { href: "/en/admin/bookings", label: "bookings", icon: Calendar },
  { href: "/en/admin/quote-requests", label: "quoteRequests", icon: FileText },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/en/admin/login";
  };

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Sidebar */}
      <aside className="w-72 bg-surface-container-lowest border-r border-outline-variant flex flex-col fixed h-screen">
        {/* Logo */}
        <div className="p-lg border-b border-outline-variant/30">
          <Link href="/en/admin/dashboard" className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-lg bg-[--color-tide]/10 flex items-center justify-center">
              <Truck className="w-5 h-5 text-[--color-tide]" />
            </div>
            <div>
              <h1 className="font-headline text-[20px] text-primary font-bold leading-tight">CostaWay</h1>
              <p className="font-data-label text-[10px] text-[--color-stone] uppercase tracking-wider">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-md overflow-y-auto">
          <ul className="flex flex-col gap-xs">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href.replace("/en", ""));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-md p-md rounded-lg transition-all ${
                      isActive
                        ? "bg-[--color-tide]/10 text-[--color-tide]"
                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? "text-[--color-tide]" : ""}`} />
                    <span className="font-data-value text-[14px] flex-1">{t(`adminNav.${item.label}`)}</span>
                    {isActive && <ChevronRight className="w-4 h-4" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-md border-t border-outline-variant/30">
          {/* View Site Link */}
          <Link
            href="/en"
            target="_blank"
            className="flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all mb-xs"
          >
            <span className="material-symbols-outlined w-5 h-5">open_in_new</span>
            <span className="font-data-value text-[14px]">View Website</span>
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-md p-md rounded-lg text-on-surface-variant hover:bg-error-container hover:text-error w-full transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-data-value text-[14px]">{t("adminNav.logout")}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 bg-surface overflow-auto min-h-screen">
        <div className="p-xl max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}