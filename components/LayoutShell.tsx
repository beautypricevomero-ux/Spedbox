"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface LayoutShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function LayoutShell({ children, title, subtitle }: LayoutShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sbBackground to-sbSoftPink px-4 sm:px-6 md:px-8 py-6 sm:py-8">
      <div className="max-w-md mx-auto space-y-6">
        {title && (
          <div className="space-y-2 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold text-sbRichBlack"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm sm:text-base text-sbRichBlack/80"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
