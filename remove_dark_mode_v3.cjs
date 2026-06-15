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
  // Use `\S` which matches non-whitespace characters
  content = content.replace(/dark:\S+/g, '');
  
  // 5. Clean up spaces without matching newlines
  content = content.replace(/ {2,}/g, ' ');

  // 6. Fix TRN invisible text inside Corporate Identity Wallet Card
  content = content.replace(
    /text-white">100293184729\.\.\.<\/span>/g,
    'text-slate-900">100293184729...</span>'
  );
  
  // 7. Fix text-white on calendar filters when inactive
  // Inactive buttons have `bg-slate-100 text-slate-500 hover:bg-slate-200`
  // Active buttons had `bg-slate-900 text-white` -> which IS visible.
  
  // 8. Fix Ask AI button in Chat tab
  // Check if it's text-white. In 083c65d: `<button type="submit" className="bg-[#1E293B] hover:bg-slate-800 text-white ...">` -> This is visible!

  // 9. Are there any other text-white that are inside white containers?
  // Let's replace any `text-white` that might be sitting inside `bg-white` or `bg-transparent`.
  // Wait, I can't do that easily via regex. I will run grep later to see.

  fs.writeFileSync(filePath, content);
  console.log('Cleaned ' + filePath);
}

cleanFile('src/components/SaaSApp.tsx');
if (fs.existsSync('src/components/StrategySuite.tsx')) {
  cleanFile('src/components/StrategySuite.tsx');
}
