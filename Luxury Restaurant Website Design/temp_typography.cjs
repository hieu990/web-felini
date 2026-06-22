const fs = require('fs');
let lines = fs.readFileSync('src/app/App.tsx', 'utf8').split('\n');

let ecStart = lines.findIndex(l => l.includes('function EventCard('));
let ecEnd = lines.findIndex((l, i) => i > ecStart && l.includes('return t;'));
if (ecEnd === -1) ecEnd = lines.findIndex((l, i) => i > ecStart && l.startsWith('}'));

for (let i = ecStart; i <= ecEnd; i++) {
  lines[i] = lines[i].replaceAll('text-[#5A1423] dark:text-[#FAF8F5]', 'text-[#D4AF37]');
  lines[i] = lines[i].replaceAll('background: "#5A1423"', 'background: "#D4AF37", color: "#4A151D"');
  lines[i] = lines[i].replaceAll('text-white/55', 'text-[#EDE9E2]/70');
}

let msStart = lines.findIndex(l => l.includes('function MenuScene('));
let msEnd = lines.findIndex((l, i) => i > msStart && l.startsWith('}'));

for (let i = msStart; i <= msEnd; i++) {
  if (lines[i].includes('text-[#2C2C2A] dark:text-[#FAF8F5]')) {
    lines[i] = lines[i].replaceAll('text-[#2C2C2A] dark:text-[#FAF8F5]', 'text-[#F5F2EB]');
  }
  lines[i] = lines[i].replaceAll('text-[#7A7A72] dark:text-[#FAF8F5]', 'text-[#EDE9E2]/80');
  lines[i] = lines[i].replaceAll('text-[#5A5A56] dark:text-[#FAF8F5]', 'text-[#EDE9E2]/80');
  lines[i] = lines[i].replaceAll('border-[rgba(44,44,42,0.06)]', 'border-white/10');
  lines[i] = lines[i].replaceAll('bg-[#F0EDE8]/40', 'bg-white/5');
  lines[i] = lines[i].replaceAll('border-[#2C2C2A]/5', 'border-white/10');
  lines[i] = lines[i].replaceAll('bg-[#B48C50]/5', 'bg-[#D4AF37]/10');
  lines[i] = lines[i].replaceAll('text-[#B48C50]', 'text-[#D4AF37]');
  lines[i] = lines[i].replaceAll('border-[#B48C50]', 'border-[#D4AF37]');
  lines[i] = lines[i].replaceAll('text-[#8C6227]', 'text-[#D4AF37]');
  lines[i] = lines[i].replaceAll('bg-[#FAF9F6]', 'bg-white/5');
  lines[i] = lines[i].replaceAll('dark:bg-[#5A1423]', '');
}

fs.writeFileSync('src/app/App.tsx', lines.join('\n'), 'utf8');
console.log('Fixed internal typography and badges');
