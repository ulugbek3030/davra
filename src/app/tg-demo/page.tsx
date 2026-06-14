import Link from "next/link";
import { ArrowLeft, Bell, CalendarCheck, Wallet, Send, ExternalLink } from "lucide-react";

export default function TgDemoPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6" style={{ backgroundImage: "linear-gradient(180deg,#FBF6EE,#EFE3D0)" }}>
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition hover:text-clay">
          <ArrowLeft className="h-4 w-4" />
          На главную
        </Link>

        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#3390EC]/10 px-3 py-1 text-xs font-semibold text-[#2476cc]">
            <Send className="h-3.5 w-3.5" />
            Telegram Mini App
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Davra живёт в Telegram</h1>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            ~88% узбекистанцев в Telegram. Бот открывает приложение в один тап, шлёт брони и напоминает о гапе.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2">
          {/* Phone */}
          <div className="mx-auto w-full max-w-[330px] overflow-hidden rounded-[2.6rem] border-[10px] border-[#15171a] shadow-lift">
            {/* TG header */}
            <div className="flex items-center gap-2.5 bg-[#527da3] px-4 pb-3 pt-4 text-white">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold">D</span>
              <div className="leading-tight">
                <div className="text-[15px] font-semibold">Davra</div>
                <div className="text-xs text-white/70">бот</div>
              </div>
            </div>

            {/* Chat */}
            <div className="space-y-2.5 px-3 py-4" style={{ minHeight: 480, backgroundColor: "#cad6e2" }}>
              <Bubble time="14:02">
                Assalomu alaykum, Улугбек! 👋
                <br />
                <br />
                Я помогу собрать <b>давра</b> без хлопот:
                <br />• найти чайхану и кабинку рядом
                <br />• заказать плов заранее
                <br />• собрать кассу гапа через CLICK
              </Bubble>

              <button className="flex w-[82%] items-center justify-center gap-2 rounded-2xl bg-white py-2.5 text-sm font-semibold text-[#3390EC] shadow-sm">
                🍽 Открыть Davra
              </button>

              <Bubble time="14:05">
                ✅ <b>Бронь подтверждена!</b>
                <br />
                <br />📍 Beshqozon
                <br />🗓 20 июня, 19:00
                <br />🚪 VIP-кабинка «Регистон»
                <br />
                <br />Хорошего гапа! 🫖
              </Bubble>

              <Bubble time="18:30">
                🔔 <b>Напоминание</b>
                <br />
                <br />Завтра ваш гап в Beshqozon в 19:00.
                <br />Касса собрана: 8/8 ✅
              </Bubble>
            </div>

            {/* Input bar */}
            <div className="flex items-center gap-2 bg-white px-3 py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#3390EC] text-xs font-bold text-white">
                ≡
              </span>
              <div className="flex-1 rounded-full bg-[#f1f1f4] px-3 py-1.5 text-sm text-muted">Сообщение…</div>
              <Send className="h-5 w-5 text-[#3390EC]" />
            </div>
          </div>

          {/* Explanation */}
          <div>
            <div className="grid grid-cols-2 gap-4">
              <Stat value="~88%" label="узбекистанцев в Telegram" />
              <Stat value="18 млн" label="пользователей" />
            </div>

            <div className="mt-5 space-y-3">
              <Feature icon={ExternalLink} title="Запуск в один тап" text="Кнопка-меню и /start открывают каталог Davra прямо в Telegram — без установки приложения." />
              <Feature icon={CalendarCheck} title="Брони и подтверждения" text="Заведение получает заявку с кнопками «Подтвердить / Отклонить», гость — мгновенное подтверждение." />
              <Feature icon={Wallet} title="Касса и напоминания" text="Бот шлёт ссылку на оплату своей доли и напоминает о гапе накануне со статусом кассы." />
            </div>

            {/* Owner notification preview */}
            <div className="mt-6 rounded-2xl border border-sand bg-surface p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted">
                <Bell className="h-4 w-4 text-clay" />
                Уведомление заведению
              </div>
              <div className="rounded-2xl bg-[#cad6e2] p-3">
                <div className="rounded-xl rounded-tl-sm bg-white px-3 py-2 text-sm">
                  📩 <b>Новая бронь!</b>
                  <br />👥 Гап одноклассников · 12 гостей
                  <br />🗓 20 июня, 19:00
                  <br />🍽 Плов «Тойбоп» ×12
                  <br />💳 Задаток 408 000 сум оплачен
                  <div className="mt-2 flex gap-2">
                    <span className="flex-1 rounded-lg bg-white py-1.5 text-center text-xs font-semibold text-[#3390EC] shadow-sm">✅ Подтвердить</span>
                    <span className="flex-1 rounded-lg bg-white py-1.5 text-center text-xs font-semibold text-[#3390EC] shadow-sm">❌ Отклонить</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-muted">
              Код бота — в <code className="rounded bg-cream px-1.5 py-0.5">bot/</code> (aiogram, Python). Фронт уже
              читает <code className="rounded bg-cream px-1.5 py-0.5">initData</code>, тему и haptics Telegram.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Bubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="relative w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-[13px] leading-snug text-ink shadow-sm">
      {children}
      <span className="ml-2 inline-block align-bottom text-[10px] text-muted">{time}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-sand bg-surface p-4">
      <div className="font-display text-2xl font-bold text-[#2476cc]">{value}</div>
      <div className="text-sm text-muted">{label}</div>
    </div>
  );
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-sand bg-surface p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#3390EC]/10 text-[#2476cc]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted">{text}</div>
      </div>
    </div>
  );
}
