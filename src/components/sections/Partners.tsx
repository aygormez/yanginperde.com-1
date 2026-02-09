"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Locale } from "@/i18n/config";

// Helper for localization
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    if (typeof obj === 'string') return obj;
    return obj[locale] || obj["tr"] || obj["en"];
}

const partners = [
    {
        name: "Somfy",
        logo: "/images/partners/somfy.svg",
        url: "https://www.somfy.com",
        description: { tr: "Motorlu Sistemler", en: "Motorized Systems" }
    },
    {
        name: "Intisi",
        logo: "/images/partners/intisi.svg",
        url: "https://www.intisi.com",
        description: { tr: "Yangın Kumaşları", en: "Fire Engineered Fabrics" }
    },
    {
        name: "Vertisol",
        logo: "/images/partners/vertisol.svg",
        url: "https://www.vertisol.com",
        description: { tr: "Teknik Kumaşlar", en: "Technical Fabrics" }
    },
    {
        name: "Somfy",
        logo: "/images/partners/somfy.svg",
        url: "https://www.somfy.com",
        description: { tr: "Motorlu Sistemler", en: "Motorized Systems" }
    },
    {
        name: "Intisi",
        logo: "/images/partners/intisi.svg",
        url: "https://www.intisi.com",
        description: { tr: "Yangın Kumaşları", en: "Fire Engineered Fabrics" }
    },
];

export default function Partners() {
    const t = useTranslations("partners");
    const locale = useLocale() as Locale;

    const duplicatedPartners = [...partners, ...partners];

    return (
        <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
            <div className="container relative z-10 px-4 md:px-8">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4 block">
                            CERTIFIED SUPPLY CHAIN
                        </span>
                        <h2 className="text-3xl md:text-4xl font-display font-medium text-white uppercase">
                            {t("title")}
                        </h2>
                    </div>
                    <div className="h-px bg-white/20 flex-1 ml-8 hidden md:block mb-4"></div>
                </div>

                {/* Partners Marquee - Dark Mode */}
                <div className="relative py-12 border-y border-white/10 bg-white/5">
                    {/* Gradient Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 30,
                                    ease: "linear",
                                },
                            }}
                            className="flex gap-20 md:gap-32 items-center"
                        >
                            {duplicatedPartners.map((partner, index) => (
                                <div key={`${partner.name}-${index}`} className="flex flex-col items-center justify-center flex-shrink-0 group opacity-50 hover:opacity-100 transition-opacity duration-300">
                                    <div className="relative w-40 h-20 brightness-0 invert filter">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name || "Partner logo"}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-gray-500 mt-4 uppercase tracking-widest">
                                        {getLocalized(partner.description, locale)}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Technical Stats Grid - Dark */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-16">
                    <div className="bg-[#0a0a0a] p-8 text-center group hover:bg-[#111] transition-colors">
                        <div className="text-4xl font-display font-bold text-white mb-2">5+</div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{t("stats.globalBrands")}</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-8 text-center group hover:bg-[#111] transition-colors">
                        <div className="text-4xl font-display font-bold text-white mb-2">25+</div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{t("stats.yearsPartnership")}</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-8 text-center group hover:bg-[#111] transition-colors">
                        <div className="text-4xl font-display font-bold text-white mb-2">100%</div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{t("stats.originalParts")}</div>
                    </div>
                    <div className="bg-[#0a0a0a] p-8 text-center group hover:bg-[#111] transition-colors">
                        <div className="text-4xl font-display font-bold text-white mb-2">12</div>
                        <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{t("stats.exportCountries")}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
