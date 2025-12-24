"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Compass, User, BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: LayoutGrid },
  { name: "Plan", href: "/plan", icon: Compass },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Schools", href: "/schools", icon: BookOpen },
  { name: "Discover", href: "/discover", icon: Search },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-[260px] bg-sidebar border-r border-border-subtle p-6 flex-col sticky top-0 h-screen">
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 bg-text-main text-white rounded-lg flex items-center justify-center font-bold text-lg">
          S3
        </div>
        <span className="font-display font-bold text-2xl text-text-main">Sesame</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted font-medium transition-all hover:bg-black/5 hover:text-text-main",
                isActive && "bg-white text-accent-primary font-semibold shadow-sm"
              )}
            >
              <item.icon className="w-5 h-5 stroke-[2px]" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex items-center gap-3 p-3 bg-white/60 border border-border-subtle rounded-xl">
        <div className="w-9 h-9 bg-accent-surface text-accent-primary rounded-full flex items-center justify-center font-semibold">
          R
        </div>
        <div className="text-sm font-medium">Rohan's Space</div>
      </div>
    </aside>
  );
}
