"use client";

import { useState } from "react";
import { Check, X, Phone, Users, Clock, UtensilsCrossed, DoorOpen } from "lucide-react";
import { BOOKINGS, type OwnerBooking, type BookingStatus } from "@/lib/ownerData";
import { useT } from "@/i18n/LocaleProvider";
import { StatusPill } from "@/components/owner/StatusPill";

type Tab = "all" | "new" | "confirmed" | "completed";
const TABS: Tab[] = ["all", "new", "confirmed", "completed"];
const ORDER: Record<BookingStatus, number> = { new: 0, confirmed: 1, completed: 2, declined: 3 };

export default function BookingsPage() {
  const { t, money } = useT();
  const [bookings, setBookings] = useState<OwnerBooking[]>(BOOKINGS);
  const [tab, setTab] = useState<Tab>("all");

  const setStatus = (id: string, status: BookingStatus) =>
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));

  const newCount = bookings.filter((b) => b.status === "new").length;
  const visible = bookings
    .filter((b) => (tab === "all" ? true : b.status === tab))
    .sort((a, b) => ORDER[a.status] - ORDER[b.status]);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("owner.bookings.title")}</h1>
      <p className="mt-1 text-muted">{t("owner.bookings.subtitle")}</p>

      {/* Tabs */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto no-scrollbar">
        {TABS.map((id) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              tab === id ? "bg-ink text-white" : "border border-sand bg-surface text-ink/70 hover:bg-cream"
            }`}
          >
            {t(`owner.bookings.tabs.${id}`)}
            {id === "new" && newCount > 0 && (
              <span
                className={`rounded-full px-1.5 text-xs font-bold ${
                  tab === id ? "bg-white/25" : "bg-clay text-white"
                }`}
              >
                {newCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-5 space-y-4">
        {visible.length === 0 && (
          <div className="rounded-3xl border border-dashed border-sand-dark bg-surface py-14 text-center text-muted">
            {t("owner.bookings.empty")}
          </div>
        )}
        {visible.map((b) => (
          <div key={b.id} className="rounded-3xl border border-sand bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg font-bold">{b.groupName}</h3>
                  <StatusPill status={b.status} />
                </div>
                <div className="mt-0.5 text-sm text-muted">
                  {b.customerName} ·{" "}
                  <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 hover:text-clay">
                    <Phone className="h-3.5 w-3.5" />
                    {b.phone}
                  </a>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold tabular-nums">{money(b.deposit)}</div>
                <div className="text-xs text-muted">{t("owner.bookings.depositOf", { total: money(b.estTotal) })}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Field icon={Clock} label={t("owner.bookings.fields.when")} value={`${b.date}, ${b.time}`} />
              <Field icon={Users} label={t("owner.bookings.fields.guests")} value={String(b.guests)} />
              <Field icon={DoorOpen} label={t("owner.bookings.fields.seating")} value={b.roomName} />
              <Field icon={UtensilsCrossed} label={t("owner.bookings.fields.preorder")} value={b.mainDish} />
            </div>

            {b.status === "new" && (
              <div className="mt-4 flex gap-3 border-t border-sand pt-4">
                <button
                  onClick={() => setStatus(b.id, "confirmed")}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-leaf py-2.5 font-semibold text-white transition hover:opacity-90"
                >
                  <Check className="h-4 w-4" />
                  {t("owner.bookings.confirm")}
                </button>
                <button
                  onClick={() => setStatus(b.id, "declined")}
                  className="flex items-center justify-center gap-2 rounded-full border border-sand px-5 py-2.5 font-semibold text-muted transition hover:bg-cream"
                >
                  <X className="h-4 w-4" />
                  {t("owner.bookings.decline")}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-cream p-3">
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <div className="mt-0.5 truncate text-sm font-semibold" title={value}>
        {value}
      </div>
    </div>
  );
}
