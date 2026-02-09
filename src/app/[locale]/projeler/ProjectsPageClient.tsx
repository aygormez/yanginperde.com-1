"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { STAGGER_CONTAINER } from "@/lib/constants";
import { ProjectCard } from "@/components/shared";
import Modal from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { Locale } from "@/i18n/config";

interface ProjectsPageClientProps {
    locale: Locale;
}

const filterOptions = [
    { slug: "all", name: { tr: "Tümü", en: "All" }, icon: "grid" },
    { slug: "residential", name: { tr: "Konut", en: "Residential" }, icon: "home" },
    { slug: "commercial", name: { tr: "Ticari", en: "Commercial" }, icon: "building" },
    { slug: "hotel", name: { tr: "Otel & Restoran", en: "Hotel & Restaurant" }, icon: "hotel" },
    { slug: "villa", name: { tr: "Villa", en: "Villa" }, icon: "villa" },
];

const statistics = [
    { value: "500+", label: { tr: "Tamamlanan Proje", en: "Completed Projects" } },
    { value: "50+", label: { tr: "Şehir", en: "Cities" } },
    { value: "12", label: { tr: "Ülke", en: "Countries" } },
    { value: "%100", label: { tr: "Müşteri Memnuniyeti", en: "Customer Satisfaction" } },
];

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

