const fs = require('fs');
let content = fs.readFileSync('src/components/SaaSApp.tsx', 'utf8');

// 1. Remove the Dark Mode State and Hook
content = content.replace(
  /const \[isDarkMode, setIsDarkMode\] = useState\([\s\S]*?\}\);\s*useEffect\(\(\) => \{[\s\S]*?\}, \[isDarkMode\]\);/,
  ''
);

// 2. Remove the Dark Mode Toggle Button
content = content.replace(
  /<button\s*onClick=\{\(\) => setIsDarkMode\(!isDarkMode\)\}[\s\S]*?\{isDarkMode \? '☀️' : '🌙'\}\s*<\/button>/,
  ''
);

// 3. Ensure the main gradient background is intact
// Looking at the root div:
// <div className="min-h-screen text-slate-900 dark:text-white bg-[#F8FAFC] dark:bg-slate-950 selection:bg-[#2563EB]/20 selection:text-[#1E293B] flex flex-col font-sans" id="master-app-root">
// Wait, the user specifically wants the gradient background. In 083c65d, the root background was:
// style={{ background: "linear-gradient(180deg, #F8FAFC 0%, #F1F5F9 100%)", fontFamily: ... }}
// Let's enforce the gradient using tailwind classes instead of inline styles if it isn't already, or just keep it.
content = content.replace(
  /<div\s*className="min-h-screen text-slate-900 dark:text-white bg-\[#F8FAFC\] dark:bg-slate-950 selection:bg-\[#2563EB\]\/20 selection:text-\[#1E293B\] flex flex-col font-sans"\s*id="master-app-root">/,
  '<div className="min-h-screen text-slate-900 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] selection:bg-[#2563EB]/20 selection:text-[#1E293B] flex flex-col font-sans" id="master-app-root">'
);

// Fallback if the regex above didn't match the exact class string due to previous edits:
content = content.replace(
  /bg-\[#F8FAFC\] dark:bg-slate-950/g,
  'bg-transparent'
);

// 4. Remove all `dark:` classes globally from the file
// This regex looks for `dark:` followed by any valid tailwind class characters up to a space or quote
content = content.replace(/dark:[a-zA-Z0-9\-\/\[\]#%]+/g, '');

// Clean up any double spaces created by the removal
content = content.replace(/\s{2,}/g, ' ');

// Clean up space before closing quote
content = content.replace(/ "/g, '"');

fs.writeFileSync('src/components/SaaSApp.tsx', content);
console.log('Successfully removed dark mode and enforced gradient background');
