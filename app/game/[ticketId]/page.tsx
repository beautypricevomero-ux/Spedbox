"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { ProductCard } from "@/components/ProductCard";
import { FloatingActions } from "@/components/FloatingActions";
import { TimerCircle } from "@/components/TimerCircle";
import { useSpeedBoxStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.ticketId as string;

  const {
    currentTicket,
    currentProduct,
    productSequence,
    currentProductIndex,
    remainingSeconds,
    selectedProducts,
    isRunning,
    currentSession,
    handleAdd,
    handleSkip,
    tick,
    startSession,
  } = useSpeedBoxStore((s) => ({
    currentTicket: s.currentTicket,
    currentProduct: s.currentProduct,
    productSequence: s.productSequence,
    remainingSeconds: s.remainingSeconds,
    selectedProducts: s.selectedProducts,
    isRunning: s.isRunning,
    currentSession: s.currentSession,
    handleAdd: s.handleAdd,
    handleSkip: s.handleSkip,
    tick: s.tick,
    startSession: s.startSession,
    currentProductIndex: s.currentProductIndex,
  }));

  useEffect(() => {
    if (!currentTicket || currentTicket.id !== ticketId) {
      startSession(ticketId);
    }
  }, [currentTicket, ticketId, startSession]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  useEffect(() => {
    if (currentSession) {
      router.push(`/summary/${currentSession.id}`);
    }
  }, [currentSession, router]);

  const totalValue = selectedProducts.reduce((sum, sp) => sum + sp.valueContribution, 0);
  const valueEstimate = currentTicket && currentProduct
    ? Math.min(currentProduct.originalPrice, currentTicket.price * 1.4)
    : 0;
  const remainingProducts = Math.max(productSequence.length - (currentProductIndex + 1), 0);

  return (
    <LayoutShell title="SpeedBox" subtitle="Aggiungi solo i prodotti migliori">
      {currentTicket && (
        <div className="flex justify-center mb-4">
          <TimerCircle remainingSeconds={remainingSeconds} totalSeconds={currentTicket.totalSeconds} />
        </div>
      )}

      {currentProduct ? (
        <ProductCard product={currentProduct} valueContributionEstimate={valueEstimate} totalBoxValue={totalValue} />
      ) : (
        <div className="bg-sbCard rounded-3xl shadow-[0_8px_18px_rgba(0,0,0,0.08)] p-6 text-center text-sm text-sbRichBlack/70">
          Nessun prodotto disponibile
        </div>
      )}

      <div className="flex justify-center pt-4">
        <FloatingActions onAdd={handleAdd} onSkip={handleSkip} />
      </div>

      <div className="text-center text-xs text-sbRichBlack/60">
        Prodotti rimanenti: {remainingProducts}
      </div>
    </LayoutShell>
  );
}
