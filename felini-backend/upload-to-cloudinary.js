/**
 * upload-to-cloudinary.js
 * ========================
 * Tự động upload toàn bộ ảnh trong thư mục uploads/ lên Cloudinary
 * và in ra mapping URL để cập nhật vào seed-menu.js
 *
 * Cách dùng:
 *   node upload-to-cloudinary.js
 *
 * Yêu cầu biến môi trường (hoặc điền trực tiếp bên dưới):
 *   CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   CLOUDINARY_API_KEY=your_api_key
 *   CLOUDINARY_API_SECRET=your_api_secret
 */

const path = require('path');
const fs = require('fs');
const cloudinaryPath = path.join(process.cwd(), 'node_modules', 'cloudinary');
const cloudinary = require(cloudinaryPath).v2;

// ─── Cấu hình Cloudinary ────────────────────────────────────────────────────
// Có thể điền trực tiếp hoặc dùng biến môi trường
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'YOUR_CLOUD_NAME',
  api_key:    process.env.CLOUDINARY_API_KEY    || 'YOUR_API_KEY',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'YOUR_API_SECRET',
});
// ────────────────────────────────────────────────────────────────────────────

const UPLOADS_DIR = path.join(__dirname, 'uploads');
const OUTPUT_FILE = path.join(__dirname, 'cloudinary-urls.json');

// Danh sách tất cả ảnh cần upload
const IMAGES = [
  // Đồ uống không cồn
  'acqua_panna.png',
  'san_pellegrino.png',
  'cola.png',
  'sprite.png',
  'san_pellegrino_limonata.png',
  'ginger_ale.png',
  // Beer & Mocktails
  'corona.png',
  'heineken.png',
  'virgin_mojito.png',
  'sunrise_mocktail.png',
  // Cocktails
  'aperol_spritz.png',
  'negroni.png',
  'espresso_martini.png',
  'hugo_spritz.png',
  'mojito.png',
  // Coffee & Tea
  'espresso.png',
  'vietnamese_coffee.png',
  'peppermint_tea.png',
  // Wines
  'tokaj_furmint.jpg',
  'luis_canas.jpg',
  'artero.webp',
  'primadonna_chardonnay.jpg',
  'v3_negroamaro.jpg',
  'papale_primitivo.jpg',
];

async function uploadImage(filename) {
  const filePath = path.join(UPLOADS_DIR, filename);
  // Lấy tên file không có extension làm public_id
  const publicId = `felini/menu/${path.parse(filename).name}`;

  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  File không tồn tại: ${filename} — bỏ qua`);
    return null;
  }

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'image',
      // Tự động tối ưu hóa chất lượng
      quality: 'auto:best',
      fetch_format: 'auto',
    });

    console.log(`✅ ${filename} → ${result.secure_url}`);
    return {
      filename: path.parse(filename).name,
      original: filename,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    console.error(`❌ Lỗi upload ${filename}: ${err.message}`);
    return null;
  }
}

async function main() {
  // Kiểm tra thông tin đăng nhập
  const config = cloudinary.config();
  if (config.cloud_name === 'YOUR_CLOUD_NAME') {
    console.error('');
    console.error('❌ Chưa cấu hình Cloudinary!');
    console.error('   Vui lòng điền Cloud Name, API Key, API Secret vào file này');
    console.error('   hoặc set biến môi trường:');
    console.error('   set CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.error('   set CLOUDINARY_API_KEY=your_api_key');
    console.error('   set CLOUDINARY_API_SECRET=your_api_secret');
    console.error('');
    process.exit(1);
  }

  console.log('');
  console.log('🚀 Bắt đầu upload ảnh lên Cloudinary...');
  console.log(`   Cloud: ${config.cloud_name}`);
  console.log(`   Thư mục: felini/menu/`);
  console.log(`   Số ảnh: ${IMAGES.length}`);
  console.log('');

  const results = {};
  let successCount = 0;

  for (const filename of IMAGES) {
    const result = await uploadImage(filename);
    if (result) {
      results[result.filename] = result.url;
      successCount++;
    }
  }

  console.log('');
  console.log(`═══════════════════════════════════════════`);
  console.log(`✅ Upload xong: ${successCount}/${IMAGES.length} ảnh`);
  console.log(`═══════════════════════════════════════════`);

  // Lưu ra file JSON để tiện tham khảo
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), 'utf8');
  console.log(`💾 URL mapping đã lưu vào: cloudinary-urls.json`);

  // In ra mapping để dễ copy/paste
  console.log('');
  console.log('📋 URL Mapping (copy vào seed-menu.js):');
  console.log('─────────────────────────────────────────');
  for (const [name, url] of Object.entries(results)) {
    console.log(`  ${name}: "${url}"`);
  }
  console.log('');
  console.log('⚡ Chạy tiếp: node update-seed-with-cloudinary.js');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
