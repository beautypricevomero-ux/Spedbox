"use client";

import clsx from "clsx";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { ANIM } from "@/lib/animationConfig";
import { Product, Ticket } from "@/lib/types";

interface RecentGain {
  id: number;
  amount: number;
}

interface ProductCardProps {
  product: Product | null;
  ticket: Ticket | null;
  totalValue: number;
  selectedCount: number;
  hasBeautyVesEdition: boolean;
  recentGain: RecentGain | null;
  gameOver: boolean;
  lastAction?: "add" | "skip" | null;
}

const formatCategory = (category: Product["category"]) => {
  switch (category) {
    case "makeup":
      return "Makeup";
    case "skincare":
      return "Skincare";
    case "perfume":
      return "Perfume";
    default:
      return "Accessory";
  }
};

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: (action: "add" | "skip" | null) => ({
    x: action === "add" ? 220 : action === "skip" ? -220 : 0,
    rotate: action === "add" ? 8 : action === "skip" ? -8 : 0,
    opacity: 0,
    transition: { duration: ANIM.CARD_OUT_DURATION },
  }),
};

export function ProductCard({
  product,
  ticket,
  totalValue,
  selectedCount,
  hasBeautyVesEdition,
  recentGain,
  gameOver,
  lastAction = null,
}: ProductCardProps) {
  const guaranteeValue = ticket
    ? hasBeautyVesEdition
      ? ticket.valueMinBeautyVesEdition
      : ticket.valueMinBase
    : null;

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="wait" custom={lastAction}>
        {product ? (
          <motion.div
            key={product.id}
            custom={lastAction}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={cardVariants}
            transition={{ duration: ANIM.CARD_IN_DURATION, ease: "easeOut" }}
            className={clsx(
              "relative flex h-full flex-col rounded-[2.5rem] bg-sbCard p-4 shadow-[0_30px_60px_rgba(255,155,184,0.35)]",
              gameOver && "opacity-60",
            )}
          >
            {product.hypeScore >= 90 && (
              <motion.div
                className="pointer-events-none absolute -inset-1 -z-10 rounded-[3rem] bg-gradient-to-br from-sbPink via-white to-sbRed opacity-30"
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: ANIM.HYPE_GLOW_DURATION, repeat: 2, repeatType: "reverse" }}
              />
            )}
            <div className="relative flex-1 overflow-hidden rounded-[2rem]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-col gap-2 text-xs font-semibold text-white">
                <AnimatePresence>
                  {product.isBeautyVes && (
                    <motion.span
                      key="beauty"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="inline-flex items-center rounded-full bg-white/25 px-3 py-1 text-[11px] uppercase tracking-[0.2em]"
                    >
                      BeautyVes
                    </motion.span>
                  )}
                </AnimatePresence>
                <span className="inline-flex items-center rounded-full bg-white/25 px-3 py-1 uppercase tracking-[0.3em]">
                  {product.brand}
                </span>
              </div>
              <AnimatePresence>
                {product.hypeScore >= 90 && (
                  <motion.span
                    key="hot"
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 40, opacity: 0 }}
                    className="absolute right-4 top-4 rounded-full bg-sbRed/80 px-3 py-1 text-xs font-semibold uppercase text-white"
                  >
                    Hot 🔥
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="relative flex h-full flex-col justify-end p-6 text-white">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.4em] text-white/70">{formatCategory(product.category)}</p>
                  <p className="text-4xl font-semibold">+{product.originalPrice.toFixed(2)}€</p>
                  <p className="text-lg text-white/85">{product.name}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-sbTextDark">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">Valore box</p>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-3xl font-semibold">{totalValue.toFixed(2)}€</p>
                  <AnimatePresence>
                    {recentGain && (
                      <motion.span
                        key={recentGain.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-base font-semibold text-sbRed"
                      >
                        +{recentGain.amount.toFixed(0)}€
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-xs text-sbTextDark/60">{selectedCount} prodotti</p>
              </div>
              <div className="rounded-2xl bg-sbPinkLight/80 p-4">
                <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">Garanzia</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hasBeautyVesEdition ? "beauty" : "base"}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-2xl font-semibold"
                  >
                    {guaranteeValue ? `${guaranteeValue}€` : "--"}
                  </motion.p>
                </AnimatePresence>
                <p className="text-xs text-sbTextDark/60">
                  {ticket ? `BeautyVes ${ticket.valueMinBeautyVesEdition}€` : "--"}
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full flex-col items-center justify-center rounded-[2.5rem] border border-dashed border-white/40 bg-white/60 p-10 text-center text-sm text-sbTextDark/60"
          >
            Nessun prodotto disponibile in questo momento.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
