"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n";
import { Plus, Pencil, Trash2 } from "lucide-react";

const routes = [
  { id: "1", name: "SJO Airport ↔ La Fortuna", duration: "3h 30m", price: "$85", active: true },
  { id: "2", name: "SJO Airport ↔ Monteverde", duration: "4h", price: "$95", active: true },
  { id: "3", name: "Jaco ↔ Manuel Antonio", duration: "1h 30m", price: "$65", active: true },
  { id: "4", name: "SJO Airport ↔ Tamarindo", duration: "4h 30m", price: "$110", active: false },
];

export default function AdminRoutes() {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex items-center justify-between"><div><h1 className="font-headline-md text-[32px] text-primary mb-xs">Routes</h1><p className="font-body-lg text-[18px] text-on-surface-variant">Manage your transfer routes and pricing.</p></div><button className="flex items-center gap-sm bg-primary-fixed text-primary font-data-label text-[14px] py-sm px-md rounded transition-colors hover:bg-primary-fixed/80"><Plus className="w-4 h-4" />Add Route</button></div>

      <div className="bg-surface-container-lowest border border-outline/20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-outline/20 bg-surface-container-low"><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Route</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Duration</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Price</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Status</th><th className="text-left py-sm px-md font-data-label text-[14px] text-secondary">Actions</th></tr></thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id} className="border-b border-outline/10 hover:bg-surface-container-low transition-colors">
                <td className="py-sm px-md font-data-value text-[14px]">{route.name}</td>
                <td className="py-sm px-md font-data-value text-[14px]">{route.duration}</td>
                <td className="py-sm px-md font-data-value text-[14px]">{route.price}</td>
                <td className="py-sm px-md"><span className={`px-sm py-xs rounded font-data-label text-[12px] ${route.active ? "bg-primary-container text-primary-container" : "bg-surface-container-high text-on-surface-variant"}`}>{route.active ? "Active" : "Inactive"}</span></td>
                <td className="py-sm px-md"><div className="flex items-center gap-sm"><button className="p-xs text-on-surface-variant hover:text-primary transition-colors"><Pencil className="w-4 h-4" /></button><button className="p-xs text-on-surface-variant hover:text-error transition-colors"><Trash2 className="w-4 h-4" /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}