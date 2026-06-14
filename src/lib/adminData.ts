// ===== Davra platform admin mock data =====
import { VENUES } from "./venues";

export type VenueStatus = "active" | "pending" | "paused";
export type PlanTier = "free" | "pro" | "premium";

export const STATUS_LABEL: Record<VenueStatus, string> = {
  active: "Активно",
  pending: "На модерации",
  paused: "На паузе",
};
export const PLAN_LABEL: Record<PlanTier, string> = {
  free: "Старт",
  pro: "Pro",
  premium: "Premium",
};

export interface AdminVenueRow {
  id: string;
  name: string;
  district: string;
  status: VenueStatus;
  plan: PlanTier;
  rating: number;
  bookings30d: number;
  gmv30d: number; // оборот броней через заведение
  revenue30d: number; // наша выручка с заведения
}

// Активные заведения из каталога + плановые/выручка
const PLANS: PlanTier[] = ["premium", "pro", "free", "pro", "premium", "free", "pro", "free", "pro"];
const ACTIVE: AdminVenueRow[] = VENUES.map((v, i) => {
  const bookings30d = 40 + ((v.reviewsCount * 7) % 160);
  const gmv30d = bookings30d * v.avgCheckPerGuest * 12;
  const plan = PLANS[i % PLANS.length];
  const subFee = plan === "premium" ? 799000 : plan === "pro" ? 299000 : 0;
  const revenue30d = Math.round(gmv30d * 0.2 * 0.03) + subFee; // 3% с задатка(20%) + подписка
  return {
    id: v.id,
    name: v.name,
    district: v.district,
    status: "active" as VenueStatus,
    plan,
    rating: v.rating,
    bookings30d,
    gmv30d,
    revenue30d,
  };
});

// Заявки на модерацию (новые заведения)
const PENDING: AdminVenueRow[] = [
  {
    id: "p-gulshan",
    name: "Gulshan Bog'i",
    district: "Учтепа",
    status: "pending",
    plan: "free",
    rating: 0,
    bookings30d: 0,
    gmv30d: 0,
    revenue30d: 0,
  },
  {
    id: "p-sharq",
    name: "Sharq Tongi",
    district: "Яшнабад",
    status: "pending",
    plan: "free",
    rating: 0,
    bookings30d: 0,
    gmv30d: 0,
    revenue30d: 0,
  },
];

export const ADMIN_VENUES: AdminVenueRow[] = [...PENDING, ...ACTIVE];

export interface RevenueSource {
  key: string;
  label: string;
  amount: number;
  hint: string;
  tone: "clay" | "teal" | "saffron" | "plum";
}

export const REVENUE_SOURCES: RevenueSource[] = [
  { key: "commission", label: "Комиссия с задатков", amount: 28_400_000, hint: "3% с предоплат", tone: "clay" },
  { key: "subscriptions", label: "Подписки заведений", amount: 14_200_000, hint: "Pro / Premium", tone: "teal" },
  { key: "promotion", label: "Продвижение", amount: 6_800_000, hint: "топ выдачи, баннеры", tone: "saffron" },
  { key: "fintech", label: "Касса гапа (флоат)", amount: 3_100_000, hint: "оборот через CLICK", tone: "plum" },
];

export const PLATFORM = {
  gmv30d: 1_240_000_000,
  revenue30d: REVENUE_SOURCES.reduce((s, r) => s + r.amount, 0),
  bookings30d: 1860,
  activeVenues: ACTIVE.length,
  pending: PENDING.length,
  takeRate: 4.2, // %
};

// Динамика выручки, млн сум (6 мес)
export const REVENUE_TREND: { m: string; v: number }[] = [
  { m: "Янв", v: 22 },
  { m: "Фев", v: 28 },
  { m: "Мар", v: 31 },
  { m: "Апр", v: 39 },
  { m: "Май", v: 46 },
  { m: "Июн", v: 52 },
];

export interface PlatformBooking {
  id: string;
  venue: string;
  group: string;
  date: string;
  guests: number;
  gmv: number;
  commission: number;
  status: "confirmed" | "completed" | "new";
}

export const PLATFORM_BOOKINGS: PlatformBooking[] = [
  { id: "B-9043", venue: "Beshqozon", group: "Гап одноклассников", date: "20 июня", guests: 12, gmv: 2040000, commission: 12240, status: "confirmed" },
  { id: "B-9042", venue: "Anhor Lounge", group: "Корпоратив", date: "20 июня", guests: 30, gmv: 6000000, commission: 36000, status: "new" },
  { id: "B-9041", venue: "Registon", group: "Той", date: "21 июня", guests: 200, gmv: 38000000, commission: 228000, status: "confirmed" },
  { id: "B-9040", venue: "Chinor Choyxona", group: "Семейный гап", date: "19 июня", guests: 16, gmv: 1920000, commission: 11520, status: "completed" },
  { id: "B-9039", venue: "Oqtepa Bog'i", group: "Гап подруг", date: "18 июня", guests: 14, gmv: 1750000, commission: 10500, status: "completed" },
  { id: "B-9038", venue: "Sim-Sim", group: "Гап коллег", date: "22 июня", guests: 24, gmv: 3120000, commission: 18720, status: "confirmed" },
];

export interface Payout {
  venue: string;
  amount: number;
  date: string;
  status: "Выплачено" | "В обработке";
}

export const PAYOUTS: Payout[] = [
  { venue: "Registon", amount: 7600000, date: "14 июня", status: "Выплачено" },
  { venue: "Beshqozon", amount: 4080000, date: "14 июня", status: "Выплачено" },
  { venue: "Anhor Lounge", amount: 3240000, date: "13 июня", status: "Выплачено" },
  { venue: "Chinor Choyxona", amount: 1920000, date: "сегодня", status: "В обработке" },
];
