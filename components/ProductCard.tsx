"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Product, Ticket } from "@/lib/types";

interface ProductCardProps {
  product: Product | null;
  ticket: Ticket | null;
  totalValue: number;
  selectedCount: number;
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

export function ProductCard({ product, ticket, totalValue, selectedCount }: ProductCardProps) {
  return (
    <AnimatePresence mode="wait">
      {product ? (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative h-[420px] w-full rounded-[2.5rem] bg-sbCard p-4 shadow-[0_20px_40px_rgba(255,155,184,0.35)]">
            <div className="relative h-full overflow-hidden rounded-[2rem]">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover transition-transform duration-700 will-change-transform"
                style={{ transform: "scale(1.1) rotate(2deg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-6 text-white">
                <div className="space-y-3">
                  <div className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs uppercase tracking-[0.3em]">
                    {product.brand}
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs">
                    <span className="h-2 w-2 rounded-full bg-sbPinkDeep" />
                    {formatCategory(product.category)}
                  </div>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.6em] text-white/60">Valore box</p>
                  <p className="text-4xl font-semibold">+{product.originalPrice.toFixed(2)}€</p>
                  <p className="mt-2 text-lg text-white/80">{product.name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-sbTextDark">
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
              <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">Valore box</p>
              <p className="text-xl font-semibold">{totalValue.toFixed(2)}€</p>
              <p className="text-xs text-sbTextDark/60">{selectedCount} prodotti</p>
            </div>
            <div className="rounded-2xl bg-sbPinkLight/70 p-4">
              <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">Garanzia</p>
              <p className="text-xl font-semibold">
                {ticket ? `${ticket.valueMinBase}€` : "--"}
              </p>
              <p className="text-xs text-sbTextDark/60">BeautyVes {ticket ? `${ticket.valueMinBeautyVesEdition}€` : "--"}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[2.5rem] border border-dashed border-white/40 bg-white/60 p-10 text-center text-sm text-sbTextDark/60"
        >
          Nessun prodotto disponibile in questo momento.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
