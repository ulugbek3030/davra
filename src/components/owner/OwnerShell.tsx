"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Store,
  UtensilsCrossed,
  DoorOpen,
  Crown,
  Menu as MenuIcon,
  X,
  Bell,
  ArrowUpRight,
} from "lucide-react";
import { MY_VENUE, BOOKINGS } from "@/lib/ownerData";
import { useT } from "@/i18n/LocaleProvider";

const NAV = [
  { href: "/owner", labelKey: "owner.shell.nav.overview", icon: LayoutDashboard },
  { href: "/owner/bookings", labelKey: "owner.shell.nav.bookings", icon: CalendarCheck },
  { href: "/owner/venue", labelKey: "owner.shell.nav.venue", icon: Store },
  { href: "/owner/menu", labelKey: "owner.shell.nav.menu", icon: UtensilsCrossed },
  { href: "/owner/rooms", labelKey: "owner.shell.nav.rooms", icon: DoorOpen },
  { href: "/owner/plans", labelKey: "owner.shell.nav.plans", icon: Crown },
];

function NavLinks({
  pathname,
  newCount,
  onNavigate,
}: {
  pathname: string;
  newCount: number;
  onNavigate: () => void;
}) {
  const { t } = useT();
  return (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
              active ? "bg-clay text-white shadow-soft" : "text-ink/75 hover:bg-cream"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" />
            {t(item.labelKey)}
            {item.href === "/owner/bookings" && newCount > 0 && (
              <span
                className={`ml-auto rounded-full px-1.5 py-0.5 text-xs font-bold ${
                  active ? "bg-white/25 text-white" : "bg-clay text-white"
                }`}
              >
                {newCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function OwnerShell({ children }: { children: React.ReactNode }) {
  const { t } = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const newCount = BOOKINGS.filter((b) => b.status === "new").length;

  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sand bg-surface p-4 lg:flex">
        <Link href="/owner" className="flex items-center gap-2.5 px-1.5 py-2">
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-sm font-bold text-white"
            style={{ backgroundImage: "linear-gradient(135deg, #C0492B, #9F3D24)" }}
          >
            D
          </span>
          <span className="text-lg font-extrabold">
            Davra <span className="text-xs font-semibold text-muted">{t("owner.shell.brand")}</span>
          </span>
        </Link>
        <div className="mt-6 flex-1">
          <NavLinks pathname={pathname} newCount={newCount} onNavigate={() => setOpen(false)} />
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-sand px-3.5 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-cream"
        >
          <ArrowUpRight className="h-4 w-4" />
          {t("owner.shell.toSite")}
        </Link>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/45 animate-overlay-in" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-surface p-4 shadow-lift">
            <div className="flex items-center justify-between px-1.5 py-2">
              <span className="text-lg font-extrabold">{t("owner.shell.brandFull")}</span>
              <button onClick={() => setOpen(false)} className="text-muted" aria-label={t("owner.shell.closeMenu")}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <NavLinks pathname={pathname} newCount={newCount} onNavigate={() => setOpen(false)} />
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-sand bg-cream/85 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setOpen(true)}
            aria-label={t("owner.shell.openMenu")}
            className="grid h-9 w-9 place-items-center rounded-lg border border-sand bg-surface lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="font-semibold">{MY_VENUE.name}</div>
          <span className="hidden items-center gap-1 rounded-full bg-teal/10 px-2.5 py-1 text-xs font-semibold text-teal sm:flex">
            {t(`enums.districts.${MY_VENUE.district}`)}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              aria-label={t("owner.shell.notifications")}
              className="relative grid h-9 w-9 place-items-center rounded-full border border-sand bg-surface text-muted"
            >
              <Bell className="h-[18px] w-[18px]" />
              {newCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-clay px-1 text-[10px] font-bold text-white">
                  {newCount}
                </span>
              )}
            </button>
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundImage: "linear-gradient(135deg, #17596B, #0F4250)" }}
            >
              Б
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
