"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getIndoorCategories, getProductSlugByCategory } from "@/data/products";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

// İç mekan ürün görselleri (ic-mekan-perdeleri alt dizinlerinden; yoksa kök görsel)
const indoorImages: Record<string, string> = {
    "stor-perdeler": "/images/gespera/stor-perdeler.webp",
    "screen-stor-perdeler": "/images/gespera/ic-mekan-perdeleri/screen-stor-perdeler/1.webp",
    "blackout-perdeler": "/images/gespera/ic-mekan-perdeleri/blackout-perdeler/1.webp",
    "zebra-perdeler": "/images/gespera/ic-mekan-perdeleri/zebra-perdeler/1.webp",
    "jaluzi-perdeler": "/images/gespera/ic-mekan-perdeleri/jaluzi-perdeler/1.webp",
    "dikey-perdeler": "/images/gespera/ic-mekan-perdeleri/dikey-perdeler/1.webp",
    "mefrusat-perdeler": "/images/gespera/ic-mekan-perdeleri/mefrusat-perdeler/1.webp",
    "hastane-oda-perdeleri": "/images/gespera/ic-mekan-perdeleri/hastane-oda-perdeleri/1.webp",
    "projeksiyon-perdeleri": "/images/gespera/ic-mekan-perdeleri/projeksiyon-perdeler/1.webp",
};

// İkonlar
const categoryIcons: Record<string, React.ReactNode> = {
    "stor-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 9h18M3 15h18" />
        </svg>
    ),
    "screen-stor-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
    ),
    "blackout-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    ),
    "zebra-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 7h18M3 11h18M3 15h18M3 19h18" />
        </svg>
    ),
    "jaluzi-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 8h18M3 13h18M3 18h18" />
        </svg>
    ),
    "dikey-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 3v18M12 3v18M17 3v18" />
        </svg>
    ),
    "mefrusat-perdeler": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 3h16v4H4zM4 7v14M20 7v14M8 7v14M12 7v14M16 7v14" />
        </svg>
    ),
    "hastane-oda-perdeleri": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12h14" />
            <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
    ),
    "projeksiyon-perdeleri": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="1" />
            <path d="M12 10v6M9 13h6" />
        </svg>
    ),
};

export default function IndoorPageClient() {
    const t = useTranslations("indoor");
    const locale = useLocale() as Locale;
    const categories = getIndoorCategories();

    return (
        <main className="bg-cream">
            {/* Hero Section - Anasayfa gibi dalgalı yapı */}
            <section className="relative min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
                {/* Full Width Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/gespera/ic-mekan-perdeleri.webp"
                        alt="İç Mekan Perdeleri"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full">
                    <div className="container h-full">
                        <div className="flex items-center min-h-[65vh] lg:min-h-[70vh] py-20 lg:py-24">
                            {/* Left Content - Text over image */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-xl space-y-5 lg:space-y-6"
                            >
                                {/* Main Heading */}
                                <div className="space-y-1">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-medium text-anthracite-dark leading-[1.1]"
                                    >
                                        {t("title")}
                                    </motion.h1>
                                </div>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-anthracite text-base lg:text-lg leading-relaxed max-w-md"
                                >
                                    {t("subtitle")}
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Modern Wave - Anasayfa gibi */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                        className="w-full h-20 md:h-28 lg:h-36"
                    >
                        {/* Soft gradient background */}
                        <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#F5F1EB" />
                                <stop offset="50%" stopColor="#EDE8E0" />
                                <stop offset="100%" stopColor="#F5F1EB" />
                            </linearGradient>
                        </defs>
                        {/* Third wave - subtle back layer */}
                        <path
                            d="M0,70 Q360,30 720,50 T1440,40 L1440,120 L0,120 Z"
                            fill="#E8E3DB"
                            opacity="0.6"
                        />
                        {/* Second wave - middle layer */}
                        <path
                            d="M0,60 Q280,90 560,50 Q840,10 1120,50 Q1280,70 1440,45 L1440,120 L0,120 Z"
                            fill="#EDE8E0"
                            opacity="0.8"
                        />
                        {/* Main wave - front layer */}
                        <path
                            d="M0,80 Q200,60 400,70 Q600,80 800,55 Q1000,30 1200,60 Q1320,75 1440,50 L1440,120 L0,120 Z"
                            fill="#F5F1EB"
                        />
                    </svg>
                </div>
            </section>

            {/* Products Grid - Dış mekan ile aynı düzen: ikon, başlık, resim, kısa metin + Ürün detayları */}
            <section className="pt-6 md:pt-10 pb-20 md:pb-28">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <motion.div
                                key={category.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/urunler/${getProductSlugByCategory(category.slug)}`}
                                    className="block h-full group"
                                >
                                    <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                                        {/* Başlık + ikon */}
                                        <div className="p-4 flex items-center gap-3 border-b border-border-muted">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                                {categoryIcons[category.slug]}
                                            </div>
                                            <div className="flex-1 flex items-center justify-between min-w-0">
                                                <h3 className="text-lg font-display font-medium text-text-dark group-hover:text-primary transition-colors truncate">
                                                    {getLocalized(category.name, locale)}
                                                </h3>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Image */}
                                        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
                                            <Image
                                                src={indoorImages[category.slug] || indoorImages["stor-perdeler"]}
                                                alt={getLocalized(category.name, locale) || "Indoor product"}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        {/* Kısa metin + Ürün detayları (link metni) */}
                                        <div className="p-4 pt-3 flex-1 flex flex-col">
                                            <p className="text-text-muted text-sm leading-relaxed mb-3 line-clamp-2 flex-1">
                                                {getLocalized(category.description, locale)}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                                                {t("viewDetails")}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                                                >
                                                    <path d="M5 12h14" />
                                                    <path d="m12 5 7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
