"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function HowItWorks() {
    const t = useTranslations("howItWorks");
    const [activeStage, setActiveStage] = useState(0);

    const stages = [
        {
            id: 0,
            title: t("stages.0.title"),
            description: t("stages.0.description"),
            status: t("stages.0.status")
        },
        {
            id: 1,
            title: t("stages.1.title"),
            description: t("stages.1.description"),
            status: t("stages.1.status")
        },
        {
            id: 2,
            title: t("stages.2.title"),
            description: t("stages.2.description"),
            status: t("stages.2.status")
        },
        {
            id: 3,
            title: t("stages.3.title"),
            description: t("stages.3.description"),
            status: t("stages.3.status")
        }
    ];

    return (
        <section className="py-24 bg-slate-50 border-t border-slate-200 relative overflow-hidden">

            <div className="container mx-auto px-4 md:px-8 relative z-10">

                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase mb-4 block text-sm">
                        {t("systemLogic")}
                    </span>
                    <h2 className="text-4xl font-display font-bold text-slate-900 leading-tight">
                        {t("gravityFailSafe")} <span className="text-slate-400">{t("mechanism")}</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Interactive Controls */}
                    <div className="lg:col-span-4 space-y-4">
                        {stages.map((stage, index) => (
                            <div
                                key={stage.id}
                                onClick={() => setActiveStage(index)}
                                className={`p-6 border rounded-xl cursor-pointer transition-all duration-300 ${activeStage === index ? "bg-white border-primary shadow-md" : "bg-transparent border-slate-200 hover:border-slate-300 hover:bg-white/50"}`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className={`font-bold text-xs uppercase tracking-widest ${activeStage === index ? "text-primary" : "text-slate-400"}`}>
                                        {t("step")} 0{index + 1}
                                    </span>
                                    {activeStage === index && (
                                        <motion.div layoutId="active-indicator" className="w-2 h-2 bg-primary rounded-full" />
                                    )}
                                </div>
                                <h3 className={`text-lg font-display font-bold mb-1 ${activeStage === index ? "text-slate-900" : "text-slate-500"}`}>
                                    {stage.title}
                                </h3>
                                <AnimatePresence>
                                    {activeStage === index && (
                                        <motion.p
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="text-sm text-slate-600 font-normal leading-relaxed overflow-hidden"
                                        >
                                            {stage.description}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>

                    {/* Right: Schematic Visualization */}
                    <div className="lg:col-span-8 relative aspect-video bg-white border border-slate-200 rounded-3xl p-6 flex items-center justify-center overflow-hidden shadow-sm">

                        {/* Status Overlay */}
                        <div className="absolute top-6 right-6 flex gap-4">
                            <div className="text-right">
                                <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">{t("statusLabel")}</div>
                                <div className={`px-2 py-1 rounded-md text-xs font-bold border ${activeStage === 0 ? "bg-emerald-50 text-emerald-600 border-emerald-100" : activeStage === 1 ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-red-50 text-primary border-red-100"}`}>
                                    {stages[activeStage].status}
                                </div>
                            </div>
                        </div>

                        {/* Schematic Drawing - Rounded & Softer */}
                        <div className="relative w-64 h-full border-x border-dashed border-slate-300">

                            {/* Headbox */}
                            <div className="absolute top-0 left-[-20px] right-[-20px] h-16 bg-slate-100 border border-slate-300 rounded-lg flex items-center justify-center z-20">
                                <span className="text-[9px] text-slate-500 font-bold">{t("headbox")}</span>
                            </div>

                            {/* Curtain */}
                            <motion.div
                                animate={{
                                    height: activeStage === 0 ? "0%" : activeStage === 1 ? "10%" : activeStage === 2 ? "60%" : "100%",
                                    opacity: 1
                                }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                className="absolute top-16 left-0 right-0 bg-primary/10 border-b-4 border-primary z-10"
                            >
                                <div className="w-full h-full opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_11px)]"></div>
                            </motion.div>

                            {/* Side Guides */}
                            <div className="absolute inset-y-0 left-0 w-1.5 bg-slate-200 rounded-full"></div>
                            <div className="absolute inset-y-0 right-0 w-1.5 bg-slate-200 rounded-full"></div>

                            {/* Fire/Smoke Representation */}
                            <AnimatePresence>
                                {activeStage >= 1 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute bottom-0 left-[-50px] right-[-50px] h-32 bg-gradient-to-t from-orange-500/20 to-transparent blur-xl pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
