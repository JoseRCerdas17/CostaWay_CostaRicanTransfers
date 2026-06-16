"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  passengers: z.number().int().min(1).max(15),
  flightNumber: z.string().optional(),
  paymentType: z.enum(["full", "deposit"]),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  routeSlug: string;
  price: number;
  locale: string;
}

export default function BookingForm({ routeSlug, price, locale }: BookingFormProps) {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { customerName: "", email: "", phone: "", date: "", time: "", passengers: 1, flightNumber: "", paymentType: "full" },
  });

  const passengers = watch("passengers", 1);
  const paymentType = watch("paymentType", "full");
  const totalPrice = price * passengers;
  const depositAmount = Math.round(totalPrice * 0.3);

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routeSlug, ...data }),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      const booking = await response.json();
      router.push(`/${locale}/booking/${booking.id}/confirmation`);
    } catch { alert("Failed to create booking. Please try again."); }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-md">
      <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Full Name *</label><input type="text" {...register("customerName")} className={`w-full bg-surface-container-low border ${errors.customerName ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="John Doe" />{errors.customerName && <span className="text-error text-[12px]">{errors.customerName.message}</span>}</div>
      <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Email *</label><input type="email" {...register("email")} className={`w-full bg-surface-container-low border ${errors.email ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} placeholder="john@example.com" />{errors.email && <span className="text-error text-[12px]">{errors.email.message}</span>}</div>
      <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Phone</label><input type="tel" {...register("phone")} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px]" placeholder="+1 234 567 8900" /></div>
      <div className="grid grid-cols-2 gap-sm">
        <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Date *</label><input type="date" {...register("date")} className={`w-full bg-surface-container-low border ${errors.date ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} />{errors.date && <span className="text-error text-[12px]">{errors.date.message}</span>}</div>
        <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Time *</label><input type="time" {...register("time")} className={`w-full bg-surface-container-low border ${errors.time ? "border-error" : "border-outline"} rounded p-sm font-data-value text-[16px]`} />{errors.time && <span className="text-error text-[12px]">{errors.time.message}</span>}</div>
      </div>
      <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Passengers *</label><select {...register("passengers", { valueAsNumber: true })} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px]">{[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(n => <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>)}</select></div>
      <div><label className="font-data-label text-[14px] text-secondary mb-xs block">Flight Number (optional)</label><input type="text" {...register("flightNumber")} className="w-full bg-surface-container-low border border-outline rounded p-sm font-data-value text-[16px]" placeholder="AA 1234" /></div>
      <div className="border-t border-outline-variant pt-md"><div className="flex justify-between items-center mb-sm"><span className="font-data-label text-[14px] text-on-surface-variant">Total ({passengers} × ${price})</span><span className="font-data-value text-[16px] font-semibold text-primary">${totalPrice}</span></div></div>
      <div className="flex flex-col gap-sm">
        <label className="font-data-label text-[14px] text-secondary mb-xs block">Payment Option *</label>
        <label className="flex items-center gap-sm cursor-pointer"><input type="radio" {...register("paymentType")} value="full" className="w-4 h-4 text-primary" /><span className="font-data-value text-[16px]">Pay Full Amount (${totalPrice})</span></label>
        <label className="flex items-center gap-sm cursor-pointer"><input type="radio" {...register("paymentType")} value="deposit" className="w-4 h-4 text-primary" /><span className="font-data-value text-[16px]">Pay 30% Deposit (${depositAmount})</span></label>
      </div>
      <button type="submit" disabled={isSubmitting} className="cta-button font-data-label text-[14px] py-sm px-md rounded transition-colors w-full text-center disabled:opacity-50 flex items-center justify-center gap-sm">{isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}{isSubmitting ? "Processing..." : "Continue to Payment"}</button>
      <p className="font-body-sm text-[14px] text-on-surface-variant text-center">You will be redirected to Stripe to complete your payment</p>
    </form>
  );
}