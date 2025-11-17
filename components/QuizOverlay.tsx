"use client";

import { AnimatePresence, motion } from "framer-motion";

import { QuizQuestion } from "@/lib/types";

interface QuizOverlayProps {
  open: boolean;
  question: QuizQuestion | null;
  onAnswer: (index: number) => void;
  onSkip: () => void;
}

export function QuizOverlay({ open, question, onAnswer, onSkip }: QuizOverlayProps) {
  return (
    <AnimatePresence>
      {open && question && (
        <motion.div
          key={question.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 px-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-md rounded-[2rem] bg-white p-6 text-sbTextDark shadow-[0_30px_80px_rgba(0,0,0,0.25)]"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-sbPinkDeep">Mini quiz</p>
            <h3 className="mt-2 text-xl font-semibold">{question.question}</h3>
            <div className="mt-6 space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={option}
                  onClick={() => onAnswer(index)}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-2xl border border-sbPink/40 px-4 py-3 text-left text-sm font-semibold text-sbTextDark shadow-sm"
                >
                  {option}
                </motion.button>
              ))}
            </div>
            <button
              type="button"
              onClick={onSkip}
              className="mt-5 w-full rounded-full bg-sbGrey px-4 py-3 text-sm font-semibold text-sbTextDark"
            >
              Salta e continua
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
