"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

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
  const [passengers, setPassengers] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      passengers: 1,
      flightNumber: "",
      paymentType: "full",
    },
  });

  const totalPrice = price;
  const depositAmount = Math.round(totalPrice * 0.3);

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ routeSlug, ...data }),
        }
      );
      if (!response.ok) throw new Error("Failed to create booking");
      const booking = await response.json();
      router.push(`/${locale}/booking/${booking.id}/confirmation`);
    } catch {
      alert("Failed to create booking. Please try again.");
    }
  };

  const passengerOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-lg">
      {/* Logistics Inputs */}
      <div className="flex flex-col gap-md">
        <div className="flex flex-col gap-1">
          <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="date">
            Date of Travel
          </label>
          <input
            id="date"
            type="date"
            {...register("date")}
            className={`form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0`}
          />
          {errors.date && (
            <span className="text-error text-[12px]">{errors.date.message}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-md">
          <div className="flex flex-col gap-1">
            <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="time">
              Pickup Time
            </label>
            <input
              id="time"
              type="time"
              {...register("time")}
              className={`form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0`}
            />
            {errors.time && (
              <span className="text-error text-[12px]">{errors.time.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="passengers">
              Passengers
            </label>
            <select
              id="passengers"
              {...register("passengers", { valueAsNumber: true })}
              onChange={(e) => setPassengers(Number(e.target.value))}
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

        {/* Pickup/Dropoff Visual */}
        <div className="relative py-2 px-1">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[--color-tide]/30 z-0"></div>
          <div className="flex flex-col gap-md relative z-10">
            <div className="flex items-center gap-sm">
              <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-surface-container-lowest"></div>
              <div className="grow flex flex-col gap-1">
                <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="pickup">
                  Pickup Location
                </label>
                <input
                  id="pickup"
                  type="text"
                  {...register("flightNumber")}
                  className="form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0"
                  placeholder="Airport or hotel name"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Inputs */}
      <div className="flex flex-col gap-md border-t border-outline-variant/30 pt-md">
        <h3 className="font-headline text-[24px] text-primary mb-2">Lead Traveler</h3>

        <div className="flex flex-col gap-1">
          <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="customerName">
            Full Name
          </label>
          <input
            id="customerName"
            type="text"
            {...register("customerName")}
            className={`form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0`}
            placeholder="e.g., Jane Doe"
          />
          {errors.customerName && (
            <span className="text-error text-[12px]">{errors.customerName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`form-input w-full font-data-value text-[16px] text-primary p-2 focus:ring-0`}
            placeholder="For booking confirmation"
          />
          {errors.email && (
            <span className="text-error text-[12px]">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-data-label text-[14px] text-[--color-stone]" htmlFor="phone">
            Phone Number
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

      {/* Price Breakdown & CTA */}
      <div className="bg-surface-container-low p-md rounded mt-sm">
        <div className="flex justify-between items-center mb-sm font-data-value text-[14px] text-on-surface-variant">
          <span>Vehicle Price</span>
          <span className="font-data-value text-[16px] text-primary">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mb-md font-data-value text-[14px] text-on-surface-variant">
          <span>Taxes & Fees</span>
          <span className="font-data-value text-[16px] text-primary">Included</span>
        </div>

        <div className="flex justify-between items-end border-t border-outline-variant/30 pt-md mb-md">
          <div className="flex flex-col">
            <span className="font-headline text-[24px] text-primary">Total</span>
            <span className="font-data-label text-[12px] text-on-surface-variant">per vehicle</span>
          </div>
          <span className="font-display text-[48px] text-primary font-bold">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        {/* Payment Option */}
        <div className="flex flex-col gap-sm mb-md">
          <label className="font-data-label text-[14px] text-[--color-stone] mb-xs block">
            Payment Option
          </label>
          <label className="flex items-center gap-sm cursor-pointer p-sm rounded border border-outline/20 hover:border-primary/50 transition-colors">
            <input
              type="radio"
              {...register("paymentType")}
              value="full"
              className="w-4 h-4 text-primary"
            />
            <span className="font-data-value text-[16px]">
              Pay Full Amount (${totalPrice.toFixed(2)})
            </span>
          </label>
          <label className="flex items-center gap-sm cursor-pointer p-sm rounded border border-outline/20 hover:border-primary/50 transition-colors">
            <input
              type="radio"
              {...register("paymentType")}
              value="deposit"
              className="w-4 h-4 text-primary"
            />
            <span className="font-data-value text-[16px]">
              Pay 30% Deposit (${depositAmount.toFixed(2)})
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded transition-opacity hover:opacity-90 active:scale-[0.98] font-bold flex items-center justify-center gap-sm"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? "Processing..." : "Continue to Payment"}
        </button>

        <p className="text-center font-data-value text-[14px] text-on-surface-variant mt-sm">
          Free cancellation up to 48h before transfer.
        </p>
      </div>
    </form>
  );
}