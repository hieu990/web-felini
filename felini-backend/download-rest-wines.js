const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

const wines = [
  {
    name: 'papale_primitivo',
    url: 'https://khoruou68.vn/ruou-vang-y-papale-primitivo-di-manduria/'
  }
];

const destDir = path.join(__dirname, 'uploads');

function getHTML(url) {
  return new Promise((resolve, reject) => {
    function fetch(currentUrl) {
      https.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let newUrl = res.headers.location;
          if (newUrl.startsWith('/')) {
            const parsed = new URL(currentUrl);
            newUrl = `${parsed.protocol}//${parsed.host}${newUrl}`;
          }
          console.log(`Redirecting: ${currentUrl} -> ${newUrl}`);
          fetch(newUrl);
          return;
        }
        
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => resolve(data));
      }).on('error', err => reject(err));
    }
    fetch(url);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    function fetch(currentUrl) {
      https.get(currentUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let newUrl = res.headers.location;
          if (newUrl.startsWith('/')) {
            const parsed = new URL(currentUrl);
            newUrl = `${parsed.protocol}//${parsed.host}${newUrl}`;
          }
          fetch(newUrl);
          return;
        }

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
    }
    fetch(url);
  });
}

async function main() {
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
      } else {
        console.error(`Could not find og:image for ${wine.name}`);
      }
    } catch (err) {
      console.error(`Error processing ${wine.name}:`, err.message);
    }
  }
}

main();
