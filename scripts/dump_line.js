const fs = require('fs');
const path = process.argv[2] || 'src/app/support/our-story/page.tsx';
const lineNum = Number(process.argv[3] || 348); // zero-based

const content = fs.readFileSync(path, 'utf8');
const lines = content.split(/\r?\n/);
const line = lines[lineNum];
console.log('Line content:', line);
for (let i = 0; i < line.length; i++) {
  const c = line[i];
  const code = c.codePointAt(0);
  console.log(String(i).padStart(3), c === ' ' ? '␠' : c, code);
}
console.log('Index of < :', line.indexOf('<'));
