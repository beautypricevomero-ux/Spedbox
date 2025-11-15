"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { useSpeedBoxStore } from "@/lib/store";

export default function DashboardPage() {
  const sessions = useSpeedBoxStore((s) => s.sessionsHistory);
  const totalSavings = sessions.reduce((sum, s) => sum + s.totalSaved, 0);

  return (
    <LayoutShell title="Dashboard" subtitle="Storico delle tue SpeedBox">
      <div className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span>Sessioni giocate</span>
          <span className="font-semibold">{sessions.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Risparmio totale</span>
          <span className="font-semibold text-sbPrimaryRed">€{totalSavings.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div key={session.id} className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-5 text-sm space-y-1">
            <div className="flex justify-between"><span>Data</span><span>{new Date(session.createdAt).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Ticket</span><span>€{session.ticket.price}</span></div>
            <div className="flex justify-between"><span>Valore box</span><span>€{session.totalValue.toFixed(2)}</span></div>
            <div className="flex justify-between text-sbPrimaryRed font-semibold"><span>Risparmio</span><span>€{session.totalSaved.toFixed(2)}</span></div>
          </div>
        ))}
        {sessions.length === 0 && (
          <p className="text-center text-sm text-sbRichBlack/70">Gioca una partita per vedere qui i tuoi risultati.</p>
        )}
      </div>
    </LayoutShell>
  );
}
