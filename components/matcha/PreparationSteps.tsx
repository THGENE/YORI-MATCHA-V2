"use client";

import { motion } from "framer-motion";
import React, { useRef, useState } from "react";

const steps = [
  { title: "Dosage précis", text: "2 g de matcha tamisé pour une texture lisse." },
  { title: "Eau à 70–75°C", text: "Ajoute 60–70 ml d’eau pour préserver l’umami." },
  { title: "Fouet en W", text: "Fouette jusqu’à obtenir une mousse fine et brillante." },
  { title: "Dégustation", text: "Savoure immédiatement pour profiter de la fraîcheur." },
];

export default function PreparationSteps() {
  return (
    <section className="w-full max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-semibold mb-8">
        Le rituel YORI Matcha
      </h2>

      {/* 🎥 Bloc vidéo ajouté */}
      <div className="w-full rounded-2xl overflow-hidden mb-12">
        <VideoPlayer src="/videos/preparation-matcha.mp4" />
      </div>

// Composant vidéo cliquable
function VideoPlayer({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-auto object-cover cursor-pointer"
      onClick={() => {
        if (!ref.current) return;
        if (ref.current.paused) {
          ref.current.play();
          setPlaying(true);
        } else {
          ref.current.pause();
          setPlaying(false);
        }
      }}
      style={{ outline: playing ? "none" : "2px solid #8bc34a" }}
      title="Cliquez pour lire/mettre en pause"
    />
  );
}

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
