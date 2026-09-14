"use client";

import { useEffect, useState } from "react";
import { useAssessment } from "@/context/AssessmentContext";
import { useRouter } from "next/navigation";
import { DomainStep } from "@/components/DomainStep";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AssessmentPage() {
  const { 
    role, 
    domains, 
    currentDomainIndex, 
    setCurrentDomainIndex, 
    answers,
    completeAssessment 
  } = useAssessment();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!role) {
      router.push("/");
    }
  }, [role, router]);

  if (!mounted || !role) return null;

  const handleNext = () => {
    if (currentDomainIndex < domains.length - 1) {
      setCurrentDomainIndex(currentDomainIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      completeAssessment();
      router.push("/results");
    }
  };

  const handlePrev = () => {
    if (currentDomainIndex > 0) {
      setCurrentDomainIndex(currentDomainIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push("/");
    }
  };

  const currentDomain = domains[currentDomainIndex];
  
  // Check if all questions in current domain are answered
  // Actually we default to 3 in DomainStep, but let's just make sure they are in `answers` if we want to enforce it.
  // For frictionless experience, defaulting to 3 is fine, we consider it "answered" if they see it, 
  // but to be strict, let's initialize them as answered or just let the default 3 pass.
  // We'll assume the SliderInput handles the value correctly.

  const progress = ((currentDomainIndex) / domains.length) * 100;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      {/* Top Progress Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="h-1 w-full bg-slate-100">
          <div 
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={handlePrev}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="text-sm font-semibold text-slate-800">
            {role} Assessment
          </div>
          <div className="w-[60px]" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 pb-32">
        <AnimatePresence mode="wait">
          <DomainStep key={currentDomainIndex} />
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="text-sm font-medium text-slate-500 hidden sm:block">
            Step {currentDomainIndex + 1} of {domains.length}
          </div>
          <button
            onClick={handleNext}
            className="w-full sm:w-auto ml-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all active:scale-95"
          >
            {currentDomainIndex === domains.length - 1 ? (
              <>View Results <CheckCircle2 size={18} /></>
            ) : (
              <>Next Domain <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
