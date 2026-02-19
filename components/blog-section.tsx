"use client"

import { useI18n } from "@/lib/i18n"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Play } from "lucide-react"

type LocalizedText = {
  fr: string
  en: string
}

type DetailBlock = {
  title: LocalizedText
  content: LocalizedText
  image?: string
  imageAlt?: LocalizedText
  videoSrc?: string
  videoPoster?: string
  videoLabel?: LocalizedText
  videoClassName?: string
}

const articles = [
  {
    id: "transformation",
    titleKey: "blog.articles.transformation.title",
    excerptKey: "blog.articles.transformation.excerpt",
    image: "/images/blog-process-tencha-mill.jpg",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/o3bHgHpr1fc",
    date: "2025-11-28",
    detailIntro: {
      fr: "Dans cette vidéo, la transformation des feuilles en tencha puis en poudre fine est expliquée étape par étape. Chaque phase influence directement la finesse aromatique du matcha final.",
      en: "In this video, the transformation from leaves to tencha and then to fine powder is explained step by step. Each phase directly shapes the aromatic finesse of the final matcha.",
    },
    detailBlocks: [
      {
        title: {
          fr: "1. Étuvage et séchage contrôlé",
          en: "1. Controlled steaming and drying",
        },
        content: {
          fr: "Les feuilles sont étuvées rapidement pour préserver leur couleur puis séchées avec précision. Cette maîtrise évite l'oxydation excessive et conserve la fraîcheur végétale.",
          en: "Leaves are quickly steamed to preserve color, then dried with precision. This control avoids excessive oxidation and keeps vegetal freshness.",
        },
        image: "/images/blog-process-green-tea.jpg",
        imageAlt: {
          fr: "Feuilles de thé en transformation contrôlée",
          en: "Tea leaves under controlled processing",
        },
      },
      {
        title: {
          fr: "2. Broyage lent sur meules",
          en: "2. Slow stone grinding",
        },
        content: {
          fr: "Le broyage lent limite l'échauffement et protège les molécules aromatiques. On obtient une poudre très fine, adaptée à une texture lisse et homogène.",
          en: "Slow grinding limits heat and protects aromatic compounds. The result is a very fine powder, ideal for a smooth and homogeneous texture.",
        },
        image: "/images/blog-process-stone-mill.jpg",
        imageAlt: {
          fr: "Broyage du tencha sur meule traditionnelle",
          en: "Tencha stone grinding process",
        },
      },
      {
        title: {
          fr: "3. Contrôle qualité final",
          en: "3. Final quality control",
        },
        content: {
          fr: "Chaque lot est contrôlé sur la couleur, la granulométrie et le profil gustatif. Cela garantit une constance en tasse entre les productions.",
          en: "Each batch is checked for color, particle size and taste profile. This guarantees consistency in the cup across productions.",
        },
        image: "/images/blog-process-tencha-mill.jpg",
        imageAlt: {
          fr: "Contrôle qualité pendant la transformation du thé",
          en: "Quality control during tea processing",
        },
      },
    ] as DetailBlock[],
  },
  {
    id: "ceremony",
    titleKey: "blog.articles.ceremony.title",
    excerptKey: "blog.articles.ceremony.excerpt",
    image: "/images/blog-ceremony-ritual.jpg",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/xD7qUfSOGOE",
    date: "2025-10-10",
    detailIntro: {
      fr: "Cette vidéo est dédiée uniquement aux étapes de la cérémonie du thé : préparation de l'espace, gestes précis, service et dégustation. Elle suit la logique du rituel pour respecter l'esprit du chanoyu.",
      en: "This video focuses only on tea ceremony steps: space preparation, precise gestures, serving and tasting. It follows the ritual flow to preserve the spirit of chanoyu.",
    },
    detailBlocks: [
      {
        title: {
          fr: "1. Préparer l'espace et les ustensiles",
          en: "1. Prepare the space and utensils",
        },
        content: {
          fr: "Commencez par organiser un espace calme, purifier les ustensiles et préchauffer le bol. Cette ouverture donne le rythme de la cérémonie et prépare une texture régulière.",
          en: "Start by setting a calm space, purifying utensils, and preheating the bowl. This opening sets the ceremony rhythm and prepares a smooth texture.",
        },
        image: "/images/blog-ceremony-performance.jpg",
        imageAlt: {
          fr: "Mise en place de la cérémonie du thé",
          en: "Tea ceremony setup",
        },
      },
      {
        title: {
          fr: "2. Doser, tamiser puis fouetter",
          en: "2. Dose, sift, then whisk",
        },
        content: {
          fr: "Le matcha est d'abord tamisé, puis mélangé à une eau maîtrisée en température. Le fouettage en W crée une mousse fine, geste central de la cérémonie.",
          en: "Matcha is first sifted, then mixed with temperature-controlled water. W-shaped whisking creates fine foam, a central gesture of the ceremony.",
        },
        videoSrc: "/videos/ceremony-dosage-whisk-ai.mp4",
        videoPoster: "/images/blog-ceremony-whisk.jpg",
        videoLabel: {
          fr: "Vidéo IA - dosage, tamisage et fouettage du matcha",
          en: "AI video - matcha dosing, sifting and whisking",
        },
        videoClassName: "h-full w-full object-cover object-center scale-[1.18] origin-center",
      },
      {
        title: {
          fr: "3. Servir et déguster selon le rituel",
          en: "3. Serve and taste according to ritual",
        },
        content: {
          fr: "Le bol est présenté avec attention, puis dégusté en pleine conscience. Cette dernière étape met l'accent sur le respect, la gratitude et la qualité de présence.",
          en: "The bowl is presented with intention, then tasted mindfully. This final step emphasizes respect, gratitude, and quality of presence.",
        },
        image: "/images/blog-ceremony-ritual.jpg",
        imageAlt: {
          fr: "Dégustation pendant une cérémonie du thé",
          en: "Tasting during a tea ceremony",
        },
      },
    ] as DetailBlock[],
  },
]

