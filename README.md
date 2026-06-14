# 🫖 Davra

**Бронирование чайхан для гапа в Узбекистане.** Организатор находит чайхану,
бронирует изолированную кабинку, заказывает блюдо заранее, вносит задаток и
собирает кассу гапа — в вебе и Telegram Mini App, оплата через CLICK.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ulugbek3030/davra)

## Что внутри

| Раздел | Маршрут | Описание |
|---|---|---|
| 👤 Гость | `/`, `/venue/[slug]` | Каталог + фильтры (район, цена, блюдо, удобства), карточка заведения, бронь с задатком и кассой гапа |
| 🏪 Заведение | `/owner` | Дашборд, брони (подтв/откл), профиль, меню, кабинки, тарифы + продвижение |
| 🛡 Админ Davra | `/admin` | Обзор платформы (GMV, выручка по источникам), модерация заведений, финансы, брони |
| ✈️ Telegram | `/tg-demo`, `bot/` | Mini App (тема, haptics, BackButton) + бот на aiogram |

## Стек
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react ·
шрифты Manrope + Lora. Бот — Python / aiogram. Планируется: FastAPI + PostgreSQL +
боевой CLICK Pay.

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # продакшн-сборка
```

## Деплой
Фронт — на Vercel (кнопка выше или `vercel.com/new`). Бот — отдельно
(Railway/Render). Подробнее: **[DEPLOY.md](DEPLOY.md)**.

## Документы
- [PRD.md](PRD.md) — продуктовые решения, монетизация, дорожная карта.
- [DEPLOY.md](DEPLOY.md) — инструкция по развёртыванию.

> Данные сейчас мок (`src/lib/*Data.ts`). Следующий блок — бэкенд (FastAPI +
> PostgreSQL) и боевая интеграция CLICK Pay.
