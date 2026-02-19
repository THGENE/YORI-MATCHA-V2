"use client"

import { useI18n } from "@/lib/i18n"
import PackshotImage from "@/components/PackshotImage"
import { ShoppingBag, Package } from "lucide-react"
import { useRouter } from "next/navigation"

const packs = [
  {
    id: "discovery",
    titleKey: "packs.discovery.title",
    descKey: "packs.discovery.description",
    containsKey: "packs.discovery.contains",
    image: "/images/sticks découvertes.png",
    price: 14.90,
    details: {
      fr: "2 sticks Ceremonial (Yame Velvet + Uji Harmony) + 2 sticks Grand Cru (Yame Heritage + Uji Single Garden) + 1 stick Daily Matcha Latte",
      en: "2 Ceremonial sticks (Yame Velvet + Uji Harmony) + 2 Grand Cru sticks (Yame Heritage + Uji Single Garden) + 1 Daily Matcha Latte stick",
    },
  },
  {
    id: "duo-ceremonial",
    titleKey: "packs.duoCeremonial.title",
    descKey: "packs.duoCeremonial.description",
    containsKey: "packs.duoCeremonial.contains",
    image: "/images/uji single garden.png",
    price: 7.90,
    details: {
      fr: "1 stick Yame Velvet + 1 stick Uji Harmony",
      en: "1 Yame Velvet stick + 1 Uji Harmony stick",
    },
  },
  {
    id: "duo-grand-cru",
    titleKey: "packs.duoGrandCru.title",
    descKey: "packs.duoGrandCru.description",
    containsKey: "packs.duoGrandCru.contains",
    image: "/images/yame heritage.png",
    price: 9.90,
    details: {
      fr: "1 stick Yame Heritage + 1 stick Uji Single Garden",
      en: "1 Yame Heritage stick + 1 Uji Single Garden stick",
    },
  },
]

export function PacksSection() {
  const { t, locale } = useI18n()
  const router = useRouter()

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
              className="bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/40 transition-all duration-300 group h-full flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <PackshotImage
                  src={pack.image || "/placeholder.svg"}
                  alt={t(pack.titleKey)}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="text-xs text-primary tracking-wider uppercase font-medium">
                      {t(pack.containsKey)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {t(pack.titleKey)}
                  </h3>
                  <span className="text-primary font-bold text-lg">{pack.price.toFixed(2)}{"€"}</span>
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
                  onClick={() => router.push(`/produit/${pack.id}`)}
                  className="w-full mt-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {t("products.addToCart")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
