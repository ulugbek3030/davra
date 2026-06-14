import type { CoverVariant, Dish } from "@/lib/venues";
import { Camera } from "lucide-react";

const GRADIENTS: Record<CoverVariant, string> = {
  clay: "linear-gradient(135deg, #C0492B 0%, #8E3320 100%)",
  teal: "linear-gradient(135deg, #17596B 0%, #0C3A47 100%)",
  saffron: "linear-gradient(135deg, #E2A12B 0%, #C0760F 100%)",
  plum: "linear-gradient(135deg, #7A3B52 0%, #4E2438 100%)",
};

const DISH_GLYPH: Record<string, string> = {
  Плов: "🍚",
  "Казан-кабоб": "🍖",
  Тандыр: "🔥",
  Норин: "🍜",
  Шашлык: "🍢",
  Манты: "🥟",
  Бешбармак: "🍲",
  Шурпа: "🥣",
  Самса: "🥐",
};

const PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cg fill='%23ffffff' fill-opacity='0.16'%3E%3Ccircle cx='24' cy='24' r='2.5'/%3E%3Ccircle cx='0' cy='0' r='1.6'/%3E%3Ccircle cx='48' cy='0' r='1.6'/%3E%3Ccircle cx='0' cy='48' r='1.6'/%3E%3Ccircle cx='48' cy='48' r='1.6'/%3E%3Cpath d='M24 13 L26 22 L35 24 L26 26 L24 35 L22 26 L13 24 L22 22 Z'/%3E%3C/g%3E%3C/svg%3E")`;

export function CoverArt({
  variant,
  dish,
  photoCount = 12,
  className = "",
  glyphClassName = "text-6xl",
  showBadge = true,
}: {
  variant: CoverVariant;
  dish?: Dish;
  photoCount?: number;
  className?: string;
  glyphClassName?: string;
  showBadge?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundImage: GRADIENTS[variant] }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: PATTERN, backgroundSize: "48px 48px" }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`drop-shadow-sm ${glyphClassName}`} aria-hidden>
          {dish ? DISH_GLYPH[dish] ?? "🫖" : "🫖"}
        </span>
      </div>
      {showBadge && (
        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <Camera className="h-3.5 w-3.5" /> {photoCount}
        </div>
      )}
    </div>
  );
}
