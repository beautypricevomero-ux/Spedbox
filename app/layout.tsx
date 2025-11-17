import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeedBox",
  description: "Gioca e componi la tua beauty box in stile dating app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-sbPinkLight text-sbTextDark font-sans">
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sbPinkLight via-white to-sbPink">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 left-1/3 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute top-40 right-10 h-64 w-64 rounded-full bg-sbPinkDeep/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/70 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.3),_transparent_55%)]" />
          </div>
          <div className="relative z-10 min-h-screen">{children}</div>
        </div>
      </body>
    </html>
  );
}
