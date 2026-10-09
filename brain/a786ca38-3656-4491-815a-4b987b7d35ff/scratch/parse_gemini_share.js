const fs = require('fs');

const filePath = 'C:\\Users\\ASM\\.gemini\\antigravity-ide\\brain\\a786ca38-3656-4491-815a-4b987b7d35ff\\.system_generated\\steps\\4\\content.md';
const content = fs.readFileSync(filePath, 'utf8');

// Let's find window.WIZ_global_data
const match = content.match(/window\.WIZ_global_data\s*=\s*(\{.+?\});/);
if (match) {
  console.log("Found window.WIZ_global_data!");
  try {
    const data = JSON.parse(match[1]);
    fs.writeFileSync('C:\\Users\\ASM\\.gemini\\antigravity-ide\\brain\\a786ca38-3656-4491-815a-4b987b7d35ff\\scratch\\wiz_data.json', JSON.stringify(data, null, 2));
    console.log("Wrote wiz_data.json");
    
    // Let's inspect keys and look for the conversation structure
    for (const key of Object.keys(data)) {
      const val = data[key];
      const strVal = JSON.stringify(val);
      if (strVal.includes("flow") || strVal.includes("aplikasi") || strVal.includes("sistem")) {
        console.log(`Key "${key}" contains relevant keywords!`);
        // Let's output a portion of it
        console.log(strVal.substring(0, 500));
      }
    }
  } catch (e) {
    console.error("Failed to parse window.WIZ_global_data as JSON:", e.message);
    // If it's not strictly JSON (e.g. contains functions, undefined, etc.), let's do a substring search
    const dataStr = match[1];
    fs.writeFileSync('C:\\Users\\ASM\\.gemini\\antigravity-ide\\brain\\a786ca38-3656-4491-815a-4b987b7d35ff\\scratch\\wiz_data.txt', dataStr);
    console.log("Wrote wiz_data.txt");
  }
} else {
  console.log("Could not find window.WIZ_global_data");
  // Let's find all long string occurrences
  const regex = /"([^"\\]|\\.)*"/g;
  let matches;
  let results = [];
  while ((matches = regex.exec(content)) !== null) {
    const s = matches[0];
    if (s.length > 200 && (s.includes("aplikasi") || s.includes("sistem") || s.includes("flow") || s.includes("PRD"))) {
      results.push(s);
    }
  }
  console.log(`Found ${results.length} long strings with keywords`);
  fs.writeFileSync('C:\\Users\\ASM\\.gemini\\antigravity-ide\\brain\\a786ca38-3656-4491-815a-4b987b7d35ff\\scratch\\strings.txt', results.join('\n\n'));
}
