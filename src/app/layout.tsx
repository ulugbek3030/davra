import type { Metadata, Viewport } from "next";
import { Manrope, Lora } from "next/font/google";
import "./globals.css";
import { TelegramProvider } from "@/components/TelegramProvider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://davra.uz"),
  title: {
    default: "Davra — броньируй чайхану для гапа",
    template: "%s · Davra",
  },
  description:
    "Davra — найди и забронируй чайхану для гапа в Ташкенте: кабинки, предзаказ блюда, задаток и касса гапа онлайн через CLICK.",
  applicationName: "Davra",
  openGraph: {
    title: "Davra — броньируй чайхану для гапа",
    description:
      "Найди чайхану, забронируй кабинку, закажи плов и собери кассу гапа — всё в Telegram и вебе.",
    type: "website",
    locale: "ru_RU",
    siteName: "Davra",
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF6EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full">
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  );
}
