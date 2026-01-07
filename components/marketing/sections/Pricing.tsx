import { Check, Sparkles, Star, Award, Info } from "lucide-react";
import { Button } from "../Button";

const plans = [
  {
    name: "Advisor",
    tagline: "Solid guidance to get started",
    price: "$0",
    period: "forever",
    description: "A helpful advisor who knows the basics and can point you in the right direction.",
    experience: "Entry-level guidance",
    features: [
      "General college planning advice",
      "School discovery & exploration",
      "Basic profile building",
      "Reach / Target / Safety assessments",
      "Standard response quality",
    ],
    limit: "Generous monthly usage",
    cta: "Join Waitlist",
    ctaVariant: "secondary" as const,
    icon: Sparkles,
  },
  {
    name: "Counselor",
    tagline: "Experienced, personalized guidance",
    price: "$9.99",
    period: "/month",
    description: "A seasoned counselor who understands nuance and gives you tailored, strategic advice.",
    experience: "Experienced guidance",
    badge: "Most Popular",
    featured: true,
    features: [
      "Everything in Advisor, plus:",
      "More personalized recommendations",
      "Nuanced essay feedback",
      "Strategic application planning",
      "Higher-quality responses",
    ],
    limit: "Extended monthly usage",
    cta: "Join Waitlist",
    ctaVariant: "primary" as const,
    icon: Star,
  },
  {
    name: "Expert Counselor",
    tagline: "Elite expertise for competitive applicants",
    price: "$24.99",
    period: "/month",
    description: "A top-tier expert who's guided students into the most competitive schools in the country.",
    experience: "Expert-level guidance",
    features: [
      "Everything in Counselor, plus:",
      "Deep, nuanced insights",
      "Sophisticated essay coaching",
      "Competitive school strategy",
      "Highest-quality responses",
    ],
    limit: "Maximum monthly usage",
    cta: "Join Waitlist",
    ctaVariant: "secondary" as const,
    icon: Award,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-white border-t border-[var(--border)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-6 px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
            Planned Pricing
          </p>
          <h2 className="font-['Satoshi'] text-3xl md:text-4xl font-bold mb-4">
            Choose your counselor
          </h2>
          <p className="text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
            Every plan gives you access to the same powerful features. 
            The difference? The depth and quality of guidance you receive.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-14 text-sm text-[var(--text-muted)] px-4">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Same features</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[var(--accent-primary)]" />
            <span>No hidden fees</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto px-4 md:px-0">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <div
                key={i}
                className={`rounded-3xl p-6 md:p-8 flex flex-col relative ${
                  plan.featured
                    ? "bg-[var(--text-main)] text-white md:scale-105 shadow-xl order-first md:order-none"
                    : "bg-[var(--bg-secondary)]"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--accent-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                    {plan.badge}
                  </div>
                )}

                {/* Icon & Name */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${
                    plan.featured 
                      ? "bg-white/10" 
                      : "bg-[var(--accent-surface)]"
                  }`}>
                    <Icon className={`w-7 h-7 ${plan.featured ? "text-white" : "text-[var(--accent-primary)]"}`} />
                  </div>
                  <h3 className="font-['Satoshi'] text-xl font-bold mb-1">
                    {plan.name}
                  </h3>
                  <p className={`text-sm ${plan.featured ? "text-white/70" : "text-[var(--accent-primary)]"} font-medium`}>
                    {plan.tagline}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center pb-6 border-b border-black/10 mb-6">
                  {plan.featured && <div className="border-white/20" />}
                  <div className="flex items-baseline justify-center gap-1 mb-3">
                    <span className="font-['Satoshi'] text-5xl font-black">
                      {plan.price}
                    </span>
                    <span className={plan.featured ? "text-white/70" : "text-[var(--text-muted)]"}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${plan.featured ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                    {plan.description}
                  </p>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.featured ? "text-green-400" : "text-[var(--accent-primary)]"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Usage Note */}
                <p className={`text-xs text-center mb-4 ${plan.featured ? "text-white/50" : "text-[var(--text-light)]"}`}>
                  {plan.limit}
                </p>

                {/* CTA */}
                <Button
                  variant={plan.featured ? "white" : plan.ctaVariant}
                  href="#waitlist"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="flex items-center justify-center gap-2 text-[var(--text-muted)] text-sm text-center px-4">
          <Info className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
          <p>Join the waitlist for early access.</p>
        </div>
      </div>
    </section>
  );
}
