"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { Truck, Calendar, FileText, Currency } from "lucide-react";

export default function AdminDashboard() {
  const t = useTranslations();

  const stats = [
    { label: "activeRoutes", value: "12", icon: Truck, color: "text-primary" },
    { label: "totalBookings", value: "156", icon: Calendar, color: "text-secondary" },
    { label: "pendingQuotes", value: "8", icon: FileText, color: "text-tertiary" },
    { label: "monthlyRevenue", value: "$4,250", icon: Currency, color: "text-primary" },
  ];

  const recentBookings = [
    { id: "CWT-001", route: "SJO Airport → La Fortuna", date: "2026-06-20", status: "confirmed", amount: "$85" },
    { id: "CWT-002", route: "Monteverde → SJO Airport", date: "2026-06-21", status: "pending", amount: "$95" },
    { id: "CWT-003", route: "Jaco → Manuel Antonio", date: "2026-06-19", status: "confirmed", amount: "$65" },
  ];

  return (
    <div className="flex flex-col gap-lg">
      <div><h1 className="font-headline-md text-[32px] text-primary mb-xs">Dashboard</h1><p className="font-body-lg text-[18px] text-on-surface-variant">Welcome back! Here&apos;s an overview of your business.</p></div>

      <div className="grid grid-cols-4 gap-md">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-surface-container-lowest border border-outline/20 rounded-lg p-md">
            <div className={`${stat.color} mb-sm`}><stat.icon className="w-6 h-6" /></div>
            <p className="font-data-value text-[24px] font-bold text-on-surface">{stat.value}</p>
            <p className="font-data-label text-[14px] text-on-surface-variant">{t(`adminStats.${stat.label}`)}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-lowest border border-outline/20 rounded-lg p-lg">
        <div className="flex items-center justify-between mb-md"><h2 className="font-headline-sm text-[24px] text-primary">Recent Bookings</h2><Link href="/en/admin/bookings" className="font-data-label text-[14px] text-primary hover:underline">View All</Link></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-outline/20"><th className="text-left py-sm px-xs font-data-label text-[14px] text-secondary">ID</th><th className="text-left py-sm px-xs font-data-label text-[14px] text-secondary">Route</th><th className="text-left py-sm px-xs font-data-label text-[14px] text-secondary">Date</th><th className="text-left py-sm px-xs font-data-label text-[14px] text-secondary">Status</th><th className="text-left py-sm px-xs font-data-label text-[14px] text-secondary">Amount</th></tr></thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-outline/10 hover:bg-surface-container-low transition-colors">
                  <td className="py-sm px-xs font-data-value text-[14px]">{booking.id}</td>
                  <td className="py-sm px-xs font-data-value text-[14px]">{booking.route}</td>
                  <td className="py-sm px-xs font-data-value text-[14px]">{booking.date}</td>
                  <td className="py-sm px-xs"><span className={`px-sm py-xs rounded font-data-label text-[12px] ${booking.status === "confirmed" ? "bg-primary-container text-primary-container" : "bg-secondary-container text-secondary-container"}`}>{booking.status}</span></td>
                  <td className="py-sm px-xs font-data-value text-[14px]">{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}