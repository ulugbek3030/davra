"use client";

import type { BookingStatus } from "@/lib/ownerData";
import { useT } from "@/i18n/LocaleProvider";

const CLS: Record<BookingStatus, string> = {
  new: "bg-saffron text-ink",
  confirmed: "bg-leaf/15 text-leaf",
  declined: "bg-ink/10 text-muted",
  completed: "bg-teal/10 text-teal",
};

export function StatusPill({ status }: { status: BookingStatus }) {
  const { t } = useT();
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CLS[status]}`}>
      {t(`enums.bookingStatus.${status}`)}
    </span>
  );
}
