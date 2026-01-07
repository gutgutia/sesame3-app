import { MessageCircle, Target, School, Map, User, Mic, Smartphone, Lock } from "lucide-react";

const items = [
  { icon: MessageCircle, label: "AI Advisor", desc: "24/7 guidance" },
  { icon: Target, label: "Chances", desc: "Real odds" },
  { icon: School, label: "School List", desc: "Balanced picks" },
  { icon: Map, label: "Roadmap", desc: "Clear tasks" },
  { icon: User, label: "Profile", desc: "Your story" },
  { icon: Mic, label: "Voice Chat", desc: "Talk naturally" },
  { icon: Smartphone, label: "Mobile", desc: "Use anywhere" },
  { icon: Lock, label: "Private", desc: "Your data, yours" },
];

export function WhatIncluded() {
  return (
    <section className="py-20 bg-white border-t border-[var(--border)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Satoshi'] text-3xl font-bold">
            Everything you need, in one place
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => (
            <div key={i} className="text-center p-6 bg-[var(--bg-secondary)] rounded-2xl">
              <div className="w-12 h-12 bg-[var(--accent-surface)] text-[var(--accent-primary)] rounded-xl flex items-center justify-center mx-auto mb-3">
                <item.icon className="w-6 h-6" />
              </div>
              <div className="font-['Satoshi'] font-bold text-[var(--text-main)] mb-1">
                {item.label}
              </div>
              <div className="text-sm text-[var(--text-muted)]">
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
