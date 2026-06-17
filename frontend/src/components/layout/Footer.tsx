import { useTranslations } from "next-intl";
import { Link } from "@/i18n";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full mt-xl bg-surface-container-high border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md px-gutter py-lg max-w-container-max mx-auto">
        <div>
          <h4 className="font-headline text-[24px] text-primary mb-sm">
            {t("common.siteName")}
          </h4>
          <p className="font-body text-[14px] text-on-surface-variant">
            © 2024 Elevated Logistics Costa Rica. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap gap-md md:justify-end items-center">
          <Link href="#" className="font-body text-[14px] text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all">
            {t("footer.safetyProtocol")}
          </Link>
          <Link href="#" className="font-body text-[14px] text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all">
            {t("footer.localExpertise")}
          </Link>
          <Link href="#" className="font-body text-[14px] text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all">
            {t("footer.termsOfService")}
          </Link>
          <Link href="#" className="font-body text-[14px] text-on-surface-variant hover:text-primary hover:underline decoration-primary transition-all">
            EN/ES
          </Link>
        </div>
      </div>
    </footer>
  );
}