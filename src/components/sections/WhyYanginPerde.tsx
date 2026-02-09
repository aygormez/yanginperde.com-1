"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const features = [
    {
        key: "tech1",
        number: "01",
        label: "AUTOMATION",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
        ),
    },
    {
        key: "tech2",
        number: "02",
        label: "INTEGRATION",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v19" /><path d="M5 10h14" /><path d="M5 15h14" /></svg>
        ),
    },
    {
        key: "tech3",
        number: "03",
        label: "DURABILITY",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93 7.76 7.76" /><path d="m16.24 16.24 2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07 7.76 16.24" /><path d="m16.24 7.76 2.83-2.83" /></svg>
        ),
    },
    {
        key: "tech4",
        number: "04",
        label: "SAFETY",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        ),
    },
];

export default function WhyYanginPerde() {
    const t = useTranslations("whyUs");

    return (
        <section className="relative py-24 md:py-32 bg-white border-t border-slate-100 overflow-hidden">

            {/* Background: Geometric Soft Shapes */}
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Manifesto */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase mb-4 block text-sm">
                                {t("manufacturingExcellence")}
                            </span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-tight mb-6">
                                {t("precision")} <br />
                                <span className="text-slate-400">{t("engineering")}</span>
                            </h2>
                            <p className="text-lg text-slate-600 font-normal leading-relaxed mb-10">
                                {t("description") || "We don't just assemble systems; we engineer safety. Every component is machined to tolerances that exceed European Standards for reliability you can trust."}
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="text-3xl font-display font-bold text-slate-900 mb-1">50K+</div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t("cyclesTested")}</div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                    <div className="text-3xl font-display font-bold text-slate-900 mb-1">100%</div>
                                    <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">{t("factoryCompliance")}</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Technical Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.key}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group relative p-8 bg-white border border-slate-200 rounded-2xl hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="absolute top-6 right-6 text-xs font-bold text-slate-300 group-hover:text-primary transition-colors">
                                    {feature.number}
                                </div>

                                <div className="mb-6 text-slate-400 group-hover:text-slate-900 transition-colors">
                                    {feature.icon}
                                </div>

                                <h3 className="text-lg font-display font-bold text-slate-900 mb-2 uppercase tracking-wide">
                                    {t(`features.${feature.key}.title`) || feature.label}
                                </h3>

                                <p className="text-sm text-slate-500 font-normal leading-relaxed">
                                    {t(`features.${feature.key}.desc`) || "High-performance components engineered for critical safety operations."}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
