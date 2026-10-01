"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAssessment, Role } from "@/context/AssessmentContext";
import { Building, History, Settings, ExternalLink, ShieldCheck, Users, ArrowRight, LayoutDashboard, Menu, X, Edit, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("new");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pastAssessments, setPastAssessments] = useState<any[]>([]);
  const router = useRouter();
  const { setRole, resetAssessment, loadAssessment } = useAssessment();

  useEffect(() => {
    // Load past assessments from the API database
    fetch("http://localhost:3000/api/buildings")
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPastAssessments(data);
        } else {
          setPastAssessments([]);
        }
      })
      .catch(e => console.error("Failed to fetch assessments"));
  }, []);

  const handleRoleSelection = (role: Role) => {
    resetAssessment();
    setRole(role);
    router.push("/assessment");
  };

  const roles = [
    {
      id: "Parent" as Role,
      title: "Parent / Caregiver",
      description: "Assess your residential environment for your children's safety.",
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

  const sidebarLinks = [
    { id: "new", label: "New Assessment", icon: LayoutDashboard },
    { id: "history", label: "Assessed Buildings", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed md:relative inset-y-0 left-0 z-50 w-72 flex-shrink-0 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
            ChildFriendly <span className="text-slate-400 font-medium text-sm">Portal</span>
          </div>
          <button className="md:hidden text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setActiveTab(link.id); setIsMobileMenuOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                activeTab === link.id 
                  ? "bg-slate-900 text-white" 
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <a
            href="http://localhost:8080/"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            <ExternalLink size={16} />
            Back to Website
          </a>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header (Mobile) */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center">
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 text-slate-600">
            <Menu size={24} />
          </button>
          <span className="font-bold text-lg ml-2">Assessor Portal</span>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          
          {/* NEW ASSESSMENT TAB */}
          {activeTab === "new" && (
            <div className="max-w-4xl mx-auto space-y-8 fade-in">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Start a New Assessment</h1>
                <p className="text-slate-500 mt-2">Select your evaluator role to calibrate the scoring matrix appropriately.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelection(role.id)}
                      className={cn(
                        "flex flex-col items-start text-left p-6 rounded-2xl border transition-all duration-200 group relative hover:shadow-md",
                        role.color
                      )}
                    >
                      <div className={cn("p-3 rounded-full bg-white/80 mb-4 shadow-sm", role.iconColor)}>
                        <Icon size={24} strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{role.title}</h3>
                      <p className="text-sm opacity-80 mb-6">{role.description}</p>
                      <div className="mt-auto flex items-center gap-2 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Launch Tool <ArrowRight size={16} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ASSESSED BUILDINGS TAB */}
          {activeTab === "history" && (
            <div className="max-w-5xl mx-auto space-y-6 fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Assessed Buildings</h1>
                  <p className="text-slate-500 mt-1">Review and manage your past evaluation reports.</p>
                </div>
                <button onClick={() => setActiveTab("new")} className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
                  + New Evaluation
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                {pastAssessments.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    <FileText size={48} className="mx-auto text-slate-300 mb-4" />
                    <p>No buildings assessed yet.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {pastAssessments.map((item, i) => (
                      <div key={i} className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-slate-50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-900">{item.building}</h3>
                            <span className={cn(
                              "px-2.5 py-1 rounded-full text-xs font-semibold",
                              item.score >= 80 ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            )}>
                              {item.score >= 80 ? "Certified" : "Needs Work"}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mb-4">Assessed on {item.date} • {item.role}</p>
                          
                          {item.missing && item.missing.length > 0 && (
                            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mt-3">
                              <h4 className="text-sm font-bold text-red-800 mb-2">Areas Missing / Action Required:</h4>
                              <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                                {item.missing.map((issue: string, idx: number) => (
                                  <li key={idx}>{issue}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 min-w-[120px]">
                          <div className="text-3xl font-black text-slate-900">{item.score}<span className="text-lg text-slate-400 font-normal">/100</span></div>
                          <button 
                            onClick={() => {
                              if (confirm("Are you sure you want to update this assessment? This will load the past report and allow you to overwrite it.")) {
                                loadAssessment(item);
                                router.push("/assessment");
                              }
                            }}
                            className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 ml-auto md:ml-0"
                          >
                            <Edit size={16} /> Update Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="max-w-3xl mx-auto space-y-6 fade-in">
              <h1 className="text-3xl font-bold text-slate-900">Assessor Profile</h1>
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input type="text" id="settings-name" defaultValue={localStorage.getItem('cfi_assessor_name') || "Kevin Omondi"} className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Assessor ID</label>
                  <input type="text" defaultValue="AUTH-8492" className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-slate-100 text-slate-500" readOnly />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Notification Preferences</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" id="settings-notif1" defaultChecked={localStorage.getItem('cfi_notif1') !== 'false'} className="w-4 h-4 rounded border-slate-300 text-slate-900" />
                      <span className="text-sm text-slate-700">Email me a copy of every assessment report</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" id="settings-notif2" defaultChecked={localStorage.getItem('cfi_notif2') !== 'false'} className="w-4 h-4 rounded border-slate-300 text-slate-900" />
                      <span className="text-sm text-slate-700">Receive weekly client database summaries</span>
                    </label>
                  </div>
                </div>
                <div className="pt-4 flex items-center gap-4">
                  <button 
                    onClick={() => {
                      localStorage.setItem('cfi_assessor_name', (document.getElementById('settings-name') as HTMLInputElement).value);
                      localStorage.setItem('cfi_notif1', (document.getElementById('settings-notif1') as HTMLInputElement).checked.toString());
                      localStorage.setItem('cfi_notif2', (document.getElementById('settings-notif2') as HTMLInputElement).checked.toString());
                      alert('Settings saved successfully!');
                    }}
                    className="bg-slate-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-slate-800"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
