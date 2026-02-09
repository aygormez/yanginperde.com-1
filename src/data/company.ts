import { COMPANY_INFO, STATISTICS } from "@/lib/constants";

export const companyInfo = COMPANY_INFO;
export const statistics = STATISTICS;

export const timeline = [
  {
    year: 2000,
    title: { tr: "Kuruluş", en: "Foundation", de: "Gründung", es: "Fundación", fr: "Fondation", ar: "التأسيس" },
    description: {
      tr: "YMA Yapı Sistemleri olarak İstanbul'da faaliyete başladık.",
      en: "We started operations in Istanbul as YMA Yapı Sistemleri.",
      de: "Wir haben den Betrieb in Istanbul als YMA Yapı Sistemleri aufgenommen.",
      es: "Comenzamos operaciones en Estambul como YMA Yapı Sistemleri.",
      fr: "Nous avons démarré nos activités à Istanbul sous le nom de YMA Yapı Sistemleri.",
      ar: "بدأنا العمليات في إسطنبول باسم YMA Yapı Sistemleri.",
    },
  },
  {
    year: 2005,
    title: { tr: "İlk Bayi Ağı", en: "First Dealer Network", de: "Erstes Händlernetzwerk", es: "Primera Red de Distribuidores", fr: "Premier Réseau de Distributeurs", ar: "أول شبكة وكلاء" },
    description: {
      tr: "Türkiye genelinde 20 bayi ile satış ağımızı genişlettik.",
      en: "We expanded our sales network with 20 dealers across Turkey.",
      de: "Wir haben unser Vertriebsnetz mit 20 Händlern in der Türkei erweitert.",
      es: "Expandimos nuestra red de ventas con 20 distribuidores en toda Turquía.",
      fr: "Nous avons étendu notre réseau de vente avec 20 distributeurs en Turquie.",
      ar: "قمنا بتوسيع شبكة مبيعاتنا مع 20 وكيلاً في جميع أنحاء تركيا.",
    },
  },
  {
    year: 2010,
    title: { tr: "YANGIN PERDE Markası", en: "YANGIN PERDE Brand", de: "YANGIN PERDE Marke", es: "Marca YANGIN PERDE", fr: "Marque YANGIN PERDE", ar: "علامة جيسبيرا" },
    description: {
      tr: "YANGIN PERDE markamızı oluşturduk.",
      en: "We created our YANGIN PERDE brand.",
      de: "Wir haben unsere Marke YANGIN PERDE gegründet.",
      es: "Creamos nuestra marca YANGIN PERDE.",
      fr: "Nous avons créé notre marque YANGIN PERDE.",
      ar: "أنشأنا علامتنا التجارية جيسبيرا.",
    },
  },
  {
    year: 2015,
    title: { tr: "İhracat Başlangıcı", en: "Export Start", de: "Exportstart", es: "Inicio de Exportaciones", fr: "Début des Exportations", ar: "بدء التصدير" },
    description: {
      tr: "Avrupa ve Orta Doğu'ya ihracata başladık.",
      en: "We started exporting to Europe and the Middle East.",
      de: "Wir begannen mit dem Export nach Europa und in den Nahen Osten.",
      es: "Comenzamos a exportar a Europa y Oriente Medio.",
      fr: "Nous avons commencé à exporter vers l'Europe et le Moyen-Orient.",
      ar: "بدأنا التصدير إلى أوروبا والشرق الأوسط.",
    },
  },
  {
    year: 2020,
    title: { tr: "Yeni Fabrika", en: "New Factory", de: "Neue Fabrik", es: "Nueva Fábrica", fr: "Nouvelle Usine", ar: "مصنع جديد" },
    description: {
      tr: "10.000 m² kapalı alana sahip yeni fabrikamızı açtık.",
      en: "We opened our new factory with 10,000 m² of covered area.",
      de: "Wir haben unsere neue Fabrik mit 10.000 m² überdachter Fläche eröffnet.",
      es: "Abrimos nuestra nueva fábrica con 10.000 m² de área cubierta.",
      fr: "Nous avons ouvert notre nouvelle usine de 10 000 m² couverts.",
      ar: "افتتحنا مصنعنا الجديد بمساحة 10,000 متر مربع مغطاة.",
    },
  },
  {
    year: 2024,
    title: { tr: "Dijital Dönüşüm", en: "Digital Transformation", de: "Digitale Transformation", es: "Transformación Digital", fr: "Transformation Numérique", ar: "التحول الرقمي" },
    description: {
      tr: "Akıllı ev sistemleri entegrasyonumuzu tamamladık.",
      en: "We completed our smart home systems integration.",
      de: "Wir haben unsere Smart-Home-Systemintegration abgeschlossen.",
      es: "Completamos nuestra integración de sistemas de hogar inteligente.",
      fr: "Nous avons terminé notre intégration des systèmes de maison intelligente.",
      ar: "أكملنا تكامل أنظمة المنزل الذكي.",
    },
  },
];

export const teamMembers = [
  {
    name: "Ali Günpay",
    title: { tr: "Genel Müdür", en: "General Manager", de: "Geschäftsführer", es: "Director General", fr: "Directeur Général", ar: "المدير العام" },
    image: "/images/team/ali-gunpay.jpg",
  },
  {
    name: "Mehmet Yılmaz",
    title: { tr: "Satış Direktörü", en: "Sales Director", de: "Vertriebsleiter", es: "Director de Ventas", fr: "Directeur des Ventes", ar: "مدير المبيعات" },
    image: "/images/team/mehmet-yilmaz.jpg",
  },
  {
    name: "Ayşe Kaya",
    title: { tr: "Teknik Müdür", en: "Technical Manager", de: "Technischer Leiter", es: "Director Técnico", fr: "Directeur Technique", ar: "المدير التقني" },
    image: "/images/team/ayse-kaya.jpg",
  },
];

export const certifications = [
  {
    name: "ISO 9001:2015",
    description: { tr: "Kalite Yönetim Sistemi", en: "Quality Management System", de: "Qualitätsmanagementsystem", es: "Sistema de Gestión de Calidad", fr: "Système de Management de la Qualité", ar: "نظام إدارة الجودة" },
  },
  {
    name: "CE",
    description: { tr: "Avrupa Uygunluk Belgesi", en: "European Conformity Certificate", de: "Europäisches Konformitätszertifikat", es: "Certificado de Conformidad Europea", fr: "Certificat de Conformité Européenne", ar: "شهادة المطابقة الأوروبية" },
  },
  {
    name: "TSE",
    description: { tr: "Türk Standartları Enstitüsü", en: "Turkish Standards Institute", de: "Türkisches Normeninstitut", es: "Instituto de Normas Turcas", fr: "Institut des Normes Turques", ar: "معهد المعايير التركية" },
  },
];
