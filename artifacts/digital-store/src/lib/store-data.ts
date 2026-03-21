import { 
  Tv, Film, Clapperboard, Music, MonitorPlay, Youtube, Apple, Package,
  Gamepad2, Monitor, PlaySquare, Smartphone, Ticket, Trophy, Target,
  Sword, Zap, Star, Flame, Crown, Shield, MessageCircle,
  Twitter, Users, CreditCard, Wifi, Phone, Wallet, Hash, Ghost,
  Instagram, Bird, Scissors, Palette, Bot, Mail, Video
} from "lucide-react";

export type ProductOption = {
  id: string;
  name: string;
  price: number;
};

export type ProductCategory = "subscriptions" | "gift-cards" | "games" | "accounts" | "social";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  iconName: string;
  color: string;
  options: ProductOption[];
  features?: string[];
  badge?: string;
  isCustom?: boolean;
};

export const CATEGORY_LABELS: Record<string, string> = {
  subscriptions: "اشتراكات",
  "gift-cards": "بطاقات",
  games: "ألعاب",
  accounts: "حسابات",
  social: "سوشيال",
};

export const SUBSCRIPTIONS: Product[] = [
  {
    id: "sub-netflix",
    name: "نتفليكس (Netflix)",
    category: "subscriptions",
    iconName: "Film",
    color: "from-red-600 to-red-900",
    badge: "الأكثر طلباً",
    features: ["أعلى جودة 4K", "شاشات خاصة أو مشتركة", "ضمان كامل المدة"],
    options: [
      { id: "n-1m", name: "شهر واحد", price: 15 },
      { id: "n-3m", name: "3 أشهر", price: 40 },
      { id: "n-6m", name: "6 أشهر", price: 75 },
      { id: "n-1y", name: "سنة كاملة", price: 140 },
    ]
  },
  {
    id: "sub-shahid",
    name: "شاهد (Shahid VIP)",
    category: "subscriptions",
    iconName: "Tv",
    color: "from-fuchsia-500 to-purple-800",
    features: ["بدون إعلانات", "مسلسلات حصرية", "أجهزة متعددة"],
    options: [
      { id: "sh-1m", name: "شهر واحد", price: 20 },
      { id: "sh-3m", name: "3 أشهر", price: 55 },
      { id: "sh-6m", name: "6 أشهر", price: 100 },
      { id: "sh-1y", name: "سنة كاملة", price: 185 },
    ]
  },
  {
    id: "sub-gemini",
    name: "جيميناي (Gemini Advanced)",
    category: "subscriptions",
    iconName: "Bot",
    color: "from-blue-600 to-indigo-900",
    badge: "جديد",
    features: ["ذكاء اصطناعي متقدم", "نماذج Gemini Ultra", "أولوية الوصول"],
    options: [
      { id: "gm-1m", name: "شهر واحد", price: 20 },
      { id: "gm-3m", name: "3 أشهر", price: 55 },
      { id: "gm-6m", name: "6 أشهر", price: 105 },
      { id: "gm-1y", name: "سنة كاملة", price: 200 },
    ]
  },
  {
    id: "sub-capcut",
    name: "كاب كات (CapCut Pro)",
    category: "subscriptions",
    iconName: "Scissors",
    color: "from-slate-700 to-slate-900",
    features: ["بدون علامة مائية", "تأثيرات حصرية", "أدوات AI"],
    options: [
      { id: "cc-1m", name: "شهر واحد", price: 12 },
      { id: "cc-3m", name: "3 أشهر", price: 32 },
      { id: "cc-1y", name: "سنة كاملة", price: 110 },
    ]
  },
  {
    id: "sub-canva",
    name: "كانفا برو (Canva Pro)",
    category: "subscriptions",
    iconName: "Palette",
    color: "from-purple-600 to-pink-700",
    badge: "هوت",
    features: ["قوالب احترافية", "أدوات تصميم متقدمة", "مكتبة صور ضخمة"],
    options: [
      { id: "cv-1m", name: "شهر واحد", price: 15 },
      { id: "cv-3m", name: "3 أشهر", price: 40 },
      { id: "cv-1y", name: "سنة كاملة", price: 145 },
    ]
  },
];

