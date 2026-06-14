// ===== Davra seed data (Tashkent choyxonas) =====
// Mock data for the MVP. Real venues come from the owner panel later.

export type RoomType = "kabinka" | "ayvon" | "tapchan" | "zal";

export const ROOM_TYPES: Record<RoomType, { label: string; hint: string }> = {
  kabinka: { label: "Кабинка", hint: "Изолированная комната" },
  ayvon: { label: "Айван", hint: "Летняя терраса" },
  tapchan: { label: "Тапчан", hint: "Топчан с курпачой" },
  zal: { label: "Банкетный зал", hint: "Для больших компаний" },
};

export type Amenity =
  | "wifi"
  | "ac"
  | "tv"
  | "parking"
  | "namozxona"
  | "projector"
  | "music"
  | "halal"
  | "terrace"
  | "kids";

export const AMENITY_LABELS: Record<Amenity, string> = {
  wifi: "Wi-Fi",
  ac: "Кондиционер",
  tv: "Телевизор",
  parking: "Парковка",
  namozxona: "Намазхона",
  projector: "Проектор",
  music: "Музыка / тамада",
  halal: "Халяль",
  terrace: "Летняя веранда",
  kids: "Детская зона",
};

export const DISTRICTS = [
  "Юнусабад",
  "Мирзо-Улугбек",
  "Чиланзар",
  "Яккасарай",
  "Мирабад",
  "Шайхантахур",
  "Сергели",
  "Алмазар",
  "Яшнабад",
  "Учтепа",
] as const;
export type District = (typeof DISTRICTS)[number];

export const DISHES = [
  "Плов",
  "Казан-кабоб",
  "Тандыр",
  "Норин",
  "Шашлык",
  "Манты",
  "Бешбармак",
  "Шурпа",
  "Самса",
] as const;
export type Dish = (typeof DISHES)[number];

export type CoverVariant = "clay" | "teal" | "saffron" | "plum";

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  seats: number;
}

export interface MenuItem {
  name: string;
  price: number; // per portion, сум
  isMain?: boolean;
}

export interface Venue {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  district: District;
  address: string;
  rating: number;
  reviewsCount: number;
  priceLevel: 1 | 2 | 3; // 1 эконом, 3 премиум
  avgCheckPerGuest: number; // сум
  capacityMax: number;
  cuisines: string[];
  signatureDishes: Dish[];
  amenities: Amenity[];
  rooms: Room[];
  menu: MenuItem[];
  depositPercent: number; // % задатка от ожидаемого чека
  cover: CoverVariant;
  description: string;
  phone: string;
  openHours: string;
  featured?: boolean;
  verified?: boolean;
}

export const PRICE_LABELS: Record<1 | 2 | 3, string> = {
  1: "до 80 000 сум / чел",
  2: "80–150 000 сум / чел",
  3: "от 150 000 сум / чел",
};

const baseMenu: MenuItem[] = [
  { name: "Чай (чайник)", price: 8000 },
  { name: "Лепёшка", price: 6000 },
  { name: "Салат «Аччик-чучук»", price: 22000 },
  { name: "Салат «Ташкент»", price: 38000 },
  { name: "Самса (1 шт)", price: 14000 },
];

