const path = require('path');
const pgPath = path.join(process.cwd(), 'node_modules', 'pg');
const { Client } = require(pgPath);

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'felini_db',
});

const customersData = [
  {
    fullName: 'Nguyễn Hồng Nhung',
    phoneNumber: '0909999888',
    email: 'nhung.nguyen@celeb.vn',
    vipTag: 'CELEB',
    visitCount: 12,
    preferences: {
      allergies: ['Đậu phộng', 'Lạc'],
      favoriteWine: ['Vang trắng Pinot Grigio', 'Prosecco sủi tăm'],
      seatingPreference: 'Ban công sân vườn ngoài trời',
      dietaryNotes: 'Không ăn cay nhiều',
      specialNotes: 'Thành viên ban nhạc nổi tiếng, phục vụ chu đáo, tránh làm phiền bởi truyền thông.'
    }
  },
  {
    fullName: 'David Beckham',
    phoneNumber: '0911222333',
    email: 'david.beckham@vvip.com',
    vipTag: 'VVIP',
    visitCount: 4,
    preferences: {
      allergies: [],
      favoriteWine: ['Vang đỏ V3 Negroamaro', 'Cabernet Sauvignon'],
      seatingPreference: 'Phòng VIP riêng tư (Lò sưởi)',
      dietaryNotes: 'Keto Diet, ít tinh bột',
      specialNotes: 'Thực khách thích ăn bít tết bò chín vừa và uống vang đỏ nhiệt độ 16 độ C.'
    }
  },
  {
    fullName: 'Trần Minh Tuấn',
    phoneNumber: '0988777666',
    email: 'tuan.tran@vip.vn',
    vipTag: 'VIP',
    visitCount: 8,
    preferences: {
      allergies: ['Hải sản có vỏ (cua/ghẹ)'],
      favoriteWine: ['Chardonnay'],
      seatingPreference: 'Bàn cạnh cửa kính ngắm cảnh',
      dietaryNotes: 'Không ăn ngò tây',
      specialNotes: 'Đối tác VIP của nhà hàng, luôn xếp bàn số T10 nếu còn trống.'
    }
  },
  {
    fullName: 'Lê Thị Hoa',
    phoneNumber: '0944555666',
    email: 'hoa.le@standard.com',
    vipTag: 'STANDARD',
    visitCount: 2,
    preferences: {
      allergies: [],
      favoriteWine: ['Aperol Spritz'],
      seatingPreference: 'Góc phòng ấm cúng',
      dietaryNotes: 'Không ăn gluten',
      specialNotes: 'Hay đặt bàn đôi kỷ niệm ngày cưới.'
    }
  }
];

const menuData = [
  {
    nameEn: 'Caprese con Mozzarella di Bufala',
    nameVi: 'Salad Caprese Phô Mai Trâu',
    descriptionEn: 'Sun-ripened tomatoes layered with creamy buffalo mozzarella and fragrant basil, drizzled with aged balsamic glaze and olive oil.',
    descriptionVi: 'Cà chua chín mọng xen kẽ phô mai mozzarella tươi từ sữa trâu béo ngậy, lá húng tây thơm và sốt balsamic cô đặc.',
    price: 295,
    category: 'APPETIZERS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Gamberi Aglio e Olio',
    nameVi: 'Tôm Sốt Bơ Tỏi & Dầu Ô Liu',
    descriptionEn: 'Sautéed prawns in garlic, olive oil, and a hint of chili - simple, spicy, and bursting with Mediterranean flavor.',
    descriptionVi: 'Tôm áp chảo với tỏi, dầu ô liu và một chút ớt - đơn giản, đậm đà vị Địa Trung Hải.',
    price: 230,
    category: 'APPETIZERS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1559737689-d918a3607cc4?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Bruschetta al Pomodoro',
    nameVi: 'Bánh Mì Bruschetta Cà Chua',
    descriptionEn: 'Grilled bread topped with sun-ripened tomatoes, garlic, basil, and olive oil, finished with sea salt and balsamic glaze.',
    descriptionVi: 'Bánh mì nướng giòn phủ cà chua chín, tỏi, húng tây và dầu ô liu, hoàn thiện với muối biển.',
    price: 185,
    category: 'APPETIZERS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti alla Carbonara',
    nameVi: 'Mì Ý Sốt Carbonara Truyền Thống',
    descriptionEn: 'A Roman classic with Guanciale, eggs, Pecorino Romano and black pepper. No cream, just tradition.',
    descriptionVi: 'Món mì La Mã cổ điển với thịt má heo Guanciale, trứng gà tươi, phô mai Pecorino Romano và tiêu đen.',
    price: 299,
    category: 'MAINS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Penne Ricotta e Spinaci',
    nameVi: 'Mì Penne Sốt Phô Mai Ricotta & Cải Bó Xôi',
    descriptionEn: 'Penne pasta tossed in a velvety ricotta cream sauce with baby spinach, a hint of garlic, and a touch of nutmeg.',
    descriptionVi: 'Mì ống penne quyện trong sốt kem ricotta mịn màng với cải bó xôi non, tỏi và một chút nhục đậu khấu.',
    price: 289,
    category: 'MAINS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti Frutti di Mare',
    nameVi: 'Mì Ý Sốt Hải Sản Địa Trung Hải',
    descriptionEn: 'A seafood lover\'s dream, Spaghetti with mixed seafood in a light tomato and white wine sauce.',
    descriptionVi: 'Món mì dành cho tín đồ hải sản với hải sản hỗn hợp tươi ngon trong sốt cà chua và rượu vang trắng.',
    price: 296,
    category: 'MAINS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Classic Tiramisu della Casa',
    nameVi: 'Bánh Tiramisu Truyền Thống Nhà Làm',
    descriptionEn: 'Espresso-soaked ladyfingers layered with fresh whipped mascarpone and premium cocoa powder.',
    descriptionVi: 'Bánh quy sampa nhúng đẫm cà phê espresso, phủ kem mascarpone béo mịn và bột cacao nguyên chất.',
    price: 140,
    category: 'DESSERTS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Aperol Spritz',
    nameVi: 'Cocktail Aperol Spritz Rực Rỡ',
    descriptionEn: 'Aperol liqueur, crisp Prosecco seltzer, fresh orange slice, and a splash of sparkling water.',
    descriptionVi: 'Rượu mùi Aperol, Prosecco sủi tăm, cam tươi lát và nước soda thanh mát.',
    price: 165,
    category: 'DRINKS',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'V3 Negroamaro Del Salento',
    nameVi: 'Vang Đỏ V3 Negroamaro Del Salento',
    descriptionEn: 'Full-bodied Italian red wine with intensive aromas of red berries, plums, and spice.',
    descriptionVi: 'Dòng vang đỏ Ý đậm đà quyến rũ mang hương quả mọng đỏ, mận chín và gia vị cay.',
    price: 950,
    category: 'WINES',
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=500&q=80'
  }
];