export const GIFT_CARDS: Product[] = [
  {
    id: "gc-itunes",
    name: "بطاقات ايتونز (iTunes)",
    category: "gift-cards",
    iconName: "Apple",
    color: "from-pink-500 to-red-700",
    badge: "الأكثر طلباً",
    features: ["للحسابات الأمريكية", "موسيقى وتطبيقات", "شحن فوري"],
    options: [
      { id: "it-10", name: "بطاقة 10 دولار", price: 39 },
      { id: "it-25", name: "بطاقة 25 دولار", price: 97 },
      { id: "it-50", name: "بطاقة 50 دولار", price: 192 },
      { id: "it-100", name: "بطاقة 100 دولار", price: 382 },
    ]
  },
  {
    id: "gc-google",
    name: "بطاقات غوغل (Google Play)",
    category: "gift-cards",
    iconName: "Smartphone",
    color: "from-emerald-400 to-cyan-600",
    features: ["تعمل في سوريا", "تطبيقات وألعاب", "شحن داخل التطبيقات"],
    options: [
      { id: "gp-10", name: "بطاقة 10 دولار", price: 38 },
      { id: "gp-25", name: "بطاقة 25 دولار", price: 94 },
      { id: "gp-50", name: "بطاقة 50 دولار", price: 186 },
      { id: "gp-100", name: "بطاقة 100 دولار", price: 373 },
    ]
  },
  {
    id: "gc-sham",
    name: "شام (SHAM)",
    category: "gift-cards",
    iconName: "Shield",
    color: "from-blue-500 to-cyan-700",
    features: ["متوفر (سوري)", "الدفع بالكاش أو الدولار", "تسليم فوري"],
    isCustom: true,
    options: [
      { id: "sh-custom", name: "حسب الطلب", price: 0 },
    ]
  },
  {
    id: "gc-usdt",
    name: "USDT (تيثر)",
    category: "gift-cards",
    iconName: "Wallet",
    color: "from-teal-400 to-green-600",
    badge: "عملة رقمية",
    features: ["متوفر من 10 إلى $1000", "شبكة TRC20 / BEP20", "تسليم فوري"],
    options: [
      { id: "usdt-10", name: "10 دولار USDT", price: 10 },
      { id: "usdt-50", name: "50 دولار USDT", price: 50 },
      { id: "usdt-100", name: "100 دولار USDT", price: 100 },
      { id: "usdt-500", name: "500 دولار USDT", price: 500 },
      { id: "usdt-1000", name: "1000 دولار USDT", price: 1000 },
    ]
  },
];

export const GAMES: Product[] = [
  {
    id: "game-clash",
    name: "كلاش أوف كلانس (Clash of Clans)",
    category: "games",
    iconName: "Crown",
    color: "from-amber-500 to-yellow-700",
    badge: "الأكثر طلباً",
    features: ["شحن الجواهر فوري", "عن طريق تاج القرية", "وصول مضمون"],
    options: [
      { id: "coc-80", name: "80 جوهرة", price: 8 },
      { id: "coc-500", name: "500 جوهرة", price: 40 },
      { id: "coc-1200", name: "1200 جوهرة", price: 88 },
      { id: "coc-2500", name: "2500 جوهرة", price: 175 },
      { id: "coc-6500", name: "6500 جوهرة", price: 440 },
    ]
  },
  {
    id: "game-fortnite",
    name: "فورتنايت (Fortnite V-Bucks)",
    category: "games",
    iconName: "Zap",
    color: "from-blue-600 to-indigo-700",
    badge: "هوت",
    features: ["شحن V-Bucks فوري", "لجميع المنصات", "تسليم بالايدي أو الكود"],
    options: [
      { id: "fn-1000", name: "1,000 V-Bucks", price: 30 },
      { id: "fn-2800", name: "2,800 V-Bucks", price: 75 },
      { id: "fn-5000", name: "5,000 V-Bucks", price: 130 },
      { id: "fn-13500", name: "13,500 V-Bucks", price: 320 },
    ]
  },
  {
    id: "game-pubg",
    name: "ببجي (PUBG UC)",
    category: "games",
    iconName: "Target",
    color: "from-gray-700 to-gray-900",
    features: ["شحن UC فوري", "عن طريق الايدي", "وصول مضمون"],
    options: [
      { id: "pubg-60", name: "60 UC", price: 18 },
      { id: "pubg-325", name: "325 UC", price: 45 },
      { id: "pubg-660", name: "660 UC", price: 90 },
      { id: "pubg-1800", name: "1800 UC", price: 230 },
    ]
  },
];

