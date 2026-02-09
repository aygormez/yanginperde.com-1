"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export default function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="relative h-screen flex items-center overflow-hidden bg-white text-foreground selection:bg-primary selection:text-white">

            {/* Background: Clean Slate Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>

            {/* Soft Ambient Gradient */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-slate-50 via-slate-50/50 to-transparent"></div>

            <div className="container relative z-10 mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12 items-center h-full pt-20">

                {/* Left Content */}
                <div className="lg:col-span-7 flex flex-col justify-center">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6 flex items-center gap-4"
                    >
                        <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-primary font-mono text-xs font-bold tracking-wider uppercase">
                            {t("advancedEngineering")}
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight mb-8 text-slate-900"
                    >
                        Invisible <br />
                        <span className="text-slate-400">Protection.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed mb-10"
                    >
                        {t("subtitle") || "Architecturally integrated fire and smoke strategies designed for modern living environments."}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex items-center gap-4"
                    >
                        <Link href="/urunler">
                            <button className="px-8 py-4 bg-slate-900 text-white rounded-lg font-display font-medium tracking-wide hover:bg-primary transition-colors hover:shadow-lg shadow-md">
                                {t("primaryButton") || "View Systems"}
                            </button>
                        </Link>
                        <Link href="/iletisim">
                            <button className="px-8 py-4 border border-slate-200 text-slate-700 bg-white rounded-lg font-display font-medium tracking-wide hover:border-slate-300 hover:bg-slate-50 transition-colors shadow-sm">
                                {t("secondaryButton") || "Contact Support"}
                            </button>
                        </Link>
                    </motion.div>

                </div>

                {/* Right Content: Friendly Tech Visualization */}
                <div className="lg:col-span-5 relative h-full hidden lg:flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="relative z-10 w-full max-w-md"
                    >
                        {/* Soft Tech Card */}
                        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 shadow-xl rounded-2xl p-8 relative overflow-hidden">
                            {/* Decorative Line */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-slate-400"></div>

                            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t("systemStatus")}</span>
                                <div className="flex items-center gap-2 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-emerald-600">{t("online")}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-500 font-medium">{t("fireIntegrity")}</span>
                                        <span className="text-slate-900 font-bold font-mono">120 MIN</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5, delay: 1 }}
                                            className="h-full bg-primary rounded-full"
                                        ></motion.div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-slate-500 font-medium">{t("radiationControl")}</span>
                                        <span className="text-slate-900 font-bold font-mono">60 MIN</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "60%" }}
                                            transition={{ duration: 1.5, delay: 1.2 }}
                                            className="h-full bg-slate-400 rounded-full"
                                        ></motion.div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t("standard")}</div>
                                    <div className="text-lg font-display text-slate-800 font-bold">EN 1634-1</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t("certifiedBy")}</div>
                                    <div className="text-lg font-display text-slate-800 font-bold">UL / EFECTIS</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
