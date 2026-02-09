import { Product, CategoryInfo, MainCategoryInfo } from "@/types";

// ================================
// ANA KATEGORİLER
// ================================

export const mainCategories: MainCategoryInfo[] = [
    {
        slug: "yangin-sistemleri",
        name: {
            tr: "Yangın Sistemleri",
            en: "Fire Systems",
            de: "Brandschutzsysteme",
            es: "Sistemas Contra Incendios",
            fr: "Systèmes Incendie",
            ar: "أنظمة الحريق",
        },
        description: {
            tr: "Binalarınız için yüksek dayanımlı yangın perdesi ve bölmeleri.",
            en: "High resistance fire curtains and barriers for your buildings.",
            de: "Hochbeständige Feuerschutzvorhänge und Barrieren für Ihre Gebäude.",
            es: "Cortinas y barreras contra incendios de alta resistencia para sus edificios.",
            fr: "Rideaux et barrières coupe-feu haute résistance pour vos bâtiments.",
            ar: "ستائر وحواجز مقاومة للحريق عالية المقاومة لمبانيك.",
        },
        image: "/images/products/fire-curtain-vertical.png",
    },
    {
        slug: "duman-sistemleri",
        name: {
            tr: "Duman Kontrol Sistemleri",
            en: "Smoke Control Systems",
            de: "Rauchschutzsysteme",
            es: "Sistemas de Control de Humo",
            fr: "Systèmes de Contrôle des Fumées",
            ar: "أنظمة التحكم في الدخان",
        },
        description: {
            tr: "Güvenli tahliye için dumanı kontrol altına alan sistemler.",
            en: "Systems that control smoke for safe evacuation.",
            de: "Systeme zur Rauchkontrolle für eine sichere Evakuierung.",
            es: "Sistemas que controlan el humo para una evacuación segura.",
            fr: "Systèmes contrôlant les fumées pour une évacuation sûre.",
            ar: "أنظمة تتحكم في الدخان للإخلاء الآمن.",
        },
        image: "/images/products/smoke-curtain-auto.png",
    },
];

// ================================
// ÜRÜN KATEGORİLERİ
// ================================

