"use client";

import { useState } from "react";
import { X, Phone, ShieldCheck } from "lucide-react";
import { useT } from "@/i18n/LocaleProvider";
import { useAuth } from "./AuthProvider";

export function LoginModal({ onClose }: { onClose: () => void }) {
  const { t } = useT();
  const { register } = useAuth();
  const [phone, setPhone] = useState("+998 ");

  const digits = phone.replace(/\D/g, "");
  const valid = digits.length >= 9;

  const submit = () => {
    if (!valid) return;
    register(phone.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/45 animate-overlay-in" onClick={onClose} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div className="pointer-events-auto w-full rounded-t-3xl bg-surface p-6 shadow-lift animate-sheet-in sm:max-w-sm sm:rounded-3xl">
          <div className="flex items-start justify-between">
            <h3 className="font-display text-xl font-bold leading-tight">{t("auth.title")}</h3>
            <button
              onClick={onClose}
              aria-label={t("auth.close")}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream text-muted transition hover:bg-sand"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <label htmlFor="davra-phone" className="mt-5 block text-sm font-medium text-ink/80">
            {t("auth.phoneLabel")}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-2xl border border-sand bg-cream px-4 py-3 focus-within:border-clay focus-within:ring-1 focus-within:ring-clay">
            <Phone className="h-4 w-4 shrink-0 text-clay" />
            <input
              id="davra-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              inputMode="tel"
              type="tel"
              placeholder="+998 90 123-45-67"
              autoFocus
              className="w-full bg-transparent text-base outline-none placeholder:text-muted"
            />
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-leaf" />
            {t("auth.hint")}
          </p>

          <button
            onClick={submit}
            disabled={!valid}
            className="mt-5 w-full rounded-full bg-clay py-3.5 font-semibold text-white transition hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t("auth.submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
