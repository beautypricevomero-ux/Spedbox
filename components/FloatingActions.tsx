"use client";

import { motion } from "framer-motion";

interface Props {
  onAdd: () => void;
  onSkip: () => void;
}

export function FloatingActions({ onAdd, onSkip }: Props) {
  return (
    <div className="flex items-center justify-center space-x-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={onSkip}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-sbRichBlack shadow-[0_4px_10px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition"
        aria-label="Salta"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 0 1 1.415 1.414L13.414 10.586l4.362 4.362a1 1 0 0 1-1.415 1.414L12 12l-4.361 4.362a1 1 0 0 1-1.414-1.414L10.586 10.586 6.225 6.225a1 1 0 0 1 0-1.414Z" />
        </svg>
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.08 }}
        onClick={onAdd}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-sbPrimaryRed text-white shadow-[0_4px_10px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition"
        aria-label="Aggiungi"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21s-6.4-4.35-9.33-9.3C.59 9.43 1.18 5.86 3.76 3.95 6.05 2.26 8.9 3.03 12 6.2c3.1-3.17 5.95-3.94 8.24-2.25 2.58 1.9 3.17 5.48 1.09 7.75C18.4 16.65 12 21 12 21Z" />
        </svg>
      </motion.button>
    </div>
  );
}
