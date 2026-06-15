const fs = require('fs');

function cleanFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

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
  content = content.replace(
    /bg-\[#F8FAFC\] dark:bg-slate-950/,
    'bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9]'
  );

  // 4. Remove all `dark:` classes globally
  content = content.replace(/dark:[a-zA-Z0-9\-\/\[\]#%:]+/g, '');
  
  // Clean up double spaces created by removal but do NOT remove newlines
  content = content.replace(/ \s+/g, ' ');

  // 5. Fix any invisible text. If there's `text-white` without a dark background in light mode:
  // e.g. `<span className="font-display tracking-tight font-bold text-xs text-white">100293184729...</span>`
  // That text is inside the Corporate Identity Wallet Card! The card has a white background in light mode. So `text-white` on `bg-white` is invisible!
  // I must fix `text-white` inside that specific card to `text-slate-900`
  content = content.replace(
    /text-white">100293184729\.\.\.<\/span>/g,
    'text-slate-900">100293184729...</span>'
  );

  // Check if there are other `text-white` that should be dark
  // The Team avatars list: `bg-white px-4 ... text-white uppercase border-2`
  // Wait, the avatars are `bg-emerald-500 text-white`, which is fine.
  // The "Corporate TRN" label was text-white on a white card!
  
  // Let's also check if "activeTab === 'calendar'" has text-white on calendar filters.
  // `className={"text-xs px-3 py-1.5 rounded-lg font-medium transition \${ calendarFilter === cat ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200" }`
  // That's fine.

  fs.writeFileSync(filePath, content);
  console.log('Cleaned ' + filePath);
}

cleanFile('src/components/SaaSApp.tsx');
if (fs.existsSync('src/components/StrategySuite.tsx')) {
  cleanFile('src/components/StrategySuite.tsx');
}
