"use client";

import React, { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep("code");
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-bg-app flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white border border-border-subtle rounded-2xl shadow-card p-8 md:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-12 h-12 bg-text-main text-white rounded-xl flex items-center justify-center font-bold text-2xl mb-4">S3</div>
          <h1 className="font-display font-bold text-2xl text-text-main mb-2">Welcome to Sesame</h1>
          <p className="text-text-muted">College prep without the panic.</p>
        </div>

        {step === "email" ? (
          <>
            <button 
                onClick={() => router.push("/onboarding")}
                className="w-full flex items-center justify-center gap-3 bg-white border border-border-medium hover:bg-bg-sidebar py-3 rounded-xl font-medium text-text-main transition-colors mb-6"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-border-subtle flex-1"></div>
              <span className="text-xs text-text-light font-medium uppercase tracking-wider">Or</span>
              <div className="h-px bg-border-subtle flex-1"></div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-1.5 ml-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-bg-sidebar border border-border-medium rounded-xl px-4 py-3 text-base outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-surface transition-all"
                  required
                />
              </div>
              <Button className="w-full justify-center">
                Continue with Email
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-surface text-accent-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-1">Check your email</h3>
              <p className="text-sm text-text-muted">We sent a temporary login code to <span className="font-semibold text-text-main">{email}</span></p>
            </div>

            <div>
              <input 
                type="text" 
                placeholder="1 2 3 4 5 6"
                className="w-full bg-bg-sidebar border border-border-medium rounded-xl px-4 py-3 text-center text-2xl font-mono font-bold tracking-widest outline-none focus:border-accent-primary focus:ring-4 focus:ring-accent-surface transition-all"
                autoFocus
              />
            </div>

            <Button className="w-full justify-center">
              Verify & Login
            </Button>
            
            <button 
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-center text-sm text-text-muted hover:text-text-main underline"
            >
              Use a different email
            </button>
          </form>
        )}

      </div>
      
      <p className="mt-8 text-center text-xs text-text-light">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
