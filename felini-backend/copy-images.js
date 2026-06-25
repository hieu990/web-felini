const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\admin\\.gemini\\antigravity-ide\\brain\\1771852d-7343-498d-a449-78a3929f760d';
const destDir = path.join(__dirname, 'uploads');

const mappings = {
  'sprite_fine_dining_1782408373440.png': 'sprite.png',
  'cola_luxury_1782408545958.png': 'cola.png',
  'acqua_panna_luxury_1782408459376.png': 'acqua_panna.png',
  'san_pellegrino_luxury_1782408470782.png': 'san_pellegrino.png',
  'san_pellegrino_limonata_luxury_1782408482756.png': 'san_pellegrino_limonata.png',
  'ginger_ale_luxury_1782408495107.png': 'ginger_ale.png',
  'espresso_luxury_1782408508159.png': 'espresso.png',
  'vietnamese_coffee_luxury_1782408520140.png': 'vietnamese_coffee.png',
  'peppermint_tea_luxury_1782408533244.png': 'peppermint_tea.png',
  'mojito_cocktail_1782408392507.png': 'mojito.png',
  'virgin_mojito_mocktail_1782408406535.png': 'virgin_mojito.png',
  'corona_beer_luxury_1782408558262.png': 'corona.png',
  'heineken_beer_luxury_1782408570476.png': 'heineken.png',
  'aperol_spritz_luxury_1782408581283.png': 'aperol_spritz.png',
  'negroni_luxury_1782408592952.png': 'negroni.png',
  'espresso_martini_luxury_1782408604727.png': 'espresso_martini.png',
  'hugo_spritz_luxury_1782408616835.png': 'hugo_spritz.png',
  'sunrise_mocktail_luxury_1782408630115.png': 'sunrise_mocktail.png',
};

function copyFiles() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created uploads directory:', destDir);
  }

  for (const [srcName, destName] of Object.entries(mappings)) {
    const srcPath = path.join(srcDir, srcName);
    const destPath = path.join(destDir, destName);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${srcName} -> ${destName}`);
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
  }

  console.log('All image copies completed.');
}

copyFiles();
