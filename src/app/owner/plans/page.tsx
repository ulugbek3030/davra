"use client";

import { Check, Crown, Megaphone } from "lucide-react";
import { PLANS, BOOST_PACKAGES } from "@/lib/ownerData";
import { useT } from "@/i18n/LocaleProvider";
import { ownerDict } from "@/i18n/owner";
import type { Locale } from "@/i18n/messages";

// Boost-package id -> shared label/period keys in owner.plans.boost.
const BOOST_LABEL_KEY: Record<string, string> = {
  day: "owner.plans.boost.topLabel",
  week: "owner.plans.boost.topLabel",
  spotlight: "owner.plans.boost.spotlightLabel",
};
const BOOST_PERIOD_KEY: Record<string, string> = {
  day: "owner.plans.boost.dayPeriod",
  week: "owner.plans.boost.weekPeriod",
  spotlight: "owner.plans.boost.weekPeriod",
};

function planFeatures(locale: Locale, planId: string): string[] {
  const dict = ownerDict[locale] as {
    owner?: { plans?: { features?: Record<string, string[]> } };
  };
  return dict.owner?.plans?.features?.[planId] ?? [];
}

export default function PlansPage() {
  const { t, money, locale } = useT();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("owner.plans.title")}</h1>
      <p className="mt-1 text-muted">{t("owner.plans.subtitle")}</p>

      {/* Plans */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.id}
            className={`relative flex flex-col rounded-3xl border bg-surface p-6 ${
              p.highlight ? "border-clay shadow-lift ring-1 ring-clay" : "border-sand shadow-soft"
            }`}
          >
            {p.highlight && (
              <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-clay px-3 py-1 text-xs font-bold text-white">
                <Crown className="h-3.5 w-3.5" />
                {t("owner.plans.popular")}
              </span>
            )}
            <div className="font-display text-xl font-bold">{t(`enums.planTier.${p.id}`)}</div>
            <div className="text-sm text-muted">{t(`owner.plans.taglines.${p.id}`)}</div>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display text-3xl font-bold">
                {p.price === 0 ? t("owner.plans.free") : money(p.price)}
              </span>
              {p.price > 0 && <span className="pb-1 text-sm text-muted">{t("owner.plans.perMonth")}</span>}
            </div>

            <ul className="mt-5 flex-1 space-y-2.5">
              {planFeatures(locale, p.id).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              disabled={p.current}
              className={`mt-6 rounded-full py-3 text-sm font-semibold transition ${
                p.current
                  ? "cursor-default border border-sand bg-cream text-muted"
                  : p.highlight
                    ? "bg-clay text-white hover:bg-clay-dark"
                    : "border border-ink/15 text-ink hover:bg-cream"
              }`}
            >
              {p.current
                ? t("owner.plans.currentPlan")
                : t("owner.plans.switchTo", { name: t(`enums.planTier.${p.id}`) })}
            </button>
          </div>
        ))}
      </div>

      {/* Promotion */}
      <div className="mt-10">
        <h2 className="font-display text-xl font-bold">{t("owner.plans.boostTitle")}</h2>
        <p className="mt-1 text-muted">{t("owner.plans.boostSubtitle")}</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {BOOST_PACKAGES.map((b) => (
            <div key={b.id} className="rounded-3xl border border-sand bg-surface p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-saffron/20 text-[#9a6b12]">
                <Megaphone className="h-5 w-5" />
              </span>
              <div className="mt-3 font-semibold">{t(BOOST_LABEL_KEY[b.id] ?? b.label)}</div>
              <div className="text-sm text-muted">{t(BOOST_PERIOD_KEY[b.id] ?? b.period)}</div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-display text-lg font-bold">{money(b.price)}</span>
                <button className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-dark">
                  {t("owner.plans.boostLaunch")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
