"use client";

import { Search, CalendarCheck, Wallet, PartyPopper } from "lucide-react";
import { useT } from "@/i18n/LocaleProvider";

const ICONS = [Search, CalendarCheck, Wallet, PartyPopper];

export function HowItWorks() {
  const { t } = useT();
  const steps = [1, 2, 3, 4].map((n, i) => ({
    icon: ICONS[i],
    title: t(`how.s${n}Title`),
    text: t(`how.s${n}Text`),
  }));

  return (
    <section id="how" className="border-t border-sand bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{t("how.title")}</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">{t("how.subtitle")}</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative rounded-3xl border border-sand bg-surface p-6 shadow-soft"
            >
              <span className="absolute right-5 top-5 font-display text-3xl font-bold text-sand-dark">
                {i + 1}
              </span>
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{ backgroundImage: "linear-gradient(135deg, #C0492B, #9F3D24)" }}
              >
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
