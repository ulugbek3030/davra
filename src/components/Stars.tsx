import { Star } from "lucide-react";

export function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Star className="h-4 w-4 fill-saffron text-saffron" />
      <span className="font-semibold tabular-nums">{value.toFixed(1)}</span>
    </span>
  );
}
