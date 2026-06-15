const fs = require('fs');

let content = fs.readFileSync('src/components/SaaSApp.tsx', 'utf8');

// 1. Insert handleSendChatMessage before handleAddTask
if (!content.includes('const handleSendChatMessage')) {
  const handlerCode = `
  const handleSendChatMessage = (e?: React.FormEvent, prompt?: string) => {
    if (e) e.preventDefault();
    const query = prompt || userInput;
    if (!query.trim()) return;
    
    setChatMessages([...chatMessages, { role: "user", content: query }]);
    setUserInput("");
    setChatLoading(true);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        role: "model", 
        content: "Based on 2026 UAE Corporate Tax Law and MoHRE labor regulations:\\n\\n1. **Your Query:** " + query + "\\n2. **Compliance Advice:** The standard threshold is AED 375,000 for Corporate Tax. For MoHRE, WPS discrepancies must be resolved within 15 days of the pay period.\\n\\n*ComplianceOS recommendation: Review your task tracker for pending tax or HR audits.*" 
      }]);
      setChatLoading(false);
    }, 2000);
  };
  
  const handleAddTask = (e: React.FormEvent) => {`;
  
  content = content.replace('const handleAddTask = (e: React.FormEvent) => {', handlerCode);
}

// 2. Connect the Corporate Registry buttons
// Look for `button className="text-[10px] bg-white/5 hover:bg-white/10 text-white px-2 py-1 rounded font-medium transition">Connect</button>`
// In light mode, it might be: `bg-slate-100 hover:bg-slate-200 text-slate-700`
// Let's replace the map rendering in Profile tab with the proper connectedAPIs logic
const oldProfileMap = `{[
                 { name: "Dubai DET", desc: "Mainland Sync", active: true },
                 { name: "MoHRE", desc: "Work Permits", active: true },
                 { name: "EmaraTax", desc: "VAT & Corporate Tax", active: true },
                 { name: "WPS Channel", desc: "Bank Transfers", active: false }
               ].map((int, i) => (`;

if (content.includes(oldProfileMap)) {
  const newProfileMap = `{[
                 { name: "Dubai DET", desc: "Mainland Sync", apiId: "det" },
                 { name: "MoHRE", desc: "Work Permits", apiId: "mohre" },
                 { name: "EmaraTax", desc: "VAT & Corporate Tax", apiId: "emaratax" },
                 { name: "WPS Channel", desc: "Bank Transfers", apiId: "wps" }
               ].map((int, i) => {
                 const isActive = connectedAPIs.includes(int.apiId) || (int.apiId !== "wps" && !connectedAPIs.includes(int.apiId) && false); // just default to state
                 return (
                 <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-[#E2E8F0] dark:border-slate-800 flex justify-between items-center">
                   <div>
                     <div className="text-slate-900 dark:text-white text-sm font-medium">{int.name}</div>
                     <div className="text-[10px] text-slate-500 dark:text-slate-400">{int.desc}</div>
                   </div>
                   {isActive ? (
                     <div className="text-[10px] bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded font-bold uppercase tracking-wider">Linked</div>
                   ) : (
                     <button onClick={() => handleConnectAPI(int.apiId)} className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-1 rounded font-medium transition disabled:opacity-50" disabled={isConnecting === int.apiId}>
                       {isConnecting === int.apiId ? "Syncing..." : "Connect"}
                     </button>
                   )}
                 </div>
               )})}`;
               
   // the old map was from `{[ ... ]}` down to `</div>\n               ))}`
   // I'll just use a regex
   content = content.replace(/\{\[\s*\{\s*name:\s*"Dubai DET"[\s\S]*?\)\}/, newProfileMap);
}

// 3. Ensure the light mode text for tasks in calendar is readable
content = content.replace(/text-white font-semibold text-sm/g, 'text-slate-900 dark:text-white font-semibold text-sm');

fs.writeFileSync('src/components/SaaSApp.tsx', content);
console.log('Successfully added send chat message and API connect buttons');
