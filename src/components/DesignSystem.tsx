/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Settings, RefreshCw, Layers, Check, Sparkles } from "lucide-react";

export default function DesignSystem() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8 space-y-8" id="design-system-root">
      
      {/* Top Header */}
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-500" />
          Figma Design System Token Guide
        </h2>
        <p className="text-xs text-slate-500 max-w-xl">
          Designed off speaking with SME operators, our digital environment matches the exact operational interfaces of Stripe, Linear, and Deel. Pristine layout guidelines built to look like a premium enterprise startup.
        </p>
      </div>

      {/* Grid of design components */}
      <div className="grid grid-cols-2 gap-8">
        
        {/* Colors and Theme definitions */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase text-slate-400 font-bold">1. Typography Pairing & Colors</h3>
          
          {/* Typo list */}
          <div className="space-y-2 text-xs">
            <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono">PRIMARY DISPLAY HEADING</span>
              <span className="font-bold text-lg text-slate-900 font-sans tracking-tight block mt-0.5">ABC Trading LLC</span>
              <p className="text-[10px] text-slate-550 mt-1 text-slate-500">Font: Inter / Outfits – clean, versatile, high tracking density.</p>
            </div>
            
            <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono">LEGISLATION / ADVISORY SERIF TEXT</span>
              <p className="font-serif text-sm text-slate-800 leading-relaxed block mt-0.5">
                "Subject to Decree Law No. 47 on Corporate Tax, businesses are entitled toclaim Small Business Relief values."
              </p>
              <p className="text-[10px] text-slate-500 mt-1">Font: Playfair / Georgia – establishes highly reliable legal authority tone.</p>
            </div>

            <div className="p-3 border border-slate-100 bg-slate-50/50 rounded-lg font-mono">
              <span className="text-[10px] text-slate-400 block font-mono">STRUCTURED DATA & TRANSACTION VALUES</span>
              <span className="text-xs font-bold text-slate-900 block mt-0.5">DET-847291-EXP • TRN: 100293184729003</span>
              <span className="text-[10px] text-slate-500 mt-1">Font: JetBrains Mono – perfect for numeric hashes, IBAN references.</span>
            </div>
          </div>

          {/* Core Palette chips */}
          <div className="space-y-2 mt-4">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">Palette Token Arrays</span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
              <div className="p-3 bg-slate-950 text-white rounded-lg">
                <span className="block font-bold">Slate Black</span>
                <span>#0b0f19</span>
              </div>
              <div className="p-3 bg-emerald-600 text-white rounded-lg">
                <span className="block font-bold font-semibold">Emerald</span>
                <span>#059669</span>
              </div>
              <div className="p-3 bg-amber-500 text-slate-950 rounded-lg">
                <span className="block font-bold">Amber Gold</span>
                <span>#f59e0b</span>
              </div>
              <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
                <span className="block font-bold">Soft Gray</span>
                <span>#f3f4f6</span>
              </div>
            </div>
          </div>
        </div>

        {/* UI Component Layouts */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase text-slate-400 font-bold">2. Figma Buttons & Components Reference</h3>
          
          {/* Interactive Button catalog */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3.5">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Active Button Classes</span>
            
            <div className="flex flex-wrap gap-2">
              <button className="bg-slate-950 hover:bg-slate-800 text-white font-semibold text-xs py-2 px-3.5 rounded-lg transition">
                Primary Button
              </button>
              
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs py-2 px-3.5 rounded-lg transition">
                Action Successful
              </button>

              <button className="bg-rose-50 border border-rose-100 text-rose-600 font-semibold text-xs py-2 px-3.5 rounded-lg transition hover:bg-rose-100/50">
                Critical Danger
              </button>

              <button className="text-slate-600 hover:text-slate-900 border border-slate-200 bg-white font-semibold text-xs py-2 px-3.5 rounded-lg transition-all">
                Ghost Border
              </button>
            </div>
          </div>

          {/* Input component */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-[10px] text-slate-400 font-mono uppercase block">Figma Standard Form Fields</span>
            
            <div>
              <label className="text-[10px] text-slate-450 block uppercase font-mono mb-1">Company Trade License Input</label>
              <input 
                type="text" 
                defaultValue="DET-847291-EXP" 
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-emerald-500"
                disabled
              />
            </div>
          </div>

          {/* Spacing grids */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 leading-relaxed text-slate-600">
            <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1">Grid & Alignment Principles</span>
            <div>• <strong>Sidebar Boundary:</strong> Fixed 256px wide, custom slate.</div>
            <div>• <strong>Main Content Gaps:</strong> Flexible p-8 layout boundary, flex-column layout.</div>
            <div>• <strong>Bento Card Gap:</strong> Gap-6 density grid (24px space), subtle gray rings.</div>
          </div>
        </div>

      </div>

    </div>
  );
}
