import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Link } from "@/i18n";
import { getTranslations } from "next-intl/server";

export default async function ConfirmationPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const t = await getTranslations("confirmation");

  return (
    <>
      <Header locale={locale} />
      <main className="grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
            {/* Left: Success Content */}
            <div className="flex flex-col gap-lg">
              <div className="w-24 h-24 bg-[--color-tide]/10 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[--color-tide] text-[48px]">check_circle</span>
              </div>

              <div>
                <h1 className="font-display text-[48px] text-primary mb-md leading-[1.1]">
                  Booking Confirmed!
                </h1>
                <p className="font-body text-[18px] text-on-surface-variant leading-[1.6] max-w-md">
                  Your transfer has been booked successfully. We&apos;ve sent a confirmation email with all the details.
                </p>
              </div>

              {/* Next Steps */}
              <div className="bg-surface-container-low p-md rounded card-border">
                <h3 className="font-headline text-[24px] text-primary mb-md">What&apos;s Next?</h3>
                <ul className="flex flex-col gap-3 font-data-value text-[14px] text-on-surface">
                  <li className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-[--color-tide] text-[18px] mt-1">check_circle</span>
                    Check your email for the confirmation details
                  </li>
                  <li className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-[--color-tide] text-[18px] mt-1">check_circle</span>
                    We&apos;ll contact you to confirm pickup details
                  </li>
                  <li className="flex items-start gap-sm">
                    <span className="material-symbols-outlined text-[--color-tide] text-[18px] mt-1">check_circle</span>
                    Your driver will meet you at the specified location
                  </li>
                </ul>
              </div>

              <div className="flex gap-md flex-wrap">
                <Link
                  href={`/${locale}/routes`}
                  className="bg-[--color-sunset] text-white font-headline text-[24px] py-4 px-md rounded transition-opacity hover:opacity-90 active:scale-[0.98] font-bold"
                >
                  Book Another Transfer
                </Link>
                <Link
                  href={`/${locale}`}
                  className="bg-surface-container-low text-primary font-headline text-[24px] py-4 px-md rounded border border-outline/20 hover:bg-surface-container-high transition-colors font-bold"
                >
                  Return Home
                </Link>
              </div>
            </div>

            {/* Right: Booking Reference Card */}
            <div className="bg-surface-container-lowest card-border rounded-lg p-lg">
              <div className="text-center mb-lg">
                <p className="font-data-label text-[14px] text-[--color-stone] uppercase tracking-wider mb-sm">
                  Booking Reference
                </p>
                <p className="font-display text-[64px] text-primary font-bold">#{id}</p>
              </div>

              <div className="border-t border-outline-variant/30 pt-lg">
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-[--color-tide]">email</span>
                  <p className="font-data-value text-[14px] text-on-surface-variant">
                    Confirmation email sent to your inbox
                  </p>
                </div>
                <div className="flex items-center gap-sm mb-md">
                  <span className="material-symbols-outlined text-[--color-tide]">schedule</span>
                  <p className="font-data-value text-[14px] text-on-surface-variant">
                    Free cancellation up to 48h before transfer
                  </p>
                </div>
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-[--color-tide]">support_agent</span>
                  <p className="font-data-value text-[14px] text-on-surface-variant">
                    Need help? Contact our support team
                  </p>
                </div>
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