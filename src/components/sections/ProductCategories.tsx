"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Locale } from "@/i18n/config";

function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    if (typeof obj === 'string') return obj;
    return obj[locale] || obj["tr"] || obj["en"];
}

const mainCategoryData = [
    {
        slug: "dis-mekan",
        href: "/dis-mekan",
        image: "/images/products/fire-curtain-vertical.png",
        code: "FC-E120",
        name: {
            tr: "Yangın Sistemleri",
            en: "Fire Systems",
        },
        description: {
            tr: "E120 ve E Sınıfı Sertifikalı Yangın Perdeleri",
            en: "E120 and E Class Certified Fire Curtains",
        },
    },
    {
        slug: "ic-mekan",
        href: "/ic-mekan",
        image: "/images/products/smoke-curtain-auto.png",
        code: "SC-DH60",
        name: {
            tr: "Duman Kontrol",
            en: "Smoke Control",
        },
        description: {
            tr: "Otomatik ve Sabit Duman Perdeleri",
            en: "Automatic and Fixed Smoke Curtains",
        },
    },
    {
        slug: "ozel-cozumler",
        href: "/ozel-cozumler",
        image: "/images/products/fire-door.png",
        code: "CS-CUSTOM",
        name: {
            tr: "Özel Çözümler",
            en: "Custom Solutions",
        },
        description: {
            tr: "Endüstriyel Kapılar ve Konveyör Sistemleri",
            en: "Industrial Doors and Conveyor Systems",
        },
    },
];

export default function ProductCategories() {
    const t = useTranslations("categories");
    const locale = useLocale() as Locale;

    return (
        <section className="py-24 md:py-32 bg-slate-50 relative border-t border-slate-200">

            {/* Header */}
            <div className="container mx-auto px-4 md:px-8 mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block text-sm">
                        {t("systemCatalog")}
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 leading-tight">
                        {t("engineered")} <span className="text-slate-400">{t("solutions")}</span>
                    </h2>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-[1px] w-24 bg-slate-300 hidden md:block"></div>
                    <span className="text-xs font-bold text-slate-500 uppercase">ISO 9001:2015 / EN 1634-1</span>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mainCategoryData.map((category, index) => (
                        <motion.div
                            key={category.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white border border-slate-200 rounded-2xl hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden"
                        >
                            <Link href={category.href} className="flex-1 flex flex-col">

                                {/* Image Container */}
                                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden border-b border-slate-100">
                                    <Image
                                        src={category.image}
                                        alt={getLocalized(category.name, locale) || "System"}
                                        fill
                                        className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 hover:grayscale-0 grayscale"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />

                                    {/* Corner ID - Softened */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-sm">
                                        <span className="text-[10px] font-bold text-slate-800 tracking-wider">{category.code}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <h3 className="text-xl font-display font-bold text-slate-900 uppercase mb-2 group-hover:text-primary transition-colors">
                                            {getLocalized(category.name, locale)}
                                        </h3>
                                    </div>

                                    <p className="text-sm text-slate-500 font-normal leading-relaxed mb-6 flex-1">
                                        {getLocalized(category.description, locale)}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                                        <span className="text-[11px] font-bold text-slate-500 uppercase group-hover:text-slate-900 transition-colors">{t("viewDetails")}</span>
                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                                <polyline points="12 5 19 12 12 19"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
