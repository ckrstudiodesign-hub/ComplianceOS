/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import {
 Shield, CheckCircle2, Clock, AlertTriangle, MessageSquare, FileText,
 Calendar, Inbox, Users, Building, Plus, Trash2, Search, ArrowRight,
 Upload, Download, Check, Sparkles, Filter, ChevronRight, Eye, RefreshCw,
 Compass, Award, TrendingUp
} from "lucide-react";
import { ComplianceTask, EmployeeRecord, ComplianceNotice, DocumentRecord } from "../types";
import StrategySuite from "./StrategySuite";

// Preloaded Realistic Data
const initialTasks: ComplianceTask[] = [
 {
 id: "task-1",
 title: "Approve Lease Tenancy (Ejari) for DET Review",
 category: "License",
 deadline: "2026-07-14",
 status: "pending",
 severity: "high",
 assignedTo: "Ahmed Al-Mansoori (Founder)",
 description: "Lease contract for the Al Quoz office space must be renewed and signed via Ejari system to enable Trade License renewal."
 },
 {
 id: "task-2",
 title: "Quarterly VAT Return Filing (Q1 2026)",
 category: "Tax",
 deadline: "2026-06-28",
 status: "pending",
 severity: "high",
 assignedTo: "Elena Petrova (Accountant)",
 description: "Prepare book ledgers and upload XML format tax declarations onto EmaraTax portal."
 },
 {
 id: "task-3",
 title: "Siddharth Kumar - Visa Medical Clearance",
 category: "HR",
 deadline: "2026-06-30",
 status: "completed",
 severity: "medium",
 assignedTo: "Sajid Khan (PRO Specialist)",
 description: "Arrange medical test and register biometrics at Al-Garhoud Preventive Medicine Centre."
 },
 {
 id: "task-4",
 title: "Update Corporate Tax EmaraTax Registration",
 category: "Corporate",
 deadline: "2026-09-30",
 status: "pending",
 severity: "medium",
 assignedTo: "Elena Petrova (Accountant)",
 description: "Register for Corporate Tax on EmaraTax. Mandatory even if applying for Small Business Relief."
 }
];

const initialEmployees: EmployeeRecord[] = [
 {
 id: "emp-1",
 name: "Siddharth Kumar",
 emiratesId: "784-1992-8410294-3",
 visaExpiry: "2026-07-02",
 workPermitStatus: "Active",
 wpsStatus: "Paid",
 salary: 12500,
 department: "Logistics"
 },
 {
 id: "emp-2",
 name: "Elena Petrova",
 emiratesId: "784-1988-9204128-1",
 visaExpiry: "2027-11-15",
 workPermitStatus: "Active",
 wpsStatus: "Paid",
 salary: 14000,
 department: "Finance"
 },
 {
 id: "emp-3",
 name: "Sajid Khan",
 emiratesId: "784-1995-1029481-9",
 visaExpiry: "2026-08-20",
 workPermitStatus: "Active",
 wpsStatus: "Paid",
 salary: 8000,
 department: "Operations"
 },
 {
 id: "emp-4",
 name: "Fatima Al-Suwaidi",
 emiratesId: "784-1999-0418471-5",
 visaExpiry: "2026-06-20", // Expiring very soon!
 workPermitStatus: "Pending Action",
 wpsStatus: "Discrepancy",
 salary: 11000,
 department: "Government Relations"
 }
];

const initialNotices: ComplianceNotice[] = [
 {
 id: "notice-1",
 sender: "Federal Tax Authority",
 subject: "Urgent: Complete Corporate Tax Registration Deadline",
 date: "2026-06-12",
 status: "unread",
 body: "Please be advised that pursuant to Federal Decree-Law No. 47 of 2022 on the Taxation of Corporations and Businesses, all taxable persons must submit their Corporate Tax registration by September 30, 2026. Failure to comply on time triggers an administrative penalty of AED 10,000.",
 actionRequired: "Submit tax registration via FTA EmaraTax Portal",
 requiresDocument: true,
 aiSuggestedDraft: "Drafting a formal extension request / submission outline to Elena Petrova: 'Dear Team, please prepare our Commercial License, Passport scans of Shareholders, and Memorandum of Association (MOA) for immediate submission on EmaraTax before next Monday to guarantee processing.'"
 },
 {
 id: "notice-2",
 sender: "Dubai DET",
 subject: "Notice of Impending Trade License Expiration - DET-847291-EXP",
 date: "2026-06-15",
 status: "unread",
 body: "The Department of Economy and Tourism (DET) hereby registers that Commercial License DET-847291-EXP for ABC Trading LLC is set to expire on 2026-07-15. Late renewal after the 15-day grace period carries an initial penalty of AED 2,500 and possible freezing of operations.",
 actionRequired: "Upload signed Ejari tenancy agreement and settle renewal fees of AED 8,450",
 requiresDocument: true,
 aiSuggestedDraft: "Draft email to landlord: 'Dear Landlord, as our trade license expires on July 15, we urgently require the signed Ejari renewal tenancy certificate. Please confirm when the system signature will be updated so we can finalize our DET commercial filing.'"
 },
 {
 id: "notice-3",
 sender: "MoHRE",
 subject: "WPS Discrepancy Notification: Fatima Al-Suwaidi",
 date: "2026-06-10",
 status: "read",
 body: "The Wage Protection System (WPS) auditor flagged a mismatch of pay. Contracted salary for Fatima Al-Suwaidi is AED 11,000, but the payroll file dispatched for May records AED 9,500. A block of work permit generation will result if this mismatch is not resolved or explained in 14 days.",
 actionRequired: "Provide MoHRE statement or dispatch supplementary wage payment of AED 1,500 via WPS",
 requiresDocument: false,
 aiSuggestedDraft: "Draft correction filing to MoHRE Portal: 'ABC Trading LLC submits this clarification. Employee Fatima Al-Suwaidi had 3 days of unpaid leave in May. We have attached the approved leave log. Please reconcile our WPS payroll file accordingly without system blockages.'"
 }
];

const initialDocs: DocumentRecord[] = [
 {
 id: "doc-1",
 name: "Commercial_Trade_License_2025_signed.pdf",
 type: "License",
 uploadedAt: "2025-07-15",
 status: "compliant",
 expiryDate: "2026-07-15",
 daysRemaining: 30,
 extractedFields: {
 licenseNumber: "DET-847291-EXP",
 jurisdiction: "Dubai Mainland (DET)",
 legalForm: "Limited Liability Company (LLC)",
 registeredAddress: "Showroom 4, Al Quoz Industrial 3, Dubai"
 }
 },
 {
 id: "doc-2",
 name: "VAT_Registration_Certificate_FTA.docx",
 type: "Tax",
 uploadedAt: "2024-11-20",
 status: "compliant",
 extractedFields: {
 trn: "100293184729003",
 effectiveDate: "2024-10-01",
 authority: "Federal Tax Authority"
 }
 },
 {
 id: "doc-3",
 name: "Siddharth_MoHRE_Labour_Contract.pdf",
 type: "HR",
 uploadedAt: "2024-07-01",
 status: "compliant",
 expiryDate: "2026-07-01",
 daysRemaining: 16,
 extractedFields: {
 contractType: "Limited / Single Term",
 salary: "AED 12,500",
 jobTitle: "Senior Logistics Coordinator"
 }
 }
];

const testimonials = [
  { name: "Ahmed M.", role: "Founder, Dubai Trading Co", text: "Avoided a AED 10,000 corporate tax fine. Seamless EmaraTax sync!", stars: "5.0", timeSaved: "Saved AED 10,000 & 40hrs/mo" },
  { name: "Sarah K.", role: "Operations Manager", text: "Automatically flagged our WPS discrepancies before the MoHRE audit.", stars: "4.5", timeSaved: "Saved 18hrs/mo" },
  { name: "Faisal A.", role: "CEO, Al Quoz Logistics", text: "Our trade license and Ejari are completely on autopilot now.", stars: "5.0", timeSaved: "Saved AED 2,500 in late fees" },
  { name: "Elena R.", role: "HR Director", text: "Visa renewals are tracked months in advance. Brilliant dashboard.", stars: "5.0", timeSaved: "Saved 25hrs/mo" },
  { name: "Tariq H.", role: "Owner, Boutique Retail", text: "The AI legal advisor is like having a PRO on call 24/7.", stars: "4.5", timeSaved: "Saved AED 5,000 on consultants" },
  { name: "Nadia S.", role: "Finance Lead", text: "Corporate tax filing takes minutes instead of weeks.", stars: "5.0", timeSaved: "Saved 50hrs/mo" },
  { name: "Omar B.", role: "General Manager", text: "Never missed a DET deadline since we installed ComplianceOS.", stars: "5.0", timeSaved: "Saved AED 8,000 in penalties" },
  { name: "Fatima J.", role: "Managing Partner", text: "One single dashboard instead of 5 government portals. A lifesaver.", stars: "4.5", timeSaved: "Saved 30hrs/mo" },
  { name: "Ali N.", role: "E-commerce Founder", text: "Instantly verified our VAT ledgers without an expensive auditor.", stars: "5.0", timeSaved: "Saved AED 15,000 in audit fees" },
  { name: "Rami E.", role: "Startup CEO", text: "We secured our Hub71 funding faster because our compliance was flawless.", stars: "5.0", timeSaved: "Priceless ROI" }
];

