// ===== Davra admin i18n — uz (lotin, default) · uz-cyrl · ru =====
// Identical nested key set across all three locales.
// Shared enums (venueStatus, bookingStatus, planTier, districts) live in
// messages.ts and are resolved via t(`enums.*`) — they are NOT redefined here.

export const adminDict: {
  uz: Record<string, unknown>;
  "uz-cyrl": Record<string, unknown>;
  ru: Record<string, unknown>;
} = {
  uz: {
    admin: {
      brand: { suffix: "ADMIN", panel: "Admin-panel", toSite: "Davra saytiga" },
      nav: {
        overview: "Umumiy ko‘rinish",
        venues: "Muassasalar",
        bookings: "Bronlar",
        finance: "Moliya",
      },
      a11y: { openMenu: "Menyuni ochish", closeMenu: "Menyuni yopish" },
      dashboard: {
        title: "Platforma sharhi",
        subtitle: "Davraning so‘nggi 30 kundagi asosiy ko‘rsatkichlari.",
        moderationBanner: "{n} muassasa arizasi moderatsiyani kutmoqda",
        kpi: {
          gmvLabel: "Aylanma (GMV)",
          gmvSub: "30 kunlik bronlar",
          revenueLabel: "Bizning daromad",
          revenueSub: "take-rate {rate}%",
          venuesLabel: "Muassasalar",
          venuesSub: "+{n} moderatsiyada",
          bookingsLabel: "Bronlar",
          bookingsSub: "30 kun ichida",
        },
        sources: { title: "Manbalar bo‘yicha daromad", subtitle: "Qatlamli monetizatsiya · {total}" },
        trend: {
          title: "Daromad dinamikasi",
          subtitle: "mln so‘m, 6 oy",
          delta: "+13% oy/oy",
        },
        top: { title: "Daromad bo‘yicha top muassasalar", all: "Barchasi", ourRevenue: "bizning daromad", bookings: "{n} bron" },
      },
      venues: {
        title: "Muassasalar",
        subtitle: "Arizalarni moderatsiya qilish va platforma muassasalarini boshqarish.",
        tabs: { all: "Barchasi", pending: "Moderatsiyada", active: "Faol", paused: "Pauzada" },
        stat: { rating: "Reyting", bookingsMonth: "Bron/oy", revenue: "Daromad" },
        actions: { approve: "Tasdiqlash", pause: "Pauzaga", activate: "Faollashtirish", reject: "Rad etish" },
      },
      bookings: {
        title: "Platforma bronlari",
        subtitle: "Davraning barcha muassasalari bo‘yicha barcha bronlar.",
        tabs: { all: "Barchasi", new: "Yangilar", confirmed: "Tasdiqlangan", completed: "Yakunlangan" },
        cols: {
          id: "ID",
          venue: "Muassasa",
          group: "Guruh",
          date: "Sana",
          gmv: "GMV",
          commission: "Komissiya",
          status: "Holat",
        },
        cardLabel: { group: "Guruh: ", date: "Sana: ", gmv: "GMV: ", commission: "Komissiya: " },
      },
      finance: {
        title: "Moliya",
        subtitle: "30 kunlik daromad, manbalar va muassasalarga to‘lovlar.",
        revenue30dLabel: "30 kunlik daromadimiz",
        gmvLabel: "Aylanma (GMV)",
        takeRateLabel: "Take-rate",
        payouts: { title: "Muassasalarga to‘lovlar", subtitle: "Komissiya ayirilgan oldindan to‘lov — CLICK orqali" },
        commissions: { title: "So‘nggi komissiyalar", subtitle: "Har bir bron oldindan to‘lovidan 3%", from: "{gmv} dan" },
        payoutStatus: { paid: "To‘langan", processing: "Jarayonda" },
      },
      revenueSource: {
        commission: { label: "Oldindan to‘lov komissiyasi", hint: "oldindan to‘lovlardan 3%" },
        subscriptions: { label: "Muassasa obunalari", hint: "Pro / Premium" },
        promotion: { label: "Reklama", hint: "top o‘rinlar, bannerlar" },
        fintech: { label: "Gap kassasi (flout)", hint: "CLICK orqali aylanma" },
      },
    },
  },

  "uz-cyrl": {
    admin: {
      brand: { suffix: "ADMIN", panel: "Админ-панел", toSite: "Davra сайтига" },
      nav: {
        overview: "Умумий кўриниш",
        venues: "Муассасалар",
        bookings: "Бронлар",
        finance: "Молия",
      },
      a11y: { openMenu: "Менюни очиш", closeMenu: "Менюни ёпиш" },
      dashboard: {
        title: "Платформа шарҳи",
        subtitle: "Давранинг сўнгги 30 кундаги асосий кўрсаткичлари.",
        moderationBanner: "{n} муассаса аризаси модерацияни кутмоқда",
        kpi: {
          gmvLabel: "Айланма (GMV)",
          gmvSub: "30 кунлик бронлар",
          revenueLabel: "Бизнинг даромад",
          revenueSub: "take-rate {rate}%",
          venuesLabel: "Муассасалар",
          venuesSub: "+{n} модерацияда",
          bookingsLabel: "Бронлар",
          bookingsSub: "30 кун ичида",
        },
        sources: { title: "Манбалар бўйича даромад", subtitle: "Қатламли монетизация · {total}" },
        trend: {
          title: "Даромад динамикаси",
          subtitle: "млн сўм, 6 ой",
          delta: "+13% ой/ой",
        },
        top: { title: "Даромад бўйича топ муассасалар", all: "Барчаси", ourRevenue: "бизнинг даромад", bookings: "{n} брон" },
      },
      venues: {
        title: "Муассасалар",
        subtitle: "Аризаларни модерация қилиш ва платформа муассасаларини бошқариш.",
        tabs: { all: "Барчаси", pending: "Модерацияда", active: "Фаол", paused: "Паузада" },
        stat: { rating: "Рейтинг", bookingsMonth: "Брон/ой", revenue: "Даромад" },
        actions: { approve: "Тасдиқлаш", pause: "Паузага", activate: "Фаоллаштириш", reject: "Рад этиш" },
      },
      bookings: {
        title: "Платформа бронлари",
        subtitle: "Давранинг барча муассасалари бўйича барча бронлар.",
        tabs: { all: "Барчаси", new: "Янгилар", confirmed: "Тасдиқланган", completed: "Якунланган" },
        cols: {
          id: "ID",
          venue: "Муассаса",
          group: "Гуруҳ",
          date: "Сана",
          gmv: "GMV",
          commission: "Комиссия",
          status: "Ҳолат",
        },
        cardLabel: { group: "Гуруҳ: ", date: "Сана: ", gmv: "GMV: ", commission: "Комиссия: " },
      },
      finance: {
        title: "Молия",
        subtitle: "30 кунлик даромад, манбалар ва муассасаларга тўловлар.",
        revenue30dLabel: "30 кунлик даромадимиз",
        gmvLabel: "Айланма (GMV)",
        takeRateLabel: "Take-rate",
        payouts: { title: "Муассасаларга тўловлар", subtitle: "Комиссия айирилган олдиндан тўлов — CLICK орқали" },
        commissions: { title: "Сўнгги комиссиялар", subtitle: "Ҳар бир брон олдиндан тўловидан 3%", from: "{gmv} дан" },
        payoutStatus: { paid: "Тўланган", processing: "Жараёнда" },
      },
      revenueSource: {
        commission: { label: "Олдиндан тўлов комиссияси", hint: "олдиндан тўловлардан 3%" },
        subscriptions: { label: "Муассаса обуналари", hint: "Pro / Premium" },
        promotion: { label: "Реклама", hint: "топ ўринлар, баннерлар" },
        fintech: { label: "Гап кассаси (флоут)", hint: "CLICK орқали айланма" },
      },
    },
  },

  ru: {
    admin: {
      brand: { suffix: "ADMIN", panel: "Админ-панель", toSite: "На сайт Davra" },
      nav: {
        overview: "Обзор",
        venues: "Заведения",
        bookings: "Брони",
        finance: "Финансы",
      },
      a11y: { openMenu: "Открыть меню", closeMenu: "Закрыть меню" },
      dashboard: {
        title: "Обзор платформы",
        subtitle: "Ключевые метрики Davra за последние 30 дней.",
        moderationBanner: "{n} заявки заведений ждут модерации",
        kpi: {
          gmvLabel: "Оборот (GMV)",
          gmvSub: "броней за 30 дней",
          revenueLabel: "Наша выручка",
          revenueSub: "take-rate {rate}%",
          venuesLabel: "Заведения",
          venuesSub: "+{n} на модерации",
          bookingsLabel: "Брони",
          bookingsSub: "за 30 дней",
        },
        sources: { title: "Выручка по источникам", subtitle: "Слоёная монетизация · {total}" },
        trend: {
          title: "Динамика выручки",
          subtitle: "млн сум, 6 месяцев",
          delta: "+13% м/м",
        },
        top: { title: "Топ заведений по выручке", all: "Все", ourRevenue: "наша выручка", bookings: "{n} броней" },
      },
      venues: {
        title: "Заведения",
        subtitle: "Модерация заявок и управление заведениями платформы.",
        tabs: { all: "Все", pending: "На модерации", active: "Активные", paused: "На паузе" },
        stat: { rating: "Рейтинг", bookingsMonth: "Брони/мес", revenue: "Выручка" },
        actions: { approve: "Одобрить", pause: "На паузу", activate: "Активировать", reject: "Отклонить" },
      },
      bookings: {
        title: "Брони платформы",
        subtitle: "Все бронирования по всем заведениям Davra.",
        tabs: { all: "Все", new: "Новые", confirmed: "Подтверждённые", completed: "Завершённые" },
        cols: {
          id: "ID",
          venue: "Заведение",
          group: "Группа",
          date: "Дата",
          gmv: "GMV",
          commission: "Комиссия",
          status: "Статус",
        },
        cardLabel: { group: "Группа: ", date: "Дата: ", gmv: "GMV: ", commission: "Комиссия: " },
      },
      finance: {
        title: "Финансы",
        subtitle: "Выручка, источники и выплаты заведениям за 30 дней.",
        revenue30dLabel: "Наша выручка за 30 дней",
        gmvLabel: "Оборот (GMV)",
        takeRateLabel: "Take-rate",
        payouts: { title: "Выплаты заведениям", subtitle: "Задаток за вычетом комиссии — через CLICK" },
        commissions: { title: "Последние комиссии", subtitle: "3% с задатка по каждой брони", from: "из {gmv}" },
        payoutStatus: { paid: "Выплачено", processing: "В обработке" },
      },
      revenueSource: {
        commission: { label: "Комиссия с задатков", hint: "3% с предоплат" },
        subscriptions: { label: "Подписки заведений", hint: "Pro / Premium" },
        promotion: { label: "Продвижение", hint: "топ выдачи, баннеры" },
        fintech: { label: "Касса гапа (флоат)", hint: "оборот через CLICK" },
      },
    },
  },
};
