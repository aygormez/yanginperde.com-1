"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    align?: "left" | "center";
    titleAs?: "h1" | "h2" | "h3";
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    badge,
    align = "center",
    titleAs = "h2",
    className,
}: SectionHeaderProps) {
    const TitleTag = titleAs;

    const titleSizeClasses = {
        h1: "text-3xl md:text-4xl lg:text-5xl",
        h2: "text-2xl md:text-3xl lg:text-4xl",
        h3: "text-xl md:text-2xl lg:text-3xl",
    };

    return (
        <div
            className={cn(
                "mb-12 md:mb-16 w-full",
                align === "center" && "flex flex-col items-center text-center",
                className
            )}
        >
            {badge && (
                <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold tracking-wider uppercase bg-gold-muted text-primary-dark rounded-full">
                    {badge}
                </span>
            )}
            <TitleTag
                className={cn(
                    "font-display font-medium text-text-dark",
                    titleSizeClasses[titleAs],
                    align === "center" && "max-w-3xl"
                )}
            >
                {title}
            </TitleTag>
            {subtitle && (
                <p className={cn(
                    "mt-4 text-base md:text-lg text-text-muted",
                    align === "center" && "max-w-2xl"
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}
