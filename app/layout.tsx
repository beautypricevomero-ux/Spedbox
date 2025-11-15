import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BeautyPrice SpeedBox",
  description: "Gioca e componi la tua beauty box in pochi secondi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className="bg-sbBackground text-sbRichBlack font-sans">
        {children}
      </body>
    </html>
  );
}
