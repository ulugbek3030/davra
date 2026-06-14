import { Search, CalendarCheck, Wallet, PartyPopper } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Найдите чайхану",
    text: "Фильтруйте по району, цене, блюду и удобствам — от тапчана до банкетного зала.",
  },
  {
    icon: CalendarCheck,
    title: "Забронируйте кабинку",
    text: "Выберите изолированную комнату, дату и закажите основное блюдо заранее.",
  },
  {
    icon: Wallet,
    title: "Соберите кассу",
    text: "Оплатите задаток через CLICK и разделите сумму между друзьями в один тап.",
  },
  {
    icon: PartyPopper,
    title: "Проведите гап",
    text: "Заведение получает бронь и напоминания. Вам остаётся только наслаждаться вечером.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-sand bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Как это работает</h2>
          <p className="mx-auto mt-2 max-w-md text-muted">
            Организовать давра — теперь дело пары минут, а не десяти звонков
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-3xl border border-sand bg-surface p-6 shadow-soft"
            >
              <span className="absolute right-5 top-5 font-display text-3xl font-bold text-sand-dark">
                {i + 1}
              </span>
              <span
                className="grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{ backgroundImage: "linear-gradient(135deg, #C0492B, #9F3D24)" }}
              >
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
