"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import PackshotImage from "@/components/PackshotImage"
import { useI18n } from "@/lib/i18n"
import { catalogById, catalogProducts } from "@/lib/product-catalog"
import { useCartStore } from "@/store/cartStore"
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react"
import { useMemo, useState } from "react"

type ProductFormat = {
  id: string
  label: { fr: string; en: string }
  grams: number
  price: number
}

const formatMap: Record<string, ProductFormat[]> = {
  "yame-velvet": [
    { id: "30g", label: { fr: "Boite de 30g", en: "30g tin" }, grams: 30, price: 34.9 },
    { id: "60g", label: { fr: "Boite de 60g", en: "60g tin" }, grams: 60, price: 64.9 },
  ],
  "uji-harmony": [
    { id: "30g", label: { fr: "Boite de 30g", en: "30g tin" }, grams: 30, price: 32.9 },
    { id: "60g", label: { fr: "Boite de 60g", en: "60g tin" }, grams: 60, price: 61.9 },
  ],
  "yame-heritage": [
    { id: "30g", label: { fr: "Boite de 30g", en: "30g tin" }, grams: 30, price: 42.9 },
    { id: "60g", label: { fr: "Boite de 60g", en: "60g tin" }, grams: 60, price: 81.9 },
  ],
  "uji-single-garden": [
    { id: "30g", label: { fr: "Boite de 30g", en: "30g tin" }, grams: 30, price: 44.9 },
    { id: "60g", label: { fr: "Boite de 60g", en: "60g tin" }, grams: 60, price: 85.9 },
  ],
  "daily-matcha": [
    { id: "100g", label: { fr: "Boite de 100g", en: "100g pack" }, grams: 100, price: 24.9 },
    { id: "200g", label: { fr: "Boite de 200g", en: "200g pack" }, grams: 200, price: 46.9 },
  ],
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { locale } = useI18n()
  const addItem = useCartStore((s) => s.addItem)
  const [selectedFormatId, setSelectedFormatId] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  const product = catalogById[id]

  if (!product) {
    return (
      <main className="min-h-screen bg-background text-foreground px-4 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">
            {locale === "fr" ? "Produit introuvable" : "Product not found"}
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {locale === "fr" ? "Retour a l'accueil" : "Back to home"}
          </Link>
        </div>
      </main>
    )
  }

  const formats = formatMap[id] ?? [{ id: "default", label: { fr: "Format unique", en: "Single format" }, grams: 0, price: product.price }]
  const selectedFormat = useMemo(() => {
    if (!formats.length) return null
    if (!selectedFormatId) return formats[0]
    return formats.find((item) => item.id === selectedFormatId) ?? formats[0]
  }, [formats, selectedFormatId])

  const finalPrice = selectedFormat?.price ?? product.price
  const similarProducts = catalogProducts.filter((item) => item.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    const productName = selectedFormat
      ? `${product.name} • ${selectedFormat.label[locale]}`
      : product.name

    for (let index = 0; index < quantity; index += 1) {
      addItem({ id: product.id, name: productName, price: finalPrice })
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-10 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {locale === "fr" ? "Retour a l'accueil" : "Back to home"}
        </Link>

        <div className="grid lg:grid-cols-2 gap-10 items-start mb-16">
          <div className="bg-card border border-border/50 rounded-sm overflow-hidden aspect-square p-3 lg:p-6">
            <PackshotImage
              src={product.image}
              alt={product.name}
              className="transition-transform duration-300 hover:scale-[1.08]"
              style={{ objectFit: "contain", width: "100%", height: "100%" }}
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-widest uppercase text-primary mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <p className="text-muted-foreground">{product.subtitle[locale]}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm tracking-wider uppercase text-muted-foreground">
                {locale === "fr" ? "Choisissez un format" : "Choose a format"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {formats.map((format) => {
                  const isSelected = (selectedFormat?.id ?? formats[0]?.id) === format.id
                  return (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => setSelectedFormatId(format.id)}
                      className={`btn-client border rounded-sm p-4 text-left transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/60 bg-card text-muted-foreground"
                      }`}
                    >
                      <p className="font-medium text-sm">{format.label[locale]}</p>
                      <p className="mt-1 text-primary font-semibold">{format.price.toFixed(2)}€</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-4xl font-bold text-primary">{finalPrice.toFixed(2)}€</p>
              <div className="flex items-center border border-border rounded-sm overflow-hidden">
                <button
                  type="button"
                  className="btn-client h-12 w-12 flex items-center justify-center"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  aria-label={locale === "fr" ? "Réduire la quantité" : "Decrease quantity"}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="h-12 min-w-14 px-3 flex items-center justify-center text-lg font-medium">{quantity}</span>
                <button
                  type="button"
                  className="btn-client h-12 w-12 flex items-center justify-center"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  aria-label={locale === "fr" ? "Augmenter la quantité" : "Increase quantity"}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              {locale === "fr" ? "Livraison offerte dès 45€ d'achat" : "Free shipping from 45€"}
            </p>

            <button
              onClick={handleAddToCart}
              className="btn-client w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 text-sm font-medium tracking-wider uppercase hover:bg-primary/90 transition-colors rounded-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              {locale === "fr" ? "Ajouter au panier" : "Add to cart"}
            </button>
          </div>
        </div>

        <section className="mb-16">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
            {locale === "fr" ? "Description produit" : "Product description"}
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            {product.description[locale]}
          </p>
        </section>

        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold">
              {locale === "fr" ? "Acheter d'autres produits" : "Buy other products"}
            </h2>
            <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
              {locale === "fr" ? "Voir le catalogue" : "View catalog"}
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <div key={item.id} className="bg-card border border-border/50 rounded-sm p-4 h-full flex flex-col">
                <Link href={`/produit/${item.id}`} className="block">
                  <div className="relative aspect-square rounded-sm overflow-hidden bg-secondary/30 mb-4">
                    <PackshotImage
                      src={item.image}
                      alt={item.name}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <h3 className="font-medium text-foreground leading-snug">{item.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.subtitle[locale]}</p>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between gap-3">
                  <span className="text-primary font-semibold">{item.price.toFixed(2)}€</span>
                  <button
                    type="button"
                    onClick={() => addItem({ id: item.id, name: item.name, price: item.price })}
                    className="btn-client text-xs px-3 py-2 bg-primary text-primary-foreground rounded-sm"
                  >
                    {locale === "fr" ? "Ajouter" : "Add"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
