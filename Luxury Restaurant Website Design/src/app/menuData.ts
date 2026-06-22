export interface MenuItem {
  name: string;
  nameVi?: string;
  description?: string;
  descriptionVi?: string;
  price?: number; // Price in thousands (e.g. 295 means 295,000 VND)
  bottlePrice?: number; // for wines/spirits in thousands
  subCategory?: string;
  tags?: string[];
  details?: {
    grape?: string;
    region?: string;
    alcohol?: string;
    volume?: string;
  };
}

export interface MenuSection {
  title: string;
  description: string;
  items: MenuItem[];
}

export const MENU_DATA: Record<string, MenuSection> = {
  antipasti: {
    title: "Antipasti",
    description: "Begin your dining journey with our carefully crafted Italian starters.",
    items: [
      {
        name: "Caprese con Mozzarella di Bufala",
        nameVi: "Salad Caprese Phô Mai Trâu",
        description: "The taste of an Italian summer: Sun-ripened tomatoes layered with creamy buffalo mozzarella and fragrant basil, drizzled with aged balsamic glaze and cold pressed olive oil.",
        descriptionVi: "Hương vị mùa hè Ý: Cà chua chín mọng xen kẽ phô mai mozzarella tươi từ sữa trâu béo ngậy, lá húng tây thơm và sốt balsamic cô đặc cùng dầu ô liu ép lạnh.",
        price: 295,
        tags: ["vegetarian"]
      },
      {
        name: "Gamberi Aglio e Olio",
        nameVi: "Tôm Sốt Bơ Tỏi & Dầu Ô Liu",
        description: "Sautéed prawns in garlic, olive oil, and a hint of chili - simple, spicy, and bursting with Mediterranean flavor.",
        descriptionVi: "Tôm áp chảo với tỏi, dầu ô liu và một chút ớt - đơn giản, đậm đà vị Địa Trung Hải.",
        price: 230,
        tags: ["spicy"]
      },
      {
        name: "Zuppa Pavese",
        nameVi: "Súp Pavese Truyền Thống",
        description: "Clear broth with toasted bread, a poached egg, and grated Parmesan. A rustic classic from Lombardy.",
        descriptionVi: "Nước dùng thanh đạm ăn kèm bánh mì nướng, trứng chần và phô mai Parmesan bào. Một món ăn mộc mạc cổ điển từ Lombardy.",
        price: 168,
        tags: ["vegetarian"]
      },
      {
        name: "Burrata with Roasted Cherry Tomatoes & Pesto",
        nameVi: "Phô Mai Burrata với Cà Chua Bi Nướng & Sốt Pesto",
        description: "Creamy burrata served on a bed of slow-roasted cherry tomatoes, drizzled with fresh basil pesto and olive oil, served with grilled bread on the side.",
        descriptionVi: "Phô mai burrata béo ngậy đặt trên đĩa cà chua bi nướng chậm, rưới sốt pesto húng tây tươi và dầu ô liu, ăn kèm bánh mì nướng.",
        price: 365,
        tags: ["vegetarian", "chef-recommendation"]
      },
      {
        name: "Bruschetta al Pomodoro",
        nameVi: "Bánh Mì Bruschetta Cà Chua",
        description: "Grilled bread topped with sun-ripened tomatoes, garlic, basil, and olive oil, finished with sea salt and balsamic glaze. A fresh and flavorful Italian classic.",
        descriptionVi: "Bánh mì nướng giòn phủ cà chua chín, tỏi, húng tây và dầu ô liu, hoàn thiện với muối biển và sốt balsamic cô đặc.",
        price: 185,
        tags: ["vegetarian"]
      },
      {
        name: "Parmigiana di Melanzane",
        nameVi: "Cà Tím Nướng Phô Mai Kiểu Ý",
        description: "Classic Italian Eggplant Bake with Tomato and Cheese.",
        descriptionVi: "Món cà tím nướng truyền thống kiểu Ý với sốt cà chua và phô mai đút lò thơm ngậy.",
        price: 165,
        tags: ["vegetarian"]
      }
    ]
  },
  pasta: {
    title: "Primi - Pastas",
    description: "Our signature hand-rolled and dry pastas cooked to perfect al dente.",
    items: [
      // Penne
      {
        name: "Penne all'Arrabbiata",
        nameVi: "Mì Penne Sốt Cà Chua Cay",
        description: "Spicy tomato sauce with garlic and chili peppers tossed with penne.",
        descriptionVi: "Mì ống penne trộn sốt cà chua cay nồng với tỏi và ớt tươi.",
        price: 224,
        subCategory: "Penne",
        tags: ["vegetarian", "spicy"]
      },
      {
        name: "Penne Ricotta e Spinaci",
        nameVi: "Mì Penne Sốt Phô Mai Ricotta & Cải Bó Xôi",
        description: "Penne pasta tossed in a velvety ricotta cream sauce with baby spinach, a hint of garlic, and a touch of nutmeg. Finished with Parmigiano Reggiano and a drizzle of extra virgin olive oil.",
        descriptionVi: "Mì ống penne quyện trong sốt kem ricotta mịn màng với cải bó xôi non, tỏi và một chút nhục đậu khấu. Phủ phô mai Parmigiano Reggiano.",
        price: 289,
        subCategory: "Penne",
        tags: ["vegetarian"]
      },
      {
        name: "Penne Cinque Pi",
        nameVi: "Mì Penne Sốt Năm Thành Phần (Cinque Pi)",
        description: "Creamy penne pasta tossed in a rich sauce of panna (cream), pomodoro, parmigiano, prezzemolo, and pepe. A comforting Italian classic with the perfect balance of flavor and indulgence.",
        descriptionVi: "Mì ống penne sốt kem béo ngậy hòa quyện cùng sốt pomodoro, phô mai parmigiano, ngò tây tươi và tiêu đen.",
        price: 274,
        subCategory: "Penne",
        tags: ["vegetarian"]
      },
      {
        name: "Penne al Forno",
        nameVi: "Mì Penne Đút Lò Phô Mai",
        description: "Oven-baked penne pasta in a rich Tomato, mozzarella sauce. Crusty, cheesy and comforting.",
        descriptionVi: "Mì ống penne nướng đút lò trong sốt cà chua đậm đà cùng phô mai mozzarella chảy thơm phức.",
        price: 256,
        subCategory: "Penne",
        tags: ["vegetarian"]
      },
      // Rigatoni
      {
        name: "Rigatoni Boscaiola",
        nameVi: "Mì Rigatoni Sốt Nấm & Pancetta",
        description: "Hearty pasta tossed in a rich, creamy Tomato sauce with sautéed mushrooms, pancetta, onions, finished with fresh herbs.",
        descriptionVi: "Mì ống rigatoni trộn sốt cà chua kem béo ngậy cùng nấm xào, thịt ba rọi Ý pancetta, hành tây và rau thơm.",
        price: 325,
        subCategory: "Rigatoni",
        tags: []
      },
      {
        name: "Rigatoni ai Quattro Formaggi",
        nameVi: "Mì Rigatoni Sốt Bốn Loại Phô Mai",
        description: "A rich blend of four Italian cheeses melted into a decadent cream sauce.",
        descriptionVi: "Sự kết hợp béo ngậy của bốn loại phô mai hảo hạng kiểu Ý nóng chảy mịn màng trong sốt kem.",
        price: 285,
        subCategory: "Rigatoni",
        tags: ["vegetarian"]
      },
      {
        name: "Rigatoni al Pesto",
        nameVi: "Mì Rigatoni Sốt Húng Tây",
        description: "Fresh basil pesto with pine nuts, olive oil, garlic and Parmigiano tossed with perfectly cooked Rigatoni.",
        descriptionVi: "Sốt pesto húng tây tươi giã cùng hạt thông, dầu ô liu, tỏi và phô mai Parmigiano trộn cùng mì rigatoni.",
        price: 255,
        subCategory: "Rigatoni",
        tags: ["vegetarian"]
      },
      // Spaghetti & Roman Classics
      {
        name: "Spaghetti alla Carbonara",
        nameVi: "Mì Ý Sốt Carbonara Truyền Thống",
        description: "A Roman classic with Guanciale, eggs, Pecorino Romano and black pepper. No cream, just tradition.",
        descriptionVi: "Món mì La Mã cổ điển với thịt má heo Guanciale, trứng gà tươi, phô mai Pecorino Romano và tiêu đen. Không dùng kem tươi.",
        price: 299,
        subCategory: "Spaghetti",
        tags: []
      },
      {
        name: "Rigatoni all'Amatriciana",
        nameVi: "Mì Rigatoni Sốt Amatriciana",
        description: "Guanciale, tomato, and Pecorino Romano, one of Italy's truly beloved pasta dishes.",
        descriptionVi: "Thịt má heo Guanciale xào thơm, sốt cà chua và phô mai Pecorino Romano - một trong những món mì được yêu thích nhất nước Ý.",
        price: 315,
        subCategory: "Spaghetti",
        tags: []
      },
      {
        name: "Spaghetti aglio e olio",
        nameVi: "Mì Ý Sốt Tỏi & Dầu Ô Liu",
        description: "Spaghetti tossed with garlic, olive oil, chili flakes and parsley. A simple and flavorful classic.",
        descriptionVi: "Mì Ý spaghetti xào cùng tỏi thơm, dầu ô liu ép lạnh, ớt khô và ngò tây.",
        price: 195,
        subCategory: "Spaghetti",
        tags: ["vegetarian"]
      },
      {
        name: "Spaghetti Frutti di Mare",
        nameVi: "Mì Ý Sốt Hải Sản Địa Trung Hải",
        description: "A seafood lover's dream, Spaghetti with mixed seafood in a light tomato and white wine sauce.",
        descriptionVi: "Món mì dành cho tín đồ hải sản với hải sản hỗn hợp tươi ngon trong sốt cà chua và rượu vang trắng.",
        price: 296,
        subCategory: "Spaghetti",
        tags: ["seafood"]
      },
      {
        name: "Spaghetti al Pomodoro",
        nameVi: "Mì Ý Sốt Cà Chua Cổ Điển",
        description: "Traditional Italian spaghetti tossed in a fresh tomato sauce made with Cherry tomatoes, extra virgin olive oil, garlic, and fragrant basil. Light, vibrant finished with Parmigiano. Full of authentic Mediterranean flavor.",
        descriptionVi: "Mì Ý spaghetti truyền thống sốt cà chua tươi nấu cùng cà chua bi, dầu ô liu ép lạnh, tỏi và húng tây thơm mát.",
        price: 275,
        subCategory: "Spaghetti",
        tags: ["vegetarian"]
      },
      {
        name: "Spaghetti al Limone",
        nameVi: "Mì Ý Sốt Bơ Chanh Tây",
        description: "Spaghetti in a Sage, bright lemon and butter glaze.",
        descriptionVi: "Mì Ý spaghetti quyện trong sốt bơ chanh tây tươi thanh mát và lá xô thơm.",
        price: 195,
        subCategory: "Spaghetti",
        tags: ["vegetarian", "chef-favorite"]
      },
      {
        name: "Spaghetti alle Vongole",
        nameVi: "Mì Ý Sốt Nghêu & Rượu Vang Trắng",
        description: "Tender clams cooked in garlic, olive oil, white wine, and parsley. Elegant and flavorful.",
        descriptionVi: "Nghêu tươi xào tỏi, dầu ô liu, rượu vang trắng và ngò tây. Thanh lịch và đậm đà hương vị biển.",
        price: 287,
        subCategory: "Spaghetti",
        tags: ["seafood"]
      },
      {
        name: "Spaghetti al tonno",
        nameVi: "Mì Ý Sốt Cá Ngừ & Tỏi",
        description: "Italian spaghetti with tuna in a light tomato sauce, finished with olive oil and garlic. Simple and flavorful.",
        descriptionVi: "Mì Ý với cá ngừ ngâm dầu xào trong sốt cà chua nhẹ nhàng, tỏi và dầu ô liu.",
        price: 263,
        subCategory: "Spaghetti",
        tags: ["seafood"]
      },
      // Tagliatelle
      {
        name: "Tagliatelle agli Asparagi",
        nameVi: "Mì Dẹt Tagliatelle Sốt Măng Tây",
        description: "Tagliatelle pasta tossed with sautéed green asparagus tips, garlic, and shallots, finished with a touch of cream and Parmigiano Reggiano. Light, delicate, and full of springtime flavor.",
        descriptionVi: "Mì dẹt tươi trộn cùng ngọn măng tây xanh xào, tỏi, hành tăm, thêm chút kem tươi và phô mai Parmigiano Reggiano.",
        price: 285,
        subCategory: "Tagliatelle",
        tags: ["vegetarian"]
      },
      {
        name: "Tagliatelle al Salmone",
        nameVi: "Mì Dẹt Tagliatelle Sốt Cá Hồi Xông Khói",
        description: "Silky ribbons of pasta with smoked salmon light cream sauce with dill and lemon zest.",
        descriptionVi: "Những sợi mì dẹt mềm mại quyện trong sốt kem cá hồi xông khói, thì là và vỏ chanh bào.",
        price: 326,
        subCategory: "Tagliatelle",
        tags: ["seafood"]
      },
      {
        name: "Tagliatelle alla Bolognese",
        nameVi: "Mì Dẹt Tagliatelle Sốt Bò Bằm Bolognese",
        description: "The true Bolognese - slow cooked meat sauce served over fresh tagliatelle.",
        descriptionVi: "Sốt thịt bằm Bolognese chuẩn vị hầm chậm nhiều giờ, dùng kèm mì dẹt tươi làm thủ công.",
        price: 288,
        subCategory: "Tagliatelle",
        tags: []
      },
      {
        name: "Tagliatelle Aglio e Olio con Gamberoni",
        nameVi: "Mì Dẹt Tagliatelle Tôm Sốt Tỏi & Dầu Ô Liu",
        description: "Garlic and olive oil with king prawns over fresh tagliatelle, elegant simplicity with a touch of the sea.",
        descriptionVi: "Tôm vua áp chảo cùng tỏi và dầu ô liu xào với mì dẹt tươi, thanh lịch và mang đậm vị biển.",
        price: 268,
        subCategory: "Tagliatelle",
        tags: ["seafood"]
      }
    ]
  },
  secondi: {
    title: "Secondi",
    description: "Traditional Italian main courses featuring premium seafood, meats, and creamy risottos.",
    items: [
      {
        name: "Risotto alla Milanese",
        nameVi: "Cơm Ý Risotto Saffron Milanese",
        description: "Creamy Arborio rice slowly cooked with saffron, butter, and Parmesan, creating a rich, golden hued risotto full of delicate flavor.",
        descriptionVi: "Cơm hạt tròn Arborio nấu chậm với nhụy hoa nghệ tây (saffron), bơ và phô mai Parmesan tạo nên sắc vàng sang trọng và hương vị tinh tế.",
        price: 319,
        tags: ["vegetarian"]
      },
      {
        name: "Piccata Milanese",
        nameVi: "Ức Gà Chiên Bơ Piccata Milanese",
        description: "Crispy breaded chicken breast, pan-fried in butter to golden perfection, served with spaghetti in a rich tomato sauce. A comforting Milanese twist.",
        descriptionVi: "Ức gà tẩm bột chiên bơ vàng giòn thơm phức, dùng kèm mì spaghetti sốt cà chua đậm đà kiểu Milan.",
        price: 360,
        tags: []
      },
      {
        name: "Cozze alla Tarantina",
        nameVi: "Vẹm Xanh Sốt Cà Chua Kiểu Tarantina",
        description: "Southern style mussels simmered in a rich tomato sauce with garlic, chili, and white wine, infused with fresh parsley and served with rustic bread.",
        descriptionVi: "Vẹm xanh hầm nồng nàn trong sốt cà chua đậm đà với tỏi, ớt và rượu vang trắng, ăn kèm bánh mì nướng.",
        price: 314,
        tags: ["seafood", "spicy"]
      },
      {
        name: "Cotoletta alla Milanese con Patatine",
        nameVi: "Sườn Bê Chiên Xù Cotoletta Milanese",
        description: "Golden crisp breaded veal cutlet, pan fried in clarified butter, served with French Fries and a wedge of lemon.",
        descriptionVi: "Sườn bê tẩm bột chiên bơ vàng ruộm, dùng kèm khoai tây chiên và một lát chanh tươi.",
        price: 344,
        tags: []
      },
      {
        name: "Risotto agli Asparagi",
        nameVi: "Cơm Ý Risotto Măng Tây Xanh",
        description: "Creamy Italian risotto made with Arborio rice, slowly cooked in a delicate vegetable stock. Fresh green asparagus adds a light, seasonal flavor, finished with butter, Parmigiano Reggiano, and a touch of white wine.",
        descriptionVi: "Cơm Ý risotto nấu chậm với nước dùng rau củ thanh đạm, măng tây xanh tươi, hoàn thiện cùng bơ, phô mai Parmigiano và vang trắng.",
        price: 318,
        tags: ["vegetarian"]
      }
    ]
  },
  dolci: {
    title: "Dolci",
    description: "Sweet creations to round off your meal. \"Dolci are memories on a spoon.\"",
    items: [
      {
        name: "Tiramisu",
        nameVi: "Bánh Tiramisu Truyền Thống",
        description: "Classic Italian dessert with layers of espresso-soaked ladyfingers, mascarpone cream, and cocoa.",
        descriptionVi: "Món tráng miệng kinh điển của Ý với các lớp bánh quy Savoiardi thấm đẫm cà phê espresso, kem trứng mascarpone béo mịn và bột cacao.",
        price: 161,
        tags: ["chef-recommendation"]
      },
      {
        name: "Affogato al Caffè",
        nameVi: "Kem Affogato Cà Phê",
        description: "A scoop of vanilla gelato drowned in a shot of hot espresso - simple, sweet, and satisfying.",
        descriptionVi: "Một viên kem vani mát lạnh chìm đắm trong ly cà phê espresso nóng hổi - đơn giản và hoàn hảo.",
        price: 139,
        tags: []
      },
      {
        name: "Crème brûlée",
        nameVi: "Kem Cháy Crème Brûlée",
        description: "A rich, velvety vanilla bean custard baked to perfection and finished with a delicate layer of torched raw sugar. Served chilled with a glassy, golden crackle on top, the perfect balance of creamy and crunchy.",
        descriptionVi: "Lớp custard vani béo ngậy được nướng chín hoàn hảo, phủ một lớp đường thô đốt cháy giòn tan ngọt ngào ở trên.",
        price: 132,
        tags: []
      }
    ]
  },
  drinks: {
    title: "Bevande",
    description: "From sparkling mineral waters to custom cocktails and our private wine cellar selection.",
    items: [
      // Softdrinks
      { name: "Acqua Panna", nameVi: "Nước khoáng Acqua Panna", price: 90, subCategory: "Soft Drinks" },
      { name: "San Pellegrino", nameVi: "Nước khoáng sủi bọt San Pellegrino", price: 90, subCategory: "Soft Drinks" },
      { name: "Sparkling Water", nameVi: "Nước có ga", price: 55, subCategory: "Soft Drinks" },
      { name: "Still Water", nameVi: "Nước lọc tinh khiết", price: 50, subCategory: "Soft Drinks" },
      { name: "Cola", nameVi: "Coca Cola", price: 55, subCategory: "Soft Drinks" },
      { name: "Cola Zero", nameVi: "Coca Zero", price: 55, subCategory: "Soft Drinks" },
      { name: "Sprite", nameVi: "Nước ngọt Sprite", price: 55, subCategory: "Soft Drinks" },
      { name: "San Pellegrino Limonata", nameVi: "San Pellegrino Vị Chanh", price: 75, subCategory: "Soft Drinks" },
      { name: "San Pellegrino Aranciata Rossa", nameVi: "San Pellegrino Vị Cam Đỏ", price: 75, subCategory: "Soft Drinks" },
      { name: "San Pellegrino Aranciata", nameVi: "San Pellegrino Vị Cam", price: 75, subCategory: "Soft Drinks" },
      { name: "San Pellegrino Pompelmo", nameVi: "San Pellegrino Vị Bưởi", price: 75, subCategory: "Soft Drinks" },
      { name: "Ginger Ale", nameVi: "Nước gừng Ginger Ale", price: 55, subCategory: "Soft Drinks" },
      { name: "Tonic Water", nameVi: "Nước Tonic", price: 55, subCategory: "Soft Drinks" },
      // Juices
      { name: "Pineapple Juice", nameVi: "Nước ép dứa", price: 64, subCategory: "Juices" },
      { name: "Orange Juice", nameVi: "Nước ép cam", price: 64, subCategory: "Juices" },
      { name: "Grape Juice", nameVi: "Nước ép nho", price: 66, subCategory: "Juices" },
      { name: "Coconut Water", nameVi: "Nước dừa tươi", price: 65, subCategory: "Juices" },
      // Beer
      { name: "Corona", nameVi: "Bia Corona", price: 75, subCategory: "Beer & Mocktails" },
      { name: "Heineken", nameVi: "Bia Heineken", price: 70, subCategory: "Beer & Mocktails" },
      { name: "Saigon", nameVi: "Bia Sài Gòn", price: 60, subCategory: "Beer & Mocktails" },
      { name: "Tiger", nameVi: "Bia Tiger", price: 65, subCategory: "Beer & Mocktails" },
      // Mocktails
      { name: "Virgin Mojito", nameVi: "Virgin Mojito", price: 120, subCategory: "Beer & Mocktails" },
      { name: "Sunrise Mocktail", nameVi: "Sunrise Mocktail", price: 120, subCategory: "Beer & Mocktails" },
      { name: "Tropical Fizz", nameVi: "Tropical Fizz", price: 120, subCategory: "Beer & Mocktails" },
      { name: "Shorley", nameVi: "Shorley Mocktail", price: 120, subCategory: "Beer & Mocktails" },
      // Cocktails
      { name: "Aperol Spritz", nameVi: "Aperol Spritz", price: 160, subCategory: "Cocktails & Spirits" },
      { name: "Campari Soda", nameVi: "Campari Soda", price: 155, subCategory: "Cocktails & Spirits" },
      { name: "Campari Orange", nameVi: "Campari Orange", price: 160, subCategory: "Cocktails & Spirits" },
      { name: "Negroni", nameVi: "Negroni Cổ Điển", price: 155, subCategory: "Cocktails & Spirits" },
      { name: "Espresso Martini", nameVi: "Espresso Martini", price: 155, subCategory: "Cocktails & Spirits" },
      { name: "Rose Spritz", nameVi: "Rose Spritz", price: 155, subCategory: "Cocktails & Spirits" },
      { name: "Hugo Spritz", nameVi: "Hugo Spritz", price: 160, subCategory: "Cocktails & Spirits" },
      { name: "Limoncello Spritz", nameVi: "Limoncello Spritz", price: 170, subCategory: "Cocktails & Spirits" },
      { name: "Milano Torino", nameVi: "Milano Torino", price: 155, subCategory: "Cocktails & Spirits" },
      { name: "Hibiscus Gin & Tonic", nameVi: "Hibiscus Gin & Tonic", price: 160, subCategory: "Cocktails & Spirits" },
      { name: "Mojito", nameVi: "Mojito", price: 155, subCategory: "Cocktails & Spirits" },
      { name: "Bellini", nameVi: "Bellini Cocktail", price: 160, subCategory: "Cocktails & Spirits" },
      { name: "Rossini", nameVi: "Rossini Cocktail", price: 160, subCategory: "Cocktails & Spirits" },
      // Spirits
      { name: "Belvedere", nameVi: "Belvedere Vodka", price: 250, bottlePrice: 2900, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Grey Goose", nameVi: "Grey Goose Vodka", price: 250, bottlePrice: 2800, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Absolut Vodka", nameVi: "Absolut Vodka", price: 150, bottlePrice: 1800, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Baileys", nameVi: "Rượu sữa Baileys", price: 150, bottlePrice: 1800, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Jägermeister", nameVi: "Rượu thảo mộc Jägermeister", price: 150, bottlePrice: 2100, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Amaretto", nameVi: "Rượu Amaretto", price: 150, bottlePrice: 1800, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Campari", nameVi: "Rượu khai vị Campari", price: 160, bottlePrice: 2100, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Bacardi", nameVi: "Rượu Rum Bacardi", price: 150, bottlePrice: 1800, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Jack Daniels", nameVi: "Whiskey Jack Daniels", price: 180, bottlePrice: 2300, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Johnnie Walker Black Label", nameVi: "Whisky Black Label", price: 190, bottlePrice: 2500, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Clase Azul Reposado Tequila", nameVi: "Tequila Clase Azul Reposado", bottlePrice: 10900, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      { name: "Beefeater Gin", nameVi: "Rượu Beefeater Gin", price: 150, bottlePrice: 1800, subCategory: "Cocktails & Spirits", details: { volume: "40ml" } },
      // Coffee/Tea
      { name: "Espresso", nameVi: "Cà phê Espresso", price: 55, subCategory: "Coffee & Tea" },
      { name: "Macchiato", nameVi: "Cà phê Macchiato", price: 60, subCategory: "Coffee & Tea" },
      { name: "Latte", nameVi: "Cà phê Latte", price: 75, subCategory: "Coffee & Tea" },
      { name: "Cappuccino", nameVi: "Cà phê Cappuccino", price: 75, subCategory: "Coffee & Tea" },
      { name: "Americano", nameVi: "Cà phê Americano", price: 60, subCategory: "Coffee & Tea" },
      { name: "Vietnamese Coffee Black/ Milk", nameVi: "Cà phê Đen / Nâu Đá Việt Nam", price: 65, subCategory: "Coffee & Tea" },
      { name: "Peppermint Tea", nameVi: "Trà Bạc Hà", price: 49, subCategory: "Coffee & Tea" },
      { name: "Green Tea", nameVi: "Trà Xanh", price: 49, subCategory: "Coffee & Tea" },
      { name: "Black Tea", nameVi: "Trà Đen", price: 49, subCategory: "Coffee & Tea" },
      { name: "Chamomile Tea", nameVi: "Trà Cúc La Mã", price: 49, subCategory: "Coffee & Tea" },
      // Wine Cellar
      {
        name: "Tokaj Furmint Dry - Grand Tokaj",
        nameVi: "Rượu Vang Trắng Tokaj Furmint Dry - Grand Tokaj",
        description: "A dry wine with aromas of white flowers, green apple, and fresh citrus. Harmonious acidity, rich minerality, and a crisp, well-rounded finish with subtle oak notes.",
        descriptionVi: "Dòng vang trắng khô thanh khiết mang hương hoa trắng, táo xanh và cam chanh tươi mát. Vị chua hài hòa, khoáng chất phong phú và hậu vị sồi nhẹ cuốn hút.",
        price: 160,
        bottlePrice: 784,
        subCategory: "Wine Cellar",
        details: { grape: "Furmint", region: "Hungary", alcohol: "12.5%" }
      },
      {
        name: "Luis Cañas - Bodegas Luis Cañas",
        nameVi: "Rượu Vang Đỏ Luis Cañas - Bodegas Luis Cañas",
        description: "Delicate notes of violet blend seamlessly with wild forest berries, prominent raspberries, and blackberries. Smooth, silky texture with balanced acidity and soft tannins.",
        descriptionVi: "Hương hoa violet nhẹ nhàng hòa quyện tinh tế cùng quả mọng rừng, mâm xôi chín và dâu tằm. Cấu trúc mượt mà, vị axit cân bằng cùng tannin mềm mại.",
        price: 145,
        bottlePrice: 812,
        subCategory: "Wine Cellar",
        details: { grape: "Tempranillo", region: "Spain", alcohol: "14.5%" }
      },
      {
        name: "Bodegas Artero - Artero",
        nameVi: "Rượu Vang Đỏ Bodegas Artero - Artero",
        description: "Bright cherry red color with notes of blueberries, ripe raspberries, and sweet herbs. Rich and smooth on the palate with vibrant red fruit flavors.",
        descriptionVi: "Màu đỏ anh đào tươi sáng với hương quả việt quất, mâm xôi chín và thảo mộc ngọt ngào. Tròn đầy và êm dịu trên vòm miệng.",
        price: 150,
        bottlePrice: 840,
        subCategory: "Wine Cellar",
        details: { grape: "Tempranillo", region: "Spain", alcohol: "13.5%" }
      },
      {
        name: "Primadonna Chardonnay Puglia - Varvaglione",
        nameVi: "Rượu Vang Trắng Primadonna Chardonnay Puglia - Varvaglione",
        description: "Opens with aromas of ripe tropical pineapple. Full-bodied, well-balanced, and elegant on the palate with a refreshing, gentle acidity.",
        descriptionVi: "Mở đầu với hương dứa nhiệt đới chín mọng. Thể chất đậm đà (full-bodied), cân bằng và vô cùng thanh lịch trên vòm miệng cùng hậu vị axit mát lạnh thanh nhã.",
        price: 160,
        bottlePrice: 896,
        subCategory: "Wine Cellar",
        details: { grape: "Chardonnay", region: "Italia", alcohol: "13.5%" }
      },
      {
        name: "V3 Negroamaro Del Salento - Varvaglione",
        nameVi: "Rượu Vang Đỏ V3 Negroamaro Del Salento - Varvaglione",
        description: "Aromas of wild blackberries, ripe plums, and warm vanilla with a hint of sweet spices and Mediterranean herbs. Soft, velvety, and deeply aromatic.",
        descriptionVi: "Hương mâm xôi đen hoang dã, mận chín ngọt ngào xen lẫn hương vani ấm áp và gia vị nhẹ nhàng cùng thảo mộc Địa Trung Hải. Mềm mại, mịn mượt và thơm nồng.",
        bottlePrice: 1400,
        subCategory: "Wine Cellar",
        details: { grape: "Negroamaro", region: "Italia", alcohol: "14%" }
      },
      {
        name: "Papale Primitivo Di Manduria - Varvaglione",
        nameVi: "Rượu Vang Đỏ Papale Primitivo Di Manduria - Varvaglione",
        description: "Intense aromas of ripe blueberries and wild berry jam. Rich floral notes combine with red fruits on the palate, offering a round, soft, and luxurious finish.",
        descriptionVi: "Hương thơm mãnh liệt của việt quất chín mọng và mứt quả dại thơm nồng. Hương hoa quý phái hòa quyện cùng trái cây đỏ mang lại hậu vị tròn trịa, êm ái vô cùng sang trọng.",
        bottlePrice: 2090,
        subCategory: "Wine Cellar",
        details: { grape: "Primitivo", region: "Italia", alcohol: "14.5%" }
      }
    ]
  }
};
