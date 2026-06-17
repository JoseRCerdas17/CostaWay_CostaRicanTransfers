"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, Search, Filter, ChevronDown } from "lucide-react";

const bookings = [
  { id: "CWT-001", customerName: "Maria Garcia", email: "maria@email.com", route: "SJO → La Fortuna", date: "2026-06-20", passengers: 2, amount: "$180", status: "confirmed", paymentStatus: "paid" },
  { id: "CWT-002", customerName: "John Smith", email: "john@email.com", route: "Monteverde → SJO", date: "2026-06-21", passengers: 4, amount: "$95", status: "pending", paymentStatus: "pending" },
  { id: "CWT-003", customerName: "Ana Rodriguez", email: "ana@email.com", route: "Jaco → Manuel Antonio", date: "2026-06-19", passengers: 2, amount: "$160", status: "confirmed", paymentStatus: "paid" },
  { id: "CWT-004", customerName: "Carlos Lopez", email: "carlos@email.com", route: "SJO → Tamarindo", date: "2026-06-22", passengers: 6, amount: "$45", status: "cancelled", paymentStatus: "refunded" },
  { id: "CWT-005", customerName: "Emma Wilson", email: "emma@email.com", route: "LIR → Tamarindo", date: "2026-06-23", passengers: 3, amount: "$135", status: "confirmed", paymentStatus: "paid" },
  { id: "CWT-006", customerName: "David Chen", email: "david@email.com", route: "San Jose → Manuel Antonio", date: "2026-06-24", passengers: 2, amount: "$160", status: "pending", paymentStatus: "pending" },
];

export default function AdminBookings() {
  const t = useTranslations();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-[--color-tide]/10 text-[--color-tide]";
      case "pending": return "bg-[--color-sunset]/10 text-[--color-sunset]";
      case "cancelled": return "bg-error-container text-error";
      default: return "bg-surface-container-high text-on-surface-variant";
    }
  };

  const getPaymentStyle = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "paid": return "bg-primary-container/50 text-primary";
      case "refunded": return "bg-error-container text-error";
      case "pending": return "bg-secondary-container text-secondary";
      default: return "bg-surface-container-high text-on-surface-variant";
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "all" || booking.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-lg">
      {/* Header */}
      <div>
        <h1 className="font-display text-[48px] text-primary mb-sm">Bookings</h1>
        <p className="font-body text-[18px] text-on-surface-variant">View and manage all transfer bookings.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-md items-start md:items-center justify-between">
        <div className="flex gap-sm flex-wrap">
          {["all", "pending", "confirmed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-sm py-xs rounded font-data-label text-[14px] transition-colors ${
                filter === status
                  ? "bg-primary text-white"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-sm top-1/2 -translate-y-1/2 w-4 h-4 text-[--color-stone]" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-xl pr-md py-sm bg-surface-container-low border border-outline rounded font-data-value text-[14px] w-64 focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest card-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-outline-variant/30 bg-surface-container-low">
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">ID</th>
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Customer</th>
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider hidden lg:table-cell">Route</th>
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Date</th>
                <th className="text-center py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Pax</th>
                <th className="text-right py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Amount</th>
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Status</th>
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Payment</th>
                <th className="text-left py-md px-md font-data-label text-[12px] text-[--color-stone] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="py-md px-md font-data-value text-[14px] text-primary font-semibold">{booking.id}</td>
                  <td className="py-md px-md">
                    <div>
                      <p className="font-data-value text-[14px] text-primary">{booking.customerName}</p>
                      <p className="font-data-label text-[12px] text-[--color-stone]">{booking.email}</p>
                    </div>
                  </td>
                  <td className="py-md px-md font-data-value text-[14px] text-on-surface-variant hidden lg:table-cell">{booking.route}</td>
                  <td className="py-md px-md font-data-label text-[14px] text-on-surface-variant">{booking.date}</td>
                  <td className="py-md px-md font-data-value text-[14px] text-primary text-center">{booking.passengers}</td>
                  <td className="py-md px-md font-display text-[18px] text-primary font-bold text-right">{booking.amount}</td>
                  <td className="py-md px-md">
                    <span className={`px-sm py-xs rounded font-data-label text-[12px] ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-md px-md">
                    <span className={`px-sm py-xs rounded font-data-label text-[12px] ${getPaymentStyle(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="py-md px-md">
                    <button className="p-xs text-[--color-stone] hover:text-primary transition-colors hover:bg-surface-container-low rounded">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className="text-center py-xl">
            <p className="font-data-value text-[14px] text-on-surface-variant">No bookings found</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-md py-md border-t border-outline-variant/30 bg-surface-container-low">
          <span className="font-data-label text-[14px] text-[--color-stone]">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </span>
          <div className="flex items-center gap-sm">
            <button className="px-sm py-xs rounded border border-outline bg-surface-container-low font-data-label text-[14px] text-on-surface-variant hover:bg-surface-container-high transition-colors">
              Previous
            </button>
            <button className="px-sm py-xs rounded border border-outline bg-surface-container-low font-data-label text-[14px] text-on-surface-variant hover:bg-surface-container-high transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}