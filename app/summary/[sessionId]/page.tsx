"use client";

import { LayoutShell } from "@/components/LayoutShell";
import { SummaryCard } from "@/components/SummaryCard";
import { PrimaryButton } from "@/components/PrimaryButton";
import { useSpeedBoxStore } from "@/lib/store";
import { useParams, useRouter } from "next/navigation";

export default function SummaryPage() {
  const { sessionId } = useParams();
  const router = useRouter();
  const session = useSpeedBoxStore((s) => s.getSessionById(sessionId as string));

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
    <LayoutShell title="Il tuo riepilogo" subtitle="Ecco cosa hai scelto">
      <SummaryCard session={session} />
      <div className="space-y-3">
        <PrimaryButton label="Procedi al checkout" onClick={() => router.push(`/cart/${session.id}`)} />
        <PrimaryButton label="Rigioca con un nuovo ticket" onClick={() => router.push("/home")}
          className="bg-white text-sbRichBlack shadow-[0_4px_10px_rgba(0,0,0,0.12)] hover:brightness-100" />
      </div>
    </LayoutShell>
  );
}
