"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { TopBar } from "./TopBar";
import { categories, mainCategories } from "@/data/products";
import { EXTERNAL_LINKS } from "@/lib/constants";

export function Header() {
    const t = useTranslations("nav");
    const locale = useLocale();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setProductsOpen(false);
    }, [pathname]);

    const fireCategories = categories.filter((c) => c.mainCategory === "yangin-sistemleri");
    const smokeCategories = categories.filter((c) => c.mainCategory === "duman-sistemleri");

    const isActive = (href: string) => pathname === href;

    return (
        <>
            <TopBar />
            <motion.header
                className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-background shadow-lg shadow-black/30 border-b border-border"
                    : "bg-background/80 backdrop-blur-sm"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Fire accent line */}
                <div className="fire-line-top" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-lg bg-fire-gradient flex items-center justify-center group-hover:glow-fire transition-all duration-300">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" opacity="0" />
                                        <path d="M13.5 0.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z" fill="currentColor" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <span className="font-display text-lg font-bold text-foreground tracking-wider">
                                    YANGIN<span className="text-primary"> PERDE</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            <Link
                                href="/"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive("/")
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-light"
                                    }`}
                            >
                                {t("home")}
                            </Link>

                            {/* Products Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setProductsOpen(true)}
                                onMouseLeave={() => setProductsOpen(false)}
                            >
                                <button
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${pathname.startsWith("/urunler")
                                        ? "text-primary bg-primary/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-surface-light"
                                        }`}
                                >
                                    {t("products")}
                                    <svg
                                        className={`w-4 h-4 transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {productsOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-[520px] bg-surface border border-border rounded-xl p-4 shadow-2xl shadow-black/50"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Fire Systems */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 px-2">
                                                        <div className="w-2 h-2 rounded-full bg-fire-gradient" />
                                                        <span className="text-xs font-display font-bold text-primary uppercase tracking-wider">
                                                            {t("fireSystems")}
                                                        </span>
                                                    </div>
                                                    {fireCategories.map((cat) => (
                                                        <Link
                                                            key={cat.slug}
                                                            href={`/urunler/${cat.slug}`}
                                                            className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-light transition-all duration-200"
                                                        >
                                                            {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                                        </Link>
                                                    ))}
                                                </div>

                                                {/* Smoke Systems */}
                                                <div>
                                                    <div className="flex items-center gap-2 mb-3 px-2">
                                                        <div className="w-2 h-2 rounded-full bg-smoke" />
                                                        <span className="text-xs font-display font-bold text-smoke uppercase tracking-wider">
                                                            {t("smokeSystems")}
                                                        </span>
                                                    </div>
                                                    {smokeCategories.map((cat) => (
                                                        <Link
                                                            key={cat.slug}
                                                            href={`/urunler/${cat.slug}`}
                                                            className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-surface-light transition-all duration-200"
                                                        >
                                                            {(cat.name as Record<string, string>)[locale] || cat.name.tr}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-border">
                                                <Link
                                                    href="/urunler"
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 transition-all duration-200 font-medium"
                                                >
                                                    <span>{t("allProducts")}</span>
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <Link
                                href="/ozel-cozumler"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive("/ozel-cozumler")
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-light"
                                    }`}
                            >
                                {t("customSolutions")}
                            </Link>

                            <Link
                                href="/projeler"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive("/projeler")
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-light"
                                    }`}
                            >
                                {t("projects")}
                            </Link>

                            <Link
                                href="/hakkimizda"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive("/hakkimizda")
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-light"
                                    }`}
                            >
                                {t("about")}
                            </Link>

                            <Link
                                href="/iletisim"
                                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isActive("/iletisim")
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-surface-light"
                                    }`}
                            >
                                {t("contact")}
                            </Link>
                        </nav>

                        {/* Right Side */}
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />

                            <Link
                                href="/teklif-al"
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-fire-gradient text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-[1.02]"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {t("getQuote")}
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-light transition-colors"
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    );
}
