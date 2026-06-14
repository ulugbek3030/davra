"use client";

import { useState } from "react";
import { Check, X, Pause, Play, Star, MapPin } from "lucide-react";
import {
  ADMIN_VENUES,
  type AdminVenueRow,
  type VenueStatus,
} from "@/lib/adminData";
import { useT } from "@/i18n/LocaleProvider";

type Tab = "all" | "pending" | "active" | "paused";
const TABS: { id: Tab; labelKey: string }[] = [
  { id: "all", labelKey: "admin.venues.tabs.all" },
  { id: "pending", labelKey: "admin.venues.tabs.pending" },
  { id: "active", labelKey: "admin.venues.tabs.active" },
  { id: "paused", labelKey: "admin.venues.tabs.paused" },
];

const STATUS_CLS: Record<VenueStatus, string> = {
  active: "bg-leaf/15 text-leaf",
  pending: "bg-saffron text-ink",
  paused: "bg-ink/10 text-muted",
};

export default function AdminVenuesPage() {
  const { t, moneyShort } = useT();
  const [venues, setVenues] = useState<AdminVenueRow[]>(ADMIN_VENUES);
  const [tab, setTab] = useState<Tab>("all");

  const pending = venues.filter((v) => v.status === "pending").length;
  const setStatus = (id: string, status: VenueStatus) =>
    setVenues((vs) => vs.map((v) => (v.id === id ? { ...v, status } : v)));
  const reject = (id: string) => setVenues((vs) => vs.filter((v) => v.id !== id));

  const visible = venues.filter((v) => (tab === "all" ? true : v.status === tab));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("admin.venues.title")}</h1>
      <p className="mt-1 text-muted">{t("admin.venues.subtitle")}</p>

      <div className="mt-5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === tabItem.id ? "bg-ink text-white" : "border border-sand bg-surface text-ink/70 hover:bg-cream"
            }`}
          >
            {t(tabItem.labelKey)}
            {tabItem.id === "pending" && pending > 0 && (
              <span className={`rounded-full px-1.5 text-xs font-bold ${tab === tabItem.id ? "bg-white/25" : "bg-saffron text-ink"}`}>
                {pending}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {visible.map((v) => (
          <div
            key={v.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-2xl border border-sand bg-surface p-4"
          >
            <div className="min-w-[160px] flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-bold">{v.name}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_CLS[v.status]}`}>
                  {t(`enums.venueStatus.${v.status}`)}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-sm text-muted">
                <MapPin className="h-3.5 w-3.5 text-clay" />
                {t(`enums.districts.${v.district}`)}
                <span className="text-sand-dark">·</span>
                <span className="rounded bg-cream px-1.5 py-0.5 text-xs font-semibold">{t(`enums.planTier.${v.plan}`)}</span>
              </div>
            </div>

            {v.status !== "pending" && (
              <>
                <Stat label={t("admin.venues.stat.rating")} value={
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-saffron text-saffron" />
                    {v.rating.toFixed(1)}
                  </span>
                } />
                <Stat label={t("admin.venues.stat.bookingsMonth")} value={v.bookings30d} />
                <Stat label={t("admin.venues.stat.revenue")} value={moneyShort(v.revenue30d)} />
              </>
            )}

            <div className="flex gap-2">
              {v.status === "pending" && (
                <>
                  <button
                    onClick={() => setStatus(v.id, "active")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-leaf px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    <Check className="h-4 w-4" />
                    {t("admin.venues.actions.approve")}
                  </button>
                  <button
                    onClick={() => reject(v.id)}
                    aria-label={t("admin.venues.actions.reject")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-sand px-3 py-2 text-sm font-semibold text-muted transition hover:bg-cream"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              )}
              {v.status === "active" && (
                <button
                  onClick={() => setStatus(v.id, "paused")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-sand px-4 py-2 text-sm font-semibold text-muted transition hover:bg-cream"
                >
                  <Pause className="h-4 w-4" />
                  {t("admin.venues.actions.pause")}
                </button>
              )}
              {v.status === "paused" && (
                <button
                  onClick={() => setStatus(v.id, "active")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white transition hover:bg-clay-dark"
                >
                  <Play className="h-4 w-4" />
                  {t("admin.venues.actions.activate")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="text-right">
      <div className="text-xs text-muted">{label}</div>
      <div className="text-sm font-semibold tabular-nums">{value}</div>
    </div>
  );
}
