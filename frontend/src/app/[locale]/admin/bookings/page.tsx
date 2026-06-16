"use client";

import { useTranslations } from "next-intl";
import { Eye } from "lucide-react";

const bookings = [
  { id: "CWT-001", customerName: "Maria Garcia", email: "maria@email.com", route: "SJO Airport → La Fortuna", date: "2026-06-20", passengers: 2, amount: "$85", status: "confirmed", paymentStatus: "paid" },
  { id: "CWT-002", customerName: "John Smith", email: "john@email.com", route: "Monteverde → SJO Airport", date: "2026-06-21", passengers: 4, amount: "$95", status: "pending", paymentStatus: "pending" },
  { id: "CWT-003", customerName: "Ana Rodriguez", email: "ana@email.com", route: "Jaco → Manuel Antonio", date: "2026-06-19", passengers: 2, amount: "$65", status: "confirmed", paymentStatus: "paid" },
  { id: "CWT-004", customerName: "Carlos Lopez", email: "carlos@email.com", route: "SJO Airport → Tamarindo", date: "2026-06-22", passengers: 6, amount: "$110", status: "cancelled", paymentStatus: "refunded" },
];

export default function AdminBookings() {
  const t = useTranslations();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-primary-container text-primary-container";
      case "pending": return "bg-secondary-container text-secondary-container";
      case "cancelled": return "bg-error-container text-on-error-container";
      default: return "bg-surface-container-high text-on-surface-variant";
    }
  };

  return (
    <div className="flex flex-col gap-lg">
      <div><h1 className="font-headline-md text-[32px] text-primary mb-xs">Bookings</h1><p className="font-body-lg text-[18px] text-on-surface-variant">View and manage all transfer bookings.</p></div>

      <div className="bg-surface-container-lowest border border-outline/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-outline/20 bg-surface-container-low"><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">ID</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Customer</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Route</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Date</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Pax</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Amount</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Status</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Payment</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Actions</th></tr></thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-outline/10 hover:bg-surface-container-low transition-colors">
                  <td className="py-sm px-md font-data-value text-[14px]">{booking.id}</td>
                  <td className="py-sm px-md"><div><p className="font-data-value text-[14px]">{booking.customerName}</p><p className="font-data-label text-[12px] text-on-surface-variant">{booking.email}</p></div></td>
                  <td className="py-sm px-md font-data-value text-[14px]">{booking.route}</td>
                  <td className="py-sm px-md font-data-value text-[14px]">{booking.date}</td>
                  <td className="py-sm px-md font-data-value text-[14px] text-center">{booking.passengers}</td>
                  <td className="py-sm px-md font-data-value text-[14px]">{booking.amount}</td>
                  <td className="py-sm px-md"><span className={`px-sm py-xs rounded font-data-label text-[12px] ${getStatusStyle(booking.status)}`}>{booking.status}</span></td>
                  <td className="py-sm px-md"><span className={`px-sm py-xs rounded font-data-label text-[12px] ${booking.paymentStatus === "paid" ? "bg-primary-container text-primary-container" : booking.paymentStatus === "refunded" ? "bg-error-container text-on-error-container" : "bg-secondary-container text-secondary-container"}`}>{booking.paymentStatus}</span></td>
                  <td className="py-sm px-md"><button className="p-xs text-on-surface-variant hover:text-primary transition-colors"><Eye className="w-4 h-4" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}