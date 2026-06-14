import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.BOT_TOKEN ?? "";
const SECRET = process.env.TG_WEBHOOK_SECRET ?? "";
const WEBAPP_URL = process.env.WEBAPP_URL ?? "https://davra-five.vercel.app";

type TgUpdate = {
  message?: {
    text?: string;
    chat?: { id?: number };
    from?: { first_name?: string };
    contact?: { phone_number?: string; first_name?: string; user_id?: number };
  };
};

async function tg(method: string, payload: unknown) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

const openAppKb = {
  inline_keyboard: [[{ text: "🍽 Davrani ochish", web_app: { url: WEBAPP_URL } }]],
};

export async function POST(req: NextRequest) {
  // Защита: Telegram присылает секрет в этом заголовке (задаётся в setWebhook)
  if (SECRET && req.headers.get("x-telegram-bot-api-secret-token") !== SECRET) {
    return new NextResponse("forbidden", { status: 403 });
  }

  let update: TgUpdate;
  try {
    update = (await req.json()) as TgUpdate;
  } catch {
    return NextResponse.json({ ok: true });
  }

  const msg = update.message;
  const chatId = msg?.chat?.id;
  const text = msg?.text ?? "";
  const contact = msg?.contact;

  if (chatId && contact?.phone_number) {
    // Контакт получен → регистрируем пользователя.
    // TODO(backend): сохранить { phone_number, user_id, first_name } в БД (блок 5).
    const name = contact.first_name ?? msg?.from?.first_name ?? "do‘st";
    await tg("sendMessage", {
      chat_id: chatId,
      parse_mode: "HTML",
      text:
        `Rahmat, <b>${name}</b>! ✅\n` +
        "Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz.\n\n" +
        "Endi choyxona tanlash, kabinka band qilish va gap kassasini yig‘ish uchun Davrani oching 👇",
      reply_markup: openAppKb,
    });
  } else if (chatId && text.startsWith("/start")) {
    const name = msg?.from?.first_name ?? "do‘st";
    await tg("sendMessage", {
      chat_id: chatId,
      parse_mode: "HTML",
      text:
        `Assalomu alaykum, <b>${name}</b>! 👋\n` +
        "<b>Davra</b> — gap uchun choyxona bron qilish.\n\n" +
        "Boshlash uchun telefon raqamingizni ulashing — bir tugma bilan ro‘yxatdan o‘tasiz 👇",
      reply_markup: {
        keyboard: [[{ text: "📱 Telefon raqamni ulashish", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
  } else if (chatId && text.startsWith("/help")) {
    await tg("sendMessage", {
      chat_id: chatId,
      parse_mode: "HTML",
      text: "❓ <b>Davra</b> — gap uchun choyxona bron qilish.\n\n/start — boshlash",
    });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "davra-telegram-webhook" });
}
