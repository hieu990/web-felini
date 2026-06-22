const fs = require('fs');
let lines = fs.readFileSync('src/app/App.tsx', 'utf8').split('\n');

// Replace description opacity globally in cards
for (let i = 0; i < lines.length; i++) {
  // Description colors
  lines[i] = lines[i].replaceAll('text-[#EDE9E2]/80', 'text-[#FAF8F5]');
  lines[i] = lines[i].replaceAll('text-[#EDE9E2]/70', 'text-[#FAF8F5]/90');
  
  // EventCard Titles & Prices
  lines[i] = lines[i].replaceAll('text-[#D4AF37] text-lg leading-snug', 'text-[#D4AF37] text-lg leading-snug font-semibold [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]');
  lines[i] = lines[i].replaceAll('text-white text-xl leading-tight mb-4', 'text-white text-xl leading-tight mb-4 font-semibold [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]');
  lines[i] = lines[i].replaceAll('text-[#F5F2EB] text-2xl', 'text-[#F5F2EB] text-2xl font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]');
  lines[i] = lines[i].replaceAll('text-3xl text-white', 'text-3xl text-white font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]');

  // Menu Titles
  lines[i] = lines[i].replaceAll('text-[#F5F2EB] text-[16px] group-hover:text-[#B48C50] transition-colors leading-tight font-medium', 'text-[#F5F2EB] text-[17px] font-semibold tracking-wide group-hover:text-[#D4AF37] transition-colors leading-tight [text-shadow:_0_2px_8px_rgba(0,0,0,0.35)]');
  lines[i] = lines[i].replaceAll('text-[#F5F2EB] text-sm md:text-[15px] flex items-center gap-1.5 flex-wrap group-hover:text-[#B48C50] transition-colors', 'text-[#F5F2EB] text-sm md:text-[15px] font-semibold tracking-wide flex items-center gap-1.5 flex-wrap group-hover:text-[#D4AF37] transition-colors [text-shadow:_0_2px_8px_rgba(0,0,0,0.35)]');
  
  // Menu Prices
  lines[i] = lines[i].replaceAll('text-[#F5F2EB] text-base leading-none font-semibold', 'text-[#F5F2EB] text-[17px] leading-none font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]');
  lines[i] = lines[i].replaceAll('text-[#F5F2EB] text-[13px] leading-none mt-1.5 font-medium', 'text-[#F5F2EB] text-[14px] leading-none mt-1.5 font-bold [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]');

  // Tracking adjustments for wine pairing & small text
  lines[i] = lines[i].replaceAll('text-[9.5px] text-[#D4AF37] font-[\'Plus_Jakarta_Sans\'] mt-1 flex', 'text-[9.5px] text-[#D4AF37] font-[\'Plus_Jakarta_Sans\'] tracking-wide mt-1 flex');
  lines[i] = lines[i].replaceAll('text-[#D4AF37] shrink-0', 'text-[#D4AF37] shrink-0 drop-shadow-md');
  lines[i] = lines[i].replaceAll('font-[\'Plus_Jakarta_Sans\'] italic', 'font-[\'Plus_Jakarta_Sans\'] italic tracking-wide');
}

fs.writeFileSync('src/app/App.tsx', lines.join('\n'), 'utf8');
console.log('Typography enhanced');
