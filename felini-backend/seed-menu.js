/**
 * seed-menu.js — Xóa và seed lại toàn bộ menu_items từ menuData thực tế
 * Run: node seed-menu.js
 */
const path = require('path');
const pgPath = path.join(process.cwd(), 'node_modules', 'pg');
const { Client } = require(pgPath);

const client = process.env.DATABASE_URL
  ? new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    })
  : new Client({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'felini_db',
    });

// ============================================================
// FULL MENU DATA - lấy từ menuData.ts của website chính
// ============================================================
const menuItems = [
  // ── ANTIPASTI (Starters) ──────────────────────────────────
  {
    nameEn: 'Caprese con Mozzarella di Bufala',
    nameVi: 'Salad Caprese Phô Mai Trâu',
    descriptionEn: 'The taste of an Italian summer: Sun-ripened tomatoes layered with creamy buffalo mozzarella and fragrant basil, drizzled with aged balsamic glaze and cold pressed olive oil.',
    descriptionVi: 'Hương vị mùa hè Ý: Cà chua chín mọng xen kẽ phô mai mozzarella tươi từ sữa trâu béo ngậy, lá húng tây thơm và sốt balsamic cô đặc cùng dầu ô liu ép lạnh.',
    price: 295, category: 'APPETIZERS', subCategory: 'Antipasti', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Gamberi Aglio e Olio',
    nameVi: 'Tôm Sốt Bơ Tỏi & Dầu Ô Liu',
    descriptionEn: 'Sautéed prawns in garlic, olive oil, and a hint of chili - simple, spicy, and bursting with Mediterranean flavor.',
    descriptionVi: 'Tôm áp chảo với tỏi, dầu ô liu và một chút ớt - đơn giản, đậm đà vị Địa Trung Hải.',
    price: 230, category: 'APPETIZERS', subCategory: 'Antipasti', isAvailable: true,
    tags: JSON.stringify(['spicy']),
    imageUrl: 'https://images.unsplash.com/photo-1559737689-d918a3607cc4?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Zuppa Pavese',
    nameVi: 'Súp Pavese Truyền Thống',
    descriptionEn: 'Clear broth with toasted bread, a poached egg, and grated Parmesan. A rustic classic from Lombardy.',
    descriptionVi: 'Nước dùng thanh đạm ăn kèm bánh mì nướng, trứng chần và phô mai Parmesan bào. Một món ăn mộc mạc cổ điển từ Lombardy.',
    price: 168, category: 'APPETIZERS', subCategory: 'Antipasti', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Burrata with Roasted Cherry Tomatoes & Pesto',
    nameVi: 'Phô Mai Burrata với Cà Chua Bi Nướng & Sốt Pesto',
    descriptionEn: 'Creamy burrata served on a bed of slow-roasted cherry tomatoes, drizzled with fresh basil pesto and olive oil, served with grilled bread on the side.',
    descriptionVi: 'Phô mai burrata béo ngậy đặt trên đĩa cà chua bi nướng chậm, rưới sốt pesto húng tây tươi và dầu ô liu, ăn kèm bánh mì nướng.',
    price: 365, category: 'APPETIZERS', subCategory: 'Antipasti', isAvailable: true,
    tags: JSON.stringify(['vegetarian', 'chef-recommendation']),
    imageUrl: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Bruschetta al Pomodoro',
    nameVi: 'Bánh Mì Bruschetta Cà Chua',
    descriptionEn: 'Grilled bread topped with sun-ripened tomatoes, garlic, basil, and olive oil, finished with sea salt and balsamic glaze. A fresh and flavorful Italian classic.',
    descriptionVi: 'Bánh mì nướng giòn phủ cà chua chín, tỏi, húng tây và dầu ô liu, hoàn thiện với muối biển và sốt balsamic cô đặc.',
    price: 185, category: 'APPETIZERS', subCategory: 'Antipasti', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Parmigiana di Melanzane',
    nameVi: 'Cà Tím Nướng Phô Mai Kiểu Ý',
    descriptionEn: 'Classic Italian Eggplant Bake with Tomato and Cheese.',
    descriptionVi: 'Món cà tím nướng truyền thống kiểu Ý với sốt cà chua và phô mai đút lò thơm ngậy.',
    price: 165, category: 'APPETIZERS', subCategory: 'Antipasti', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&w=500&q=80'
  },

  // ── PASTA — PENNE ─────────────────────────────────────────
  {
    nameEn: 'Penne all\'Arrabbiata',
    nameVi: 'Mì Penne Sốt Cà Chua Cay',
    descriptionEn: 'Spicy tomato sauce with garlic and chili peppers tossed with penne.',
    descriptionVi: 'Mì ống penne trộn sốt cà chua cay nồng với tỏi và ớt tươi.',
    price: 224, category: 'MAINS', subCategory: 'Penne', isAvailable: true,
    tags: JSON.stringify(['vegetarian', 'spicy']),
    imageUrl: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Penne Ricotta e Spinaci',
    nameVi: 'Mì Penne Sốt Phô Mai Ricotta & Cải Bó Xôi',
    descriptionEn: 'Penne pasta tossed in a velvety ricotta cream sauce with baby spinach, a hint of garlic, and a touch of nutmeg. Finished with Parmigiano Reggiano.',
    descriptionVi: 'Mì ống penne quyện trong sốt kem ricotta mịn màng với cải bó xôi non, tỏi và một chút nhục đậu khấu. Phủ phô mai Parmigiano Reggiano.',
    price: 289, category: 'MAINS', subCategory: 'Penne', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1555072956-7758afb20e8f?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Penne Cinque Pi',
    nameVi: 'Mì Penne Sốt Năm Thành Phần (Cinque Pi)',
    descriptionEn: 'Creamy penne pasta tossed in a rich sauce of panna, pomodoro, parmigiano, prezzemolo, and pepe.',
    descriptionVi: 'Mì ống penne sốt kem béo ngậy hòa quyện cùng sốt pomodoro, phô mai parmigiano, ngò tây tươi và tiêu đen.',
    price: 274, category: 'MAINS', subCategory: 'Penne', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1560717845-968823efbee1?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Penne al Forno',
    nameVi: 'Mì Penne Đút Lò Phô Mai',
    descriptionEn: 'Oven-baked penne pasta in a rich Tomato, mozzarella sauce. Crusty, cheesy and comforting.',
    descriptionVi: 'Mì ống penne nướng đút lò trong sốt cà chua đậm đà cùng phô mai mozzarella chảy thơm phức.',
    price: 256, category: 'MAINS', subCategory: 'Penne', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1579208570378-8c970854bc23?auto=format&fit=crop&w=500&q=80'
  },

  // ── PASTA — RIGATONI ──────────────────────────────────────
  {
    nameEn: 'Rigatoni Boscaiola',
    nameVi: 'Mì Rigatoni Sốt Nấm & Pancetta',
    descriptionEn: 'Hearty pasta tossed in a rich, creamy Tomato sauce with sautéed mushrooms, pancetta, onions, finished with fresh herbs.',
    descriptionVi: 'Mì ống rigatoni trộn sốt cà chua kem béo ngậy cùng nấm xào, thịt ba rọi Ý pancetta, hành tây và rau thơm.',
    price: 325, category: 'MAINS', subCategory: 'Rigatoni', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Rigatoni ai Quattro Formaggi',
    nameVi: 'Mì Rigatoni Sốt Bốn Loại Phô Mai',
    descriptionEn: 'A rich blend of four Italian cheeses melted into a decadent cream sauce.',
    descriptionVi: 'Sự kết hợp béo ngậy của bốn loại phô mai hảo hạng kiểu Ý nóng chảy mịn màng trong sốt kem.',
    price: 285, category: 'MAINS', subCategory: 'Rigatoni', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd85?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Rigatoni al Pesto',
    nameVi: 'Mì Rigatoni Sốt Húng Tây',
    descriptionEn: 'Fresh basil pesto with pine nuts, olive oil, garlic and Parmigiano tossed with perfectly cooked Rigatoni.',
    descriptionVi: 'Sốt pesto húng tây tươi giã cùng hạt thông, dầu ô liu, tỏi và phô mai Parmigiano trộn cùng mì rigatoni.',
    price: 255, category: 'MAINS', subCategory: 'Rigatoni', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80'
  },

  // ── PASTA — SPAGHETTI ─────────────────────────────────────
  {
    nameEn: 'Spaghetti alla Carbonara',
    nameVi: 'Mì Ý Sốt Carbonara Truyền Thống',
    descriptionEn: 'A Roman classic with Guanciale, eggs, Pecorino Romano and black pepper. No cream, just tradition.',
    descriptionVi: 'Món mì La Mã cổ điển với thịt má heo Guanciale, trứng gà tươi, phô mai Pecorino Romano và tiêu đen. Không dùng kem tươi.',
    price: 299, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Rigatoni all\'Amatriciana',
    nameVi: 'Mì Rigatoni Sốt Amatriciana',
    descriptionEn: 'Guanciale, tomato, and Pecorino Romano, one of Italy\'s truly beloved pasta dishes.',
    descriptionVi: 'Thịt má heo Guanciale xào thơm, sốt cà chua và phô mai Pecorino Romano - một trong những món mì được yêu thích nhất nước Ý.',
    price: 315, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti aglio e olio',
    nameVi: 'Mì Ý Sốt Tỏi & Dầu Ô Liu',
    descriptionEn: 'Spaghetti tossed with garlic, olive oil, chili flakes and parsley. A simple and flavorful classic.',
    descriptionVi: 'Mì Ý spaghetti xào cùng tỏi thơm, dầu ô liu ép lạnh, ớt khô và ngò tây.',
    price: 195, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti Frutti di Mare',
    nameVi: 'Mì Ý Sốt Hải Sản Địa Trung Hải',
    descriptionEn: 'A seafood lover\'s dream, Spaghetti with mixed seafood in a light tomato and white wine sauce.',
    descriptionVi: 'Món mì dành cho tín đồ hải sản với hải sản hỗn hợp tươi ngon trong sốt cà chua và rượu vang trắng.',
    price: 296, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify(['seafood']),
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti al Pomodoro',
    nameVi: 'Mì Ý Sốt Cà Chua Cổ Điển',
    descriptionEn: 'Traditional Italian spaghetti tossed in a fresh tomato sauce made with Cherry tomatoes, extra virgin olive oil, garlic, and fragrant basil.',
    descriptionVi: 'Mì Ý spaghetti truyền thống sốt cà chua tươi nấu cùng cà chua bi, dầu ô liu ép lạnh, tỏi và húng tây thơm mát.',
    price: 275, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti al Limone',
    nameVi: 'Mì Ý Sốt Bơ Chanh Tây',
    descriptionEn: 'Spaghetti in a Sage, bright lemon and butter glaze.',
    descriptionVi: 'Mì Ý spaghetti quyện trong sốt bơ chanh tây tươi thanh mát và lá xô thơm.',
    price: 195, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify(['vegetarian', 'chef-favorite']),
    imageUrl: 'https://images.unsplash.com/photo-1608219990948-236a2dd7652c?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti alle Vongole',
    nameVi: 'Mì Ý Sốt Nghêu & Rượu Vang Trắng',
    descriptionEn: 'Tender clams cooked in garlic, olive oil, white wine, and parsley. Elegant and flavorful.',
    descriptionVi: 'Nghêu tươi xào tỏi, dầu ô liu, rượu vang trắng và ngò tây. Thanh lịch và đậm đà hương vị biển.',
    price: 287, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify(['seafood']),
    imageUrl: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Spaghetti al tonno',
    nameVi: 'Mì Ý Sốt Cá Ngừ & Tỏi',
    descriptionEn: 'Italian spaghetti with tuna in a light tomato sauce, finished with olive oil and garlic. Simple and flavorful.',
    descriptionVi: 'Mì Ý với cá ngừ ngâm dầu xào trong sốt cà chua nhẹ nhàng, tỏi và dầu ô liu.',
    price: 263, category: 'MAINS', subCategory: 'Spaghetti', isAvailable: true,
    tags: JSON.stringify(['seafood']),
    imageUrl: 'https://images.unsplash.com/photo-1588013275277-2e525cfb8e21?auto=format&fit=crop&w=500&q=80'
  },

  // ── PASTA — TAGLIATELLE ───────────────────────────────────
  {
    nameEn: 'Tagliatelle agli Asparagi',
    nameVi: 'Mì Dẹt Tagliatelle Sốt Măng Tây',
    descriptionEn: 'Tagliatelle pasta tossed with sautéed green asparagus tips, garlic, and shallots, finished with a touch of cream and Parmigiano Reggiano.',
    descriptionVi: 'Mì dẹt tươi trộn cùng ngọn măng tây xanh xào, tỏi, hành tăm, thêm chút kem tươi và phô mai Parmigiano Reggiano.',
    price: 285, category: 'MAINS', subCategory: 'Tagliatelle', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Tagliatelle al Salmone',
    nameVi: 'Mì Dẹt Tagliatelle Sốt Cá Hồi Xông Khói',
    descriptionEn: 'Silky ribbons of pasta with smoked salmon light cream sauce with dill and lemon zest.',
    descriptionVi: 'Những sợi mì dẹt mềm mại quyện trong sốt kem cá hồi xông khói, thì là và vỏ chanh bào.',
    price: 326, category: 'MAINS', subCategory: 'Tagliatelle', isAvailable: true,
    tags: JSON.stringify(['seafood']),
    imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Tagliatelle alla Bolognese',
    nameVi: 'Mì Dẹt Tagliatelle Sốt Bò Bằm Bolognese',
    descriptionEn: 'The true Bolognese - slow cooked meat sauce served over fresh tagliatelle.',
    descriptionVi: 'Sốt thịt bằm Bolognese chuẩn vị hầm chậm nhiều giờ, dùng kèm mì dẹt tươi làm thủ công.',
    price: 288, category: 'MAINS', subCategory: 'Tagliatelle', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91798d9d30?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Tagliatelle Aglio e Olio con Gamberoni',
    nameVi: 'Mì Dẹt Tagliatelle Tôm Sốt Tỏi & Dầu Ô Liu',
    descriptionEn: 'Garlic and olive oil with king prawns over fresh tagliatelle, elegant simplicity with a touch of the sea.',
    descriptionVi: 'Tôm vua áp chảo cùng tỏi và dầu ô liu xào với mì dẹt tươi, thanh lịch và mang đậm vị biển.',
    price: 268, category: 'MAINS', subCategory: 'Tagliatelle', isAvailable: true,
    tags: JSON.stringify(['seafood']),
    imageUrl: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=500&q=80'
  },

  // ── SECONDI (Main Courses) ────────────────────────────────
  {
    nameEn: 'Risotto alla Milanese',
    nameVi: 'Cơm Ý Risotto Saffron Milanese',
    descriptionEn: 'Creamy Arborio rice slowly cooked with saffron, butter, and Parmesan, creating a rich, golden hued risotto full of delicate flavor.',
    descriptionVi: 'Cơm hạt tròn Arborio nấu chậm với nhụy hoa nghệ tây (saffron), bơ và phô mai Parmesan tạo nên sắc vàng sang trọng và hương vị tinh tế.',
    price: 319, category: 'MAINS', subCategory: 'Secondi', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Piccata Milanese',
    nameVi: 'Ức Gà Chiên Bơ Piccata Milanese',
    descriptionEn: 'Crispy breaded chicken breast, pan-fried in butter to golden perfection, served with spaghetti in a rich tomato sauce.',
    descriptionVi: 'Ức gà tẩm bột chiên bơ vàng giòn thơm phức, dùng kèm mì spaghetti sốt cà chua đậm đà kiểu Milan.',
    price: 360, category: 'MAINS', subCategory: 'Secondi', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Cozze alla Tarantina',
    nameVi: 'Vẹm Xanh Sốt Cà Chua Kiểu Tarantina',
    descriptionEn: 'Southern style mussels simmered in a rich tomato sauce with garlic, chili, and white wine, infused with fresh parsley and served with rustic bread.',
    descriptionVi: 'Vẹm xanh hầm nồng nàn trong sốt cà chua đậm đà với tỏi, ớt và rượu vang trắng, ăn kèm bánh mì nướng.',
    price: 314, category: 'MAINS', subCategory: 'Secondi', isAvailable: true,
    tags: JSON.stringify(['seafood', 'spicy']),
    imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Cotoletta alla Milanese con Patatine',
    nameVi: 'Sườn Bê Chiên Xù Cotoletta Milanese',
    descriptionEn: 'Golden crisp breaded veal cutlet, pan fried in clarified butter, served with French Fries and a wedge of lemon.',
    descriptionVi: 'Sườn bê tẩm bột chiên bơ vàng ruộm, dùng kèm khoai tây chiên và một lát chanh tươi.',
    price: 344, category: 'MAINS', subCategory: 'Secondi', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Risotto agli Asparagi',
    nameVi: 'Cơm Ý Risotto Măng Tây Xanh',
    descriptionEn: 'Creamy Italian risotto made with Arborio rice, slowly cooked in a delicate vegetable stock with fresh green asparagus.',
    descriptionVi: 'Cơm Ý risotto nấu chậm với nước dùng rau củ thanh đạm, măng tây xanh tươi, hoàn thiện cùng bơ, phô mai Parmigiano và vang trắng.',
    price: 318, category: 'MAINS', subCategory: 'Secondi', isAvailable: true,
    tags: JSON.stringify(['vegetarian']),
    imageUrl: 'https://images.unsplash.com/photo-1594911774802-8822a707cbb3?auto=format&fit=crop&w=500&q=80'
  },

  // ── DOLCI (Desserts) ──────────────────────────────────────
  {
    nameEn: 'Tiramisu',
    nameVi: 'Bánh Tiramisu Truyền Thống',
    descriptionEn: 'Classic Italian dessert with layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa.',
    descriptionVi: 'Món tráng miệng kinh điển của Ý với các lớp bánh quy Savoiardi thấm đẫm cà phê espresso, kem trứng mascarpone béo mịn và bột cacao.',
    price: 161, category: 'DESSERTS', subCategory: 'Dolci', isAvailable: true,
    tags: JSON.stringify(['chef-recommendation']),
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Affogato al Caffè',
    nameVi: 'Kem Affogato Cà Phê',
    descriptionEn: 'A scoop of vanilla gelato drowned in a shot of hot espresso - simple, sweet, and satisfying.',
    descriptionVi: 'Một viên kem vani mát lạnh chìm đắm trong ly cà phê espresso nóng hổi - đơn giản và hoàn hảo.',
    price: 139, category: 'DESSERTS', subCategory: 'Dolci', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=500&q=80'
  },
  {
    nameEn: 'Crème brûlée',
    nameVi: 'Kem Cháy Crème Brûlée',
    descriptionEn: 'A rich, velvety vanilla bean custard baked to perfection and finished with a delicate layer of torched raw sugar.',
    descriptionVi: 'Lớp custard vani béo ngậy được nướng chín hoàn hảo, phủ một lớp đường thô đốt cháy giòn tan ngọt ngào ở trên.',
    price: 132, category: 'DESSERTS', subCategory: 'Dolci', isAvailable: true,
    tags: JSON.stringify([]),
    imageUrl: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=500&q=80'
  },

  // ── DRINKS — Soft Drinks ──────────────────────────────────
  { nameEn: 'Acqua Panna', nameVi: 'Nước khoáng Acqua Panna', price: 90, category: 'DRINKS', subCategory: 'Soft Drinks', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Premium still mineral water from Italy.', descriptionVi: 'Nước khoáng không ga cao cấp từ Ý.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412322/felini/menu/acqua_panna.jpg' },
  { nameEn: 'San Pellegrino', nameVi: 'Nước khoáng sủi bọt San Pellegrino', price: 90, category: 'DRINKS', subCategory: 'Soft Drinks', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Premium sparkling mineral water from Italy.', descriptionVi: 'Nước khoáng sủi bọt cao cấp từ Ý.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412324/felini/menu/san_pellegrino.jpg' },
  { nameEn: 'Cola', nameVi: 'Coca Cola', price: 55, category: 'DRINKS', subCategory: 'Soft Drinks', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Classic Coca-Cola.', descriptionVi: 'Nước ngọt Coca Cola cổ điển.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412326/felini/menu/cola.jpg' },
  { nameEn: 'Sprite', nameVi: 'Nước ngọt Sprite', price: 55, category: 'DRINKS', subCategory: 'Soft Drinks', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Crisp and refreshing lemon-lime soda.', descriptionVi: 'Nước ngọt soda chanh mát lạnh.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412328/felini/menu/sprite.jpg' },
  { nameEn: 'San Pellegrino Limonata', nameVi: 'San Pellegrino Vị Chanh', price: 75, category: 'DRINKS', subCategory: 'Soft Drinks', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Sparkling lemon beverage from San Pellegrino.', descriptionVi: 'Nước sủi bọt hương chanh từ San Pellegrino.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412331/felini/menu/san_pellegrino_limonata.jpg' },
  { nameEn: 'Ginger Ale', nameVi: 'Nước gừng Ginger Ale', price: 55, category: 'DRINKS', subCategory: 'Soft Drinks', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Refreshing ginger-flavored sparkling beverage.', descriptionVi: 'Nước sủi bọt hương gừng tươi mát.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412333/felini/menu/ginger_ale.jpg' },

  // ── DRINKS — Juices ───────────────────────────────────────
  { nameEn: 'Orange Juice', nameVi: 'Nước ép cam', price: 64, category: 'DRINKS', subCategory: 'Juices', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Freshly pressed orange juice.', descriptionVi: 'Nước cam ép tươi nguyên chất.', imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=500&q=80' },
  { nameEn: 'Pineapple Juice', nameVi: 'Nước ép dứa', price: 64, category: 'DRINKS', subCategory: 'Juices', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Tropical pineapple juice.', descriptionVi: 'Nước ép dứa nhiệt đới tươi mát.', imageUrl: 'https://images.unsplash.com/photo-1589733966041-8881e33a5ad3?auto=format&fit=crop&w=500&q=80' },
  { nameEn: 'Coconut Water', nameVi: 'Nước dừa tươi', price: 65, category: 'DRINKS', subCategory: 'Juices', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Natural fresh coconut water.', descriptionVi: 'Nước dừa tươi tự nhiên.', imageUrl: 'https://images.unsplash.com/photo-1525385133336-247b6c258501?auto=format&fit=crop&w=500&q=80' },

  // ── DRINKS — Beer & Mocktails ─────────────────────────────
  { nameEn: 'Corona', nameVi: 'Bia Corona', price: 75, category: 'DRINKS', subCategory: 'Beer & Mocktails', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Mexican lager beer.', descriptionVi: 'Bia lager Mexico nhẹ nhàng, mát lạnh.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412335/felini/menu/corona.jpg' },
  { nameEn: 'Heineken', nameVi: 'Bia Heineken', price: 70, category: 'DRINKS', subCategory: 'Beer & Mocktails', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Classic Dutch pilsner.', descriptionVi: 'Bia pilsner Hà Lan cổ điển.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412337/felini/menu/heineken.jpg' },
  { nameEn: 'Virgin Mojito', nameVi: 'Virgin Mojito', price: 120, category: 'DRINKS', subCategory: 'Beer & Mocktails', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Fresh mint, lime juice, sugar syrup, and sparkling water.', descriptionVi: 'Bạc hà tươi, nước cốt chanh, siro đường và soda.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412339/felini/menu/virgin_mojito.jpg' },
  { nameEn: 'Sunrise Mocktail', nameVi: 'Sunrise Mocktail', price: 120, category: 'DRINKS', subCategory: 'Beer & Mocktails', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Orange juice, grenadine, and sparkling water layered like a sunrise.', descriptionVi: 'Nước cam, siro lựu đỏ và soda xếp lớp như bình minh.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412341/felini/menu/sunrise_mocktail.jpg' },

  // ── DRINKS — Cocktails & Spirits ──────────────────────────
  {
    nameEn: 'Aperol Spritz', nameVi: 'Aperol Spritz', price: 160, category: 'DRINKS', subCategory: 'Cocktails & Spirits', isAvailable: true,
    tags: JSON.stringify([]),
    descriptionEn: 'Aperol liqueur, crisp Prosecco seltzer, fresh orange slice, and a splash of sparkling water.',
    descriptionVi: 'Rượu mùi Aperol, Prosecco sủi tăm, cam tươi lát và nước soda thanh mát.',
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412344/felini/menu/aperol_spritz.jpg'
  },
  {
    nameEn: 'Negroni', nameVi: 'Negroni Cổ Điển', price: 155, category: 'DRINKS', subCategory: 'Cocktails & Spirits', isAvailable: true,
    tags: JSON.stringify([]),
    descriptionEn: 'Campari, sweet vermouth, and gin stirred to perfection.',
    descriptionVi: 'Campari, vermouth ngọt và gin khuấy hoàn hảo.',
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412345/felini/menu/negroni.jpg'
  },
  {
    nameEn: 'Espresso Martini', nameVi: 'Espresso Martini', price: 155, category: 'DRINKS', subCategory: 'Cocktails & Spirits', isAvailable: true,
    tags: JSON.stringify([]),
    descriptionEn: 'Vodka, espresso, coffee liqueur, and simple syrup shaken to a frothy perfection.',
    descriptionVi: 'Vodka, espresso, rượu cà phê và siro đường lắc bọt mịn hoàn hảo.',
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412347/felini/menu/espresso_martini.jpg'
  },
  {
    nameEn: 'Hugo Spritz', nameVi: 'Hugo Spritz', price: 160, category: 'DRINKS', subCategory: 'Cocktails & Spirits', isAvailable: true,
    tags: JSON.stringify([]),
    descriptionEn: 'Prosecco, elderflower liqueur, fresh mint, and a squeeze of lime.',
    descriptionVi: 'Prosecco, rượu hoa cơm cháy, bạc hà tươi và chanh vắt.',
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412350/felini/menu/hugo_spritz.jpg'
  },
  {
    nameEn: 'Mojito', nameVi: 'Mojito', price: 155, category: 'DRINKS', subCategory: 'Cocktails & Spirits', isAvailable: true,
    tags: JSON.stringify([]),
    descriptionEn: 'White rum, fresh mint, lime juice, sugar, and soda water.',
    descriptionVi: 'Rum trắng, bạc hà tươi, nước cốt chanh, đường và soda.',
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412352/felini/menu/mojito.jpg'
  },

  // ── DRINKS — Coffee & Tea ─────────────────────────────────
  { nameEn: 'Espresso', nameVi: 'Cà phê Espresso', price: 55, category: 'DRINKS', subCategory: 'Coffee & Tea', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Short, intense Italian espresso.', descriptionVi: 'Cà phê espresso đậm đà kiểu Ý.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412354/felini/menu/espresso.jpg' },
  { nameEn: 'Cappuccino', nameVi: 'Cà phê Cappuccino', price: 75, category: 'DRINKS', subCategory: 'Coffee & Tea', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Espresso with steamed milk and thick froth.', descriptionVi: 'Espresso với sữa hấp và bọt sữa dày.', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=80' },
  { nameEn: 'Latte', nameVi: 'Cà phê Latte', price: 75, category: 'DRINKS', subCategory: 'Coffee & Tea', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Espresso with steamed milk and light froth.', descriptionVi: 'Espresso với nhiều sữa hấp và bọt sữa nhẹ.', imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80' },
  { nameEn: 'Americano', nameVi: 'Cà phê Americano', price: 60, category: 'DRINKS', subCategory: 'Coffee & Tea', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Espresso diluted with hot water.', descriptionVi: 'Espresso pha loãng với nước nóng.', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=80' },
  { nameEn: 'Vietnamese Coffee', nameVi: 'Cà phê Đen / Nâu Đá Việt Nam', price: 65, category: 'DRINKS', subCategory: 'Coffee & Tea', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Traditional Vietnamese iced coffee, black or with condensed milk.', descriptionVi: 'Cà phê phin Việt Nam đá, đen hoặc nâu.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412357/felini/menu/vietnamese_coffee.jpg' },
  { nameEn: 'Peppermint Tea', nameVi: 'Trà Bạc Hà', price: 49, category: 'DRINKS', subCategory: 'Coffee & Tea', isAvailable: true, tags: JSON.stringify([]), descriptionEn: 'Refreshing peppermint herbal tea.', descriptionVi: 'Trà thảo mộc bạc hà thanh mát.', imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412359/felini/menu/peppermint_tea.jpg' },

  // ── WINES ─────────────────────────────────────────────────
  {
    nameEn: 'Tokaj Furmint Dry - Grand Tokaj',
    nameVi: 'Rượu Vang Trắng Tokaj Furmint Dry - Grand Tokaj',
    descriptionEn: 'A dry wine with aromas of white flowers, green apple, and fresh citrus. Harmonious acidity, rich minerality, and a crisp, well-rounded finish.',
    descriptionVi: 'Dòng vang trắng khô thanh khiết mang hương hoa trắng, táo xanh và cam chanh tươi mát. Vị chua hài hòa, khoáng chất phong phú và hậu vị sồi nhẹ cuốn hút.',
    price: 160, category: 'WINES', subCategory: 'White Wine', isAvailable: true,
    tags: JSON.stringify(['white-wine']),
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412361/felini/menu/tokaj_furmint.jpg'
  },
  {
    nameEn: 'Luis Cañas - Bodegas Luis Cañas',
    nameVi: 'Rượu Vang Đỏ Luis Cañas - Bodegas Luis Cañas',
    descriptionEn: 'Delicate notes of violet blend with wild forest berries, prominent raspberries, and blackberries. Smooth, silky texture with balanced acidity and soft tannins.',
    descriptionVi: 'Hương hoa violet nhẹ nhàng hòa quyện tinh tế cùng quả mọng rừng, mâm xôi chín và dâu tằm. Cấu trúc mượt mà, vị axit cân bằng cùng tannin mềm mại.',
    price: 145, category: 'WINES', subCategory: 'Red Wine', isAvailable: true,
    tags: JSON.stringify(['red-wine']),
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412363/felini/menu/luis_canas.jpg'
  },
  {
    nameEn: 'Bodegas Artero - Artero',
    nameVi: 'Rượu Vang Đỏ Bodegas Artero - Artero',
    descriptionEn: 'Bright cherry red color with notes of blueberries, ripe raspberries, and sweet herbs. Rich and smooth on the palate with vibrant red fruit flavors.',
    descriptionVi: 'Màu đỏ anh đào tươi sáng với hương quả việt quất, mâm xôi chín và thảo mộc ngọt ngào. Tròn đầy và êm dịu trên vòm miệng.',
    price: 150, category: 'WINES', subCategory: 'Red Wine', isAvailable: true,
    tags: JSON.stringify(['red-wine']),
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412364/felini/menu/artero.jpg'
  },
  {
    nameEn: 'Primadonna Chardonnay Puglia - Varvaglione',
    nameVi: 'Rượu Vang Trắng Primadonna Chardonnay Puglia',
    descriptionEn: 'Opens with aromas of ripe tropical pineapple. Full-bodied, well-balanced, and elegant on the palate with a refreshing, gentle acidity.',
    descriptionVi: 'Mở đầu với hương dứa nhiệt đới chín mọng. Thể chất đậm đà, cân bằng và vô cùng thanh lịch trên vòm miệng cùng hậu vị axit mát lạnh thanh nhã.',
    price: 160, category: 'WINES', subCategory: 'White Wine', isAvailable: true,
    tags: JSON.stringify(['white-wine']),
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412365/felini/menu/primadonna_chardonnay.jpg'
  },
  {
    nameEn: 'V3 Negroamaro Del Salento - Varvaglione',
    nameVi: 'Rượu Vang Đỏ V3 Negroamaro Del Salento',
    descriptionEn: 'Aromas of wild blackberries, ripe plums, and warm vanilla with a hint of sweet spices and Mediterranean herbs. Soft, velvety, and deeply aromatic.',
    descriptionVi: 'Hương mâm xôi đen hoang dã, mận chín ngọt ngào xen lẫn hương vani ấm áp và gia vị nhẹ nhàng cùng thảo mộc Địa Trung Hải. Mềm mại, mịn mượt và thơm nồng.',
    price: 700, category: 'WINES', subCategory: 'Red Wine', isAvailable: true,
    tags: JSON.stringify(['red-wine', 'vip-favorite']),
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412366/felini/menu/v3_negroamaro.jpg'
  },
  {
    nameEn: 'Papale Primitivo Di Manduria - Varvaglione',
    nameVi: 'Rượu Vang Đỏ Papale Primitivo Di Manduria',
    descriptionEn: 'Intense aromas of ripe blueberries and wild berry jam. Rich floral notes combine with red fruits, offering a round, soft, and luxurious finish.',
    descriptionVi: 'Hương thơm mãnh liệt của việt quất chín mọng và mứt quả dại thơm nồng. Hương hoa quý phái hòa quyện cùng trái cây đỏ mang lại hậu vị tròn trịa, êm ái vô cùng sang trọng.',
    price: 1045, category: 'WINES', subCategory: 'Red Wine', isAvailable: true,
    tags: JSON.stringify(['red-wine', 'premium']),
    imageUrl: 'https://res.cloudinary.com/ddocxipvw/image/upload/v1782412367/felini/menu/papale_primitivo.jpg'
  }
];

async function main() {
  await client.connect();
  console.log('Connected to database.');

  // Xóa toàn bộ menu cũ
  await client.query('DELETE FROM menu_items');
  console.log('Cleared old menu_items.');

  let count = 0;
  for (const item of menuItems) {
    await client.query(`
      INSERT INTO menu_items (
        id, "nameEn", "nameVi", "descriptionEn", "descriptionVi",
        price, category, "subCategory", "isAvailable", "imageUrl", "createdAt", "updatedAt"
      ) VALUES (
        gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()
      )
    `, [
      item.nameEn, item.nameVi,
      item.descriptionEn, item.descriptionVi,
      item.price, item.category,
      item.subCategory || null,
      item.isAvailable, item.imageUrl
    ]);
    count++;
  }

  console.log(`✅ Seeded ${count} menu items across APPETIZERS, MAINS, DESSERTS, DRINKS, WINES.`);
  await client.end();
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