// Helper to get dates
const getTomorrowTime = (hours, minutes) => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

const getTodayTime = (hours, minutes) => {
  const d = new Date();
  d.setHours(hours, minutes, 0, 0);
  return d;
};

const getYesterdayTime = (hours, minutes) => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  d.setHours(hours, minutes, 0, 0);
  return d;
};

const reservationsData = [
  {
    customerName: 'Nguyễn Hồng Nhung',
    customerPhone: '0909999888',
    customerEmail: 'nhung.nguyen@celeb.vn',
    reservationTime: getTomorrowTime(19, 30),
    numberOfGuests: 2,
    tableNumber: null,
    status: 'PENDING',
    specialRequests: 'Xếp bàn đôi lãng mạn ngoài ban công sân vườn, chuẩn bị trước 1 chai Prosecco ướp lạnh.',
    notes: 'Khách CELEB, tránh sắp xếp chỗ ngồi quá ồn ào.'
  },
  {
    customerName: 'David Beckham',
    customerPhone: '0911222333',
    customerEmail: 'david.beckham@vvip.com',
    reservationTime: getTodayTime(20, 0),
    numberOfGuests: 4,
    tableNumber: 'V01',
    status: 'CONFIRMED',
    specialRequests: 'Yêu cầu phòng riêng ấm cúng bên lò sưởi.',
    notes: 'Khách VVIP, chuẩn bị vang đỏ nhiệt độ 16 độ C.'
  },
  {
    customerName: 'Lê Thị Hoa',
    customerPhone: '0944555666',
    customerEmail: 'hoa.le@standard.com',
    reservationTime: getYesterdayTime(18, 0),
    numberOfGuests: 2,
    tableNumber: 'T05',
    status: 'COMPLETED',
    specialRequests: 'Kỷ niệm ngày cưới.',
    notes: 'Phục vụ chu đáo bánh tiramisu viết lời chúc mừng.'
  }
];

async function main() {
  await client.connect();
  console.log('Database connected.');

  // Seed Customers
  for (const cust of customersData) {
    const query = `
      INSERT INTO customers (id, "fullName", "phoneNumber", email, "vipTag", "preferences", "visitCount", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, NOW(), NOW())
    `;
    await client.query(query, [
      cust.fullName,
      cust.phoneNumber,
      cust.email,
      cust.vipTag,
      JSON.stringify(cust.preferences),
      cust.visitCount
    ]);
  }
  console.log('Seeded 4 VIP customers.');

  // Seed Menu Items
  for (const menu of menuData) {
    const query = `
      INSERT INTO menu_items (id, "nameEn", "nameVi", "descriptionEn", "descriptionVi", price, category, "isAvailable", "imageUrl", "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
    `;
    await client.query(query, [
      menu.nameEn,
      menu.nameVi,
      menu.descriptionEn,
      menu.descriptionVi,
      menu.price,
      menu.category,
      menu.isAvailable,
      menu.imageUrl
    ]);
  }
  console.log('Seeded 9 premium menu items.');

  // Seed Reservations
  for (const res of reservationsData) {
    const query = `
      INSERT INTO reservations (id, "customerName", "customerPhone", "customerEmail", "reservationTime", "numberOfGuests", "tableNumber", status, "specialRequests", notes, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
    `;
    await client.query(query, [
      res.customerName,
      res.customerPhone,
      res.customerEmail,
      res.reservationTime,
      res.numberOfGuests,
      res.tableNumber,
      res.status,
      res.specialRequests,
      res.notes
    ]);
  }
  console.log('Seeded 3 reservation bookings.');

  await client.end();
  console.log('Database seeding finished.');
}

main().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
