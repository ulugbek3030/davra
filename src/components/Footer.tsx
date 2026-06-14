"use client";

import { Send } from "lucide-react";
import { useT } from "@/i18n/LocaleProvider";

export function Footer() {
  const { t } = useT();
  const cols = [
    {
      title: t("footer.colGuests"),
      links: [t("footer.lGuestFind"), t("footer.lGuestKassa"), t("footer.lGuestHow"), t("footer.lGuestHelp")],
    },
    {
      title: t("footer.colVenues"),
      links: [t("footer.lVenAdd"), t("footer.lVenCabinet"), t("footer.lVenTariffs"), t("footer.lVenPromo")],
    },
    {
      title: t("footer.colDavra"),
      links: [t("footer.lDavraAbout"), t("footer.lDavraContacts"), t("footer.lDavraOffer"), t("footer.lDavraPrivacy")],
    },
  ];

  return (
    <footer className="mt-16 border-t border-sand bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 place-items-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundImage: "linear-gradient(135deg, #C0492B, #9F3D24)" }}
              >
                D
              </span>
              <span className="text-lg font-extrabold">Davra</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t("footer.tagline")}</p>
            <a
              href="https://t.me/Davra_choyxona_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-dark"
            >
              <Send className="h-4 w-4" />
              {t("footer.openTelegram")}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-sm font-bold text-ink">{c.title}</div>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="transition hover:text-clay">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-sand pt-6 text-sm text-muted">
          © {2026} Davra · {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
