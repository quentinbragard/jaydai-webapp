"use client";

import { useI18n } from "@/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const toggle = () => {
    const next = locale === "en" ? "fr" : "en";
    const parts = (pathname || "/").split("/");
    // Ensure at least 2 parts
    if (parts[1] === "en" || parts[1] === "fr") {
      parts[1] = next;
    } else {
      parts.splice(1, 0, next);
    }
    const newPath = parts.join("/") || `/${next}`;
    setLocale(next);
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${next}; Path=/; Max-Age=31536000`;
    }
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={toggle} aria-label="Toggle language">
        {locale === "en" ? "FR" : "EN"}
      </Button>
    </div>
  );
}
