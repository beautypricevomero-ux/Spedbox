"use client";

import { ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

export function PrimaryButton({ label, className, ...rest }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      className={clsx(
        "w-full rounded-2xl bg-sbPrimaryRed text-white font-semibold py-3 shadow-[0_8px_14px_rgba(230,57,70,0.35)] hover:brightness-110 transition",
        className
      )}
      {...rest}
    >
      {label}
    </motion.button>
  );
}
