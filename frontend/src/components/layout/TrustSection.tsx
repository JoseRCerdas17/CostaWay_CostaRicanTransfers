"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function TrustSection() {
  const t = useTranslations();

  return (
    <section className="bg-surface-container-low py-xl border-y border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-lg items-center">
        <div className="flex flex-col gap-md">
          <h2 className="font-headline-md text-[32px] leading-[1.2] font-semibold text-primary">
            {t("trust.title")}
          </h2>
          <p className="font-body-lg text-[18px] leading-[1.6] text-on-surface-variant">
            {t("trust.subtitle")}
          </p>
          <div className="flex flex-col gap-sm mt-sm">
            <div className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-primary mt-xs">explore</span>
              <div>
                <h3 className="font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-primary mb-xs">
                  {t("trust.localExpertise.title")}
                </h3>
                <p className="font-body-sm text-[14px] leading-[1.5] text-on-surface-variant">
                  {t("trust.localExpertise.description")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm">
              <span className="material-symbols-outlined text-primary mt-xs">shield</span>
              <div>
                <h3 className="font-data-label text-[14px] leading-[1.4] tracking-[0.05em] font-medium text-primary mb-xs">
                  {t("trust.safetyProtocol.title")}
                </h3>
                <p className="font-body-sm text-[14px] leading-[1.5] text-on-surface-variant">
                  {t("trust.safetyProtocol.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-64 md:h-full min-h-[300px] bg-surface-container-highest border border-outline/20 rounded-lg overflow-hidden relative">
          <Image
            alt="Professional logistics driver"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDDxvHXpw1zKs1eXjKVSSVJdhO0b21zdWnBJS2-kqCNL3HZVrbGklctiZM83f3LeAnEG9gNZzBAM4k8b33_5W90vD3MG585DLX_BD647grcOqZj0QqQgIsCVEEb6D86HmZBxdy1m1LzmPx7koxtzFGP_xGNlMlajX6wHszOu7CEWbv3GKPX3NRASdbNeleTELP7rOfNFzXTSPJt4udaQGaoU6DawLRKZZlXNeBw1fxZca4y4T3QqZPE5WkaHkylCvfGWPiqXyG6a8"
            fill
            className="object-cover desaturate-50 mix-blend-multiply opacity-90"
          />
        </div>
      </div>
    </section>
  );
}