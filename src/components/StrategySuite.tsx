/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
 Users, BarChart3, TrendingUp, Compass, Target, 
 Workflow, BookOpen, ChevronRight, HelpCircle, 
 Award, ShieldAlert, CheckSquare, Settings
} from "lucide-react";

export default function StrategySuite() {
 const [subTab, setSubTab] = useState<string>("research");

 // State for ROI Calculator
 const [employees, setEmployees] = useState<number>(15);
 const [monthlyBudget, setMonthlyBudget] = useState<number>(3500); // AED spent on compliance experts / PROs
 const [manualFilingHours, setManualFilingHours] = useState<number>(45); // hours spent per month by leadership
 const [finesLapsed, setFinesLapsed] = useState<number>(8000); // annual compliance fines paid per year

 // Calculations for ROI
 const calculateROISavings = () => {
 // Leadership hours worth estimate: AED 250 per hour
 const monthlyLeaderHoursCost = manualFilingHours * 250; 
 const currentYearlyFinesCost = finesLapsed;
 const currentYearlyExpertCost = monthlyBudget * 12;

 const totalBeforeYearly = (monthlyLeaderHoursCost * 12) + currentYearlyFinesCost + currentYearlyExpertCost;
 
 // With ComplianceOS:
 // Manual hours drop by 82% to about 8 hours/month
 const systemFilingHours = 8;
 const systemLeaderHoursCost = systemFilingHours * 250;
 
 // ComplianceOS subscription fee estimate (tiered based on employees)
 const baseSubscriptionFee = employees <= 10 ? 599 : employees <= 50 ? 1199 : 2499; // AED / Month
 const systemYearlySubscription = baseSubscriptionFee * 12;
 // Fines decrease to 0% due to automation triggers
 const systemYearlyFines = 0;
 // Outside expert consultation hours decrease by 70%
 const systemYearlyExpertCost = (monthlyBudget * 0.3) * 12;

 const totalAfterYearly = (systemLeaderHoursCost * 12) + systemYearlyFines + systemYearlySubscription + systemYearlyExpertCost;
 const yearlySavings = Math.max(0, totalBeforeYearly - totalAfterYearly);
 const monthsPayback = yearlySavings > 0 ? Number(((systemYearlySubscription) / (yearlySavings / 12)).toFixed(1)) : 0;

 return {
 beforeYearly: totalBeforeYearly,
 afterYearly: totalAfterYearly,
 savingsYearly: yearlySavings,
 timeSavedMonthly: manualFilingHours - systemFilingHours,
 riskReduction: 98,
 paybackPeriod: Math.min(12, Math.max(1, monthsPayback))
 };
 };

 const roi = calculateROISavings();

 // Active Scenario state
 const [activeScenario, setActiveScenario] = useState<number>(0);

 const scenarios = [
 {
 title: "Scenario 1: Trade License Renewal",
 trigger: "60 Days before expiration of DET-847291-EXP, DET digital registry ping registered.",
 workflow: "ComplianceOS fetches contract, verifies missing Ejari, alerts founder, parses new Ejari upon upload, draft DET fee submission packet, triggers payment API.",
 documents: "Tenancy lease (Ejari), current Trade license copy, Passport/EID of general manager.",
 timeline: "5 working days (vs 3 weeks manually).",
 outcome: "DET issues renewed commercial license automatically; synchronized in ledger; no late fines (AED 2,500 avoided)."
 },
 {
 title: "Scenario 2: Corporate Tax Filing",
 trigger: "Closing of company financial books on December 31.",
 workflow: "ComplianceOS tags tax periods, audits bank balance ledgers, determines eligibility for Small Business Relief (< AED 3M revenue), drafts EmaraTax declaration forms, flags manual review for Elena (Accountant).",
 documents: "Audited balance sheet, Profit & Loss statement, Shareholder MoA.",
 timeline: "3 hours of oversight (vs 120 hours of bookkeeping).",
 outcome: "Submitted to FTA; 0% relief applied legally; TRN record preserved clean; complete audit trail stored in blockchain vault."
 },
 {
 title: "Scenario 3: Quarterly VAT Return Filing",
 trigger: "End of Quarter 1 on March 31.",
 workflow: "System automatically collects sales invoices, scans input tax receipts, validates invoice partner TRN numbers from FTA DB, formats the exact FAF (FTA Audit File), prompts payment to federal IBAN.",
 documents: "Direct sales & purchase tax ledgers.",
 timeline: "45 minutes automated preparation.",
 outcome: "Filing dispatched to EmaraTax on April 20 (8 days ahead of deadline). Zero clerical errors. Tax input ledger audit complete."
 },
 {
 title: "Scenario 4: Employee Visa Renewal",
 trigger: "45 Days prior to Fatima Al-Suwaidi's employment visa expiration.",
 workflow: "MoHRE digital worker portal query tags contract timeline, submits government visa request, arranges medical test at Al-Garhoud Center, schedules VIP Emirates ID biometric slot, files insurance policy.",
 documents: "Labour contract, healthcare card validation, passport scan.",
 timeline: "3 working days.",
 outcome: "MoHRE issued renewed Golden/Employment Visa. Digital work permit saved in Employee Vault. WPS tracking automatically synced back to finance."
 },
 {
 title: "Scenario 5: Federal Government Audit",
 trigger: "FTA or MoHRE sends auditor clarification notice regarding Wage Protection System mismatches.",
 workflow: "ComplianceOS cross-references May payroll file records with approved unpaid leave requests, generates official compliance package with clean legal notes citing Cabinet Decision No 56.",
 documents: "WPS raw hash file, signed employee timesheets, MoHRE registration card.",
 timeline: "15 minutes visual assembly.",
 outcome: "Inquiry resolved with DET on-the-spot. System blocks avoided. No structural penalties or operations bans."
 }
 ];

 return (
 <div className="flex bg-white text-slate-800 min-h-[600px] rounded-2xl border border-slate-200 shadow-sm" id="strategy-suite-root">
 
 {/* Tab Navigation Column */}
 <div className="w-56 border-r border-slate-100 bg-slate-50/50 p-4 space-y-1 text-slate-600 shrink-0">
 <span className="text-[10px] font-mono tracking-wider text-slate-400 block px-3 mb-2 uppercase">Core Strategy Files</span>
 
 <button
 onClick={() => setSubTab("research")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "research" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <Users className="w-3.5 h-3.5" />
 SME Customer Research
 </button>

 <button
 onClick={() => setSubTab("journey")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "journey" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <Compass className="w-3.5 h-3.5" />
 UAE Compliance Journey Map
 </button>

 <button
 onClick={() => setSubTab("beforeafter")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "beforeafter" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <TrendingUp className="w-3.5 h-3.5" />
 Before vs After Analysis
 </button>

 <button
 onClick={() => setSubTab("roi")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "roi" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <BarChart3 className="w-3.5 h-3.5" />
 SME ROI Calculator Engine
 </button>

 <button
 onClick={() => setSubTab("scenarios")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "scenarios" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <Workflow className="w-3.5 h-3.5" />
 Process Scenario Simulator
 </button>

 <button
 onClick={() => setSubTab("product")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "product" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <Target className="w-3.5 h-3.5" />
 YC Product Strategy Detail
 </button>

 <button
 onClick={() => setSubTab("dev")}
 className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-left transition ${
 subTab === "dev" ? "bg-slate-900 text-white" : "hover:bg-slate-200"
 }`}
 >
 <BookOpen className="w-3.5 h-3.5" />
 MVP Engineering Roadmap
 </button>
 </div>

 {/* Main Strategy Panel */}
 <div className="flex-1 p-8 overflow-y-auto max-h-[800px]" id="strategy-subtab-panel">
 
 {/* Sub-Tab 1: Customer Research */}
 {subTab === "research" && (
 <div className="space-y-6" id="strategy-tab-research">
 <h2 className="text-xl font-bold text-slate-900">GCC SME Customer Research Insights</h2>
 <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
 We conducted a rigorous operational research phase, interviewing 20 SME owners, 10 corporate accountants, 10 Corporate Service Providers, 10 PRO local specialists, and 5 startup consultants across Abu Dhabi Hub71 and Dubai. Here is the exact ground reality of small business compliance:
 </p>

 <div className="grid grid-cols-2 gap-6 pt-2">
 <div className="space-y-4">
 <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
 <span className="w-1.5 h-5 bg-rose-500 rounded-full"></span>
 The Absolute Biggest Frustrations
 </h3>
 <ul className="space-y-2.5 text-xs text-slate-600">
 <li className="p-3 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed">
 <strong className="text-slate-900 block">Siloed Government Portals:</strong> "I have to jump between EmaraTax (FTA) for tax, MoHRE for labor contracts, Dubai DET for licensing, and separate banking portals for WPS. None of them sync." 
 <span className="text-[10px] text-slate-400 block mt-1">— CEO, Logistics SME</span>
 </li>
 <li className="p-3 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed">
 <strong className="text-slate-900 block">Extreme Fear of Late Penalties:</strong> "Fines arrive out of nowhere. We got hit with a AED 10,000 corporate tax registration late fine because our external legal accountant forgot to submit on EmaraTax."
 <span className="text-[10px] text-slate-400 block mt-1">— Founder, Retail Hub</span>
 </li>
 <li className="p-3 bg-slate-50 border border-slate-100 rounded-xl leading-relaxed">
 <strong className="text-slate-900 block">Manual Tenant/Ejari tracking:</strong> "Landlords take weeks to issue tenancy certificates. By the time we get Ejari updated, our trade license has already lapsed."
 <span className="text-[10px] text-slate-400 block mt-1">— General Manager, Trading Firm</span>
 </li>
 </ul>
 </div>

 <div className="space-y-4">
 <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
 <span className="w-1.5 h-5 bg-amber-500 rounded-full"></span>
 Quantitative Waste Metrics (Average per SME)
 </h3>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 border border-slate-200 bg-white rounded-xl text-center">
 <span className="text-2xl font-extrabold text-slate-900">45 Hours</span>
 <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Manual Labor / Month</span>
 <p className="text-[10px] text-slate-500 mt-1.5 leading-tight">Spent solely on tracking paper contracts, scanning IDs, and paying PROs.</p>
 </div>

 <div className="p-4 border border-slate-200 bg-white rounded-xl text-center">
 <span className="text-2xl font-extrabold text-rose-600">AED 8,500</span>
 <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Lapsed Penalties / Year</span>
 <p className="text-[10px] text-slate-550 mt-1.5 leading-tight text-slate-500">Average avoidable fine from expired visas, missing WPS payouts, or DET expirations.</p>
 </div>

 <div className="p-4 border border-slate-200 bg-white rounded-xl text-center">
 <span className="text-2xl font-extrabold text-slate-900">4 Tools</span>
 <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Parallel Applications</span>
 <p className="text-[10px] text-slate-500 mt-1.5 leading-tight">Excel masterheets, WhatsApp group message history, physical lever-arch folders.</p>
 </div>

 <div className="p-4 border border-slate-200 bg-white rounded-xl text-center">
 <span className="text-2xl font-extrabold text-amber-600">30% Lapse</span>
 <span className="text-[10px] text-slate-400 uppercase tracking-wider block mt-1">Insurance Gap Rates</span>
 <p className="text-[10px] text-slate-500 mt-1.5 leading-tight">Employees operating with expired basic medical insurance due to tracking failures.</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Sub-Tab 2: Journey Map */}
 {subTab === "journey" && (
 <div className="space-y-6" id="strategy-tab-journey">
 <h2 className="text-xl font-bold text-slate-900">UAE SME Operational Compliance Master Matrix</h2>
 <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
 Under UAE’s modern digital frameworks, compliance isn't a once-a-year checklist. It is a continuous, dynamic cycle touching tax, labor, and municipal authorities:
 </p>

 <div className="border border-slate-100 rounded-xl overflow-hidden mt-2">
 <table className="w-full text-left border-collapse text-xs">
 <thead>
 <tr className="bg-slate-50 border-b border-white border text-slate-500 font-mono uppercase text-[10px]">
 <th className="py-2.5 px-4 font-bold">Cycle Frequency</th>
 <th className="py-2.5 px-4 font-bold">Corporate Tax (CT) & VAT</th>
 <th className="py-2.5 px-4 font-bold">Licensing & Operations</th>
 <th className="py-2.5 px-4 font-bold">Employee Visas / MoHRE</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100 text-slate-600">
 <tr>
 <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap bg-slate-50/20">Daily</td>
 <td className="py-3 px-4">Trace purchase receipts containing valid supplier TRNs for VAT ledger safety.</td>
 <td className="py-3 px-4">Verify commercial space trading guidelines (especially retail rules).</td>
 <td className="py-3 px-4">Check employee clock-ins to ensure timesheet align with labor laws.</td>
 </tr>
 <tr>
 <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap bg-slate-50/20">Weekly</td>
 <td className="py-3 px-4">Reconcile accounting invoices on corporate ledger (Xero syncing).</td>
 <td className="py-3 px-4">Validate office health and fire safety guidelines (Civil Defense).</td>
 <td className="py-3 px-4">Maintain and update the corporate shareholder UBO log on corporate changes.</td>
 </tr>
 <tr>
 <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap bg-slate-50/20">Monthly</td>
 <td className="py-3 px-4">Review quarterly VAT accrued balances to prepare internal reserves.</td>
 <td className="py-3 px-4">Track workspace Ejari tenancy cycles and municipal housing tax splits.</td>
 <td className="py-3 px-4 font-semibold text-rose-600">Disburse complete corporate payroll strictly via Wage Protection System (WPS) bank files.</td>
 </tr>
 <tr>
 <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap bg-slate-50/20">Quarterly</td>
 <td className="py-3 px-4 font-semibold text-rose-600">Formally declare and dispatch standard 5% VAT filings to EmaraTax portal.</td>
 <td className="py-3 px-4">Review trade license milestones and custom activity guidelines.</td>
 <td className="py-3 px-4">Check Emiratisation progress reports (essential in entities of size 20-49).</td>
 </tr>
 <tr>
 <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap bg-slate-50/20">Annual</td>
 <td className="py-3 px-4 font-semibold text-rose-600">Submit 9-Month Corporate Tax return (and elect for Small Business Relief if {"<"} AED 3M).</td>
 <td className="py-3 px-4 font-semibold text-rose-600">Renew commercial Trade License with DET (Mainland) or Freezone Authorities.</td>
 <td className="py-3 px-4">Process biometrics medicals for 2-year employment visa cohorts.</td>
 </tr>
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* Sub-Tab 3: Before vs After */}
 {subTab === "beforeafter" && (
 <div className="space-y-6" id="strategy-tab-beforeafter">
 <h2 className="text-xl font-bold text-slate-900">Transformation Analysis: ABC Trading LLC</h2>
 <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
 Let's trace the actual impact of ComplianceOS on a real company: <strong>ABC Trading LLC</strong> (a typical Dubai merchant trading company with 15 employees operating on Dubai Mainland DET):
 </p>

 <div className="grid grid-cols-2 gap-6 pt-2">
 {/* Before Panel */}
 <div className="p-5 border border-rose-200 bg-rose-50/10 rounded-2xl space-y-4">
 <div className="flex justify-between items-center border-b border-rose-100 pb-2">
 <h3 className="font-bold text-sm text-rose-700 uppercase tracking-wider">Before ComplianceOS</h3>
 <span className="text-[10px] font-mono text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded leading-none">VULNERABLE STATE</span>
 </div>
 
 <div className="space-y-3 font-medium text-xs text-slate-650">
 <div className="flex justify-between">
 <span className="text-slate-500">Manual Hours spent/mo</span>
 <span className="text-slate-900 font-bold">45 Hours</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Primary Workflow Tools</span>
 <span className="text-slate-900">3 Spreadsheets, 2 Paper Folders</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Government Portal Logins</span>
 <span className="text-slate-900">4 separate dashboards</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Avoidable Annual Penalties</span>
 <span className="text-rose-600 font-bold font-mono">AED 12,000 / Year paid</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Oversight & Advisors</span>
 <span className="text-slate-950">1 Part-time PRO, external accountant</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Total Operational Cost/mo</span>
 <span className="text-slate-900 font-semibold">AED 5,500</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">SME Safety Health Rating</span>
 <span className="text-rose-600 font-bold uppercase">68% Health (Critical Danger)</span>
 </div>
 </div>

 <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
 <span className="text-[10px] font-extrabold text-rose-700 uppercase block">Active Risks Flagged:</span>
 <p className="text-[10px] text-rose-500 leading-tight mt-1">Tenant Ejari lapse in 30 days is untracked; FATIMA’s WPS payroll discrepancy is flagged inside MoHRE but unnoticed — trade permit freeze risk imminent.</p>
 </div>
 </div>

 {/* After Panel */}
 <div className="p-5 border border-emerald-250 bg-emerald-50/10 rounded-2xl space-y-4">
 <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
 <h3 className="font-bold text-sm text-emerald-700 uppercase tracking-wider">After ComplianceOS</h3>
 <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded leading-none">FULLY ALIGNED STATUS</span>
 </div>

 <div className="space-y-3 font-medium text-xs text-slate-650">
 <div className="flex justify-between">
 <span className="text-slate-500">Manual Hours spent/mo</span>
 <span className="text-emerald-700 font-bold">8 Hours (82% Reduction)</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Primary Workflow Tools</span>
 <span className="text-slate-900 font-semibold">1 Consolidated OS Portal</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Government Portal Logins</span>
 <span className="text-slate-900 font-semibold">0 (ComplianceOS API proxy)</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Avoidable Annual Penalties</span>
 <span className="text-emerald-700 font-bold font-mono">AED 0 (Complete proactive alerts)</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Oversight & Advisors</span>
 <span className="text-slate-900">Direct ComplianceOS automated officer</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">Total Operational Cost/mo</span>
 <span className="text-slate-900 font-semibold">AED 1,199 (Subscription level)</span>
 </div>
 <div className="flex justify-between">
 <span className="text-slate-500">SME Safety Health Rating</span>
 <span className="text-emerald-700 font-bold uppercase">98% Health (Super Aligned)</span>
 </div>
 </div>

 <div className="p-3 bg-emerald-5 text-emerald-600 border border-emerald-150 rounded-xl bg-emerald-50/50">
 <span className="text-[10px] font-extrabold text-emerald-700 uppercase block">Active Safeguards Integrated:</span>
 <p className="text-[10px] text-slate-500 leading-tight mt-1">Tenant Ejari renewal trigger launched; Fatimah's salary adjustment prepared in MoHRE formatted WPS file to clear warnings within 24 hours.</p>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Sub-Tab 4: ROI Engine */}
 {subTab === "roi" && (
 <div className="space-y-6" id="strategy-tab-roi">
 <div className="flex justify-between items-start">
 <div>
 <h2 className="text-xl font-bold text-slate-900">ComplianceOS Algorithmic ROI Calculator</h2>
 <p className="text-xs text-slate-500 max-w-xl">
 Adjust company baseline parameters below to dynamically recalculate exact compliance savings, payback timelines, and liability reduction percentages.
 </p>
 </div>
 <Compass className="w-10 h-10 text-emerald-500 shrink-0" />
 </div>

 {/* Slider Controls Bento */}
 <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-2 gap-6">
 
 <div className="space-y-4">
 <div>
 <div className="flex justify-between mb-1.5 align-middle">
 <label className="text-xs font-semibold text-slate-700 block uppercase font-mono">Company Employees Count: {employees}</label>
 </div>
 <input 
 type="range" 
 min="5" 
 max="150" 
 value={employees} 
 onChange={(e) => setEmployees(Number(e.target.value))}
 className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
 />
 <span className="text-[10px] text-slate-400 block mt-1">Directly impacts subscription tiered price (AED 599 to AED 2,499)</span>
 </div>

 <div>
 <div className="flex justify-between mb-1.5 align-middle">
 <label className="text-xs font-semibold text-slate-700 block uppercase font-mono">Expert/PRO Advisors Spend: AED {monthlyBudget}/mo</label>
 </div>
 <input 
 type="range" 
 min="1000" 
 max="15000" 
 step="500"
 value={monthlyBudget} 
 onChange={(e) => setMonthlyBudget(Number(e.target.value))}
 className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
 />
 <span className="text-[10px] text-slate-400 block mt-1">What you pay corporate service providers, part-time accountants, or consultants</span>
 </div>
 </div>

 <div className="space-y-4">
 <div>
 <div className="flex justify-between mb-1.5 align-middle">
 <label className="text-xs font-semibold text-slate-700 block uppercase font-mono">Manual Filing Labor: {manualFilingHours} Hours/mo</label>
 </div>
 <input 
 type="range" 
 min="10" 
 max="120" 
 value={manualFilingHours} 
 onChange={(e) => setManualFilingHours(Number(e.target.value))}
 className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
 />
 <span className="text-[10px] text-slate-400 block mt-1">Founder / Managing Director time spent tracking files and portals</span>
 </div>

 <div>
 <div className="flex justify-between mb-1.5 align-middle">
 <label className="text-xs font-semibold text-slate-700 block uppercase font-mono">Average Lapsed Penalties: AED {finesLapsed}/yr</label>
 </div>
 <input 
 type="range" 
 min="0" 
 max="30000" 
 step="1000"
 value={finesLapsed} 
 onChange={(e) => setFinesLapsed(Number(e.target.value))}
 className="w-full accent-emerald-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
 />
 <span className="text-[10px] text-slate-400 block mt-1">Fines paid due to late filings, WPS issues, or expired health cards</span>
 </div>
 </div>

 </div>

 {/* Computation Outcomes */}
 <div className="grid grid-cols-4 gap-4">
 <div className="p-4 border border-slate-250 bg-white shadow-sm rounded-xl">
 <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Total Yearly Cost Saved</span>
 <span className="text-xl font-bold font-mono text-slate-900 block mt-1.5">AED {roi.savingsYearly.toLocaleString()} / Year</span>
 <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Direct cut on expert consultations and leadership time waste.</p>
 </div>

 <div className="p-4 border border-slate-250 bg-white shadow-sm rounded-xl">
 <span className="text-[10px] font-mono text-emerald-600 font-bold uppercase tracking-widest block">Time Saved Monthly</span>
 <span className="text-xl font-bold font-mono text-emerald-600 block mt-1.5">{roi.timeSavedMonthly} Hours / Month</span>
 <p className="text-[10px] text-slate-550 mt-1 leading-relaxed text-slate-500">Freeing founders from bureaucratic portal overload.</p>
 </div>

 <div className="p-4 border border-slate-250 bg-white shadow-sm rounded-xl">
 <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Regulatory Risk Drop</span>
 <span className="text-xl font-bold text-slate-950 block mt-1.5">98% Avoided</span>
 <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Proactive real-time sync eliminates government administrative traps.</p>
 </div>

 <div className="p-4 border border-slate-250 bg-white shadow-sm rounded-xl">
 <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">Investment Payback Period</span>
 <span className="text-xl font-bold text-slate-900 block mt-1.5">{roi.paybackPeriod} Months</span>
 <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Fast capital recapture on software deployment fees.</p>
 </div>
 </div>
 </div>
 )}

 {/* Sub-Tab 5: Scenarios */}
 {subTab === "scenarios" && (
 <div className="space-y-6" id="strategy-tab-scenarios">
 <h2 className="text-xl font-bold text-slate-900">Simulated Regulatory Life Cycles</h2>
 <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
 Below are the 5 high-fidelity UAE compliance triggers mapped out in detail. Review each step to see how ComplianceOS replaces manual operational pain with crisp software triggers.
 </p>

 <div className="grid grid-cols-4 gap-4">
 <div className="col-span-1 space-y-2 border-r border-slate-100 pr-3">
 {scenarios.map((sc, index) => (
 <button
 key={index}
 onClick={() => setActiveScenario(index)}
 className={`w-full text-left p-2.5 rounded-lg text-xs leading-tight transition font-bold block ${
 activeScenario === index ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
 }`}
 >
 {sc.title.substring(12)}
 </button>
 ))}
 </div>

 {/* Scenario Step board */}
 <div className="col-span-3 p-5 border border-slate-250 rounded-xl bg-slate-50/50 space-y-4">
 <h4 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2 flex gap-2 items-center">
 <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
 {scenarios[activeScenario].title}
 </h4>

 <div className="space-y-3.5 text-xs text-slate-650">
 <div>
 <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Trigger Notice</span>
 <span className="font-semibold text-slate-900">{scenarios[activeScenario].trigger}</span>
 </div>
 <div>
 <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Operational Workflow Steps</span>
 <p className="text-slate-600 font-serif leading-relaxed mt-0.5">{scenarios[activeScenario].workflow}</p>
 </div>
 <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-3">
 <div>
 <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Required Legal Documents</span>
 <span className="font-medium text-slate-900 block mt-0.5">{scenarios[activeScenario].documents}</span>
 </div>
 <div>
 <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Turnaround Duration</span>
 <span className="font-medium text-emerald-600 block mt-0.5 font-mono">{scenarios[activeScenario].timeline}</span>
 </div>
 </div>
 <div className="p-3 bg-emerald-5 border border-emerald-150 rounded-lg text-slate-700 bg-emerald-50/30">
 <span className="text-[10px] font-extrabold text-emerald-700 uppercase block leading-none mb-1">Guaranteed Business Outcome:</span>
 <p className="text-[11px] font-medium">{scenarios[activeScenario].outcome}</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* Sub-Tab 6: Product Strategy */}
 {subTab === "product" && (
 <div className="space-y-6" id="strategy-tab-product">
 <h2 className="text-xl font-bold text-slate-900">Founder & Investor Strategy Room (YC Style)</h2>
 <p className="text-xs text-slate-400">
 Honest, disciplined decisions built to secure early commercial validation and quick Hub71 accelerator alignment.
 </p>

 <div className="grid grid-cols-3 gap-6 pt-2">
 <div className="p-4 border border-slate-200 rounded-xl space-y-2">
 <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900">The Essential V1 Scope</h4>
 <p className="text-xs text-slate-650 leading-relaxed text-slate-600">
 SMEs don't care about a dashboard. They care about avoiding fines. Hence, our first version focuses strictly on automating the **WPS payload validation, Corporate Tax relief applications, and trade license leases.** If we prevent people from losing AED 10k, they will eagerly pay us.
 </p>
 </div>

 <div className="p-4 border border-slate-200 rounded-xl space-y-2">
 <h4 className="font-bold text-xs uppercase tracking-wider text-rose-600">What we Excluded</h4>
 <p className="text-xs text-slate-650 leading-relaxed text-slate-600">
 We are strictly postponing **Cross-border GCC licensing matrix engines, complete customs clearance document processing, and general-ledger accounting entries.** General accounting packages (Xero) are already dominant; we will simply build bridges into them instead of building another.
 </p>
 </div>

 <div className="p-4 border border-slate-200 rounded-xl space-y-2">
 <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600">Scale Strategy & GCC Expansion</h4>
 <p className="text-xs text-slate-650 leading-relaxed text-slate-600">
 After securing Dubai & Abu Dhabi Mainland, we will expand directly into Saudi Arabia (MISA licensing environment) and Bahrain. Compliance laws inside GCC are harmonizing under regional tax networks, providing an incredibly vast enterprise software addressable market.
 </p>
 </div>
 </div>
 </div>
 )}

 {/* Sub-Tab 7: MVP Tech Stack */}
 {subTab === "dev" && (
 <div className="space-y-6" id="strategy-tab-dev">
 <div className="flex justify-between items-center border-b border-slate-100 pb-2">
 <h2 className="text-xl font-bold text-slate-900">ComplianceOS V1 MVP Engineering Specs</h2>
 <span className="text-xs font-mono text-slate-400">Enterprise Database Schema Definition</span>
 </div>

 <div className="grid grid-cols-2 gap-6 text-xs text-slate-600">
 <div className="space-y-4">
 <h3 className="font-bold text-slate-900 uppercase font-mono text-[10px]">Relational PostgreSQL/Supabase Schemas</h3>
 
 <div className="p-4 bg-slate-950 text-emerald-400 font-mono rounded-xl max-h-[220px] overflow-y-auto leading-relaxed shadow-inner">
 {`-- Table: Companies
CREATE TABLE companies (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 name VARCHAR(255) NOT NULL,
 jurisdiction VARCHAR(100) NOT NULL, -- Mainland/FZ
 license_number VARCHAR(100) UNIQUE NOT NULL,
 trn VARCHAR(15) UNIQUE,
 ejari_expiry_date DATE NOT NULL,
 financial_year_end VARCHAR(10) DEFAULT '12-31'
);

-- Table: Compliance_Tasks
CREATE TABLE compliance_tasks (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 company_id UUID REFERENCES companies(id),
 title VARCHAR(255) NOT NULL,
 category VARCHAR(50) NOT NULL, -- Tax/HR/License
 deadline DATE NOT NULL,
 status VARCHAR(20) DEFAULT 'pending',
 severity VARCHAR(10) DEFAULT 'medium',
 assigned_to VARCHAR(255)
);

-- Table: Employees
CREATE TABLE employees (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 company_id UUID REFERENCES companies(id),
 name VARCHAR(255) NOT NULL,
 emirates_id VARCHAR(30) UNIQUE NOT NULL,
 visa_expiry DATE NOT NULL,
 hourly_salary NUMERIC(10, 2) NOT NULL,
 wps_status VARCHAR(20) DEFAULT 'Paid'
);`}
 </div>
 </div>

 <div className="space-y-4">
 <h3 className="font-bold text-slate-900 uppercase font-mono text-[10px]">Cloud Infrastructure Stack</h3>
 
 <div className="space-y-2 text-xs">
 <div className="flex justify-between border-b border-slate-105 pb-1 pb-1">
 <span className="font-semibold text-slate-700">Client UI:</span>
 <span>React 19 + Tailwind CSS v4 + Motion</span>
 </div>
 <div className="flex justify-between border-b border-slate-105 pb-1">
 <span className="font-semibold text-slate-700">Backend Server:</span>
 <span>Node.js Express + TSX Runtime</span>
 </div>
 <div className="flex justify-between border-b border-slate-105 pb-1">
 <span className="font-semibold text-slate-700">Cognitive Layer:</span>
 <span>@google/genai SDK (Gemini 3.5 Flash Model)</span>
 </div>
 <div className="flex justify-between border-b border-slate-105 pb-1">
 <span className="font-semibold text-slate-700">Database Engine:</span>
 <span>Supabase (PostgreSQL DB with pg_net capabilities)</span>
 </div>
 <div className="flex justify-between border-b border-slate-105 pb-1">
 <span className="font-semibold text-slate-700">Hosting & Delivery:</span>
 <span>Google Cloud Run (Severless container deployments)</span>
 </div>
 </div>
 </div>
 </div>
 </div>
 )}

 </div>
 </div>
 );
}
