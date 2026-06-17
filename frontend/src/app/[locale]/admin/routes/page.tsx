"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus, Pencil, Trash2, MapPin, Clock, DollarSign } from "lucide-react";

const routes = [
  { id: "1", name: "SJO Airport ↔ La Fortuna", slug: "sjo-airport-la-fortuna", duration: "4h 30m", price: "$180", capacity: "Up to 8", active: true, bookings: 42 },
  { id: "2", name: "LIR Airport ↔ Tamarindo", slug: "liberia-tamarindo", duration: "1h 30m", price: "$45", capacity: "Up to 12", active: true, bookings: 38 },
  { id: "3", name: "San Jose ↔ Manuel Antonio", slug: "san-jose-manuel-antonio", duration: "3h 00m", price: "$160", capacity: "Up to 6", active: true, bookings: 24 },
  { id: "4", name: "SJO Airport ↔ Tamarindo", slug: "sjo-airport-tamarindo", duration: "4h 30m", price: "$195", capacity: "Up to 8", active: false, bookings: 12 },
];

export default function AdminRoutes() {
  const t = useTranslations();
  const [showActive, setShowActive] = useState(true);

  return (
    <div className="flex flex-col gap-lg">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-[48px] text-primary mb-sm">Routes</h1>
          <p className="font-body text-[18px] text-on-surface-variant">Manage your transfer routes and pricing.</p>
        </div>
        <button className="flex items-center gap-sm bg-[--color-sunset] text-white font-headline text-[18px] py-sm px-md rounded transition-opacity hover:opacity-90 font-bold">
          <Plus className="w-5 h-5" />
          Add Route
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-sm">
        <button
          onClick={() => setShowActive(true)}
          className={`px-sm py-xs rounded font-data-label text-[14px] transition-colors ${
            showActive
              ? "bg-primary text-white"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          Active ({routes.filter((r) => r.active).length})
        </button>
        <button
          onClick={() => setShowActive(false)}
          className={`px-sm py-xs rounded font-data-label text-[14px] transition-colors ${
            !showActive
              ? "bg-primary text-white"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          All ({routes.length})
        </button>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        {routes
          .filter((route) => showActive || !route.active)
          .map((route) => (
            <div
              key={route.id}
              className={`bg-surface-container-lowest card-border rounded-lg p-lg ${
                !route.active ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-md">
                <div className="flex-1">
                  <div className="flex items-center gap-sm mb-xs">
                    <span className={`px-sm py-xs rounded font-data-label text-[12px] ${
                      route.active
                        ? "bg-[--color-tide]/10 text-[--color-tide]"
                        : "bg-surface-container-high text-on-surface-variant"
                    }`}>
                      {route.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <h3 className="font-headline text-[24px] text-primary mb-xs">{route.name}</h3>
                  <p className="font-data-label text-[12px] text-[--color-stone]">/{route.slug}</p>
                </div>
                <div className="flex gap-xs">
                  <button className="p-sm text-[--color-stone] hover:text-primary hover:bg-surface-container-low rounded transition-colors">
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button className="p-sm text-[--color-stone] hover:text-error hover:bg-error-container rounded transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-md mb-md">
                <div className="flex items-center gap-xs">
                  <Clock className="w-4 h-4 text-[--color-stone]" />
                  <span className="font-data-label text-[12px] text-on-surface-variant">{route.duration}</span>
                </div>
                <div className="flex items-center gap-xs">
                  <DollarSign className="w-4 h-4 text-[--color-stone]" />
                  <span className="font-data-label text-[12px] text-on-surface-variant">{route.price}</span>
                </div>
                <div className="flex items-center gap-xs">
                  <MapPin className="w-4 h-4 text-[--color-stone]" />
                  <span className="font-data-label text-[12px] text-on-surface-variant">{route.capacity}</span>
                </div>
              </div>

              <div className="pt-md border-t border-outline-variant/30">
                <div className="flex justify-between items-center">
                  <span className="font-data-label text-[12px] text-[--color-stone]">Total Bookings</span>
                  <span className="font-display text-[20px] text-primary font-bold">{route.bookings}</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      {routes.filter((r) => showActive && r.active).length === 0 && (
        <div className="text-center py-xl bg-surface-container-lowest card-border rounded-lg">
          <p className="font-data-value text-[14px] text-on-surface-variant">No routes found</p>
        </div>
      )}
    </div>
  );
}