export function BlogSection() {
  const { t, locale } = useI18n()
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({})
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)

  const buildEmbedUrl = (videoUrl: string, autoplay = true) => {
    const separator = videoUrl.includes("?") ? "&" : "?"
    const autoplayParams = autoplay ? "autoplay=1&mute=1" : "autoplay=0&mute=0"
    return `${videoUrl}${separator}${autoplayParams}&playsinline=1&rel=0&controls=1&modestbranding=1&cc_load_policy=1&cc_lang_pref=fr&hl=fr&origin=${encodeURIComponent(window.location.origin)}`
  }

  const selectedArticle = articles.find((article) => article.id === selectedArticleId) ?? null

  return (
    <section id="blog" className="py-20 lg:py-24 px-4 bg-secondary/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("blog.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="block bg-card border border-border/50 rounded-sm overflow-hidden hover:border-primary/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden">
                {article.hasVideo && playingVideos[article.id] ? (
                  <iframe
                    src={buildEmbedUrl(article.videoUrl)}
                    title={t(article.titleKey)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="h-full w-full border-0 scale-[1.03] origin-center"
                  />
                ) : (
                  <>
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={t(article.titleKey)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {article.hasVideo && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          setPlayingVideos((prev) => ({ ...prev, [article.id]: true }))
                        }}
                        className="absolute inset-0 z-10 bg-background/25 hover:bg-background/35 flex items-center justify-center transition-colors"
                        aria-label={`Play ${t(article.titleKey)}`}
                      >
                        <span className="bg-primary/90 rounded-full p-3 shadow-lg">
                          <Play className="h-5 w-5 text-primary-foreground fill-current" />
                        </span>
                      </button>
                    )}
                  </>
                )}
                {article.hasVideo && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary/90 text-primary-foreground text-xs tracking-wider uppercase px-2 py-0.5 rounded-sm font-medium">
                      {"Video"}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <time className="text-xs text-muted-foreground tracking-wider uppercase mb-2 block">
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t(article.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {t(article.excerptKey)}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedArticleId(article.id)}
                  className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all"
                >
                  {t("blog.readMore")}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {selectedArticle && (
          <article className="mt-12 bg-card border border-border/60 rounded-sm p-6 md:p-8">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 items-start mb-8">
              <div>
                <p className="text-xs tracking-wider uppercase text-primary mb-2">Article vidéo</p>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {t(selectedArticle.titleKey)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedArticle.detailIntro[locale]}
                </p>
              </div>

              <div className="relative aspect-video overflow-hidden rounded-sm border border-border/50">
                <iframe
                  src={buildEmbedUrl(selectedArticle.videoUrl, false)}
                  title={t(selectedArticle.titleKey)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full border-0 scale-[1.03] origin-center"
                />
              </div>
            </div>

            <div className="space-y-8">
              {selectedArticle.detailBlocks.map((block, index) => (
                <section key={`${selectedArticle.id}-${index}`} className="grid md:grid-cols-2 gap-6 items-center">
                  <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/50">
                      {block.videoSrc ? (
                        <video
                          src={block.videoSrc}
                          poster={block.videoPoster}
                          controls
                          playsInline
                          className={block.videoClassName ?? "h-full w-full object-cover object-center"}
                          aria-label={block.videoLabel?.[locale] ?? "Video"}
                        />
                      ) : block.image && block.imageAlt ? (
                        <Image
                          src={block.image}
                          alt={block.imageAlt[locale]}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className={index % 2 === 0 ? "md:order-2" : "md:order-1"}>
                    <h4 className="font-serif text-xl font-bold text-foreground mb-2">
                      {block.title[locale]}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {block.content[locale]}
                    </p>
                  </div>
                </section>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  )
}
