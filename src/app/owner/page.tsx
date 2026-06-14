"use client";

import Link from "next/link";
import {
  Bell,
  CalendarCheck,
  Wallet,
  Star,
  TrendingUp,
  ChevronRight,
  Users,
} from "lucide-react";
import { BOOKINGS, WEEK_OCCUPANCY, MY_VENUE } from "@/lib/ownerData";
import { useT } from "@/i18n/LocaleProvider";
import { StatusPill } from "@/components/owner/StatusPill";

export default function OwnerDashboard() {
  const { t, money, moneyShort } = useT();
  const newCount = BOOKINGS.filter((b) => b.status === "new").length;
  const confirmed = BOOKINGS.filter((b) => b.status === "confirmed").length;
  const earned = BOOKINGS.filter(
    (b) => b.status === "confirmed" || b.status === "completed"
  ).reduce((s, b) => s + b.deposit, 0);
  const recent = BOOKINGS.slice(0, 5);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("owner.dashboard.title")}</h1>
          <p className="mt-1 text-muted">{t("owner.dashboard.greeting", { name: MY_VENUE.name })}</p>
        </div>
        <Link
          href="/owner/bookings"
          className="inline-flex items-center gap-1.5 rounded-full bg-clay px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark"
        >
          <Bell className="h-4 w-4" />
          {t("owner.dashboard.newBookingsCta", { n: newCount })}
        </Link>
      </div>

      {/* KPI */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi
          icon={Bell}
          tone="clay"
          label={t("owner.dashboard.kpi.newLabel")}
          value={String(newCount)}
          sub={t("owner.dashboard.kpi.newSub")}
        />
        <Kpi
          icon={CalendarCheck}
          tone="teal"
          label={t("owner.dashboard.kpi.confirmedLabel")}
          value={String(confirmed)}
          sub={t("owner.dashboard.kpi.confirmedSub")}
        />
        <Kpi
          icon={Wallet}
          tone="leaf"
          label={t("owner.dashboard.kpi.depositsLabel")}
          value={moneyShort(earned)}
          sub={t("owner.dashboard.kpi.depositsSub")}
        />
        <Kpi
          icon={Star}
          tone="saffron"
          label={t("owner.dashboard.kpi.ratingLabel")}
          value={MY_VENUE.rating.toFixed(1)}
          sub={t("owner.dashboard.kpi.ratingSub", { n: MY_VENUE.reviewsCount })}
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-5">
        {/* Occupancy */}
        <div className="rounded-3xl border border-sand bg-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">{t("owner.dashboard.occupancyTitle")}</h2>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-leaf">
              <TrendingUp className="h-4 w-4" />
              +14%
            </span>
          </div>
          <p className="text-sm text-muted">{t("owner.dashboard.occupancySub")}</p>
          <div className="mt-5 flex h-36 items-stretch gap-2">
            {WEEK_OCCUPANCY.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="text-[11px] font-semibold tabular-nums text-muted">{d.pct}</div>
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg transition-all"
                    style={{
                      height: `${d.pct}%`,
                      backgroundImage:
                        d.pct >= 85
                          ? "linear-gradient(180deg,#C0492B,#9F3D24)"
                          : "linear-gradient(180deg,#E2A12B,#C0760F)",
                    }}
                  />
                </div>
                <div className="text-xs text-muted">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent bookings */}
        <div className="rounded-3xl border border-sand bg-surface p-5 lg:col-span-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">{t("owner.dashboard.recentTitle")}</h2>
            <Link
              href="/owner/bookings"
              className="inline-flex items-center gap-0.5 text-sm font-semibold text-clay hover:underline"
            >
              {t("owner.dashboard.all")} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-3 divide-y divide-sand">
            {recent.map((b) => (
              <div key={b.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate font-semibold">{b.groupName}</span>
                    <StatusPill status={b.status} />
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-sm text-muted">
                    <span>{b.date}, {b.time}</span>
                    <span className="text-sand-dark">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {b.guests}
                    </span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-sm font-bold tabular-nums">{money(b.deposit)}</div>
                  <div className="text-xs text-muted">{t("owner.dashboard.deposit")}</div>
                </div>
              </div>
            ))}
          </div>
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
