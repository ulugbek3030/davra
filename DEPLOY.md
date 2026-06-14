# Деплой Davra

## Фронт (Next.js) → Vercel — рекомендуется, zero-config
1. Залейте репозиторий на GitHub.
2. [Vercel](https://vercel.com) → **New Project** → импортируйте репозиторий.
   - Framework: **Next.js** (определится автоматически)
   - Root Directory: корень репозитория (где `package.json`)
   - Build Command: `next build` (по умолчанию)
3. Deploy → получите домен вида `https://davra.vercel.app` (позже подключите `davra.uz`).

Альтернатива — Vercel CLI:
```bash
npm i -g vercel
vercel          # preview-деплой
vercel --prod   # продакшн
```

## Telegram-бот (`bot/`) → отдельный сервис (Railway / Render / VPS)
Бот — long-running процесс, на Vercel не живёт.
1. Разверните папку `bot/` на Railway/Render/VPS (Python 3.11+).
2. Переменные окружения: `BOT_TOKEN`, `WEBAPP_URL=https://<ваш-домен>`.
3. Запуск: `pip install -r requirements.txt && python main.py`.
4. У [@BotFather](https://t.me/BotFather): **Bot Settings → Menu Button / Web App** → укажите HTTPS-домен фронта.

## Локальная проверка
```bash
npm install
npm run build   # продакшн-сборка (проверка типов + статика) — проходит ✅
npm run dev     # http://localhost:3000
```

## Что нужно для боевого запуска (блок 5)
- Бэкенд **FastAPI + PostgreSQL** вместо мок-данных (`src/lib/*Data.ts`).
- Боевая интеграция **CLICK Pay** (Prepare/Complete) + проверка подписи Telegram `initData` (HMAC-SHA256).
- Домен `davra.uz` + HTTPS (обязателен для Telegram Mini App).
