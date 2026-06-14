import type { BookingStatus } from "@/lib/ownerData";
import { STATUS_LABEL } from "@/lib/ownerData";

const CLS: Record<BookingStatus, string> = {
  new: "bg-saffron text-ink",
  confirmed: "bg-leaf/15 text-leaf",
  declined: "bg-ink/10 text-muted",
  completed: "bg-teal/10 text-teal",
};

export function StatusPill({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${CLS[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}
