import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import QuoteRequestForm from "@/components/quote/QuoteRequestForm";

export default async function QuoteRequestPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
      <Header locale={locale} />
      <main className="grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full">
          <h1 className="font-headline-md text-[32px] leading-[1.2] font-semibold text-primary mb-md">{t("quoteRequest.title")}</h1>
          <p className="font-body-lg text-[18px] leading-[1.6] text-on-surface-variant mb-xl max-w-2xl">{t("quoteRequest.subtitle")}</p>
          <QuoteRequestForm locale={locale} />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}