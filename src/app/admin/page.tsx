"use client";

import Link from "next/link";
import { TrendingUp, Wallet, Store, CalendarCheck, ChevronRight, AlertCircle } from "lucide-react";
import {
  PLATFORM,
  REVENUE_SOURCES,
  REVENUE_TREND,
  ADMIN_VENUES,
} from "@/lib/adminData";
import { useT } from "@/i18n/LocaleProvider";

const TONE_HEX: Record<string, string> = {
  clay: "#BE4A2F",
  teal: "#17596B",
  saffron: "#E2A12B",
  plum: "#7A3B52",
};

export default function AdminDashboard() {
  const { t, money, moneyShort } = useT();
  const total = PLATFORM.revenue30d;
  const maxTrend = Math.max(...REVENUE_TREND.map((t) => t.v));
  const topVenues = ADMIN_VENUES.filter((v) => v.status === "active")
    .sort((a, b) => b.revenue30d - a.revenue30d)
    .slice(0, 5);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("admin.dashboard.title")}</h1>
      <p className="mt-1 text-muted">{t("admin.dashboard.subtitle")}</p>

      {PLATFORM.pending > 0 && (
        <Link
          href="/admin/venues"
          className="mt-5 flex items-center gap-3 rounded-2xl border border-saffron/50 bg-saffron-soft/40 px-4 py-3 transition hover:bg-saffron-soft/60"
        >
          <AlertCircle className="h-5 w-5 text-[#9a6b12]" />
          <span className="text-sm font-medium">
            {t("admin.dashboard.moderationBanner", { n: PLATFORM.pending })}
          </span>
          <ChevronRight className="ml-auto h-4 w-4 text-muted" />
        </Link>
      )}

      {/* KPI */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={TrendingUp} tone="teal" label={t("admin.dashboard.kpi.gmvLabel")} value={moneyShort(PLATFORM.gmv30d)} sub={t("admin.dashboard.kpi.gmvSub")} />
        <Kpi icon={Wallet} tone="clay" label={t("admin.dashboard.kpi.revenueLabel")} value={moneyShort(total)} sub={t("admin.dashboard.kpi.revenueSub", { rate: PLATFORM.takeRate })} />
        <Kpi icon={Store} tone="leaf" label={t("admin.dashboard.kpi.venuesLabel")} value={String(PLATFORM.activeVenues)} sub={t("admin.dashboard.kpi.venuesSub", { n: PLATFORM.pending })} />
        <Kpi icon={CalendarCheck} tone="saffron" label={t("admin.dashboard.kpi.bookingsLabel")} value={String(PLATFORM.bookings30d)} sub={t("admin.dashboard.kpi.bookingsSub")} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {/* Revenue by source */}
        <div className="rounded-3xl border border-sand bg-surface p-5">
          <h2 className="font-display text-lg font-bold">{t("admin.dashboard.sources.title")}</h2>
          <p className="text-sm text-muted">{t("admin.dashboard.sources.subtitle", { total: money(total) })}</p>
          <div className="mt-4 space-y-3.5">
            {REVENUE_SOURCES.map((s) => {
              const share = Math.round((s.amount / total) * 100);
              return (
                <div key={s.key}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium">{t(`admin.revenueSource.${s.key}.label`)}</span>
                    <span className="tabular-nums text-muted">
                      {moneyShort(s.amount)} · {share}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-cream">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${share}%`, backgroundColor: TONE_HEX[s.tone] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue trend */}
        <div className="rounded-3xl border border-sand bg-surface p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">{t("admin.dashboard.trend.title")}</h2>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-leaf">
              <TrendingUp className="h-4 w-4" />
              {t("admin.dashboard.trend.delta")}
            </span>
          </div>
          <p className="text-sm text-muted">{t("admin.dashboard.trend.subtitle")}</p>
          <div className="mt-5 flex h-40 items-stretch gap-2.5">
            {REVENUE_TREND.map((t, i) => (
              <div key={t.m} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="text-[11px] font-semibold tabular-nums text-muted">{t.v}</div>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg"
                    style={{
                      height: `${(t.v / maxTrend) * 100}%`,
                      backgroundImage:
                        i === REVENUE_TREND.length - 1
                          ? "linear-gradient(180deg,#BE4A2F,#9F3D24)"
                          : "linear-gradient(180deg,#17596B,#0F4250)",
                    }}
                  />
                </div>
                <div className="text-xs text-muted">{t.m}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top venues */}
      <div className="mt-5 rounded-3xl border border-sand bg-surface p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold">{t("admin.dashboard.top.title")}</h2>
          <Link href="/admin/venues" className="inline-flex items-center gap-0.5 text-sm font-semibold text-clay hover:underline">
            {t("admin.dashboard.top.all")} <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-3 divide-y divide-sand">
          {topVenues.map((v, i) => (
            <div key={v.id} className="flex items-center gap-3 py-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream text-sm font-bold text-muted">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-semibold">{v.name}</span>
                  <span className="rounded-full bg-teal/10 px-2 py-0.5 text-xs font-semibold text-teal">
                    {t(`enums.planTier.${v.plan}`)}
                  </span>
                </div>
                <div className="text-sm text-muted">{t(`enums.districts.${v.district}`)} · {t("admin.dashboard.top.bookings", { n: v.bookings30d })}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold tabular-nums">{moneyShort(v.revenue30d)}</div>
                <div className="text-xs text-muted">{t("admin.dashboard.top.ourRevenue")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TONES: Record<string, string> = {
  clay: "bg-clay/10 text-clay",
  teal: "bg-teal/10 text-teal",
  leaf: "bg-leaf/15 text-leaf",
  saffron: "bg-saffron/20 text-[#9a6b12]",
};

function Kpi({
  icon: Icon,
  tone,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-3xl border border-sand bg-surface p-4">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${TONES[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="mt-3 font-display text-2xl font-bold leading-none">{value}</div>
      <div className="mt-1 text-sm font-medium">{label}</div>
      <div className="text-xs text-muted">{sub}</div>
    </div>
  );
}
