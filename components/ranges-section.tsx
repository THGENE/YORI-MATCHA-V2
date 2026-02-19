"use client"

import { useI18n } from "@/lib/i18n"
import PackshotImage, { PACKSHOT_PREMIUM_STYLE } from "@/components/PackshotImage"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { catalogById } from "@/lib/product-catalog"

const ranges = [
  {
    id: "ceremonial",
    productId: "yame-velvet",
    titleKey: "ranges.ceremonial.title",
    descKey: "ranges.ceremonial.description",
    productsKey: "ranges.ceremonial.products",
    format: "30g",
    formatLabel: { fr: "Boite metallisee", en: "Metal tin" },
  },
  {
    id: "grandcru",
    productId: "yame-heritage",
    titleKey: "ranges.grandCru.title",
    descKey: "ranges.grandCru.description",
    productsKey: "ranges.grandCru.products",
    format: "30g",
    formatLabel: { fr: "Boite metallisee", en: "Metal tin" },
  },
  {
    id: "daily",
    productId: "daily-matcha",
    titleKey: "ranges.daily.title",
    descKey: "ranges.daily.description",
    productsKey: "ranges.daily.products",
    format: "100g",
    formatLabel: { fr: "Paquet en vrac", en: "Bulk package" },
  },
]

export function RangesSection() {
  const { t, locale } = useI18n()

  return (
    <section id="ranges" className="pt-20 pb-16 lg:pt-24 lg:pb-20 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("ranges.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("ranges.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ranges.map((range) => {
            const productImage = catalogById[range.productId]?.image

            return (
            <div
              key={range.id}
              id={range.id}
              className="group bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-500"
            >
              <div className="product-visual-shell relative aspect-square overflow-hidden">
                <PackshotImage
                  src={productImage || "/placeholder.svg"}
                  alt={t(range.titleKey)}
                  style={PACKSHOT_PREMIUM_STYLE}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-block bg-primary/90 text-primary-foreground text-xs tracking-wider uppercase px-3 py-1 rounded-sm font-medium">
                    {range.formatLabel[locale]} - {range.format}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {t(range.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t(range.descKey)}
                </p>
                <p className="text-primary text-sm font-medium mb-4">
                  {t(range.productsKey)}
                </p>
                <Link
                  href={`/produit/${range.productId}`}
                  className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors group/btn"
                >
                  {t("products.discover")}
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  )
}
