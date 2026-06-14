"""
Davra — Telegram-бот (aiogram v3). Reference-реализация (polling).
Боевой бот работает как webhook на Vercel: src/app/api/telegram/route.ts.

Флоу: /start → просим поделиться контактом → по контакту регистрируем
и показываем кнопку запуска Mini App.

Запуск:  cp .env.example .env  →  заполнить BOT_TOKEN/WEBAPP_URL  →  python main.py
"""
import asyncio
import logging

from aiogram import Bot, Dispatcher, F, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    KeyboardButton,
    MenuButtonWebApp,
    Message,
    ReplyKeyboardMarkup,
    WebAppInfo,
)

from config import settings

logging.basicConfig(level=logging.INFO)
dp = Dispatcher()


def open_app_kb() -> InlineKeyboardMarkup:
    """Inline-кнопка, открывающая Mini App после регистрации."""
    return InlineKeyboardMarkup(
        inline_keyboard=[[InlineKeyboardButton(text="🍽 Davrani ochish", web_app=WebAppInfo(url=settings.webapp_url))]]
    )


def share_contact_kb() -> ReplyKeyboardMarkup:
    """Reply-клавиатура с запросом контакта."""
    return ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="📱 Telefon raqamni ulashish", request_contact=True)]],
        resize_keyboard=True,
        one_time_keyboard=True,
    )


@dp.message(CommandStart())
async def cmd_start(message: Message) -> None:
    name = message.from_user.first_name if message.from_user else "do‘st"
    await message.answer(
        f"Assalomu alaykum, {html.bold(name)}! 👋\n"
        "<b>Davra</b> — gap uchun choyxona bron qilish.\n\n"
        "Boshlash uchun telefon raqamingizni ulashing — bir tugma bilan ro‘yxatdan o‘tasiz 👇",
        reply_markup=share_contact_kb(),
    )


@dp.message(F.contact)
async def on_contact(message: Message) -> None:
    """Пользователь поделился контактом → регистрируем."""
    c = message.contact
    name = (c.first_name if c else None) or (message.from_user.first_name if message.from_user else "do‘st")
    # TODO(backend): сохранить { c.phone_number, c.user_id, name } в БД (блок 5).
    await message.answer(
        f"Rahmat, {html.bold(name)}! ✅\n"
        "Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz.\n\n"
        "Endi choyxona tanlash, kabinka band qilish va gap kassasini yig‘ish uchun Davrani oching 👇",
        reply_markup=open_app_kb(),
    )


@dp.message(Command("help"))
async def cmd_help(message: Message) -> None:
    await message.answer(
        "❓ <b>Davra</b> — gap uchun choyxona bron qilish.\n\n"
        "/start — boshlash\n"
        f"Yordam: {settings.support_chat}"
    )


# ===== Уведомления (вызываются из бэкенда при событиях бронирования) =====

def _money(n: int) -> str:
    return f"{n:,}".replace(",", " ")


async def notify_owner_new_booking(bot: Bot, owner_chat_id: int, b: dict) -> None:
    await bot.send_message(
        owner_chat_id,
        "📩 <b>Yangi bron!</b>\n\n"
        f"👥 {b['group_name']} · {b['guests']} kishi\n"
        f"🗓 {b['date']}, {b['time']}\n"
        f"🚪 {b['room_name']}\n"
        f"🍽 {b['main_dish']}\n"
        f"💳 Oldindan to‘lov {_money(b['deposit'])} so‘m to‘landi",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[[
                InlineKeyboardButton(text="✅ Tasdiqlash", callback_data=f"confirm:{b['id']}"),
                InlineKeyboardButton(text="❌ Rad etish", callback_data=f"decline:{b['id']}"),
            ]]
        ),
    )


async def notify_guest_confirmed(bot: Bot, guest_chat_id: int, b: dict) -> None:
    await bot.send_message(
        guest_chat_id,
        "✅ <b>Bron tasdiqlandi!</b>\n\n"
        f"📍 {b['venue']}\n🗓 {b['date']}, {b['time']}\n🚪 {b['room_name']}\n\n"
        "Davrangiz xayrli o‘tsin! 🫖",
    )


async def send_gap_reminder(bot: Bot, guest_chat_id: int, b: dict) -> None:
    await bot.send_message(
        guest_chat_id,
        "🔔 <b>Eslatma</b>\n\n"
        f"Ertaga {b['venue']}da soat {b['time']}da davrangiz bor.\n"
        f"Kassa yig‘ildi: {b['kassa_paid']}/{b['kassa_total']} ✅",
    )


async def main() -> None:
    if not settings.bot_token:
        raise SystemExit("BOT_TOKEN не задан. Скопируйте .env.example в .env и заполните.")
    bot = Bot(settings.bot_token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(text="Davra", web_app=WebAppInfo(url=settings.webapp_url))
    )
    logging.info("Davra bot started. WebApp: %s", settings.webapp_url)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
