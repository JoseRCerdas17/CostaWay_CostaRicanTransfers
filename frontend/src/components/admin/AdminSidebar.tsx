"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Truck, Calendar, FileText, LogOut } from "lucide-react";

const navItems = [
  { href: "/en/admin/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/en/admin/routes", label: "routes", icon: Truck },
  { href: "/en/admin/bookings", label: "bookings", icon: Calendar },
  { href: "/en/admin/quote-requests", label: "quoteRequests", icon: FileText },
];

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const pathname = usePathname();

  const handleLogout = () => { localStorage.removeItem("admin_token"); window.location.href = "/en/admin/login"; };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-surface-container-low border-r border-outline-variant flex flex-col fixed h-screen">
        <div className="p-md border-b border-outline-variant"><Link href="/en/admin/dashboard"><h1 className="font-headline-sm text-[24px] text-primary">Admin Panel</h1></Link></div>
        <nav className="flex-1 p-sm">
          <ul className="flex flex-col gap-xs">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href.replace("/en", ""));
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`flex items-center gap-sm p-sm rounded font-data-label text-[14px] transition-colors ${isActive ? "bg-primary-fixed text-primary-container" : "text-on-surface-variant hover:bg-surface-container-high"}`}>
                    <item.icon className="w-5 h-5" />{t(`adminNav.${item.label}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-sm border-t border-outline-variant">
          <button onClick={handleLogout} className="flex items-center gap-sm p-sm rounded font-data-label text-[14px] text-on-surface-variant hover:bg-surface-container-high w-full transition-colors">
            <LogOut className="w-5 h-5" />{t("adminNav.logout")}
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-surface p-lg ml-64 overflow-auto min-h-screen"><div className="max-w-6xl mx-auto">{children}</div></main>
    </div>
  );
}