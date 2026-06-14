// ===== Owner panel mock data (заведение = Beshqozon) =====
import { VENUES, type RoomType } from "./venues";

export const MY_VENUE = VENUES.find((v) => v.id === "beshqozon")!;

export type BookingStatus = "new" | "confirmed" | "declined" | "completed";

export const STATUS_LABEL: Record<BookingStatus, string> = {
  new: "Новая",
  confirmed: "Подтверждена",
  declined: "Отклонена",
  completed: "Завершена",
};

export interface OwnerBooking {
  id: string;
  customerName: string;
  phone: string;
  groupName: string;
  roomName: string;
  roomType: RoomType;
  date: string; // "20 июня"
  time: string;
  guests: number;
  mainDish: string;
  estTotal: number;
  deposit: number;
  status: BookingStatus;
  createdAgo: string;
}

export const BOOKINGS: OwnerBooking[] = [
  {
    id: "bk-1042",
    customerName: "Азиз Рахимов",
    phone: "+998 90 123-45-67",
    groupName: "Гап одноклассников",
    roomName: "VIP-кабинка «Регистон»",
    roomType: "kabinka",
    date: "20 июня",
    time: "19:00",
    guests: 12,
    mainDish: "Плов «Тойбоп» ×12",
    estTotal: 2040000,
    deposit: 408000,
    status: "new",
    createdAgo: "5 мин назад",
  },
  {
    id: "bk-1041",
    customerName: "Дильноза Каримова",
    phone: "+998 93 222-11-00",
    groupName: "Женский гап «Гулзор»",
    roomName: "Летний айван у фонтана",
    roomType: "ayvon",
    date: "21 июня",
    time: "18:00",
    guests: 18,
    mainDish: "Казан-кабоб ×4",
    estTotal: 3060000,
    deposit: 612000,
    status: "new",
    createdAgo: "40 мин назад",
  },
  {
    id: "bk-1040",
    customerName: "Шерзод Мирзаев",
    phone: "+998 91 555-33-22",
    groupName: "Гап коллег",
    roomName: "Большой зал",
    roomType: "zal",
    date: "22 июня",
    time: "20:00",
    guests: 60,
    mainDish: "Шашлык ассорти ×6",
    estTotal: 10200000,
    deposit: 2040000,
    status: "confirmed",
    createdAgo: "2 часа назад",
  },
  {
    id: "bk-1039",
    customerName: "Бек Юсупов",
    phone: "+998 90 777-88-99",
    groupName: "Семейный плов",
    roomName: "VIP-кабинка «Регистон»",
    roomType: "kabinka",
    date: "23 июня",
    time: "13:00",
    guests: 10,
    mainDish: "Плов «Тойбоп» ×10",
    estTotal: 1700000,
    deposit: 340000,
    status: "confirmed",
    createdAgo: "вчера",
  },
  {
    id: "bk-1038",
    customerName: "Нодира Алиева",
    phone: "+998 94 100-20-30",
    groupName: "Гап подруг",
    roomName: "Летний айван у фонтана",
    roomType: "ayvon",
    date: "18 июня",
    time: "19:00",
    guests: 14,
    mainDish: "Казан-кабоб ×3",
    estTotal: 2380000,
    deposit: 476000,
    status: "completed",
    createdAgo: "3 дня назад",
  },
  {
    id: "bk-1037",
    customerName: "Тимур Сафаров",
    phone: "+998 97 321-65-40",
    groupName: "Гап махалли",
    roomName: "Большой зал",
    roomType: "zal",
    date: "15 июня",
    time: "18:30",
    guests: 80,
    mainDish: "Плов «Тойбоп» ×80",
    estTotal: 13600000,
    deposit: 2720000,
    status: "completed",
    createdAgo: "неделю назад",
  },
  {
    id: "bk-1036",
    customerName: "Олим Хакимов",
    phone: "+998 90 444-55-66",
    groupName: "Гап однокурсников",
    roomName: "VIP-кабинка «Регистон»",
    roomType: "kabinka",
    date: "14 июня",
    time: "20:00",
    guests: 11,
    mainDish: "Шашлык ассорти ×5",
    estTotal: 1870000,
    deposit: 374000,
    status: "declined",
    createdAgo: "неделю назад",
  },
];

export const WEEK_OCCUPANCY: { day: string; pct: number }[] = [
  { day: "Пн", pct: 45 },
  { day: "Вт", pct: 38 },
  { day: "Ср", pct: 55 },
  { day: "Чт", pct: 62 },
  { day: "Пт", pct: 88 },
  { day: "Сб", pct: 96 },
  { day: "Вс", pct: 80 },
];

export interface Plan {
  id: string;
  name: string;
  price: number; // сум/мес
  tagline: string;
  features: string[];
  highlight?: boolean;
  current?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Старт",
    price: 0,
    tagline: "Чтобы попробовать",
    features: [
      "Карточка заведения в каталоге",
      "До 10 броней в месяц",
      "Приём задатка через CLICK",
      "Базовая статистика",
    ],
    current: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 299000,
    tagline: "Для активных чайхан",
    features: [
      "Безлимит броней",
      "Фотогалерея и меню",
      "Бейдж «Проверено»",
      "Аналитика и отчёты",
      "Управление залами и календарём",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: 799000,
    tagline: "Максимум клиентов",
    features: [
      "Всё из Pro",
      "Приоритет в поисковой выдаче",
      "Продвижение «Популярное»",
      "Персональный менеджер",
      "Интеграция с вашей кассой",
    ],
  },
];

export const BOOST_PACKAGES: { id: string; label: string; period: string; price: number }[] = [
  { id: "day", label: "Топ выдачи", period: "1 день", price: 49000 },
  { id: "week", label: "Топ выдачи", period: "7 дней", price: 249000 },
  { id: "spotlight", label: "Баннер «Популярное»", period: "7 дней", price: 399000 },
];
