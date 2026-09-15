"use client";

import { useEffect, useState } from "react";
import { useAssessment } from "@/context/AssessmentContext";
import { useRouter } from "next/navigation";
import { ResultsRadarChart } from "@/components/ResultsRadarChart";
import { ArrowLeft, RotateCcw, Share } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const { 
    role, 
    isAssessmentComplete, 
    calculateTotalScore, 
    calculateCFI, 
    getCategorization,
    resetAssessment
  } = useAssessment();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!role || !isAssessmentComplete) {
      router.push("/");
    }
  }, [role, isAssessmentComplete, router]);

  if (!mounted || !role || !isAssessmentComplete) return null;

  const totalScore = calculateTotalScore();
  const cfi = calculateCFI();
  const category = getCategorization(totalScore);

  const handleRestart = () => {
    resetAssessment();
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl w-full mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push("/assessment")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Assessment
          </button>
          <div className="px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-semibold uppercase tracking-wider">
            {role} Report
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Left Column: Hero Metrics */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full justify-center text-center relative overflow-hidden">
              {/* Decorative background blob */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60" />
              
              <div className="relative z-10">
                <h1 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  Child-Friendliness Index
                </h1>
                
                <div className="my-8 flex justify-center items-end gap-2">
                  <span className="text-7xl font-black text-slate-900 leading-none">
                    {totalScore}
                  </span>
                  <span className="text-xl font-medium text-slate-400 mb-2">/ 125</span>
                </div>
                
                <div className="mb-8">
                  <div className="text-sm text-slate-500 font-medium mb-1">CFI Score</div>
                  <div className="text-3xl font-bold text-emerald-600">{cfi.toFixed(2)}</div>
                </div>

                <div className={cn(
                  "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold text-lg border-2",
                  category.color
                )}>
                  {category.text}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Radar Chart */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-800 mb-4 px-2" style={{ fontFamily: "Georgia, serif" }}>
              Domain Breakdown
            </h2>
            <ResultsRadarChart />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <button 
            onClick={() => router.push("/assessment")}
            className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-3.5 rounded-full font-semibold transition-all active:scale-95"
          >
            <ArrowLeft size={18} /> Edit Responses
          </button>
          <button 
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 px-8 py-3.5 rounded-full font-semibold transition-all active:scale-95"
          >
            <RotateCcw size={18} /> Start New Assessment
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-8 py-3.5 rounded-full font-semibold transition-all active:scale-95"
          >
            <Share size={18} /> Export / Print Report
          </button>
        </motion.div>

        {/* Score Translation Key */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6">Score Translation Key</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border-2 bg-emerald-50 text-emerald-800 border-emerald-200 flex flex-col items-center text-center">
              <span className="text-2xl font-black mb-1">100–125</span>
              <span className="text-sm font-semibold">Highly Child-Friendly</span>
            </div>
            <div className="p-4 rounded-xl border-2 bg-blue-50 text-blue-800 border-blue-200 flex flex-col items-center text-center">
              <span className="text-2xl font-black mb-1">75–99</span>
              <span className="text-sm font-semibold">Moderately Child-Friendly</span>
            </div>
            <div className="p-4 rounded-xl border-2 bg-yellow-50 text-yellow-800 border-yellow-200 flex flex-col items-center text-center">
              <span className="text-2xl font-black mb-1">50–74</span>
              <span className="text-sm font-semibold">Low Child-Friendliness</span>
            </div>
            <div className="p-4 rounded-xl border-2 bg-red-50 text-red-800 border-red-200 flex flex-col items-center text-center">
              <span className="text-2xl font-black mb-1">0–49</span>
              <span className="text-sm font-semibold">Not Child-Friendly</span>
            </div>
          </div>
        </motion.div>

        {/* Hints / Explanatory Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-4">Understanding Your Results</h3>
          <p className="text-slate-600 mb-6">
            The Child-Friendliness Index (CFI) evaluates properties out of 125 possible points across 5 domains. 
            Your score indicates that the environment is <strong>{category.text}</strong>.
          </p>
          <div className="space-y-4">
            {totalScore >= 100 && (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl">
                <strong className="block mb-1">Excellent Foundation</strong>
                The property meets or exceeds most child-friendliness standards. Focus on maintaining these standards and addressing any minor gaps identified in the radar chart.
              </div>
            )}
            {totalScore >= 75 && totalScore < 100 && (
              <div className="p-4 bg-blue-50 text-blue-800 rounded-xl">
                <strong className="block mb-1">Good, but Room for Improvement</strong>
                While generally safe and accommodating, look at the radar chart to identify domains (like Play Infrastructure or Environmental Quality) that scored below 20. Targeted upgrades will significantly improve the CFI.
              </div>
            )}
            {totalScore < 75 && (
              <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl">
                <strong className="block mb-1">Critical Intervention Recommended</strong>
                The property requires significant improvements to be considered truly child-friendly. Prioritize immediate safety and security upgrades first, followed by improvements to play and social infrastructure.
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
