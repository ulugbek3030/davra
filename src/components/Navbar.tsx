import Link from "next/link";
import { MapPin, ChevronDown } from "lucide-react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span
        className="grid h-9 w-9 place-items-center rounded-xl text-white shadow-soft"
        style={{ backgroundImage: "linear-gradient(135deg, #C0492B, #9F3D24)" }}
        aria-hidden
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2c1.6 2.2 1.6 4.4 0 6.6-1.6-2.2-1.6-4.4 0-6.6Z"
            fill="#F4D9A0"
          />
          <circle cx="12" cy="14.5" r="6" stroke="#F4D9A0" strokeWidth="1.6" />
          <circle cx="12" cy="14.5" r="1.6" fill="#F4D9A0" />
        </svg>
      </span>
      <span className="text-xl font-extrabold tracking-tight">
        Davra
      </span>
    </Link>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Logo />

        <button className="ml-1 hidden items-center gap-1.5 rounded-full border border-sand bg-surface px-3 py-1.5 text-sm font-medium text-ink/80 transition hover:border-sand-dark sm:flex">
          <MapPin className="h-4 w-4 text-clay" />
          Тошкент
          <ChevronDown className="h-3.5 w-3.5 text-muted" />
        </button>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-sand bg-surface p-0.5 text-xs font-semibold md:flex">
            <span className="rounded-full bg-ink px-2.5 py-1 text-white">UZ</span>
            <span className="px-2.5 py-1 text-muted">RU</span>
            <span className="px-2.5 py-1 text-muted">КИР</span>
          </div>
          <Link
            href="/owner"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition hover:bg-sand/60 sm:block"
          >
            Для заведений
          </Link>
          <button className="rounded-full bg-clay px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-clay-dark">
            Войти
          </button>
        </div>
      </div>
    </header>
  );
}
