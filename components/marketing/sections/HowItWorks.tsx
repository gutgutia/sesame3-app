export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Tell your story",
      description: "Share your interests, experiences, and dreams. Our AI listens and builds a complete picture of who you are.",
    },
    {
      number: "2",
      title: "Get honest insights",
      description: "See your real chances at any school, understand where you're strong, and know exactly what to improve.",
    },
    {
      number: "3",
      title: "Follow your roadmap",
      description: "Get personalized tasks and deadlines. Focus on one thing at a time. Stay calm, stay on track.",
    },
  ];

  return (
    <section id="how" className="py-16 md:py-24 bg-white border-t border-[var(--border)]">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
            How It Works
          </p>
          <h2 className="font-['Satoshi'] text-3xl md:text-4xl font-bold mb-4">
            Three steps to clarity
          </h2>
          <p className="text-base md:text-lg text-[var(--text-muted)]">
            No forms to fill. Just have a conversation.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div className="w-14 h-14 bg-[var(--bg-secondary)] rounded-2xl flex items-center justify-center font-['Satoshi'] text-2xl font-extrabold text-[var(--accent-primary)] mx-auto mb-4 md:mb-6">
                {step.number}
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+48px)] w-[calc(100%-96px)] h-0.5 bg-[var(--border)] border-dashed" />
              )}
              <h3 className="font-['Satoshi'] text-lg md:text-xl font-bold mb-2 md:mb-3">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
