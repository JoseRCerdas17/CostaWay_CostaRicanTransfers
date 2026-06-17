import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import RouteDetail from "@/components/routes/RouteDetail";
import { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

const routeMeta: Record<string, { origin: string; destination: string; price: number }> = {
  "sjo-airport-la-fortuna": { origin: "SJO Airport", destination: "La Fortuna", price: 180 },
  "liberia-tamarindo": { origin: "LIR Airport", destination: "Tamarindo", price: 45 },
  "san-jose-manuel-antonio": { origin: "San Jose City", destination: "Manuel Antonio", price: 160 },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const route = routeMeta[slug];

  if (!route) return { title: "Route Not Found" };

  return {
    title: `${route.origin} to ${route.destination} Transfer | Costa Rica Transfers`,
    description: `Book a transfer from ${route.origin} to ${route.destination}. From $${route.price} per person.`,
    alternates: { canonical: `/${locale}/routes/${slug}`, languages: { en: `/en/routes/${slug}`, es: `/es/routes/${slug}` } },
  };
}

export default async function RouteDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const route = routeMeta[slug];

  const jsonLd = route ? { "@context": "https://schema.org", "@type": "Product", name: `${route.origin} to ${route.destination} Transfer`, offers: { "@type": "Offer", price: route.price, priceCurrency: "USD" } } : null;

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <Header locale={locale} />
      <main className="grow flex flex-col gap-xl py-xl">
        <div className="px-gutter max-w-container-max mx-auto w-full">
          <RouteDetail slug={slug} locale={locale} />
        </div>
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}