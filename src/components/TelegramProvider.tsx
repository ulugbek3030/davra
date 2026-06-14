"use client";

import { useCallback, useEffect, useState } from "react";
import Script from "next/script";
import {
  TelegramContext,
  getTelegram,
  isRealTelegram,
  type TgContextValue,
} from "@/lib/telegram";

const BRAND_BG = "#FBF6EE";

export function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [ctx, setCtx] = useState<TgContextValue>({ tg: null, isTelegram: false });

  const init = useCallback(() => {
    const tg = getTelegram();
    if (!tg) return;
    try {
      tg.ready();
      tg.expand();
      if (isRealTelegram(tg)) {
        tg.setHeaderColor(BRAND_BG);
        tg.setBackgroundColor(BRAND_BG);
      }
    } catch {
      /* no-op */
    }
    setCtx({
      tg,
      isTelegram: isRealTelegram(tg),
      user: tg.initDataUnsafe?.user,
    });
  }, []);

  useEffect(() => {
    if (getTelegram()) init();
  }, [init]);

  return (
    <>
      <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="afterInteractive"
        onLoad={init}
      />
      <TelegramContext.Provider value={ctx}>{children}</TelegramContext.Provider>
    </>
  );
}
