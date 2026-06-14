"use client";

import { useState } from "react";
import { Plus, Trash2, Users, Minus } from "lucide-react";
import { MY_VENUE } from "@/lib/ownerData";
import { ROOM_TYPES, type RoomType, type Room } from "@/lib/venues";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(MY_VENUE.rooms);
  const [name, setName] = useState("");
  const [type, setType] = useState<RoomType>("kabinka");
  const [seats, setSeats] = useState(12);

  const add = () => {
    if (!name.trim()) return;
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `r-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    setRooms((rs) => [...rs, { id, name: name.trim(), type, seats }]);
    setName("");
    setSeats(12);
    setType("kabinka");
  };
  const remove = (id: string) => setRooms((rs) => rs.filter((r) => r.id !== id));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Кабинки и залы</h1>
      <p className="mt-1 text-muted">Посадка, которую можно забронировать у вас.</p>

      {/* Add form */}
      <div className="mt-6 rounded-3xl border border-sand bg-surface p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <label className="w-full sm:min-w-[180px] sm:flex-1">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Название</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Кабинка «Лола»"
              className={inputCls}
            />
          </label>
          <label className="w-full sm:w-44">
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Тип</span>
            <select value={type} onChange={(e) => setType(e.target.value as RoomType)} className={inputCls}>
              {(Object.keys(ROOM_TYPES) as RoomType[]).map((t) => (
                <option key={t} value={t}>
                  {ROOM_TYPES[t].label}
                </option>
              ))}
            </select>
          </label>
          <div>
            <span className="mb-1.5 block text-sm font-medium text-ink/80">Мест</span>
            <div className="inline-flex items-center gap-1 rounded-xl border border-sand bg-cream p-1">
              <button onClick={() => setSeats((s) => Math.max(2, s - 2))} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold tabular-nums">{seats}</span>
              <button onClick={() => setSeats((s) => Math.min(400, s + 2))} className="grid h-8 w-8 place-items-center rounded-lg hover:bg-surface">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={add}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-clay px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Добавить
          </button>
        </div>
      </div>

      {/* List */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {rooms.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-2xl border border-sand bg-surface p-4">
            <div>
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-muted">
                {ROOM_TYPES[r.type].label} · {ROOM_TYPES[r.type].hint}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-sm font-semibold">
                <Users className="h-3.5 w-3.5 text-clay" />
                {r.seats}
              </span>
              <button
                onClick={() => remove(r.id)}
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
