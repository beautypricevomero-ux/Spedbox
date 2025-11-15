"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { TicketCard } from "@/components/TicketCard";
import { useSpeedBoxStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const tickets = useSpeedBoxStore((s) => s.tickets);

  return (
    <LayoutShell title="Scegli il tuo ticket" subtitle="Più tempo, più prodotti wow">
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} onSelect={(id) => router.push(`/checkout/${id}`)} />
        ))}
      </div>
    </LayoutShell>
  );
}
