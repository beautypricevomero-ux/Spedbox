"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingActionsProps {
  onAdd: () => void;
  onSkip: () => void;
  disabled?: boolean;
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
  children: ReactNode;
  variant?: "primary" | "ghost" | "accent";
  onClick?: () => void;
  disabled?: boolean;
}

const ActionButton = ({ children, variant = "ghost", onClick, disabled }: ActionButtonProps) => (
  <motion.button
    whileHover={disabled ? undefined : { scale: 1.05 }}
    whileTap={disabled ? undefined : { scale: 0.94 }}
    disabled={disabled}
    onClick={onClick}
    className={clsx(
      "flex h-16 w-16 items-center justify-center rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.15)]",
      variant === "primary" && "bg-sbRed text-white",
      variant === "accent" && "bg-white text-sbPinkDeep",
      variant === "ghost" && "bg-white/80 text-sbTextDark",
      disabled && "opacity-60"
    )}
  >
    {children}
  </motion.button>
);

export function FloatingActions({ onAdd, onSkip, disabled }: FloatingActionsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <ActionButton onClick={onSkip} disabled={disabled}>
        <CloseIcon />
      </ActionButton>
      <ActionButton variant="accent" disabled>
        <StarIcon />
      </ActionButton>
      <ActionButton variant="primary" onClick={onAdd} disabled={disabled}>
        <HeartIcon />
      </ActionButton>
    </div>
  );
}