export const VENUES: Venue[] = [
  {
    id: "beshqozon",
    slug: "beshqozon",
    name: "Beshqozon",
    tagline: "Легендарный плов на 12 казанов",
    district: "Юнусабад",
    address: "ул. Амира Темура, 108",
    rating: 4.8,
    reviewsCount: 412,
    priceLevel: 3,
    avgCheckPerGuest: 170000,
    capacityMax: 300,
    cuisines: ["Узбекская", "Национальная"],
    signatureDishes: ["Плов", "Казан-кабоб", "Шашлык"],
    amenities: ["ac", "wifi", "parking", "namozxona", "tv", "halal", "music"],
    rooms: [
      { id: "b-vip", name: "VIP-кабинка «Регистон»", type: "kabinka", seats: 12 },
      { id: "b-zal", name: "Большой зал", type: "zal", seats: 120 },
      { id: "b-ayvon", name: "Летний айван у фонтана", type: "ayvon", seats: 24 },
    ],
    menu: [
      { name: "Плов «Тойбоп» (порция)", price: 42000, isMain: true },
      { name: "Казан-кабоб (на 4)", price: 180000, isMain: true },
      { name: "Шашлык ассорти (10 шт)", price: 160000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 20,
    cover: "clay",
    description:
      "Один из самых известных плов-центров Ташкента. Просторные изолированные кабинки, отдельный банкетный зал и летний айван у фонтана. Идеально для большого гапа и семейных торжеств.",
    phone: "+998 71 200-10-10",
    openHours: "08:00–23:00",
    featured: true,
    verified: true,
  },
  {
    id: "chinor",
    slug: "chinor-choyxona",
    name: "Chinor Choyxona",
    tagline: "Тенистый сад под старыми чинарами",
    district: "Мирзо-Улугбек",
    address: "массив Буюк Ипак Йули, 45",
    rating: 4.7,
    reviewsCount: 286,
    priceLevel: 2,
    avgCheckPerGuest: 120000,
    capacityMax: 160,
    cuisines: ["Узбекская", "Чайхана"],
    signatureDishes: ["Шашлык", "Тандыр", "Шурпа"],
    amenities: ["ac", "wifi", "parking", "terrace", "halal", "kids"],
    rooms: [
      { id: "c-tap1", name: "Тапчан у пруда", type: "tapchan", seats: 10 },
      { id: "c-kab", name: "Кабинка «Чинор»", type: "kabinka", seats: 16 },
      { id: "c-ayvon", name: "Айван в саду", type: "ayvon", seats: 30 },
    ],
    menu: [
      { name: "Шашлык из баранины (10 шт)", price: 150000, isMain: true },
      { name: "Тандыр-гушт (1 кг)", price: 190000, isMain: true },
      { name: "Шурпа (порция)", price: 36000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 15,
    cover: "teal",
    description:
      "Уютная чайхана в тени вековых чинар с тапчанами у пруда. Любимое место для семейного гапа и встреч с друзьями на свежем воздухе.",
    phone: "+998 71 262-30-30",
    openHours: "09:00–23:00",
    verified: true,
  },
  {
    id: "registon",
    slug: "registon-banket",
    name: "Registon",
    tagline: "Банкетный комплекс национальной кухни",
    district: "Чиланзар",
    address: "ул. Бунёдкор, 12",
    rating: 4.6,
    reviewsCount: 521,
    priceLevel: 3,
    avgCheckPerGuest: 190000,
    capacityMax: 500,
    cuisines: ["Узбекская", "Европейская"],
    signatureDishes: ["Плов", "Бешбармак", "Манты"],
    amenities: ["ac", "wifi", "parking", "namozxona", "tv", "projector", "music", "halal"],
    rooms: [
      { id: "r-zal1", name: "Зал «Самарканд»", type: "zal", seats: 250 },
      { id: "r-vip", name: "VIP-кабинет", type: "kabinka", seats: 14 },
      { id: "r-zal2", name: "Малый зал", type: "zal", seats: 80 },
    ],
    menu: [
      { name: "Плов свадебный (порция)", price: 45000, isMain: true },
      { name: "Бешбармак (на 4)", price: 200000, isMain: true },
      { name: "Манты (6 шт)", price: 48000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 25,
    cover: "saffron",
    description:
      "Большой банкетный комплекс для тоев и корпоративов. Зал на 250 гостей, профессиональный тамада и звук, проектор для оформления.",
    phone: "+998 71 277-55-55",
    openHours: "10:00–00:00",
    featured: true,
    verified: true,
  },
  {
    id: "bahor",
    slug: "bahor",
    name: "Bahor",
    tagline: "Домашняя кухня и тихие кабинки",
    district: "Яккасарай",
    address: "ул. Шота Руставели, 31",
    rating: 4.9,
    reviewsCount: 198,
    priceLevel: 2,
    avgCheckPerGuest: 110000,
    capacityMax: 90,
    cuisines: ["Узбекская", "Домашняя"],
    signatureDishes: ["Норин", "Манты", "Самса"],
    amenities: ["ac", "wifi", "tv", "halal", "namozxona"],
    rooms: [
      { id: "ba-k1", name: "Кабинка «Бахор»", type: "kabinka", seats: 8 },
      { id: "ba-k2", name: "Кабинка «Лола»", type: "kabinka", seats: 12 },
      { id: "ba-tap", name: "Тапчан", type: "tapchan", seats: 10 },
    ],
    menu: [
      { name: "Норин (порция)", price: 40000, isMain: true },
      { name: "Манты (6 шт)", price: 46000, isMain: true },
      { name: "Домашняя самса (1 шт)", price: 16000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 15,
    cover: "plum",
    description:
      "Семейная чайхана с домашней кухней и тихими изолированными кабинками. Лучший выбор для камерного гапа на 8–12 человек.",
    phone: "+998 71 255-12-12",
    openHours: "09:00–22:00",
    verified: true,
  },
  {
    id: "anhor",
    slug: "anhor-lounge",
    name: "Anhor Lounge",
    tagline: "Современная чайхана у канала",
    district: "Мирабад",
    address: "набережная Анхор, 4",
    rating: 4.7,
    reviewsCount: 340,
    priceLevel: 3,
    avgCheckPerGuest: 200000,
    capacityMax: 140,
    cuisines: ["Fusion", "Узбекская", "Европейская"],
    signatureDishes: ["Казан-кабоб", "Шашлык", "Плов"],
    amenities: ["ac", "wifi", "parking", "tv", "music", "terrace", "halal"],
    rooms: [
      { id: "a-terr", name: "Терраса у воды", type: "ayvon", seats: 26 },
      { id: "a-vip", name: "VIP-кабинка «Лофт»", type: "kabinka", seats: 14 },
      { id: "a-zal", name: "Панорамный зал", type: "zal", seats: 100 },
    ],
    menu: [
      { name: "Казан-кабоб премиум (на 4)", price: 220000, isMain: true },
      { name: "Шашлык-сет (12 шт)", price: 190000, isMain: true },
      { name: "Плов с бараниной (порция)", price: 48000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 25,
    cover: "teal",
    description:
      "Стильное место у канала Анхор с панорамной террасой. Современная подача национальных блюд — для гапа, который хочется красиво оформить.",
    phone: "+998 71 244-77-77",
    openHours: "11:00–00:00",
    featured: true,
    verified: true,
  },
  {
    id: "marvarid",
    slug: "marvarid",
    name: "Marvarid",
    tagline: "Классическая чайхана с тапчанами",
    district: "Шайхантахур",
    address: "ул. Заркайнар, 77",
    rating: 4.5,
    reviewsCount: 154,
    priceLevel: 1,
    avgCheckPerGuest: 70000,
    capacityMax: 120,
    cuisines: ["Узбекская", "Чайхана"],
    signatureDishes: ["Плов", "Шурпа", "Самса"],
    amenities: ["wifi", "parking", "halal", "namozxona", "terrace"],
    rooms: [
      { id: "m-tap1", name: "Тапчан №3", type: "tapchan", seats: 12 },
      { id: "m-tap2", name: "Тапчан №7", type: "tapchan", seats: 10 },
      { id: "m-ayvon", name: "Айван", type: "ayvon", seats: 20 },
    ],
    menu: [
      { name: "Плов (порция)", price: 32000, isMain: true },
      { name: "Шурпа (порция)", price: 28000, isMain: true },
      { name: "Самса тандыр (1 шт)", price: 12000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 10,
    cover: "saffron",
    description:
      "Традиционная районная чайхана с тапчанами и доступными ценами. Душевное место для большого гапа без лишнего пафоса.",
    phone: "+998 71 244-09-09",
    openHours: "08:00–22:00",
  },
  {
    id: "simsim",
    slug: "sim-sim",
    name: "Sim-Sim",
    tagline: "Тандыр и казан на дровах",
    district: "Юнусабад",
    address: "ул. Богишамол, 210",
    rating: 4.6,
    reviewsCount: 233,
    priceLevel: 2,
    avgCheckPerGuest: 130000,
    capacityMax: 180,
    cuisines: ["Узбекская", "Кавказская"],
    signatureDishes: ["Тандыр", "Шашлык", "Казан-кабоб"],
    amenities: ["ac", "wifi", "parking", "tv", "halal", "music", "kids"],
    rooms: [
      { id: "s-kab", name: "Кабинка «Восток»", type: "kabinka", seats: 16 },
      { id: "s-zal", name: "Банкетный зал", type: "zal", seats: 90 },
      { id: "s-ayvon", name: "Летний айван", type: "ayvon", seats: 28 },
    ],
    menu: [
      { name: "Тандыр-гушт (1 кг)", price: 185000, isMain: true },
      { name: "Шашлык ассорти (10 шт)", price: 150000, isMain: true },
      { name: "Казан-кабоб (на 4)", price: 175000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 20,
    cover: "clay",
    description:
      "Мясная чайхана с тандыром и казаном на дровах. Большие кабинки и зал — удобно собрать компанию коллег или одноклассников.",
    phone: "+998 71 235-88-88",
    openHours: "10:00–23:30",
    verified: true,
  },
  {
    id: "zarafshon",
    slug: "zarafshon",
    name: "Zarafshon",
    tagline: "Просторные залы по доступной цене",
    district: "Сергели",
    address: "Янги Сергели, квартал 6",
    rating: 4.4,
    reviewsCount: 176,
    priceLevel: 1,
    avgCheckPerGuest: 75000,
    capacityMax: 350,
    cuisines: ["Узбекская", "Национальная"],
    signatureDishes: ["Плов", "Бешбармак", "Манты"],
    amenities: ["ac", "parking", "namozxona", "tv", "halal", "projector"],
    rooms: [
      { id: "z-zal1", name: "Зал «Зарафшан»", type: "zal", seats: 200 },
      { id: "z-zal2", name: "Зал «Окдарё»", type: "zal", seats: 120 },
      { id: "z-kab", name: "Кабинка для семьи", type: "kabinka", seats: 18 },
    ],
    menu: [
      { name: "Плов (порция)", price: 30000, isMain: true },
      { name: "Бешбармак (на 4)", price: 160000, isMain: true },
      { name: "Манты (6 шт)", price: 42000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 15,
    cover: "plum",
    description:
      "Большой банкетный комплекс на окраине с доступными ценами и вместительными залами. Для тоя и многолюдного гапа.",
    phone: "+998 71 211-44-44",
    openHours: "09:00–23:00",
  },
  {
    id: "oqtepa",
    slug: "oqtepa-bogi",
    name: "Oqtepa Bog'i",
    tagline: "Зелёный сад и летние айваны",
    district: "Алмазар",
    address: "ул. Фаробий, 161",
    rating: 4.8,
    reviewsCount: 264,
    priceLevel: 2,
    avgCheckPerGuest: 125000,
    capacityMax: 200,
    cuisines: ["Узбекская", "Чайхана"],
    signatureDishes: ["Шашлык", "Плов", "Шурпа"],
    amenities: ["wifi", "parking", "terrace", "halal", "namozxona", "kids", "music"],
    rooms: [
      { id: "o-ayvon1", name: "Айван «Бог» №1", type: "ayvon", seats: 22 },
      { id: "o-tap", name: "Тапчан в саду", type: "tapchan", seats: 12 },
      { id: "o-kab", name: "Кабинка «Гулзор»", type: "kabinka", seats: 14 },
    ],
    menu: [
      { name: "Шашлык из курицы (10 шт)", price: 120000, isMain: true },
      { name: "Плов «Чайханский» (порция)", price: 36000, isMain: true },
      { name: "Шурпа на дровах (порция)", price: 34000, isMain: true },
      ...baseMenu,
    ],
    depositPercent: 15,
    cover: "teal",
    description:
      "Большой зелёный сад с летними айванами и зоной для детей. Отличное место для летнего гапа на свежем воздухе.",
    phone: "+998 71 246-60-60",
    openHours: "09:00–23:00",
    verified: true,
  },
];

export function getVenue(slug: string): Venue | undefined {
  return VENUES.find((v) => v.slug === slug);
}
