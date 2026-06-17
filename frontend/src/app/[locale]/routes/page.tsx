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
      <main className="grow flex flex-col">
        <section className="border-b border-stone-20 bg-surface">
          <div className="max-w-container-max mx-auto px-gutter py-md">
            <h1 className="font-headline text-[32px] text-primary mb-md">
              {t("routes.exploreRoutes")}
            </h1>
            <div className="flex flex-col md:flex-row gap-sm items-center">
              <div className="w-full md:w-1/3 relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[--color-stone] text-[20px]">location_on</span>
                <input
                  className="w-full bg-surface-container-lowest border-b-2 border-stone-20 border-x-0 border-t-0 pl-10 pr-sm py-sm focus:border-tide focus:ring-0 font-data-value text-[16px] text-on-surface placeholder:text-stone"
                  placeholder={t("routes.fromPlaceholder")}
                  type="text"
                />
              </div>
              <span className="material-symbols-outlined hidden md:block text-[--color-stone] rotate-90 md:rotate-0 text-[20px]">arrow_forward</span>
              <div className="w-full md:w-1/3 relative">
                <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-[--color-stone] text-[20px]">flag</span>
                <input
                  className="w-full bg-surface-container-lowest border-b-2 border-stone-20 border-x-0 border-t-0 pl-10 pr-sm py-sm focus:border-tide focus:ring-0 font-data-value text-[16px] text-on-surface placeholder:text-stone"
                  placeholder={t("routes.toPlaceholder")}
                  type="text"
                />
              </div>
              <button className="w-full md:w-auto bg-primary-container text-on-primary px-lg py-sm font-data-label text-[14px] hover:bg-primary transition-colors ml-auto">
                {t("routes.searchRoutes")}
              </button>
            </div>

            <div className="flex gap-sm mt-md overflow-x-auto pb-2 scrollbar-hide">
              <button className="whitespace-nowrap px-sm py-xs border border-primary-container text-primary-container rounded-full font-data-label text-[14px] bg-surface-container-low">
                {t("routes.allRegions")}
              </button>
              <button className="whitespace-nowrap px-sm py-xs border border-stone-20 text-[--color-stone] hover:border-primary-container rounded-full font-data-label text-[14px]">
                {t("routes.guanacaste")}
              </button>
              <button className="whitespace-nowrap px-sm py-xs border border-stone-20 text-[--color-stone] hover:border-primary-container rounded-full font-data-label text-[14px]">
                {t("routes.arenalMonteverde")}
              </button>
              <button className="whitespace-nowrap px-sm py-xs border border-stone-20 text-[--color-stone] hover:border-primary-container rounded-full font-data-label text-[14px]">
                {t("routes.caribbeanCoast")}
              </button>
              <button className="whitespace-nowrap px-sm py-xs border border-stone-20 text-[--color-stone] hover:border-primary-container rounded-full font-data-label text-[14px]">
                {t("routes.centralPacific")}
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-container-max mx-auto px-gutter py-xl w-full">
          <RouteCatalog />
        </section>
      </main>
      <Footer />
      <MobileNav />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}