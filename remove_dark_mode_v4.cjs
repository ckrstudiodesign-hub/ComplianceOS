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
  // We use a safe character class that explicitly EXCLUDES quotes, spaces, and backticks.
  content = content.replace(/dark:[a-zA-Z0-9\-\/\[\]#%:]+/g, '');
  
  // 5. Clean up double spaces without removing newlines
  content = content.replace(/ {2,}/g, ' ');

  // 6. Fix TRN invisible text inside Corporate Identity Wallet Card
  content = content.replace(
    /text-white">100293184729\.\.\.<\/span>/g,
    'text-slate-900">100293184729...</span>'
  );
  
  fs.writeFileSync(filePath, content);
  console.log('Cleaned ' + filePath);
}

cleanFile('src/components/SaaSApp.tsx');
if (fs.existsSync('src/components/StrategySuite.tsx')) {
  cleanFile('src/components/StrategySuite.tsx');
}
