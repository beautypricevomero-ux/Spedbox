"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";

interface Props {
  product: Product;
  valueContributionEstimate: number;
  totalBoxValue: number;
}

export function ProductCard({ product, valueContributionEstimate, totalBoxValue }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 space-y-4 ${
        product.isLuxury ? "gradient-border" : ""
      }`}
    >
      <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-sbSoftGrey">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-sbPrimaryRed">{product.category}</p>
        <h3 className="text-xl font-semibold text-sbRichBlack">{product.name}</h3>
        <div className="flex items-center justify-between text-sm text-sbRichBlack/70">
          <span className="line-through">€{product.originalPrice.toFixed(2)}</span>
          <span className="font-semibold text-sbRichBlack">Hype: {product.hypeScore}</span>
        </div>
        <div className="space-y-1 text-sm">
          <p className="font-semibold text-sbRichBlack">Valore per la tua box: +€{valueContributionEstimate.toFixed(2)}</p>
          <p className="text-sbRichBlack/70">Valore box attuale: €{totalBoxValue.toFixed(2)}</p>
          {product.isLuxury && (
            <p className="text-sbPrimaryRed text-xs font-semibold">Luxury pick selezionato</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
