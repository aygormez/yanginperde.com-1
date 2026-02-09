import { CategoryInfo, CompanyInfo, Statistic } from "@/types";

// ================================
// Company Information
// ================================

export const COMPANY_INFO: CompanyInfo = {
    name: "YANGIN PERDE",
    legalName: "YMA Yapı Sistemleri San. ve Tic. Ltd. Şti.",
    address: {
        street: "Hamidiye Mah. Kemerburgaz Cad. No: 152/6",
        district: "Kağıthane",
        city: "İstanbul",
        country: "Türkiye",
    },
    phone: "0212 294 82 80",
    mobile: "0532 294 34 36",
    email: "info@yanginperde.com",
    website: "https://yanginperde.com",
    socialMedia: {
        instagram: "https://www.instagram.com/yanginperde/", // Placeholder
        facebook: "https://www.facebook.com/yanginperde/", // Placeholder
        linkedin: "",
        youtube: "",
    },
    workingHours: {
        weekdays: "09:00 - 18:00",
        weekend: "Kapalı",
    },
    coordinates: {
        lat: 41.0789,
        lng: 28.9647,
    },
};

// ================================
// Statistics
// ================================

export const STATISTICS: Statistic[] = [
    {
        value: 20,
        suffix: "+",
        label: { tr: "Yıllık Deneyim", en: "Years of Experience" },
    },
    {
        value: 1000,
        suffix: "+",
        label: { tr: "Tamamlanan Proje", en: "Completed Projects" },
    },
    {
        value: 50,
        suffix: "+",
        label: { tr: "Bayi Ağı", en: "Dealer Network" },
    },
    {
        value: 5,
        label: { tr: "İhracat Ülkesi", en: "Export Countries" },
    },
];

// ================================
// Product Categories
// ================================

export const PRODUCT_CATEGORIES: CategoryInfo[] = [
    {
        slug: "yangin-perdesi",
        name: { tr: "Yangın Perdesi", en: "Fire Curtain" },
        description: {
            tr: "E ve EW sınıfı yangın perdeleri. Alev ve ısı kontrolü.",
            en: "E and EW class fire curtains. Flame and heat control.",
        },
        icon: "fire",
        image: "/images/products/yangin-perdesi-category.jpg",
    },
    {
        slug: "duman-perdesi",
        name: { tr: "Duman Perdesi", en: "Smoke Curtain" },
        description: {
            tr: "Otomatik ve sabit duman perdeleri. Güvenli tahliye.",
            en: "Automatic and fixed smoke curtains. Safe evacuation.",
        },
        icon: "smoke",
        image: "/images/products/duman-perdesi-category.jpg",
    },
    {
        slug: "konveyor-sistem",
        name: { tr: "Konveyör Sistem", en: "Conveyor System" },
        description: {
            tr: "Konveyör bant geçişleri için yangın kapanları.",
            en: "Fire shutters for conveyor belt passages.",
        },
        icon: "conveyor",
        image: "/images/products/konveyor-category.jpg",
    },
    {
        slug: "otomatik-perde",
        name: { tr: "Otomatik Perde", en: "Automatic Curtain" },
        description: {
            tr: "Yangın anında otomatik kapanan perde sistemleri.",
            en: "Curtain systems closing automatically during fire.",
        },
        icon: "automatic",
        image: "/images/products/otomatik-perde-category.jpg",
    },
];

// ================================
// Navigation
// ================================

export const NAV_ITEMS = [
    { key: "fire", href: "/urunler/yangin-perdesi" },
    { key: "smoke", href: "/urunler/duman-perdesi" },
    { key: "customSolutions", href: "/ozel-cozumler" },
    { key: "about", href: "/hakkimizda" },
];

// Legacy NAV_ITEMS for backward compatibility
export const LEGACY_NAV_ITEMS = [
    { key: "home", href: "/" },
    { key: "products", href: "/urunler" },
    { key: "about", href: "/hakkimizda" },
    { key: "contact", href: "/iletisim" },
];

// ================================
// External Links
// ================================

export const EXTERNAL_LINKS = {
    dealerPanel: "https://panel.aymez.com",
    login: "https://panel.aymez.com",
    instagram: "https://www.instagram.com/yanginperde/",
    facebook: "https://www.facebook.com/yanginperde/",
    linkedin: "",
    youtube: "",
};

// ================================
// Animation Variants
// ================================

export const FADE_IN_UP = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export const FADE_IN = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export const SCALE_IN = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
};

export const SLIDE_IN_LEFT = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
};

export const SLIDE_IN_RIGHT = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
};

export const STAGGER_CONTAINER = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// ================================
// Breakpoints
// ================================

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};

// ================================
// SEO Defaults
// ================================

export const DEFAULT_SEO = {
    siteName: "YANGIN PERDE",
    siteUrl: "https://yanginperde.com",
    twitterHandle: "@yanginperde",
    defaultOgImage: "/images/og-default.jpg",
};
