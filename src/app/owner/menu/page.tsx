"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { MY_VENUE, } from "@/lib/ownerData";
import type { MenuItem } from "@/lib/venues";
import { formatSom } from "@/lib/utils";

export default function MenuPage() {
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
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Меню</h1>
      <p className="mt-1 text-muted">Блюда, которые гость видит и может заказать заранее.</p>

      {/* Add form */}
      <div className="mt-6 rounded-3xl border border-sand bg-surface p-4">
        <div className="flex flex-wrap items-end gap-3">
          <label className="min-w-[180px] flex-1">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Название</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Лагман"
              className={inputCls}
            />
          </label>
          <label className="w-36">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Цена, сум</span>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="45000"
              inputMode="numeric"
              className={inputCls}
            />
          </label>
          <button
            type="button"
            onClick={() => setIsMain((m) => !m)}
            className={`rounded-xl border px-3.5 py-2.5 text-sm font-medium transition ${
              isMain ? "border-clay bg-clay/5 text-clay" : "border-sand text-ink/70"
            }`}
          >
            Основное
          </button>
          <button
            type="button"
            onClick={add}
            className="inline-flex items-center gap-1.5 rounded-xl bg-clay px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark"
          >
            <Plus className="h-4 w-4" />
            Добавить
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
                  основное
                </span>
              )}
              <span className={m.isMain ? "font-semibold" : ""}>{m.name}</span>
            </span>
            <div className="flex items-center gap-4">
              <span className="font-semibold tabular-nums">{formatSom(m.price)}</span>
              <button
                onClick={() => remove(i)}
                className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-clay/10 hover:text-clay"
                aria-label="Удалить"
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
