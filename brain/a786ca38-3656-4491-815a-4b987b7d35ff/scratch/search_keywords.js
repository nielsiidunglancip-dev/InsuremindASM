const fs = require('fs');

const filePath = 'C:\\Users\\ASM\\.gemini\\antigravity-ide\\brain\\a786ca38-3656-4491-815a-4b987b7d35ff\\.system_generated\\steps\\4\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

console.log("File length:", content.length);

// Let's print out lines containing some Indonesian words
const lines = content.split('\n');
console.log("Total lines:", lines.length);

const keywords = ["sistem", "flow", "desain", "aplikasi", "PRD", "fitur", "database", "arsitektur", "pengguna", "login", "admin", "pembayaran"];
const matchingLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (const kw of keywords) {
    if (line.toLowerCase().includes(kw)) {
      matchingLines.push({ lineNum: i + 1, kw, snippet: line.substring(0, 200) });
      break;
    }
  }
}

console.log(`Found ${matchingLines.length} matching lines.`);
matchingLines.slice(0, 30).forEach(m => {
  console.log(`Line ${m.lineNum} (Keyword: ${m.kw}): ${m.snippet}`);
});
