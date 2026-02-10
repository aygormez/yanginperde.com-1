import { Project } from "@/types";

export const projects: Project[] = [
    {
        id: "prj-001",
        slug: "istanbul-havalimani",
        category: "commercial",
        title: {
            tr: "İstanbul Havalimanı Kargo Terminali",
            en: "Istanbul Airport Cargo Terminal",
            de: "Frachtterminal Flughafen Istanbul",
            es: "Terminal de Carga del Aeropuerto de Estambul",
            fr: "Terminal de Fret de l'Aéroport d'Istanbul",
            ar: "محطة الشحن بمطار إسطنبول",
        },
        description: {
            tr: "Terminal binasında yangın zonlarını ayırmak için 50 adet E120 sınıfı otomatik yangın perdesi uygulandı. Yüksek tavan yapısına uygun özel motor sistemleri kullanıldı.",
            en: "50 units of E120 class automatic fire curtains were applied to separate fire zones in the terminal building. Special motor systems suitable for high ceiling structure were used.",
            de: "50 Einheiten automatischer Feuerschutzvorhänge der Klasse E120 wurden installiert, um Brandabschnitte im Terminalgebäude zu trennen. Spezielle Motorsysteme für hohe Deckenstrukturen wurden verwendet.",
            es: "Se aplicaron 50 unidades de cortinas cortafuegos automáticas clase E120 para separar zonas de incendio en el edificio terminal. Se utilizaron sistemas de motores especiales adecuados para estructuras de techo alto.",
            fr: "50 unités de rideaux coupe-feu automatiques de classe E120 ont été appliquées pour séparer les zones d'incendie dans le bâtiment terminal. Des systèmes de moteurs spéciaux adaptés à la structure à haut plafond ont été utilisés.",
            ar: "تم تطبيق 50 وحدة من ستائر الحريق الأوتوماتيكية من فئة E120 لفصل مناطق الحريق في مبنى الركاب. تم استخدام أنظمة محركات خاصة مناسبة لهيكل السقف العالي.",
        },
        location: "İstanbul, Arnavutköy",
        year: 2026,
        products: ["yangin-perdesi", "duman-perdesi"],
        images: [
            "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&h=600&fit=crop", // Industrial/Airport vibe
            "https://images.unsplash.com/photo-1530982011887-3cc11cc85693?w=800&h=600&fit=crop",
        ],
        featured: true,
    },
    {
        id: "prj-002",
        slug: "sehir-hastanesi",
        category: "commercial",
        title: {
            tr: "Bursa Şehir Hastanesi",
            en: "Bursa City Hospital",
            de: "Stadtkrankenhaus Bursa",
            es: "Hospital de la Ciudad de Bursa",
            fr: "Hôpital de la Ville de Bursa",
            ar: "مستشفى مدينة بورصة",
        },
        description: {
            tr: "Acil servis ve ameliyathane koridorlarında duman tahliyesini yönlendirmek için otomatik duman perdeleri entegre edildi. Hasta güvenliği için fail-safe sistemler tercih edildi.",
            en: "Automatic smoke curtains were integrated to guide smoke evacuation in emergency service and operating room corridors. Fail-safe systems were preferred for patient safety.",
            de: "Automatische Rauchschutzvorhänge wurden integriert, um die rauchableitung in Notaufnahme- und Operationssaalkorridoren zu leiten. Ausfallsichere Systeme wurden für die Patientensicherheit bevorzugt.",
            es: "Se integraron cortinas de humo automáticas para guiar la evacuación de humo en los pasillos de servicios de emergencia y quirófanos. Se prefirieron sistemas a prueba de fallos para la seguridad del paciente.",
            fr: "Des rideaux de fumée automatiques ont été intégrés pour guider l'évacuation des fumées dans les couloirs des urgences et des salles d'opération. Des systèmes à sécurité intégrée ont été préférés pour la sécurité des patients.",
            ar: "تم دمج ستائر الدخان الأوتوماتيكية لتوجيه إخلاء الدخان في ممرات الطوارئ وغرف العمليات. تم تفضيل الأنظمة الآمنة من الفشل لسلامة المرضى.",
        },
        location: "Bursa, Nilüfer",
        year: 2023,
        products: ["duman-perdesi"],
        images: [
            "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop", // Hospital/Clean corridor
            "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=600&fit=crop",
        ],
        featured: true,
    },
    {
        id: "prj-003",
        slug: "teknopark-istanbul",
        category: "office",
        title: {
            tr: "Teknopark İstanbul",
            en: "Technopark Istanbul",
            de: "Technopark Istanbul",
            es: "Parque Tecnológico de Estambul",
            fr: "Technopark Istanbul",
            ar: "تكنوبارك إسطنبول",
        },
        description: {
            tr: "Doğal aydınlatma sağlayan atrium alanlarında yatay yangın perdeleri kullanılarak katlar arası yangın geçişi engellendi. Mimari estetiğe uygun gizli montaj yapıldı.",
            en: "Horizontal fire curtains were used in atrium areas providing natural lighting to prevent fire spread between floors. Concealed installation suitable for architectural aesthetics was performed.",
            de: "Horizontale Feuerschutzvorhänge wurden in Atriumbereichen eingesetzt, die natürliches Licht bieten, um die Brandausbreitung zwischen den Etagen zu verhindern. Verdeckte Montage passend zur architektonischen Ästhetik durchgeführt.",
            es: "Se utilizaron cortinas cortafuegos horizontales en áreas de atrio que proporcionan iluminación natural para prevenir la propagación del fuego entre pisos. Se realizó una instalación oculta adecuada a la estética arquitectónica.",
            fr: "Des rideaux coupe-feu horizontaux ont été utilisés dans les zones d'atrium offrant un éclairage naturel pour empêcher la propagation du feu entre les étages. Installation dissimulée adaptée à l'esthétique architecturale réalisée.",
            ar: "تم استخدام ستائر الحريق الأفقية في مناطق الفناء التي توفر الإضاءة الطبيعية لمنع انتشار الحريق بين الطوابق. تم تنفيذ تركيب مخفي مناسب للجماليات المعمارية.",
        },
        location: "İstanbul, Pendik",
        year: 2026,
        products: ["yatay-yangin-perdesi"],
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", // Modern office atrium
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
        ],
        featured: true,
    },
    {
        id: "prj-004",
        slug: "lojistik-merkezi",
        category: "commercial",
        title: {
            tr: "Gebze Lojistik Merkezi",
            en: "Gebze Logistics Center",
            de: "Logistikzentrum Gebze",
            es: "Centro Logístico Gebze",
            fr: "Centre Logistique de Gebze",
            ar: "مركز جيبزي اللوجستي",
        },
        description: {
            tr: "Büyük depo alanlarında konveyör hatlarının geçtiği açıklıklarda konveyör yangın perdeleri uygulandı. Kesintisiz lojistik akışı ve tam yangın güvenliği sağlandı.",
            en: "Conveyor fire curtains were applied in openings where conveyor lines pass in large warehouse areas. Uninterrupted logistics flow and full fire safety were ensured.",
            de: "Förderband-Feuerschutzvorhänge wurden in Öffnungen installiert, durch die Förderbänder in großen Lagerbereichen verlaufen. Ununterbrochener Logistikfluss und volle Brandsicherheit gewährleistet.",
            es: "Se aplicaron cortinas cortafuegos para transportadores en aberturas por donde pasan líneas de transporte en grandes áreas de almacén. Se garantizó el flujo logístico ininterrumpido y la seguridad total contra incendios.",
            fr: "Des rideaux coupe-feu pour convoyeurs ont été appliqués dans les ouvertures où passent les lignes de convoyeurs dans les grandes zones d'entrepôt. Flux logistique ininterrompu et sécurité incendie totale assurés.",
            ar: "تم تطبيق ستائر حريق الناقل في الفتحات التي تمر فيها خطوط النقل في مناطق المستودعات الكبيرة. تم ضمان تدفق لوجستي غير منقطع وسلامة كاملة من الحريق.",
        },
        location: "Kocaeli, Gebze",
        year: 2023,
        products: ["konveyor-sistem"],
        images: [
            "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop", // Warehouse
        ],
        featured: true,
    }
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
    return projects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((p) => p.featured);
}

export function getAllProjectSlugs(): string[] {
    return projects.map((p) => p.slug);
}
