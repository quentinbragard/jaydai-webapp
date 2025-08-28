"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

type Locale = "en" | "fr";
type Dictionary = Record<string, unknown>;

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number> | string) => string;
};

const I18nContext = createContext<I18nContextType | null>(null);

const DICTS: Record<Locale, Dictionary> = { en, fr };

function getByPath(obj: Dictionary, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>((acc, part) => {
      if (acc && typeof acc === "object" && acc !== null) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
}

function interpolate(input: string, vars?: Record<string, string | number>) {
  if (!vars) return input;
  return input.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const pathname = typeof window !== "undefined" ? window.location.pathname : undefined;
  // usePathname in client to react to route changes
  const currentPath = usePathname?.() || pathname || "/en";

  useEffect(() => {
    // Load saved locale or detect from browser
    const saved = typeof window !== "undefined" ? (localStorage.getItem("locale") as Locale | null) : null;
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
      if (typeof document !== "undefined") document.documentElement.lang = saved;
      return;
    }
    if (typeof navigator !== "undefined") {
      const lang = navigator.language?.toLowerCase() || "en";
      const detected = lang.startsWith("fr") ? "fr" : "en";
      setLocaleState(detected);
      if (typeof document !== "undefined") document.documentElement.lang = detected;
    }
  }, []);

  // Derive locale from the path prefix when available
  useEffect(() => {
    if (!currentPath) return;
    const seg = currentPath.split("/")[1] as Locale | undefined;
    if (seg === "en" || seg === "fr") {
      setLocaleState(seg);
      if (typeof document !== "undefined") document.documentElement.lang = seg;
      if (typeof window !== "undefined") localStorage.setItem("locale", seg);
    }
  }, [currentPath]);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    if (typeof window !== "undefined") localStorage.setItem("locale", loc);
    if (typeof document !== "undefined") document.documentElement.lang = loc;
  };

  const dict = useMemo(() => DICTS[locale], [locale]);

  const t = useMemo(
    () => (key: string, vars?: Record<string, string | number> | string) => {
      const found = getByPath(dict, key);
      if (typeof found === "string") {
        return interpolate(found, typeof vars === 'object' && vars !== null ? (vars as Record<string, string | number>) : undefined);
      }
      if (typeof vars === 'string') return vars;
      // fallback to key when missing or non-string
      return key;
    },
    [dict]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
