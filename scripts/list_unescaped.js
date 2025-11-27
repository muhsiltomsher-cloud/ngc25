const fs = require('fs');
const path = process.argv[2] || 'src/app/support/our-story/page.tsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("'") || line.includes('"We help redefine spaces,"')) {
    console.log(String(i + 1).padStart(5) + ': ' + line);
  }
}
