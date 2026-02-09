"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

export default function References() {
    const t = useTranslations("references");

    // Placeholder data - in a real app this would come from the CMS/API
    const projects = [
        {
            id: 1,
            title: "Istanbul Airport",
            category: t("items.0.category"),
            image: "/images/projects/airport.jpg",
            stats: [
                { label: t("items.0.stats.0.label"), value: t("items.0.stats.0.value") },
                { label: t("items.0.stats.1.label"), value: t("items.0.stats.1.value") }
            ]
        },
        {
            id: 2,
            title: "Vadistanbul Mall",
            category: t("items.1.category"),
            image: "/images/projects/mall.jpg",
            stats: [
                { label: t("items.1.stats.0.label"), value: t("items.1.stats.0.value") },
                { label: t("items.1.stats.1.label"), value: t("items.1.stats.1.value") }
            ]
        },
        {
            id: 3,
            title: "City Hospital",
            category: t("items.2.category"),
            image: "/images/projects/hospital.jpg",
            stats: [
                { label: t("items.2.stats.0.label"), value: t("items.2.stats.0.value") },
                { label: t("items.2.stats.1.label"), value: t("items.2.stats.1.value") }
            ]
        },
        {
            id: 4,
            title: "Tech Tower",
            category: t("items.3.category"),
            image: "/images/projects/tower.jpg",
            stats: [
                { label: t("items.3.stats.0.label"), value: t("items.3.stats.0.value") },
                { label: t("items.3.stats.1.label"), value: t("items.3.stats.1.value") }
            ]
        }
    ];

    return (
        <section className="py-24 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase mb-4 block text-sm">
                            {t("globalApplications")}
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-slate-900 leading-tight">
                            {t("selected")} <span className="text-slate-400">{t("projects")}</span>
                        </h2>
                    </div>
                    <Link href="/projeler" className="hidden md:block">
                        <button className="px-6 py-3 bg-slate-50 text-slate-900 rounded-lg hover:bg-slate-100 transition-colors font-bold text-sm">
                            {t("viewAllProjects")}
                        </button>
                    </Link>
                </div>

                {/* Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative aspect-video bg-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {/* Image Placeholder / Background */}
                            <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-700">
                                {/* If image exists, render it. For now, solid color with texture */}
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                            </div>

                            {/* Overlay Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">

                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="text-white/80 text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-display font-bold text-white mb-4">
                                        {project.title}
                                    </h3>

                                    {/* Stats - visible on hover or always */}
                                    <div className="grid grid-cols-2 gap-8 border-t border-white/20 pt-4">
                                        {project.stats.map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-white font-mono text-lg font-bold">{stat.value}</div>
                                                <div className="text-white/60 text-[10px] uppercase tracking-wider">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/projeler">
                        <button className="px-6 py-3 bg-slate-100 text-slate-900 rounded-lg font-bold text-sm w-full">
                            {t("viewAllProjects")}
                        </button>
                    </Link>
                </div>

            </div>
        </section>
    );
}
