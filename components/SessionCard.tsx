"use client";

import { Session } from "@/lib/types";
import Link from "next/link";

interface SessionCardProps {
  session: Session;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleString("it-IT", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Link
      href={`/summary/${session.id}`}
      className="block rounded-3xl bg-white/85 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur"
    >
      <div className="flex items-center justify-between text-sm text-sbTextDark/70">
        <p>{formatDate(session.createdAt)}</p>
        {session.hasBeautyVesEdition && (
          <span className="rounded-full bg-sbPink/40 px-3 py-1 text-xs font-semibold text-sbPinkDeep">
            BeautyVes
          </span>
        )}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <div>
          <p className="text-sm uppercase tracking-widest text-sbPinkDeep">{session.ticket.label}</p>
          <p className="text-2xl font-semibold text-sbTextDark">{session.totalValue.toFixed(2)}€</p>
          <p className="text-xs text-sbTextDark/60">{session.selectedProducts.length} prodotti</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-sbTextDark/50">Risparmio</p>
          <p className="text-lg font-semibold text-sbRed">
            +{Math.max(0, session.totalValue - session.ticket.ticketPrice).toFixed(2)}€
          </p>
        </div>
      </div>
    </Link>
  );
}
