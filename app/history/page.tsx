"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { SessionCard } from "@/components/SessionCard";
import { useSpeedBoxStore } from "@/lib/store";

export default function HistoryPage() {
  const sessions = useSpeedBoxStore((state) => state.sessionsHistory);
  const sorted = [...sessions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <LayoutShell title="Cronologia" subtitle="Riguarda le tue SpeedBox" eyebrow="History">
      {sorted.length === 0 ? (
        <div className="rounded-3xl bg-white/80 p-5 text-center text-sm text-sbTextDark/60">
          Nessuna sessione ancora. Gioca la tua prima SpeedBox!
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </LayoutShell>
  );
}
