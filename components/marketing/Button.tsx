import { clsx } from "clsx";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md",
  href,
  className,
  onClick 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all cursor-pointer appearance-none";
  
  const variants = {
    primary: "bg-[var(--text-main)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-white text-[var(--text-main)] border border-[var(--border)] hover:bg-[var(--bg-secondary)]",
    ghost: "text-[var(--text-main)] hover:bg-black/5",
    white: "bg-white text-[var(--text-main)] hover:bg-[var(--bg-secondary)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-[15px]",
    lg: "px-8 py-4 text-base",
  };

  const classes = clsx(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
