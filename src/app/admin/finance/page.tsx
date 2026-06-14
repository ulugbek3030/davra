"use client";

import { Wallet, Crown, Megaphone, Coins } from "lucide-react";
import { REVENUE_SOURCES, PLATFORM, PAYOUTS, PLATFORM_BOOKINGS } from "@/lib/adminData";
import { useT } from "@/i18n/LocaleProvider";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  commission: Wallet,
  subscriptions: Crown,
  promotion: Megaphone,
  fintech: Coins,
};
const TONE_CLS: Record<string, string> = {
  clay: "bg-clay/10 text-clay",
  teal: "bg-teal/10 text-teal",
  saffron: "bg-saffron/20 text-[#9a6b12]",
  plum: "bg-plum/10 text-plum",
};

export default function FinancePage() {
  const { t, money, moneyShort } = useT();
  const total = PLATFORM.revenue30d;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("admin.finance.title")}</h1>
      <p className="mt-1 text-muted">{t("admin.finance.subtitle")}</p>

      {/* Total */}
      <div
        className="mt-6 overflow-hidden rounded-3xl p-6 text-white"
        style={{ backgroundImage: "linear-gradient(135deg,#0F4250,#17596B)" }}
      >
        <div className="text-sm text-white/70">{t("admin.finance.revenue30dLabel")}</div>
        <div className="mt-1 font-display text-4xl font-bold">{money(total)}</div>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/80">
          <span>{t("admin.finance.gmvLabel")}: {moneyShort(PLATFORM.gmv30d)}</span>
          <span>{t("admin.finance.takeRateLabel")}: {PLATFORM.takeRate}%</span>
        </div>
      </div>

      {/* Sources */}
      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {REVENUE_SOURCES.map((s) => {
          const Icon = ICONS[s.key];
          const share = Math.round((s.amount / total) * 100);
          return (
            <div key={s.key} className="rounded-3xl border border-sand bg-surface p-4">
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${TONE_CLS[s.tone]}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="mt-3 font-display text-xl font-bold leading-none">{moneyShort(s.amount)}</div>
              <div className="mt-1 text-sm font-medium">{t(`admin.revenueSource.${s.key}.label`)}</div>
              <div className="text-xs text-muted">{t(`admin.revenueSource.${s.key}.hint`)} · {share}%</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Payouts */}
        <div className="rounded-3xl border border-sand bg-surface p-5">
          <h2 className="font-display text-lg font-bold">{t("admin.finance.payouts.title")}</h2>
          <p className="text-sm text-muted">{t("admin.finance.payouts.subtitle")}</p>
          <div className="mt-3 divide-y divide-sand">
            {PAYOUTS.map((p) => {
              const paid = p.status === "Выплачено";
              return (
              <div key={p.venue + p.date} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-semibold">{p.venue}</div>
                  <div className="text-sm text-muted">{p.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold tabular-nums">{money(p.amount)}</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      paid ? "bg-leaf/15 text-leaf" : "bg-saffron/20 text-[#9a6b12]"
                    }`}
                  >
                    {t(paid ? "admin.finance.payoutStatus.paid" : "admin.finance.payoutStatus.processing")}
                  </span>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Commission transactions */}
        <div className="rounded-3xl border border-sand bg-surface p-5">
          <h2 className="font-display text-lg font-bold">{t("admin.finance.commissions.title")}</h2>
          <p className="text-sm text-muted">{t("admin.finance.commissions.subtitle")}</p>
          <div className="mt-3 divide-y divide-sand">
            {PLATFORM_BOOKINGS.map((b) => (
              <div key={b.id} className="flex items-center justify-between py-3">
                <div className="min-w-0">
                  <div className="truncate font-semibold">{b.venue}</div>
                  <div className="text-sm text-muted">{b.group} · {b.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold tabular-nums text-leaf">+{money(b.commission)}</div>
                  <div className="text-xs text-muted">{t("admin.finance.commissions.from", { gmv: moneyShort(b.gmv) })}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
