"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const quoteSchema = z.object({
  origin: z.string().min(2, "Origin is required"),
  destination: z.string().min(2, "Destination is required"),
  date: z.string().optional(),
  passengers: z.number().int().min(1).max(50),
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function QuoteRequestForm({ locale }: { locale: string }) {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { origin: "", destination: "", date: "", passengers: 1, customerName: "", email: "", phone: "", notes: "" },
  });
  const t = useTranslations();

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/quote-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit quote request");
    } catch { alert("Failed to submit request. Please try again."); }
  };

  if (isSubmitSuccessful) return (
    <div className="bg-surface-container-lowest border border-outline/20 rounded-lg p-xl text-center max-w-xl">
      <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-md"><span className="material-symbols-outlined text-primary text-[32px]">check</span></div>
      <h2 className="font-headline-md text-[32px] text-primary mb-sm">{t("quoteRequest.successTitle")}</h2>
      <p className="font-body-lg text-[18px] text-on-surface-variant mb-md">{t("quoteRequest.successMessage")}</p>
      <button onClick={() => router.push(`/${locale}`)} className="cta-button font-data-label text-[14px] py-sm px-md rounded transition-colors">{t("quoteRequest.backHome")}</button>
    </div>
  );

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
        <div className="grid grid-cols-2 gap-sm">
          <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.origin")} *</label><input type="text" {...register("origin")} className={`w-full bg-surface-container-low border ${errors.origin ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="San Jose" />{errors.origin && <span className="text-error text-[12px]">{errors.origin.message}</span>}</div>
          <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.destination")} *</label><input type="text" {...register("destination")} className={`w-full bg-surface-container-low border ${errors.destination ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="Monteverde" />{errors.destination && <span className="text-error text-[12px]">{errors.destination.message}</span>}</div>
        </div>
        <div className="grid grid-cols-2 gap-sm">
          <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.date")}</label><input type="date" {...register("date")} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px]" /></div>
          <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.passengers")} *</label><select {...register("passengers", { valueAsNumber: true })} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px]">{[1,2,3,4,5,6,7,8,9,10,15,20,25,30,40,50].map(n => <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>)}</select></div>
        </div>
        <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.fullName")} *</label><input type="text" {...register("customerName")} className={`w-full bg-surface-container-low border ${errors.customerName ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="John Doe" />{errors.customerName && <span className="text-error text-[12px]">{errors.customerName.message}</span>}</div>
        <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.email")} *</label><input type="email" {...register("email")} className={`w-full bg-surface-container-low border ${errors.email ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="john@example.com" />{errors.email && <span className="text-error text-[12px]">{errors.email.message}</span>}</div>
        <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.phone")}</label><input type="tel" {...register("phone")} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px]" placeholder="+1 234 567 8900" /></div>
        <div><label className="font-data-label text-[14px] text-secondary mb-xs block">{t("quoteRequest.notes")}</label><textarea {...register("notes")} rows={4} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px] resize-none" placeholder={t("quoteRequest.notesPlaceholder")} /></div>
        <button type="submit" disabled={isSubmitting} className="cta-button font-data-label text-[14px] py-sm px-md rounded transition-colors w-full text-center disabled:opacity-50 flex items-center justify-center gap-sm">{isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}{isSubmitting ? t("quoteRequest.submitting") : t("quoteRequest.submit")}</button>
      </form>
    </div>
  );
}