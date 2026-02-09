"use client";

import { useState, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { products } from "@/data/products";
import { PRODUCT_CATEGORIES, STAGGER_CONTAINER } from "@/lib/constants";
import { ProductCard } from "@/components/shared";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

export default function ProductsPageClient() {
    const locale = useLocale() as Locale;
    const t = useTranslations("products");
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("kategori") || "all";
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "all") return products;
        return products.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const filterOptions = [
        { slug: "all", name: { tr: "Tümü", en: "All" } },
        ...PRODUCT_CATEGORIES,
    ];

    const activeFilter = filterOptions.find(f => f.slug === activeCategory);

    return (
        <div className="min-h-screen">
            {/* Hero Section - Ana sayfa tarzında */}
            <section className="relative min-h-[60vh] lg:min-h-[65vh] overflow-hidden">
                {/* Full Width Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/gespera/products.webp"
                        alt="GESPERA Ürün Koleksiyonu"
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                        unoptimized
                    />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full">
                    <div className="container h-full">
                        <div className="flex items-center min-h-[60vh] lg:min-h-[65vh] py-20 lg:py-24">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="max-w-xl space-y-5 lg:space-y-6"
                            >
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full"
                                >
                                    <span className="w-2 h-2 bg-primary rounded-full" />
                                    <span className="text-sm font-medium text-primary">
                                        {locale === "tr" ? "Üretim Portföyümüz" : "Our Production Portfolio"}
                                    </span>
                                </motion.div>

                                {/* Main Heading */}
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] xl:text-6xl font-display font-medium leading-[1.1]"
                                    style={{ color: '#8B7355' }}
                                >
                                    {locale === "tr" ? "Gölgelendirme Sistemleri" : "Shading Systems"}
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-anthracite text-base lg:text-lg leading-relaxed max-w-md"
                                >
                                    {locale === "tr" 
                                        ? "Avrupa standartlarında üretim kalitesiyle, modern mimari projeler için gölgelendirme sistemleri üretiyoruz." 
                                        : "We manufacture shading systems for modern architectural projects with European standard production quality."}
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Modern Wave */}
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20 md:h-28 lg:h-36">
                        <path d="M0,70 Q360,30 720,50 T1440,40 L1440,120 L0,120 Z" fill="#E8E3DB" opacity="0.6" />
                        <path d="M0,60 Q280,90 560,50 Q840,10 1120,50 Q1280,70 1440,45 L1440,120 L0,120 Z" fill="#EDE8E0" opacity="0.8" />
                        <path d="M0,80 Q200,60 400,70 Q600,80 800,55 Q1000,30 1200,60 Q1320,75 1440,50 L1440,120 L0,120 Z" fill="#F5F1EB" />
                    </svg>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 md:py-20 bg-cream-light">
                <div className="container">
                    {/* Active Category Title */}
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 md:mb-14"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-primary" />
                            <h2 className="text-2xl md:text-3xl font-display font-medium text-text-dark">
                                {activeFilter ? getLocalized(activeFilter.name, locale) : ""}
                            </h2>
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={STAGGER_CONTAINER}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {filteredProducts.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cream-dark rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.3-4.3" />
                                </svg>
                            </div>
                            <p className="text-text-muted text-lg">
                                {locale === "tr"
                                    ? "Bu kategoride henüz ürün bulunmamaktadır."
                                    : "No products found in this category."}
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
}
