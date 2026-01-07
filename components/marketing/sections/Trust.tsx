import { ShieldCheck, Lock, Trash2, UserX } from "lucide-react";

const trustPoints = [
  {
    icon: Lock,
    title: "Encrypted at rest",
    description: "Your data is encrypted and stored securely.",
  },
  {
    icon: UserX,
    title: "Limited access",
    description: "Only essential team members can access data, and only when needed.",
  },
  {
    icon: ShieldCheck,
    title: "Never sold",
    description: "We will never sell your information. Period.",
  },
  {
    icon: Trash2,
    title: "Delete anytime",
    description: "Request deletion and we'll remove your data completely.",
  },
];

export function Trust() {
  return (
    <section className="py-16 md:py-20 bg-[var(--accent-surface)] border-y border-[var(--accent-border)]">
      <div className="container">
        <div className="text-center mb-10">
          <h3 className="font-['Satoshi'] text-2xl md:text-3xl font-bold text-[var(--accent-primary)] mb-3">
            Your data stays yours
          </h3>
          <p className="text-[var(--text-muted)] max-w-lg mx-auto">
            We never share or sell your information. Your profile, conversations, and essays are private — always. We&apos;re here to help you, not monetize you.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
          {trustPoints.map((point, i) => (
            <div key={i} className="text-center">
              <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center text-white mx-auto mb-3">
                <point.icon className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-sm text-[var(--text-main)] mb-1">
                {point.title}
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
