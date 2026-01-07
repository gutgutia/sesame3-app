import { Sparkles, Target, School, Check, FolderOpen, Calendar } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "An advisor who truly knows you",
    description: "Forget generic advice. Ask anything — from \"Should I apply ED to Yale?\" to \"How do I write about my research?\" — and get personalized answers based on your full profile.",
    points: [
      "Strategic guidance tailored to your strengths",
      "Voice and text — chat however you're comfortable",
      "Available 24/7, infinitely patient",
    ],
    screenshot: "/assets/feature-advisor.png",
  },
  {
    icon: Target,
    title: "Know your real chances",
    description: "No guesswork, no sugar-coating. See how you compare to typical admits at each school, understand exactly where you're strong or falling short, and get actionable advice on how to improve.",
    points: [
      "Factor-by-factor breakdown against admits",
      "Clear reach, target, and safety tiers",
      "Personalized recommendations to close gaps",
    ],
    screenshot: "/assets/feature-chances.png",
    reverse: true,
  },
  {
    icon: School,
    title: "Build a balanced list",
    description: "Stop obsessing over one dream school. Build a smart, balanced list with reaches, targets, and safeties — and track every application from start to finish.",
    points: [
      "Visual balance of reach/target/safety schools",
      "AI-suggested schools based on your fit",
      "Application status tracking",
    ],
    screenshot: "/assets/feature-schools.png",
  },
  {
    icon: FolderOpen,
    title: "Everything in one place",
    description: "No more scattered Google Docs and forgotten achievements. Your awards, extracurriculars, test scores, leadership roles, and dream schools — all organized and ready when you need them.",
    points: [
      "Track activities, awards, and achievements",
      "Store test scores and academic records",
      "Build your story over time, not the night before",
    ],
    screenshot: "/assets/feature-profile.png",
    reverse: true,
  },
  {
    icon: Calendar,
    title: "Never miss a deadline",
    description: "Early Decision, scholarship applications, test registrations — there's a lot to track. See every important date in one timeline, and we'll nudge you before it's too late.",
    points: [
      "All deadlines in one clear timeline view",
      "Smart reminders before due dates",
      "Personalized tasks based on your school list",
    ],
    screenshot: "/assets/feature-roadmap.png",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 bg-[var(--bg-page)]">
      <div className="container">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`flex flex-col ${feature.reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center mb-16 md:mb-24 last:mb-0`}
          >
            {/* Content */}
            <div className="flex-1 max-w-lg px-4 md:px-0">
              <div className="w-12 h-12 bg-[var(--accent-surface)] rounded-xl flex items-center justify-center text-[var(--accent-primary)] mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h2 className="font-['Satoshi'] text-3xl md:text-4xl font-bold mb-4">
                {feature.title}
              </h2>
              <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-[var(--text-muted)] text-sm md:text-base">
                    <Check className="w-5 h-5 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Screenshot */}
            <div className="flex-1 w-full max-w-md md:max-w-none px-4 md:px-0">
              <div 
                className="rounded-2xl overflow-hidden bg-white"
                style={{ 
                  boxShadow: "0 30px 80px -20px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)"
                }}
              >
                <img
                  src={feature.screenshot}
                  alt={feature.title}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