export default function ProjectsPageClient({ locale }: ProjectsPageClientProps) {
    const t = useTranslations("projects");
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const filteredProjects = useMemo(() => {
        if (activeCategory === "all") return projects;
        return projects.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    const activeFilter = filterOptions.find(f => f.slug === activeCategory);

    const openLightbox = (project: Project, index: number = 0) => {
        setSelectedProject(project);
        setLightboxIndex(index);
    };

    return (
        <div className="min-h-screen bg-cream-light">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden bg-anthracite-dark">
                {/* Background Image with Parallax */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop"
                        alt="Projects background"
                        fill
                        priority
                        className="object-cover opacity-40"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-anthracite-dark/40 via-anthracite-dark/60 to-anthracite-dark" />
                </div>

                {/* Grid Pattern */}
                <div className="absolute inset-0 z-[1] opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                {/* Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 rounded-full blur-[130px] z-[1]" />

                {/* Content */}
                <div className="relative z-10 container text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white/70 text-sm uppercase tracking-wider mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {locale === "tr" ? "Referans Projelerimiz" : "Our Reference Projects"}
                        </motion.span>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white mb-6">
                            {t("title")}
                        </h1>
                        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </motion.div>
                </div>

                {/* Bottom Fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-light to-transparent z-[5]" />
            </section>

            {/* Statistics Strip */}
            <section className="relative z-10 -mt-16">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {statistics.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + index * 0.1 }}
                                    className="text-center"
                                >
                                    <p className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-text-muted mt-1">{getLocalized(stat.label, locale)}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 md:py-16">
                <div className="container">
                    <div className="flex flex-col items-center gap-6">
                        {/* Section Label */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-[2px] bg-primary" />
                            <span className="text-sm font-medium text-primary uppercase tracking-wider">
                                {locale === "tr" ? "Kategoriler" : "Categories"}
                            </span>
                            <div className="w-12 h-[2px] bg-primary" />
                        </div>

                        {/* Filter Pills */}
                        <div className="flex flex-wrap justify-center gap-3">
                            {filterOptions.map((option) => (
                                <motion.button
                                    key={option.slug}
                                    onClick={() => setActiveCategory(option.slug)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={cn(
                                        "relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                                        activeCategory === option.slug
                                            ? "text-white"
                                            : "text-text-muted hover:text-text-dark bg-white hover:bg-cream-dark shadow-sm"
                                    )}
                                >
                                    {activeCategory === option.slug && (
                                        <motion.div
                                            layoutId="activeProjectFilter"
                                            className="absolute inset-0 bg-anthracite-dark rounded-full shadow-lg"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{getLocalized(option.name, locale)}</span>
                                </motion.button>
                            ))}
                        </div>

                        {/* Active Filter Info */}
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2 text-sm text-text-muted"
                        >
                            <span className="font-semibold text-primary">{filteredProjects.length}</span>
                            <span>{locale === "tr" ? "proje gösteriliyor" : "projects showing"}</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20 md:pb-28">
                <div className="container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            variants={STAGGER_CONTAINER}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {filteredProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    index={index}
                                    onClick={() => openLightbox(project)}
                                />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 mx-auto mb-6 bg-cream-dark rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                    <line x1="8" y1="21" x2="16" y2="21" />
                                    <line x1="12" y1="17" x2="12" y2="21" />
                                </svg>
                            </div>
                            <p className="text-text-muted text-lg">
                                {locale === "tr"
                                    ? "Bu kategoride henüz proje bulunmamaktadır."
                                    : "No projects found in this category."}
                            </p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 md:py-28 bg-anthracite-dark relative overflow-hidden">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/4 w-[400px] h-[300px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-primary/5 rounded-full blur-[100px]" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm uppercase tracking-wider mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {locale === "tr" ? "Projenizi Birlikte Planlayalım" : "Let's Plan Your Project Together"}
                        </span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium text-white mb-6">
                            {locale === "tr" ? "Hayalinizdeki Projeyi Gerçeğe Dönüştürün" : "Turn Your Dream Project into Reality"}
                        </h2>
                        <p className="text-lg text-white/60 mb-10">
                            {locale === "tr"
                                ? "25 yılı aşkın tecrübemizle, projenizin her aşamasında yanınızdayız."
                                : "With over 25 years of experience, we are with you at every stage of your project."}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <motion.a
                                href="/iletisim"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary-light text-anthracite-dark font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 shadow-[0_0_40px_rgba(196,163,90,0.3)] hover:shadow-[0_0_60px_rgba(196,163,90,0.5)]"
                            >
                                <span>{locale === "tr" ? "Ücretsiz Keşif Talep Et" : "Request Free Survey"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </motion.a>
                            <motion.a
                                href="/urunler"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 text-white/70 hover:text-white font-medium px-6 py-4 transition-colors"
                            >
                                <span>{locale === "tr" ? "Ürünleri İncele" : "View Products"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Project Detail Modal */}
            <Modal
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
                title={selectedProject ? getLocalized(selectedProject.title, locale) : undefined}
                size="xl"
            >
                {selectedProject && (
                    <div className="p-6">
                        {/* Image Gallery */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-anthracite-dark">
                            <Image
                                src={selectedProject.images[lightboxIndex] || "/images/placeholder-project.jpg"}
                                alt={getLocalized(selectedProject.title, locale) || "Project image"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 80vw"
                            />

                            {/* Navigation */}
                            {selectedProject.images.length > 1 && (
                                <>
                                    <button
                                        onClick={() => setLightboxIndex((prev) =>
                                            prev === 0 ? selectedProject.images.length - 1 : prev - 1
                                        )}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="15 18 9 12 15 6" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setLightboxIndex((prev) =>
                                            prev === selectedProject.images.length - 1 ? 0 : prev + 1
                                        )}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                                {lightboxIndex + 1} / {selectedProject.images.length}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {selectedProject.images.length > 1 && (
                            <div className="flex gap-3 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                {selectedProject.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setLightboxIndex(index)}
                                        className={cn(
                                            "relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden transition-all duration-200",
                                            lightboxIndex === index
                                                ? "ring-2 ring-primary ring-offset-2"
                                                : "opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={image || "/images/placeholder-project.jpg"}
                                            alt={`${selectedProject ? getLocalized(selectedProject.title, locale) : "Project"} thumbnail ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Project Info */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-cream-light rounded-full text-text-muted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    {selectedProject.location}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1.5 bg-cream-light rounded-full text-text-muted">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    {selectedProject.year}
                                </span>
                            </div>

                            <p className="text-text-muted leading-relaxed">
                                {getLocalized(selectedProject.description, locale)}
                            </p>

                            <div className="pt-4 border-t border-cream-dark">
                                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-3">
                                    {locale === "tr" ? "Kullanılan Ürünler" : "Products Used"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.products.map((product) => (
                                        <span
                                            key={product}
                                            className="px-4 py-2 bg-gold-muted text-primary-dark text-sm font-medium rounded-full capitalize"
                                        >
                                            {product.replace("-", " ")}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
