import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import HeroSection from "@/components/layout/HeroSection";
import PopularRoutes from "@/components/routes/PopularRoutes";
import TrustSection from "@/components/layout/TrustSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow flex flex-col gap-xl">
        <HeroSection locale={locale} />
        <PopularRoutes />
        <TrustSection />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}