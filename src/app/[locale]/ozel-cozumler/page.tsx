import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CustomSolutionsPageClient from "./CustomSolutionsPageClient";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "customSolutions" });

    return {
        title: t("meta.title"),
        description: t("meta.description"),
        openGraph: {
            title: t("meta.title"),
            description: t("meta.description"),
            type: "website",
            locale: locale === "tr" ? "tr_TR" : "en_US",
            siteName: "GESPERA",
        },
    };
}

export default async function OzelCozumlerPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    return <CustomSolutionsPageClient />;
}
