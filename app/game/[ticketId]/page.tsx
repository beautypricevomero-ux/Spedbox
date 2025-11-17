"use client";

import { BottomNav } from "@/components/BottomNav";
import { FloatingActions } from "@/components/FloatingActions";
import { NotificationBanner } from "@/components/NotificationBanner";
import { ProductCard } from "@/components/ProductCard";
import { QuizOverlay } from "@/components/QuizOverlay";
import { TimerPill } from "@/components/TimerPill";
import { useSpeedBoxStore } from "@/lib/store";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface RecentGain {
  id: number;
  amount: number;
}

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.ticketId as string;
  const [recentGain, setRecentGain] = useState<RecentGain | null>(null);

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
    quizActive,
    quizQuestion,
    answerQuiz,
    skipQuiz,
    hasBeautyVesEdition,
    gameOver,
    lastAction,
    totalValue,
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
    quizActive: state.quizActive,
    quizQuestion: state.quizQuestion,
    answerQuiz: state.answerQuiz,
    skipQuiz: state.skipQuiz,
    hasBeautyVesEdition: state.hasBeautyVesEdition,
    gameOver: state.gameOver,
    lastAction: state.lastAction,
    totalValue: state.totalValue,
  }));

  useEffect(() => {
    if (currentSessionId && gameOver) return;
    if (!currentTicket || currentTicket.id !== ticketId) {
      startSession(ticketId);
    }
  }, [ticketId, currentTicket, startSession, currentSessionId, gameOver]);

  useEffect(() => {
    if (!currentTicket || !currentProduct || gameOver || quizActive) return;
    const interval = setInterval(() => tick(), 1000);
    return () => clearInterval(interval);
  }, [currentTicket, currentProduct, tick, quizActive, gameOver]);

  useEffect(() => {
    if (gameOver && currentSessionId) {
      const timeout = setTimeout(() => router.push(`/summary/${currentSessionId}`), 200);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [currentSessionId, router, gameOver]);

  const totalSelected = selectedProducts.length;
  const disableActions = !currentProduct || quizActive || gameOver;
  const wiggleKey = currentProduct && currentProduct.hypeScore >= 90 ? currentProduct.id : null;

  const handleAddClick = () => {
    if (!currentProduct || disableActions) return;
    setRecentGain({ id: Date.now(), amount: currentProduct.originalPrice });
    handleAdd();
    setTimeout(() => setRecentGain(null), 700);
  };

  const handleSkipClick = () => {
    if (disableActions || !currentProduct) return;
    handleSkip();
  };

  const totalValueDisplay = useMemo(() => totalValue, [totalValue]);

  const statusLabel = remainingSeconds <= 0 ? "Tempo scaduto" : "Box completata";

  return (
    <div className="relative">
      <div className="relative z-10 flex h-screen flex-col overflow-hidden px-5 pb-28 pt-8">
        <header className="text-center text-sbTextDark">
          <p className="text-[11px] uppercase tracking-[0.4em] text-sbPinkDeep">SpeedBox</p>
          <h1 className="mt-1 text-2xl font-semibold">{currentTicket ? currentTicket.label : ""}</h1>
          <div className="mt-4 flex justify-center">
            <TimerPill
              remainingSeconds={remainingSeconds}
              totalSeconds={currentTicket?.totalSeconds ?? 0}
              lastAction={lastAction}
            />
          </div>
        </header>
        <div className="mt-4 min-h-[32px]">
          <NotificationBanner />
        </div>
        <div className="relative mt-4 flex flex-1 flex-col justify-center">
          <ProductCard
            product={currentProduct}
            ticket={currentTicket}
            totalValue={totalValueDisplay}
            selectedCount={totalSelected}
            hasBeautyVesEdition={hasBeautyVesEdition}
            recentGain={recentGain}
            gameOver={gameOver}
            lastAction={lastAction ?? null}
          />
          {gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[2.5rem] bg-sbTextDark text-white"
            >
              <p className="text-lg font-semibold">{statusLabel}</p>
            </motion.div>
          )}
        </div>
        <div className="mt-6 flex items-center justify-center">
          <FloatingActions
            onAdd={handleAddClick}
            onSkip={handleSkipClick}
            disabled={disableActions}
            wiggleKey={wiggleKey}
            lastAction={lastAction ?? null}
          />
        </div>
      </div>
      <BottomNav active="game" gameHref={`/game/${ticketId}`} />
      <QuizOverlay open={quizActive} question={quizQuestion} onAnswer={answerQuiz} onSkip={skipQuiz} />
    </div>
  );
}
