const fs = require('fs');
let content = fs.readFileSync('src/components/SaaSApp.tsx', 'utf8');

// 1. Root background
content = content.replace('bg-[#F3F4F6] text-[#1E293B] min-h-screen', 'bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] text-[#1E293B] min-h-screen');

// 2. Sidebar
content = content.replace('bg-[#FAF9FB] border-r border-[#E2E8F0] text-[#475569]', 'bg-white border-r border-[#E2E8F0] text-[#475569] shadow-sm z-10');
content = content.replace('bg-gradient-to-tr from-[#2563EB] to-[#4F46E5] flex items-center justify-center text-white', 'bg-[#2563EB] flex items-center justify-center text-white');
content = content.replace('bg-slate-900 text-white p-3 rounded-xl shadow-xs', 'bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-sm');
content = content.replace('text-white leading-tight', 'text-slate-900 leading-tight');
content = content.replace('text-slate-400 truncate leading-none mt-0.5', 'text-slate-500 truncate leading-none mt-0.5');

// 3. Typography
content = content.replace(/className="([^"]*?)\bfont-bold\b([^"]*?)"/g, 'className="$1font-display tracking-tight font-bold$2"');
content = content.replace(/className="([^"]*?)\bfont-extrabold\b([^"]*?)"/g, 'className="$1font-display tracking-tight font-bold$2"');
content = content.replace(/className="([^"]*?)\bfont-black\b([^"]*?)"/g, 'className="$1font-display tracking-tight font-bold$2"');
content = content.replace(/\bfont-mono\b/g, 'font-mono-ui');

// 4. Badges / Metadata
content = content.replace(/text-\[10px\] uppercase font-mono-ui font-display tracking-tight font-bold px-2 py-0\.5 rounded/g, 'text-[10px] uppercase font-mono-ui font-bold px-2.5 py-1 rounded border');
content = content.replace(/text-xs text-slate-400 uppercase tracking-wider font-mono-ui/g, 'text-[10px] text-slate-500 uppercase tracking-wider font-mono-ui border border-slate-200 bg-white/50 px-2 py-1 rounded inline-block mb-2');

// 5. High-saturation elements
content = content.replace('bg-white/40 p-6 rounded-[2rem] border border-[#E2E8F0] backdrop-blur-xs', 'bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm');
content = content.replace(/p-6 rounded-\[1\.75rem\] border border-\[#E2E8F0\]/g, 'p-7 rounded-2xl border border-[#E2E8F0] shadow-sm bg-white');
content = content.replace('bg-gradient-to-br from-[#2563EB] via-[#4338CA] to-[#1E1B4B] p-6 rounded-[1.75rem] text-white flex flex-col justify-between shadow-md relative overflow-hidden group', 'bg-white border border-[#E2E8F0] p-7 rounded-2xl flex flex-col justify-between shadow-sm relative overflow-hidden group');

// 6. Card B Wallet specific
content = content.replace('text-[10px] font-display tracking-tight font-bold tracking-widest text-[#93C5FD] uppercase block', 'text-[10px] font-display tracking-tight font-bold tracking-widest text-slate-400 uppercase block');
content = content.replace('font-display tracking-tight font-bold text-xs text-white uppercase tracking-wider mt-0.5', 'font-display tracking-tight font-bold text-xs text-slate-900 uppercase tracking-wider mt-0.5');
content = content.replace('text-slate-300 text-[9px] tracking-wider uppercase block font-mono-ui', 'text-slate-500 text-[9px] tracking-wider uppercase block font-mono-ui');
content = content.replace('text-lg font-mono-ui font-display tracking-tight font-bold tracking-widest block text-white mt-0.5', 'text-lg font-mono-ui font-display tracking-tight font-bold tracking-widest block text-slate-900 mt-0.5');
content = content.replace('text-[9px] text-[#93C5FD] uppercase tracking-wider block font-mono-ui', 'text-[9px] text-slate-400 uppercase tracking-wider block font-mono-ui');
content = content.replace('font-display tracking-tight font-bold text-xs text-white', 'font-display tracking-tight font-bold text-xs text-slate-900');
content = content.replace('bg-amber-400/85', 'bg-slate-200');
content = content.replace(/bg-amber-600\/50/g, 'bg-slate-300');
content = content.replace('border-white/10', 'border-slate-100');

// 7. Black Promo Card
content = content.replace('bg-slate-950 p-6 rounded-[1.75rem] text-white shadow-lg border border-slate-900 flex flex-col justify-between relative overflow-hidden group', 'bg-[#F8FAFC] border border-[#E2E8F0] p-7 rounded-2xl text-slate-900 shadow-sm flex flex-col justify-between relative overflow-hidden group');
content = content.replace('text-[#A5A6FF] uppercase tracking-widest', 'text-[#2563EB] uppercase tracking-widest');
content = content.replace('text-indigo-400 animate-pulse', 'text-[#2563EB]');
content = content.replace('font-display tracking-tight font-bold text-sm text-white', 'font-display tracking-tight font-bold text-sm text-slate-900');
content = content.replace('text-[11px] text-slate-400 mt-2.5 leading-relaxed', 'text-[11px] text-slate-500 mt-2.5 leading-relaxed');
content = content.replace('bg-white hover:bg-slate-100 text-slate-950', 'bg-white border border-[#E2E8F0] hover:bg-slate-50 text-slate-900');
content = content.replace('bg-indigo-500/10', 'bg-slate-200/50');
content = content.replace('group-hover:bg-indigo-500/20', 'group-hover:bg-slate-200/80');

// 8. AI Document Scanner box
content = content.replace('bg-blue-50 rounded-full blur-2xl', 'bg-slate-50 rounded-full blur-2xl');
content = content.replace('border border-[#E2E8F0] rounded-[1.75rem]', 'border border-[#E2E8F0] rounded-2xl p-7');

// 9. Tasks Tab
content = content.replace('bg-slate-50 border border-slate-200 rounded-xl space-y-4', 'bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-6 space-y-4');

// 10. Update buttons
content = content.replace(/bg-slate-900 hover:bg-slate-800 text-white/g, 'bg-[#1E293B] hover:bg-slate-800 text-white shadow-sm');
content = content.replace(/bg-emerald-600 hover:bg-emerald-700/g, 'bg-[#10B981] hover:bg-[#059669] shadow-sm');

// 11. Tables
content = content.replace(/text-slate-400 text-xs font-mono-ui uppercase/g, 'text-slate-500 text-[10px] font-mono-ui uppercase tracking-wider');

fs.writeFileSync('src/components/SaaSApp.tsx', content);
console.log('Successfully updated SaaSApp.tsx via script');
