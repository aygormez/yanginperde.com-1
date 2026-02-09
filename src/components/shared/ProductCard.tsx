"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const locale = useLocale() as Locale;
    const t = useTranslations("products.card");

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <Link href={`/urunler/${product.slug}`}>
                <motion.article
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={cn(
                        "group relative bg-white rounded-3xl overflow-hidden",
                        "shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)]",
                        "transition-shadow duration-500"
                    )}
                >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                            src={product.images[0] || "/images/placeholder-product.jpg"}
                            alt={getLocalized(product.name, locale) || "Product"}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />

                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-7">
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-semibold text-text-dark group-hover:text-primary-dark transition-colors duration-300 mb-2">
                            {getLocalized(product.name, locale)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm md:text-base text-text-muted line-clamp-2 leading-relaxed">
                            {getLocalized(product.shortDescription, locale)}
                        </p>

                        {/* Bottom Arrow - Appears on Hover */}
                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-xs font-medium text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {locale === "tr" ? "Detayları Gör" : "View Details"}
                            </span>
                            <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
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
                                    className="text-text-muted group-hover:text-white transition-colors duration-300 -rotate-45"
                                >
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </motion.article>
            </Link>
        </motion.div>
    );
}
