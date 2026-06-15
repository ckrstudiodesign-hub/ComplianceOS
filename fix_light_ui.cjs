const fs = require('fs');

let content = fs.readFileSync('src/components/SaaSApp.tsx', 'utf8');

// 1. Color Contrast Fixes for Light Mode
// Ensure cards have proper background and borders, text is readable in both modes
content = content.replace(/bg-white border border-\[#E2E8F0\]/g, 'bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800');
content = content.replace(/bg-\[#F8FAFC\]/g, 'bg-[#F8FAFC] dark:bg-slate-950');
content = content.replace(/text-slate-900/g, 'text-slate-900 dark:text-white');
content = content.replace(/text-\[#1E293B\]/g, 'text-[#1E293B] dark:text-white');

// Fix repeated dark classes if any
content = content.replace(/dark:text-white dark:text-white/g, 'dark:text-white');
content = content.replace(/dark:bg-slate-900 dark:bg-slate-900/g, 'dark:bg-slate-900');

// 2. Add New State for Button Simulations at the top of the component
if (!content.includes('const [isDownloading, setIsDownloading] = useState(false);')) {
  content = content.replace(
    '// State for document scanning',
    `// State for Button Simulations
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
  
  // State for document scanning`
  );
}

// 3. Connect buttons to simulations

// "View Registry" in Dashboard
content = content.replace(
  /<button className="text-xs font-semibold text-\[#2563EB\] hover:underline">View Registry<\/button>/g,
  '<button onClick={() => setViewAllRegistry(!viewAllRegistry)} className="text-xs font-semibold text-[#2563EB] hover:underline">{viewAllRegistry ? "Collapse" : "View Registry"}</button>'
);

// If there's a limit on rendering notices or tasks, make it respect viewAllRegistry (mocking it roughly)
content = content.replace(
  /notices\.slice\(0, 3\)/g,
  'viewAllRegistry ? notices : notices.slice(0, 3)'
);

// "Export/Download" in various places
content = content.replace(
  /<button className="px-4 py-2 bg-white dark:bg-slate-800 border border-\[#E2E8F0\] dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition">/g,
  '<button onClick={handleDownload} className="px-4 py-2 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center gap-2">'
);

content = content.replace(
  /Export Report<\/button>/g,
  '{isDownloading ? "Generating..." : "Export Report"}</button>'
);

content = content.replace(
  /Download PDF<\/button>/g,
  '{isDownloading ? "Downloading..." : "Download PDF"}</button>'
);

// Add "Mark Complete" button to task cards
// The task card has a map over tasks, we want to add a button. Let's look for the task rendering.
// It renders `<div className="flex justify-between items-start mb-3">`
// Let's add a button next to the severity tag.
content = content.replace(
  /<div className="text-slate-400">#\{task\.id\.split\('task-'\)\[1\]\}<\/div>/g,
  `<div className="text-slate-400">#{task.id.split('task-')[1]}</div>
   {task.status !== 'completed' && (
      <button onClick={(e) => handleCompleteTask(task.id, e)} className="ml-2 text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded hover:bg-emerald-100 transition z-10 relative">Mark Done</button>
   )}`
);

fs.writeFileSync('src/components/SaaSApp.tsx', content);
console.log('Successfully polished Light Mode UI and added button simulations');
