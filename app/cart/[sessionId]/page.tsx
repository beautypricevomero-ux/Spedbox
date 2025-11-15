"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useSpeedBoxStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { sessionId } = useParams();
  const router = useRouter();
  const session = useSpeedBoxStore((s) => s.getSessionById(sessionId as string));
  const [completed, setCompleted] = useState(false);

  if (!session) {
    return (
      <LayoutShell title="Sessione non trovata">
        <div className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 text-sm text-sbRichBlack/70">
          Nessun dato per questa sessione.
        </div>
      </LayoutShell>
    );
  }

  return (
    <LayoutShell title="Carrello" subtitle="Controlla la tua SpeedBox prima di completare">
      <div className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 space-y-4">
        <h3 className="text-lg font-semibold">Prodotti selezionati</h3>
        <div className="space-y-3">
          {session.selectedProducts.map((sp) => (
            <div key={sp.id} className="flex items-center justify-between text-sm">
              <p className="text-sbRichBlack">{sp.product.name}</p>
              <p className="font-semibold">+€{sp.valueContribution.toFixed(2)}</p>
            </div>
          ))}
          {session.selectedProducts.length === 0 && (
            <p className="text-sm text-sbRichBlack/70">Nessun prodotto aggiunto.</p>
          )}
        </div>
        <div className="border-t pt-3 space-y-1 text-sm">
          <div className="flex justify-between"><span>Valore box</span><span>€{session.totalValue.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Ticket</span><span>€{session.ticket.price.toFixed(2)}</span></div>
          <div className="flex justify-between font-semibold text-sbPrimaryRed"><span>Risparmio</span><span>€{session.totalSaved.toFixed(2)}</span></div>
        </div>
      </div>
      <PrimaryButton
        label={completed ? "Ordine completato" : "Completa ordine"}
        onClick={() => {
          setCompleted(true);
          setTimeout(() => router.push("/dashboard"), 800);
        }}
      />
    </LayoutShell>
  );
}