export const categories: CategoryInfo[] = [
    // YANGIN SİSTEMLERİ
    {
        slug: "yangin-perdesi-e",
        mainCategory: "yangin-sistemleri",
        name: {
            tr: "Yangın Perdesi (E)",
            en: "Fire Curtain (E)",
            de: "Feuerschutzvorhang (E)",
            es: "Cortina Cortafuegos (E)",
            fr: "Rideau Coupe-Feu (E)",
            ar: "ستارة مقاومة للحريق (E)",
        },
        description: {
            tr: "Yangın anında alevlerin geçişini engelleyen, E sınıfı dayanımlı yangın perdeleri.",
            en: "E class fire resistant curtains preventing flame passage during fire.",
            de: "Feuerschutzvorhänge der Klasse E, die den Flammen Durchtritt verhindern.",
            es: "Cortinas resistentes al fuego clase E que evitan el paso de llamas.",
            fr: "Rideaux résistants au feu de classe E empêchant le passage des flammes.",
            ar: "ستائر مقاومة للحريق من الفئة E تمنع مرور اللهب.",
        },
        icon: "shield",
        image: "/images/products/fire-curtain-vertical.png",
        order: 1,
    },
    {
        slug: "yangin-perdesi-ew",
        mainCategory: "yangin-sistemleri",
        name: {
            tr: "Yangın Perdesi (EW)",
            en: "Fire Curtain (EW)",
            de: "Feuerschutzvorhang (EW)",
            es: "Cortina Cortafuegos (EW)",
            fr: "Rideau Coupe-Feu (EW)",
            ar: "ستارة مقاومة للحريق (EW)",
        },
        description: {
            tr: "Alevleri ve ısı radyasyonunu sınırlayan EW sınıfı yangın perdeleri.",
            en: "EW class fire curtains limiting flames and heat radiation.",
            de: "EW-Klasse Feuerschutzvorhänge zur Begrenzung von Flammen und Wärmestrahlung.",
            es: "Cortinas cortafuegos clase EW que limitan llamas y radiación térmica.",
            fr: "Rideau coupe-feu classe EW limitant les flammes et le rayonnement thermique.",
            ar: "ستائر مقاومة للحريق من الفئة EW تحد من اللهب والإشعاع الحراري.",
        },
        icon: "flame",
        image: "/images/products/fire-curtain-horizontal.png",
        order: 2,
    },
    {
        slug: "yangin-kapisi",
        mainCategory: "yangin-sistemleri",
        name: {
            tr: "Yangın Kapısı",
            en: "Fire Door",
            de: "Brandschutztür",
            es: "Puerta Cortafuegos",
            fr: "Porte Coupe-Feu",
            ar: "باب مقاوم للحريق",
        },
        description: {
            tr: "Yangına dayanıklı çelik kapılar ve acil çıkış kapıları.",
            en: "Fire resistant steel doors and emergency exit doors.",
            de: "Feuerfeste Stahltüren und Notausgangstüren.",
            es: "Puertas de acero resistentes al fuego y puertas de salida de emergencia.",
            fr: "Portes en acier résistantes au feu et portes de sortie de secours.",
            ar: "أبواب فولاذية مقاومة للحريق وأبواب مخارج الطوارئ.",
        },
        icon: "door",
        image: "/images/products/fire-door.png",
        order: 3,
    },
    {
        slug: "otomatik-yangin-perdesi",
        mainCategory: "yangin-sistemleri",
        name: {
            tr: "Otomatik Yangın Perdesi",
            en: "Automatic Fire Curtain",
            de: "Automatischer Feuerschutzvorhang",
            es: "Cortina Cortafuegos Automática",
            fr: "Rideau Coupe-Feu Automatique",
            ar: "ستارة حريق أوتوماتيكية",
        },
        description: {
            tr: "Alarm sistemiyle entegre çalışan, otomatik kapanan yangın perdeleri.",
            en: "Automatic closing fire curtains working integrated with alarm systems.",
            de: "Automatisch schließende Feuerschutzvorhänge integriert in Alarmsysteme.",
            es: "Cortinas cortafuegos de cierre automático integradas con sistemas de alarma.",
            fr: "Rideaux coupe-feu à fermeture automatique intégrés aux systèmes d'alarme.",
            ar: "ستائر حريق تغلق تلقائيًا وتعمل بدمج مع أنظمة الإنذار.",
        },
        icon: "automatic",
        image: "/images/products/fire-curtain-vertical.png",
        order: 4,
    },
    {
        slug: "konveyor-sistem",
        mainCategory: "yangin-sistemleri",
        name: {
            tr: "Konveyör Sistem",
            en: "Conveyor System",
            de: "Fördersystem-Abschluss",
            es: "Sistema de Transportador",
            fr: "Système de Convoyeur",
            ar: "نظام الناقل",
        },
        description: {
            tr: "Konveyör bant geçişlerinde kullanılan özel yangın kapanları.",
            en: "Special fire shutters used in conveyor belt passages.",
            de: "Spezielle Brandschutzabschlüsse für Förderbanddurchgänge.",
            es: "Cierres cortafuegos especiales para pasos de cintas transportadoras.",
            fr: "Fermetures coupe-feu spéciales pour passages de convoyeurs.",
            ar: "مصاريع حريق خاصة تستخدم في ممرات السيور الناقلة.",
        },
        icon: "conveyor",
        image: "/images/products/conveyor-shutter.png",
        order: 5,
    },

    // DUMAN SİSTEMLERİ
    {
        slug: "otomatik-duman-perdesi",
        mainCategory: "duman-sistemleri",
        name: {
            tr: "Otomatik Duman Perdesi",
            en: "Automatic Smoke Curtain",
            de: "Automatischer Rauchschutzvorhang",
            es: "Cortina de Humo Automática",
            fr: "Rideau de Fumée Automatique",
            ar: "ستارة دخان أوتوماتيكية",
        },
        description: {
            tr: "Yangın anında otomatik devreye giren duman bariyerleri.",
            en: "Smoke barriers automatically activated during fire.",
            de: "Automatisch aktivierte Rauchbarrieren im Brandfall.",
            es: "Barreras de humo activadas automáticamente durante incendios.",
            fr: "Barrières de fumée activées automatiquement en cas d'incendie.",
            ar: "حواجز دخان تعمل تلقائيًا أثناء الحريق.",
        },
        icon: "smoke",
        image: "/images/products/smoke-curtain-auto.png",
        order: 1,
    },
    {
        slug: "sabit-duman-perdesi",
        mainCategory: "duman-sistemleri",
        name: {
            tr: "Sabit Duman Perdesi",
            en: "Fixed Smoke Curtain",
            de: "Fester Rauchschutzvorhang",
            es: "Cortina de Humo Fija",
            fr: "Rideau de Fumée Fixe",
            ar: "ستارة دخان ثابتة",
        },
        description: {
            tr: "Tavan boşluklarında dumanı hapsetmek için kullanılan sabit perdeler.",
            en: "Fixed curtains used to trap smoke in ceiling voids.",
            de: "Feste Vorhänge zum Einschließen von Rauch in Deckenhohlräumen.",
            es: "Cortinas fijas utilizadas para atrapar humo en espacios de techo.",
            fr: "Rideaux fixes utilisés pour piéger la fumée dans les vides de plafond.",
            ar: "ستائر ثابتة تستخدم لحبس الدخان في فراغات السقف.",
        },
        icon: "fixed",
        image: "/images/products/smoke-curtain-auto.png",
        order: 2,
    },
];

