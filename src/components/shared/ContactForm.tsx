"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContactFormProps {
    variant?: "default" | "minimal";
}

// Declare global window type for reCAPTCHA
declare global {
    interface Window {
        grecaptcha: {
            ready: (callback: () => void) => void;
            render: (container: HTMLElement, options: {
                sitekey: string;
                callback: (token: string) => void;
                'expired-callback': () => void;
                theme?: 'light' | 'dark';
                size?: 'compact' | 'normal';
            }) => number;
            reset: (widgetId?: number) => void;
        };
        onRecaptchaLoad?: () => void;
    }
}

// reCAPTCHA v2 site key (public - production key)
const RECAPTCHA_SITE_KEY = "6LfXFmQsAAAAACfYiYNA4zSDPU2IhdpZmczqSY8_";

export default function ContactForm({ variant = "default" }: ContactFormProps) {
    const t = useTranslations("contact.form");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<number | null>(null);

    const subjectOptions = [
        { value: "", label: t("subject") },
        { value: "quote", label: "Teklif Talebi / Quote Request" },
        { value: "info", label: "Bilgi Talebi / Information Request" },
        { value: "support", label: "Teknik Destek / Technical Support" },
        { value: "other", label: "Diğer / Other" },
    ];

    // Load reCAPTCHA script
    useEffect(() => {
        // Check if script already exists
        if (document.querySelector('script[src*="recaptcha"]')) {
            if (window.grecaptcha) {
                setRecaptchaLoaded(true);
            }
            return;
        }

        // Define callback before loading script
        window.onRecaptchaLoad = () => {
            setRecaptchaLoaded(true);
        };

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup
            delete window.onRecaptchaLoad;
        };
    }, []);

    // Render reCAPTCHA widget
    useEffect(() => {
        if (recaptchaLoaded && recaptchaRef.current && widgetIdRef.current === null) {
            try {
                widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, {
                    sitekey: RECAPTCHA_SITE_KEY,
                    callback: (token: string) => {
                        setRecaptchaToken(token);
                        setError(null);
                    },
                    'expired-callback': () => {
                        setRecaptchaToken(null);
                    },
                    theme: 'light',
                    size: 'normal',
                });
            } catch {
                // Widget might already be rendered
                console.log('reCAPTCHA widget already rendered');
            }
        }
    }, [recaptchaLoaded]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate reCAPTCHA
        if (!recaptchaToken) {
            setError(t("recaptchaRequired") || "Lütfen robot olmadığınızı doğrulayın / Please verify you are not a robot");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(form);

        setIsSubmitting(true);
        setError(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone") || "",
                    subject: formData.get("subject") || "",
                    message: formData.get("message"),
                    recaptchaToken,
                }),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setError(data.error || t("error"));
                return;
            }
            setIsSubmitted(true);
        } catch {
            setError(t("error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                        aria-hidden="true"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </motion.div>
                <h3 className="text-2xl font-display font-medium text-text-dark mb-3">
                    {t("success")}
                </h3>
                <p className="text-text-muted max-w-md mx-auto">
                    {t("successDesc")}
                </p>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                        setIsSubmitted(false);
                        setRecaptchaToken(null);
                        // Reset reCAPTCHA
                        if (window.grecaptcha && widgetIdRef.current !== null) {
                            window.grecaptcha.reset(widgetIdRef.current);
                        }
                    }}
                    className="mt-8 px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary-light transition-colors"
                >
                    {t("sendAnother") || "Yeni Mesaj Gönder"}
                </motion.button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {variant === "default" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">
                            {t("name")} <span className="text-primary">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">
                            {t("email")} <span className="text-primary">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200"
                        />
                    </div>
                </div>
            )}

            {variant === "minimal" && (
                <>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">
                            {t("name")} <span className="text-primary">*</span>
                        </label>
                        <input
                            name="name"
                            type="text"
                            required
                            className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">
                            {t("email")} <span className="text-primary">*</span>
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200"
                        />
                    </div>
                </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-dark">
                        {t("phone")}
                    </label>
                    <input
                        name="phone"
                        type="tel"
                        placeholder="0532 xxx xx xx"
                        className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-text-dark">
                        {t("subject")} <span className="text-primary">*</span>
                    </label>
                    <select
                        name="subject"
                        required
                        className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B6B6B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 16px center',
                        }}
                    >
                        {subjectOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">
                    {t("message")} <span className="text-primary">*</span>
                </label>
                <textarea
                    name="message"
                    placeholder={t("messagePlaceholder")}
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 bg-cream-light border-0 rounded-xl text-text-dark placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/30 focus:bg-white transition-all duration-200 resize-none"
                />
            </div>

            {/* reCAPTCHA */}
            <div className="flex flex-col items-start gap-2">
                <div
                    ref={recaptchaRef}
                    className="recaptcha-container"
                />
                {!recaptchaLoaded && (
                    <div className="flex items-center gap-2 text-sm text-text-muted">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>reCAPTCHA yükleniyor...</span>
                    </div>
                )}
            </div>

            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-xl"
                >
                    {error}
                </motion.p>
            )}

            <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={cn(
                    "w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300",
                    "bg-anthracite-dark text-white hover:bg-anthracite-light",
                    "flex items-center justify-center gap-3",
                    "disabled:opacity-70 disabled:cursor-not-allowed"
                )}
            >
                {isSubmitting ? (
                    <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{t("sending") || "Gönderiliyor..."}</span>
                    </>
                ) : (
                    <>
                        <span>{t("submit")}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </>
                )}
            </motion.button>

        </form>
    );
}
