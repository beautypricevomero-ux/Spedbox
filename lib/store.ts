"use client";

import { create } from "zustand";

import { ANIM } from "./animationConfig";
import { products as mockProducts, quizQuestions, tickets as ticketOptions } from "./mockData";
import { Product, QuizQuestion, SelectedProduct, Session, Ticket } from "./types";

const H_MIN = 40;
const H_MAX = 80;

const getCostTargets = (ticket: Ticket) => {
  const targetCost = ticket.ticketPrice * 0.5;
  return {
    targetCost,
    minCost: targetCost * 0.9,
    maxCost: targetCost * 1.1,
  };
};

const shuffle = <T,>(list: T[]): T[] => {
  const array = [...list];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const buildProductPool = (allProducts: Product[]) => {
  const heroes = shuffle(allProducts.filter((p) => p.tier === "hero"));
  const premium = shuffle(allProducts.filter((p) => p.tier === "premium"));
  const fillers = shuffle(allProducts.filter((p) => p.tier === "filler"));
  return [...heroes, ...premium, ...fillers];
};

interface NextProductPayload {
  currentTicket: Ticket;
  notYetShownProducts: Product[];
  currentCost: number;
  currentHypeSum: number;
  selectedCount: number;
  remainingSeconds: number;
}

interface NextProductResult {
  product: Product | null;
  remainingPool: Product[];
  costSafeCount: number;
}

const chooseNextProduct = (payload: NextProductPayload): NextProductResult => {
  const { currentTicket, notYetShownProducts, currentCost, currentHypeSum, selectedCount, remainingSeconds } = payload;
  if (!currentTicket || notYetShownProducts.length === 0) {
    return { product: null, remainingPool: [], costSafeCount: 0 };
  }

  const { maxCost } = getCostTargets(currentTicket);
  const remainingBudget = maxCost - currentCost;
  const costSafeProducts = notYetShownProducts.filter((p) => p.purchaseCost <= remainingBudget);
  const costSafeCount = costSafeProducts.length;

  if (costSafeCount === 0) {
    return { product: null, remainingPool: [], costSafeCount: 0 };
  }

  const currentAvgHype = selectedCount === 0 ? null : currentHypeSum / selectedCount;

  const hypeSafeProducts = costSafeProducts.filter((p) => {
    const hypoAvg = selectedCount === 0 ? p.hypeScore : (currentHypeSum + p.hypeScore) / (selectedCount + 1);
    return hypoAvg >= H_MIN && hypoAvg <= H_MAX;
  });

  const candidates = hypeSafeProducts.length > 0 ? hypeSafeProducts : costSafeProducts;

  const getTierWeight = (product: Product) => {
    if (product.tier === "hero") return 0;
    if (product.tier === "premium") return 1;
    return 2;
  };

  const secondsRatio = currentTicket.totalSeconds === 0 ? 0 : remainingSeconds / currentTicket.totalSeconds;

  const sorted = [...candidates].sort((a, b) => {
    const tierDiff = getTierWeight(a) - getTierWeight(b);
    if (tierDiff !== 0) return tierDiff;

    if (secondsRatio > 0.6) {
      const hypeDiff = b.hypeScore - a.hypeScore;
      if (hypeDiff !== 0) return hypeDiff;
    }

    if (secondsRatio < 0.3) {
      const costDiff = a.purchaseCost - b.purchaseCost;
      if (costDiff !== 0) return costDiff;
    }

    if (currentAvgHype && currentAvgHype > 70) {
      const balanceDiff = a.hypeScore - b.hypeScore;
      if (balanceDiff !== 0) return balanceDiff;
    }

    if (currentAvgHype && currentAvgHype < 50) {
      const liftDiff = b.hypeScore - a.hypeScore;
      if (liftDiff !== 0) return liftDiff;
    }

    const purchaseDiff = a.purchaseCost - b.purchaseCost;
    if (purchaseDiff !== 0) return purchaseDiff;

    return a.id.localeCompare(b.id);
  });

  const nextProduct = sorted[0] ?? null;
  const remainingPool = nextProduct
    ? notYetShownProducts.filter((p) => p.id !== nextProduct.id)
    : notYetShownProducts;

  return { product: nextProduct, remainingPool, costSafeCount };
};

interface BannerMessage {
  id: string;
  message: string;
}

interface GameState {
  tickets: Ticket[];
  products: Product[];
  currentTicket: Ticket | null;
  currentSessionId: string | null;
  currentProduct: Product | null;
  notYetShownProducts: Product[];
  selectedProducts: SelectedProduct[];
  remainingSeconds: number;
  currentCost: number;
  currentHypeSum: number;
  selectedCount: number;
  sessionsHistory: Session[];
  hasBeautyVesEdition: boolean;
  totalValue: number;
  gameOver: boolean;
  lastAction: "add" | "skip" | null;
  banner: BannerMessage | null;
  quizShown: boolean;
  quizActive: boolean;
  quizQuestion: QuizQuestion | null;
  hasShownTripleValueBanner: boolean;
  hasShownCostSafeWarning: boolean;
  hasShownUltraHypeBanner: boolean;
  hasShownBeautyVesBanner: boolean;

  startSession: (ticketId: string) => void;
  handleAdd: () => void;
  handleSkip: () => void;
  tick: () => void;
  endSession: () => void;
  getSessionById: (id: string) => Session | undefined;
  showBanner: (message: string) => void;
  clearBanner: () => void;
  answerQuiz: (optionIndex: number) => void;
  skipQuiz: () => void;
  markSessionComplete: () => void;
}

const pickQuizQuestion = (): QuizQuestion | null => {
  if (quizQuestions.length === 0) return null;
  const index = Math.floor(Math.random() * quizQuestions.length);
  return quizQuestions[index] ?? null;
};

let bannerTimeout: NodeJS.Timeout | null = null;

export const useSpeedBoxStore = create<GameState>((set, get) => {
  const triggerArrivalEffects = (product: Product | null, costSafeCount: number) => {
    if (!product) return;
    const state = get();
    if (product.hypeScore >= 95 && !state.hasShownUltraHypeBanner) {
      set({ hasShownUltraHypeBanner: true });
      get().showBanner("Prodotto super richiesto! Lo lasci andare? 🔥");
    }
    if (costSafeCount === 1 && !state.hasShownCostSafeWarning) {
      set({ hasShownCostSafeWarning: true });
      get().showBanner("Attenzione: ultimi prodotti disponibili per questa box 👀");
    }
  };

  const maybeTriggerQuiz = (seconds: number) => {
    const state = get();
    if (!state.currentTicket || state.quizShown || state.quizActive || state.gameOver) return;
    if (seconds <= 0) return;
    if (seconds <= state.currentTicket.totalSeconds / 2) {
      const question = pickQuizQuestion();
      if (!question) return;
      set({ quizShown: true, quizActive: true, quizQuestion: question });
    }
  };

  return {
    tickets: ticketOptions,
    products: mockProducts,
    currentTicket: null,
    currentSessionId: null,
    currentProduct: null,
    notYetShownProducts: [],
    selectedProducts: [],
    remainingSeconds: 0,
    currentCost: 0,
    currentHypeSum: 0,
    selectedCount: 0,
    sessionsHistory: [],
    hasBeautyVesEdition: false,
    totalValue: 0,
    gameOver: false,
    lastAction: null,
    banner: null,
    quizShown: false,
    quizActive: false,
    quizQuestion: null,
    hasShownTripleValueBanner: false,
    hasShownCostSafeWarning: false,
    hasShownUltraHypeBanner: false,
    hasShownBeautyVesBanner: false,

    startSession: (ticketId) => {
      const ticket = get().tickets.find((t) => t.id === ticketId);
      if (!ticket) return;

      const productPool = buildProductPool(get().products);
      const selection = chooseNextProduct({
        currentTicket: ticket,
        notYetShownProducts: productPool,
        currentCost: 0,
        currentHypeSum: 0,
        selectedCount: 0,
        remainingSeconds: ticket.totalSeconds,
      });

      set({
        currentTicket: ticket,
        currentSessionId: null,
        currentProduct: selection.product,
        notYetShownProducts: selection.remainingPool,
        selectedProducts: [],
        remainingSeconds: ticket.totalSeconds,
        currentCost: 0,
        currentHypeSum: 0,
        selectedCount: 0,
        hasBeautyVesEdition: false,
        totalValue: 0,
        gameOver: false,
        lastAction: null,
        banner: null,
        quizShown: false,
        quizActive: false,
        quizQuestion: null,
        hasShownTripleValueBanner: false,
        hasShownCostSafeWarning: false,
        hasShownUltraHypeBanner: false,
        hasShownBeautyVesBanner: false,
      });

      triggerArrivalEffects(selection.product, selection.costSafeCount);

      if (!selection.product) {
        get().markSessionComplete();
      }
    },

    handleAdd: () => {
      const state = get();
      if (!state.currentProduct || !state.currentTicket) return;
      if (state.quizActive || state.gameOver) return;

      const addedProduct = state.currentProduct;
      const newSelectedProducts: SelectedProduct[] = [...state.selectedProducts, { product: addedProduct }];
      const updatedCost = state.currentCost + addedProduct.purchaseCost;
      const updatedHype = state.currentHypeSum + addedProduct.hypeScore;
      const updatedCount = state.selectedCount + 1;
      const updatedSeconds = Math.max(0, state.remainingSeconds - 30);
      const newTotalValue = state.totalValue + addedProduct.originalPrice;
      const unlockedBeauty = addedProduct.isBeautyVes && !state.hasBeautyVesEdition;
      const shouldShowBeautyBanner = unlockedBeauty && !state.hasShownBeautyVesBanner;
      const shouldShowTripleValueBanner =
        !state.hasShownTripleValueBanner && newTotalValue >= state.currentTicket.ticketPrice * 3;

      const selection = chooseNextProduct({
        currentTicket: state.currentTicket,
        notYetShownProducts: state.notYetShownProducts,
        currentCost: updatedCost,
        currentHypeSum: updatedHype,
        selectedCount: updatedCount,
        remainingSeconds: updatedSeconds,
      });

      set({
        selectedProducts: newSelectedProducts,
        currentCost: updatedCost,
        currentHypeSum: updatedHype,
        selectedCount: updatedCount,
        remainingSeconds: updatedSeconds,
        currentProduct: selection.product,
        notYetShownProducts: selection.remainingPool,
        totalValue: newTotalValue,
        hasBeautyVesEdition: state.hasBeautyVesEdition || addedProduct.isBeautyVes,
        lastAction: "add",
      });

      if (shouldShowBeautyBanner) {
        set({ hasShownBeautyVesBanner: true });
        get().showBanner("Hai sbloccato la BeautyVes Edition: valore minimo potenziato 🎁");
      }

      if (shouldShowTripleValueBanner) {
        set({ hasShownTripleValueBanner: true });
        get().showBanner("La tua SpeedBox vale già oltre 3× il ticket 🤯");
      }

      triggerArrivalEffects(selection.product, selection.costSafeCount);
      maybeTriggerQuiz(updatedSeconds);

      if (!selection.product || updatedSeconds <= 0) {
        if (updatedSeconds <= 0) {
          set({ remainingSeconds: 0 });
        }
        get().markSessionComplete();
      }
    },

    handleSkip: () => {
      const state = get();
      if (!state.currentTicket || !state.currentProduct) return;
      if (state.quizActive || state.gameOver) return;

      const updatedSeconds = Math.max(0, state.remainingSeconds - 10);

      const selection = chooseNextProduct({
        currentTicket: state.currentTicket,
        notYetShownProducts: state.notYetShownProducts,
        currentCost: state.currentCost,
        currentHypeSum: state.currentHypeSum,
        selectedCount: state.selectedCount,
        remainingSeconds: updatedSeconds,
      });

      set({
        remainingSeconds: updatedSeconds,
        currentProduct: selection.product,
        notYetShownProducts: selection.remainingPool,
        lastAction: "skip",
      });

      triggerArrivalEffects(selection.product, selection.costSafeCount);
      maybeTriggerQuiz(updatedSeconds);

      if (!selection.product || updatedSeconds <= 0) {
        if (updatedSeconds <= 0) {
          set({ remainingSeconds: 0 });
        }
        get().markSessionComplete();
      }
    },

    tick: () => {
      const state = get();
      if (!state.currentTicket || !state.currentProduct) return;
      if (state.quizActive || state.gameOver) return;

      if (state.remainingSeconds <= 1) {
        set({ remainingSeconds: 0 });
        get().markSessionComplete();
        return;
      }

      const updatedSeconds = state.remainingSeconds - 1;
      set({ remainingSeconds: updatedSeconds });
      maybeTriggerQuiz(updatedSeconds);
    },

    markSessionComplete: () => {
      const state = get();
      if (state.gameOver) return;
      set({ gameOver: true });
      setTimeout(() => {
        get().endSession();
      }, ANIM.GAME_OVER_DELAY * 1000);
    },

    endSession: () => {
      const state = get();
      if (!state.currentTicket) return;

      const sessionId = crypto.randomUUID();
      const snapshot: SelectedProduct[] = state.selectedProducts.map((item) => ({
        product: item.product,
      }));

      const totalValue = snapshot.reduce((sum, entry) => sum + entry.product.originalPrice, 0);
      const totalPurchaseCost = state.currentCost;
      const avgHype = state.selectedCount === 0 ? null : state.currentHypeSum / state.selectedCount;
      const hasBeautyVesEdition = snapshot.some((entry) => entry.product.isBeautyVes);

      const session: Session = {
        id: sessionId,
        ticket: state.currentTicket,
        selectedProducts: snapshot,
        totalValue,
        totalPurchaseCost,
        avgHype,
        createdAt: new Date().toISOString(),
        hasBeautyVesEdition,
      };

      set((prev) => ({
        ...prev,
        sessionsHistory: [...prev.sessionsHistory, session],
        currentSessionId: sessionId,
        currentTicket: null,
        currentProduct: null,
        notYetShownProducts: [],
        selectedProducts: [],
        remainingSeconds: 0,
        currentCost: 0,
        currentHypeSum: 0,
        selectedCount: 0,
        totalValue: 0,
        quizActive: false,
        quizQuestion: null,
        quizShown: false,
      }));
    },

    answerQuiz: (optionIndex) => {
      const state = get();
      if (!state.quizActive || !state.quizQuestion) return;
      const isCorrect = optionIndex === state.quizQuestion.correctIndex;
      const updatedSeconds = isCorrect ? state.remainingSeconds + 30 : state.remainingSeconds;

      set({
        quizActive: false,
        quizQuestion: null,
        remainingSeconds: updatedSeconds,
      });

      if (isCorrect) {
        get().showBanner("Risposta corretta! +30 secondi ⏱");
      } else {
        get().showBanner("Risposta sbagliata! Nessun bonus 😅");
      }
    },

    skipQuiz: () => {
      const state = get();
      if (!state.quizActive) return;
      set({ quizActive: false, quizQuestion: null });
    },

    showBanner: (message) => {
      if (bannerTimeout) {
        clearTimeout(bannerTimeout);
      }
      const payload: BannerMessage = { id: crypto.randomUUID(), message };
      set({ banner: payload });
      bannerTimeout = setTimeout(() => {
        set({ banner: null });
      }, ANIM.BANNER_DURATION * 1000);
    },

    clearBanner: () => {
      if (bannerTimeout) {
        clearTimeout(bannerTimeout);
        bannerTimeout = null;
      }
      set({ banner: null });
    },

    getSessionById: (id) => get().sessionsHistory.find((session) => session.id === id),
  };
});
