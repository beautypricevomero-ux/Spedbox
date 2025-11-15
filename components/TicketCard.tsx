"use client";

import { TicketOption } from "@/lib/types";
import { motion } from "framer-motion";

interface Props {
  ticket: TicketOption;
  onSelect: (id: string) => void;
}

export function TicketCard({ ticket, onSelect }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 cursor-pointer relative overflow-hidden"
      onClick={() => onSelect(ticket.id)}
    >
      {ticket.label && (
        <span className="absolute right-4 top-4 bg-sbPrimaryRed text-white text-xs font-semibold px-3 py-1 rounded-full">
          {ticket.label}
        </span>
      )}
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-sbPrimaryRed">Ticket</p>
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold text-sbRichBlack">€{ticket.price}</h3>
          <p className="text-sm text-sbRichBlack/70">Tempo: {ticket.totalSeconds} sec</p>
        </div>
        <p className="text-sm text-sbRichBlack/80">Valore minimo garantito: €{ticket.minValue}</p>
      </div>
    </motion.div>
  );
}
