import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Availability",
    school: "15 min/year avg",
    private: "Scheduled sessions",
    sesame: "24/7, anytime",
  },
  {
    label: "Personalization",
    school: "Limited (500 students)",
    private: "High",
    sesame: "Deep (knows everything)",
  },
  {
    label: "Cost",
    school: "Free",
    private: "$2,000–$10,000+",
    sesame: "Free to start",
  },
  {
    label: "Chance estimates",
    school: false,
    private: true,
    sesame: true,
  },
  {
    label: "Task tracking",
    school: false,
    private: "Sometimes",
    sesame: true,
  },
];

export function Comparison() {
  const renderCell = (value: string | boolean) => {
    if (value === true) return <Check className="w-5 h-5 text-[var(--accent-primary)]" />;
    if (value === false) return <X className="w-5 h-5 text-red-500" />;
    return value;
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--bg-page)]">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent-primary)] mb-4">
            Why Sesame3
          </p>
          <h2 className="font-['Satoshi'] text-3xl md:text-4xl font-bold">
            How we compare
          </h2>
        </div>

        {/* Mobile: 2-column comparison (Private vs Sesame3) */}
        <div className="md:hidden">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Header Row */}
            <div className="grid grid-cols-3 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
              <div className="p-4"></div>
              <div className="p-4 text-center font-semibold text-[var(--text-main)] text-sm">
                Private Counselor
              </div>
              <div className="p-4 text-center font-semibold text-[var(--accent-primary)] bg-[var(--accent-surface)] text-sm">
                Sesame3
              </div>
            </div>

            {/* Data Rows */}
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-3 border-b border-[var(--border)] last:border-b-0">
                <div className="p-4 font-medium text-[var(--text-main)] bg-[var(--bg-secondary)] text-sm">
                  {row.label}
                </div>
                <div className="p-4 text-center text-[var(--text-muted)] flex items-center justify-center text-sm">
                  {renderCell(row.private)}
                </div>
                <div className="p-4 text-center font-semibold text-[var(--accent-primary)] bg-[var(--accent-surface)] flex items-center justify-center text-sm">
                  {renderCell(row.sesame)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Full 4-column comparison */}
        <div className="hidden md:block">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            {/* Header Row */}
            <div className="grid grid-cols-4 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
              <div className="p-5"></div>
              <div className="p-5 text-center font-semibold text-[var(--text-main)]">
                School Counselor
              </div>
              <div className="p-5 text-center font-semibold text-[var(--text-main)]">
                Private Counselor
              </div>
              <div className="p-5 text-center font-semibold text-[var(--accent-primary)] bg-[var(--accent-surface)]">
                Sesame3
              </div>
            </div>

            {/* Data Rows */}
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-4 border-b border-[var(--border)] last:border-b-0">
                <div className="p-5 font-medium text-[var(--text-main)] bg-[var(--bg-secondary)]">
                  {row.label}
                </div>
                <div className="p-5 text-center text-[var(--text-muted)] flex items-center justify-center">
                  {renderCell(row.school)}
                </div>
                <div className="p-5 text-center text-[var(--text-muted)] flex items-center justify-center">
                  {renderCell(row.private)}
                </div>
                <div className="p-5 text-center font-semibold text-[var(--accent-primary)] bg-[var(--accent-surface)] flex items-center justify-center">
                  {renderCell(row.sesame)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
