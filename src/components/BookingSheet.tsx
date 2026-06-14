"use client";

import { useEffect, useMemo, useState } from "react";
import {
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Users,
  Minus,
  Plus,
  Wallet,
  Split,
  ShieldCheck,
  Bell,
} from "lucide-react";
import type { Venue } from "@/lib/venues";
import { useTelegram, haptic } from "@/lib/telegram";
import { useT } from "@/i18n/LocaleProvider";

const SERVICE_RATE = 0.03; // комиссия Davra с задатка
const TIME_SLOTS = ["12:00", "14:00", "16:00", "18:00", "19:00", "20:00", "21:00"];

export function BookingSheet({ venue, onClose }: { venue: Venue; onClose: () => void }) {
  const { t, money } = useT();
  const STEPS = [
    t("booking.steps.room"),
    t("booking.steps.date"),
    t("booking.steps.order"),
    t("booking.steps.pay"),
  ];

  const [step, setStep] = useState(0);
  const [roomId, setRoomId] = useState(venue.rooms[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState(() => Math.max(2, Math.min(8, venue.rooms[0]?.seats ?? 8)));
  const [dishQtys, setDishQtys] = useState<Record<string, number>>({});
  const [splitKassa, setSplitKassa] = useState(false);
  const [paid, setPaid] = useState(false);
  const { tg, isTelegram } = useTelegram();

  useEffect(() => {
    if (!isTelegram || !tg) return;
    const back = () => {
      if (paid) onClose();
      else if (step > 0) setStep((s) => s - 1);
      else onClose();
    };
    tg.BackButton.onClick(back);
    tg.BackButton.show();
    return () => {
      try {
        tg.BackButton.offClick(back);
        tg.BackButton.hide();
      } catch {
        /* no-op */
      }
    };
  }, [isTelegram, tg, step, paid, onClose]);

  const room = venue.rooms.find((r) => r.id === roomId);
  const mains = venue.menu.filter((m) => m.isMain);

  const summary = useMemo(() => {
    const dishesTotal = Object.entries(dishQtys).reduce((sum, [name, qty]) => {
      const item = venue.menu.find((m) => m.name === name);
      return sum + (item ? item.price * qty : 0);
    }, 0);
    const estTotal = Math.max(venue.avgCheckPerGuest * guests, dishesTotal);
    const deposit = Math.round((estTotal * venue.depositPercent) / 100);
    const serviceFee = Math.round(deposit * SERVICE_RATE);
    const payNow = deposit + serviceFee;
    const perPerson = Math.ceil(payNow / Math.max(guests, 1));
    return { estTotal, deposit, serviceFee, payNow, perPerson };
  }, [dishQtys, guests, venue]);

  const setQty = (name: string, delta: number) =>
    setDishQtys((q) => {
      const next = Math.max(0, (q[name] ?? 0) + delta);
      return { ...q, [name]: next };
    });

  const canNext = step === 0 ? !!roomId : step === 1 ? !!date : true;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/45 animate-overlay-in" onClick={onClose} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-4">
        <div className="pointer-events-auto flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-surface shadow-lift animate-sheet-in sm:max-w-md sm:rounded-3xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sand px-5 py-4">
            <div>
              <div className="text-xs font-medium text-muted">{t("booking.title")}</div>
              <div className="font-display text-lg font-bold leading-tight">{venue.name}</div>
            </div>
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full bg-cream text-muted transition hover:bg-sand"
              aria-label={t("booking.close")}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {paid ? (
            <Success venue={venue} room={room?.name} date={date} time={time} onClose={onClose} />
          ) : (
            <>
              {/* Stepper */}
              <div className="flex gap-1.5 px-5 pt-4">
                {STEPS.map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className={`h-1.5 rounded-full transition ${i <= step ? "bg-clay" : "bg-sand"}`} />
                    <div
                      className={`mt-1.5 text-center text-[11px] font-medium ${
                        i === step ? "text-clay" : "text-muted"
                      }`}
                    >
                      {label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                {step === 0 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted">{t("booking.pickRoom")}</p>
                    {venue.rooms.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setRoomId(r.id);
                          setGuests((g) => Math.max(2, Math.min(g, r.seats)));
                        }}
                        className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                          roomId === r.id
                            ? "border-clay bg-clay/5 ring-1 ring-clay"
                            : "border-sand hover:border-sand-dark"
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-semibold">{r.name}</div>
                          <div className="text-sm text-muted">
                            {t(`enums.roomTypes.${r.type}.label`)} · {t(`enums.roomTypes.${r.type}.hint`)}
                          </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-1 rounded-full bg-cream px-3 py-1.5 text-sm font-semibold">
                          <Users className="h-4 w-4 text-clay" />
                          {r.seats}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold">{t("booking.date")}</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-sand bg-cream px-4 py-3 text-base outline-none focus:border-clay focus:ring-1 focus:ring-clay"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold">{t("booking.time")}</label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {TIME_SLOTS.map((tslot) => (
                          <button
                            key={tslot}
                            onClick={() => setTime(tslot)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                              time === tslot
                                ? "border-clay bg-clay text-white"
                                : "border-sand bg-surface hover:border-sand-dark"
                            }`}
                          >
                            {tslot}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold">{t("booking.guests")}</label>
                      <div className="mt-2 flex items-center gap-4">
                        <Stepper value={guests} min={2} max={room?.seats ?? 50} onChange={setGuests} />
                        <span className="text-sm text-muted">
                          {t("booking.seatsIn", { room: room?.name ?? "", n: room?.seats ?? 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-3">
                    <p className="text-sm text-muted">{t("booking.preorderHint")}</p>
                    {mains.map((m) => (
                      <div key={m.name} className="flex items-center justify-between rounded-2xl border border-sand p-3">
                        <div className="pr-2">
                          <div className="font-medium leading-tight">{m.name}</div>
                          <div className="text-sm text-muted">{money(m.price)}</div>
                        </div>
                        {dishQtys[m.name] ? (
                          <Stepper
                            value={dishQtys[m.name]}
                            min={0}
                            max={50}
                            onChange={(v) => setQty(m.name, v - (dishQtys[m.name] ?? 0))}
                            compact
                          />
                        ) : (
                          <button
                            onClick={() => setQty(m.name, 1)}
                            className="rounded-full border border-clay px-3.5 py-1.5 text-sm font-semibold text-clay transition hover:bg-clay/5"
                          >
                            {t("booking.add")}
                          </button>
                        )}
                      </div>
                    ))}
                    <p className="pt-1 text-center text-xs text-muted">{t("booking.extrasHint")}</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div className="rounded-2xl border border-sand bg-cream p-4">
                      <Row label={`${t("booking.estCheck")} · ${guests} ${t("booking.guestsWord")}`} value={money(summary.estTotal)} muted />
                      <Row label={t("booking.deposit", { pct: venue.depositPercent })} value={money(summary.deposit)} />
                      <Row label={t("booking.serviceFee")} value={money(summary.serviceFee)} muted />
                      <div className="my-2 border-t border-sand" />
                      <Row label={t("booking.payNow")} value={money(summary.payNow)} bold />
                      <p className="mt-1 text-xs text-muted">
                        {t("booking.remainder", { sum: money(summary.estTotal - summary.deposit) })}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        haptic("selection");
                        setSplitKassa((s) => !s);
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                        splitKassa ? "border-teal bg-teal/5 ring-1 ring-teal" : "border-sand"
                      }`}
                    >
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                          splitKassa ? "bg-teal text-white" : "bg-cream text-teal"
                        }`}
                      >
                        <Split className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold">{t("booking.kassaTitle")}</span>
                        <span className="block text-sm text-muted">
                          {splitKassa
                            ? t("booking.kassaOn", { sum: money(summary.perPerson) })
                            : t("booking.kassaOff")}
                        </span>
                      </span>
                      <span className={`h-6 w-11 shrink-0 rounded-full p-0.5 transition ${splitKassa ? "bg-teal" : "bg-sand"}`}>
                        <span className={`block h-5 w-5 rounded-full bg-white shadow transition ${splitKassa ? "translate-x-5" : ""}`} />
                      </span>
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted">
                      <ShieldCheck className="h-4 w-4 text-leaf" />
                      {t("booking.secure")}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center gap-3 border-t border-sand px-5 pt-4"
                style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
              >
                {step > 0 && (
                  <button
                    onClick={() => {
                      haptic("light");
                      setStep((s) => s - 1);
                    }}
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-sand text-muted transition hover:bg-cream"
                    aria-label={t("booking.back")}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={() => {
                      if (canNext) {
                        haptic("light");
                        setStep((s) => s + 1);
                      }
                    }}
                    disabled={!canNext}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-clay py-3.5 font-semibold text-white transition hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {t("booking.next")}
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      haptic("success");
                      setPaid(true);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full bg-clay py-3.5 font-semibold text-white transition hover:bg-clay-dark"
                  >
                    <Wallet className="h-5 w-5" />
                    {t("booking.payViaClick", { sum: money(summary.payNow) })}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
  compact = false,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-sand bg-surface p-1">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-cream disabled:opacity-30"
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={`text-center font-bold tabular-nums ${compact ? "w-6" : "w-8 text-lg"}`}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="grid h-9 w-9 place-items-center rounded-full text-ink transition hover:bg-cream disabled:opacity-30"
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  muted,
}: {
  label: string;
  value: string;
  bold?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${muted ? "text-muted" : ""}`}>{label}</span>
      <span className={`tabular-nums ${bold ? "text-lg font-bold" : "font-semibold"}`}>{value}</span>
    </div>
  );
}

function Success({
  venue,
  room,
  date,
  time,
  onClose,
}: {
  venue: Venue;
  room?: string;
  date: string;
  time: string;
  onClose: () => void;
}) {
  const { t } = useT();
  return (
    <div className="flex flex-col items-center px-6 py-10 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-leaf/15 text-leaf">
        <Check className="h-9 w-9" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold">{t("booking.successTitle")}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted">{t("booking.successText", { venue: venue.name })}</p>
      <div className="mt-5 w-full rounded-2xl border border-sand bg-cream p-4 text-left text-sm">
        <div className="flex justify-between py-0.5">
          <span className="text-muted">{t("booking.sCabin")}</span>
          <span className="font-semibold">{room}</span>
        </div>
        <div className="flex justify-between py-0.5">
          <span className="text-muted">{t("booking.sWhen")}</span>
          <span className="font-semibold">
            {date || "—"} · {time}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <Bell className="h-4 w-4 text-clay" />
        {t("booking.reminder")}
      </div>
      <button
        onClick={onClose}
        className="mt-6 w-full rounded-full bg-ink py-3.5 font-semibold text-white transition hover:opacity-90"
      >
        {t("booking.done")}
      </button>
    </div>
  );
}
