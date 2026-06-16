"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPageLayout({ children }: { children: React.ReactNode }) {
  return <AdminSidebar>{children}</AdminSidebar>;
}