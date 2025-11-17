"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useSpeedBoxStore } from "@/lib/store";

export function NotificationBanner() {
  const banner = useSpeedBoxStore((state) => state.banner);

  return (
    <div className="pointer-events-none">
      <AnimatePresence>
        {banner && (
          <motion.div
            key={banner.id}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="mx-auto w-full max-w-sm rounded-full bg-white/80 px-4 py-2 text-center text-sm font-semibold text-sbTextDark shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
          >
            {banner.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
