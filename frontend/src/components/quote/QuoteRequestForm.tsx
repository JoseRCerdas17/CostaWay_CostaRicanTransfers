"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { createQuoteRequest } from "@/lib/api";

const quoteSchema = z.object({
  origin: z.string().min(2, "Origin is required"),
  destination: z.string().min(2, "Destination is required"),
  date: z.string().optional(),
  time: z.string().optional(),
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
    defaultValues: { origin: "", destination: "", date: "", time: "", passengers: 1, customerName: "", email: "", phone: "", notes: "" },
  });
  const t = useTranslations();

  const onSubmit = async (data: QuoteFormData) => {
    try {
      await createQuoteRequest({
        origin: data.origin,
        destination: data.destination,
        date: data.date,
        time: data.time,
        passengers: data.passengers,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
      });
    } catch {
      alert("Failed to submit request. Please try again.");
    }
  };

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];

  if (isSubmitSuccessful) return (
    <div className="bg-surface-container-lowest card-border rounded-lg p-xl text-center max-w-xl">
      <div className="w-20 h-20 bg-primary-fixed mb-md rounded-full flex items-center justify-center mx-auto">
        <span className="material-symbols-outlined text-primary text-[40px]">check_circle</span>
      </div>
      <h2 className="font-display text-[48px] text-primary mb-sm">{t("quoteRequest.successTitle")}</h2>
      <p className="font-body text-[18px] text-on-surface-variant mb-xl max-w-md mx-auto">{t("quoteRequest.successMessage")}</p>
      <button onClick={() => router.push(`/${locale}`)} className="bg-sunset text-white font-data-label text-[14px] py-sm px-lg rounded hover:bg-opacity-90 transition-colors">
        {t("quoteRequest.backHome")}
      </button>
    </div>
  );

  return (
    <div className="bg-surface-container-lowest border border-outline-variant/20 rounded shadow-sm relative overflow-hidden p-lg">
      <div className="absolute top-0 left-0 w-1 bg-[#2F6B6B] h-full opacity-20"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
        <fieldset className="space-y-md">
          <legend className="font-data-label text-[14px] text-primary-container mb-md border-b border-outline-variant/20 pb-base w-full uppercase tracking-wider">
            {t("quoteRequest.routeLogistics")}
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md relative">
            <div className="relative group">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="origin">
                {t("quoteRequest.originLocation")}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-0 text-on-surface-variant text-[20px]">trip_origin</span>
                <input
                  id="origin"
                  type="text"
                  {...register("origin")}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#2F6B6B] focus:ring-0 pl-md py-base font-data-value text-[16px] text-on-surface transition-colors placeholder:text-surface-dim"
                  placeholder={t("quoteRequest.originPlaceholder")}
                />
              </div>
              {errors.origin && <span className="text-error text-[12px]">{errors.origin.message}</span>}
            </div>

            <div className="relative group">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="destination">
                {t("quoteRequest.destinationLocation")}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-0 text-on-surface-variant text-[20px]">location_on</span>
                <input
                  id="destination"
                  type="text"
                  {...register("destination")}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#2F6B6B] focus:ring-0 pl-md py-base font-data-value text-[16px] text-on-surface transition-colors placeholder:text-surface-dim"
                  placeholder={t("quoteRequest.destinationPlaceholder")}
                />
              </div>
              {errors.destination && <span className="text-error text-[12px]">{errors.destination.message}</span>}
            </div>

            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-outline z-10">
              <span className="material-symbols-outlined text-outline/50 text-[20px]">arrow_right_alt</span>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-md">
          <legend className="font-data-label text-[14px] text-primary-container mb-md border-b border-outline-variant/20 pb-base w-full uppercase tracking-wider">
            {t("quoteRequest.scheduleCapacity")}
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="relative">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="date">
                {t("quoteRequest.departureDate")}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-0 text-on-surface-variant text-[20px]">calendar_month</span>
                <input
                  id="date"
                  type="date"
                  {...register("date")}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#2F6B6B] focus:ring-0 pl-md py-base font-data-value text-[16px] text-on-surface transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="time">
                {t("quoteRequest.preferredTime")}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-0 text-on-surface-variant text-[20px]">schedule</span>
                <input
                  id="time"
                  type="time"
                  {...register("time")}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#2F6B6B] focus:ring-0 pl-md py-base font-data-value text-[16px] text-on-surface transition-colors"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="passengers">
                {t("quoteRequest.totalTravelers")}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-0 text-on-surface-variant text-[20px]">group</span>
                <select
                  id="passengers"
                  {...register("passengers", { valueAsNumber: true })}
                  className="w-full bg-transparent border-0 border-b-2 border-outline-variant focus:border-[#2F6B6B] focus:ring-0 pl-md py-base font-data-value text-[16px] text-on-surface transition-colors"
                >
                  {passengerOptions.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-md">
          <legend className="font-data-label text-[14px] text-primary-container mb-md border-b border-outline-variant/20 pb-base w-full uppercase tracking-wider">
            {t("quoteRequest.contactInfo")}
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="relative">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="customerName">
                {t("quoteRequest.fullName")}
              </label>
              <input
                id="customerName"
                type="text"
                {...register("customerName")}
                className="w-full bg-surface border border-outline-variant focus:border-[#2F6B6B] focus:ring-1 focus:ring-[#2F6B6B] rounded p-sm font-data-value text-[16px] text-on-surface transition-colors"
                placeholder="Jane Doe"
              />
              {errors.customerName && <span className="text-error text-[12px]">{errors.customerName.message}</span>}
            </div>

            <div className="relative">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="email">
                {t("quoteRequest.email")}
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full bg-surface border border-outline-variant focus:border-[#2F6B6B] focus:ring-1 focus:ring-[#2F6B6B] rounded p-sm font-data-value text-[16px] text-on-surface transition-colors"
                placeholder="jane@example.com"
              />
              {errors.email && <span className="text-error text-[12px]">{errors.email.message}</span>}
            </div>

            <div className="relative">
              <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="phone">
                {t("quoteRequest.phone")}
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className="w-full bg-surface border border-outline-variant focus:border-[#2F6B6B] focus:ring-1 focus:ring-[#2F6B6B] rounded p-sm font-data-value text-[16px] text-on-surface transition-colors"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-md">
          <legend className="font-data-label text-[14px] text-primary-container mb-md border-b border-outline-variant/20 pb-base w-full uppercase tracking-wider">
            {t("quoteRequest.specifications")}
          </legend>

          <div className="relative">
            <label className="block font-data-label text-[14px] text-on-surface-variant mb-xs" htmlFor="notes">
              {t("quoteRequest.notes")}
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              rows={4}
              className="w-full bg-surface border border-outline-variant focus:border-[#2F6B6B] focus:ring-1 focus:ring-[#2F6B6B] rounded p-sm font-data-value text-[16px] text-on-surface transition-colors resize-y"
              placeholder={t("quoteRequest.notesPlaceholder")}
            />
          </div>
        </fieldset>

        <div className="pt-md mt-lg border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-md">
          <p className="font-body text-[14px] text-on-surface-variant max-w-sm">
            {t("quoteRequest.noCommitment")}
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-[#2F6B6B] text-white font-data-label text-[14px] py-sm px-lg rounded hover:bg-[#1f4a4a] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2F6B6B] flex items-center justify-center gap-sm"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? t("quoteRequest.submitting") : t("quoteRequest.requestQuote")}
          </button>
        </div>
      </form>
    </div>
  );
}