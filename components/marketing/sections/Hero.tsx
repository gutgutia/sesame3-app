"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Focus input when navigated to via hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#waitlist" && emailInputRef.current) {
        setTimeout(() => {
          emailInputRef.current?.focus();
        }, 500); // Wait for scroll to complete
      }
    };

    // Check on mount
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="pt-28 md:pt-40 pb-16 md:pb-24 text-center">
      <div className="container px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent-surface)] border border-[var(--accent-border)] rounded-full text-sm font-semibold text-[var(--accent-primary)] mb-6 md:mb-7">
          <Sparkles className="w-3.5 h-3.5" />
          Launching January 2026
        </div>

        {/* Title */}
        <h1 className="font-['Satoshi'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-5 md:mb-6 max-w-3xl mx-auto leading-tight">
          Your personal advisor for the{" "}
          <span className="text-[var(--accent-primary)]">college journey</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-xl text-[var(--text-muted)] max-w-xl mx-auto mb-8 md:mb-10 leading-relaxed">
          Expert guidance, honest chance assessments, and a clear roadmap — all through a conversation with an AI that knows you.
        </p>

        {/* Email Collection */}
        <div id="waitlist" className="max-w-md mx-auto mb-6 scroll-mt-28">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                ref={emailInputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3.5 rounded-full border border-[var(--border)] bg-white text-[var(--text-main)] placeholder:text-[var(--text-light)] focus:outline-none focus:border-[var(--accent-primary)] focus:ring-2 focus:ring-[var(--accent-primary)]/20 transition-all text-center sm:text-left"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[var(--text-main)] text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 whitespace-nowrap"
              >
                {loading ? "Joining..." : "Join Waitlist"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <div className="bg-[var(--accent-surface)] border border-[var(--accent-border)] rounded-2xl px-6 py-4 text-[var(--accent-primary)] font-medium">
              🎉 You&apos;re on the list! We&apos;ll be in touch soon.
            </div>
          )}
        </div>

        <p className="text-sm text-[var(--text-light)] mb-12 md:mb-16">
          Be the first to know when we launch. No spam, ever.
        </p>

        {/* Screenshot */}
        <div className="max-w-[1000px] mx-auto">
          <div 
            className="rounded-2xl overflow-hidden bg-white"
            style={{
              boxShadow: "0 40px 100px -30px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.04)"
            }}
          >
            <img 
              src="/assets/hero-screenshot.png" 
              alt="Sesame3 app interface showing college counseling chat"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
