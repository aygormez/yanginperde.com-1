"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Product, LocalizedString, LocalizedStringArray } from "@/types";
import { Gallery, ProductCard } from "@/components/shared";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n/config";

interface ProductDetailClientProps {
    product: Product;
    relatedProducts: Product[];
    locale: Locale;
}

// Helper function to get localized content with fallback
function getLocalizedArray(obj: LocalizedStringArray | undefined, locale: Locale): string[] {
    if (!obj) return [];
    return obj[locale] || obj["tr"] || obj["en"] || [];
}

function getLocalizedString(obj: LocalizedString | undefined, locale: Locale): string {
    if (!obj) return "";
    return obj[locale] || obj["tr"] || obj["en"] || "";
}

export default function ProductDetailClient({
    product,
    relatedProducts,
    locale,
}: ProductDetailClientProps) {
    const t = useTranslations("productDetail");

    // Get localized content with fallbacks
    const features = getLocalizedArray(product.features, locale);
    const usageAreas = getLocalizedArray(product.usageAreas, locale);
    const advantages = getLocalizedArray(product.advantages, locale);
    const name = getLocalizedString(product.name, locale);
    const shortDescription = getLocalizedString(product.shortDescription, locale);
    const description = getLocalizedString(product.description, locale);

    return (
        <main className="bg-cream">
            {/* Hero Section - Modern & Minimalist */}
            <section className="pt-28 pb-20">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                        {/* Gallery - mobilde sticky yok, sadece lg'de sabit kalsın; böylece açıklama metni görsellerin altında kaymaz */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:sticky lg:top-32"
                        >
                            <Gallery images={product.images} alt={name || "Product"} />
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-8"
                        >
                            {/* Title */}
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-anthracite-dark leading-tight">
                                    {name}
                                </h1>

                                {/* Short Description */}
                                <p className="text-xl text-anthracite leading-relaxed">
                                    {shortDescription}
                                </p>
                            </div>

                            {/* Description */}
                            <div className="pt-4 border-t border-border-muted">
                                <p className="text-anthracite leading-relaxed text-lg">
                                    {description}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section - Modern Grid */}
            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark mb-12 text-center">
                            {locale === "tr" ? "Özellikler" : "Features"}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="flex items-start gap-4 p-6 bg-cream/30 rounded-xl hover:bg-cream/50 transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-primary"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <p className="text-text-dark leading-relaxed">{feature}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technical Details Section - Modern Table */}
            <section className="py-20 bg-gradient-to-b from-cream to-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark mb-12 text-center">
                            {t("specifications")}
                        </h2>

                        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border-muted/50">
                            <div className="divide-y divide-border-muted/30">
                                {product.specifications.map((spec, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center justify-between py-5 px-8 hover:bg-cream/30 transition-colors"
                                    >
                                        <span className="font-medium text-text-dark">
                                            {spec.label}
                                        </span>
                                        <span className="text-text-muted font-medium">
                                            {spec.value}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Usage Areas & Advantages - Ultra Modern Layout */}
            <section className="py-20 bg-gradient-to-b from-white via-cream/20 to-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
                        {/* Usage Areas */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="mb-8 pb-4 border-b border-primary/20">
                                <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark">
                                    {t("usageAreas")}
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {usageAreas.map((area, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 4 }}
                                        className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-border-muted/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                        </div>
                                        <span className="text-text-dark font-medium group-hover:text-primary transition-colors">{area}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Advantages */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <div className="mb-8 pb-4 border-b border-primary/20">
                                <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark">
                                    {t("advantages")}
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {advantages.map((advantage, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 4 }}
                                        className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-border-muted/50 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                <polyline points="22 4 12 14.01 9 11.01" />
                                            </svg>
                                        </div>
                                        <span className="text-text-dark leading-relaxed font-medium group-hover:text-primary transition-colors pt-1">{advantage}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && product.category !== "jaluzi-perdeler" && (
                <section className="py-20 bg-gradient-to-b from-white to-cream">
                    <div className="container">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-medium text-text-dark mb-4">
                                {t("relatedProducts")}
                            </h2>
                            <p className="text-text-muted">
                                {locale === "tr" ? "Benzer ürünlerimizi keşfedin" : "Discover similar products"}
                            </p>
                        </motion.div>
                        <motion.div
                            variants={STAGGER_CONTAINER}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {relatedProducts.map((relProduct, index) => (
                                <ProductCard key={relProduct.id} product={relProduct} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}
        </main>
    );
}
