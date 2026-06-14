"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Store,
  CalendarCheck,
  Wallet,
  Menu as MenuIcon,
  X,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { ADMIN_VENUES } from "@/lib/adminData";

const NAV = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/venues", label: "Заведения", icon: Store },
  { href: "/admin/bookings", label: "Брони", icon: CalendarCheck },
  { href: "/admin/finance", label: "Финансы", icon: Wallet },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const pending = ADMIN_VENUES.filter((v) => v.status === "pending").length;

  const NavLinks = () => (
    <nav className="space-y-1">
      {NAV.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
              active ? "bg-white/15 text-white" : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className="h-[18px] w-[18px]" />
            {item.label}
            {item.href === "/admin/venues" && pending > 0 && (
              <span className="ml-auto rounded-full bg-saffron px-1.5 py-0.5 text-xs font-bold text-ink">
                {pending}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const sidebarStyle = { backgroundImage: "linear-gradient(180deg,#0F4250,#0a2f39)" };

  return (
    <div className="min-h-screen bg-cream">
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 hidden w-64 flex-col p-4 lg:flex"
        style={sidebarStyle}
      >
        <Link href="/admin" className="flex items-center gap-2.5 px-1.5 py-2 text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 text-sm font-bold">D</span>
          <span className="text-lg font-extrabold">
            Davra <span className="rounded bg-saffron px-1.5 py-0.5 text-[10px] font-bold text-ink">ADMIN</span>
          </span>
        </Link>
        <div className="mt-6 flex-1">
          <NavLinks />
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xl border border-white/15 px-3.5 py-2.5 text-sm font-medium text-white/75 transition hover:bg-white/10"
        >
          <ArrowUpRight className="h-4 w-4" />
          На сайт Davra
        </Link>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50 animate-overlay-in" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 p-4 shadow-lift" style={sidebarStyle}>
            <div className="flex items-center justify-between px-1.5 py-2 text-white">
              <span className="text-lg font-extrabold">Davra ADMIN</span>
              <button onClick={() => setOpen(false)} className="text-white/70">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <NavLinks />
            </div>
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-sand bg-cream/85 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-sand bg-surface lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 font-semibold">
            <ShieldCheck className="h-5 w-5 text-teal" />
            Админ-панель
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white"
              style={{ backgroundImage: "linear-gradient(135deg,#0F4250,#17596B)" }}
            >
              А
            </span>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
