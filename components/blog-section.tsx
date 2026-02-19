"use client"

import { useI18n } from "@/lib/i18n"
import Image from "next/image"
import { useState } from "react"
import { ArrowRight, Play } from "lucide-react"

const articles = [
  {
    id: "production",
    titleKey: "blog.articles.production.title",
    excerptKey: "blog.articles.production.excerpt",
    image: "/images/daily-matcha.png",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/5U1KfL7b6As",
    date: "2025-12-15",
  },
  {
    id: "transformation",
    titleKey: "blog.articles.transformation.title",
    excerptKey: "blog.articles.transformation.excerpt",
    image: "/images/uji single garden.png",
    hasVideo: true,
    videoUrl: "https://www.youtube.com/embed/5U1KfL7b6As",
    date: "2025-11-28",
  },
  {
    id: "ceremony",
    titleKey: "blog.articles.ceremony.title",
    excerptKey: "blog.articles.ceremony.excerpt",
    image: "/images/sticks découvertes.png",
    hasVideo: false,
    videoUrl: "https://www.youtube.com/results?search_query=ceremonie+du+the+japon",
    date: "2025-10-10",
  },
]

export function BlogSection() {
  const { t } = useI18n()
  const [playingVideos, setPlayingVideos] = useState<Record<string, boolean>>({})

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
                    src={`${article.videoUrl}?autoplay=1&rel=0`}
                    title={t(article.titleKey)}
                    allow="autoplay; encrypted-media; picture-in-picture"
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
                        onClick={() => setPlayingVideos((prev) => ({ ...prev, [article.id]: true }))}
                        className="absolute inset-0 bg-background/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label={`Play ${t(article.titleKey)}`}
                      >
                        <span className="bg-primary/90 rounded-full p-3">
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
                <span className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                  {t("blog.readMore")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
