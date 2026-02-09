"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { cn } from "@/lib/utils";
import { Locale } from "@/i18n/config";

// Helper function to get localized content with fallback
function getLocalized<T>(obj: Record<string, T> | undefined, locale: Locale): T | undefined {
    if (!obj) return undefined;
    return obj[locale] || obj["tr"] || obj["en"];
}

interface ProjectCardProps {
    project: Project;
    index?: number;
    onClick?: () => void;
}

export default function ProjectCard({ project, index = 0, onClick }: ProjectCardProps) {
    const locale = useLocale() as Locale;

    const categoryLabels: Record<string, Record<string, string>> = {
        residential: { tr: "Konut", en: "Residential" },
        commercial: { tr: "Ticari", en: "Commercial" },
        hotel: { tr: "Otel & Restoran", en: "Hotel & Restaurant" },
        villa: { tr: "Villa", en: "Villa" },
    };

    // Create varied heights for masonry-like effect
    const heights = ["aspect-[4/3]", "aspect-[4/4]", "aspect-[4/3]"];
    const heightClass = heights[index % 3];

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={onClick}
            className="group cursor-pointer"
        >
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={cn(
                    "relative rounded-3xl overflow-hidden",
                    "shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)]",
                    "transition-shadow duration-500"
                )}
            >
                    {/* Image */}
                <div className={cn("relative overflow-hidden", heightClass)}>
                    <Image
                        src={project.images[0] || "/images/placeholder-project.jpg"}
                        alt={getLocalized(project.title, locale) || "Project"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-anthracite-dark via-anthracite-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Category Badge - Top Left */}
                    <div className="absolute top-5 left-5 z-10">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-sm text-anthracite-dark text-xs font-semibold rounded-full uppercase tracking-wide">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {getLocalized(categoryLabels[project.category], locale) || project.category}
                        </span>
                    </div>

                    {/* View Button - Top Right (appears on hover) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                        <div className="p-3 bg-primary rounded-full shadow-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <line x1="11" y1="8" x2="11" y2="14" />
                                <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        {/* Location & Year */}
                        <div className="flex items-center gap-3 mb-3">
                            <span className="flex items-center gap-1.5 text-white/70 text-sm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {project.location}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-white/40" />
                            <span className="text-white/70 text-sm">{project.year}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 group-hover:text-gold-light transition-colors duration-300">
                            {getLocalized(project.title, locale)}
                        </h3>

                        {/* Description (shows on hover) */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-white/60 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden"
                        >
                            {getLocalized(project.description, locale)}
                        </motion.p>

                        {/* View Details Link */}
                        <div className="mt-4 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                            <span className="text-sm font-medium">
                                {locale === "tr" ? "Detayları Gör" : "View Details"}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-transform group-hover:translate-x-1"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.article>
    );
}
