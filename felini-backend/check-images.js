const https = require('https');

const url = 'https://ruoutot.net/san-pham/ruou-vang-grand-tokaj-furmint-dry';

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

async function main() {
  const html = await getHTML(url);
  console.log(`HTML length: ${html.length}`);
  
  // Find all matches for standard image patterns
  const regex = /[^"'() >]+\.(?:jpg|png|webp|jpeg)/gi;
  const matches = html.match(regex) || [];
  const unique = [...new Set(matches)];
  console.log(`Found ${unique.length} unique image patterns:`);
  for (const match of unique) {
    if (match.includes('uploads') || match.includes('products') || match.includes('avata') || match.includes('tokaj')) {
      console.log(match);
    }
  }
}

main();
