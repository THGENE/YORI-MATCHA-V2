"use client"

import { useI18n } from "@/lib/i18n"
import PackshotImage, { PACKSHOT_PREMIUM_STYLE } from "@/components/PackshotImage"
import { ShoppingBag, Package } from "lucide-react"
import { useCartStore } from "@/store/cartStore"
import Link from "next/link"

const packs = [
  {
    id: "discovery",
    titleKey: "packs.discovery.title",
    descKey: "packs.discovery.description",
    containsKey: "packs.discovery.contains",
    image: "/images/Yori Sticks découvertes.png",
    sticks: 10,
    tier: "mid",
    price: 14.90,
    details: {
      fr: "10 sticks individuels : 6 Daily Matcha Latte + 3 Ceremonial + 1 Grand Cru.",
      en: "10 individual sticks: 6 Daily Matcha Latte + 3 Ceremonial + 1 Grand Cru.",
    },
  },
  {
    id: "duo-ceremonial",
    titleKey: "packs.duoCeremonial.title",
    descKey: "packs.duoCeremonial.description",
    containsKey: "packs.duoCeremonial.contains",
    image: "/images/Yori Sticks découvertes.png",
    sticks: 4,
    tier: "high",
    price: 7.90,
    details: {
      fr: "4 sticks Ceremonial.",
      en: "4 Ceremonial sticks.",
    },
  },
  {
    id: "duo-grand-cru",
    titleKey: "packs.duoGrandCru.title",
    descKey: "packs.duoGrandCru.description",
    containsKey: "packs.duoGrandCru.contains",
    image: "/images/Yori Sticks découvertes.png",
    sticks: 2,
    tier: "ultra",
    price: 9.90,
    details: {
      fr: "2 sticks Grand Cru.",
      en: "2 Grand Cru sticks.",
    },
  },
]

export function PacksSection() {
  const { t, locale } = useI18n()
  const addItem = useCartStore((s) => s.addItem)

  return (
    <section id="packs" className="pt-16 pb-20 lg:pt-20 lg:pb-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("packs.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("packs.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packs.map((pack) => (
            <div
              key={pack.id}
              className="product-card-interactive bg-card border border-border/50 rounded-sm overflow-hidden transition-all duration-300 group h-full flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <PackshotImage
                  src={pack.image || "/placeholder.svg"}
                  alt={t(pack.titleKey)}
                  style={PACKSHOT_PREMIUM_STYLE}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="text-xs text-primary tracking-wider uppercase font-medium">
                      {t(pack.containsKey)}
                    </span>
                  </div>
                  <span className="bg-background/75 text-foreground text-[11px] px-2 py-1 rounded-sm border border-border/60 whitespace-nowrap">
                    {pack.sticks} sticks • {pack.tier === "mid" ? (locale === "fr" ? "Milieu de gamme" : "Mid-range") : pack.tier === "high" ? (locale === "fr" ? "Haut de gamme" : "Premium") : (locale === "fr" ? "Très haut de gamme" : "Ultra premium")}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground min-h-[3.5rem] leading-snug">
                    {t(pack.titleKey)}
                  </h3>
                  <span className="text-primary font-bold text-lg shrink-0 text-right">{pack.price.toFixed(2)}{"€"}</span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t(pack.descKey)}
                </p>

                <div className="bg-secondary/30 p-3 rounded-sm mb-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {pack.details[locale]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    addItem({ id: pack.id, name: t(pack.titleKey), price: pack.price })
                  }}
                  className="btn-client w-full mt-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm cursor-pointer"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {t("products.addToCart")}
                </button>
                <Link
                  href={`/produit/${pack.id}`}
                  className="mt-3 text-center text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {locale === "fr" ? "Voir la fiche produit" : "View product details"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
