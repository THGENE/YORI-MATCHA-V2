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
  image: string
  imageAlt: LocalizedText
}

const articles = [
  {
    id: "production",
    titleKey: "blog.articles.production.title",
    excerptKey: "blog.articles.production.excerpt",
    image: "/images/daily-matcha.png",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/KlFXl--H8eM",
    date: "2025-12-15",
    detailIntro: {
      fr: "Cette vidéo montre les étapes clés de la culture du thé, de l'ombrage des plants à la récolte fine des jeunes feuilles. L'objectif est de préserver un profil riche en umami et une texture soyeuse en tasse.",
      en: "This video highlights the key stages of tea cultivation, from shading the plants to carefully harvesting the youngest leaves. The goal is to preserve a rich umami profile and a silky texture in the cup.",
    },
    detailBlocks: [
      {
        title: {
          fr: "1. L'ombrage avant récolte",
          en: "1. Pre-harvest shading",
        },
        content: {
          fr: "Pendant les dernières semaines, les théiers sont ombrés pour stimuler la chlorophylle et renforcer la douceur. Ce procédé donne un matcha plus vert, plus rond et moins astringent.",
          en: "During the final weeks, tea plants are shaded to boost chlorophyll and enhance sweetness. This process creates a greener, rounder and less astringent matcha.",
        },
        image: "/images/terroir-yame-01.jpg",
        imageAlt: {
          fr: "Plantation de thé ombrée à Yame",
          en: "Shaded tea field in Yame",
        },
      },
      {
        title: {
          fr: "2. Sélection des feuilles tendres",
          en: "2. Tender leaf selection",
        },
        content: {
          fr: "Seules les feuilles les plus jeunes sont retenues pour conserver un profil fin. Cette sélection limite l'amertume et améliore la douceur naturelle en bouche.",
          en: "Only the youngest leaves are selected to keep a refined profile. This selection reduces bitterness and improves natural sweetness on the palate.",
        },
        image: "/images/Yori Yame velvet.png",
        imageAlt: {
          fr: "Boîte Yame Velvet sur fond noir",
          en: "Yame Velvet tin on black background",
        },
      },
      {
        title: {
          fr: "3. Résultat en tasse",
          en: "3. Cup result",
        },
        content: {
          fr: "Le résultat est un matcha crémeux, dense et parfaitement équilibré. C'est ce qui donne son identité au profil Yame Velvet présenté dans la vidéo.",
          en: "The result is a creamy, dense and perfectly balanced matcha. This is what defines the Yame Velvet profile shown in the video.",
        },
        image: "/images/daily-matcha.png",
        imageAlt: {
          fr: "Matcha préparé en bol",
          en: "Prepared matcha in a bowl",
        },
      },
    ] as DetailBlock[],
  },
  {
    id: "transformation",
    titleKey: "blog.articles.transformation.title",
    excerptKey: "blog.articles.transformation.excerpt",
    image: "/images/uji single garden.png",
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
        image: "/images/terroir-uji-01.jpg",
        imageAlt: {
          fr: "Paysage de culture à Uji",
          en: "Cultivation landscape in Uji",
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
        image: "/images/Yori Uji harmony.png",
        imageAlt: {
          fr: "Boîte Uji Harmony sur fond noir",
          en: "Uji Harmony tin on black background",
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
        image: "/images/uji single garden.png",
        imageAlt: {
          fr: "Matcha Uji en conditionnement",
          en: "Packaged Uji matcha",
        },
      },
    ] as DetailBlock[],
  },
  {
    id: "ceremony",
    titleKey: "blog.articles.ceremony.title",
    excerptKey: "blog.articles.ceremony.excerpt",
    image: "/images/sticks découvertes.png",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/xD7qUfSOGOE",
    date: "2025-10-10",
    detailIntro: {
      fr: "Cette vidéo présente les bases d'une cérémonie simple à reproduire à la maison. L'accent est mis sur la précision des gestes et l'équilibre entre eau, température et fouettage.",
      en: "This video presents the basics of a simple ceremony you can reproduce at home. The focus is on precise gestures and the balance between water, temperature and whisking.",
    },
    detailBlocks: [
      {
        title: {
          fr: "1. Préparer les ustensiles",
          en: "1. Prepare utensils",
        },
        content: {
          fr: "Un bol préchauffé, un chasen hydraté et une eau à la bonne température créent de meilleures conditions pour la mousse. Cette étape évite aussi les grumeaux.",
          en: "A preheated bowl, hydrated chasen and proper water temperature create better conditions for foam. This step also helps avoid clumps.",
        },
        image: "/images/accessory-chasen-2.jpg",
        imageAlt: {
          fr: "Fouet chasen en bambou",
          en: "Bamboo chasen whisk",
        },
      },
      {
        title: {
          fr: "2. Fouetter avec rythme",
          en: "2. Whisk with rhythm",
        },
        content: {
          fr: "Un mouvement en W, rapide mais léger, permet d'obtenir une mousse fine. Le geste doit rester souple pour préserver la texture.",
          en: "A quick yet light W motion creates a fine foam. The gesture should stay flexible to preserve texture.",
        },
        image: "/images/accessory-chasen-1.jpg",
        imageAlt: {
          fr: "Préparation du matcha avec un chasen",
          en: "Preparing matcha with a chasen",
        },
      },
      {
        title: {
          fr: "3. Déguster en pleine conscience",
          en: "3. Taste mindfully",
        },
        content: {
          fr: "Prendre le temps de sentir puis de goûter permet de mieux percevoir les notes végétales et umami. C'est l'esprit même du rituel présenté dans la vidéo.",
          en: "Taking time to smell and taste helps perceive vegetal and umami notes more clearly. This is the very spirit of the ritual shown in the video.",
        },
        image: "/images/sticks découvertes.png",
        imageAlt: {
          fr: "Collection de sticks matcha",
          en: "Matcha sticks collection",
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
                    className="h-full w-full border-0"
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
                  className="h-full w-full border-0"
                />
              </div>
            </div>

            <div className="space-y-8">
              {selectedArticle.detailBlocks.map((block, index) => (
                <section key={`${selectedArticle.id}-${index}`} className="grid md:grid-cols-2 gap-6 items-center">
                  <div className={index % 2 === 0 ? "md:order-1" : "md:order-2"}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/50">
                      <Image
                        src={block.image}
                        alt={block.imageAlt[locale]}
                        fill
                        className="object-cover"
                      />
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
