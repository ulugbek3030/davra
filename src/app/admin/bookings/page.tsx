"use client";

import { useState } from "react";
import { PLATFORM_BOOKINGS } from "@/lib/adminData";
import { formatSom, formatSomShort } from "@/lib/utils";

type Status = "new" | "confirmed" | "completed";
type Tab = "all" | Status;

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "confirmed", label: "Подтверждённые" },
  { id: "completed", label: "Завершённые" },
];
const STATUS_LABEL: Record<Status, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  completed: "Завершена",
};
const STATUS_CLS: Record<Status, string> = {
  new: "bg-saffron text-ink",
  confirmed: "bg-leaf/15 text-leaf",
  completed: "bg-teal/10 text-teal",
};

export default function AdminBookingsPage() {
  const [tab, setTab] = useState<Tab>("all");
  const visible = PLATFORM_BOOKINGS.filter((b) => (tab === "all" ? true : b.status === tab));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Брони платформы</h1>
      <p className="mt-1 text-muted">Все бронирования по всем заведениям Davra.</p>

      <div className="mt-5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === t.id ? "bg-ink text-white" : "border border-sand bg-surface text-ink/70 hover:bg-cream"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-x-auto rounded-3xl border border-sand bg-surface">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-sand text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Заведение</th>
              <th className="px-4 py-3 font-semibold">Группа</th>
              <th className="px-4 py-3 font-semibold">Дата</th>
              <th className="px-4 py-3 text-right font-semibold">GMV</th>
              <th className="px-4 py-3 text-right font-semibold">Комиссия</th>
              <th className="px-4 py-3 font-semibold">Статус</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((b) => (
              <tr key={b.id} className="border-b border-sand last:border-0">
                <td className="px-4 py-3 font-mono text-xs text-muted">{b.id}</td>
                <td className="px-4 py-3 font-semibold">{b.venue}</td>
                <td className="px-4 py-3 text-muted">{b.group} · {b.guests}</td>
                <td className="px-4 py-3 text-muted">{b.date}</td>
                <td className="px-4 py-3 text-right tabular-nums">{formatSomShort(b.gmv)}</td>
                <td className="px-4 py-3 text-right font-semibold tabular-nums text-leaf">+{formatSom(b.commission)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_CLS[b.status]}`}>
                    {STATUS_LABEL[b.status]}
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
