"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTelegram } from "@/lib/telegram";

export interface DavraUser {
  name?: string;
  phone?: string;
  source: "phone" | "telegram";
}

interface AuthContextValue {
  user: DavraUser | null;
  register: (phone: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "davra-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { tg, isTelegram } = useTelegram();
  const [user, setUser] = useState<DavraUser | null>(null);

  useEffect(() => {
    let next: DavraUser | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) next = JSON.parse(raw) as DavraUser;
    } catch {
      /* no-op */
    }
    // Auto-login inside Telegram (user already shared contact via the bot)
    if (!next && isTelegram && tg?.initDataUnsafe?.user) {
      next = { name: tg.initDataUnsafe.user.first_name, source: "telegram" };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* no-op */
      }
    }
    if (next) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(next);
    }
  }, [isTelegram, tg]);

  const register = useCallback((phone: string, name?: string) => {
    const u: DavraUser = { phone, name, source: "phone" };
    setUser(u);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    } catch {
      /* no-op */
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
  }, []);

  return <AuthContext.Provider value={{ user, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
