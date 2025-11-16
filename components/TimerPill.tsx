"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

interface TimerPillProps {
  remainingSeconds: number;
  totalSeconds: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function TimerPill({ remainingSeconds, totalSeconds }: TimerPillProps) {
  const ratio = totalSeconds === 0 ? 0 : remainingSeconds / totalSeconds;
  const color = ratio > 0.5 ? "bg-emerald-400" : ratio > 0.25 ? "bg-amber-400" : "bg-sbRed";

  return (
    <motion.div
      animate={ratio < 0.25 ? { scale: [1, 1.08, 1] } : undefined}
      transition={{ repeat: Infinity, duration: 1.2 }}
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg",
        color,
      )}
    >
      <span className="h-2 w-2 rounded-full bg-white" />
      <span>{formatTime(remainingSeconds)}</span>
    </motion.div>
  );
}
