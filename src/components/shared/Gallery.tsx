"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryProps {
    images: string[];
    alt?: string;
}

// Şık ve modern bir yükleme animasyonu (Gecikmeli ve hafif)
const LoadingSpinner = ({ delay = 200 }: { delay?: number }) => {
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShouldShow(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    if (!shouldShow) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-10 h-10 border-2 border-primary/10 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default function Gallery({ images, alt = "Image" }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isMainImageLoading, setIsMainImageLoading] = useState(true);
    const [isLightboxImageLoading, setIsLightboxImageLoading] = useState(true);

    // Resim değiştiğinde loading state'ini resetle
    useEffect(() => {
        setIsMainImageLoading(true);
        setIsLightboxImageLoading(true);
    }, [selectedIndex]);

    const openLightbox = useCallback((index: number) => {
        setSelectedIndex(index);
        setIsLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setIsLightboxOpen(false);
    }, []);

    const goToPrevious = useCallback(() => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const goToNext = useCallback(() => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();
            if (e.key === "Escape") closeLightbox();
        },
        [goToPrevious, goToNext, closeLightbox]
    );

    if (images.length === 0) {
        return (
            <div className="aspect-[4/3] bg-cream-dark rounded-2xl flex items-center justify-center">
                <p className="text-text-muted">No images available</p>
            </div>
        );
    }

    return (
        <>
            {/* Main Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <motion.div
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-dark cursor-pointer group"
                    onClick={() => openLightbox(selectedIndex)}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Sadece 200ms'den uzun sürerse göster */}
                    {isMainImageLoading && <LoadingSpinner delay={200} />}

                    <Image
                        src={images[selectedIndex] || "/images/placeholder-product.jpg"}
                        alt={`${alt} - ${selectedIndex + 1}`}
                        fill
                        className={cn(
                            "object-cover",
                            isMainImageLoading ? "opacity-0" : "opacity-100"
                        )}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        onLoadingComplete={() => setIsMainImageLoading(false)}
                    />

                    {/* Zoom Icon - Sadece resim yüklendiğinde göster */}
                    {!isMainImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-anthracite/20 pointer-events-none">
                            <div className="p-4 bg-white/90 backdrop-blur-sm rounded-full transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-primary"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="11" y1="8" x2="11" y2="14" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={cn(
                                    "relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 border-2",
                                    selectedIndex === index
                                        ? "border-primary opacity-100 shadow-md ring-2 ring-primary/20 ring-offset-1"
                                        : "border-transparent opacity-60 hover:opacity-100 hover:border-primary/50"
                                )}
                            >
                                <Image
                                    src={image || "/images/placeholder-product.jpg"}
                                    alt={`${alt} thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="80px"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-anthracite/95 backdrop-blur-md flex items-center justify-center isolate"
                        onClick={closeLightbox}
                        onKeyDown={handleKeyDown}
                        tabIndex={0}
                    >
                        {/* Görsel + kapatma butonu */}
                        <motion.div
                            key={selectedIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-6xl max-h-[90vh] mx-4 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Lightbox Loading State - Sadece 150ms'den uzun sürerse göster */}
                            {isLightboxImageLoading && <LoadingSpinner delay={150} />}

                            <Image
                                src={images[selectedIndex] || "/images/placeholder-product.jpg"}
                                alt={`${alt} - ${selectedIndex + 1}`}
                                width={1920}
                                height={1080}
                                className={cn(
                                    "w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl",
                                    isLightboxImageLoading ? "opacity-0" : "opacity-100"
                                )}
                                sizes="(max-width: 1280px) 100vw, 1536px"
                                priority
                                onLoadingComplete={() => setIsLightboxImageLoading(false)}
                            />

                            {/* Kapatma butonu */}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    closeLightbox();
                                }}
                                className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md"
                                aria-label="Close lightbox"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium tracking-wide border border-white/10">
                            {selectedIndex + 1} / {images.length}
                        </div>

                        {/* Önceki / Sonraki */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                                    className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm border border-white/5 hover:border-white/20 hover:scale-110"
                                    aria-label="Previous image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                    className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 hover:bg-black/40 text-white transition-all backdrop-blur-sm border border-white/5 hover:border-white/20 hover:scale-110"
                                    aria-label="Next image"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
