"use client";

import { motion } from "framer-motion";

interface Props {
  remainingSeconds: number;
  totalSeconds: number;
}

export function TimerCircle({ remainingSeconds, totalSeconds }: Props) {
  const percentage = Math.max(0, Math.min(remainingSeconds / totalSeconds, 1));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - percentage);

  let color = "stroke-sbPrimaryRed";
  const percentageValue = percentage * 100;
  if (percentageValue < 30) color = "stroke-red-500";
  else if (percentageValue < 60) color = "stroke-orange-400";

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" className="stroke-sbSoftGrey" strokeWidth="8" fill="none" />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="8"
            fill="none"
            className={`${color} ${percentageValue < 30 ? "animate-pulse" : ""}`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs text-sbRichBlack/70">tempo</p>
            <p className="text-2xl font-semibold">{remainingSeconds}s</p>
          </div>
        </div>
      </div>
      <p className="text-sm text-sbRichBlack/70">Totale: {totalSeconds}s</p>
    </div>
  );
}
