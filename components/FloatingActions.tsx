"use client";

import clsx from "clsx";
import { motion, useAnimationControls } from "framer-motion";
import type { AnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { ANIM } from "@/lib/animationConfig";

interface FloatingActionsProps {
  onAdd: () => void;
  onSkip: () => void;
  disabled?: boolean;
  wiggleKey?: string | null;
  lastAction?: "add" | "skip" | null;
}

const HeartIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 9.5 6 4.33 4.33 0 0 1 12 7.1 4.33 4.33 0 0 1 14.5 6 4.5 4.5 0 0 1 19 10.5C19 15.65 12 20 12 20z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" fill="none">
    <path d="M6 6l12 12M18 6l-12 12" strokeLinecap="round" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" stroke="currentColor" strokeWidth="1.8" fill="none">
    <path d="M12 4l2.1 4.7 5.2.7-3.8 3.6.9 5.3L12 16.8 7.6 18.3l.9-5.3-3.8-3.6 5.2-.7z" strokeLinejoin="round" />
  </svg>
);

interface ActionButtonProps {
  variant?: "primary" | "ghost" | "accent";
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  controls?: AnimationControls;
  ariaLabel: string;
}

const ActionButton = ({ variant = "ghost", onClick, disabled, children, controls, ariaLabel }: ActionButtonProps) => (
  <motion.button
    whileHover={disabled ? undefined : { scale: 1.05 }}
    whileTap={disabled ? undefined : { scale: 0.94 }}
    onClick={disabled ? undefined : onClick}
    animate={controls}
    aria-label={ariaLabel}
    disabled={disabled}
    className={clsx(
      "flex h-16 w-16 items-center justify-center rounded-full shadow-[0_14px_28px_rgba(0,0,0,0.15)] transition-all",
      variant === "primary" && "bg-sbRed text-white",
      variant === "accent" && "bg-white text-sbPinkDeep",
      variant === "ghost" && "bg-white/80 text-sbTextDark",
      disabled && "opacity-60",
    )}
  >
    {children}
  </motion.button>
);

export function FloatingActions({ onAdd, onSkip, disabled, wiggleKey, lastAction }: FloatingActionsProps) {
  const addControls = useAnimationControls();
  const previousWiggleKey = useRef<string | null>(null);

  useEffect(() => {
    if (lastAction === "add") {
      addControls.start({ scale: [1, 1.08, 1], transition: { duration: ANIM.ADD_POP_DURATION } });
    }
  }, [lastAction, addControls]);

  useEffect(() => {
    if (!wiggleKey || previousWiggleKey.current === wiggleKey) return;
    previousWiggleKey.current = wiggleKey;
    addControls.start({ x: [0, -3, 3, -2, 2, 0], transition: { duration: 0.4 } });
  }, [wiggleKey, addControls]);

  return (
    <div className="flex items-center justify-center gap-4">
      <ActionButton ariaLabel="Salta prodotto" onClick={onSkip} disabled={disabled}>
        <CloseIcon />
      </ActionButton>
      <ActionButton ariaLabel="Preferito" variant="accent" disabled>
        <StarIcon />
      </ActionButton>
      <ActionButton ariaLabel="Aggiungi alla box" variant="primary" onClick={onAdd} disabled={disabled} controls={addControls}>
        <HeartIcon />
      </ActionButton>
    </div>
  );
}
