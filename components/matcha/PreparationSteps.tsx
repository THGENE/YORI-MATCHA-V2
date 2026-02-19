"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const steps = [
  { title: "Dosage précis", text: "2 g de matcha tamisé pour une texture lisse." },
  { title: "Eau à 70–75°C", text: "Ajoute 60–70 ml d’eau pour préserver l’umami." },
  { title: "Fouet en W", text: "Fouette jusqu’à obtenir une mousse fine et brillante." },
  { title: "Dégustation", text: "Savoure immédiatement pour profiter de la fraîcheur." },
];

export default function PreparationSteps() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">
        Le rituel YORI Matcha
      </h2>

      {/* 🎥 Bloc vidéo ajouté */}
      <div className="w-full rounded-2xl overflow-hidden mb-12">
        <div className="w-full rounded-2xl overflow-hidden mb-12 aspect-video bg-black relative">
          {isPlaying ? (
            <iframe
              src="https://www.youtube.com/embed/5U1KfL7b6As?autoplay=1&rel=0"
              title="Préparation du Matcha - Vidéo premium"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0"
              aria-label="Play video"
            >
              <Image
                src="/images/uji single garden.png"
                alt="Préparation du Matcha"
                fill
                className="object-cover"
              />
              <span className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full p-4 transition-colors">
                  <Play className="h-8 w-8 fill-current" />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-black/90 text-white rounded-2xl p-5 border border-white/10"
          >
            <h3 className="text-lg font-medium mb-2">{step.title}</h3>
            <p className="text-sm text-white/80">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
