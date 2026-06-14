import { VENUES } from "@/lib/venues";
import { Search, Sparkles } from "lucide-react";

export function Hero() {
  const avgRating = (
    VENUES.reduce((s, v) => s + v.rating, 0) / VENUES.length
  ).toFixed(1);

  return (
    <section
      className="relative overflow-hidden border-b border-sand"
      style={{ backgroundImage: "linear-gradient(180deg, #FBF6EE 0%, #F5EADA 100%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 85% 0%, rgba(226,161,43,0.18) 0%, rgba(226,161,43,0) 70%), radial-gradient(50% 50% at 0% 100%, rgba(23,89,107,0.10) 0%, rgba(23,89,107,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-saffron/40 bg-saffron-soft/50 px-3 py-1 text-xs font-semibold text-clay-dark">
          <Sparkles className="h-3.5 w-3.5" />
          Чайханы Ташкента — в одном приложении
        </span>

        <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
          Соберите <span className="text-clay">давра</span> без хлопот
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Найдите чайхану, забронируйте кабинку, закажите плов заранее и соберите
          кассу гапа — всё в одном месте. Заведение получит бронь моментально.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="#catalog"
            className="inline-flex items-center gap-2 rounded-full bg-clay px-6 py-3.5 text-base font-semibold text-white shadow-lift transition hover:bg-clay-dark"
          >
            <Search className="h-5 w-5" />
            Подобрать чайхану
          </a>
          <a
            href="#how"
            className="inline-flex items-center rounded-full border border-sand-dark bg-surface px-6 py-3.5 text-base font-semibold text-ink/80 transition hover:bg-sand/40"
          >
            Как это работает
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <Stat value={`${VENUES.length}`} label="заведений" />
          <Stat value="10" label="районов города" />
          <Stat value={`★ ${avgRating}`} label="средний рейтинг" />
          <Stat value="CLICK" label="оплата задатка" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <div className="text-muted">{label}</div>
    </div>
  );
}
