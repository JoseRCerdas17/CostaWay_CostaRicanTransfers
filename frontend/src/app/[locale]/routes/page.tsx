import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import RouteCatalog from "@/components/routes/RouteCatalog";

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations();

  return (
    <>
      <Header locale={locale} />
      <main className="flex-grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full">
          <h1 className="font-headline-md text-[32px] leading-[1.2] font-semibold text-primary mb-md">
            {t("routes.catalogTitle")}
          </h1>
          <p className="font-body-lg text-[18px] leading-[1.6] text-on-surface-variant mb-xl">
            {t("routes.catalogSubtitle")}
          </p>
          <RouteCatalog />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}