import { Eye, Wallet, Heart, Shield, Quote } from "lucide-react";

const points = [
  {
    icon: Eye,
    title: "Stay informed, not intrusive",
    description: "Your child drives the process. You can check in on progress without micromanaging every detail.",
  },
  {
    icon: Wallet,
    title: "Expert guidance without the $10K price tag",
    description: "Private counselors charge thousands. Sesame3 provides personalized, strategic advice at a fraction of the cost.",
  },
  {
    icon: Heart,
    title: "Reduce stress for everyone",
    description: "When your child has a clear plan and 24/7 support, there's less anxiety at the dinner table.",
  },
  {
    icon: Shield,
    title: "Safe and private",
    description: "We never share or sell data. Your child's essays, grades, and conversations stay completely private.",
  },
];

export function ForParents() {
  return (
    <section className="py-24 bg-white border-t border-[var(--border)]">
      <div className="container">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          {/* Content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
              For Parents
            </p>
            <h2 className="font-['Satoshi'] text-4xl font-bold mb-4">
              We get it — this matters.
            </h2>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
              Your child&apos;s college journey is stressful for the whole family. You want to help, but you also don&apos;t want to hover. Here&apos;s how Sesame3 helps you both.
            </p>

            <div className="space-y-6">
              {points.map((point, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-11 h-11 bg-[var(--bg-secondary)] rounded-xl flex items-center justify-center text-[var(--accent-primary)] flex-shrink-0">
                    <point.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-['Satoshi'] text-base font-bold mb-1">
                      {point.title}
                    </h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Card */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-[var(--accent-surface)] to-[#F0FAF8] border border-[var(--accent-border)] rounded-3xl p-10 max-w-sm">
              <div className="w-10 h-10 bg-[var(--accent-primary)] rounded-xl flex items-center justify-center text-white mb-5">
                <Quote className="w-5 h-5" />
              </div>
              <p className="font-['Satoshi'] text-xl font-medium text-[var(--text-main)] leading-relaxed mb-5 italic">
                &quot;I used to lie awake worrying if we were doing enough. Now my daughter has a plan, and I can actually sleep.&quot;
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                — What we hope you&apos;ll say
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
