"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Link } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

interface Booking {
  id: number;
  route_id: number;
  customer_name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  passengers: number;
  flight_number?: string;
  amount_due: number;
  payment_type: string;
  deposit_percentage: number;
  payment_status: string;
  stripe_session_id?: string;
  status: string;
  created_at: string;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;
  const id = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/bookings/${id}`
        );
        if (!response.ok) {
          throw new Error("Booking not found");
        }
        const data = await response.json();
        setBooking(data);

        if (data.payment_status === "pending" && data.stripe_session_id) {
          setRedirecting(true);
          const sessionResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/payments/session?booking_id=${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
              },
            }
          );
          if (sessionResponse.ok) {
            const sessionData = await sessionResponse.json();
            if (sessionData.url) {
              window.location.href = sessionData.url;
              return;
            }
          }
          router.push(`/${locale}/booking/${id}/confirmation`);
        } else if (data.payment_status === "paid") {
          router.push(`/${locale}/booking/${id}/confirmation`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, locale, router]);

  if (loading) {
    return (
      <>
        <Header locale={locale} />
        <div className="grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-md">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="font-data-label text-[14px] text-on-surface-variant">Loading booking details...</p>
          </div>
        </div>
        <Footer />
        <MobileNav />
      </>
    );
  }

  if (error || !booking) {
    return (
      <>
        <Header locale={locale} />
        <main className="grow flex flex-col items-center justify-center gap-lg text-center py-xl">
          <div className="w-20 h-20 bg-error-container rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-error text-[40px]">error</span>
          </div>
          <h1 className="font-display text-[48px] text-primary">Booking Not Found</h1>
          <p className="font-body text-[18px] text-on-surface-variant max-w-md">
            We couldn&apos;t find the booking you&apos;re looking for. It may have been cancelled or the link is incorrect.
          </p>
          <Link
            href={`/${locale}/routes`}
            className="bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded transition-opacity hover:opacity-90 font-bold"
          >
            Browse Routes
          </Link>
        </main>
        <Footer />
        <MobileNav />
      </>
    );
  }

  if (redirecting) {
    return (
      <>
        <Header locale={locale} />
        <div className="grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-md">
            <Loader2 className="w-8 h-8 animate-spin text-[--color-sunset]" />
            <p className="font-data-label text-[14px] text-on-surface-variant">Redirecting to payment...</p>
          </div>
        </div>
        <Footer />
        <MobileNav />
      </>
    );
  }

  return (
    <>
      <Header locale={locale} />
      <main className="grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-sm mb-md">
            <Link href={`/${locale}/routes`} className="text-on-surface-variant hover:text-primary transition-colors">
              Routes
            </Link>
            <span className="text-on-surface-variant">/</span>
            <span className="text-primary">Booking #{id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
            {/* Booking Details */}
            <div className="bg-surface-container-lowest card-border rounded-lg p-lg">
              <h1 className="font-display text-[48px] text-primary mb-lg">Booking Details</h1>

              <div className="space-y-md">
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Booking ID</span>
                  <span className="font-data-value text-[16px] text-primary font-semibold">#{booking.id}</span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Customer</span>
                  <span className="font-data-value text-[16px] text-primary">{booking.customer_name}</span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Email</span>
                  <span className="font-data-value text-[16px] text-primary">{booking.email}</span>
                </div>
                {booking.phone && (
                  <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                    <span className="font-data-label text-[14px] text-[--color-stone]">Phone</span>
                    <span className="font-data-value text-[16px] text-primary">{booking.phone}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Date</span>
                  <span className="font-data-value text-[16px] text-primary">{booking.date}</span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Time</span>
                  <span className="font-data-value text-[16px] text-primary">{booking.time}</span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Passengers</span>
                  <span className="font-data-value text-[16px] text-primary">{booking.passengers}</span>
                </div>
                {booking.flight_number && (
                  <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                    <span className="font-data-label text-[14px] text-[--color-stone]">Flight</span>
                    <span className="font-data-value text-[16px] text-primary">{booking.flight_number}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-surface-container-lowest card-border rounded-lg p-lg">
              <h2 className="font-headline text-[32px] text-primary mb-lg">Payment Summary</h2>

              <div className="space-y-md mb-lg">
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Total Amount</span>
                  <span className="font-display text-[32px] text-primary font-bold">${booking.amount_due.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Payment Type</span>
                  <span className="font-data-value text-[16px] text-primary">
                    {booking.payment_type === "full" ? "Full Payment" : `${booking.deposit_percentage}% Deposit`}
                  </span>
                </div>
                <div className="flex justify-between items-center py-sm border-b border-outline-variant/30">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Status</span>
                  <span className={`px-sm py-xs rounded font-data-label text-[12px] ${
                    booking.payment_status === "paid"
                      ? "bg-[--color-tide]/10 text-[--color-tide]"
                      : booking.payment_status === "pending"
                      ? "bg-[--color-sunset]/10 text-[--color-sunset]"
                      : "bg-error-container text-error"
                  }`}>
                    {booking.payment_status.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-sm">
                  <span className="font-data-label text-[14px] text-[--color-stone]">Booking Status</span>
                  <span className={`px-sm py-xs rounded font-data-label text-[12px] ${
                    booking.status === "confirmed"
                      ? "bg-primary-container text-primary"
                      : booking.status === "pending"
                      ? "bg-secondary-container text-secondary"
                      : "bg-error-container text-error"
                  }`}>
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {booking.payment_status === "pending" && (
                <button
                  onClick={async () => {
                    setRedirecting(true);
                    try {
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/v1/payments/session?booking_id=${booking.id}`,
                        {
                          headers: {
                            Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
                          },
                        }
                      );
                      if (response.ok) {
                        const data = await response.json();
                        if (data.url) {
                          window.location.href = data.url;
                          return;
                        }
                      }
                    } catch {
                      // Fallback
                    }
                    router.push(`/${locale}/booking/${id}/confirmation`);
                  }}
                  className="w-full bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded transition-opacity hover:opacity-90 active:scale-[0.98] font-bold"
                >
                  Complete Payment
                </button>
              )}

              <div className="mt-lg pt-md border-t border-outline-variant/30">
                <p className="font-data-value text-[14px] text-on-surface-variant text-center">
                  Need help? Contact our support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}