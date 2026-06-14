"""
Davra — Telegram-бот (aiogram v3).

Запускает Mini App, принимает /start, и содержит функции уведомлений,
которые вызывает бэкенд при событиях бронирования.

Запуск:  cp .env.example .env  →  заполнить BOT_TOKEN/WEBAPP_URL  →  python main.py
"""
import asyncio
import logging

from aiogram import Bot, Dispatcher, html
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.filters import Command, CommandStart
from aiogram.types import (
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    MenuButtonWebApp,
    Message,
    WebAppInfo,
)

from config import settings

logging.basicConfig(level=logging.INFO)
dp = Dispatcher()


def open_app_kb() -> InlineKeyboardMarkup:
    """Кнопка, открывающая Mini App прямо в Telegram."""
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🍽 Открыть Davra", web_app=WebAppInfo(url=settings.webapp_url))]
        ]
    )


@dp.message(CommandStart())
async def cmd_start(message: Message) -> None:
    name = message.from_user.first_name if message.from_user else "друг"
    await message.answer(
        f"Assalomu alaykum, {html.bold(name)}! 👋\n\n"
        "Я помогу собрать <b>давра</b> без хлопот:\n"
        "• найти чайхану и кабинку рядом\n"
        "• заказать плов заранее\n"
        "• внести задаток и собрать кассу гапа через CLICK\n\n"
        "Нажмите кнопку ниже, чтобы открыть приложение 👇",
        reply_markup=open_app_kb(),
    )


@dp.message(Command("help"))
async def cmd_help(message: Message) -> None:
    await message.answer(
        "❓ <b>Davra</b> — бронирование чайхан для гапа.\n\n"
        "/start — открыть приложение\n"
        f"Поддержка: {settings.support_chat}"
    )


# ===== Уведомления (вызываются из бэкенда при событиях бронирования) =====

def _money(n: int) -> str:
    return f"{n:,}".replace(",", " ")


async def notify_owner_new_booking(bot: Bot, owner_chat_id: int, b: dict) -> None:
    """Заведению: пришла новая бронь — подтвердить/отклонить."""
    await bot.send_message(
        owner_chat_id,
        "📩 <b>Новая бронь!</b>\n\n"
        f"👥 {b['group_name']} · {b['guests']} гостей\n"
        f"🗓 {b['date']}, {b['time']}\n"
        f"🚪 {b['room_name']}\n"
        f"🍽 {b['main_dish']}\n"
        f"💳 Задаток {_money(b['deposit'])} сум оплачен",
        reply_markup=InlineKeyboardMarkup(
            inline_keyboard=[[
                InlineKeyboardButton(text="✅ Подтвердить", callback_data=f"confirm:{b['id']}"),
                InlineKeyboardButton(text="❌ Отклонить", callback_data=f"decline:{b['id']}"),
            ]]
        ),
    )


async def notify_guest_confirmed(bot: Bot, guest_chat_id: int, b: dict) -> None:
    """Гостю: заведение подтвердило бронь."""
    await bot.send_message(
        guest_chat_id,
        "✅ <b>Бронь подтверждена!</b>\n\n"
        f"📍 {b['venue']}\n🗓 {b['date']}, {b['time']}\n🚪 {b['room_name']}\n\n"
        "Хорошего гапа! 🫖",
    )


async def send_gap_reminder(bot: Bot, guest_chat_id: int, b: dict) -> None:
    """Гостю: напоминание накануне гапа + статус кассы."""
    await bot.send_message(
        guest_chat_id,
        "🔔 <b>Напоминание</b>\n\n"
        f"Завтра ваш гап в {b['venue']} в {b['time']}.\n"
        f"Касса собрана: {b['kassa_paid']}/{b['kassa_total']} ✅",
    )


async def main() -> None:
    if not settings.bot_token:
        raise SystemExit("BOT_TOKEN не задан. Скопируйте .env.example в .env и заполните.")
    bot = Bot(settings.bot_token, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    # Кнопка-меню в чате запускает Mini App
    await bot.set_chat_menu_button(
        menu_button=MenuButtonWebApp(text="Davra", web_app=WebAppInfo(url=settings.webapp_url))
    )
    logging.info("Davra bot started. WebApp: %s", settings.webapp_url)
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
