import { Send } from "lucide-react";

export function Footer() {
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
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Бронирование чайхан для гапа в Ташкенте. Кабинки, предзаказ блюда,
              задаток и касса гапа онлайн.
            </p>
            <a
              href="#"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-dark"
            >
              <Send className="h-4 w-4" />
              Открыть в Telegram
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <FooterCol
              title="Гостям"
              links={["Найти чайхану", "Касса гапа", "Как это работает", "Помощь"]}
            />
            <FooterCol
              title="Заведениям"
              links={["Добавить заведение", "Личный кабинет", "Тарифы", "Продвижение"]}
            />
            <FooterCol
              title="Davra"
              links={["О проекте", "Контакты", "Оферта", "Конфиденциальность"]}
            />
          </div>
        </div>

        <div className="mt-10 border-t border-sand pt-6 text-sm text-muted">
          © {2026} Davra · Ташкент, Узбекистан
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <div className="text-sm font-bold text-ink">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition hover:text-clay">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
