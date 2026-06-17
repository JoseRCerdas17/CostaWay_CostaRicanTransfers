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

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50];

  if (isSubmitSuccessful) return (
    <div className="bg-surface-container-lowest card-border rounded-lg p-xl text-center max-w-xl">
      <div className="w-20 h-20 bg-[--color-tide]/10 rounded-full flex items-center justify-center mx-auto mb-md">
        <span className="material-symbols-outlined text-[--color-tide] text-[40px]">check</span>
      </div>
      <h2 className="font-display text-[48px] text-primary mb-sm">{t("quoteRequest.successTitle")}</h2>
      <p className="font-body text-[18px] text-on-surface-variant mb-xl max-w-md mx-auto">{t("quoteRequest.successMessage")}</p>
      <button onClick={() => router.push(`/${locale}`)} className="bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded transition-opacity hover:opacity-90 active:scale-[0.98] font-bold px-xl">
        {t("quoteRequest.backHome")}
      </button>
    </div>
  );

  return (
    <div className="max-w-2xl">
      <div className="bg-surface-container-lowest card-border rounded-lg p-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
          <div className="relative py-2 px-1">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[--color-tide]/30 z-0"></div>
            <div className="flex flex-col gap-md relative z-10">
              <div className="flex items-center gap-sm">
                <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
                <div className="grow flex flex-col gap-1">
                  <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="origin">
                    {t("quoteRequest.origin")}
                  </label>
                  <input
                    id="origin"
                    type="text"
                    {...register("origin")}
                    className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
                    placeholder={t("hero.fromPlaceholder")}
                  />
                  {errors.origin && <span className="text-error text-[12px]">{errors.origin.message}</span>}
                </div>
              </div>
              <div className="flex items-center gap-sm">
                <div className="w-2 h-2 rounded-full bg-[--color-sunset] ring-4 ring-surface-container-lowest"></div>
                <div className="grow flex flex-col gap-1">
                  <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="destination">
                    {t("quoteRequest.destination")}
                  </label>
                  <input
                    id="destination"
                    type="text"
                    {...register("destination")}
                    className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
                    placeholder={t("hero.toPlaceholder")}
                  />
                  {errors.destination && <span className="text-error text-[12px]">{errors.destination.message}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-1">
              <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="date">
                {t("quoteRequest.date")}
              </label>
              <input
                id="date"
                type="date"
                {...register("date")}
                className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="passengers">
                {t("quoteRequest.passengers")}
              </label>
              <select
                id="passengers"
                {...register("passengers", { valueAsNumber: true })}
                className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
              >
                {passengerOptions.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Passenger" : "Passengers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-outline-variant/30 pt-md">
            <h3 className="font-headline text-[24px] text-primary mb-md">{t("quoteRequest.contactInfo") || "Contact Information"}</h3>
            <div className="flex flex-col gap-lg">
              <div className="flex flex-col gap-1">
                <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="customerName">
                  {t("quoteRequest.fullName")}
                </label>
                <input
                  id="customerName"
                  type="text"
                  {...register("customerName")}
                  className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
                  placeholder="Jane Doe"
                />
                {errors.customerName && <span className="text-error text-[12px]">{errors.customerName.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="email">
                  {t("quoteRequest.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
                  placeholder="jane@example.com"
                />
                {errors.email && <span className="text-error text-[12px]">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="phone">
                  {t("quoteRequest.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
                  placeholder="+1 234 567 8900"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="notes">
              {t("quoteRequest.notes")}
            </label>
            <textarea
              id="notes"
              {...register("notes")}
              rows={4}
              className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0 resize-none"
              placeholder={t("quoteRequest.notesPlaceholder")}
            />
          </div>

          <div className="bg-surface-container-low p-md rounded mt-sm">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded transition-opacity hover:opacity-90 active:scale-[0.98] font-bold flex items-center justify-center gap-sm"
            >
              {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
              {isSubmitting ? t("quoteRequest.submitting") : t("quoteRequest.submit")}
            </button>
            <p className="text-center font-data-value text-[14px] text-on-surface-variant mt-sm">
              We&apos;ll respond within 24 hours with a personalized quote.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}