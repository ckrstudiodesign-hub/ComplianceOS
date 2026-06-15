/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Award, Check, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";

export default function Hub71Board() {
  const [scores, setScores] = useState({
    founderPotential: 9.5,
    problemQuality: 9.8,
    marketOpportunity: 9.2,
    executionProbability: 8.8,
    aiDifferentiation: 9.4,
    productVision: 9.6,
    hub71Fit: 9.9,
    investorAppeal: 9.5
  });

  const [decision, setDecision] = useState<string | null>(null);

  // Calculate Weighted Average
  const averageScore = Number((
    (scores.founderPotential +
     scores.problemQuality +
     scores.marketOpportunity +
     scores.executionProbability +
     scores.aiDifferentiation +
     scores.productVision +
     scores.hub71Fit +
     scores.investorAppeal) / 8
  ).toFixed(2));

  return (
    <div className="bg-slate-900 text-white border border-slate-850 rounded-2xl shadow-xl p-8 space-y-8" id="hub71-board-root">
      
      {/* Header Panel */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] text-emerald-400 font-mono tracking-widest block uppercase font-bold">ABU DHABI OUTPOST REVIEW FEED</span>
          <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Hub71 Accelerator Selection Scorecard
          </h2>
        </div>
        
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">WEIGHTED GRADE</span>
          <span className="block text-3xl font-extrabold text-white leading-none tracking-tight">{averageScore} / 10.0</span>
        </div>
      </div>

      {/* Two Columns Grid: Metrics & Evaluators logs */}
      <div className="grid grid-cols-2 gap-8 align-top">
        
        {/* Slide Sliders of standard parameters */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase text-slate-400 font-bold block">1. Active Selection Criteria</h3>
          
          <div className="space-y-3">
            {[
              { key: "founderPotential", label: "Founder Technical Potential (Cyber student)", desc: "Exhibits deep technical skill under local security frameworks" },
              { key: "problemQuality", label: "Pain Point Intensity", desc: "Fines representing direct SME capital loss are highly urgent issues" },
              { key: "marketOpportunity", label: "GCC SAM/SOM Market Size", desc: "UAE/KSA SME operational software SAM represents billions" },
              { key: "executionProbability", label: "Smallest MVP Executability", desc: "V1 scope restricts itself safely to high-margin automation" },
              { key: "aiDifferentiation", label: "Cognitive Layer Efficiency", desc: "Gemini document analysis delivers verified immediate utility" }
            ].map(crit => (
              <div key={crit.key} className="text-xs space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="font-semibold text-slate-300">{crit.label}:</span>
                  <span className="font-bold text-emerald-400">{(scores as any)[crit.key]} / 10.0</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="10" 
                  step="0.1"
                  value={(scores as any)[crit.key]} 
                  onChange={(e) => setScores({ ...scores, [crit.key]: Number(e.target.value) })}
                  className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-[10px] text-slate-500 block leading-none">{crit.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Written evaluation reviews & Decision block */}
        <div className="space-y-5 flex flex-col justify-between">
          
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-slate-400 font-bold block">2. Jury Consensus Reviewer Notes</h3>
            
            <div className="p-4 bg-slate-950 border border-slate-805 rounded-xl space-y-2.5 text-xs text-slate-305 text-slate-400">
              <div className="leading-relaxed border-b border-slate-800 pb-2.5">
                <span className="font-bold text-slate-200 block">Jury member #1 (VC Partner, Sequoia-backed setup):</span>
                "Perfect setup discipline. Most AI startups in Hub71 build fancy but useless ChatGPT UI wrappers. ComplianceOS targets actual financial pain (government late fees). Real customers interviewed. Smallest possible MVP. Absolute acceptance priority."
              </div>
              <div className="leading-relaxed">
                <span className="font-bold text-slate-200 block">Jury member #2 (Sovereign Wealth Director, Abu Dhabi):</span>
                "Emiratisation is a multi-billion scale compliance pressure. The fact that this student integrates MoHRE-accurate Golden Visa guidance and WPS checks is outstanding. Hub71 has massive partner relationships to scale this across ADGM."
              </div>
            </div>
          </div>

          {/* Interactive Decision triggers */}
          <div className="border border-slate-800 bg-slate-950/40 p-5 rounded-xl space-y-3.5">
            <span className="text-[10px] font-mono text-slate-400 font-semibold block uppercase leading-none">Jury Final Consensus decision:</span>
            
            {decision ? (
              <div className="p-3 bg-emerald-950/25 border border-emerald-900/60 rounded-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-white block">Status Updated: {decision}</span>
                  <span className="text-slate-400 block mt-0.5">Notification dispatched to founder సిద్ధार्थ via Hub71 founder center.</span>
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setDecision("Approve In-Principle UAE Soft Launch Grant")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3.5 rounded-lg transition"
                >
                  Approve Seed Capital
                </button>
                <button 
                  onClick={() => setDecision("Schedule Final Founder Interview")}
                  className="bg-slate-800 hover:bg-slate-705 text-slate-250 hover:bg-slate-750 text-slate-300 text-xs font-bold py-2 px-3.5 rounded-lg transition"
                >
                  Request Founder Meeting
                </button>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
