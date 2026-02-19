"use client"

import { useI18n } from "@/lib/i18n"
import Image from "next/image"
import { useRef, useState } from "react"
import { Zap, Shield, Brain, Sparkles, Play } from "lucide-react"

export function EducationSection() {
  const { t } = useI18n()
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLIFrameElement | null>(null)
  const videoUrl = "https://www.youtube.com/embed/5U1KfL7b6As?autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1&controls=1"

  const forceYoutubePlay = () => {
    if (!videoRef.current?.contentWindow) return

    videoRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "mute", args: [] }),
      "*"
    )
    videoRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: [] }),
      "*"
    )
  }

  const benefits = [
    { icon: Zap, titleKey: "education.benefits.energy", descKey: "education.benefits.energyDesc" },
    { icon: Shield, titleKey: "education.benefits.antioxidants", descKey: "education.benefits.antioxidantsDesc" },
    { icon: Brain, titleKey: "education.benefits.calm", descKey: "education.benefits.calmDesc" },
    { icon: Sparkles, titleKey: "education.benefits.detox", descKey: "education.benefits.detoxDesc" },
  ]

  const steps = [
    { num: "01", key: "education.howTo.step1" },
    { num: "02", key: "education.howTo.step2" },
    { num: "03", key: "education.howTo.step3" },
    { num: "04", key: "education.howTo.step4" },
  ]

  return (
    <section id="education" className="py-20 lg:py-24 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            {t("education.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            {t("education.subtitle")}
          </p>
        </div>

        {/* How to prepare */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-8">
              {t("education.howTo.title")}
            </h3>
            <div className="space-y-6">
              {steps.map(({ num, key }) => (
                <div key={num} className="flex items-start gap-4">
                  <span className="text-primary font-serif text-2xl font-bold min-w-12">{num}</span>
                  <div className="border-l border-primary/30 pl-4 py-1">
                    <p className="text-foreground/90 leading-relaxed">{t(key)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video placeholder */}
          <div className="relative aspect-video rounded-sm overflow-hidden bg-card border border-border/50">
            {isPlaying ? (
              <iframe
                ref={videoRef}
                src={videoUrl}
                title="Matcha preparation video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                onLoad={forceYoutubePlay}
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <>
                <Image
                  src="/images/uji single garden.png"
                  alt="Matcha preparation"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 bg-background/40 flex items-center justify-center"
                  aria-label="Play video"
                >
                  <span className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-4 transition-colors">
                    <Play className="h-8 w-8 fill-current" />
                  </span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Matcha vs Coffee */}
        <div className="bg-card border border-border/50 rounded-sm p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("education.benefits.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("education.benefits.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-foreground font-medium mb-2 text-sm">
                  {t(titleKey)}
                </h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {t(descKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
