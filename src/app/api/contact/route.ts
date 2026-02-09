import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Yandex Mail SMTP
const YANDEX_USER = "bildirim@yanginperde.com"; // TODO: Gerçek e-posta ile güncellenmeli
const YANDEX_PASS = "pnpfvfvjfhjypqly"; // TODO: Güncellenmeli
const TO_EMAIL = "info@yanginperde.com";

// reCAPTCHA v2 gizli anahtar (sadece sunucuda kullanılır, client'a gönderilmez)
// Production key - gespera.com için
const RECAPTCHA_SECRET_KEY = "6LfXFmQsAAAAAHhjdTwuid5WFmgwWrYzHfjm7Cmb";

const subjectLabels: Record<string, string> = {
    quote: "Teklif Talebi / Quote Request",
    info: "Bilgi Talebi / Information Request",
    support: "Teknik Destek / Technical Support",
    other: "Diğer / Other",
};

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, subject, message, recaptchaToken } = body as {
            name?: string;
            email?: string;
            phone?: string;
            subject?: string;
            message?: string;
            recaptchaToken?: string;
        };

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json(
                { success: false, error: "Ad, e-posta ve mesaj zorunludur." },
                { status: 400 }
            );
        }

        // reCAPTCHA doğrulama (gizli anahtar sadece sunucu tarafında)
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

        const subjectLabel = subjectLabels[subject ?? ""] ?? subject ?? "İletişim Formu";

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
            <h2>İletişim Formu - YANGIN PERDE</h2>
            <p><strong>Ad Soyad:</strong> ${escapeHtml(name)}</p>
            <p><strong>E-posta:</strong> ${escapeHtml(email)}</p>
            <p><strong>Telefon:</strong> ${escapeHtml(phone || "-")}</p>
            <p><strong>Konu:</strong> ${escapeHtml(subjectLabel)}</p>
            <p><strong>Mesaj:</strong></p>
            <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
        `;

        await transporter.sendMail({
            from: `"YANGIN PERDE İletişim" <${YANDEX_USER}>`,
            to: TO_EMAIL,
            replyTo: email,
            subject: `[YANGIN PERDE] ${subjectLabel} - ${name}`,
            text: `Ad: ${name}\nE-posta: ${email}\nTelefon: ${phone || "-"}\nKonu: ${subjectLabel}\n\nMesaj:\n${message}`,
            html,
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact form send error:", err);
        return NextResponse.json(
            { success: false, error: "E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin." },
            { status: 500 }
        );
    }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
