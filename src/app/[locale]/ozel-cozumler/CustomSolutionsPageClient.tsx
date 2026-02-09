"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FADE_IN_UP, STAGGER_CONTAINER } from "@/lib/constants";
import { Locale } from "@/i18n/config";

const SERVICE_KEYS = ["consulting", "customProduction", "getQuote"] as const;

const serviceIcons: Record<(typeof SERVICE_KEYS)[number], React.ReactNode> = {
    consulting: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    customProduction: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    getQuote: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    ),
};

export default function CustomSolutionsPageClient() {
    const t = useTranslations("customSolutions");
    const locale = useLocale() as Locale;

    return (
        <main className="bg-cream">
            {/* Hero - dalgalı yapı */}
            <section className="relative min-h-[65vh] lg:min-h-[70vh] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/gespera/ozel-cozumler.webp"
                        alt={t("title")}
                        fill
                        priority
                        quality={90}
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/95 via-cream/70 to-transparent" />
                </div>
                <div className="relative z-10 h-full">
                    <div className="container h-full">
                        <div className="flex items-center min-h-[65vh] lg:min-h-[70vh] py-20 lg:py-24">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-3xl"
                            >
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-anthracite-dark leading-tight mb-6">
                                    {t("title")}
                                </h1>
                                <p className="text-lg md:text-xl text-anthracite leading-relaxed">
                                    {t("subtitle")}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-20 md:h-28 lg:h-36">
                        <path d="M0,70 Q360,30 720,50 T1440,40 L1440,120 L0,120 Z" fill="#E8E3DB" opacity="0.6" />
                        <path d="M0,60 Q280,90 560,50 Q840,10 1120,50 Q1280,70 1440,45 L1440,120 L0,120 Z" fill="#EDE8E0" opacity="0.8" />
                        <path d="M0,80 Q200,60 400,70 Q600,80 800,55 Q1000,30 1200,60 Q1320,75 1440,50 L1440,120 L0,120 Z" fill="#F5F1EB" />
                    </svg>
                </div>
            </section>

            {/* Giriş metni */}
            <section className="py-16 md:py-24 bg-cream">
                <div className="container max-w-3xl">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-anthracite leading-relaxed text-base md:text-lg text-center"
                    >
                        {t("intro")}
                    </motion.p>
                </div>
            </section>

            {/* Hizmet kartları */}
            <section className="py-16 md:py-24 bg-cream">
                <div className="container">
                    <motion.div
                        variants={STAGGER_CONTAINER}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
                    >
                        {SERVICE_KEYS.map((key) => (
                            <motion.div
                                key={key}
                                variants={FADE_IN_UP}
                                className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border-muted/50 hover:shadow-md transition-all flex flex-col"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 text-primary flex-shrink-0">
                                    {serviceIcons[key]}
                                </div>
                                <h2 className="text-xl font-display font-medium text-anthracite-dark mb-3">
                                    {t(`services.${key}.title`)}
                                </h2>
                                <p className="text-text-muted leading-relaxed text-sm md:text-base flex-1 mb-6">
                                    {t(`services.${key}.description`)}
                                </p>
                                <Link
                                    href="/iletisim"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                >
                                    {t("ctaContact")}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container text-center max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl md:text-3xl font-display font-medium text-anthracite-dark mb-4">
                            {t("ctaTitle")}
                        </h2>
                        <p className="text-text-muted mb-8">
                            {t("ctaSubtitle")}
                        </p>
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all shadow-md hover:shadow-lg"
                            style={{ backgroundColor: "#8B7355" }}
                        >
                            {locale === "tr" ? "İletişime Geçin" : "Get in Touch"}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
