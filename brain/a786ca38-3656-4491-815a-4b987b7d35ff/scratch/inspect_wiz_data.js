const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\ASM\\.gemini\\antigravity-ide\\brain\\a786ca38-3656-4491-815a-4b987b7d35ff\\scratch\\wiz_data.json', 'utf8'));

let allStrings = [];
function recurse(obj, path = '') {
  if (obj === null || obj === undefined) return;
  if (typeof obj === 'string') {
    allStrings.push({ path, val: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => recurse(item, `${path}[${index}]`));
  } else if (typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      recurse(obj[key], `${path}.${key}`);
    }
  }
}

recurse(data);

console.log(`Total strings: ${allStrings.length}`);
allStrings.forEach((item, idx) => {
  console.log(`${idx}: Path: ${item.path}, Length: ${item.val.length}`);
  console.log(`   Val: ${item.val.substring(0, 150)}`);
});
