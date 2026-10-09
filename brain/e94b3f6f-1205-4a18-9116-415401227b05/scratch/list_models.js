const https = require('https');
const fs = require('fs');

async function main() {
  let apiKey = '';
  try {
    const env = fs.readFileSync('d:/AI/CHATBOT AI/.env', 'utf8');
    const match = env.match(/GEMINI_API_KEY\s*=\s*([^\s#]+)/);
    if (match) apiKey = match[1];
  } catch(e) {
    console.error('Failed to read env:', e);
  }
  
  console.log('Using API Key:', apiKey ? apiKey.substring(0, 10) + '...' : 'none');
  if (!apiKey) return;
  
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.models) {
          console.log('Available Models:');
          json.models.forEach(m => {
            if (m.supportedGenerationMethods.includes('generateContent')) {
              console.log(`- ${m.name}`);
            }
          });
        } else {
          console.log('Response:', json);
        }
      } catch(e) {
        console.log('Failed to parse:', data);
      }
    });
  }).on('error', (err) => {
    console.log('Error:', err.message);
  });
}

main();
