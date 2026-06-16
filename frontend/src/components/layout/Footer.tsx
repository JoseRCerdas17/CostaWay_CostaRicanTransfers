import { useTranslations } from "next-intl";
import { Link } from "@/i18n";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className="w-full mt-xl bg-surface-container-high border-t border-outline-variant">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md px-gutter py-lg max-w-container-max mx-auto">
        <div className="flex flex-col gap-sm">
          <span className="font-headline-sm text-headline-sm text-primary">
            {t("common.siteName")}
          </span>
          <span className="font-body-sm text-body-sm text-secondary">
            {t("common.copyright")}
          </span>
        </div>
        <div className="flex flex-wrap md:justify-end gap-md items-center font-body-sm text-body-sm text-secondary">
          <Link href="#" className="hover:underline decoration-primary transition-all cursor-pointer hover:text-primary">
            {t("footer.safetyProtocol")}
          </Link>
          <Link href="#" className="hover:underline decoration-primary transition-all cursor-pointer hover:text-primary">
            {t("footer.localExpertise")}
          </Link>
          <Link href="#" className="hover:underline decoration-primary transition-all cursor-pointer hover:text-primary">
            {t("footer.termsOfService")}
          </Link>
        </div>
      </div>
    </footer>
  );
}