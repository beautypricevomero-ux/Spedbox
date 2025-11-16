"use client";

import clsx from "clsx";
import Link from "next/link";

interface BottomNavProps {
  active?: "home" | "game" | "history" | "profile";
  gameHref?: string;
}

const icons = {
  home: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  game: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7-4.5-7-10A4.5 4.5 0 0 1 9.5 6 4.33 4.33 0 0 1 12 7.1 4.33 4.33 0 0 1 14.5 6 4.5 4.5 0 0 1 19 11c0 5.5-7 10-7 10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12a8 8 0 1 1 2.34 5.66M4 12H2m2 0 2-2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8v4l3 1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" strokeLinecap="round" />
    </svg>
  ),
};

export function BottomNav({ active = "home", gameHref = "/home" }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "Home", href: "/home" },
    { id: "game", label: "Play", href: gameHref },
    { id: "history", label: "History", href: "/history" },
    { id: "profile", label: "Profile", href: "/" },
  ] as const;

  return (
    <nav className="fixed bottom-6 left-1/2 z-30 flex w-[92%] max-w-md -translate-x-1/2 items-center justify-around rounded-full bg-white/85 px-4 py-3 shadow-[0_25px_45px_rgba(255,75,110,0.2)] backdrop-blur">
      {navItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={clsx(
            "flex flex-col items-center text-xs font-semibold",
            active === item.id ? "text-sbRed" : "text-sbTextDark/40",
          )}
        >
          <span
            className={clsx(
              "mb-1 flex h-10 w-10 items-center justify-center rounded-full",
              active === item.id ? "bg-sbPink/50 text-sbRed" : "bg-sbGrey text-sbTextDark/50",
            )}
          >
            {icons[item.id as keyof typeof icons]}
          </span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
