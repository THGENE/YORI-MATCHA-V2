export type CatalogProduct = {
  id: string
  name: string
  category: "matcha" | "pack" | "accessory"
  image: string
  price: number
  subtitle: { fr: string; en: string }
  description: { fr: string; en: string }
}

export const catalogProducts: CatalogProduct[] = [
  {
    id: "yame-velvet",
    name: "Yame Velvet",
    category: "matcha",
    image: "/images/Yori Yame velvet.png",
    price: 34.9,
    subtitle: {
      fr: "Matcha Ceremonial • Yame, Japon",
      en: "Ceremonial Matcha • Yame, Japan",
    },
    description: {
      fr: "Un matcha ceremonial veloute, riche en umami, ideal pour une degustation pure.",
      en: "A velvety ceremonial matcha, rich in umami, ideal for pure tasting.",
    },
  },
  {
    id: "uji-harmony",
    name: "Uji Harmony",
    category: "matcha",
    image: "/images/Yori Uji harmony.png",
    price: 32.9,
    subtitle: {
      fr: "Matcha Ceremonial • Uji, Japon",
      en: "Ceremonial Matcha • Uji, Japan",
    },
    description: {
      fr: "Un profil floral et equilibre, parfait pour le rituel du matin.",
      en: "A floral and balanced profile, perfect for your morning ritual.",
    },
  },
  {
    id: "yame-heritage",
    name: "Yame Heritage",
    category: "matcha",
    image: "/images/yame heritage.png",
    price: 42.9,
    subtitle: {
      fr: "Grand Cru • Yame, Japon",
      en: "Grand Cru • Yame, Japan",
    },
    description: {
      fr: "Un grand cru intense et long en bouche pour les amateurs exigeants.",
      en: "An intense grand cru with long finish for demanding enthusiasts.",
    },
  },
  {
    id: "uji-single-garden",
    name: "Uji Single Garden",
    category: "matcha",
    image: "/images/uji single garden.png",
    price: 44.9,
    subtitle: {
      fr: "Grand Cru • Uji, Japon",
      en: "Grand Cru • Uji, Japan",
    },
    description: {
      fr: "Un single garden complexe, elegant et profond.",
      en: "A complex, elegant and deep single-garden matcha.",
    },
  },
  {
    id: "daily-matcha",
    name: "Daily Matcha Latte",
    category: "matcha",
    image: "/images/daily-matcha.png",
    price: 24.9,
    subtitle: {
      fr: "Daily Grade • Japon",
      en: "Daily Grade • Japan",
    },
    description: {
      fr: "Un matcha ideal pour les lattes et usages quotidiens.",
      en: "An ideal matcha for lattes and daily use.",
    },
  },
  {
    id: "discovery",
    name: "Pack Decouverte",
    category: "pack",
    image: "/images/sticks découvertes.png",
    price: 14.9,
    subtitle: {
      fr: "Pack de 5 sticks",
      en: "5-stick discovery pack",
    },
    description: {
      fr: "Le meilleur point de depart pour decouvrir l'univers YORI.",
      en: "The best starting point to discover the YORI universe.",
    },
  },
  {
    id: "duo-ceremonial",
    name: "Pack Duo Ceremonial",
    category: "pack",
    image: "/images/uji single garden.png",
    price: 7.9,
    subtitle: {
      fr: "2 sticks ceremonials",
      en: "2 ceremonial sticks",
    },
    description: {
      fr: "Une selection de deux sticks ceremonials premium.",
      en: "A premium selection of two ceremonial sticks.",
    },
  },
  {
    id: "duo-grand-cru",
    name: "Pack Duo Grand Cru",
    category: "pack",
    image: "/images/yame heritage.png",
    price: 9.9,
    subtitle: {
      fr: "2 sticks grand cru",
      en: "2 grand cru sticks",
    },
    description: {
      fr: "Deux sticks grand cru pour une experience intense.",
      en: "Two grand cru sticks for an intense experience.",
    },
  },
  {
    id: "chasen",
    name: "Chasen",
    category: "accessory",
    image: "/images/accessory-chasen-1.jpg",
    price: 24.9,
    subtitle: {
      fr: "Fouet en bambou",
      en: "Bamboo whisk",
    },
    description: {
      fr: "Accessoire traditionnel pour une mousse parfaite.",
      en: "Traditional accessory for perfect foam.",
    },
  },
  {
    id: "chawan",
    name: "Chawan",
    category: "accessory",
    image: "/images/logo-y.png",
    price: 29.9,
    subtitle: {
      fr: "Bol a matcha",
      en: "Matcha bowl",
    },
    description: {
      fr: "Bol artisanal pense pour la preparation traditionnelle.",
      en: "Artisan bowl designed for traditional preparation.",
    },
  },
  {
    id: "chashaku",
    name: "Chashaku",
    category: "accessory",
    image: "/images/logo-y.png",
    price: 12.9,
    subtitle: {
      fr: "Cuillere en bambou",
      en: "Bamboo scoop",
    },
    description: {
      fr: "Cuillere doseuse pour la quantite ideale de matcha.",
      en: "Measuring scoop for the ideal amount of matcha.",
    },
  },
]

export const catalogById = Object.fromEntries(
  catalogProducts.map((product) => [product.id, product])
) as Record<string, CatalogProduct>
