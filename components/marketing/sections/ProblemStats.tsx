export function ProblemStats() {
  const stats = [
    { number: "4M+", text: "students apply to college each year" },
    { number: "500:1", text: "average student-to-counselor ratio at public schools" },
    { number: "$200/hr", text: "typical private counselor rate" },
  ];

  return (
    <section className="py-24 bg-white border-t border-[var(--border)]">
      <div className="container">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-10 mb-16 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="p-6">
              <div className="font-['Satoshi'] text-5xl font-black text-[var(--text-main)] mb-3">
                {stat.number}
              </div>
              <p className="text-[var(--text-muted)]">{stat.text}</p>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div className="max-w-2xl mx-auto text-center p-10 bg-[var(--bg-secondary)] rounded-2xl">
          <p className="font-['Satoshi'] text-xl font-medium text-[var(--text-main)] leading-relaxed mb-5 italic">
            "The college admissions process has become so complex that many students, especially those without resources, are left navigating it alone."
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            — <strong className="text-[var(--text-main)]">The New York Times</strong>, on the college counseling gap
          </p>
        </div>
      </div>
    </section>
  );
}
