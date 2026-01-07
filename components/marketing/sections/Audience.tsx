const audiences = [
  {
    emoji: "🎯",
    title: "The Overwhelmed",
    description: "You know college matters, but every Google search makes it worse. You need clarity, not more noise.",
  },
  {
    emoji: "🌱",
    title: "The Early Starter",
    description: "You're in 9th or 10th grade and want to get ahead — without burning out before applications even begin.",
  },
  {
    emoji: "⚡",
    title: "The Catch-Up Kid",
    description: "Junior year hit fast. You need your story, your list, and your plan — we'll help you catch up without the panic.",
  },
];

export function Audience() {
  return (
    <section className="py-24 bg-[var(--bg-secondary)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
            Who It&apos;s For
          </p>
          <h2 className="font-['Satoshi'] text-4xl font-bold">
            Built for students like you
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <div className="text-5xl mb-5">{item.emoji}</div>
              <h3 className="font-['Satoshi'] text-xl font-bold mb-3">
                {item.title}
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
