"""Конфигурация Telegram-бота Davra (читается из .env)."""
import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    bot_token: str = os.getenv("BOT_TOKEN", "")
    webapp_url: str = os.getenv("WEBAPP_URL", "https://davra.uz")
    support_chat: str = os.getenv("SUPPORT_CHAT", "@davra_support")


settings = Settings()
