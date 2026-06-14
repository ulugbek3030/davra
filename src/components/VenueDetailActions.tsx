"use client";

import { useState } from "react";
import type { Venue } from "@/lib/venues";
import { Star } from "lucide-react";
import { useT } from "@/i18n/LocaleProvider";
import { BookingSheet } from "./BookingSheet";

export function VenueDetailActions({ venue }: { venue: Venue }) {
  const { t, moneyShort } = useT();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand bg-surface/95 backdrop-blur-md">
        <div
          className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 pt-3 sm:px-6"
          style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                {t("venue.priceFrom")}
                {moneyShort(venue.avgCheckPerGuest)}
              </span>
              <span className="text-sm text-muted">{t("common.perGuest")}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted">
              <Star className="h-3.5 w-3.5 fill-saffron text-saffron" />
              {venue.rating.toFixed(1)} · {venue.reviewsCount} {t("venue.reviewsWord")}
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className="rounded-full bg-clay px-7 py-3.5 text-base font-semibold text-white shadow-lift transition hover:bg-clay-dark"
          >
            {t("card.book")}
          </button>
        </div>
      </div>

      {open && <BookingSheet venue={venue} onClose={() => setOpen(false)} />}
    </>
  );
}
