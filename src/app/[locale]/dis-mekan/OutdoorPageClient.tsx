"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getOutdoorCategories, getProductSlugByCategory } from "@/data/products";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

// Dış mekan ürün görselleri (dis-mekan-perdeleri alt dizinlerinden)
const outdoorImages: Record<string, string> = {
    "dikey-zip-perde": "/images/gespera/dis-mekan-perdeleri/dikey-zip-perde/1.webp",
    "yatay-zip-perde": "/images/gespera/dis-mekan-perdeleri/yatay-zip-perde/1.webp",
    "sineklik-sistemleri": "/images/gespera/dis-mekan-perdeleri/sineklik-sistemleri/1.webp",
    "pergola-sistemleri": "/images/gespera/dis-mekan-perdeleri/pergola-sistemleri/1.webp",
    "tente-sistemleri": "/images/gespera/dis-mekan-perdeleri/tente/1.webp",
};

// Dış mekan kategorileri için anlamlı ikonlar
const outdoorCategoryIcons: Record<string, React.ReactNode> = {
    "dikey-zip-perde": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 3v18M11 3v18M15 3v18M19 3v18" />
        </svg>
    ),
    "yatay-zip-perde": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M3 7h18M3 11h18M3 15h18M3 19h18" />
        </svg>
    ),
    "sineklik-sistemleri": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M2 8h20M2 12h20M2 16h20M6 8v8M10 8v8M14 8v8M18 8v8" />
        </svg>
    ),
    "pergola-sistemleri": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16v3H4zM4 10h16M4 16h16M4 20h16" />
            <path d="M4 4v16M8 4v16M12 4v16M16 4v16M20 4v16" />
        </svg>
    ),
    "tente-sistemleri": (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 20h18M4 20V10l8-6 8 6v10M4 10h16" />
        </svg>
    ),
};

// Detaylı ürün bilgileri
const outdoorProductDetails = {
    "dikey-zip-perde": {
        features: {
            tr: [
                "Rüzgâr dayanımlı zip sistem",
                "Isı, güneş ve UV koruması",
                "Motorlu ve uzaktan kumandalı",
                "Teras, balkon, kafe ve restoranlar için ideal",
            ],
            en: [
                "Wind resistant zip system",
                "Heat, sun and UV protection",
                "Motorized with remote control",
                "Ideal for terraces, balconies, cafes and restaurants",
            ],
        },
    },
    "yatay-zip-perde": {
        features: {
            tr: [
                "Cam tavan ve pergola altı uygulamalar",
                "Güneş kontrolü ve gölgelendirme",
                "Sessiz ve direkmotor sistemi",
                "Modern mimariye uyumlu tasarım",
            ],
            en: [
                "Glass roof and under pergola applications",
                "Sun control and shading",
                "Silent direct motor system",
                "Design compatible with modern architecture",
            ],
        },
    },
    "sineklik-sistemleri": {
        features: {
            tr: [
                "Plise sineklik",
                "Dikey ve yatay sineklik çözünleri",
                "Dayanıklı alüminyum profil",
                "Konut ve ticari alanlar için şık çözüm",
            ],
            en: [
                "Pleated insect screen",
                "Vertical and horizontal screen solutions",
                "Durable aluminum profile",
                "Stylish solution for residential and commercial areas",
            ],
        },
    },
    "pergola-sistemleri": {
        features: {
            tr: [
                "Açılır-kapanır pergola",
                "Dört mevsim kullanım",
                "Entegre LED aydınlatma opsiyonu",
                "Kafe, restoran ve villa projeleri",
            ],
            en: [
                "Opening-closing pergola",
                "All-season use",
                "Integrated LED lighting option",
                "Cafe, restaurant and villa projects",
            ],
        },
    },
    "tente-sistemleri": {
        features: {
            tr: [
                "Mafsallı ve kasalı tente seçenekleri",
                "Akrilik kumaş",
                "Manuel veya motorlu",
                "Geniş gölgelendirme alanı",
            ],
            en: [
                "Folding arm and cassette awning options",
                "Acrylic fabric",
                "Manual or motorized",
                "Wide shading area",
            ],
        },
    },
};

export default function OutdoorPageClient() {
    const t = useTranslations("outdoor");
    const locale = useLocale() as Locale;
    const categories = getOutdoorCategories();

    return (
        <main className="bg-cream">
            {/* Hero Section - Anasayfa gibi dalgalı yapı */}
            <section className="relative min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
                {/* Full Width Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/gespera/dis-mekan-perdeleri.webp"
                        alt="Dış Mekan Perdeleri"
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

            {/* Products Grid - İç mekan ile aynı düzen, başlıklarda ikon yok; altta kısa metin + Ürün detayları linki */}
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
                                        {/* Başlık + ikon (iç mekan gibi) */}
                                        <div className="p-4 flex items-center gap-3 border-b border-border-muted">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                                                {outdoorCategoryIcons[category.slug]}
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
                                                src={outdoorImages[category.slug] || outdoorImages["dikey-zip-perde"]}
                                                alt={getLocalized(category.name, locale) || "Outdoor product"}
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