// ================================
// ÜRÜNLER
// ================================

export const products: Product[] = [
    // YANGIN PERDESİ (E)
    {
        id: "fire-e-001",
        slug: "yangin-perdesi-e",
        category: "yangin-perdesi-e",
        name: {
            tr: "Yangın Perdesi (E Sınıfı)",
            en: "Fire Curtain (Class E)",
            de: "Feuerschutzvorhang (Klasse E)",
            es: "Cortina Cortafuegos (Clase E)",
            fr: "Rideau Coupe-Feu (Classe E)",
            ar: "ستارة مقاومة للحريق (فئة E)",
        },
        shortDescription: {
            tr: "60-120 dakika alev dayanımlı, otomatik yangın perdesi.",
            en: "60-120 minutes flame resistant automatic fire curtain.",
            de: "60-120 Minuten flammbeständiger automatischer Feuerschutzvorhang.",
            es: "Cortina cortafuegos automática resistente a las llamas 60-120 minutos.",
            fr: "Rideau coupe-feu automatique résistant aux flammes 60-120 minutes.",
            ar: "ستارة حريق أوتوماتيكية مقاومة للهب لمدة 60-120 دقيقة.",
        },
        description: {
            tr: "Yangın anında otomatik olarak kapanarak alevlerin binanın diğer bölümlerine sıçramasını engeller. E60, E120 dayanım sınıflarına sahiptir. Kompakt tasarımı sayesinde asma tavan içine gizlenebilir. Yangın algılama sisteminden gelen sinyal ile yerçekimi kuvvetiyle (fail-safe) kapanır.",
            en: "Closes automatically during fire to prevent flames from spreading to other parts of the building. Has E60, E120 resistance classes. Compact design allows it to be hidden in suspended ceilings. Closes with gravity (fail-safe) upon signal from fire detection system.",
            de: "Schließt im Brandfall automatisch, um das Übergreifen von Flammen auf andere Gebäudeteile zu verhindern. Verfügt über die Widerstandsklassen E60, E120. Kompaktes Design ermöglicht den Einbau in abgehängte Decken.",
            es: "Se cierra automáticamente durante un incendio para evitar que las llamas se propaguen a otras partes del edificio. Tiene clases de resistencia E60, E120. Su diseño compacto permite ocultarlo en falsos techos.",
            fr: "Se ferme automatiquement en cas d'incendie pour empêcher les flammes de se propager aux autres parties du bâtiment. Classes de résistance E60, E120.",
            ar: "يغلق تلقائيًا أثناء الحريق لمنع انتشار اللهب إلى أجزاء أخرى من المبنى. لديه فئات مقاومة E60، E120.",
        },
        features: {
            tr: ["E60 - E120 yangın dayanımı", "Fail-safe (yerçekimi ile kapanma)", "Kompakt tasarım", "Sızdırmazlık sağlayan yan kanallar"],
            en: ["E60 - E120 fire resistance", "Fail-safe (gravity closing)", "Compact design", "Sealing side channels"],
            de: ["E60 - E120 Feuerwiderstand", "Fail-Safe (Schwerkraftschließung)", "Kompaktes Design", "Abdichtende Seitenkanäle"],
            es: ["Resistencia al fuego E60 - E120", "A prueba de fallos (cierre por gravedad)", "Diseño compacto", "Canales laterales de sellado"],
            fr: ["Résistance au feu E60 - E120", "Sécurité intégrée (fermeture par gravité)", "Design compact", "Canaux latéraux d'étanchéité"],
            ar: ["مقاومة الحريق E60 - E120", "آمن من الفشل (إغلاق بالجاذبية)", "تصميم مضغوط", "قنوات جانبية مانعة للتسرب"],
        },
        specifications: [
            { label: "Dayanım Sınıfı", value: "E60 / E120" },
            { label: "Maksimum Genişlik", value: "10000 mm" },
            { label: "Maksimum Yükseklik", value: "6000 mm" },
            { label: "Kumaş", value: "Paslanmaz çelik takviyeli cam elyaf" },
            { label: "Kontrol", value: "Otomatik / Alarm Entegre" },
        ],
        usageAreas: {
            tr: ["Alışveriş merkezleri", "Oteller", "Hastaneler", "Ofis binaları", "Metro istasyonları"],
            en: ["Shopping malls", "Hotels", "Hospitals", "Office buildings", "Metro stations"],
            de: ["Einkaufszentren", "Hotels", "Krankenhäuser", "Bürogebäude", "U-Bahn-Stationen"],
            es: ["Centros comerciales", "Hoteles", "Hospitales", "Edificios de oficinas", "Estaciones de metro"],
            fr: ["Centres commerciaux", "Hôtels", "Hôpitaux", "Immeubles de bureaux", "Stations de métro"],
            ar: ["مراكز التسوق", "الفنادق", "المستشفيات", "مباني المكاتب", "محطات المترو"],
        },
        advantages: {
            tr: ["Mimari estetiği bozmaz", "Hafif yapı", "Geniş açıklıkları kapatabilir", "Ekonomik çözüm"],
            en: ["Does not disturb architectural aesthetics", "Lightweight structure", "Can cover wide openings", "Economical solution"],
            de: ["Stört die architektonische Ästhetik nicht", "Leichte Struktur", "Kann große Öffnungen abdecken", "Wirtschaftliche Lösung"],
            es: ["No altera la estética arquitectónica", "Estructura ligera", "Puede cubrir aberturas amplias", "Solución económica"],
            fr: ["Ne perturbe pas l'esthétique architecturale", "Structure légère", "Peut couvrir de larges ouvertures", "Solution économique"],
            ar: ["لا يخل بالجماليات المعمارية", "هيكل خفيف الوزن", "يمكن أن يغطي فتحات واسعة", "حل اقتصادي"],
        },
        images: ["/images/products/fire-curtain-vertical.png"],
        featured: true,
        order: 1,
    },

    // YANGIN PERDESİ (EW)
    {
        id: "fire-ew-001",
        slug: "yangin-perdesi-ew",
        category: "yangin-perdesi-ew",
        name: {
            tr: "Yangın Perdesi (EW Sınıfı)",
            en: "Fire Curtain (Class EW)",
            de: "Feuerschutzvorhang (Klasse EW)",
            es: "Cortina Cortafuegos (Clase EW)",
            fr: "Rideau Coupe-Feu (Classe EW)",
            ar: "ستارة مقاومة للحريق (فئة EW)",
        },
        shortDescription: {
            tr: "Isı radyasyonunu azaltan EW sınıfı yangın perdesi.",
            en: "EW class fire curtain reducing heat radiation.",
            de: "EW-Klasse Feuerschutzvorhang zur Reduzierung der Wärmestrahlung.",
            es: "Cortina cortafuegos clase EW que reduce la radiación térmica.",
            fr: "Rideau coupe-feu classe EW réduisant le rayonnement thermique.",
            ar: "ستارة مقاومة للحريق من الفئة EW تقلل من الإشعاع الحراري.",
        },
        description: {
            tr: "Alevleri durdurmanın yanı sıra ısı radyasyonunu belirli bir seviyenin altına düşürerek yangının diğer taraftaki nesneleri tutuşturmasını engeller (EW). Kaçış koridorlarında insanların güvenli geçişine olanak tanır.",
            en: "Besides stopping flames, it reduces heat radiation below a certain level to prevent ignition of objects on the other side (EW). Allows safe passage of people in escape corridors.",
            de: "Neben dem Stoppen von Flammen reduziert er die Wärmestrahlung unter ein bestimmtes Niveau (EW). Ermöglicht sicheren Durchgang in Fluchtwegen.",
            es: "Además de detener las llamas, reduce la radiación térmica por debajo de un cierto nivel (EW). Permite el paso seguro de personas.",
            fr: "En plus d'arrêter les flammes, il réduit le rayonnement thermique (EW). Permet le passage sûr des personnes.",
            ar: "بالإضافة إلى وقف اللهب، فإنه يقلل من الإشعاع الحراري إلى ما دون مستوى معين (EW). يسمح بمرور آمن للأشخاص.",
        },
        features: {
            tr: ["EW30 - EW120 sınıfı", "Radyasyon kontrolü", "Güvenli kaçış imkanı", "Otomatik kapanma"],
            en: ["EW30 - EW120 class", "Radiation control", "Safe escape possibility", "Automatic closing"],
            de: ["EW30 - EW120 Klasse", "Strahlungskontrolle", "Sichere Fluchtmöglichkeit", "Automatisches Schließen"],
            es: ["Clase EW30 - EW120", "Control de radiación", "Posibilidad de escape seguro", "Cierre automático"],
            fr: ["Classe EW30 - EW120", "Contrôle du rayonnement", "Possibilité d'évacuation sûre", "Fermeture automatique"],
            ar: ["فئة EW30 - EW120", "التحكم في الإشعاع", "إمكانية الهروب الآمن", "إغلاق تلقائي"],
        },
        specifications: [
            { label: "Dayanım", value: "EW 60 / EW 120" },
            { label: "Kumaş", value: "Özel kaplamalı cam elyaf" },
            { label: "Radyasyon", value: "< 15 kW/m²" },
            { label: "Montaj", value: "Duvar / Tavan" },
        ],
        usageAreas: {
            tr: ["Kaçış koridorları", "Hastaneler", "Okullar", "Müzeler"],
            en: ["Escape corridors", "Hospitals", "Schools", "Museums"],
            de: ["Fluchtwege", "Krankenhäuser", "Schulen", "Museen"],
            es: ["Pasillos de escape", "Hospitales", "Escuelas", "Museos"],
            fr: ["Couloirs d'évacuation", "Hôpitaux", "Écoles", "Musées"],
            ar: ["ممرات الهروب", "المستشفيات", "المدارس", "المتاحف"],
        },
        advantages: {
            tr: ["Düşük radyasyon geçirgenliği", "Can güvenliği sağlar", "Yangın yükünü azaltır"],
            en: ["Low radiation permeability", "Ensures life safety", "Reduces fire load"],
            de: ["Geringe Strahlungsdurchlässigkeit", "Gewährleistet Lebenssicherheit", "Reduziert Brandlast"],
            es: ["Baja permeabilidad a la radiación", "Garantiza seguridad vital", "Reduce carga de fuego"],
            fr: ["Faible perméabilité au rayonnement", "Assure la sécurité des personnes", "Réduit la charge calorifique"],
            ar: ["نفاذية إشعاع منخفضة", "يضمن سلامة الحياة", "يقلل من حمل الحريق"],
        },
        images: ["/images/products/fire-curtain-horizontal.png"],
        featured: true,
        order: 2,
    },

    // OTOMATİK DUMAN PERDESİ
    {
        id: "smoke-auto-001",
        slug: "otomatik-duman-perdesi",
        category: "otomatik-duman-perdesi",
        name: {
            tr: "Otomatik Duman Perdesi",
            en: "Automatic Smoke Curtain",
            de: "Automatischer Rauchschutzvorhang",
            es: "Cortina de Humo Automática",
            fr: "Rideau de Fumée Automatique",
            ar: "ستارة دخان أوتوماتيكية",
        },
        shortDescription: {
            tr: "Dumanın yayılmasını önleyen, tavan içine gizlenen otomatik perde.",
            en: "Automatic curtain hidden in ceiling preventing smoke spread.",
            de: "Automatischer Vorhang in der Decke, der Rauchausbreitung verhindert.",
            es: "Cortina automática oculta en el techo que evita la propagación del humo.",
            fr: "Rideau automatique caché dans le plafond empêchant la propagation de la fumée.",
            ar: "ستارة أوتوماتيكية مخفية في السقف تمنع انتشار الدخان.",
        },
        description: {
            tr: "Yangın anında duman rezervuarları oluşturarak dumanın kontrollü tahliyesini sağlar. Zehirli gazların kaçış yollarına dolmasını engeller. DH60, DH120 sınıflarında üretilebilir. Normal zamanda tavan içinde gizlidir.",
            en: "Creates smoke reservoirs during fire to ensure controlled smoke evacuation. Prevents toxic gases from filling escape routes. Can be produced in DH60, DH120 classes. Hidden in ceiling during normal times.",
            de: "Bildet im Brandfall Rauchreservoirs zur kontrollierten Rauchabführung. Verhindert das Füllen von Fluchtwegen mit giftigen Gasen.",
            es: "Crea depósitos de humo durante un incendio para asegurar la evacuación controlada del humo. Evita que los gases tóxicos llenen las rutas de escape.",
            fr: "Crée des réservoirs de fumée en cas d'incendie pour assurer une évacuation contrôlée. Empêche les gaz toxiques de remplir les voies d'évacuation.",
            ar: "يخلق خزانات دخان أثناء الحريق لضمان إخلاء الدخان المتحكم فيه. يمنع الغازات السامة من ملء طرق الهروب.",
        },
        features: {
            tr: ["DH60 - DH120 sınıfı", "Otomatik açılma", "Duman sızdırmazlık", "Tavana gizli montaj"],
            en: ["DH60 - DH120 class", "Automatic opening", "Smoke tightness", "Ceiling hidden installation"],
            de: ["DH60 - DH120 Klasse", "Automatisches Öffnen", "Rauchdichtigkeit", "Deckenverdeckte Montage"],
            es: ["Clase DH60 - DH120", "Apertura automática", "Estanqueidad al humo", "Instalación oculta en techo"],
            fr: ["Classe DH60 - DH120", "Ouverture automatique", "Étanchéité à la fumée", "Installation cachée au plafond"],
            ar: ["فئة DH60 - DH120", "فتح تلقائي", "إحكام الدخان", "تركيب مخفي في السقف"],
        },
        specifications: [
            { label: "Sıcaklık Dayanımı", value: "600°C" },
            { label: "Süre", value: "120 dakika" },
            { label: "Malzeme", value: "Poliüretan kaplı cam elyaf" },
            { label: "Standart", value: "EN 12101-1" },
        ],
        usageAreas: {
            tr: ["Atriumlar", "Havalimanları", "Depolar", "Geniş holler"],
            en: ["Atriums", "Airports", "Warehouses", "Large halls"],
            de: ["Atrien", "Flughäfen", "Lagerhallen", "Große Hallen"],
            es: ["Atrios", "Aeropuertos", "Almacenes", "Grandes salones"],
            fr: ["Atriums", "Aéroports", "Entrepôts", "Grands halls"],
            ar: ["الأذينات", "المطارات", "المستودعات", "القاعات الكبيرة"],
        },
        advantages: {
            tr: ["Dumanı hapseder", "Tahliyeyi kolaylaştırır", "Binayı korur"],
            en: ["Traps smoke", "Facilitates evacuation", "Protects building"],
            de: ["Schließt Rauch ein", "Erleichtert Evakuierung", "Schützt Gebäude"],
            es: ["Atrapa el humo", "Facilita la evacuación", "Protege el edificio"],
            fr: ["Piège la fumée", "Facilite l'évacuation", "Protège le bâtiment"],
            ar: ["يحبس الدخان", "يسهل الإخلاء", "يحمي المبنى"],
        },
        images: ["/images/products/smoke-curtain-auto.png"],
        featured: true,
        order: 3,
    },

    // SABİT DUMAN PERDESİ
    {
        id: "smoke-fixed-001",
        slug: "sabit-duman-perdesi",
        category: "sabit-duman-perdesi",
        name: {
            tr: "Sabit Duman Perdesi",
            en: "Fixed Smoke Curtain",
            de: "Fester Rauchschutzvorhang",
            es: "Cortina de Humo Fija",
            fr: "Rideau de Fumée Fixe",
            ar: "ستارة دخان ثابتة",
        },
        shortDescription: {
            tr: "Endüstriyel tesisler ve depolar için sabit duman bariyeri.",
            en: "Fixed smoke barrier for industrial facilities and warehouses.",
            de: "Feste Rauchbarriere für Industrieanlagen und Lagerhallen.",
            es: "Barrera de humo fija para instalaciones industriales y almacenes.",
            fr: "Barrière de fumée fixe pour installations industrielles et entrepôts.",
            ar: "حاجز دخان ثابت للمنشآت الصناعية والمستودعات.",
        },
        description: {
            tr: "Genellikle endüstriyel yapılarda ve yüksek tavanlı alanlarda, dumanı belirli bölgelerde hapsederek yayılmasını önlemek amacıyla kullanılan sabit sistemlerdir. Ekonomik ve bakım gerektirmeyen bir çözümdür.",
            en: "Fixed systems used generally in industrial structures and high-ceiling areas to prevent smoke spread by trapping it in specific zones. Economical and maintenance-free solution.",
            de: "Feste Systeme, die in der Regel in industriellen Strukturen und Bereichen mit hohen Decken eingesetzt werden.",
            es: "Sistemas fijos utilizados generalmente en estructuras industriales y áreas de techo alto.",
            fr: "Systèmes fixes utilisés généralement dans les structures industrielles et les zones à haut plafond.",
            ar: "أنظمة ثابتة تستخدم عمومًا في الهياكل الصناعية والمناطق ذات الأسقف العالية.",
        },
        features: {
            tr: ["Ekonomik çözüm", "Bakım gerektirmez", "Kolay montaj", "Yüksek sıcaklık dayanımı"],
            en: ["Economical solution", "Maintenance free", "Easy installation", "High temperature resistance"],
            de: ["Wirtschaftliche Lösung", "Wartungsfrei", "Einfache Montage", "Hohe Temperaturbeständigkeit"],
            es: ["Solución económica", "Sin mantenimiento", "Fácil instalación", "Resistencia a altas temperaturas"],
            fr: ["Solution économique", "Sans entretien", "Installation facile", "Haute résistance à la température"],
            ar: ["حل اقتصادي", "لا يحتاج صيانة", "سهل التركيب", "مقاومة درجات الحرارة العالية"],
        },
        specifications: [
            { label: "Sınıf", value: "D120" },
            { label: "Kumaş", value: "Cam elyaf kumaş" },
            { label: "Ağırlık", value: "450 g/m²" },
            { label: "Montaj", value: "Çelik profil veya gergi sistemi" },
        ],
        usageAreas: {
            tr: ["Fabrikalar", "Depolar", "Lojistik merkezleri", "Otoparklar"],
            en: ["Factories", "Warehouses", "Logistics centers", "Parking lots"],
            de: ["Fabriken", "Lagerhallen", "Logistikzentren", "Parkplätze"],
            es: ["Fábricas", "Almacenes", "Centros logísticos", "Aparcamientos"],
            fr: ["Usines", "Entrepôts", "Centres logistiques", "Parkings"],
            ar: ["المصانع", "المستودعات", "المراكز اللوجستية", "مواقف السيارات"],
        },
        advantages: {
            tr: ["Sürekli koruma", "Sistem arızası riski yok", "Uzun ömürlü"],
            en: ["Continuous protection", "No system failure risk", "Long-lasting"],
            de: ["Dauerhafter Schutz", "Kein Systemausfallrisiko", "Langlebig"],
            es: ["Protección continua", "Sin riesgo de fallo del sistema", "Duradero"],
            fr: ["Protection continue", "Pas de risque de panne système", "Durable"],
            ar: ["حماية مستمرة", "لا خطر فشل النظام", "طويل الأمد"],
        },
        images: ["/images/products/smoke-curtain-auto.png"],
        featured: false,
        order: 4,
    },
];

// Helper functions for Footer
export function getOutdoorCategories() {
    return categories.filter(c => c.mainCategory === 'yangin-sistemleri');
}

export function getIndoorCategories() {
    return categories.filter(c => c.mainCategory === 'duman-sistemleri');
}

export function getProductSlugByCategory(categorySlug: string) {
    const product = products.find(p => p.category === categorySlug);
    return product ? product.slug : categorySlug;
}

export function getProductsByCategory(categorySlug: string) {
    return products.filter(p => p.category === categorySlug);
}

export function searchProducts(query: string, locale: string) {
    const q = query.toLowerCase();
    return products.filter((p) => {
        const name = (p.name as any)[locale]?.toLowerCase() || "";
        const desc = (p.shortDescription as any)[locale]?.toLowerCase() || "";
        return name.includes(q) || desc.includes(q);
    });
}

export function getProductBySlug(slug: string) {
    return products.find(p => p.slug === slug);
}

export function getFeaturedProducts() {
    return products.filter(p => p.featured);
}

export function getAllProductSlugs() {
    return products.map(p => p.slug);
}
