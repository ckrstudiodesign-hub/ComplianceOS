/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Play, SkipForward, RotateCcw, Award, Sparkles, AlertCircle, TrendingUp } from "lucide-react";

interface Step {
  title: string;
  speaker: string;
  duration: string;
  subs: string;
  actionGuide: string;
  highlightCategory: string;
}

const demoSteps: Step[] = [
  {
    title: "1. The Hook: SME Regulatory Chaos",
    speaker: "Solo Founder",
    duration: "0:00 - 0:45",
    subs: "Hello, Hub71 selection panel! I’m सिद्धार्थ, a cyber security student and founder of ComplianceOS. UAE SMEs are getting hit with massive administrative fines — often AED 10,000 to AED 20,000. Why? Because government portals do not sync. Trade licenses, MoHRE work permits, VAT and Corporate Tax require manual upkeep across four legacy interfaces. ComplianceOS merges all of this into a single, unified operating system.",
    actionGuide: "Observe the SME Control Center dashboard. Look at the UAE Safety Index rating of 72% showing critical action required.",
    highlightCategory: "Control Center"
  },
  {
    title: "2. The Crisis: The Untracked Expiration",
    speaker: "Solo Founder",
    duration: "0:45 - 1:30",
    subs: "In our control center, you can see Fatima Al-Suwaidi is flagged for a critical WPS wages mismatch inside MoHRE. Additionally, the trade license has only 30 days remaining because of an expired Ejari tenancy contract that the landlord delayed signing. In the manual world, these slip through the cracks until the bank blocks the SME’s accounts. On ComplianceOS, it is mapped onto a unified agenda.",
    actionGuide: "Select 'Compliance Tasks' in the left menu. Look at the pending checklist required under local guidelines.",
    highlightCategory: "Tasks"
  },
  {
    title: "3. The Magic: AI Document Audit",
    speaker: "Solo Founder",
    duration: "1:30 - 2:30",
    subs: "Here is the magic. Let's upload our new Ejari tenancy agreement received today. Watch standard OCR scan it. Over 80 attributes are parsed. The system verifies our landlord signature, compares lease windows with DED requirements, and clears the alert on EmaraTax. Our safety score instantly bounces back to green. Compliance is now a background thread.",
    actionGuide: "Go to 'Control Center' or 'Document Ledger', and look at the 'AI Document Audit Scanner' box to simulate an upload.",
    highlightCategory: "Document scan"
  },
  {
    title: "4. Cognitive Layer: The Legal Response Agent",
    speaker: "Solo Founder",
    duration: "2:30 - 4:00",
    subs: "What happens when government warnings do arrive? In our 'Corporate Inbox', a detailed Wage Protection System discrepancy is logged by MoHRE regarding Fatima. With one-click, ComplianceOS pulls the system's approved unpaid leave logs from May, crafts a customized legally dense response citing Cabinet Decision 56, and submits it to clear the warning. Real regulatory work done by intelligent agents.",
    actionGuide: "Click 'Corporate Inbox', select the MoHRE message, and choose 'Draft response with ComplianceOS AI' to see the generated outline.",
    highlightCategory: "Inbox / AI"
  },
  {
    title: "5. The Business Case: Massive SME Return-on-Investment",
    speaker: "Solo Founder",
    duration: "4:00 - 5:00",
    subs: "Our pricing scales simple: starting at AED 599 for micro firms up to AED 2,499 for mature SMEs. With ComplianceOS, we cut manual filing labor from 45 hours down to just 8 hours. Fines drop to zero. We save a firm AED 30,000+ annually in consulting hours and avoidable penalties. Compliance is transformed from a center of anxiety into a competitive asset. Join us in building the regulatory layer of the GCC.",
    actionGuide: "Explore the 'SME ROI Calculator Engine' slider to see custom yearly corporate returns.",
    highlightCategory: "ROI / Outcomes"
  }
];

export default function InvestorDemoPanel() {
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const nextStep = () => {
    setCurrentStepIdx((currentStepIdx + 1) % demoSteps.length);
  };

  const prevStep = () => {
    setCurrentStepIdx((currentStepIdx - 1 + demoSteps.length) % demoSteps.length);
  };

  const restartDemo = () => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6" id="investor-demo-panel">
      
      {/* Top Title Bar */}
      <div className="flex justify-between items-center border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] text-emerald-400 font-mono tracking-widest block uppercase font-bold">HUB71 SELECTION PITCH SYNC</span>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            Investor Demo Room (5-Minute Guided Pitch Tour)
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold font-mono font-mono">
            Pitch Step {currentStepIdx + 1} of {demoSteps.length}
          </span>
          <span className="text-[10px] bg-slate-800 text-emerald-400 font-bold px-2 py-0.5 rounded uppercase">
            {demoSteps[currentStepIdx].duration}
          </span>
        </div>
      </div>

      {/* Subtitles Console Grid */}
      <div className="grid grid-cols-3 gap-6 align-top">
        
        {/* Playback Controls & Subtitle block */}
        <div className="col-span-2 space-y-4">
          <div className="p-5 bg-slate-950 border border-slate-805 rounded-xl min-h-[160px] flex flex-col justify-between">
            <div className="text-slate-400 text-xs font-serif leading-relaxed italic">
              "{demoSteps[currentStepIdx].subs}"
            </div>
            
            <div className="text-[10px] font-mono text-emerald-500 font-bold tracking-wider mt-3 uppercase border-t border-slate-800/60 pt-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Presenter Character Vocals: {demoSteps[currentStepIdx].speaker}
            </div>
          </div>

          {/* Interactive Navigation Row */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button 
                onClick={prevStep}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1"
                disabled={currentStepIdx === 0}
              >
                Previous Step
              </button>
              
              <button 
                onClick={nextStep}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1"
              >
                {currentStepIdx === demoSteps.length - 1 ? "Loop Pitch" : "Next Pitch Step"}
                <SkipForward className="w-3 h-3" />
              </button>
            </div>

            <button 
              onClick={restartDemo}
              className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Restart Presentation
            </button>
          </div>
        </div>

        {/* Action Guide Bento for Pitch reviewer */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3.5">
          <div className="flex gap-2 items-center text-xs font-extrabold text-white uppercase font-mono border-b border-slate-800 pb-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Interactive Guide</span>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed italic">
            To experience the presentation's corresponding features, dismiss this slide suite and carry out the following action in the live tool:
          </p>

          <div className="p-3 bg-emerald-950/20 border border-emerald-900/60 text-emerald-400 rounded-lg text-xs font-medium">
            <strong>Target Action:</strong> {demoSteps[currentStepIdx].actionGuide}
          </div>

          <div className="text-[10px] text-slate-500 font-mono tracking-wider flex justify-between uppercase">
            <span>Visual Highlight:</span>
            <span className="font-bold text-slate-400 bg-slate-850 px-1 py-0.2 rounded font-semibold">{demoSteps[currentStepIdx].highlightCategory}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
