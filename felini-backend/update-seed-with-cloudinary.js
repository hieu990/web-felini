/**
 * update-seed-with-cloudinary.js
 * ================================
 * Đọc cloudinary-urls.json và tự động thay thế tất cả URL
 * `http://localhost:3000/uploads/` trong seed-menu.js bằng URL Cloudinary.
 *
 * Cách dùng:
 *   node update-seed-with-cloudinary.js
 *
 * Chạy SAU KHI đã chạy upload-to-cloudinary.js thành công.
 */

const fs = require('fs');
const path = require('path');

const CLOUDINARY_URLS_FILE = path.join(__dirname, 'cloudinary-urls.json');
const SEED_FILE = path.join(__dirname, 'seed-menu.js');
const SEED_BACKUP = path.join(__dirname, 'seed-menu.backup.js');

function main() {
  // Đọc URL mapping từ Cloudinary
  if (!fs.existsSync(CLOUDINARY_URLS_FILE)) {
    console.error('❌ Không tìm thấy cloudinary-urls.json');
    console.error('   Hãy chạy: node upload-to-cloudinary.js trước');
    process.exit(1);
  }

  const urlMap = JSON.parse(fs.readFileSync(CLOUDINARY_URLS_FILE, 'utf8'));
  console.log(`📖 Đã đọc ${Object.keys(urlMap).length} URL từ cloudinary-urls.json`);

  // Backup seed-menu.js gốc
  const seedContent = fs.readFileSync(SEED_FILE, 'utf8');
  fs.writeFileSync(SEED_BACKUP, seedContent, 'utf8');
  console.log(`💾 Đã backup seed-menu.js → seed-menu.backup.js`);

  // Thay thế tất cả URL localhost bằng URL Cloudinary
  let updatedContent = seedContent;
  let replacementCount = 0;

  for (const [filename, cloudinaryUrl] of Object.entries(urlMap)) {
    // Thay thế pattern: http://localhost:3000/uploads/filename.ext
    // (hỗ trợ cả .png, .jpg, .jpeg, .webp)
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];
    for (const ext of extensions) {
      const localUrl = `http://localhost:3000/uploads/${filename}.${ext}`;
      if (updatedContent.includes(localUrl)) {
        updatedContent = updatedContent.split(localUrl).join(cloudinaryUrl);
        replacementCount++;
        console.log(`  ✅ ${filename}.${ext} → Cloudinary URL`);
      }
    }
  }

  // Lưu file đã cập nhật
  fs.writeFileSync(SEED_FILE, updatedContent, 'utf8');

  console.log('');
  console.log(`═══════════════════════════════════════════`);
  console.log(`✅ Đã cập nhật ${replacementCount} URL trong seed-menu.js`);
  console.log(`═══════════════════════════════════════════`);
  console.log('');

  // Kiểm tra còn URL localhost nào sót không
  const remaining = (updatedContent.match(/http:\/\/localhost:3000\/uploads\//g) || []).length;
  if (remaining > 0) {
    console.warn(`⚠️  Còn ${remaining} URL localhost chưa được thay thế!`);
    console.warn('   Kiểm tra lại cloudinary-urls.json và seed-menu.js');
  } else {
    console.log('✅ Không còn URL localhost nào trong seed-menu.js!');
  }

  console.log('');
  console.log('⚡ Bước tiếp theo:');
  console.log('   1. git add -A && git commit -m "feat: migrate images to Cloudinary"');
  console.log('   2. git push origin main');
  console.log('   3. Chạy seed trên Render DB: node seed-menu.js (với env vars)');
}

main();
