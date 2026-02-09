"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// reCAPTCHA v2 site key (production)
const RECAPTCHA_SITE_KEY = "6LfXFmQsAAAAACfYiYNA4zSDPU2IhdpZmczqSY8_";

export default function QuoteForm() {
    const t = useTranslations("quote.form");
    const tCat = useTranslations("quote.categories");

    // Ürün kategorileri (Çevirili)
    const PRODUCT_CATEGORIES = [
        { value: "", label: t("productPlaceholder"), disabled: true },
        { value: "dis-mekan", label: tCat("outdoor"), disabled: true },
        { value: "dikey-zip-perde", label: tCat("verticalZip") },
        { value: "yatay-zip-perde", label: tCat("horizontalZip") },
        { value: "bioklimatik-pergola", label: tCat("pergola") },
        { value: "tente-sistemleri", label: tCat("awning") },
        { value: "cam-balkon", label: tCat("glassBalcony") },
        { value: "sineklik", label: tCat("insectScreen") },
        { value: "ic-mekan", label: tCat("indoor"), disabled: true },
        { value: "stor-perde", label: tCat("roller") },
        { value: "screen-stor", label: tCat("screenRoller") },
        { value: "blackout-perde", label: tCat("blackout") },
        { value: "zebra-perde", label: tCat("zebra") },
        { value: "jaluzi-perde", label: tCat("venetian") },
        { value: "dikey-perde", label: tCat("vertical") },
        { value: "mefrusat-perde", label: tCat("drapery") },
        { value: "diger", label: tCat("other") },
    ];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        product: "",
        area: "",
        address: "",
        message: "",
    });

    const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const recaptchaRef = useRef<number | null>(null);

    // reCAPTCHA script yükleme
    useEffect(() => {
        if (document.querySelector('script[src*="recaptcha"]')) {
            if (window.grecaptcha) {
                setRecaptchaLoaded(true);
            }
            return;
        }

        window.onRecaptchaLoad = () => {
            setRecaptchaLoaded(true);
        };

        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);

        return () => {
            if (recaptchaRef.current !== null && window.grecaptcha) {
                try {
                    window.grecaptcha.reset(recaptchaRef.current);
                } catch (e) {
                    console.error("reCAPTCHA reset error:", e);
                }
            }
        };
    }, []);

    // reCAPTCHA widget render
    useEffect(() => {
        if (recaptchaLoaded && window.grecaptcha && recaptchaRef.current === null) {
            try {
                const container = document.getElementById('recaptcha-container');
                if (container) {
                    const widgetId = window.grecaptcha.render(container, {
                        sitekey: RECAPTCHA_SITE_KEY,
                        callback: (token: string) => {
                            setRecaptchaToken(token);
                        },
                        'expired-callback': () => {
                            setRecaptchaToken(null);
                        },
                    });
                    recaptchaRef.current = widgetId;
                }
            } catch (error) {
                console.error("reCAPTCHA render error:", error);
            }
        }
    }, [recaptchaLoaded]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!recaptchaToken) {
            setErrorMessage(t("recaptchaRequired"));
            return;
        }

        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch("/api/quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    product: "",
                    area: "",
                    address: "",
                    message: "",
                });
                if (recaptchaRef.current !== null && window.grecaptcha) {
                    window.grecaptcha.reset(recaptchaRef.current);
                }
                setRecaptchaToken(null);
            } else {
                setSubmitStatus("error");
                setErrorMessage(data.error || "Bir hata oluştu");
            }
        } catch (error) {
            setSubmitStatus("error");
            setErrorMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitStatus === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center"
            >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-display font-medium text-anthracite-dark mb-4">
                    {t("success")}
                </h3>
                <p className="text-text-muted mb-8">
                    {t("successDesc")}
                </p>
                <button
                    onClick={() => setSubmitStatus("idle")}
                    className="px-8 py-3 bg-anthracite-dark text-white rounded-full hover:bg-primary transition-all duration-300"
                >
                    {t("sendAnother")}
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ad Soyad */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                        {t("name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder={t("name")}
                    />
                </div>

                {/* Email & Telefon */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                            {t("email")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="example@email.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
                            {t("phone")} <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="05XX XXX XX XX"
                        />
                    </div>
                </div>

                {/* Ürün Kategorisi */}
                <div>
                    <label htmlFor="product" className="block text-sm font-medium text-text-dark mb-2">
                        {t("product")} <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                        {PRODUCT_CATEGORIES.map(cat => (
                            <option key={cat.value} value={cat.value} disabled={cat.disabled}>{cat.label}</option>
                        ))}
                    </select>
                </div>

                {/* Alan (m²) */}
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-text-dark mb-2">
                        {t("area")}
                    </label>
                    <input
                        type="text"
                        id="area"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder={t("areaPlaceholder")}
                    />
                </div>

                {/* Adres */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-text-dark mb-2">
                        {t("address")}
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        placeholder={t("addressPlaceholder")}
                    />
                </div>

                {/* Mesaj */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                        {t("message")}
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        placeholder={t("messagePlaceholder")}
                    />
                </div>

                {/* reCAPTCHA */}
                <div className="flex justify-center">
                    <div id="recaptcha-container"></div>
                </div>

                {/* Hata Mesajı */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || !recaptchaToken}
                    className="w-full px-8 py-4 bg-anthracite-dark text-white rounded-full font-medium transition-all duration-300 hover:bg-primary hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? t("sending") : t("submit")}
                </button>
            </form>
        </motion.div>
    );
}
