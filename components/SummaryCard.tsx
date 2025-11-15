"use client";

import { SpeedSession } from "@/lib/types";
import Image from "next/image";

interface Props {
  session: SpeedSession;
}

export function SummaryCard({ session }: Props) {
  const { selectedProducts, totalValue, totalSaved, ticket } = session;
  const thumbs = selectedProducts.slice(0, 4);

  return (
    <div className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 space-y-4">
      <div className="flex -space-x-3">
        {thumbs.map((sp) => (
          <div key={sp.id} className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
            <Image src={sp.product.image} alt={sp.product.name} width={56} height={56} className="object-cover w-full h-full" />
          </div>
        ))}
        {selectedProducts.length > 4 && (
          <div className="w-14 h-14 rounded-full bg-sbSoftGrey flex items-center justify-center text-sm font-semibold text-sbRichBlack/70">
            +{selectedProducts.length - 4}
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-sbRichBlack">La tua SpeedBox</h3>
        <p className="text-sm text-sbRichBlack/70">Ticket: €{ticket.price}</p>
        <p className="text-sm text-sbRichBlack/70">Prodotti scelti: {selectedProducts.length}</p>
        <p className="text-lg font-semibold text-sbRichBlack">Valore stimato: €{totalValue.toFixed(2)}</p>
        <p className="text-sm font-semibold text-sbPrimaryRed">Hai risparmiato: €{totalSaved.toFixed(2)}</p>
      </div>
    </div>
  );
}
