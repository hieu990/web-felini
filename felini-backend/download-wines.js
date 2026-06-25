const fs = require('fs');
const path = require('path');
const https = require('https');

const wines = [
  {
    name: 'tokaj_furmint',
    url: 'https://ruoutot.net/san-pham/ruou-vang-grand-tokaj-furmint-dry'
  },
  {
    name: 'luis_canas',
    url: 'https://ruoutot.net/san-pham/ruou-vang-luis-canas-reserva'
  },
  {
    name: 'artero',
    url: 'https://ruoutot.net/san-pham/ruou-vang-bodegas-artero-crianza'
  },
  {
    name: 'primadonna_chardonnay',
    url: 'https://ruoutot.net/san-pham/ruou-vang-varvaglione-primadonna-chardonnay'
  },
  {
    name: 'v3_negroamaro',
    url: 'https://ruoutot.net/san-pham/vang-y-v3-negroamaro-del-salento'
  },
  {
    name: 'papale_primitivo',
    url: 'https://ruoutot.net/san-pham/ruou-vang-papale-primitivo-di-manduria'
  }
];

const destDir = path.join(__dirname, 'uploads');

function getHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download: ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', err => reject(err));
  });
}

async function main() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const wine of wines) {
    try {
      console.log(`Fetching page: ${wine.url}`);
      const html = await getHTML(wine.url);
      
      // Look for og:image meta tag
      const match = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                    html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
      
      if (match && match[1]) {
        let imageUrl = match[1];
        console.log(`Found image URL for ${wine.name}: ${imageUrl}`);
        
        // Determine file extension
        const ext = path.extname(imageUrl.split('?')[0]) || '.jpg';
        const filename = `${wine.name}${ext}`;
        const destPath = path.join(destDir, filename);
        
        console.log(`Downloading to: ${filename}`);
        await downloadFile(imageUrl, destPath);
        console.log(`Successfully downloaded ${filename}`);
        wine.filename = filename;
      } else {
        console.error(`Could not find og:image for ${wine.name}`);
      }
    } catch (err) {
      console.error(`Error processing ${wine.name}:`, err.message);
    }
  }

  console.log('Finished downloading wine images.');
  console.log('Image mappings:', wines.map(w => ({ name: w.name, filename: w.filename })));
}

main();
