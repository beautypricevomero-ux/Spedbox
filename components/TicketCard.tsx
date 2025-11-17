"use client";

import { motion } from "framer-motion";
import { Ticket } from "@/lib/types";

interface TicketCardProps {
  ticket: Ticket;
  onSelect: (ticketId: string) => void;
}

const formatMinutes = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export function TicketCard({ ticket, onSelect }: TicketCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(ticket.id)}
      className="w-full rounded-3xl bg-white/80 p-5 text-left shadow-[0_20px_40px_rgba(255,75,110,0.15)] backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-sbPinkDeep">SpeedBox</p>
          <p className="text-3xl font-semibold text-sbTextDark">{ticket.label}</p>
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-sbRed shadow-md">
          {ticket.ticketPrice}€
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-sbTextDark/80">
        <div className="rounded-2xl bg-sbGrey px-4 py-3">
          <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">Tempo</p>
          <p className="text-lg font-semibold">{formatMinutes(ticket.totalSeconds)} min</p>
        </div>
        <div className="rounded-2xl bg-sbPink/30 px-4 py-3">
          <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">Value base</p>
          <p className="text-lg font-semibold">{ticket.valueMinBase}€</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 col-span-2">
          <p className="text-[11px] uppercase tracking-widest text-sbPinkDeep">BeautyVes edition</p>
          <p className="text-lg font-semibold text-sbPinkDeep">{ticket.valueMinBeautyVesEdition}€ min</p>
        </div>
      </div>
    </motion.button>
  );
}
