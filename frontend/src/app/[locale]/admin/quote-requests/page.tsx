"use client";

import { useTranslations } from "next-intl";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const quoteRequests = [
  { id: "QR-001", customerName: "Robert Johnson", email: "robert@email.com", phone: "+1 555-0123", route: "SJO Airport → Dominical", date: "2026-07-01", passengers: 8, specialRequirements: "Need child seat", status: "pending" },
  { id: "QR-002", customerName: "Susan Williams", email: "susan@email.com", phone: "+1 555-0456", route: "Nosara → SJO Airport", date: "2026-06-25", passengers: 4, specialRequirements: "Large luggage", status: "replied" },
  { id: "QR-003", customerName: "David Brown", email: "david@email.com", phone: "+506 8888-9999", route: "Santa Teresa → Manuel Antonio", date: "2026-07-05", passengers: 6, specialRequirements: "None", status: "pending" },
];

export default function AdminQuoteRequests() {
  const t = useTranslations();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return "bg-secondary-container text-secondary-container";
      case "replied": return "bg-primary-container text-primary-container";
      default: return "bg-surface-container-high text-on-surface-variant";
    }
  };

  return (
    <div className="flex flex-col gap-lg">
      <div><h1 className="font-headline-md text-[32px] text-primary mb-xs">Quote Requests</h1><p className="font-body-lg text-[18px] text-on-surface-variant">Manage custom quote requests from customers.</p></div>

      <div className="bg-surface-container-lowest border border-outline/20 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-outline/20 bg-surface-container-low"><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">ID</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Customer</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Route</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Date</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Pax</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Requirements</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Status</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Actions</th></tr></thead>
            <tbody>
              {quoteRequests.map((quote) => (
                <tr key={quote.id} className="border-b border-outline/10 hover:bg-surface-container-low transition-colors">
                  <td className="py-sm px-md font-data-value text-[14px]">{quote.id}</td>
                  <td className="py-sm px-md"><div><p className="font-data-value text-[14px]">{quote.customerName}</p><p className="font-data-label text-[12px] text-on-surface-variant">{quote.email}</p><p className="font-data-label text-[12px] text-on-surface-variant">{quote.phone}</p></div></td>
                  <td className="py-sm px-md font-data-value text-[14px]">{quote.route}</td>
                  <td className="py-sm px-md font-data-value text-[14px]">{quote.date}</td>
                  <td className="py-sm px-md font-data-value text-[14px] text-center">{quote.passengers}</td>
                  <td className="py-sm px-md font-data-value text-[14px] max-w-[200px] truncate">{quote.specialRequirements}</td>
                  <td className="py-sm px-md"><span className={`px-sm py-xs rounded font-data-label text-[12px] ${getStatusStyle(quote.status)}`}>{quote.status}</span></td>
                  <td className="py-sm px-md"><div className="flex items-center gap-sm"><button className="p-xs text-on-surface-variant hover:text-primary transition-colors"><Eye className="w-4 h-4" /></button><button className="p-xs text-on-surface-variant hover:text-primary transition-colors"><CheckCircle className="w-4 h-4" /></button><button className="p-xs text-on-surface-variant hover:text-error transition-colors"><XCircle className="w-4 h-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}