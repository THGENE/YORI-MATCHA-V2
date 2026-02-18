"use client"

import { useState } from "react"
import { useI18n } from "@/lib/i18n"
import { Menu, X, ChevronDown, Globe, ShoppingBag } from "lucide-react"
import CartSidebar from "@/components/CartSidebar"
import { useCartStore } from "@/store/cartStore"
import BrandLogo from "@/components/brand-logo"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { t, locale, setLocale } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [rangesOpen, setRangesOpen] = useState(false)
  const [discoverOpen, setDiscoverOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      if (params.get("cart") !== "open") return
      setCartOpen(true)
      router.replace("/", { scroll: false })
    }
  }, [router])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="relative z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
      <nav className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <BrandLogo variant="header" />
          </button>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Panier (sidebar) */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center text-foreground hover:text-primary transition-colors"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-primary-foreground rounded-full px-2 text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </button>
              {/* Sidebar panier */}
              <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
            <button
              onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
              className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-medium">{locale === "fr" ? "EN" : "FR"}</span>
            </button>

            <button className="hidden lg:flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors rounded-sm" onClick={() => scrollTo("packs")}>
              <ShoppingBag className="h-4 w-4" />
              {t("nav.shop")}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-foreground"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Nav (below logo) */}
        <div className="hidden lg:flex items-center justify-center gap-8 border-t border-border/40 py-3">
          {/* Nos Gammes dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setRangesOpen(true)}
            onMouseLeave={() => setRangesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
              {t("nav.ranges")}
              <ChevronDown className="h-3 w-3" />
            </button>
            {rangesOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-card border border-border rounded-sm p-3 min-w-48 shadow-xl">
                  <button onClick={() => scrollTo("ceremonial")} className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors">
                    {t("nav.ceremonial")}
                  </button>
                  <button onClick={() => scrollTo("grandcru")} className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors">
                    {t("nav.grandCru")}
                  </button>
                  <button onClick={() => scrollTo("daily")} className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors">
                    {t("nav.daily")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Discover dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDiscoverOpen(true)}
            onMouseLeave={() => setDiscoverOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
              {t("nav.discover")}
              <ChevronDown className="h-3 w-3" />
            </button>
            {discoverOpen && (
              <div className="absolute top-full left-0 pt-2">
                <div className="bg-card border border-border rounded-sm p-3 min-w-56 shadow-xl">
                  <button onClick={() => scrollTo("packs")} className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors">
                    {t("nav.discoveryPack")}
                  </button>
                  <button onClick={() => scrollTo("packs")} className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors">
                    {t("nav.duoCeremonial")}
                  </button>
                  <button onClick={() => scrollTo("packs")} className="block w-full text-left px-3 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/50 rounded-sm transition-colors">
                    {t("nav.duoGrandCru")}
                  </button>
                </div>
              </div>
            )}
          </div>

          <button onClick={() => scrollTo("bestsellers")} className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
            {t("nav.bestsellers")}
          </button>
          <button onClick={() => scrollTo("about")} className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
            {t("nav.about")}
          </button>
          <button onClick={() => scrollTo("accessories")} className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
            {t("nav.accessories")}
          </button>
          <button onClick={() => scrollTo("blog")} className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
            {t("nav.blog")}
          </button>
          <button onClick={() => scrollTo("education")} className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
            {t("nav.education")}
          </button>
          <button onClick={() => scrollTo("contact")} className="text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors">
            {t("nav.contact")}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/50 py-4 space-y-1">
            <button onClick={() => scrollTo("ceremonial")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.ceremonial")}</button>
            <button onClick={() => scrollTo("grandcru")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.grandCru")}</button>
            <button onClick={() => scrollTo("daily")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.daily")}</button>
            <div className="border-t border-border/30 my-2" />
            <button onClick={() => scrollTo("packs")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.discoveryPack")}</button>
            <button onClick={() => scrollTo("bestsellers")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.bestsellers")}</button>
            <button onClick={() => scrollTo("about")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.about")}</button>
            <button onClick={() => scrollTo("accessories")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.accessories")}</button>
            <button onClick={() => scrollTo("blog")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.blog")}</button>
            <button onClick={() => scrollTo("education")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.education")}</button>
            <button onClick={() => scrollTo("contact")} className="block w-full text-left px-2 py-3 text-sm text-foreground/80 hover:text-primary transition-colors">{t("nav.contact")}</button>
            <div className="pt-2">
              <button onClick={() => scrollTo("packs")} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors rounded-sm">
                <ShoppingBag className="h-4 w-4" />
                {t("nav.shop")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
