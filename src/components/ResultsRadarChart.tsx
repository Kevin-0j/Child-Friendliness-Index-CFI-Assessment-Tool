"use client";

import { useAssessment } from "@/context/AssessmentContext";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export function ResultsRadarChart() {
  const { calculateDomainScores } = useAssessment();
  const domainScores = calculateDomainScores();

  const data = domainScores.map(d => ({
    subject: d.domainTitle.replace(" & ", "\n& "), // slightly better wrapping
    A: d.score,
    fullMark: 25,
  }));

  return (
    <div className="w-full h-[400px] bg-white rounded-3xl border border-slate-100 shadow-sm p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="55%" data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 25]} 
            tick={{ fill: '#94a3b8', fontSize: 10 }} 
            tickCount={6}
          />
          <Radar
            name="Score"
            dataKey="A"
            stroke="#10b981"
            strokeWidth={2}
            fill="#34d399"
            fillOpacity={0.5}
          />
          <Tooltip 
            formatter={(value: any) => [`${value} / 25`, 'Score']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
