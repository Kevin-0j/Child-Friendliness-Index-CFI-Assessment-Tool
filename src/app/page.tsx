"use client";

import { useAssessment, Role } from "@/context/AssessmentContext";
import { useRouter } from "next/navigation";
import { Users, Building, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Home() {
  const { setRole, resetAssessment } = useAssessment();
  const router = useRouter();

  const handleRoleSelection = (role: Role) => {
    resetAssessment(); // Clear any previous state
    setRole(role);
    router.push("/assessment");
  };

  const roles = [
    {
      id: "Parent" as Role,
      title: "Parent / Caregiver",
      description: "Assess your residential environment for your children's safety and well-being.",
      icon: Users,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      id: "Institution" as Role,
      title: "Property Manager",
      description: "Evaluate your building's facilities against child-friendly standards.",
      icon: Building,
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      id: "Government" as Role,
      title: "Government Inspector",
      description: "Conduct formal audits of high-rise developments for compliance.",
      icon: ShieldCheck,
      color: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="max-w-4xl w-full mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-4"
          >
            Academic Assessment Tool
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Child-Friendliness <br className="hidden md:block"/> Index (CFI)
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto space-y-4"
          >
            <span>
              Evaluate high-rise housing environments based on five established child-friendliness domains. 
            </span>
            <br/><br/>
            <span className="inline-block p-4 bg-white rounded-xl shadow-sm text-sm border border-slate-100 italic">
              <strong>How to use this tool:</strong> For the most accurate results, it is highly recommended to fill out this assessment <strong>while actively walking through the property</strong> or immediately following a formal inspection. 
            </span>
            <br/><br/>
            <span>Select your role below to begin.</span>
          </motion.p>
        </div>

        {/* Role Selection */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelection(role.id)}
                className={cn(
                  "flex flex-col items-center text-center p-8 rounded-2xl border-2 transition-all duration-200 group relative overflow-hidden",
                  role.color
                )}
              >
                <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={cn("p-4 rounded-full bg-white mb-6 shadow-sm", role.iconColor)}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                <p className="text-sm opacity-80 mb-6">{role.description}</p>
                <div className="mt-auto flex items-center gap-2 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                  Start Assessment <ArrowRight size={16} />
                </div>
              </button>
            );
          })}
        </motion.div>
        
        {/* Footer info */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-slate-400 mt-12"
        >
          Takes approximately 5-10 minutes to complete.
        </motion.p>
      </div>
    </main>
  );
}
