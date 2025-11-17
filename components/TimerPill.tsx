"use client";

import clsx from "clsx";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

import { ANIM } from "@/lib/animationConfig";

interface TimerPillProps {
  remainingSeconds: number;
  totalSeconds: number;
  lastAction?: "add" | "skip" | null;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export function TimerPill({ remainingSeconds, totalSeconds, lastAction = null }: TimerPillProps) {
  const ratio = totalSeconds === 0 ? 0 : remainingSeconds / totalSeconds;
  const baseColor = ratio > 0.6 ? "#34d399" : ratio > ANIM.MID_TIME_RATIO ? "#f59e0b" : "#ff4b6e";
  const controls = useAnimationControls();
  const shouldPulse = remainingSeconds <= ANIM.LOW_TIME_THRESHOLD;

  useEffect(() => {
    controls.start({ backgroundColor: baseColor, x: 0, transition: { duration: 0.3 } });
  }, [baseColor, controls]);

  useEffect(() => {
    if (lastAction === "add") {
      controls
        .start({
          backgroundColor: "#ff4b6e",
          x: [0, -2, 2, -1, 1, 0],
          transition: { duration: ANIM.TIMER_FLASH_DURATION + 0.15 },
        })
        .then(() => controls.start({ backgroundColor: baseColor, x: 0, transition: { duration: 0.3 } }));
    }
  }, [lastAction, controls, baseColor]);

  return (
    <motion.div
      animate={controls}
      className={clsx(
        "inline-flex min-w-[160px] items-center justify-center rounded-full px-6 py-3 text-lg font-semibold text-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]",
        shouldPulse && "ring-4 ring-sbRed/40",
      )}
    >
      <motion.span
        animate={shouldPulse ? { scale: [1, 1.05, 1] } : { scale: 1 }}
        transition={shouldPulse ? { repeat: Infinity, duration: 0.8 } : { duration: 0.2 }}
        className="font-mono"
      >
        {formatTime(remainingSeconds)}
      </motion.span>
    </motion.div>
  );
}
