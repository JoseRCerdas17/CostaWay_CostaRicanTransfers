"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Eye, CheckCircle, XCircle, MessageSquare, Clock, Users, MapPin } from "lucide-react";

const quoteRequests = [
  { id: "QR-001", customerName: "Robert Johnson", email: "robert@email.com", phone: "+1 555-0123", route: "SJO Airport → Dominical", date: "2026-07-01", passengers: 8, notes: "Need child seat", status: "pending" },
  { id: "QR-002", customerName: "Susan Williams", email: "susan@email.com", phone: "+1 555-0456", route: "Nosara → SJO Airport", date: "2026-06-25", passengers: 4, notes: "Large luggage, early flight", status: "quoted" },
  { id: "QR-003", customerName: "David Brown", email: "david@email.com", phone: "+506 8888-9999", route: "Santa Teresa → Manuel Antonio", date: "2026-07-05", passengers: 6, notes: "-", status: "pending" },
  { id: "QR-004", customerName: "Lisa Martinez", email: "lisa@email.com", phone: "+1 555-0789", route: "Uvita → SJO Airport", date: "2026-06-28", passengers: 2, notes: "Airport drop-off", status: "converted" },
];

export default function AdminQuoteRequests() {
  const t = useTranslations();
  const [filter, setFilter] = useState("all");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return "bg-[--color-sunset]/10 text-[--color-sunset]";
      case "quoted": return "bg-primary-container/50 text-primary";
      case "converted": return "bg-[--color-tide]/10 text-[--color-tide]";
      case "rejected": return "bg-error-container text-error";
      default: return "bg-surface-container-high text-on-surface-variant";
    }
  };

  const filteredQuotes = quoteRequests.filter((quote) => {
    return filter === "all" || quote.status === filter;
  });

  const pendingCount = quoteRequests.filter((q) => q.status === "pending").length;

  return (
    <div className="flex flex-col gap-lg">
      {/* Header */}
      <div>
        <div className="flex items-center gap-sm mb-sm">
          <h1 className="font-display text-[48px] text-primary">Quote Requests</h1>
          {pendingCount > 0 && (
            <span className="px-sm py-xs rounded-full bg-[--color-sunset]/10 text-[--color-sunset] font-data-label text-[14px]">
              {pendingCount} pending
            </span>
          )}
        </div>
        <p className="font-body text-[18px] text-on-surface-variant">Manage custom quote requests from customers.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-sm flex-wrap">
        {["all", "pending", "quoted", "converted", "rejected"].map((status) => (
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
            {status !== "all" && (
              <span className="ml-xs opacity-60">
                ({quoteRequests.filter((q) => q.status === status).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Quotes List */}
      <div className="flex flex-col gap-md">
        {filteredQuotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-surface-container-lowest card-border rounded-lg p-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-md">
              {/* Left: Customer & Route Info */}
              <div className="flex-1">
                <div className="flex items-center gap-sm mb-md">
                  <span className="font-data-value text-[14px] text-primary font-semibold">{quote.id}</span>
                  <span className={`px-sm py-xs rounded font-data-label text-[12px] ${getStatusStyle(quote.status)}`}>
                    {quote.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md mb-md">
                  <div>
                    <p className="font-data-label text-[12px] text-[--color-stone] mb-xs">Customer</p>
                    <p className="font-data-value text-[14px] text-primary">{quote.customerName}</p>
                    <p className="font-data-label text-[12px] text-[--color-stone]">{quote.email}</p>
                    <p className="font-data-label text-[12px] text-[--color-stone]">{quote.phone}</p>
                  </div>

                  <div>
                    <p className="font-data-label text-[12px] text-[--color-stone] mb-xs">Route</p>
                    <div className="flex items-center gap-xs">
                      <MapPin className="w-4 h-4 text-[--color-tide]" />
                      <span className="font-data-value text-[14px] text-primary">{quote.route}</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-data-label text-[12px] text-[--color-stone] mb-xs">Details</p>
                    <div className="flex items-center gap-xs mb-xs">
                      <Clock className="w-4 h-4 text-[--color-stone]" />
                      <span className="font-data-value text-[14px] text-on-surface-variant">{quote.date}</span>
                    </div>
                    <div className="flex items-center gap-xs">
                      <Users className="w-4 h-4 text-[--color-stone]" />
                      <span className="font-data-value text-[14px] text-on-surface-variant">{quote.passengers} passengers</span>
                    </div>
                  </div>
                </div>

                {quote.notes && quote.notes !== "-" && (
                  <div className="flex items-start gap-xs bg-surface-container-low p-sm rounded">
                    <MessageSquare className="w-4 h-4 text-[--color-stone] mt-xs" />
                    <div>
                      <p className="font-data-label text-[12px] text-[--color-stone] mb-xs">Notes</p>
                      <p className="font-data-value text-[14px] text-on-surface-variant">{quote.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Actions */}
              <div className="flex lg:flex-col gap-sm lg:items-end">
                <button className="flex items-center gap-xs px-sm py-xs rounded border border-outline hover:bg-surface-container-low transition-colors">
                  <Eye className="w-4 h-4 text-[--color-stone]" />
                  <span className="font-data-label text-[12px] text-on-surface-variant">View</span>
                </button>

                {quote.status === "pending" && (
                  <>
                    <button className="flex items-center gap-xs px-sm py-xs rounded bg-[--color-tide] text-white hover:opacity-90 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-data-label text-[12px]">Assign Price</span>
                    </button>
                    <button className="flex items-center gap-xs px-sm py-xs rounded bg-error-container text-error hover:opacity-90 transition-colors">
                      <XCircle className="w-4 h-4" />
                      <span className="font-data-label text-[12px]">Reject</span>
                    </button>
                  </>
                )}

                {quote.status === "quoted" && (
                  <button className="flex items-center gap-xs px-sm py-xs rounded bg-[--color-sunset] text-white hover:opacity-90 transition-colors">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-data-label text-[12px]">Convert to Booking</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredQuotes.length === 0 && (
          <div className="text-center py-xl bg-surface-container-lowest card-border rounded-lg">
            <p className="font-data-value text-[14px] text-on-surface-variant">No quote requests found</p>
          </div>
        )}
      </div>
    </div>
  );
}