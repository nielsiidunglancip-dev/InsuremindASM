const fs = require('fs');
const html = fs.readFileSync('d:/AI/Antigravity/index.html', 'utf8');

// Helper to find line number from index
function getLineNumber(index) {
    return html.substring(0, index).split('\n').length;
}

const tagRegex = /<(\/?)([a-zA-Z0-9:-]+)(?:\s+[^>]*?)?>/gs;
let match;
let openTags = [];

while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const isClosing = match[1] === '/';
    const tagName = match[2].toLowerCase();
    const index = match.index;
    const line = getLineNumber(index);
    
    // Skip self-closing tags
    if (fullTag.endsWith('/>') || ['img', 'br', 'hr', 'input', 'meta', 'link'].includes(tagName)) {
        continue;
    }
    
    if (isClosing) {
        const indexInStack = openTags.map(t => t.tag).lastIndexOf(tagName);
        if (indexInStack !== -1) {
            const mainIndex = openTags.map(t => t.tag).indexOf('main');
            if (mainIndex !== -1 && indexInStack < mainIndex) {
                console.log(`Line ${line}: Closing tag </${tagName}> is splicing out <main> (line ${openTags[mainIndex].line}) because it was opened before the top of stack was cleared.`);
                console.log(`Closing tag text: ${fullTag.replace(/\s+/g, ' ')}`);
                console.log('Stack before splice:', openTags.map(t => `${t.tag}(${t.line})`).join(', '));
            }
            openTags.splice(indexInStack);
        }
    } else {
        openTags.push({ tag: tagName, line: line });
    }
}
console.log("Analysis finished.");
