"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { Truck, Calendar, FileText, DollarSign, TrendingUp, Users, Clock } from "lucide-react";

export default function AdminDashboard() {
  const t = useTranslations();

  const stats = [
    { label: "activeRoutes", value: "12", icon: Truck, trend: "+2" },
    { label: "totalBookings", value: "156", icon: Calendar, trend: "+12%" },
    { label: "pendingQuotes", value: "8", icon: FileText, trend: "-3" },
    { label: "monthlyRevenue", value: "$4,250", icon: DollarSign, trend: "+18%" },
  ];

  const recentBookings = [
    { id: "CWT-001", customer: "Maria Garcia", route: "SJO → La Fortuna", date: "Jun 20", status: "confirmed", amount: "$180" },
    { id: "CWT-002", customer: "John Smith", route: "Monteverde → SJO", date: "Jun 21", status: "pending", amount: "$95" },
    { id: "CWT-003", customer: "Ana Rodriguez", route: "Jaco → Manuel Antonio", date: "Jun 19", status: "confirmed", amount: "$160" },
    { id: "CWT-004", customer: "Carlos Lopez", route: "SJO → Tamarindo", date: "Jun 22", status: "cancelled", amount: "$45" },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-[--color-tide]/10 text-[--color-tide]";
      case "pending": return "bg-[--color-sunset]/10 text-[--color-sunset]";
      case "cancelled": return "bg-error-container text-error";
      default: return "bg-surface-container-high text-on-surface-variant";
    }
  };

  return (
    <div className="flex flex-col gap-xl">
      {/* Header */}
      <div>
        <h1 className="font-display text-[48px] text-primary mb-sm">Dashboard</h1>
        <p className="font-body text-[18px] text-on-surface-variant">Welcome back! Here&apos;s an overview of your business.</p>
      </div>

      {/* Stats Grid - Bento Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`bg-surface-container-lowest card-border rounded-lg p-lg interactive-shadow ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-md">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                index === 0 ? "bg-[--color-tide]/10" :
                index === 1 ? "bg-[--color-sunset]/10" :
                index === 2 ? "bg-primary-container/50" :
                "bg-[--color-tide]/10"
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  index === 0 ? "text-[--color-tide]" :
                  index === 1 ? "text-[--color-sunset]" :
                  index === 2 ? "text-primary" :
                  "text-[--color-tide]"
                }`} />
              </div>
              <span className={`font-data-label text-[12px] px-sm py-xs rounded flex items-center gap-xs ${
                stat.trend.startsWith("+") ? "bg-[--color-tide]/10 text-[--color-tide]" :
                stat.trend.startsWith("-") ? "bg-error-container text-error" :
                "bg-surface-container-high text-on-surface-variant"
              }`}>
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            <p className="font-display text-[36px] text-primary font-bold mb-xs">{stat.value}</p>
            <p className="font-data-label text-[14px] text-[--color-stone]">{t(`adminStats.${stat.label}`)}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-xl">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-surface-container-lowest card-border rounded-lg p-lg">
          <div className="flex items-center justify-between mb-lg">
            <h2 className="font-headline text-[32px] text-primary">Recent Bookings</h2>
            <Link
              href="/en/admin/bookings"
              className="font-data-label text-[14px] text-[--color-tide] hover:text-primary border-b border-[--color-tide] hover:border-primary transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-outline-variant/30">
                  <th className="text-left py-sm px-xs font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">ID</th>
                  <th className="text-left py-sm px-xs font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Customer</th>
                  <th className="text-left py-sm px-xs font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider hidden md:table-cell">Route</th>
                  <th className="text-left py-sm px-xs font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Date</th>
                  <th className="text-left py-sm px-xs font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Status</th>
                  <th className="text-left py-sm px-xs font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                    <td className="py-md px-xs font-data-value text-[14px] text-primary">{booking.id}</td>
                    <td className="py-md px-xs">
                      <div>
                        <p className="font-data-value text-[14px] text-primary">{booking.customer}</p>
                      </div>
                    </td>
                    <td className="py-md px-xs font-data-value text-[14px] text-on-surface-variant hidden md:table-cell">{booking.route}</td>
                    <td className="py-md px-xs font-data-label text-[14px] text-on-surface-variant">{booking.date}</td>
                    <td className="py-md px-xs">
                      <span className={`px-sm py-xs rounded font-data-label text-[12px] ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-md px-xs font-display text-[18px] text-primary font-bold text-right">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats Sidebar */}
        <div className="flex flex-col gap-md">
          <div className="bg-surface-container-lowest card-border rounded-lg p-lg">
            <h3 className="font-headline text-[24px] text-primary mb-md">Today&apos;s Activity</h3>
            <div className="space-y-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <Users className="w-5 h-5 text-[--color-tide]" />
                  <span className="font-data-value text-[14px] text-on-surface-variant">New Bookings</span>
                </div>
                <span className="font-display text-[24px] text-primary font-bold">3</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <Clock className="w-5 h-5 text-[--color-sunset]" />
                  <span className="font-data-value text-[14px] text-on-surface-variant">Pending Quotes</span>
                </div>
                <span className="font-display text-[24px] text-primary font-bold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-sm">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="font-data-value text-[14px] text-on-surface-variant">Today&apos;s Revenue</span>
                </div>
                <span className="font-display text-[24px] text-primary font-bold">$385</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest card-border rounded-lg p-lg">
            <h3 className="font-headline text-[24px] text-primary mb-md">Popular Routes</h3>
            <div className="space-y-sm">
              {["SJO → La Fortuna", "LIR → Tamarindo", "SJ → Manuel Antonio"].map((route, i) => (
                <div key={route} className="flex items-center justify-between py-sm border-b border-outline-variant/10 last:border-0">
                  <span className="font-data-value text-[14px] text-on-surface-variant">{route}</span>
                  <span className="font-data-label text-[12px] text-[--color-stone]">
                    {[42, 38, 24][i]}% of bookings
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}