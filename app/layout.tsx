import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeautyPrice SpeedBox",
  description: "Gioca e componi la tua beauty box in pochi secondi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body className={inter.className + " bg-sbBackground text-sbRichBlack"}>
        {children}
      </body>
    </html>
  );
}
