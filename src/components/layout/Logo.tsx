"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";

interface LogoProps {
    variant?: "default" | "light";
    className?: string;
    width?: number;
    height?: number;
}

export default function Logo({ variant = "default", className = "", width = 180, height = 40 }: LogoProps) {
    const textColor = variant === "light" ? "text-white" : "text-anthracite-dark";

    return (
        <Link href="/" className={`inline-block flex-shrink-0 ${className} no-underline`}>
            <div className={`font-display font-bold text-2xl tracking-tight ${textColor}`}>
                YANGIN<span className="text-primary">PERDE</span>
            </div>
        </Link>
    );
}

