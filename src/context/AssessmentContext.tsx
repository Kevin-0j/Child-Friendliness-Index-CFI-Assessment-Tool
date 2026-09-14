"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import assessmentData from "../lib/assessment.json";

export type Role = "Parent" | "Institution" | "Government" | null;

export interface Answers {
  [questionId: string]: number;
}

export interface DomainScore {
  domainId: string;
  domainTitle: string;
  score: number;
}

interface AssessmentContextType {
  role: Role;
  setRole: (role: Role) => void;
  answers: Answers;
  setAnswer: (questionId: string, value: number) => void;
  currentDomainIndex: number;
  setCurrentDomainIndex: (index: number) => void;
  isAssessmentComplete: boolean;
  completeAssessment: () => void;
  resetAssessment: () => void;
  calculateDomainScores: () => DomainScore[];
  calculateTotalScore: () => number;
  calculateCFI: () => number;
  getCategorization: (totalScore: number) => { text: string; color: string };
  domains: typeof assessmentData.assessment.domains;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [isAssessmentComplete, setIsAssessmentComplete] = useState(false);

  // Load state from localStorage on mount (hydration safe)
  useEffect(() => {
    const saved = localStorage.getItem("cfi_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.role) setRole(parsed.role);
        if (parsed.answers) setAnswers(parsed.answers);
        if (typeof parsed.currentDomainIndex === 'number') setCurrentDomainIndex(parsed.currentDomainIndex);
        if (parsed.isAssessmentComplete) setIsAssessmentComplete(parsed.isAssessmentComplete);
      } catch (e) {
        console.error("Failed to parse saved state");
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem("cfi_state", JSON.stringify({
      role,
      answers,
      currentDomainIndex,
      isAssessmentComplete
    }));
  }, [role, answers, currentDomainIndex, isAssessmentComplete]);

  const setAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const completeAssessment = () => setIsAssessmentComplete(true);

  const resetAssessment = () => {
    setRole(null);
    setAnswers({});
    setCurrentDomainIndex(0);
    setIsAssessmentComplete(false);
    localStorage.removeItem("cfi_state");
  };

  const calculateDomainScores = (): DomainScore[] => {
    return assessmentData.assessment.domains.map((domain) => {
      let score = 0;
      domain.questions.forEach((q) => {
        score += answers[q.id] || 0;
      });
      return {
        domainId: domain.id,
        domainTitle: domain.title,
        score,
      };
    });
  };

  const calculateTotalScore = (): number => {
    const scores = calculateDomainScores();
    return scores.reduce((total, domain) => total + domain.score, 0);
  };

  const calculateCFI = (): number => {
    return calculateTotalScore() / 125; // Formula given in requirements
  };

  const getCategorization = (totalScore: number) => {
    if (totalScore >= 100) return { text: "Highly Child-Friendly", color: "bg-green-100 text-green-800 border-green-300" };
    if (totalScore >= 75) return { text: "Moderately Child-Friendly", color: "bg-blue-100 text-blue-800 border-blue-300" };
    if (totalScore >= 50) return { text: "Low Child-Friendliness", color: "bg-yellow-100 text-yellow-800 border-yellow-300" };
    return { text: "Not Child-Friendly", color: "bg-red-100 text-red-800 border-red-300" };
  };

  return (
    <AssessmentContext.Provider
      value={{
        role,
        setRole,
        answers,
        setAnswer,
        currentDomainIndex,
        setCurrentDomainIndex,
        isAssessmentComplete,
        completeAssessment,
        resetAssessment,
        calculateDomainScores,
        calculateTotalScore,
        calculateCFI,
        getCategorization,
        domains: assessmentData.assessment.domains,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
}
