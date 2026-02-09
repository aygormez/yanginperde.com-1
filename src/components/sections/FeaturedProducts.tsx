"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "../shared";
import { STAGGER_CONTAINER } from "@/lib/constants";

export default function FeaturedProducts() {
    const t = useTranslations("featuredProducts");
    const featuredProducts = getFeaturedProducts().slice(0, 6);

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            <div className="container relative z-10 px-4 md:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-20 border-b border-white/10 pb-8">
                    <div>
                        <span className="text-primary font-mono text-xs tracking-[0.2em] uppercase mb-4 block">
                            PREMIUM SELECTION
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-display font-medium text-white uppercase tracking-tight">
                            {t("title")}
                        </h2>
                    </div>

                    <Link href="/urunler">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/20 text-white font-display font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <span>{t("viewProduct")}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                                <polyline points="12 5 19 12 12 19"></polyline>
                            </svg>
                        </motion.button>
                    </Link>
                </div>

                {/* Products Grid */}
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {featuredProducts.map((product, index) => (
                        <div key={product.id} className="relative group bg-[#0f0f0f] border border-white/5 hover:border-primary/50 transition-colors duration-500">
                            {/* Card Content Wrapper */}
                            <div className="relative z-10">
                                {/* We might need to adjust ProductCard internal styling or replace it. 
                                   For a full redesign, replacing specific parts of ProductCard or wrapping it is safer 
                                   if we can't edit it directly easily, but let's assume ProductCard is flexible or we just use it 
                                   and style the container. Actually, ProductCard likely has its own styles. 
                                   Let's check if we can override or if we should just inline the card logic here for the new theme to be sure.
                                   Inlining is safer for a "complete redesign" to avoid side effects on other pages if ProductCard is shared.
                                */}
                                <ProductCard product={product} index={index} />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
