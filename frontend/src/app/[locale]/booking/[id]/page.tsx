import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";

export default async function BookingPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full">
          <h1 className="font-headline-md text-[32px] text-primary mb-md">Booking #{id}</h1>
          <p className="font-body-lg text-[18px] text-on-surface-variant">Loading booking details...</p>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}