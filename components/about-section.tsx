"use client"

import { useI18n } from "@/lib/i18n"
import Image from "next/image"
import { Leaf, Heart, BookOpen } from "lucide-react"

export function AboutSection() {
  const { t } = useI18n()

  const values = [
    { icon: Leaf, titleKey: "about.values.quality", descKey: "about.values.qualityDesc" },
    { icon: Heart, titleKey: "about.values.authenticity", descKey: "about.values.authenticityDesc" },
    { icon: BookOpen, titleKey: "about.values.education", descKey: "about.values.educationDesc" },
  ]

  return (
    <section id="about" className="py-20 lg:py-24 px-4 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <Image
              src="/images/Yori Sticks découvertes.png"
              alt="YORI Matcha"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {t("about.title")}
            </h2>
            <p className="text-primary text-sm tracking-widest uppercase mb-8">
              {t("about.subtitle")}
            </p>

            <div className="space-y-6 mb-12">
              <p className="text-muted-foreground leading-relaxed">{t("about.text1")}</p>
              <p className="text-muted-foreground leading-relaxed">{t("about.text2")}</p>
              <p className="text-foreground/90 leading-relaxed italic font-serif text-lg">
                {`"${t("about.text3")}"`}
              </p>
            </div>

            {/* Values */}
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-6">
                {t("about.values.title")}
              </h3>
              <div className="grid gap-4">
                {values.map(({ icon: Icon, titleKey, descKey }) => (
                  <div key={titleKey} className="flex items-start gap-4 bg-card p-4 rounded-sm border border-border/50">
                    <div className="bg-primary/10 p-2 rounded-sm">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-foreground font-medium mb-1">{t(titleKey)}</h4>
                      <p className="text-muted-foreground text-sm">{t(descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
