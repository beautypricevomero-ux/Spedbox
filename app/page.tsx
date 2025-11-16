"use client";

import { LayoutShell } from "@/components/LayoutShell";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const slides = [
  {
    title: "Swipe & Add",
    description: "Scorri i prodotti come in una dating app e riempi la tua box in pochi secondi.",
  },
  {
    title: "Tickets lampo",
    description: "Scegli il ticket che preferisci e gioca contro il tempo per massimizzare il valore.",
  },
  {
    title: "BeautyVes Edition",
    description: "Se catturi almeno un prodotto BeautyVes sblocchi il valore minimo speciale.",
  },
];

export default function LandingPage() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <LayoutShell title="SpeedBox" subtitle="Un gioco d'acquisto in stile Tinder" eyebrow="Benvenuta">
      <div className="relative rounded-[2.5rem] bg-white/70 p-6 shadow-[0_30px_60px_rgba(255,75,110,0.2)] backdrop-blur">
        <div className="absolute -top-8 right-6 h-16 w-16 rounded-full bg-sbPinkDeep/30 blur-3xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-sbPinkDeep">{slide.title}</p>
            <p className="mt-4 text-lg text-sbTextDark/80">{slide.description}</p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-2.5 w-2.5 rounded-full ${idx === index ? "bg-sbRed" : "bg-sbPink"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-sbPinkDeep shadow"
          >
            Avanti
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <Link
          href="/home"
          className="block rounded-full bg-sbRed py-4 text-center text-lg font-semibold text-white shadow-[0_20px_40px_rgba(255,75,110,0.35)]"
        >
          Scegli il tuo ticket
        </Link>
        <p className="text-center text-xs text-sbTextDark/60">Demo experience · Nessun pagamento reale</p>
      </div>
    </LayoutShell>
  );
}
