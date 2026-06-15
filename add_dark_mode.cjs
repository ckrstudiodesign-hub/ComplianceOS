const fs = require('fs');

let content = fs.readFileSync('src/components/SaaSApp.tsx', 'utf8');

// 1. Change Name
content = content.replace(/Nabil Al-Maktoum/g, 'Mark Channa');
content = content.replace(/>N</g, '>MC<');

// 2. Inject dark mode state
if (!content.includes('isDarkMode')) {
  content = content.replace(
    'const [activeTab, setActiveTab] = useState<string>("dashboard");',
    `const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);`
  );
}

// 3. Add toggle button in sidebar user area
content = content.replace(
  '<div className="p-3 border-t border-[#E2E8F0] bg-white">',
  `<div className="p-3 border-t border-[#E2E8F0] dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-between items-center gap-2">`
);

content = content.replace(
  '<div className="flex items-center gap-3 bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-sm">',
  `<div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-[#E2E8F0] dark:border-slate-700 p-3 rounded-xl shadow-sm flex-1">`
);

content = content.replace(
  '<p className="text-[10px] text-slate-500 truncate leading-none mt-0.5">ABC Trading LLC</p>\n            </div>\n          </div>\n        </div>',
  `<p className="text-[10px] text-slate-500 dark:text-slate-400 truncate leading-none mt-0.5">ABC Trading LLC</p>
            </div>
          </div>
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition premium-card"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>`
);


// 4. Apply Dark Mode Classes universally
const replacements = [
  ['bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9]', 'bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] dark:from-slate-950 dark:to-slate-900'],
  ['text-[#1E293B]', 'text-[#1E293B] dark:text-white'],
  ['bg-white', 'bg-white dark:bg-slate-900'],
  ['border-[#E2E8F0]', 'border-[#E2E8F0] dark:border-slate-800'],
  ['text-[#475569]', 'text-[#475569] dark:text-slate-400'],
  ['text-slate-900', 'text-slate-900 dark:text-white'],
  ['text-slate-800', 'text-slate-800 dark:text-slate-100'],
  ['text-slate-700', 'text-slate-700 dark:text-slate-200'],
  ['text-slate-600', 'text-slate-600 dark:text-slate-300'],
  ['text-slate-500', 'text-slate-500 dark:text-slate-400'],
  ['border-slate-100', 'border-slate-100 dark:border-slate-800'],
  ['border-slate-200', 'border-slate-200 dark:border-slate-700'],
  ['bg-slate-50', 'bg-slate-50 dark:bg-slate-800/50'],
  ['bg-slate-100', 'bg-slate-100 dark:bg-slate-800'],
  ['bg-slate-200', 'bg-slate-200 dark:bg-slate-700'],
  ['hover:bg-slate-50', 'hover:bg-slate-50 dark:hover:bg-slate-800'],
  ['hover:bg-slate-100', 'hover:bg-slate-100 dark:hover:bg-slate-800'],
  ['hover:bg-slate-200', 'hover:bg-slate-200 dark:hover:bg-slate-700'],
  ['bg-[#F8FAFC]', 'bg-[#F8FAFC] dark:bg-slate-900'],
  ['shadow-sm', 'shadow-sm dark:shadow-none'],
];

// Perform selective replacement to avoid breaking specific colored elements
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  // Only apply dark mode to lines with className
  if (lines[i].includes('className=')) {
    for (let [find, replace] of replacements) {
       // Only replace exact matches that aren't already dark: modified
       let regex = new RegExp(`\\b${find.replace(/\[/g, '\\[').replace(/\]/g, '\\]')}\\b(?! dark:)`, 'g');
       lines[i] = lines[i].replace(regex, replace);
    }
  }
}

content = lines.join('\n');

// 5. Add staggered animation classes to Dashboard cards
content = content.replace('className="grid grid-cols-1 lg:grid-cols-3 gap-6"', 'className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeUp stagger-1"');
content = content.replace('className="lg:col-span-2 bg-white dark:bg-slate-900 p-6', 'className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 animate-fadeUp stagger-2 premium-card');
content = content.replace('className="space-y-6"\n', 'className="space-y-6 animate-fadeUp stagger-3"\n');
content = content.replace('className="p-6 bg-white dark:bg-slate-900 border border-[#E2E8F0]', 'className="p-6 bg-white dark:bg-slate-900 border border-[#E2E8F0] animate-fadeUp stagger-4 premium-card');

// 6. Ensure proper Responsive alignments on sidebar
content = content.replace('w-64 bg-white', 'w-64 hidden md:flex bg-white');

fs.writeFileSync('src/components/SaaSApp.tsx', content);
console.log('Successfully updated SaaSApp.tsx with dark mode and animations');
