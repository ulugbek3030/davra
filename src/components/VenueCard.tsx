"use client";

import Link from "next/link";
import { MapPin, BadgeCheck } from "lucide-react";
import type { Venue } from "@/lib/venues";
import { formatSomShort } from "@/lib/utils";
import { CoverArt } from "./CoverArt";
import { Stars } from "./Stars";
import { AMENITY_ICONS } from "./icons";

export function VenueCard({ venue, onBook }: { venue: Venue; onBook: (v: Venue) => void }) {
  const previewAmenities = venue.amenities.slice(0, 4);

  return (
    <Link
      href={`/venue/${venue.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-sand bg-surface shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative">
        <CoverArt
          variant={venue.cover}
          dish={venue.signatureDishes[0]}
          photoCount={8 + (venue.reviewsCount % 9)}
          className="h-44 w-full"
        />
        {venue.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-saffron px-2.5 py-1 text-xs font-bold text-ink shadow-soft">
            ★ Популярное
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-bold leading-tight">
            {venue.name}
            {venue.verified && (
              <BadgeCheck className="ml-1 inline h-4 w-4 -translate-y-0.5 text-teal" />
            )}
          </h3>
          <Stars value={venue.rating} className="shrink-0 text-sm" />
        </div>

        <p className="mt-0.5 text-sm text-muted">{venue.tagline}</p>

        <div className="mt-2 flex items-center gap-1 text-sm text-muted">
          <MapPin className="h-3.5 w-3.5 text-clay" />
          {venue.district}
          <span className="text-sand-dark">·</span>
          <span>до {venue.capacityMax} мест</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {venue.signatureDishes.slice(0, 3).map((d) => (
            <span
              key={d}
              className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-ink/70"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-2.5 text-muted">
          {previewAmenities.map((a) => {
            const Icon = AMENITY_ICONS[a];
            return <Icon key={a} className="h-4 w-4" />;
          })}
          {venue.amenities.length > 4 && (
            <span className="text-xs">+{venue.amenities.length - 4}</span>
          )}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-sand pt-3">
          <div>
            <div className="text-xs text-muted">средний чек</div>
            <div className="font-bold">
              {formatSomShort(venue.avgCheckPerGuest)}{" "}
              <span className="text-xs font-normal text-muted">/ чел</span>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBook(venue);
            }}
            className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white transition hover:bg-clay-dark"
          >
            Забронировать
          </button>
        </div>
      </div>
    </Link>
  );
}