export default function SaaSApp() {
 const [activeTab, setActiveTab] = useState<string>("dashboard");
 
 const [tasks, setTasks] = useState<ComplianceTask[]>(() => {
 const saved = localStorage.getItem("complianceos_tasks");
 return saved ? JSON.parse(saved) : initialTasks;
 });
 const [employees, setEmployees] = useState<EmployeeRecord[]>(initialEmployees);
 const [notices, setNotices] = useState<ComplianceNotice[]>(initialNotices);
 const [docs, setDocs] = useState<DocumentRecord[]>(() => {
 const saved = localStorage.getItem("complianceos_docs");
 return saved ? JSON.parse(saved) : initialDocs;
 });

 // State for adding a task
 const [newTaskTitle, setNewTaskTitle] = useState("");
 const [newTaskCategory, setNewTaskCategory] = useState<"Tax" | "HR" | "License" | "Corporate">("Tax");
 const [newTaskDeadline, setNewTaskDeadline] = useState("2026-07-31");
 const [newTaskSeverity, setNewTaskSeverity] = useState<"high" | "medium" | "low">("medium");
 const [newTaskDesc, setNewTaskDesc] = useState("");

 // State for AI compliance advisor chat
 const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
 { role: "model", content: "Salam! I am your ComplianceOS AI Advisor. I am fully integrated into UAE corporate tax, labor laws (MoHRE), emiratisation mandates, and DED mainland rules. How can I protect your SME legally today?" }
 ]);
 const [userInput, setUserInput] = useState("");
 const [chatLoading, setChatLoading] = useState(false);

 // State for Button Simulations
 const [isDownloading, setIsDownloading] = useState(false);
 const [connectedAPIs, setConnectedAPIs] = useState<string[]>(['EmaraTax Sync: Active']);
 const [isConnecting, setIsConnecting] = useState<string | null>(null);
 const [viewAllRegistry, setViewAllRegistry] = useState(false);
 
 // Handlers for simulations
 const handleDownload = () => {
 setIsDownloading(true);
 setTimeout(() => {
 setIsDownloading(false);
 alert('Report successfully downloaded: Compliance_Report_ABC_Trading.pdf');
 }, 1500);
 };
 
 const handleConnectAPI = (apiName: string) => {
 setIsConnecting(apiName);
 setTimeout(() => {
 setIsConnecting(null);
 if (!connectedAPIs.includes(apiName)) {
 setConnectedAPIs([...connectedAPIs, apiName]);
 }
 }, 2000);
 };
 
 const handleCompleteTask = (id: string, e: any) => {
 e.stopPropagation();
 setTasks(tasks.map(t => t.id === id ? { ...t, status: 'completed' } : t));
 };
 
 // State for document scanning
 const [scanFiles, setScanFiles] = useState<File | null>(null);
 const [scanning, setScanning] = useState(false);
 const [scanResult, setScanResult] = useState<any>(null);

 // Filter tasks in Calendar
 const [calendarFilter, setCalendarFilter] = useState<string>("all");

 // Inbox focus states
 const [selectedNotice, setSelectedNotice] = useState<ComplianceNotice | null>(initialNotices[0]);
 const [draftingReply, setDraftingReply] = useState<string | null>(null);

 // Testimonial Popup State
 const [activeTestimonial, setActiveTestimonial] = useState(0);
 const [showTestimonial, setShowTestimonial] = useState(false);
 const [testimonialDismissed, setTestimonialDismissed] = useState(false);

 useEffect(() => {
   // Initial popup delay
   const initialTimer = setTimeout(() => setShowTestimonial(true), 1500);
   
   const interval = setInterval(() => {
     setShowTestimonial(false);
     setTimeout(() => {
       setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
       setShowTestimonial(true);
     }, 600); // Wait for fade out
   }, 7000); // 7 seconds per testimonial

   return () => {
     clearTimeout(initialTimer);
     clearInterval(interval);
   };
 }, []);

 // Sync state to localstorage
 useEffect(() => {
 localStorage.setItem("complianceos_tasks", JSON.stringify(tasks));
 }, [tasks]);

 useEffect(() => {
 localStorage.setItem("complianceos_docs", JSON.stringify(docs));
 }, [docs]);

 // Compute Compliance Score
 // Base score is 100. Let's apply custom penalties:
 // - Pending High task: -10 pts
 // - Delayed task: -15 pts
 // - Expired document status: -15 pts
 // - WPS status discrepancy: -10 pts
 // - Action Required document status: -8 pts
 const getComplianceScore = () => {
 let score = 100;
 tasks.forEach(task => {
 if (task.status === "pending" && task.severity === "high") score -= 8;
 if (task.status === "pending" && task.severity === "medium") score -= 4;
 if (task.status === "delayed") score -= 12;
 });
 docs.forEach(doc => {
 if (doc.status === "expired") score -= 12;
 if (doc.status === "action_required") score -= 6;
 });
 employees.forEach(emp => {
 if (emp.wpsStatus === "Discrepancy") score -= 8;
 if (emp.workPermitStatus === "Pending Action") score -= 4;
 });
 return Math.max(20, Math.min(100, score));
 };

 const handleAddTask = (e: React.FormEvent) => {
 e.preventDefault();
 if (!newTaskTitle.trim()) return;

 const task: ComplianceTask = {
 id: `task-${Date.now()}`,
 title: newTaskTitle,
 category: newTaskCategory,
 deadline: newTaskDeadline,
 status: "pending",
 severity: newTaskSeverity,
 assignedTo: "Ahmed Al-Mansoori (Founder)",
 description: newTaskDesc || `Mandatory ${newTaskCategory} task required under UAE law.`
 };

 setTasks([task, ...tasks]);
 setNewTaskTitle("");
 setNewTaskDesc("");
 };

 const toggleTaskStatus = (id: string) => {
 setTasks(tasks.map(t => {
 if (t.id === id) {
 return {
 ...t,
 status: t.status === "completed" ? "pending" : "completed"
 };
 }
 return t;
 }));
 };

 const deleteTask = (id: string) => {
 setTasks(tasks.filter(t => t.id !== id));
 };

 // Submit AI Chat
 const handleSendChatMessage = async (e?: React.FormEvent, customPrompt?: string) => {
 if (e) e.preventDefault();
 const textToSend = customPrompt || userInput;
 if (!textToSend.trim()) return;

 const newMsgs = [...chatMessages, { role: "user", content: textToSend }];
 setChatMessages(newMsgs);
 setUserInput("");
 setChatLoading(true);

 try {
 const response = await fetch("/api/compliance/chat", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 messages: newMsgs,
 companyContext: {
 companyName: "ABC TRADING LLC",
 employeesCount: employees.length,
 licenseNo: "DET-847291-EXP",
 trn: "100293184729003"
 }
 })
 });

 const data = await response.json();
 setChatMessages([...newMsgs, { role: "model", content: data.content }]);
 } catch (err) {
 console.error(err);
 setChatMessages([...newMsgs, { role: "model", content: "Apologies, I encountered an issue connecting to the central FTA/MoHRE server proxy. However, looking at the offline UAE compliance framework: remember that corporate tax Small Business Relief restricts maximum revenue to AED 3,000,000 to apply for tax exemption. Would you like me to analyze other regulatory structures?" }]);
 } finally {
 setChatLoading(false);
 }
 };

 // Simulated Document Upload Scanner
 const handleUploadAndScan = async (e: React.ChangeEvent<HTMLInputElement>) => {
 if (!e.target.files || e.target.files.length === 0) return;
 const file = e.target.files[0];
 setScanning(true);
 setScanResult(null);

 // Call API to scan
 try {
 const response = await fetch("/api/compliance/analyze-document", {
 method: "POST",
 headers: { "Content-Type": "application/json" },
 body: JSON.stringify({
 docName: file.name,
 docType: file.name.toLowerCase().includes("license") ? "License" : file.name.toLowerCase().includes("tax") ? "Tax" : "HR"
 })
 });
 const data = await response.json();
 setScanResult(data);
 
 // Save scanned doc in vault state
 const addedDoc: DocumentRecord = {
 id: `doc-${Date.now()}`,
 name: file.name,
 type: file.name.toLowerCase().includes("license") ? "License" : file.name.toLowerCase().includes("tax") ? "Tax" : "HR",
 uploadedAt: new Date().toISOString().split('T')[0],
 status: data.status === "compliant" ? "compliant" : "action_required",
 expiryDate: data.extractedData.expiryDate || "2027-06-15",
 daysRemaining: data.extractedData.daysRemaining || 365,
 auditIssues: data.auditIssues,
 extractedFields: data.extractedData
 };
 
 setDocs([addedDoc, ...docs]);
 
 // If of license type, link critical task automatically!
 if (addedDoc.type === "License" && data.status === "action_required") {
 const linkedTask: ComplianceTask = {
 id: `task-linked-${Date.now()}`,
 title: `Resolve Audit Error: ${data.auditIssues[0]?.message || 'Trade License issue'}`,
 category: "License",
 deadline: "2026-07-15",
 status: "pending",
 severity: "high",
 assignedTo: "Ahmed Al-Mansoori (Founder)",
 description: `Automatically created from ComplianceOS AI document audit scans on: ${file.name}`
 };
 setTasks(prev => [linkedTask, ...prev]);
 }
 } catch (err) {
 console.error(err);
 } finally {
 setScanning(false);
 }
 };

  return (
  <div className="flex flex-col bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] text-[#1E293B] min-h-screen" id="saas-app-root">
  
  {/* Global Marquee Ticker */}
  <div className="bg-[#1E293B] text-white text-[11px] font-mono-ui font-semibold tracking-wide py-2.5 overflow-hidden flex whitespace-nowrap shrink-0 items-center border-b border-slate-800 relative z-50">
    <div className="animate-marquee flex gap-12 items-center min-w-full pl-12">
      <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> SAVE 40+ MANUAL FILING HOURS PER MONTH</span>
      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-400" /> AVOID AED 50,000+ IN AVERAGE SME PENALTIES</span>
      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" /> AUTOMATE MoHRE, DET, & EmaraTax INSTANTLY</span>
      <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-purple-400" /> 100% CORPORATE TAX RELIEF GUARANTEE</span>
      {/* Duplicate for infinite seamless scroll */}
      <span className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> SAVE 40+ MANUAL FILING HOURS PER MONTH</span>
      <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-amber-400" /> AVOID AED 50,000+ IN AVERAGE SME PENALTIES</span>
      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#3B82F6]" /> AUTOMATE MoHRE, DET, & EmaraTax INSTANTLY</span>
      <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-purple-400" /> 100% CORPORATE TAX RELIEF GUARANTEE</span>
    </div>
  </div>

  <div className="flex flex-1 overflow-hidden">
  {/* SaaS App Left Sidebar (Bento/Notion styled) */}
  <div className="w-64 hidden md:flex bg-white border-r border-[#E2E8F0] text-[#475569] shadow-sm z-10 flex flex-col pt-5 shrink-0" id="saas-sidemenu">
  <div className="px-6 pb-6 border-b border-[#E2E8F0] flex flex-col justify-center gap-3">
    <img src="/logo.png" alt="ComplianceOS Logo" className="w-64 h-auto object-contain self-start" />
    <span className="text-[10px] text-[#2563EB] font-display tracking-tight font-bold tracking-widest uppercase">PRO Workspace</span>
  </div>

 {/* Company Profile Quick Summary - Bento styled light card */}
 <div className="p-4 mx-3 my-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
 <div className="flex justify-between items-center mb-1">
 <span className="text-[11px] font-mono-ui font-display tracking-tight font-bold tracking-wider uppercase text-slate-400">ABC TRADING LLC</span>
 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
 </div>
 <div className="text-xs text-slate-500 font-medium">Dubai Mainland • 15 FTEs</div>
 <div className="mt-3">
 <div className="flex justify-between text-[11px] mb-1 font-semibold">
 <span className="text-slate-400">Compliance Health</span>
 <span className="text-[#2563EB]">{getComplianceScore()}%</span>
 </div>
 <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
 <div 
 className={`h-full transition-all duration-500 ${
 getComplianceScore() >= 90 ? "bg-emerald-500" : getComplianceScore() >= 75 ? "bg-amber-500" : "bg-rose-500"
 }`}
 style={{ width: `${getComplianceScore()}%` }}
 ></div>
 </div>
 </div>
 </div>

 {/* Sidebar Nav */}
 <nav className="flex-1 px-3 space-y-1">
 <button
 onClick={() => setActiveTab("dashboard")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "dashboard" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Shield className="w-4 h-4" />
 Control Center
 </button>

 <button
 onClick={() => setActiveTab("tasks")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "tasks" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <CheckCircle2 className="w-4 h-4" />
 Compliance Tasks
 {tasks.filter(t => t.status === "pending").length > 0 && (
 <span className="ml-auto bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded font-display tracking-tight font-bold">
 {tasks.filter(t => t.status === "pending").length}
 </span>
 )}
 </button>

 <button
 onClick={() => setActiveTab("calendar")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "calendar" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Calendar className="w-4 h-4" />
 UAE Deadlines Desk
 </button>

 <button
 onClick={() => {
 setActiveTab("inbox");
 // Unread notices mark as read
 if (notices.some(n => n.status === "unread")) {
 setNotices(notices.map(n => ({ ...n, status: "read" })));
 }
 }}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "inbox" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Inbox className="w-4 h-4" />
 Corporate Inbox
 {notices.filter(n => n.status === "unread").length > 0 && (
 <span className="ml-auto bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-display tracking-tight font-bold">
 {notices.filter(n => n.status === "unread").length}
 </span>
 )}
 </button>

 <button
 onClick={() => setActiveTab("vault")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "vault" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <FileText className="w-4 h-4" />
 Document Ledger
 </button>

 <button
 onClick={() => setActiveTab("visas")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "visas" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Users className="w-4 h-4" />
 Employee Directory
 </button>

 <button
 onClick={() => setActiveTab("chat")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "chat" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Sparkles className="w-4 h-4 text-[#2563EB]" />
 AI Compliance Advisor
 </button>

 <button
 onClick={() => setActiveTab("profile")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "profile" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Building className="w-4 h-4" />
 Corporate Registry
 </button>

 <button
 onClick={() => setActiveTab("strategy")}
 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
 activeTab === "strategy" ? "bg-blue-50 text-blue-700 font-semibold" : "hover:bg-slate-50 text-slate-600 hover:text-slate-900 "
 }`}
 >
 <Compass className="w-4 h-4 text-[#4F46E5]" />
 Seed Strategy Hub
 </button>
 </nav>

 {/* Proactive Help Disclaimer */}
 <div className="p-4 mx-3 my-4 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border border-[#E5E7EB] rounded-xl text-slate-500 text-[11px] leading-relaxed">
 Need legal verification? Our records are synched directly with 2026 Dubai Law, DET, and Emiratisation councils.
 </div>

 {/* Integrated User Profile Card (Deel style) */}
 <div className="p-3 border-t border-[#E5E7EB] bg-[#F8FAFC] ">
 <div className="flex items-center gap-3 bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-sm flex-1">
 <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center font-display tracking-tight font-bold text-xs text-slate-900 uppercase shadow-xs">MC</div>
 <div className="flex-1 min-w-0">
 <p className="text-xs font-semibold truncate text-slate-900 leading-tight">Mark Channa</p>
 <p className="text-[10px] text-slate-500 truncate leading-none mt-0.5">ABC Trading LLC</p>
 </div>
 </div>
 
 </div>
 </div>

 {/* Main SaaS Workspace Panel */}
 <div className="flex-1 flex flex-col p-8 overflow-y-auto max-h-[1000px]" id="saas-main-workspace">
 
 {/* TOP STATUS BAR ACCENTS */}
 <div className="flex justify-between items-center pb-6 border-b border-slate-200 mb-6" id="saas-topbar">
 <div>
 <span className="text-xs text-slate-400 uppercase tracking-widest font-mono-ui">Operations Portal</span>
 <h1 className="text-2xl font-display tracking-tight font-bold text-slate-900 tracking-tight">
 {activeTab === "dashboard" && "SME Compliance Control Center"}
 {activeTab === "tasks" && "Compliance Task Tracker"}
 {activeTab === "calendar" && "Regulatory Master Calendar & Timelines"}
 {activeTab === "inbox" && "UAE Law Government Notices"}
 {activeTab === "vault" && "Secure Intelligent Document Vault"}
 {activeTab === "visas" && "Staff Visas & Wages Audit (MoHRE)"}
 {activeTab === "chat" && "Intelligent UAE Legal Compliance Chat"}
 {activeTab === "profile" && "Company Operational Profile"}
 {activeTab === "strategy" && "ComplianceOS Seed Strategy Hub"}
 </h1>
 </div>

 <div className="flex items-center gap-4">
 {/* Quick Audit Bar with Drop-in file analysis */}
 <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 transition cursor-pointer relative">
 <Upload className="w-3.5 h-3.5 text-slate-500 " />
 <span>Auditor Scan</span>
 <input 
 type="file" 
 onChange={handleUploadAndScan} 
 className="absolute inset-0 opacity-0 cursor-pointer" 
 accept=".pdf,.docx,.doc"
 />
 </div>
 
 <div className="flex items-center gap-2 text-xs font-mono-ui bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg">
 <Check className="w-3.5 h-3.5" />
 <span>EmaraTax Sync: Active</span>
 </div>
 </div>
 </div>

 {/* CRITICAL ERRORS NOTIFICATION BANNER */}
 {getComplianceScore() < 85 && (
 <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3">
 <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
 <div className="text-sm">
 <span className="font-semibold text-slate-900 ">Immediate Action Required:</span> Your compliance score is <strong className="text-amber-700">{getComplianceScore()}%</strong>. You have pending High-severity tasks and an impending Trade License expiration in Dubai Mainland (30 days remaining). Settle Ejari immediately to prevent operational blockage.
 </div>
 </div>
 )} {/* Tab View: Dashboard */}
 {activeTab === "dashboard" && (
 <div className="space-y-6" id="saas-tab-dashboard">
 
 {/* Row 1: Greeting Header & Shareholder Avatars */}
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm ">
 <div>
 <span className="text-[10px] font-display tracking-tight font-bold tracking-widest text-[#2563EB] uppercase block mb-1">WELCOME HOME</span>
 <h2 className="text-3xl font-display tracking-tight font-bold text-[#1E293B] tracking-tight leading-none">
 Hello, <span className="text-[#2563EB]">Mark Channa</span>
 </h2>
 <p className="text-xs text-slate-500 mt-2 font-medium">
 Review and control your UAE regulatory filings on-demand.
 </p>
 </div>

 {/* Team avatars list matching Fenco mockup */}
 <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-full border border-slate-150 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
 <span className="text-[10px] font-display tracking-tight font-bold text-slate-400 mr-2 uppercase tracking-wider">Review Committee:</span>
 <div className="flex -space-x-2">
 {[
 { init: "AA", bg: "bg-emerald-500" },
 { init: "SK", bg: "bg-[#2563EB]" },
 { init: "EP", bg: "bg-amber-500" },
 { init: "SK", bg: "bg-purple-500" },
 ].map((user, idx) => (
 <div 
 key={idx} 
 className={`w-7 h-7 rounded-full text-[9px] font-bold text-white uppercase border-2 border-white flex items-center justify-center ${user.bg} shadow-xs`}
 >
 {user.init}
 </div>
 ))}
 <button 
 onClick={() => setActiveTab("visas")}
 className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 border-2 border-white flex items-center justify-center text-slate-500 font-display tracking-tight font-bold text-xs transition shadow-xs"
 >
 +
 </button>
 </div>
 </div>
 </div>

 {/* Row 1.5: Business Value Proposition & Tutorials */}
 <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm animate-fadeUp stagger-1 relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -mr-10 -mt-10 opacity-60"></div>
    <div className="relative z-10">
      <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2"><Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> How ComplianceOS scales your business</h3>
      <p className="text-xs text-emerald-800 mt-1.5 leading-relaxed max-w-2xl font-medium">
        By actively syncing with UAE's EmaraTax, DET, and MoHRE portals, this OS saves your team an average of <strong className="text-emerald-900">40+ hours per month</strong> and <strong className="text-emerald-900">eliminates AED 50,000+ in average annual fines</strong>. Our AI acts as your dedicated PRO and Legal Counsel, ensuring 100% compliance.
      </p>
    </div>
    <button onClick={() => setActiveTab("strategy")} className="relative z-10 shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-display px-5 py-3 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(5,150,105,0.2)] focus-ring shadow-sm shadow-emerald-200">
      <Compass className="w-4 h-4" />
      Watch Tutorials & ROI
    </button>
  </div>

 {/* Row 2: Bento Row (Health Index, Digital Card, Donut Progress Gauge) */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeUp stagger-2">
 
 {/* Card A: Compliance Statistics with Sparkline */}
 <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white flex flex-col justify-between shadow-xs">
 <div>
 <div className="flex justify-between items-start">
 <div>
 <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono-ui border border-slate-200 bg-white px-2 py-1 rounded inline-block mb-2">STATE CHECK</span>
 <h3 className="font-display tracking-tight font-bold text-slate-850 text-sm mt-1">Compliance Health Index</h3>
 </div>
 <span className="text-xs font-display tracking-tight font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
 ↑ 14%
 </span>
 </div>
 <div className="mt-4 flex items-baseline gap-1">
 <span className="text-4xl font-display tracking-tight font-bold text-[#1E293B] tracking-tight">{getComplianceScore()}%</span>
 <span className="text-xs text-slate-400 font-medium">legal safety rating</span>
 </div>
 </div>

 {/* Sparkling chart indicator */}
 <div className="mt-6 flex items-center justify-between border-t border-slate-105 pt-4">
 <div className="space-y-1">
 <span className="text-[10px] text-slate-400 block font-medium">Last processed audit</span>
 <span className="text-xs font-display tracking-tight font-bold text-[#1E293B] ">Continuous EmaraTax monitoring</span>
 </div>
 <div className="opacity-90">
 <svg className="w-24 h-10 text-[#2563EB]" viewBox="0 0 100 30" fill="none">
 <path
 d="M0,25 Q15,4 30,22 T60,6 T90,18 L100,5"
 stroke="currentColor"
 strokeWidth="3.5"
 strokeLinecap="round"
 strokeLinejoin="round"
 />
 </svg>
 </div>
 </div>
 </div>

 {/* Card B: UAE Corporate Identity Wallet Card (The Fenco inspired card) */}
 <div className="bg-white border border-[#E2E8F0] p-7 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group">
 {/* Abstract light aura decoration */}
 <span className="absolute top-0 right-0 w-36 h-36 bg-white rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white transition duration-500"></span>
 
 <div className="flex justify-between items-start">
 <div>
 <span className="text-[10px] font-display tracking-tight font-bold tracking-widest text-slate-400 uppercase block">UNITED ARAB EMIRATES</span>
 <h4 className="font-display tracking-tight font-bold text-xs text-slate-900 uppercase tracking-wider mt-0.5">COMPLIANCE LEDGER</h4>
 </div>
 {/* Credit Card Chip Graphic Symbol */}
 <div className="w-7 h-5 rounded bg-slate-200 relative overflow-hidden border border-amber-300 shadow-xs">
 <span className="absolute inset-y-0 left-1/4 w-0.5 bg-slate-300"></span>
 <span className="absolute inset-y-0 right-1/4 w-0.5 bg-slate-300"></span>
 <span className="absolute inset-x-0 top-1/2 h-0.5 bg-slate-300"></span>
 </div>
 </div>

 <div className="my-6">
 <span className="text-slate-500 text-[9px] tracking-wider uppercase block font-mono-ui">DED Mainland Trade License</span>
 <span className="text-lg font-mono-ui font-display tracking-tight font-bold tracking-widest block text-slate-900 mt-0.5">DET-847291-EXP</span>
 </div>

 <div className="flex justify-between items-end border-t border-slate-100 pt-3">
 <div>
 <span className="text-[9px] text-slate-400 uppercase tracking-wider block font-mono-ui">Corporate TRN</span>
 <span className="font-display tracking-tight font-bold text-xs text-slate-900">100293184729...</span>
 </div>
 <div className="text-right">
 <span className="text-[9px] text-[#22C55E] bg-[#22C55E]/20 font-display tracking-tight font-bold px-2 py-0.5 rounded-full uppercase">
 ACTIVE
 </span>
 </div>
 </div>
 </div>

 {/* Card C: Radial Progress Integrity Gauge */}
 <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white flex flex-col justify-between shadow-xs">
 <div className="flex justify-between items-center mb-2">
 <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono-ui border border-slate-200 bg-white px-2 py-1 rounded inline-block mb-2">ANALYTICS ACCENT</span>
 <h3 className="font-display tracking-tight font-bold text-slate-850 text-sm">Integrity Health</h3>
 </div>

 <div className="flex items-center gap-6 my-auto pt-2 pb-1">
 {/* Pure SVG donut graph */}
 <div className="relative w-24 h-24 shrink-0">
 <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
 <path
 className="text-slate-100"
 strokeWidth="3.8"
 stroke="currentColor"
 fill="none"
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 />
 <path
 className="text-[#2563EB]"
 strokeWidth="3.8"
 strokeDasharray={`${getComplianceScore()}, 100`}
 strokeLinecap="round"
 stroke="currentColor"
 fill="none"
 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
 />
 </svg>
 <div className="absolute inset-0 flex flex-col items-center justify-center">
 <span className="text-xl font-display tracking-tight font-bold text-slate-900 tracking-tighter leading-none">{getComplianceScore()}%</span>
 <span className="text-[8px] text-slate-400 uppercase font-mono-ui mt-0.5">Compliant</span>
 </div>
 </div>

 {/* Bullet indicators */}
 <div className="space-y-2 text-xs">
 <div className="flex items-center gap-1.5 font-medium">
 <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
 <span className="text-slate-600 ">Active Approved ({getComplianceScore()}%)</span>
 </div>
 <div className="flex items-center gap-1.5 font-medium">
 <span className="w-2 h-2 rounded-full bg-amber-400"></span>
 <span className="text-slate-600 ">Pending Actions</span>
 </div>
 <div className="flex items-center gap-1.5 font-medium">
 <span className="w-2 h-2 rounded-full bg-rose-500"></span>
 <span className="text-slate-600 ">Unsettled Warnings</span>
 </div>
 </div>
 </div>
 </div>

 </div>

 {/* Row 3: Modern Transaction style audit list (Left) and Wage Protection Status / CTA Block (Right) */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 
 {/* Left Side: Recent Portal Events (styled like Last Transactions mockup) */}
 <div className="lg:col-span-2 bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white shadow-xs space-y-4">
 <div className="flex justify-between items-center pb-2 border-b border-slate-100 ">
 <div>
 <h3 className="font-display tracking-tight font-bold text-slate-900 text-sm">Recent Government Audit Logs</h3>
 <p className="text-[11px] text-slate-400 font-medium">Verified historical API events with UAE ministry connections</p>
 </div>
 <button onClick={() => setActiveTab("profile")} className="text-xs text-[#2563EB] hover:underline font-display tracking-tight font-bold">
 View Registry
 </button>
 </div>

 <div className="space-y-4 pt-1">
 {[
 { portal: "DE", name: "Dubai DET Tenancy Certificate", desc: "Lease renew and tenancy Ejari updated", sum: "Grace Period Active", ts: "14 hours ago", status: "ok", bg: "bg-blue-50 text-blue-700" },
 { portal: "FT", name: "Federal Corporate Tax", desc: "EmaraTax company records matched successfully", sum: "SBR Relief Drafted", ts: "3 days ago", status: "ok", bg: "bg-emerald-50 text-emerald-700" },
 { portal: "MH", name: "Wages Protection Audit (MoHRE)", desc: "Monthly wage bank file reconciled with contract rates", sum: "1 Discrepancy Flagged", ts: "June 10", status: "warning", bg: "bg-amber-50 text-amber-700" },
 ].map((log, idx) => (
 <div key={idx} className="flex justify-between items-start md:items-center p-3 hover:bg-slate-50 rounded-xl transition border border-transparent hover:border-slate-100 ">
 <div className="flex items-center gap-3">
 <div className={`w-10 h-10 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${log.bg}`}>
 {log.portal}
 </div>
 <div>
 <h4 className="font-display tracking-tight font-bold text-slate-900 text-xs">{log.name}</h4>
 <span className="text-[11px] text-slate-500 block">{log.desc}</span>
 </div>
 </div>

 <div className="text-right">
 <span className="text-[11px] font-display tracking-tight font-bold text-slate-900 block font-mono-ui">{log.sum}</span>
 <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{log.ts}</span>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Right Side: Wages Protection Breakdown and Crown AI Help CTA Block */}
 <div className="space-y-6">
 
 {/* Visual Bar WPS Quota */}
 <div className="bg-white p-7 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white shadow-xs">
 <div className="flex justify-between items-center mb-3">
 <h3 className="font-display tracking-tight font-bold text-slate-900 text-xs uppercase tracking-wide">WPS Salary Compliance</h3>
 <span className="text-[10px] font-display tracking-tight font-bold text-slate-400">Payroll May 2026</span>
 </div>

 <div className="space-y-3.5">
 <div>
 <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
 <span>Paid via Escrow Wages</span>
 <span>96%</span>
 </div>
 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
 <div className="h-full bg-blue-600 rounded-full" style={{ width: "96%" }}></div>
 </div>
 </div>

 <div>
 <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
 <span>Dispute Flags</span>
 <span>4%</span>
 </div>
 <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
 <div className="h-full bg-amber-400 rounded-full" style={{ width: "4%" }}></div>
 </div>
 </div>
 </div>
 </div>

 {/* Elegant Black Promo Card styled like "More features?" */}
 <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-7 rounded-2xl text-slate-900 shadow-sm flex flex-col justify-between relative overflow-hidden group">
 <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-slate-200 rounded-full blur-xl group-hover:bg-slate-200 transition duration-500"></div>
 
 <div>
 <div className="flex items-center gap-1.5 text-[9px] font-display tracking-tight font-bold text-[#2563EB] uppercase tracking-widest mb-1.5">
 <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
 PRO CONSULTATION UNIT
 </div>
 <h4 className="font-display tracking-tight font-bold text-sm text-slate-900 ">Need Offline PRO Representation?</h4>
 <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed">
 Deploy one of our registered GCC public relation officers to coordinate with Dubai DET or MoHRE auditors directly on-site within 24 hours.
 </p>
 </div>

 <button 
 onClick={() => setActiveTab("chat")}
 className="mt-6 w-full bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-900 font-display tracking-tight font-bold text-xs py-2.5 px-4 rounded-xl transition text-center shadow-xs"
 >
 Ask AI Co-Counsel
 </button>
 </div>

 </div>

 </div>

 {/* Row 4: AI Document Audit Scanner - Gorgeous full width drawer */}
 <div className="p-6 bg-white border border-[#E2E8F0] animate-fadeUp stagger-4 premium-card rounded-2xl p-7 shadow-xs relative overflow-hidden">
 <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
 
 <h2 className="text-base font-display tracking-tight font-bold text-slate-900 mb-1 flex items-center gap-1.5">
 <Sparkles className="w-4 h-4 text-[#2563EB]" />
 AI Document Audit Scanner
 </h2>
 <p className="text-xs text-slate-500 mb-5 leading-relaxed">
 Upload trade licenses, VAT summaries, Ejari agreements, or MoHRE employment logs to automatically parse values against recent GCC state mandates.
 </p>

 {scanning ? (
 <div className="p-8 border-2 border-dashed border-blue-200 bg-blue-50/20 rounded-2xl flex flex-col items-center justify-center">
 <RefreshCw className="w-8 h-8 text-[#2563EB] animate-spin mb-2" />
 <span className="text-sm font-display tracking-tight font-bold text-slate-800 ">Processing regulatory legal compliance check...</span>
 <span className="text-xs text-slate-400 mt-1">Simulating FTA state server connection...</span>
 </div>
 ) : (
 <div className="border-2 border-dashed border-slate-200 hover:border-[#2563EB] bg-slate-50 hover:bg-white rounded-2xl p-8 text-center transition cursor-pointer group relative">
 <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center mx-auto mb-3 transition">
 <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#2563EB]" />
 </div>
 <span className="text-xs font-display tracking-tight font-bold text-slate-800 ">Drag & drop or <span className="text-[#2563EB] underline">select a file to upload</span></span>
 <p className="text-[10px] text-slate-400 mt-1.5">Supports PDF, DOCX, XML, and high-res PNG image scans</p>
 <input 
 type="file" 
 onChange={handleUploadAndScan} 
 className="absolute inset-x-0 bottom-0 h-28 opacity-0 cursor-pointer" 
 />
 </div>
 )}

 {/* Show last scan result if active */}
 {scanResult && (
 <div className="mt-4 p-4 border border-emerald-100 bg-emerald-50/20 rounded-xl">
 <div className="flex justify-between items-start mb-2">
 <div>
 <span className="text-xs font-mono-ui font-display tracking-tight font-bold text-emerald-700 tracking-wider uppercase bg-emerald-100 px-2 py-0.5 rounded">
 Scan Successful ({scanResult.score}% Compliance Score)
 </span>
 <h4 className="font-display tracking-tight font-bold text-sm text-slate-900 mt-1">{scanResult.title}</h4>
 </div>
 <CheckCircle2 className="w-5 h-5 text-emerald-600" />
 </div>
 
 <div className="grid grid-cols-2 gap-4 text-xs xl:grid-cols-3 mt-3 border-t border-slate-100 pt-3">
 {Object.entries(scanResult.extractedData).map(([k, v]: any) => (
 <div key={k}>
 <span className="text-slate-400 block capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
 <span className="font-medium text-slate-800 ">{v}</span>
 </div>
 ))}
 </div>

 {scanResult.auditIssues && scanResult.auditIssues.length > 0 && (
 <div className="mt-3 border-t border-slate-100 pt-3">
 <span className="text-xs font-display tracking-tight font-bold text-rose-600">Audit Discrepancies Registered ({scanResult.auditIssues.length}):</span>
 <ul className="mt-1.5 space-y-2">
 {scanResult.auditIssues.map((issue: any, i: number) => (
 <li key={i} className="text-xs bg-rose-50/50 border border-rose-100 p-2.5 rounded-lg flex gap-2">
 <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
 <div>
 <span className="font-semibold text-slate-900 block">{issue.message}</span>
 <span className="text-slate-500 block mt-0.5">Remedy: {issue.remedy}</span>
 </div>
 </li>
 ))}
 </ul>
 </div>
 )}
 </div>
 )}
 </div>

 {/* Row 5: Checklist Area (Takes list remaining pending tasks) */}
 <div className="p-6 bg-white border border-[#E2E8F0] rounded-[1.75rem] shadow-xs">
 <div className="flex justify-between items-center mb-4">
 <h3 className="font-display tracking-tight font-bold text-[#1E293B] text-sm">Active Regulatory Action Checklist</h3>
 <button onClick={() => setActiveTab("tasks")} className="text-xs font-display tracking-tight font-bold text-[#2563EB] hover:underline">
 Go to Tasks &rarr;
 </button>
 </div>

 <div className="space-y-3">
 {tasks.filter(t => t.status === "pending").slice(0, 3).map(task => (
 <div key={task.id} className="p-4 border border-slate-100 hover:border-slate-200 rounded-xl flex items-start gap-4 transition hover:bg-slate-50 ">
 <input 
 type="checkbox" 
 checked={task.status === "completed"} 
 onChange={() => toggleTaskStatus(task.id)}
 className="w-4.5 h-4.5 text-[#2563EB] border-slate-300 rounded focus:ring-blue-400 mt-0.5 cursor-pointer accent-[#2563EB]" 
 />
 <div className="flex-1">
 <div className="flex items-center gap-2">
 <span className={`text-[10px] uppercase font-mono-ui font-bold px-2 py-0.5 rounded ${
 task.severity === "high" ? "bg-rose-50 text-rose-600 border border-rose-100" :
 task.severity === "medium" ? "bg-amber-50 text-amber-600 border border-amber-100" :
 "bg-slate-100 text-slate-600"
 }`}>
 {task.severity}
 </span>
 <span className="text-[10px] text-slate-400 font-mono-ui">Deadline: {task.deadline}</span>
 </div>
 <h4 className="font-semibold text-xs text-slate-900 mt-1">{task.title}</h4>
 <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{task.description}</p>
 </div>
 <span className="text-[10px] font-mono-ui font-display tracking-tight font-bold text-slate-400 self-center bg-slate-50 border border-slate-100 px-2 py-1 rounded">
 {task.category}
 </span>
 </div>
 ))}

 {tasks.filter(t => t.status === "pending").length === 0 && (
 <div className="p-8 border border-dashed border-slate-100 rounded-xl text-center">
 <span className="text-xs text-slate-400">All tasks completed successfully. Absolutely clear regulatory sky.</span>
 </div>
 )}
 </div>
 </div>

 </div>
 )}

 {/* Tab View: Compliance Tasks */}
 {activeTab === "tasks" && (
 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6" id="saas-tab-tasks">
 
 {/* New Task Creator Form */}
 <form onSubmit={handleAddTask} className="mb-8 p-5 bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-6 space-y-4">
 <h3 className="text-sm font-display tracking-tight font-bold text-slate-900 flex items-center gap-1.5 leading-none">
 <Plus className="w-4 h-4 text-emerald-500" />
 Add New Regulatory Task to Database
 </h3>
 
 <div className="grid grid-cols-2 gap-4">
 <div className="col-span-2">
 <label className="text-[11px] text-slate-400 block uppercase font-mono-ui mb-1">Task Title / Legal Requirement</label>
 <input 
 type="text" 
 value={newTaskTitle}
 onChange={(e) => setNewTaskTitle(e.target.value)}
 placeholder="e.g., Settle Corporate Tax Registry Fees" 
 className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
 />
 </div>
 
 <div>
 <label className="text-[11px] text-slate-400 block uppercase font-mono-ui mb-1">Regulatory Authority Category</label>
 <select 
 value={newTaskCategory}
 onChange={(e: any) => setNewTaskCategory(e.target.value)}
 className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
 >
 <option value="Tax">FTA Tax Filing</option>
 <option value="HR">MoHRE HR & Visas</option>
 <option value="License">DED / Freezone License</option>
 <option value="Corporate">Corporate Board Governance</option>
 </select>
 </div>

 <div>
 <label className="text-[11px] text-slate-400 block uppercase font-mono-ui mb-1">Calendar Expiration Date</label>
 <input 
 type="date" 
 value={newTaskDeadline}
 onChange={(e) => setNewTaskDeadline(e.target.value)}
 className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 animate-none cursor-pointer"
 />
 </div>

 <div>
 <label className="text-[11px] text-slate-400 block uppercase font-mono-ui mb-1">Severity / Penalty Grade</label>
 <select 
 value={newTaskSeverity}
 onChange={(e: any) => setNewTaskSeverity(e.target.value)}
 className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
 >
 <option value="high">High (Closes Operations, heavy fines)</option>
 <option value="medium">Medium (Moderate operational/license fines)</option>
 <option value="low">Low (Compliance advisory)</option>
 </select>
 </div>

 <div>
 <label className="text-[11px] text-slate-400 block uppercase font-mono-ui mb-1">Filing Description / Action required</label>
 <input 
 type="text" 
 value={newTaskDesc}
 onChange={(e) => setNewTaskDesc(e.target.value)}
 placeholder="Filing instructions under Cabinet Decision No..." 
 className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
 />
 </div>
 </div>

 <div className="flex justify-end pt-2">
 <button type="submit" className="bg-slate-900 group hover:bg-slate-800 text-white font-medium text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition">
 <Plus className="w-3.5 h-3.5 group-hover:scale-110 transition" />
 Save Task to Blockchain ledger
 </button>
 </div>
 </form>

 {/* Task database Table */}
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-100 text-slate-500 text-[10px] font-mono-ui uppercase tracking-wider">
 <th className="py-3 px-2">Status</th>
 <th className="py-3 px-2">Task Title</th>
 <th className="py-3 px-4">Authority Category</th>
 <th className="py-3 px-4">Filing Expiry</th>
 <th className="py-3 px-4">Penalty Risk</th>
 <th className="py-3 px-4 text-right">Operations Action</th>
 </tr>
 </thead>
 <tbody className="text-sm">
 {tasks.map(task => (
 <tr key={task.id} className="border-b border-slate-50 hover:bg-slate-50 group transition">
 <td className="py-4 px-2">
 <input 
 type="checkbox" 
 checked={task.status === "completed"} 
 onChange={() => toggleTaskStatus(task.id)}
 className="w-4.5 h-4.5 text-emerald-500 border-slate-300 rounded focus:ring-emerald-400 cursor-pointer accent-emerald-500" 
 />
 </td>
 <td className="py-4 px-2">
 <div>
 <span className={`font-semibold ${task.status === "completed" ? "line-through text-slate-400 font-normal" : "text-slate-900 "}`}>
 {task.title}
 </span>
 <p className="text-xs text-slate-400 mt-0.5 max-w-sm line-clamp-1">{task.description}</p>
 </div>
 </td>
 <td className="py-4 px-4 font-medium text-slate-700 ">{task.category}</td>
 <td className="py-4 px-4 font-mono-ui text-xs">{task.deadline}</td>
 <td className="py-4 px-4">
 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
 task.severity === "high" ? "bg-rose-50 text-rose-600 border border-rose-100" :
 task.severity === "medium" ? "bg-amber-50 text-amber-655 text-amber-600 border border-amber-100" :
 "bg-slate-100 text-slate-600"
 }`}>
 {task.severity}
 </span>
 </td>
 <td className="py-4 px-4 text-right">
 <button 
 onClick={() => deleteTask(task.id)}
 className="text-slate-400 hover:text-rose-500 p-1.5 rounded transition opacity-0 group-hover:opacity-100"
 >
 <Trash2 className="w-4 h-4" />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* Tab View: Calendar */}
 {activeTab === "calendar" && (
 <div className="space-y-6" id="saas-tab-calendar">
 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
 <div className="flex justify-between items-center mb-6">
 <div className="flex gap-2">
 {["all", "Tax", "HR", "License"].map(cat => (
 <button 
 key={cat}
 onClick={() => setCalendarFilter(cat)}
 className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
 calendarFilter === cat 
 ? "bg-slate-900 text-white" 
 : "bg-slate-100 text-slate-500 hover:bg-slate-200"
 }`}
 >
 {cat === "all" ? "All Authorities" : `${cat} Milestones`}
 </button>
 ))}
 </div>
 <span className="text-xs text-slate-400 font-mono-ui">Simulated Current Date: June 15, 2026</span>
 </div>

 {/* High Fidelity Grid Calendar Months representation */}
 <div className="grid grid-cols-3 gap-6">
 
 {/* June 2026 Panel */}
 <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm ">
 <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 ">June 2026</h3>
 <span className="text-[10px] text-emerald-600 font-mono-ui font-display tracking-tight font-bold bg-emerald-50 px-1.5 py-0.5 rounded">CURRENT MONTH</span>
 </div>
 <div className="space-y-3 min-h-[220px]">
 {tasks
 .filter(t => t.deadline.startsWith("2026-06") && (calendarFilter === "all" || t.category === calendarFilter))
 .map(t => (
 <div key={t.id} className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-lg text-xs leading-relaxed">
 <div className="flex justify-between items-center mb-1">
 <span className="font-mono-ui text-[9px] font-display tracking-tight font-bold text-slate-400">{t.deadline}</span>
 <span className={`w-2 h-2 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
 </div>
 <span className="font-semibold text-slate-900 block">{t.title}</span>
 <span className="text-[10px] text-slate-500 ">{t.category} • Assigner: {t.assignedTo.split(' ')[0]}</span>
 </div>
 ))}
 {tasks.filter(t => t.deadline.startsWith("2026-06")).length === 0 && (
 <div className="h-40 flex items-center justify-center text-slate-400 text-xs">No deadlines scheduled.</div>
 )}
 </div>
 </div>

 {/* July 2026 Panel */}
 <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm ">
 <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 ">July 2026</h3>
 <span className="text-[10px] text-slate-400 font-mono-ui">T-Minus 1 Month</span>
 </div>
 <div className="space-y-3 min-h-[220px]">
 {tasks
 .filter(t => t.deadline.startsWith("2026-07") && (calendarFilter === "all" || t.category === calendarFilter))
 .map(t => (
 <div key={t.id} className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-lg text-xs leading-relaxed">
 <div className="flex justify-between items-center mb-1">
 <span className="font-mono-ui text-[9px] font-display tracking-tight font-bold text-slate-400">{t.deadline}</span>
 <span className={`w-2 h-2 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
 </div>
 <span className="font-semibold text-slate-900 block">{t.title}</span>
 <span className="text-[10px] text-slate-500 ">{t.category} • Assigner: {t.assignedTo.split(' ')[0]}</span>
 </div>
 ))}
 {tasks.filter(t => t.deadline.startsWith("2026-07")).length === 0 && (
 <div className="h-40 flex items-center justify-center text-slate-400 text-xs">No deadlines scheduled.</div>
 )}
 </div>
 </div>

 {/* August & September 2026 Panel */}
 <div className="border border-slate-250 border-dashed rounded-xl p-4 bg-white shadow-sm ">
 <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 ">Q3 Roadmap (Aug-Sep)</h3>
 <span className="text-[10px] text-slate-400 font-mono-ui">Upcoming filings</span>
 </div>
 <div className="space-y-3 min-h-[220px]">
 {tasks
 .filter(t => (t.deadline.startsWith("2026-08") || t.deadline.startsWith("2026-09")) && (calendarFilter === "all" || t.category === calendarFilter))
 .map(t => (
 <div key={t.id} className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-lg text-xs leading-relaxed">
 <div className="flex justify-between items-center mb-1">
 <span className="font-mono-ui text-[9px] font-display tracking-tight font-bold text-slate-400">{t.deadline}</span>
 <span className={`w-2 h-2 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
 </div>
 <span className="font-semibold text-slate-900 block">{t.title}</span>
 <span className="text-[10px] text-slate-500 ">{t.category} • Assigner: {t.assignedTo.split(' ')[0]}</span>
 </div>
 ))}
 </div>
 </div>

 </div>
 </div>
 </div>
 )}

 {/* Tab View: Corporate Inbox */}
 {activeTab === "inbox" && (
 <div className="grid grid-cols-3 gap-6 bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[500px]" id="saas-tab-inbox">
 
 {/* Notices List Pane */}
 <div className="border-r border-slate-200 ">
 <div className="p-4 border-b border-slate-100 bg-slate-50 ">
 <span className="text-xs font-mono-ui uppercase text-slate-400">Notice Feed ({notices.length})</span>
 </div>
 <div className="divide-y divide-slate-100 overflow-y-auto max-h-[440px]">
 {notices.map(notice => (
 <div 
 key={notice.id} 
 onClick={() => {
 setSelectedNotice(notice);
 setDraftingReply(null);
 }}
 className={`p-4 cursor-pointer hover:bg-slate-50 transition ${
 selectedNotice?.id === notice.id ? "bg-emerald-50/20 border-l-4 border-emerald-500" : ""
 }`}
 >
 <div className="flex justify-between items-center mb-1">
 <span className="text-xs font-mono-ui font-display tracking-tight font-bold text-slate-700 ">{notice.sender}</span>
 <span className="text-[10px] text-slate-400 font-mono-ui">{notice.date}</span>
 </div>
 <h4 className="font-semibold text-sm text-slate-900 truncate">{notice.subject}</h4>
 <p className="text-xs text-slate-500 line-clamp-2 mt-1">{notice.body}</p>
 </div>
 ))}
 </div>
 </div>

 {/* Active Notice Read Pane */}
 <div className="col-span-2 p-6 flex flex-col justify-between" id="inbox-read-pane">
 {selectedNotice ? (
 <div className="space-y-4">
 <div className="flex justify-between items-start border-b border-slate-100 pb-4">
 <div>
 <span className="text-xs font-mono-ui font-display tracking-tight font-bold uppercase text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded">
 Government Department: {selectedNotice.sender}
 </span>
 <h2 className="text-lg font-display tracking-tight font-bold text-slate-900 mt-2">{selectedNotice.subject}</h2>
 <span className="text-xs text-slate-400 font-mono-ui block mt-1">Dispatched On: {selectedNotice.date} • Reference ID: FZF-391-AE</span>
 </div>
 <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
 selectedNotice.status === "resolved" 
 ? "bg-emerald-100 text-emerald-800" 
 : "bg-amber-100 text-amber-800"
 }`}>
 {selectedNotice.status}
 </span>
 </div>

 <div className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200 font-serif whitespace-pre-wrap">
 {selectedNotice.body}
 </div>

 <div className="p-4 border border-slate-200 bg-amber-50/20 rounded-xl space-y-2">
 <span className="text-xs font-display tracking-tight font-bold text-slate-900 uppercase tracking-wider block">Action Checklist Mandated:</span>
 <p className="text-xs text-slate-600 leading-relaxed">{selectedNotice.actionRequired}</p>
 
 {/* Draft Reply Area */}
 {draftingReply ? (
 <div className="mt-4 border-t border-slate-200 pt-3">
 <span className="text-xs font-display tracking-tight font-bold text-slate-900 flex items-center gap-1 mb-2">
 <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
 ComplianceOS AI Legal Response Agent Draft:
 </span>
 <textarea 
 className="w-full bg-white border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-emerald-500 font-mono-ui"
 rows={6}
 value={draftingReply}
 onChange={(e) => setDraftingReply(e.target.value)}
 />
 <div className="flex justify-end gap-2 mt-2">
 <button 
 onClick={() => {
 setNotices(notices.map(n => n.id === selectedNotice.id ? { ...n, status: "resolved" } : n));
 setSelectedNotice({ ...selectedNotice, status: "resolved" });
 setDraftingReply(null);
 }}
 className="bg-[#10B981] hover:bg-[#059669] shadow-sm text-white font-medium text-xs px-3.5 py-2 rounded-lg flex items-center gap-1"
 >
 <Check className="w-3.5 h-3.5" /> Approved & Dispatch Filing
 </button>
 </div>
 </div>
 ) : (
 selectedNotice.status !== "resolved" && (
 <div className="pt-2">
 <button 
 onClick={() => setDraftingReply(selectedNotice.aiSuggestedDraft || "")}
 className="bg-slate-900 group hover:bg-slate-800 text-white text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
 >
 <Sparkles className="w-3.5 h-3.5 text-emerald-400 group-hover:animate-pulse" />
 Draft legal response logic with ComplianceOS AI
 </button>
 </div>
 )
 )}
 </div>
 </div>
 ) : (
 <div className="h-full flex items-center justify-center text-slate-400 text-sm">
 Select a government notice from the feed to view detailed audit.
 </div>
 )}
 </div>
 </div>
 )}

 {/* Tab View: Document Ledger */}
 {activeTab === "vault" && (
 <div className="space-y-6" id="saas-tab-vault">
 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
 
 {/* Document directories and Upload trigger box */}
 <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
 <div>
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 ">Company Document Index Ledger</h3>
 <p className="text-xs text-slate-400">All uploaded trade files are securely cross-referenced against UAE Cabinet rules.</p>
 </div>

 <div className="flex items-center gap-2 relative">
 <div className="bg-[#10B981] hover:bg-[#059669] shadow-sm text-white font-medium text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 transition cursor-pointer">
 <Upload className="w-3.5 h-3.5" />
 Upload & Audit License / Tax Document
 <input 
 type="file" 
 onChange={handleUploadAndScan} 
 className="absolute inset-x-0 bottom-0 opacity-0 cursor-pointer h-full" 
 accept=".pdf,.docx,.doc"
 />
 </div>
 </div>
 </div>

 {/* Document Lists Table */}
 <div className="grid grid-cols-3 gap-6">
 
 {/* Vault Left Pane: Category Folders */}
 <div>
 <h4 className="text-xs font-mono-ui uppercase text-slate-400 mb-3 block">Legislation Folders</h4>
 <div className="space-y-1.5">
 {[
 { name: "Trade Licenses & DED Permissions", count: docs.filter(d => d.type === "License").length },
 { name: "Corporate Tax & VAT Filings", count: docs.filter(d => d.type === "Tax").length },
 { name: "Employment Contracts (MoHRE)", count: docs.filter(d => d.type === "HR").length },
 { name: "Ejari Tenancy & Leases", count: docs.filter(d => d.type === "Ejari").length }
 ].map((fol, index) => (
 <div key={index} className="p-3 border border-slate-100 bg-slate-50 hover:bg-slate-100 rounded-xl flex justify-between items-center text-xs ml-1 cursor-pointer">
 <span className="font-semibold text-slate-800 ">{fol.name}</span>
 <span className="font-mono-ui text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-display tracking-tight font-bold">{fol.count}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Vault Right Pane: Document Ledger Table */}
 <div className="col-span-2 space-y-3">
 <h4 className="text-xs font-mono-ui uppercase text-slate-400 block mb-1">Archived Files</h4>
 
 {docs.map(doc => (
 <div key={doc.id} className="p-4 border border-slate-100 hover:border-slate-200 bg-white rounded-xl flex items-center justify-between transition gap-4">
 <div className="flex items-start gap-3">
 <div className="w-9 h-9 rounded bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-display tracking-tight font-bold text-xs shrink-0 mt-0.5">
 PDF
 </div>
 <div>
 <h5 className="font-display tracking-tight font-bold text-sm text-slate-900 ">{doc.name}</h5>
 <div className="flex gap-2 text-[10px] text-slate-400 mt-1">
 <span>Uploaded: {doc.uploadedAt}</span>
 <span>•</span>
 <span className="uppercase">{doc.type} Category</span>
 </div>
 
 {doc.extractedFields && (
 <div className="mt-2 flex flex-wrap gap-1.5">
 {Object.entries(doc.extractedFields).slice(0, 2).map(([k, v]: any) => (
 <span key={k} className="text-[10px] bg-slate-50 border border-slate-100 text-slate-600 px-2 py-0.5 rounded">
 {k.replace(/([A-Z])/g, ' $1')}: <strong className="text-slate-800 ">{v}</strong>
 </span>
 ))}
 </div>
 )}
 </div>
 </div>

 <div className="text-right shrink-0">
 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded block text-center max-w-28 ${
 doc.status === "compliant" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
 doc.status === "action_required" ? "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse" :
 "bg-slate-100 text-slate-500"
 }`}>
 {doc.status.replace("_", " ")}
 </span>
 {doc.expiryDate && (
 <span className="text-[9px] font-mono-ui text-slate-400 block mt-1">Expires: {doc.expiryDate} ({doc.daysRemaining} days left)</span>
 )}
 </div>
 </div>
 ))}
 </div>

 </div>

 </div>
 </div>
 )}

 {/* Tab View: Staff Visas directory */}
 {activeTab === "visas" && (
 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6" id="saas-tab-visas">
 <div className="flex justify-between items-center mb-6">
 <div>
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 ">MoHRE Employee Visa & Payroll Audit</h3>
 <p className="text-xs text-slate-400">Mainland companies must disburse salaries through WPS monthly to remain compliant.</p>
 </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="border-b border-slate-100 text-slate-500 text-[10px] font-mono-ui uppercase tracking-wider">
 <th className="py-3 px-2">Personnel Name</th>
 <th className="py-3 px-4">Emirates ID No.</th>
 <th className="py-3 px-4">Visa Status / Expiry</th>
 <th className="py-3 px-4">Contract Salary</th>
 <th className="py-3 px-4">May WPS Status</th>
 <th className="py-3 px-4 text-right">Filing Action</th>
 </tr>
 </thead>
 <tbody className="text-sm">
 {employees.map(emp => (
 <tr key={emp.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
 <td className="py-4 px-2 font-display tracking-tight font-bold text-slate-900 ">
 <div>
 <span>{emp.name}</span>
 <span className="text-[10px] text-slate-400 block font-normal">{emp.department}</span>
 </div>
 </td>
 <td className="py-4 px-4 font-mono-ui text-xs">{emp.emiratesId}</td>
 <td className="py-4 px-4">
 <div className="flex items-center gap-1.5">
 <span className={`w-2 h-2 rounded-full ${
 emp.workPermitStatus === "Active" ? "bg-emerald-500" : "bg-amber-500"
 }`}></span>
 <span>{emp.workPermitStatus} (Expiry: {emp.visaExpiry})</span>
 </div>
 </td>
 <td className="py-4 px-4 font-semibold text-slate-800 ">AED {emp.salary.toLocaleString()}</td>
 <td className="py-4 px-4">
 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
 emp.wpsStatus === "Paid" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
 "bg-rose-50 text-rose-600 border border-rose-100 animate-pulse"
 }`}>
 {emp.wpsStatus}
 </span>
 </td>
 <td className="py-4 px-4 text-right">
 {emp.wpsStatus !== "Paid" ? (
 <button 
 onClick={() => {
 setEmployees(employees.map(e => e.id === emp.id ? { ...e, wpsStatus: "Paid", workPermitStatus: "Active" } : e));
 const resolvedNotice = notices.find(n => n.sender === "MoHRE" && n.status !== "resolved");
 if (resolvedNotice) {
 setNotices(notices.map(n => n.id === resolvedNotice.id ? { ...n, status: "resolved" } : n));
 }
 }}
 className="bg-[#1E293B] hover:bg-slate-800 text-white shadow-sm font-medium text-[11px] py-1.5 px-3 rounded-lg transition"
 >
 Disburse WPS Backpay
 </button>
 ) : (
 <span className="text-emerald-600 text-[11px] font-semibold flex items-center gap-1 justify-end">
 <Check className="w-3.5 h-3.5" /> Reconciled
 </span>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 )}

 {/* Tab View: AI Advisory Chat */}
 {activeTab === "chat" && (
 <div className="grid grid-cols-4 gap-6 bg-white border border-slate-200 rounded-2xl shadow-sm min-h-[500px]" id="saas-tab-chat">
 
 {/* Left Prompt Guide Rails */}
 <div className="border-r border-slate-100 p-5 space-y-4">
 <span className="text-xs font-mono-ui uppercase text-slate-400">Specialized Direct queries</span>
 
 <div className="space-y-2">
 {[
 { q: "Clarify UAE Corporate Tax rate and SBR thresholds", label: "Corporate Tax FAQs" },
 { q: "What is mandatory VAT threshold registration and filing cycles?", label: "VAT Invoicing Rules" },
 { q: "Explain Wage Protection System compliance for Mainland Dubai DED", label: "WPS Rules & Fines" },
 { q: "Tell me about SME Emiratisation mandates (20-49 employees class)", label: "MoHRE Visa Contribs" }
 ].map((chip, index) => (
 <button
 key={index}
 onClick={() => handleSendChatMessage(undefined, chip.q)}
 className="w-full text-left p-2.5 border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/5 text-xs rounded-xl flex items-center justify-between group transition"
 >
 <div>
 <span className="text-[10px] text-slate-400 block font-mono-ui uppercase">{chip.label}</span>
 <p className="font-semibold text-slate-700 leading-tight mt-0.5 line-clamp-2">{chip.q}</p>
 </div>
 <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition" />
 </button>
 ))}
 </div>
 </div>

 {/* Main Chat Frame */}
 <div className="col-span-3 flex flex-col justify-between" id="chat-frame-container">
 
 {/* Messages viewport */}
 <div className="p-6 space-y-4 flex-1 overflow-y-auto max-h-[380px]">
 {chatMessages.map((msg, i) => (
 <div key={i} className={`flex gap-3 max-w-full ${msg.role === "user" ? "justify-end" : ""}`}>
 {msg.role !== "user" && (
 <div className="w-8 h-8 rounded-lg bg-emerald-500 border border-slate-900 shrink-0 text-slate-950 font-display tracking-tight font-bold text-xs flex items-center justify-center">
 OS
 </div>
 )}
 <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-md xl:max-w-xl ${
 msg.role === "user" 
 ? "bg-slate-900 border border-slate-800 text-slate-300 rounded-tr-none text-right" 
 : "bg-slate-50 border border-slate-200/50 text-slate-800 rounded-tl-none font-serif whitespace-pre-wrap"
 }`}>
 {msg.role === "user" ? (
 msg.content
 ) : (
 // Print simple parsed markdown-like responses cleanly
 msg.content.split('\n').map((line, key) => {
 if (line.startsWith('### ')) {
 return <h3 key={key} className="font-display tracking-tight font-bold text-sm text-slate-900 mt-2 mb-1 border-b border-slate-100 pb-0.5">{line.substring(4)}</h3>;
 }
 if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
 return <p key={key} className="pl-2 font-serif text-slate-700 font-medium ml-1 my-1.5">{line}</p>;
 }
 return <p key={key} className="mb-1 leading-relaxed">{line}</p>;
 })
 )}
 </div>
 </div>
 ))}

 {chatLoading && (
 <div className="flex gap-3">
 <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-display tracking-tight font-bold text-xs flex items-center justify-center animate-pulse">
 OS
 </div>
 <div className="p-4 bg-slate-100 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
 <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-500 " />
 <span>Drafting legal clarification based on Decree Law No. 47...</span>
 </div>
 </div>
 )}
 </div>

 {/* Chat Input Console */}
 <form onSubmit={handleSendChatMessage} className="p-4 border-t border-slate-100 flex gap-2">
 <input 
 type="text" 
 value={userInput}
 onChange={(e) => setUserInput(e.target.value)}
 placeholder="Ask ComplianceOS about Corporate Tax, Ejari renewals, WPS payroll edits..."
 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs focus:outline-none focus:bg-white focus:border-emerald-500 placeholder-slate-400 shadow-inner"
 />
 <button type="submit" className="bg-[#1E293B] hover:bg-slate-800 text-white shadow-sm font-medium text-xs px-5 rounded-xl flex items-center gap-1">
 Ask AI
 </button>
 </form>

 </div>
 </div>
 )}

 {/* Tab View: Corporate Profile */}
 {activeTab === "profile" && (
 <div className="grid grid-cols-3 gap-6" id="saas-tab-profile">
 
 {/* Main Info Registry */}
 <div className="col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 space-y-6">
 <div>
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 mb-4">DET Corporate Registry Profile</h3>
 
 <div className="grid grid-cols-2 gap-4 text-xs">
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Registered Trade Name</span>
 <span className="font-display tracking-tight font-bold text-slate-850 block text-sm mt-0.5">ABC Trading LLC</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">License Number</span>
 <span className="font-mono-ui font-semibold text-slate-850 block mt-0.5">DED-847291-EXP</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Legal Entity Structure</span>
 <span className="font-semibold text-slate-850 block mt-0.5">Limited Liability Company (LLC)</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Emirates Jurisdiction</span>
 <span className="font-semibold text-slate-850 block mt-0.5">Mainland Dubai (DED Registered)</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Registered Address</span>
 <span className="font-semibold text-slate-850 block mt-0.5">Showroom 4, Al Quoz Industrial Area 3, Dubai</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Ejari Lease Expiry Date</span>
 <span className="font-semibold text-rose-600 block mt-0.5 font-mono-ui">2026-07-14 (30 days remaining)</span>
 </div>
 </div>
 </div>

 <div>
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 mb-4">Federal Tax Profile</h3>
 
 <div className="grid grid-cols-2 gap-4 text-xs">
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Tax Registration Number (TRN)</span>
 <span className="font-mono-ui font-display tracking-tight font-bold text-emerald-600 block text-sm mt-0.5">100293184729003</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Tax Status</span>
 <span className="font-semibold text-emerald-600 bg-emerald-50 border border-emerald-150 inline-block px-2 py-0.5 rounded text-[10px] uppercase font-display tracking-tight font-bold mt-1">
 EmaraTax Integrated & Validated
 </span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Corporate Tax Period Start</span>
 <span className="font-semibold text-slate-850 block mt-0.5">2025-01-01</span>
 </div>
 <div>
 <span className="text-slate-400 block uppercase font-mono-ui text-[9px]">Corporate Tax Deadline</span>
 <span className="font-semibold text-slate-850 block mt-0.5 font-mono-ui">2026-09-30 (9 months post Financial Year)</span>
 </div>
 </div>
 </div>

 <div>
 <h3 className="font-display tracking-tight font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 mb-4">Shareholder Registry (UBO Record)</h3>
 
 <div className="space-y-2.5">
 {[
 { name: "Ahmed Al-Mansoori", role: "Solo Founder & Managing Director", equity: "51%", country: "United Arab Emirates" },
 { name: "Siddharth Kumar", role: "Key Personnel Employee Nominee", equity: "0%", country: "India" }
 ].map((sh, idx) => (
 <div key={idx} className="flex justify-between items-center text-xs p-3 border border-slate-100 rounded-xl">
 <div>
 <span className="font-display tracking-tight font-bold text-slate-800 block text-sm">{sh.name}</span>
 <span className="text-slate-400 block mt-0.5">{sh.role} • Nationality: {sh.country}</span>
 </div>
 <span className="text-slate-900 font-mono-ui font-display tracking-tight font-bold text-sm">{sh.equity}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Right Side Integrations Panel */}
 <div className="space-y-6">
 <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
 <h4 className="font-display tracking-tight font-bold text-sm text-slate-900 mb-3 uppercase tracking-wider text-[11px] text-slate-400">Government Portal Connections</h4>
 
 <div className="space-y-3">
 {[
 { name: "DET (Dubai Economic Dept)", label: "Mainland Sync", status: "Connected" },
 { name: "MoHRE (Ministry of Labour)", label: "Work Permits & Quotations", status: "Connected" },
 { name: "FTA EmaraTax Gateway", label: "VAT & Corporate Tax filings", status: "Connected" },
 { name: "WPS Bank Channel (HSBC)", label: "Salary transfers processing", status: "Connected" }
 ].map((int, i) => (
 <div key={i} className="p-3 border border-slate-150/60 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
 <div>
 <span className="font-display tracking-tight font-bold text-slate-800 block">{int.name}</span>
 <span className="text-slate-400 block mt-0.5">{int.label}</span>
 </div>
 <span className="text-[10px] font-display tracking-tight font-bold text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded uppercase">
 {int.status}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 </div>
 )}

 {activeTab === "strategy" && (
 <div className="space-y-6">
 <StrategySuite />
 </div>
  )}

  </div>
  </div>

  {/* Social Proof Testimonial Loop */}
  <div className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] origin-bottom-left ${showTestimonial && !testimonialDismissed ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8 pointer-events-none'}`}>
    <div className="bg-white border border-[#E2E8F0] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.15)] rounded-2xl p-5 w-[340px] flex gap-4 relative overflow-hidden group">
      {/* Decorative gradient strip */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#2563EB] to-[#10B981]"></div>
      
      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-display font-bold shrink-0 border border-slate-200 shadow-sm">
        {testimonials[activeTestimonial].name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-bold text-slate-900 text-sm leading-tight truncate">{testimonials[activeTestimonial].name}</span>
          <div className="flex items-center gap-0.5 shrink-0">
            <span className="text-amber-400 text-xs">★★★★★</span>
            <span className="text-[10px] text-slate-500 font-bold ml-1">{testimonials[activeTestimonial].stars}</span>
          </div>
        </div>
        <span className="text-[10px] text-slate-400 font-mono block mb-2 truncate">{testimonials[activeTestimonial].role}</span>
        
        <p className="text-xs text-slate-600 leading-relaxed font-medium">"{testimonials[activeTestimonial].text}"</p>
        
        <div className="mt-3 inline-block bg-emerald-50 border border-emerald-100 px-2 py-1 rounded text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
          {testimonials[activeTestimonial].timeSaved}
        </div>
      </div>
      
      {/* Close button */}
      <button onClick={() => setTestimonialDismissed(true)} className="absolute top-2 right-2 text-slate-300 hover:text-slate-600 transition-colors opacity-0 group-hover:opacity-100">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>
  </div>

  </div>
  );
}
