import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Users, BadgeCheck, Phone } from "lucide-react";
import { getVenue, VENUES, ROOM_TYPES, AMENITY_LABELS } from "@/lib/venues";
import type { Amenity } from "@/lib/venues";
import { formatSom } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CoverArt } from "@/components/CoverArt";
import { Stars } from "@/components/Stars";
import { AMENITY_ICONS } from "@/components/icons";
import { VenueDetailActions } from "@/components/VenueDetailActions";

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenue(slug);
  if (!v) return { title: "Чайхана не найдена" };
  return {
    title: v.name,
    description: `${v.tagline}. ${v.district}, Ташкент · рейтинг ${v.rating}. Забронируйте кабинку и закажите блюдо заранее.`,
    openGraph: { title: `${v.name} · Davra`, description: v.tagline },
  };
}

const REVIEWS = [
  {
    name: "Азиз Р.",
    date: "май 2026",
    rating: 5,
    text: "Собирали гап на 12 человек. Кабинка изолированная, плов заказали заранее — подали горячим к приходу. Кассу собрали через приложение за минуту.",
  },
  {
    name: "Дильноза К.",
    date: "апрель 2026",
    rating: 5,
    text: "Очень уютно, чисто, вежливый персонал. Бронь подтвердили сразу. Обязательно вернёмся следующим месяцем.",
  },
  {
    name: "Шерзод М.",
    date: "апрель 2026",
    rating: 4,
    text: "Хорошее место для большой компании. Парковка есть. Немного шумно в выходные, но в кабинке не слышно.",
  },
];

export default async function VenuePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const venue = getVenue(slug);
  if (!venue) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6">
        <Link
          href="/#catalog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-clay"
        >
          <ArrowLeft className="h-4 w-4" />
          Все чайханы
        </Link>

        {/* Cover */}
        <div className="relative mt-4">
          <CoverArt
            variant={venue.cover}
            dish={venue.signatureDishes[0]}
            photoCount={8 + (venue.reviewsCount % 9)}
            className="h-56 w-full rounded-3xl sm:h-72"
            glyphClassName="text-8xl"
          />
          {venue.featured && (
            <span className="absolute left-4 top-4 rounded-full bg-saffron px-3 py-1 text-sm font-bold text-ink shadow-soft">
              ★ Популярное
            </span>
          )}
        </div>

        {/* Header */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="font-display text-3xl font-bold sm:text-4xl">{venue.name}</h1>
            {venue.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal">
                <BadgeCheck className="h-4 w-4" />
                Проверено
              </span>
            )}
          </div>
          <p className="mt-1.5 text-lg text-muted">{venue.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Stars value={venue.rating} />
            <span className="text-muted">{venue.reviewsCount} отзывов</span>
            <span className="flex items-center gap-1.5 text-muted">
              <MapPin className="h-4 w-4 text-clay" />
              {venue.district} · {venue.address}
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <Clock className="h-4 w-4 text-clay" />
              {venue.openHours}
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <Users className="h-4 w-4 text-clay" />
              до {venue.capacityMax} гостей
            </span>
          </div>
        </div>

        <p className="mt-5 leading-relaxed text-ink/80">{venue.description}</p>

        {/* Amenities */}
        <Section title="Удобства">
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((a: Amenity) => {
              const Icon = AMENITY_ICONS[a];
              return (
                <span
                  key={a}
                  className="inline-flex items-center gap-2 rounded-full border border-sand bg-surface px-3.5 py-2 text-sm font-medium"
                >
                  <Icon className="h-4 w-4 text-teal" />
                  {AMENITY_LABELS[a]}
                </span>
              );
            })}
          </div>
        </Section>

        {/* Rooms */}
        <Section title="Посадка и кабинки">
          <div className="grid gap-3 sm:grid-cols-2">
            {venue.rooms.map((r) => (
              <div key={r.id} className="rounded-2xl border border-sand bg-surface p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 flex-1 truncate font-semibold">{r.name}</span>
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-cream px-2.5 py-1 text-sm font-semibold">
                    <Users className="h-3.5 w-3.5 text-clay" />
                    {r.seats}
                  </span>
                </div>
                <div className="mt-1 text-sm text-muted">
                  {ROOM_TYPES[r.type].label} · {ROOM_TYPES[r.type].hint}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Menu */}
        <Section title="Меню">
          <div className="overflow-hidden rounded-2xl border border-sand bg-surface">
            {venue.menu.map((m, i) => (
              <div
                key={m.name}
                className={`flex items-center justify-between px-4 py-3 ${
                  i !== 0 ? "border-t border-sand" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {m.isMain && (
                    <span className="rounded-full bg-clay/10 px-2 py-0.5 text-xs font-semibold text-clay">
                      основное
                    </span>
                  )}
                  <span className={m.isMain ? "font-semibold" : ""}>{m.name}</span>
                </span>
                <span className="font-semibold tabular-nums">{formatSom(m.price)}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Reviews */}
        <Section title="Отзывы">
          <div className="space-y-3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-2xl border border-sand bg-surface p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{r.name}</span>
                  <Stars value={r.rating} className="text-sm" />
                </div>
                <div className="text-xs text-muted">{r.date}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink/80">{r.text}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <div className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Phone className="h-4 w-4 text-clay" />
          {venue.phone}
        </div>
      </main>

      <VenueDetailActions venue={venue} />
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-xl font-bold">{title}</h2>
      {children}
    </section>
  );
}
