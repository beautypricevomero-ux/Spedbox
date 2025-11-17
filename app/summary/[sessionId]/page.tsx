"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { useSpeedBoxStore } from "@/lib/store";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SummaryPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const getSessionById = useSpeedBoxStore((state) => state.getSessionById);
  const session = getSessionById(sessionId);

  if (!session) {
    return (
      <LayoutShell title="Sessione non trovata" subtitle="Gioca una nuova SpeedBox" eyebrow="Summary">
        <Link href="/home" className="rounded-full bg-sbRed px-6 py-3 text-center font-semibold text-white">
          Torna ai ticket
        </Link>
      </LayoutShell>
    );
  }

  const minValue = session.hasBeautyVesEdition
    ? session.ticket.valueMinBeautyVesEdition
    : session.ticket.valueMinBase;
  const savings = Math.max(0, session.totalValue - session.ticket.ticketPrice);

  return (
    <LayoutShell title="La tua SpeedBox" subtitle="Riepilogo della sessione" eyebrow="Summary">
      <div className="rounded-[2.5rem] bg-white/80 p-6 shadow-[0_25px_50px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-sbPinkDeep">{session.ticket.label}</p>
            <p className="text-3xl font-semibold text-sbTextDark">{session.totalValue.toFixed(2)}€</p>
            <p className="text-sm text-sbTextDark/60">{session.selectedProducts.length} prodotti</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-sbTextDark/50">Risparmio</p>
            <p className="text-2xl font-semibold text-sbRed">+{savings.toFixed(2)}€</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-sbPinkLight/60 p-4 text-sm">
          <p className="font-semibold text-sbPinkDeep">Valore minimo garantito</p>
          <p className="text-lg">{minValue}€</p>
          {session.hasBeautyVesEdition && (
            <span className="mt-2 inline-block rounded-full bg-sbPink/40 px-3 py-1 text-xs font-semibold text-sbPinkDeep">
              BeautyVes Edition
            </span>
          )}
        </div>
      </div>
      <div className="space-y-3 rounded-3xl bg-white/70 p-5 text-sm text-sbTextDark/80">
        {session.selectedProducts.length === 0 ? (
          <p>Nessun prodotto selezionato durante questa sessione.</p>
        ) : (
          session.selectedProducts.map((item, index) => (
            <div key={`${item.product.id}-${index}`} className="flex items-center justify-between border-b border-white/40 pb-2 last:border-0 last:pb-0">
              <div>
                <p className="font-semibold text-sbTextDark">{item.product.name}</p>
                <p className="text-xs uppercase tracking-widest text-sbPinkDeep">{item.product.brand}</p>
              </div>
              <p className="text-sm font-semibold">+{item.product.originalPrice.toFixed(2)}€</p>
            </div>
          ))
        )}
      </div>
      <div className="space-y-3">
        <Link
          href="/home"
          className="block rounded-full bg-sbRed py-4 text-center font-semibold text-white shadow-[0_20px_40px_rgba(255,75,110,0.35)]"
        >
          Gioca di nuovo
        </Link>
        <Link href="/history" className="block rounded-full bg-white/80 py-4 text-center font-semibold text-sbPinkDeep">
          Vedi cronologia
        </Link>
      </div>
    </LayoutShell>
  );
}
