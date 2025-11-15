"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const slides = [
  {
    title: "Benvenuta in SpeedBox",
    subtitle: "La box che scegli tu… in pochi secondi."
  },
  {
    title: "Come funziona",
    subtitle: "Paga un ticket, tempo limitato, un prodotto alla volta. Aggiungi o salta."
  },
  {
    title: "Valore garantito",
    subtitle: "Ricevi sempre più di quanto paghi.",
    cta: true
  }
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  return (
    <LayoutShell>
      <div className="flex flex-col items-center justify-between min-h-[75vh] space-y-10">
        <div className="h-64 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-3"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-sbRichBlack">{slides[step].title}</h1>
              <p className="text-sm sm:text-base text-sbRichBlack/80">{slides[step].subtitle}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center space-x-2">
          {slides.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === step ? "bg-sbPrimaryRed" : "bg-sbRoseQuartz"}`}
            />
          ))}
        </div>

        <div className="w-full space-y-3">
          {step < slides.length - 1 ? (
            <PrimaryButton label="Avanti" onClick={() => setStep((prev) => Math.min(prev + 1, slides.length - 1))} />
          ) : (
            <PrimaryButton label="Inizia" onClick={() => router.push("/home")}
            />
          )}
          {step > 0 && (
            <button className="w-full text-sm text-sbRichBlack/70" onClick={() => setStep((prev) => Math.max(prev - 1, 0))}>
              Torna indietro
            </button>
          )}
        </div>
      </div>
    </LayoutShell>
  );
}
