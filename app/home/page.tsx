"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { TicketCard } from "@/components/TicketCard";
import { useSpeedBoxStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const tickets = useSpeedBoxStore((s) => s.tickets);
  const startSession = useSpeedBoxStore((s) => s.startSession);

  const handleSelect = (ticketId: string) => {
    startSession(ticketId);
    router.push(`/game/${ticketId}`);
  };

  return (
    <LayoutShell title="Scegli il ticket" subtitle="Più budget = più tempo per trovare il match perfetto" eyebrow="SpeedBox">
      <div className="space-y-5">
        {tickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} onSelect={handleSelect} />
        ))}
      </div>
    </LayoutShell>
  );
}
