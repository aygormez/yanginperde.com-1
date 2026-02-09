import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Yandex Mail SMTP
const YANDEX_USER = "bildirim@yanginperde.com"; // TODO: Gerçek e-posta ile güncellenmeli
const YANDEX_PASS = "pnpfvfvjfhjypqly"; // TODO: Güncellenmeli
const TO_EMAIL = "info@yanginperde.com";

// reCAPTCHA v2 gizli anahtar
const RECAPTCHA_SECRET_KEY = "6LfXFmQsAAAAAHhjdTwuid5WFmgwWrYzHfjm7Cmb";

const productLabels: Record<string, string> = {
    "zip-screen": "Zip Screen",
    "stor-perde": "Stor Perde",
    "pergola": "Pergola",
    "tente": "Tente Sistemleri",
    "cam-balkon": "Cam Balkon",
    "sineklik": "Sineklik Sistemleri",
    "diger": "Diğer / Emin Değilim",
};

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m] || m);
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, product, area, address, message, recaptchaToken } = body as {
            name?: string;
            email?: string;
            phone?: string;
            product?: string;
            area?: string;
            address?: string;
            message?: string;
            recaptchaToken?: string;
        };

        if (!name?.trim() || !email?.trim() || !phone?.trim() || !product?.trim()) {
            return NextResponse.json(
                { success: false, error: "Ad, e-posta, telefon ve ürün kategorisi zorunludur." },
                { status: 400 }
            );
        }

        // reCAPTCHA doğrulama
        if (recaptchaToken) {
            const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: recaptchaToken }).toString(),
            });
            const verify = (await verifyRes.json()) as { success?: boolean };
            if (!verify.success) {
                return NextResponse.json(
                    { success: false, error: "reCAPTCHA doğrulaması başarısız. Lütfen tekrar deneyin." },
                    { status: 400 }
                );
            }
        }

        const productLabel = productLabels[product ?? ""] ?? product ?? "Belirtilmemiş";

        const transporter = nodemailer.createTransport({
            host: "smtp.yandex.com",
            port: 465,
            secure: true,
            auth: {
                user: YANDEX_USER,
                pass: YANDEX_PASS,
            },
        });

        const html = `
            <h2>Teklif Talebi - YANGIN PERDE</h2>
            <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>
            <p><strong>Ürün Kategorisi:</strong> ${escapeHtml(productLabel)}</p>
            <p><strong>Alan (m²):</strong> ${escapeHtml(area || "-")}</p>
            <p><strong>Proje Adresi:</strong> ${escapeHtml(address || "-")}</p>
            <p><strong>Ek Bilgiler:</strong></p>
            <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message || "-")}</pre>
        `;

        await transporter.sendMail({
            from: `"YANGIN PERDE Teklif" <${YANDEX_USER}>`,
            to: TO_EMAIL,
            replyTo: email,
            subject: `[YANGIN PERDE TEKLIF] ${productLabel} - ${name}`,
            text: `Ad: ${name}\nE-posta: ${email}\nTelefon: ${phone}\nÜrün: ${productLabel}\nAlan: ${area || "-"}\nAdres: ${address || "-"}\n\nEk Bilgiler:\n${message || "-"}`,
            html,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Quote form send error:", err);
        return NextResponse.json(
            { success: false, error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin." },
            { status: 500 }
        );
    }
}
