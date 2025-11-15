"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useSpeedBoxStore } from "@/lib/store";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.ticketId as string;
  const tickets = useSpeedBoxStore((s) => s.tickets);
  const startSession = useSpeedBoxStore((s) => s.startSession);
  const ticket = tickets.find((t) => t.id === ticketId);

  useEffect(() => {
    if (!ticket) router.replace("/home");
  }, [ticket, router]);

  if (!ticket) return null;

  return (
    <LayoutShell title="Checkout" subtitle="Nessun abbonamento. Paghi solo questa sessione.">
      <div className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-sbPrimaryRed">Ticket</p>
            <h3 className="text-2xl font-bold">€{ticket.price}</h3>
          </div>
          {ticket.label && <span className="px-3 py-1 bg-sbPrimaryRed text-white text-xs rounded-full">{ticket.label}</span>}
        </div>
        <p className="text-sm text-sbRichBlack/70">Tempo: {ticket.totalSeconds} secondi</p>
        <p className="text-sm text-sbRichBlack/70">Valore minimo garantito: €{ticket.minValue}</p>
      </div>
      <PrimaryButton
        label="Paga e inizia"
        onClick={() => {
          startSession(ticket.id);
          router.push(`/game/${ticket.id}`);
        }}
      />
    </LayoutShell>
  );
}
