"use client"

import { useI18n } from "@/lib/i18n"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"

const terroirBackgrounds = [
  {
    src: "/images/terroir-plantation-01.jpg",
    alt: "Champs de thé en terrasse",
  },
  {
    src: "/images/terroir-plantation-02.jpg",
    alt: "Plantation de thé en montagne",
  },
  {
    src: "/images/terroir-plantation-03.jpg",
    alt: "Panorama de plantation de thé",
  },
]

export function TerroirSection() {
  const { t } = useI18n()
  const [activeBackgroundIndex, setActiveBackgroundIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveBackgroundIndex((current) => (current + 1) % terroirBackgrounds.length)
    }, 3500)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <section id="terroir" className="py-20 lg:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("terroir.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("terroir.subtitle")}
          </p>
        </div>

        {/* Full width terroir image */}
        <div className="relative aspect-[21/9] rounded-sm overflow-hidden mb-16">
          {terroirBackgrounds.map((background, index) => (
            <Image
              key={background.src}
              src={background.src}
              alt={background.alt}
              fill
              quality={100}
              className={`object-cover object-center transition-opacity duration-1000 ${
                index === activeBackgroundIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-background/10 to-background/35" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Yame */}
          <div className="bg-card border border-border/50 p-8 rounded-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {t("terroir.yame.title")}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("terroir.yame.description")}
            </p>
          </div>

          {/* Uji */}
          <div className="bg-card border border-border/50 p-8 rounded-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-serif text-2xl font-bold text-foreground">
                {t("terroir.uji.title")}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t("terroir.uji.description")}
            </p>
          </div>
        </div>

        {/* Grades */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
              {t("grades.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              {t("grades.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { key: "ceremonial", color: "bg-primary" },
              { key: "grandCru", color: "bg-accent" },
              { key: "daily", color: "bg-muted" },
            ].map(({ key, color }) => (
              <div key={key} className="bg-card border border-border/50 p-6 rounded-sm">
                <div className={`${color} w-12 h-1 mb-6 rounded-full`} />
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {t(`grades.${key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`grades.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
