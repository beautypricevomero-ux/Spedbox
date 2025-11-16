"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { ProductCard } from "@/components/ProductCard";
import { FloatingActions } from "@/components/FloatingActions";
import { TimerPill } from "@/components/TimerPill";
import { BottomNav } from "@/components/BottomNav";
import { useSpeedBoxStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.ticketId as string;

  const {
    currentTicket,
    currentProduct,
    selectedProducts,
    remainingSeconds,
    startSession,
    handleAdd,
    handleSkip,
    tick,
    currentSessionId,
  } = useSpeedBoxStore((state) => ({
    currentTicket: state.currentTicket,
    currentProduct: state.currentProduct,
    selectedProducts: state.selectedProducts,
    remainingSeconds: state.remainingSeconds,
    startSession: state.startSession,
    handleAdd: state.handleAdd,
    handleSkip: state.handleSkip,
    tick: state.tick,
    currentSessionId: state.currentSessionId,
  }));

  useEffect(() => {
    if (currentSessionId) return;
    if (!currentTicket || currentTicket.id !== ticketId) {
      startSession(ticketId);
    }
  }, [ticketId, currentTicket, startSession, currentSessionId]);

  useEffect(() => {
    if (!currentTicket || !currentProduct) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [currentTicket, currentProduct, tick]);

  useEffect(() => {
    if (currentSessionId && !currentProduct) {
      router.push(`/summary/${currentSessionId}`);
    }
  }, [currentSessionId, currentProduct, router]);

  const totalValue = useMemo(
    () => selectedProducts.reduce((sum, entry) => sum + entry.product.originalPrice, 0),
    [selectedProducts],
  );

  return (
    <div className="relative">
      <LayoutShell
        title={currentTicket ? currentTicket.label : "SpeedBox"}
        subtitle="Swipe. Seleziona. Ama la tua box."
        eyebrow="Discover"
        className="pb-40"
      >
        <div className="relative">
          <ProductCard
            product={currentProduct}
            ticket={currentTicket}
            totalValue={totalValue}
            selectedCount={selectedProducts.length}
          />
          <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 sm:block">
            <FloatingActions onAdd={handleAdd} onSkip={handleSkip} disabled={!currentProduct} />
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-3xl bg-white/70 p-4 text-sm text-sbTextDark shadow-[0_15px_30px_rgba(0,0,0,0.08)] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-sbPinkDeep">Tempo rimasto</p>
            <TimerPill remainingSeconds={remainingSeconds} totalSeconds={currentTicket?.totalSeconds ?? 0} />
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-sbPinkDeep">Risparmio potenziale</p>
            <p className="text-lg font-semibold text-sbRed">
              +{Math.max(0, totalValue - (currentTicket?.ticketPrice ?? 0)).toFixed(2)}€
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white/50 p-4 text-xs text-sbTextDark/70">
          Ogni ADD consuma 30 secondi, ogni SKIP ne consuma 10. L'algoritmo SpeedBox filtra automaticamente i prodotti che
          potrebbero far sforare il budget interno o l'hype medio, così ogni carta che vedi è sempre sicura da aggiungere.
        </div>
        <div className="sm:hidden">
          <FloatingActions onAdd={handleAdd} onSkip={handleSkip} disabled={!currentProduct} />
        </div>
      </LayoutShell>
      <BottomNav active="game" gameHref={`/game/${ticketId}`} />
    </div>
  );
}
