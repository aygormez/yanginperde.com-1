"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const steps = [
    {
        key: "step1",
        number: "01",
        label: "ANALYSIS",
    },
    {
        key: "step2",
        number: "02",
        label: "DESIGN",
    },
    {
        key: "step3",
        number: "03",
        label: "PRODUCTION",
    },
    {
        key: "step4",
        number: "04",
        label: "INSTALLATION",
    },
];

export default function Process() {
    const t = useTranslations("process");

    return (
        <section className="relative py-32 bg-black text-white border-t border-white/10">
            <div className="container mx-auto px-4 md:px-8">

                {/* Section Header */}
                <div className="text-center mb-24">
                    <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 block">WORKFLOW</span>
                    <h2 className="text-4xl lg:text-5xl font-display font-bold text-white uppercase">
                        {t("title") || "PROJECT LIFECYCLE"}
                    </h2>
                </div>

                {/* Timeline Container */}
                <div className="relative">

                    {/* Central Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>

                    <div className="space-y-12 md:space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.key}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Content Side */}
                                <div className={`flex-1 w-full text-center ${index % 2 === 0 ? 'md:text-left md:pl-16' : 'md:text-right md:pr-16'}`}>
                                    <h3 className="text-2xl font-display font-bold text-white mb-2 uppercase tracking-wide">
                                        {t(`steps.${step.key}.title`) || step.label}
                                    </h3>
                                    <p className="text-gray-500 font-mono text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
                                        {t(`steps.${step.key}.desc`) || "Comprehensive assessment of architectural requirements and safety regulations."}
                                    </p>
                                </div>

                                {/* Center Point */}
                                <div className="relative z-10 flex items-center justify-center w-16 h-16 border border-white/20 bg-black rounded-full shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                                    <span className="font-mono text-sm font-bold text-white">{step.number}</span>
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
