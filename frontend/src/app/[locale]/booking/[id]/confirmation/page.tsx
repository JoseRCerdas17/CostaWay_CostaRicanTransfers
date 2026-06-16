import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

export default async function ConfirmationPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full text-center">
          <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-md"><span className="material-symbols-outlined text-primary text-[40px]">check</span></div>
          <h1 className="font-headline-md text-[32px] text-primary mb-sm">Booking Confirmed!</h1>
          <p className="font-body-lg text-[18px] text-on-surface-variant mb-md max-w-xl mx-auto">Your transfer has been booked successfully. We've sent a confirmation email with all the details.</p>
          <div className="bg-surface-container-lowest border border-outline/20 rounded-lg p-md max-w-md mx-auto">
            <p className="font-data-label text-[14px] text-secondary mb-xs">Booking Reference</p>
            <p className="font-data-value text-[24px] font-bold text-primary">#{id}</p>
          </div>
          <p className="font-body-sm text-[14px] text-on-surface-variant mt-md">A confirmation email has been sent to your email address.</p>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}