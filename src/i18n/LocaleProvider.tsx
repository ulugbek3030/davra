"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_LABELS,
  messages,
  type Locale,
} from "./messages";

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object") return (o as Record<string, unknown>)[k];
    return undefined;
  }, obj);
}

type TVars = Record<string, string | number>;

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: TVars) => string;
  money: (n: number) => string;
  moneyShort: (n: number) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);
const STORAGE_KEY = "davra-locale";

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (LOCALES as readonly string[]).includes(saved)) setLocaleState(saved);
    } catch {
      /* no-op */
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.cookie = `${STORAGE_KEY}=${l};path=/;max-age=31536000`;
      document.documentElement.lang = l === "ru" ? "ru" : "uz";
    } catch {
      /* no-op */
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: TVars) => {
      let s = getPath(messages[locale], key);
      if (typeof s !== "string") s = getPath(messages[DEFAULT_LOCALE], key);
      if (typeof s !== "string") return key;
      let out = s;
      if (vars) for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
      return out;
    },
    [locale]
  );

  const money = useCallback(
    (n: number) => new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " " + t("money.som"),
    [t]
  );

  const moneyShort = useCallback(
    (n: number) => {
      if (n >= 1_000_000_000) {
        const b = n / 1_000_000_000;
        return (Number.isInteger(b) ? b.toString() : b.toFixed(2).replace(".", ",")) + " " + t("money.b");
      }
      if (n >= 1_000_000) {
        const m = n / 1_000_000;
        return (Number.isInteger(m) ? m.toString() : m.toFixed(1).replace(".", ",")) + " " + t("money.m");
      }
      if (n >= 1000) return Math.round(n / 1000) + " " + t("money.k");
      return String(n);
    },
    [t]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, money, moneyShort }),
    [locale, setLocale, t, money, moneyShort]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useT(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useT must be used within LocaleProvider");
  return ctx;
}

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useT();
  return (
    <div
      className={`flex items-center rounded-full border border-sand bg-surface p-0.5 text-xs font-semibold ${className}`}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1 transition ${
            locale === l ? "bg-ink text-white" : "text-muted hover:text-ink"
          }`}
          aria-pressed={locale === l}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
