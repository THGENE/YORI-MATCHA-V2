"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import PackshotImage from "@/components/PackshotImage"
import { Star, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react"
import { useCartStore } from "@/store/cartStore"

type Product = {
  id: string
  name: string
  image: string
  price: number
  origin: string
  composition: { fr: string; en: string }
  ingredients: { fr: string; en: string }
  tastingNotes: { fr: string; en: string }
  preparation: { fr: string; en: string }
  format: { fr: string; en: string }
  rating: number
  reviewCount: number
  reviews: { name: string; rating: number; text: { fr: string; en: string } }[]
  badge?: string
}

const products: Product[] = [
  {
    id: "yame-velvet",
    name: "Yame Velvet",
    image: "/images/uji single garden.png",
    price: 34.90,
    origin: "Yame, Fukuoka, Japon",
    composition: { fr: "100% Matcha Ceremonial", en: "100% Ceremonial Matcha" },
    ingredients: { fr: "The vert matcha (Camellia sinensis) - Cultivar Okumidori", en: "Green matcha tea (Camellia sinensis) - Okumidori cultivar" },
    tastingNotes: { fr: "Notes veloutees, umami prononce, finale douce et cremeuse sans amertume", en: "Velvety notes, pronounced umami, sweet and creamy finish without bitterness" },
    preparation: { fr: "1-2g dans 70ml d'eau a 70-80 C. Fouetter en W avec le chasen.", en: "1-2g in 70ml of water at 70-80 C. Whisk in W motion with chasen." },
    format: { fr: "Boite metallisee 30g", en: "30g metal tin" },
    rating: 4.9,
    reviewCount: 127,
    reviews: [
      { name: "Marie L.", rating: 5, text: { fr: "Un matcha d'une douceur incroyable, je n'ai jamais goute quelque chose d'aussi fin.", en: "Incredibly smooth matcha, I've never tasted anything so refined." } },
      { name: "Thomas B.", rating: 5, text: { fr: "La qualite est au rendez-vous. L'umami est parfaitement equilibre.", en: "Quality delivers. The umami is perfectly balanced." } },
    ],
    badge: "Ceremonial",
  },
  {
    id: "uji-harmony",
    name: "Uji Harmony",
    image: "/images/uji single garden.png",
    price: 32.90,
    origin: "Uji, Kyoto, Japon",
    composition: { fr: "100% Matcha Ceremonial", en: "100% Ceremonial Matcha" },
    ingredients: { fr: "The vert matcha (Camellia sinensis) - Cultivar Samidori", en: "Green matcha tea (Camellia sinensis) - Samidori cultivar" },
    tastingNotes: { fr: "Aromes floraux, umami delicat, douceur herbacee avec une touche de noisette", en: "Floral aromas, delicate umami, herbaceous sweetness with a hint of hazelnut" },
    preparation: { fr: "1-2g dans 70ml d'eau a 70-80 C. Fouetter en W avec le chasen.", en: "1-2g in 70ml of water at 70-80 C. Whisk in W motion with chasen." },
    format: { fr: "Boite metallisee 30g", en: "30g metal tin" },
    rating: 4.8,
    reviewCount: 98,
    reviews: [
      { name: "Sophie R.", rating: 5, text: { fr: "Harmonieux comme son nom l'indique. Parfait pour ma ceremonie du matin.", en: "Harmonious as its name suggests. Perfect for my morning ceremony." } },
      { name: "Laurent M.", rating: 4, text: { fr: "Tres bon matcha, les notes florales sont remarquables.", en: "Very good matcha, the floral notes are remarkable." } },
    ],
    badge: "Ceremonial",
  },
  {
    id: "yame-heritage",
    name: "Yame Heritage",
    image: "/images/yame heritage.png",
    price: 42.90,
    origin: "Yame, Fukuoka, Japon",
    composition: { fr: "100% Matcha Grand Cru - Single Garden", en: "100% Grand Cru Matcha - Single Garden" },
    ingredients: { fr: "The vert matcha (Camellia sinensis) - Cultivar Gokou, recolte de printemps", en: "Green matcha tea (Camellia sinensis) - Gokou cultivar, spring harvest" },
    tastingNotes: { fr: "Umami intense et profond, notes de creme fouettee, finale longue et soyeuse", en: "Intense deep umami, whipped cream notes, long silky finish" },
    preparation: { fr: "1.5g dans 60ml d'eau a 70 C. Fouetter delicatement en W.", en: "1.5g in 60ml of water at 70 C. Gently whisk in W motion." },
    format: { fr: "Boite metallisee 30g", en: "30g metal tin" },
    rating: 5.0,
    reviewCount: 56,
    reviews: [
      { name: "Alexandre D.", rating: 5, text: { fr: "Le meilleur matcha que j'ai jamais goute. Une experience transcendante.", en: "The best matcha I've ever tasted. A transcendent experience." } },
      { name: "Camille P.", rating: 5, text: { fr: "Exceptionnel. La longueur en bouche est incroyable.", en: "Exceptional. The length on the palate is incredible." } },
    ],
    badge: "Grand Cru",
  },
  {
    id: "uji-single-garden",
    name: "Uji Single Garden",
    image: "/images/uji single garden.png",
    price: 44.90,
    origin: "Uji, Kyoto, Japon",
    composition: { fr: "100% Matcha Grand Cru - Single Garden", en: "100% Grand Cru Matcha - Single Garden" },
    ingredients: { fr: "The vert matcha (Camellia sinensis) - Cultivar Asahi, parcelle unique", en: "Green matcha tea (Camellia sinensis) - Asahi cultivar, single plot" },
    tastingNotes: { fr: "Complexite aromatique exceptionnelle, notes de beurre frais et marine, umami elegant", en: "Exceptional aromatic complexity, fresh butter and marine notes, elegant umami" },
    preparation: { fr: "1.5g dans 60ml d'eau a 70 C. Fouetter delicatement en W.", en: "1.5g in 60ml of water at 70 C. Gently whisk in W motion." },
    format: { fr: "Boite metallisee 30g", en: "30g metal tin" },
    rating: 5.0,
    reviewCount: 43,
    reviews: [
      { name: "Isabelle V.", rating: 5, text: { fr: "Un chef-d'oeuvre. Chaque tasse est une meditation.", en: "A masterpiece. Each cup is a meditation." } },
      { name: "Nicolas G.", rating: 5, text: { fr: "La complexite des aromes est fascinante. Un vrai grand cru.", en: "The complexity of aromas is fascinating. A true grand cru." } },
    ],
    badge: "Grand Cru",
  },
  {
    id: "daily-matcha",
    name: "Daily Matcha Latte",
    image: "/images/daily-matcha.png",
    price: 24.90,
    origin: "Kagoshima, Japon",
    composition: { fr: "100% Matcha Daily Grade", en: "100% Daily Grade Matcha" },
    ingredients: { fr: "The vert matcha (Camellia sinensis) - Blend de cultivars", en: "Green matcha tea (Camellia sinensis) - Cultivar blend" },
    tastingNotes: { fr: "Vegetal, leger amer equilibre, robuste et parfait avec du lait", en: "Vegetal, balanced light bitter, robust and perfect with milk" },
    preparation: { fr: "2g dans 30ml d'eau chaude, puis 200ml de lait mousse.", en: "2g in 30ml of hot water, then 200ml of frothed milk." },
    format: { fr: "Paquet en vrac 100g", en: "100g bulk package" },
    rating: 4.7,
    reviewCount: 215,
    reviews: [
      { name: "Julie F.", rating: 5, text: { fr: "Mon matcha latte quotidien. Rapport qualite-prix imbattable.", en: "My daily matcha latte. Unbeatable value." } },
      { name: "Marc T.", rating: 4, text: { fr: "Tres bien pour les lattes, bon gout et belle couleur.", en: "Great for lattes, good taste and beautiful color." } },
    ],
    badge: "Daily",
  },
]

function ProductCard({ product }: { product: Product }) {
  const { t, locale } = useI18n()
  const addItem = useCartStore((s) => s.addItem)
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
      <div className="relative aspect-square overflow-hidden">
        <PackshotImage
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        {product.badge && (
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-primary-foreground text-xs tracking-wider uppercase px-3 py-1 rounded-sm font-medium">
              {product.badge}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-serif text-xl font-bold text-foreground min-h-[3.5rem] leading-snug">{product.name}</h3>
          <span className="text-primary font-bold text-lg shrink-0 text-right">{product.price.toFixed(2)}{"€"}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {product.rating} ({product.reviewCount} {t("products.reviews").toLowerCase()})
          </span>
        </div>

        {/* Quick info */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-primary font-medium min-w-20">{t("products.origin")}</span>
            <span className="text-muted-foreground">{product.origin}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-medium min-w-20">{t("products.format")}</span>
            <span className="text-muted-foreground">{product.format[locale]}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-medium min-w-20">{t("products.tastingNotes")}</span>
            <span className="text-muted-foreground">{product.tastingNotes[locale]}</span>
          </div>
        </div>

        {/* Expandable details */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors mb-4"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              {locale === "fr" ? "Moins de details" : "Less details"}
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              {locale === "fr" ? "Plus de details" : "More details"}
            </>
          )}
        </button>

        {expanded && (
          <div className="space-y-3 mb-4 pt-3 border-t border-border/50 text-sm">
            <div>
              <span className="text-primary font-medium block mb-1">{t("products.composition")}</span>
              <span className="text-muted-foreground">{product.composition[locale]}</span>
            </div>
            <div>
              <span className="text-primary font-medium block mb-1">{t("products.ingredients")}</span>
              <span className="text-muted-foreground">{product.ingredients[locale]}</span>
            </div>
            <div>
              <span className="text-primary font-medium block mb-1">{t("products.preparation")}</span>
              <span className="text-muted-foreground">{product.preparation[locale]}</span>
            </div>

            {/* Reviews */}
            <div className="pt-3 border-t border-border/50">
              <h4 className="text-primary font-medium mb-3">{t("products.reviews")}</h4>
              <div className="space-y-3">
                {product.reviews.map((review) => (
                  <div key={review.name} className="bg-secondary/30 p-3 rounded-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-foreground font-medium text-xs">{review.name}</span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {`"${review.text[locale]}"`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
          className="w-full mt-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm"
        >
          <ShoppingBag className="h-4 w-4" />
          {t("products.addToCart")}
        </button>
      </div>
    </div>
  )
}

export function ProductsSection() {
  const { t, locale } = useI18n();

  return (
    <section id="bestsellers" className="py-20 lg:py-24 px-4 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("bestsellers.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("bestsellers.subtitle")}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {/* All products grid */}
        <div className="mt-16">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-8 text-center">
            {locale === "fr" ? "Tous nos matchas" : "All our matchas"}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
