import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 180000 -> "180 000 сум" */
export function formatSom(n: number): string {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n)) + " сум";
}

/** 180000 -> "180 тыс", 1500000 -> "1,5 млн", 1.24e9 -> "1,24 млрд" */
export function formatSomShort(n: number): string {
  if (n >= 1_000_000_000) {
    const b = n / 1_000_000_000;
    return (Number.isInteger(b) ? b.toString() : b.toFixed(2).replace(".", ",")) + " млрд";
  }
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return (Number.isInteger(m) ? m.toString() : m.toFixed(1).replace(".", ",")) + " млн";
  }
  if (n >= 1000) return Math.round(n / 1000) + " тыс";
  return String(n);
}

/** Russian plural: declension(2, ["гость","гостя","гостей"]) -> "гостя" */
export function plural(n: number, forms: [string, string, string]): string {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}
