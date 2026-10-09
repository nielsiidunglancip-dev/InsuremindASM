const fs = require('fs'); 
const lines = fs.readFileSync('index.html', 'utf8').split('\n'); 
let shellStart = -1; 
let open = 0; 
for(let i=0; i<lines.length; i++) { 
    if(lines[i].includes('id="app-shell"')) { 
        shellStart = i; 
        open = 0; 
    } 
    if(shellStart >= 0) { 
        const openMatch = lines[i].match(/<div/g); 
        const closeMatch = lines[i].match(/<\/div/g); 
        if(openMatch) open += openMatch.length; 
        if(closeMatch) open -= closeMatch.length; 
        if(open <= 0 && i > shellStart) { 
            console.log('Shell closed at line:', i+1); 
            break; 
        } 
    } 
}
