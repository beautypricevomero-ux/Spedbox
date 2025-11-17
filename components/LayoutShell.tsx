import clsx from "clsx";
import { ReactNode } from "react";

interface LayoutShellProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export function LayoutShell({
  title,
  subtitle,
  eyebrow = "Discover",
  children,
  className,
  actions,
}: LayoutShellProps) {
  return (
    <div className={clsx("relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-28 pt-10", className)}>
      <header className="mb-6 text-sbTextDark">
        <p className="text-[11px] uppercase tracking-[0.4em] text-sbPinkDeep/70">{eyebrow}</p>
        {title && <h1 className="mt-2 text-3xl font-semibold text-sbTextDark">{title}</h1>}
        {subtitle && <p className="mt-1 text-sm text-sbTextDark/70">{subtitle}</p>}
        {actions && <div className="mt-4">{actions}</div>}
      </header>
      <div className="flex-1 space-y-6 pb-4">{children}</div>
    </div>
  );
}
