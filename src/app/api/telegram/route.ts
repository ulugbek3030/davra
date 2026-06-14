import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.BOT_TOKEN ?? "";
const SECRET = process.env.TG_WEBHOOK_SECRET ?? "";
const WEBAPP_URL = process.env.WEBAPP_URL ?? "https://davra-five.vercel.app";

type TgUpdate = {
  message?: {
    text?: string;
    chat?: { id?: number };
    from?: { first_name?: string };
  };
};

async function tg(method: string, payload: unknown) {
  await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

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
  const text = msg?.text ?? "";
  const chatId = msg?.chat?.id;

  if (chatId && text.startsWith("/start")) {
    const name = msg?.from?.first_name ?? "друг";
    await tg("sendMessage", {
      chat_id: chatId,
      parse_mode: "HTML",
      text:
        `Assalomu alaykum, <b>${name}</b>! 👋\n\n` +
        "Я помогу собрать <b>давра</b> без хлопот:\n" +
        "• найти чайхану и кабинку рядом\n" +
        "• заказать плов заранее\n" +
        "• собрать кассу гапа через CLICK\n\n" +
        "Нажмите кнопку ниже 👇",
      reply_markup: {
        inline_keyboard: [[{ text: "🍽 Открыть Davra", web_app: { url: WEBAPP_URL } }]],
      },
    });
  } else if (chatId && text.startsWith("/help")) {
    await tg("sendMessage", {
      chat_id: chatId,
      parse_mode: "HTML",
      text: "❓ <b>Davra</b> — бронирование чайхан для гапа.\n\n/start — открыть приложение",
    });
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "davra-telegram-webhook" });
}
