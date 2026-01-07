const grades = [
  {
    badge: "9th–10th",
    title: "Explore & Build",
    description: "Discover your interests, start meaningful activities, build your profile foundation.",
    tag: "Ideal start",
    tagColor: "bg-[var(--accent-surface)] text-[var(--accent-primary)]",
  },
  {
    badge: "11th",
    title: "Focus & Plan",
    description: "Lock in your school list, prep for tests, map out your application timeline.",
    tag: "Peak planning",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    badge: "12th",
    title: "Execute & Apply",
    description: "Write essays, submit applications, track deadlines, and stay sane.",
    tag: "Crunch time",
    tagColor: "bg-red-100 text-red-600",
  },
];

export function Timeline() {
  return (
    <section className="py-24 bg-white border-t border-[var(--border)]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
            When to Start
          </p>
          <h2 className="font-['Satoshi'] text-4xl font-bold mb-4">
            The earlier, the calmer
          </h2>
          <p className="text-lg text-[var(--text-muted)]">
            No matter where you are, there&apos;s a path forward.
          </p>
        </div>

        {/* Grade Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {grades.map((grade, i) => (
            <div key={i} className="bg-[var(--bg-secondary)] rounded-2xl p-8">
              <span className="inline-block bg-[var(--text-main)] text-white font-['Satoshi'] text-sm font-bold px-4 py-1.5 rounded-full mb-4">
                {grade.badge}
              </span>
              <h3 className="font-['Satoshi'] text-xl font-bold mb-3">
                {grade.title}
              </h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                {grade.description}
              </p>
              <span className={`text-xs font-semibold px-3 py-1 rounded-md ${grade.tagColor}`}>
                {grade.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
