// ================================
// Localization Types
// ================================

// Localized string type for multi-language support
export interface LocalizedString {
    tr: string;
    en: string;
    de?: string;
    es?: string;
    fr?: string;
    ar?: string;
    [key: string]: string | undefined;
}

export interface LocalizedStringArray {
    tr: string[];
    en: string[];
    de?: string[];
    es?: string[];
    fr?: string[];
    ar?: string[];
    [key: string]: string[] | undefined;
}

// ================================
// Product Types
// ================================

// Ana Kategoriler
export type MainCategory = "dis-mekan" | "ic-mekan";

// Dış Mekan Ürün Kategorileri
export type OutdoorCategory =
    | "dikey-zip-perde"
    | "yatay-zip-perde"
    | "sineklik-sistemleri"
    | "pergola-sistemleri"
    | "tente-sistemleri";

// İç Mekan Ürün Kategorileri
export type IndoorCategory =
    | "stor-perdeler"
    | "screen-stor-perdeler"
    | "blackout-perdeler"
    | "zebra-perdeler"
    | "jaluzi-perdeler"
    | "dikey-perdeler"
    | "mefrusat-perdeler"
    | "hastane-oda-perdeleri"
    | "projeksiyon-perdeleri";

// Tüm Ürün Kategorileri
export type ProductCategory = OutdoorCategory | IndoorCategory;

// Legacy support (eski kategori isimlerini yenilere map etmek için)
export type LegacyProductCategory =
    | "stor-perde"
    | "motorlu-perde"
    | "screen-perde"
    | "blackout-perde"
    | "dis-cephe-jaluzi"
    | "zip-perde"
    | "projeksiyon-perdesi"
    | "tente-sistemleri"
    | "yangin-perdesi"
    | "jaluzi-perde"
    | "dis-mekan-yasam"
    | "zip-screen"
    | "cam-balkon"
    | "pergola";

export interface ProductSpecification {
    label: string;
    value: string;
}

export interface Product {
    id: string;
    slug: string;
    category: ProductCategory;
    name: LocalizedString;
    shortDescription: LocalizedString;
    description: LocalizedString;
    features: LocalizedStringArray;
    specifications: ProductSpecification[];
    usageAreas: LocalizedStringArray;
    advantages: LocalizedStringArray;
    images: string[];
    featured: boolean;
    order: number;
}

// ================================
// Project Types
// ================================

export type ProjectCategory =
    | "residential"
    | "commercial"
    | "hotel"
    | "villa";

export interface Project {
    id: string;
    slug: string;
    category: ProjectCategory;
    title: LocalizedString;
    description: LocalizedString;
    location: string;
    year: number;
    products: string[]; // Flexible to support both old and new category names
    images: string[];
    featured: boolean;
}

// ================================
// Company Types
// ================================

export interface CompanyInfo {
    name: string;
    legalName: string;
    address: {
        street: string;
        district: string;
        city: string;
        country: string;
        postalCode?: string;
    };
    phone: string;
    mobile: string;
    email: string;
    website: string;
    socialMedia: {
        instagram?: string;
        facebook?: string;
        linkedin?: string;
        youtube?: string;
    };
    workingHours: {
        weekdays: string;
        weekend: string;
    };
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface Statistic {
    value: number;
    suffix?: string;
    label: LocalizedString;
}

// ================================
// Form Types
// ================================

export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

// ================================
// UI Types
// ================================

export interface NavItem {
    label: string;
    href: string;
    children?: NavItem[];
}

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

// ================================
// SEO Types
// ================================

export interface SEOData {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
}

// ================================
// Animation Types
// ================================

export interface AnimationVariants {
    hidden: object;
    visible: object;
}

// ================================
// Category Info
// ================================

export interface CategoryInfo {
    slug: string; // Flexible to support all category slugs
    mainCategory?: MainCategory;
    name: LocalizedString;
    description: LocalizedString;
    icon: string;
    image: string;
    order?: number;
}

// Ana Kategori Bilgisi
export interface MainCategoryInfo {
    slug: MainCategory;
    name: LocalizedString;
    description: LocalizedString;
    image: string;
}
