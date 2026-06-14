"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { MY_VENUE } from "@/lib/ownerData";
import type { MenuItem } from "@/lib/venues";
import { useT } from "@/i18n/LocaleProvider";

export default function MenuPage() {
  const { t, money } = useT();
  const [items, setItems] = useState<MenuItem[]>(MY_VENUE.menu);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isMain, setIsMain] = useState(false);

  const add = () => {
    const p = parseInt(price.replace(/\D/g, ""), 10);
    if (!name.trim() || Number.isNaN(p) || p < 0) return;
    setItems((xs) => [{ name: name.trim(), price: p, isMain }, ...xs]);
    setName("");
    setPrice("");
    setIsMain(false);
  };

  const remove = (i: number) => setItems((xs) => xs.filter((_, idx) => idx !== i));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">{t("owner.menu.title")}</h1>
      <p className="mt-1 text-muted">{t("owner.menu.subtitle")}</p>

      {/* Add form */}
      <div className="mt-6 rounded-3xl border border-sand bg-surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="w-full sm:min-w-[180px] sm:flex-1">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">{t("owner.menu.name")}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("owner.menu.namePlaceholder")}
              className={inputCls}
            />
          </label>
          <label className="w-full sm:w-36">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">{t("owner.menu.price")}</span>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t("owner.menu.pricePlaceholder")}
              inputMode="numeric"
              className={inputCls}
            />
          </label>
          <button
            type="button"
            onClick={() => setIsMain((m) => !m)}
            className={`w-full rounded-xl border px-3.5 py-2.5 text-sm font-medium transition sm:w-auto ${
              isMain ? "border-clay bg-clay/5 text-clay" : "border-sand text-ink/70"
            }`}
          >
            {t("owner.menu.main")}
          </button>
          <button
            type="button"
            onClick={add}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-clay px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            {t("owner.menu.add")}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-5 overflow-hidden rounded-3xl border border-sand bg-surface">
        {items.map((m, i) => (
          <div
            key={`${m.name}-${i}`}
            className={`flex items-center justify-between px-4 py-3 ${i !== 0 ? "border-t border-sand" : ""}`}
          >
            <span className="flex items-center gap-2">
              {m.isMain && (
                <span className="rounded-full bg-clay/10 px-2 py-0.5 text-xs font-semibold text-clay">
                  {t("owner.menu.mainBadge")}
                </span>
              )}
              <span className={m.isMain ? "font-semibold" : ""}>{m.name}</span>
            </span>
            <div className="flex items-center gap-4">
              <span className="font-semibold tabular-nums">{money(m.price)}</span>
              <button
                onClick={() => remove(i)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-clay/10 hover:text-clay"
                aria-label={t("owner.menu.delete")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-sand bg-cream px-3.5 py-2.5 text-sm outline-none focus:border-clay focus:ring-1 focus:ring-clay";
