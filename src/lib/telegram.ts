"use client";

import { createContext, useContext } from "react";

// Минимальные типы Telegram WebApp SDK (то, что мы используем)
export interface TgWebApp {
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: Record<string, string>;
  initData: string;
  initDataUnsafe: { user?: { id: number; first_name: string; username?: string } };
  isExpanded: boolean;
  viewportHeight: number;
  ready(): void;
  expand(): void;
  close(): void;
  setHeaderColor(color: string): void;
  setBackgroundColor(color: string): void;
  MainButton: {
    setText(text: string): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    onClick(cb: () => void): void;
    offClick(cb: () => void): void;
    setParams(p: Record<string, unknown>): void;
  };
  BackButton: {
    show(): void;
    hide(): void;
    onClick(cb: () => void): void;
    offClick(cb: () => void): void;
  };
  HapticFeedback: {
    impactOccurred(style: "light" | "medium" | "heavy" | "rigid" | "soft"): void;
    notificationOccurred(type: "error" | "success" | "warning"): void;
    selectionChanged(): void;
  };
}

export function getTelegram(): TgWebApp | null {
  if (typeof window === "undefined") return null;
  return (window as unknown as { Telegram?: { WebApp?: TgWebApp } }).Telegram?.WebApp ?? null;
}

/** Реальный Telegram (а не просто загруженный скрипт в обычном браузере). */
export function isRealTelegram(tg: TgWebApp | null): boolean {
  return !!tg && !!tg.platform && tg.platform !== "unknown";
}

type Haptic = "light" | "medium" | "heavy" | "success" | "error" | "warning" | "selection";
export function haptic(type: Haptic) {
  const tg = getTelegram();
  if (!tg || !isRealTelegram(tg)) return;
  try {
    if (type === "selection") tg.HapticFeedback.selectionChanged();
    else if (type === "success" || type === "error" || type === "warning")
      tg.HapticFeedback.notificationOccurred(type);
    else tg.HapticFeedback.impactOccurred(type);
  } catch {
    /* no-op */
  }
}

export interface TgContextValue {
  tg: TgWebApp | null;
  isTelegram: boolean;
  user?: { first_name: string; username?: string };
}

export const TelegramContext = createContext<TgContextValue>({ tg: null, isTelegram: false });
export const useTelegram = () => useContext(TelegramContext);
