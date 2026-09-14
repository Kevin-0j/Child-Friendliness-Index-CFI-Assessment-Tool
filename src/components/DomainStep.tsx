"use client";

import { useAssessment } from "@/context/AssessmentContext";
import { SliderInput } from "./SliderInput";
import { motion } from "framer-motion";

export function DomainStep() {
  const { domains, currentDomainIndex, answers, setAnswer } = useAssessment();
  const domain = domains[currentDomainIndex];

  if (!domain) return null;

  return (
    <motion.div
      key={domain.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2 mb-10">
        <h2 
          className="text-3xl font-bold text-slate-900"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {domain.title}
        </h2>
        <p className="text-slate-500">
          Domain {currentDomainIndex + 1} of {domains.length}
        </p>
      </div>

      <div className="space-y-12">
        {domain.questions.map((q, index) => (
          <div key={q.id} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-medium text-slate-800 mb-6">
              <span className="text-emerald-500 font-bold mr-2">{index + 1}.</span> 
              {q.text}
            </h3>
            <SliderInput 
              id={q.id}
              value={answers[q.id] || 3} // Default to 3 (Average)
              onChange={(val) => setAnswer(q.id, val)}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
