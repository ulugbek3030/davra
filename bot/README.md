# Davra — Telegram-бот

Бот запускает Mini App (наш Next.js фронт) прямо в Telegram и шлёт уведомления о
бронях, подтверждениях и напоминаниях о гапе.

## Запуск

1. Создайте бота у [@BotFather](https://t.me/BotFather) → получите `BOT_TOKEN`.
2. У @BotFather: **Bot Settings → Menu Button / Web App** — укажите HTTPS-URL Mini App.
3. Настройте окружение:
   ```bash
   cd bot
   python -m venv .venv && source .venv/bin/activate
   pip install -r requirements.txt
   cp .env.example .env        # заполните BOT_TOKEN и WEBAPP_URL
   python main.py
   ```

## Что внутри
- `/start` — приветствие + кнопка «🍽 Открыть Davra» (web_app) + кнопка-меню чата.
- `notify_owner_new_booking()` — заведению о новой брони (подтвердить/отклонить).
- `notify_guest_confirmed()` — гостю о подтверждении.
- `send_gap_reminder()` — напоминание накануне гапа + статус кассы.

Функции уведомлений вызывает бэкенд (FastAPI) при соответствующих событиях.

## Mini App
Внутри Telegram фронт получает `initData` (подписанные данные пользователя),
применяет тему, `expand()`, `HapticFeedback` и `BackButton` — см.
`src/lib/telegram.ts` и `src/components/TelegramProvider.tsx`.
Подпись `initData` нужно проверять на бэкенде (HMAC-SHA256 с токеном бота).
