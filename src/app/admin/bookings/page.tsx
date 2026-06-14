"use client";

import { useState } from "react";
import { PLATFORM_BOOKINGS } from "@/lib/adminData";
import { useT } from "@/i18n/LocaleProvider";

type Status = "new" | "confirmed" | "completed";
type Tab = "all" | Status;

const TABS: { id: Tab; labelKey: string }[] = [
  { id: "all", labelKey: "admin.bookings.tabs.all" },
  { id: "new", labelKey: "admin.bookings.tabs.new" },
  { id: "confirmed", labelKey: "admin.bookings.tabs.confirmed" },
  { id: "completed", labelKey: "admin.bookings.tabs.completed" },
];
const STATUS_CLS: Record<Status, string> = {
  new: "bg-saffron text-ink",
  confirmed: "bg-leaf/15 text-leaf",
  completed: "bg-teal/10 text-teal",
};

export default function AdminBookingsPage() {
  const { t, money, moneyShort } = useT();
  const [tab, setTab] = useState<Tab>("all");
  const visible = PLATFORM_BOOKINGS.filter((b) => (tab === "all" ? true : b.status === tab));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("admin.bookings.title")}</h1>
      <p className="mt-1 text-muted">{t("admin.bookings.subtitle")}</p>

      <div className="mt-5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map((tabItem) => (
          <button
            key={tabItem.id}
            onClick={() => setTab(tabItem.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === tabItem.id ? "bg-ink text-white" : "border border-sand bg-surface text-ink/70 hover:bg-cream"
            }`}
          >
            {t(tabItem.labelKey)}
          </button>
        ))}
      </div>

      {/* Mobile: карточки вместо широкой таблицы */}
      <div className="mt-5 space-y-3 sm:hidden">
        {visible.map((b) => (
          <div key={b.id} className="rounded-2xl border border-sand bg-surface p-4">
            <div className="flex items-start justify-between gap-2">
              <span className="font-semibold">{b.venue}</span>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLS[b.status]}`}>
                {t(`enums.bookingStatus.${b.status}`)}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              <div><span className="text-muted">{t("admin.bookings.cardLabel.group")}</span>{b.group} · {b.guests}</div>
              <div><span className="text-muted">{t("admin.bookings.cardLabel.date")}</span>{b.date}</div>
              <div><span className="text-muted">{t("admin.bookings.cardLabel.gmv")}</span><span className="tabular-nums">{moneyShort(b.gmv)}</span></div>
              <div>
                <span className="text-muted">{t("admin.bookings.cardLabel.commission")}</span>
                <span className="font-semibold tabular-nums text-leaf">+{money(b.commission)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: таблица */}
      <div className="mt-5 hidden overflow-x-auto rounded-3xl border border-sand bg-surface sm:block">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-sand text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">{t("admin.bookings.cols.id")}</th>
              <th className="px-4 py-3 font-semibold">{t("admin.bookings.cols.venue")}</th>
              <th className="px-4 py-3 font-semibold">{t("admin.bookings.cols.group")}</th>
              <th className="px-4 py-3 font-semibold">{t("admin.bookings.cols.date")}</th>
              <th className="px-4 py-3 text-right font-semibold">{t("admin.bookings.cols.gmv")}</th>
              <th className="px-4 py-3 text-right font-semibold">{t("admin.bookings.cols.commission")}</th>
              <th className="px-4 py-3 font-semibold">{t("admin.bookings.cols.status")}</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.id} className="border-b border-sand last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-muted">{b.id}</td>
                <td className="px-4 py-3 font-semibold">{b.venue}</td>
                <td className="px-4 py-3 text-muted">{b.group} · {b.guests}</td>
                <td className="px-4 py-3 text-muted">{b.date}</td>
                <td className="px-4 py-3 text-right tabular-nums">{moneyShort(b.gmv)}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums text-leaf">+{money(b.commission)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLS[b.status]}`}>
                    {t(`enums.bookingStatus.${b.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