export const ACCOUNT_PRODUCTS: Product[] = [
  {
    id: "acc-gmail",
    name: "حساب جيميل (Gmail)",
    category: "accounts",
    iconName: "Mail",
    color: "from-red-500 to-red-700",
    features: ["حساب جديد", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "gm-1", name: "حساب واحد", price: 1.5 },
      { id: "gm-5", name: "5 حسابات", price: 6 },
      { id: "gm-10", name: "10 حسابات", price: 12 },
    ]
  },
  {
    id: "acc-tiktok",
    name: "حساب تيك توك (TikTok)",
    category: "accounts",
    iconName: "Video",
    color: "from-slate-800 to-slate-950",
    features: ["حساب جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "tt-1", name: "حساب واحد", price: 1.5 },
      { id: "tt-5", name: "5 حسابات", price: 6 },
      { id: "tt-10", name: "10 حسابات", price: 12 },
    ]
  },
  {
    id: "acc-twitter",
    name: "حساب تويتر / X",
    category: "accounts",
    iconName: "Twitter",
    color: "from-slate-900 to-black",
    features: ["حساب جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "tw-1", name: "حساب واحد", price: 1.5 },
      { id: "tw-5", name: "5 حسابات", price: 6 },
      { id: "tw-10", name: "10 حسابات", price: 12 },
    ]
  },
  {
    id: "acc-facebook",
    name: "حساب فيسبوك (Facebook)",
    category: "accounts",
    iconName: "Users",
    color: "from-blue-600 to-blue-800",
    features: ["حساب جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "fb-1", name: "حساب واحد", price: 1.5 },
      { id: "fb-5", name: "5 حسابات", price: 6 },
      { id: "fb-10", name: "10 حسابات", price: 12 },
    ]
  },
  {
    id: "acc-whatsapp",
    name: "رقم واتساب (WhatsApp)",
    category: "accounts",
    iconName: "Phone",
    color: "from-green-500 to-green-700",
    badge: "الأكثر طلباً",
    features: ["رقم جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "wa-1", name: "رقم واحد", price: 1.5 },
      { id: "wa-5", name: "5 أرقام", price: 6 },
      { id: "wa-10", name: "10 أرقام", price: 12 },
    ]
  },
  {
    id: "acc-telegram",
    name: "حساب تلغرام (Telegram)",
    category: "accounts",
    iconName: "MessageCircle",
    color: "from-sky-500 to-blue-600",
    features: ["حساب جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "tg-1", name: "حساب واحد", price: 1.5 },
      { id: "tg-5", name: "5 حسابات", price: 6 },
      { id: "tg-10", name: "10 حسابات", price: 12 },
    ]
  },
  {
    id: "acc-snapchat",
    name: "حساب سناب شات (Snapchat)",
    category: "accounts",
    iconName: "Ghost",
    color: "from-yellow-400 to-yellow-600",
    features: ["حساب جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "sc-1", name: "حساب واحد", price: 1.5 },
      { id: "sc-5", name: "5 حسابات", price: 6 },
      { id: "sc-10", name: "10 حسابات", price: 12 },
    ]
  },
  {
    id: "acc-instagram",
    name: "حساب انستغرام (Instagram)",
    category: "accounts",
    iconName: "Instagram",
    color: "from-purple-600 via-pink-500 to-orange-400",
    features: ["حساب جاهز", "تسليم فوري", "مضمون 100%"],
    options: [
      { id: "ig-1", name: "حساب واحد", price: 1.5 },
      { id: "ig-5", name: "5 حسابات", price: 6 },
      { id: "ig-10", name: "10 حسابات", price: 12 },
    ]
  },
];

export const SOCIAL_PRODUCTS: Product[] = [
  {
    id: "soc-ig-followers",
    name: "متابعين انستغرام",
    category: "social",
    iconName: "Instagram",
    color: "from-purple-500 to-pink-700",
    badge: "الأكثر طلباً",
    features: ["متابعين حقيقيين", "تسليم تدريجي", "ضمان الاستمرار"],
    options: [
      { id: "igf-1k", name: "1,000 متابع", price: 15 },
      { id: "igf-5k", name: "5,000 متابع", price: 60 },
      { id: "igf-10k", name: "10,000 متابع", price: 110 },
    ]
  },
  {
    id: "soc-tt-followers",
    name: "متابعين تيك توك",
    category: "social",
    iconName: "Video",
    color: "from-slate-700 to-slate-900",
    features: ["متابعين حقيقيين", "تسليم سريع", "ضمان"],
    options: [
      { id: "ttf-1k", name: "1,000 متابع", price: 12 },
      { id: "ttf-5k", name: "5,000 متابع", price: 50 },
      { id: "ttf-10k", name: "10,000 متابع", price: 90 },
    ]
  },
];

export const BALANCE_PRODUCTS: Product[] = [
  {
    id: "bal-syriatel",
    name: "سيريتل (Syriatel)",
    category: "gift-cards",
    iconName: "Phone",
    color: "from-red-600 to-red-800",
    features: ["شحن رصيد فوري", "داخل سوريا", "بالليرة السورية"],
    options: [
      { id: "syr-500", name: "500 ليرة", price: 5 },
      { id: "syr-1000", name: "1,000 ليرة", price: 9 },
      { id: "syr-5000", name: "5,000 ليرة", price: 40 },
    ]
  },
];

const iconMap: Record<string, React.ComponentType<any>> = {
  Tv, Film, Clapperboard, Music, MonitorPlay, Youtube, Apple, Package,
  Gamepad2, Monitor, PlaySquare, Smartphone, Ticket, Trophy, Target,
  Sword, Zap, Star, Flame, Crown, Shield, MessageCircle,
  Twitter, Users, CreditCard, Wifi, Phone, Wallet, Hash, Ghost,
  Instagram, Bird, Scissors, Palette, Bot, Mail, Video
};

export function getIconComponent(iconName: string): React.ComponentType<any> {
  return iconMap[iconName] || Package;
}
