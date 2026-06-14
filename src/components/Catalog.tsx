"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";
import type { Venue, District, Dish, Amenity } from "@/lib/venues";
import { DISTRICTS, DISHES, AMENITY_LABELS } from "@/lib/venues";
import { plural } from "@/lib/utils";
import { VenueCard } from "./VenueCard";
import { BookingSheet } from "./BookingSheet";
import { AMENITY_ICONS } from "./icons";

type Sort = "rating" | "price-asc" | "price-desc";
const PRICE_CHIPS: { level: 1 | 2 | 3; label: string }[] = [
  { level: 1, label: "● Эконом" },
  { level: 2, label: "●● Средний" },
  { level: 3, label: "●●● Премиум" },
];

function toggle<T>(set: Set<T>, item: T): Set<T> {
  const next = new Set(set);
  if (next.has(item)) next.delete(item);
  else next.add(item);
  return next;
}

export function Catalog({ venues }: { venues: Venue[] }) {
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState<District | "">("");
  const [dishes, setDishes] = useState<Set<Dish>>(new Set());
  const [prices, setPrices] = useState<Set<1 | 2 | 3>>(new Set());
  const [amenities, setAmenities] = useState<Set<Amenity>>(new Set());
  const [sort, setSort] = useState<Sort>("rating");
  const [showMore, setShowMore] = useState(false);
  const [booking, setBooking] = useState<Venue | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = venues.filter((v) => {
      if (q && !v.name.toLowerCase().includes(q) && !v.tagline.toLowerCase().includes(q)) return false;
      if (district && v.district !== district) return false;
      if (prices.size && !prices.has(v.priceLevel)) return false;
      if (dishes.size && !v.signatureDishes.some((d) => dishes.has(d))) return false;
      if (amenities.size && ![...amenities].every((a) => v.amenities.includes(a))) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.avgCheckPerGuest - b.avgCheckPerGuest);
    else if (sort === "price-desc") sorted.sort((a, b) => b.avgCheckPerGuest - a.avgCheckPerGuest);
    else sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [venues, query, district, prices, dishes, amenities, sort]);

  const activeCount =
    (district ? 1 : 0) + dishes.size + prices.size + amenities.size + (query ? 1 : 0);

  const reset = () => {
    setQuery("");
    setDistrict("");
    setDishes(new Set());
    setPrices(new Set());
    setAmenities(new Set());
  };

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Чайханы Ташкента</h2>
          <p className="mt-1 text-muted">
            {filtered.length} {plural(filtered.length, ["заведение", "заведения", "заведений"])}{" "}
            для вашего гапа
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 mb-7 rounded-3xl border border-sand bg-surface/95 p-3 shadow-soft backdrop-blur-md">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-full border border-sand bg-cream px-4 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск по названию…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>

          <div className="flex items-center gap-2 rounded-full border border-sand bg-cream px-3 py-2.5">
            <MapPin className="h-4 w-4 text-clay" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value as District | "")}
              className="bg-transparent text-sm font-medium outline-none"
            >
              <option value="">Все районы</option>
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-full border border-sand bg-cream px-4 py-2.5 text-sm font-medium outline-none"
          >
            <option value="rating">По рейтингу</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
          </select>

          <button
            onClick={() => setShowMore((s) => !s)}
            className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium transition ${
              showMore ? "border-clay bg-clay/5 text-clay" : "border-sand bg-cream"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Удобства
          </button>

          {activeCount > 0 && (
            <button
              onClick={reset}
              className="flex items-center gap-1 rounded-full px-3 py-2.5 text-sm font-medium text-clay transition hover:bg-clay/5"
            >
              <X className="h-4 w-4" />
              Сбросить ({activeCount})
            </button>
          )}
        </div>

        {/* Price + dishes chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {PRICE_CHIPS.map((p) => (
            <Chip key={p.level} active={prices.has(p.level)} onClick={() => setPrices(toggle(prices, p.level))}>
              {p.label}
            </Chip>
          ))}
          <span className="mx-1 self-center text-sand-dark">|</span>
          {DISHES.map((d) => (
            <Chip key={d} active={dishes.has(d)} onClick={() => setDishes(toggle(dishes, d))}>
              {d}
            </Chip>
          ))}
        </div>

        {/* Amenities (expandable) */}
        {showMore && (
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-sand pt-3">
            {(Object.keys(AMENITY_LABELS) as Amenity[]).map((a) => {
              const Icon = AMENITY_ICONS[a];
              return (
                <Chip key={a} active={amenities.has(a)} onClick={() => setAmenities(toggle(amenities, a))}>
                  <Icon className="h-3.5 w-3.5" />
                  {AMENITY_LABELS[a]}
                </Chip>
              );
            })}
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-sand-dark bg-surface py-16 text-center">
          <p className="font-display text-xl font-bold">Ничего не нашлось</p>
          <p className="mt-1 text-muted">Попробуйте смягчить фильтры</p>
          <button
            onClick={reset}
            className="mt-4 rounded-full bg-clay px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-clay-dark"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <VenueCard key={v.id} venue={v} onBook={setBooking} />
          ))}
        </div>
      )}

      {booking && <BookingSheet venue={booking} onClose={() => setBooking(null)} />}
    </section>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? "border-clay bg-clay text-white"
          : "border-sand bg-surface text-ink/75 hover:border-sand-dark"
      }`}
    >
      {children}
    </button>
  );
}
