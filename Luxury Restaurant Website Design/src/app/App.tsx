import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft, ChevronRight, Phone, Clock, Calendar,
  Users, Mail, Heart, Briefcase, Star, Wine,
  Globe, RotateCcw, ArrowRight, Search, X, Grid, FileText, Sparkles, ChefHat, Plus, Minus,
  Upload, Trash2, AlertCircle, Paperclip, Home, Image, Sun, Moon
} from "lucide-react";
import { MENU_DATA } from "./menuData";

import fellini2 from "@/assets/fellini_2.jpg";
import fellini4 from "@/assets/fellini_4.jpg";
import fellini7 from "@/assets/fellini_7.jpg";
import fellini8 from "@/assets/fellini_8.jpg";
import fellini11 from "@/assets/fellini_11.jpg";
import fellini13 from "@/assets/fellini_13.jpg";
import homeBg2 from "@/assets/home_bg_2_enhanced.png"; // Ảnh tối số 2
import homeBg4 from "@/assets/home_bg_4_enhanced.png"; // Ảnh tối số 1
import slide1 from "../assets/hero_bg_upscaled.png";
import slide3 from "../assets/light_slide_3.png";

// // Bộ slide cho Tone Sáng (Giữ nguyên các ảnh cũ của bạn)
const lightSlides = [slide1, slide3];

// // Bộ slide mới cho Tone Tối bằng 2 file bạn yêu cầu
const darkSlides = [homeBg4, homeBg2];

const BG_SLIDES = [
  {
    quote: "Fellini Thao Dien",
    sub: "Authentic Italian kitchen where handcrafted pasta meets a romantic garden setting.",
  },
  {
    quote: "Cozy Dinners",
    sub: "A warm sanctuary of romance, curated wine cellars, and slow dining rituals.",
  }
];

import event1 from "@/assets/event_1.jpg";
import event2 from "@/assets/event_2.jpg";
import event3 from "@/assets/event_3.jpg";
import event4 from "@/assets/event_4.jpg";
import event5 from "@/assets/event_5.jpg";
import event6 from "@/assets/event_6.jpg";

import gal1 from "@/assets/gallery/523760265_17858054133464787_3959112933625401191_n.jpg";
import gal2 from "@/assets/gallery/528459324_17859694197464787_5806186954213957149_n.jpg";
import gal3 from "@/assets/gallery/529232767_17859712431464787_2600036945817334966_n.jpg";
import gal4 from "@/assets/gallery/539197432_122122237994943185_9059615477836253063_n.jpg";
import gal5 from "@/assets/gallery/539505914_17861611038464787_7619577443804292777_n.jpg";
import gal6 from "@/assets/gallery/557511945_17865959454464787_6460948438988056737_n.jpg";
import gal7 from "@/assets/gallery/562809274_17867411748464787_5262143177434053505_n.jpg";
import gal8 from "@/assets/gallery/610760015_17876671254464787_8098912751054170922_n.jpg";
import gal9 from "@/assets/gallery/688507575_122165763668943185_6494962230805065641_n.jpg";
import gal10 from "@/assets/gallery/690761966_122165763680943185_7258550513319736559_n.jpg";
import gal11 from "@/assets/gallery/690853407_122165763644943185_7650722476512213236_n.jpg";

import place1 from "@/assets/gallery/z7958702818473_2b814c376fdcb341cd4ce741b29fee44.jpg";
import place2 from "@/assets/gallery/z7958702819131_a4bf9fad90cbb33f8e9fa2cfc7f02b22.jpg";
import place3 from "@/assets/gallery/z7958702825164_dcd2b47cd46fd6c5b5fdb96b01fdee51.jpg";
import place4 from "@/assets/gallery/z7958702827762_4c3fca98aff854388c8ccb656e83278b.jpg";
import place5 from "@/assets/gallery/z7958702828853_bba44a5bcee61349c1790ad4f95af6df.jpg";
import place6 from "@/assets/z7958702868554_1f81285c1cf808f65e08c87b096ffafa.png";
import place7 from "@/assets/gallery/z7958702869295_652fd1846d07975666d52e60a31f633c.jpg";



// ══════════════════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════════════════

const MOODS = [
  { Icon: Heart, label: "Romantic Date", labelVi: "Hẹn Hò Lãng Mạn", sub: "Candlelit corners & curated wine pairings", subVi: "Góc bàn ấm cúng dưới ánh nến & thực đơn rượu tuyển chọn", img: fellini4, guests: 2, time: "19:30" },
  { Icon: Briefcase, label: "Business Lunch", labelVi: "Bữa Trưa Đối Tác", sub: "Quiet booths & seasonal prix-fixe menus", subVi: "Phòng yên tĩnh & thực đơn bữa trưa theo mùa tinh tế", img: fellini2, guests: 2, time: "12:00" },
  { Icon: Users, label: "Family Gathering", labelVi: "Sum Họp Gia Đình", sub: "Shared platters & the garden terrace", subVi: "Món ăn dùng chung & bàn tiệc tại ban công sân vườn", img: fellini11, guests: 6, time: "18:30" },
  { Icon: Star, label: "Special Occasion", labelVi: "Dịp Kỷ Niệm", sub: "Bespoke menus & Champagne on arrival", subVi: "Thực đơn thiết kế riêng & dùng kèm Champagne khai vị", img: fellini7, guests: 2, time: "19:00" },
  { Icon: Wine, label: "Wine Tasting", labelVi: "Thưởng Rượu Vang", sub: "Curated cellar & sommelier-guided pairing", subVi: "Hầm rượu vang tuyển chọn & chuyên gia gợi ý kết hợp", img: fellini13, guests: 4, time: "19:00" },
  { Icon: Sparkles, label: "Celebration", labelVi: "Tiệc Chúc Mừng", sub: "Custom cakes & festive table settings", subVi: "Bánh kem thiết kế riêng & set-up bàn tiệc chúc mừng", img: fellini8, guests: 6, time: "18:00" },
];

const getFutureDate = (targetMonth: number, targetDay: number, hour: number, minute: number = 0) => {
  const currentYear = new Date().getFullYear();
  let d = new Date(currentYear, targetMonth, targetDay, hour, minute);
  while (d.getTime() < Date.now()) {
    d.setDate(d.getDate() + 14); // Add 14 days repeatedly
  }
  return d;
};

const formatPrice = (p?: number) => {
  if (p === undefined) return "";
  return (p * 1000).toLocaleString("vi-VN") + " ₫";
};

const EVENTS = [
  { id: 1, title: "Truffle & Wine Chef's Table", sub: "A sensory 8-course seasonal journey featuring fresh black truffles and sommelier wine pairings.", date: "Sat 28 Jun", time: "7:00 PM", price: 2200, tag: "Exclusive", spots: 8, img: event1, target: getFutureDate(5, 28, 19) },
  { id: 2, title: "Thao Dien Wine Garden", sub: "Taste six natural Italian wines paired with artisanal small plates under open skies.", date: "Fri 4 Jul", time: "6:30 PM", price: 1250, tag: "Outdoor", spots: 24, img: event2, target: getFutureDate(6, 4, 18, 30) },
  { id: 3, title: "Sunday Pasta & Jazz Brunch", sub: "Hand-rolled pasta stations, bottomless Prosecco, and live jazz quartet on our terrace.", date: "Sun 12 Jul", time: "11:00 AM", price: 950, tag: "Brunch", spots: 40, img: event3, target: getFutureDate(6, 12, 11) },
  { id: 4, title: "Italian Negroni Masterclass", sub: "Craft three regional Negronis using premium botanical gins and vintage vermouths.", date: "Thu 17 Jul", time: "7:00 PM", price: 850, tag: "Workshop", spots: 12, img: event4, target: getFutureDate(6, 17, 19) },
  { id: 5, title: "Summer Seafood Degustation", sub: "Twelve courses of freshly caught local seafood prepared in traditional coastal Italian styles.", date: "Sat 26 Jul", time: "7:30 PM", price: 2600, tag: "Seafood", spots: 16, img: event5, target: getFutureDate(6, 26, 19, 30) },
  { id: 6, title: "Festa della Vendemmia", sub: "Communal outdoor long-table harvest dinner cooked over open charcoal fires.", date: "Fri 8 Aug", time: "7:00 PM", price: 1600, tag: "Communal", spots: 30, img: event6, target: getFutureDate(7, 8, 19) },
];

const GALLERY_ITEMS = [
  // --- FOOD & DRINK (11 items) ---
  {
    id: 1,
    src: gal1,
    category: "food_drink" as const,
    aspect: "landscape" as const,
    menuKey: "Burrata with Roasted Cherry Tomatoes & Pesto",
    titleEn: "Burrata & Pesto Salad",
    titleVi: "Phô Mai Burrata & Sốt Pesto",
    subEn: "Creamy buffalo burrata paired with sweet roasted tomatoes and house basil pesto.",
    subVi: "Phô mai burrata béo ngậy ăn kèm cà chua bi nướng ngọt lịm và sốt pesto húng tây tươi.",
    pairingEn: "Pair with: Pinot Grigio Colli Orientali white wine",
    pairingVi: "Gợi ý kết hợp: Vang trắng Pinot Grigio Colli Orientali"
  },
  {
    id: 2,
    src: gal2,
    category: "food_drink" as const,
    aspect: "portrait" as const,
    menuKey: "Negroni",
    titleEn: "Signature Negroni",
    titleVi: "Negroni Cổ Điển",
    subEn: "House-blended botanical gin, Campari, and aromatic sweet vermouth.",
    subVi: "Sự kết hợp tinh tế từ rượu gin hương thảo mộc, Campari và rượu vermouth ngọt thơm.",
    pairingEn: "Pair with: Artisanal cured meat platter",
    pairingVi: "Gợi ý kết hợp: Khay thịt nguội Ý hảo hạng"
  },
  {
    id: 3,
    src: gal3,
    category: "food_drink" as const,
    aspect: "landscape" as const,
    menuKey: "Spaghetti alla Carbonara",
    titleEn: "Carbonara Roman Style",
    titleVi: "Spaghetti Carbonara Cổ Điển",
    subEn: "Fresh spaghetti tossed with crispy guanciale, pecorino cheese, and egg yolks.",
    subVi: "Sợi mì Ý tươi quyện sốt trứng gà ngậy, má heo muối chiên giòn và phô mai Pecorino.",
    pairingEn: "Pair with: V3 Negroamaro Del Salento red wine",
    pairingVi: "Gợi ý kết hợp: Vang đỏ V3 Negroamaro Del Salento"
  },
  {
    id: 4,
    src: gal4,
    category: "food_drink" as const,
    aspect: "portrait" as const,
    menuKey: "Bruschetta al Pomodoro",
    titleEn: "Bruschetta al Pomodoro",
    titleVi: "Bánh Mì Bruschetta Cà Chua",
    subEn: "Toasted country bread topped with ripe diced tomatoes, garlic, and extra virgin olive oil.",
    subVi: "Bánh mì lát nướng giòn phủ cà chua chín cắt hạt lựu, tỏi thơm và dầu ô liu nguyên chất.",
    pairingEn: "Pair with: Aperol Spritz or chilled Prosecco",
    pairingVi: "Gợi ý kết hợp: Cocktail Aperol Spritz hoặc Prosecco ướp lạnh"
  },
  {
    id: 5,
    src: gal5,
    category: "food_drink" as const,
    aspect: "landscape" as const,
    menuKey: "Aperol Spritz",
    titleEn: "Classic Aperol Spritz",
    titleVi: "Aperol Spritz Rực Rỡ",
    subEn: "Aperol liqueur, crisp Prosecco, orange slice, and a splash of sparkling water.",
    subVi: "Rượu mùi Aperol, Prosecco sủi tăm, cam tươi lát và nước soda thanh mát.",
    pairingEn: "Pair with: Green olives and warm focaccia",
    pairingVi: "Gợi ý kết hợp: Quả ô liu xanh và bánh mì focaccia ấm nóng"
  },
  {
    id: 6,
    src: gal6,
    category: "food_drink" as const,
    aspect: "portrait" as const,
    menuKey: "Primadonna Chardonnay Puglia - Varvaglione",
    titleEn: "Primadonna Chardonnay",
    titleVi: "Vang Trắng Primadonna Chardonnay",
    subEn: "Full-bodied, elegant Italian white wine with aromas of ripe tropical pineapple.",
    subVi: "Vang trắng Ý đậm đà và thanh lịch mang hương dứa nhiệt đới chín mọng quyến rũ.",
    pairingEn: "Pair with: Gamberi Aglio e Olio or white sauce pasta",
    pairingVi: "Gợi ý kết hợp: Tôm sốt bơ tỏi hoặc mì Ý sốt kem trắng"
  },
  {
    id: 7,
    src: gal7,
    category: "food_drink" as const,
    aspect: "landscape" as const,
    menuKey: "Penne Ricotta e Spinaci",
    titleEn: "Penne Ricotta & Spinach",
    titleVi: "Mỳ Ý Penne Sốt Phô Mai Ricotta",
    subEn: "Penne pasta in a velvety ricotta cream sauce with baby spinach and nutmeg.",
    subVi: "Mì ống penne trộn sốt kem phô mai ricotta mịn màng cùng cải bó xôi non.",
    pairingEn: "Pair with: Primadonna Chardonnay white wine",
    pairingVi: "Gợi ý kết hợp: Vang trắng Primadonna Chardonnay"
  },
  {
    id: 8,
    src: gal8,
    category: "food_drink" as const,
    aspect: "portrait" as const,
    menuKey: "Amaretto",
    titleEn: "Italian Amaretto Disaronno",
    titleVi: "Rượu Amaretto Disaronno Ý",
    subEn: "A sweet, almond-flavored liqueur from Saronno, Italy, served neat or over ice.",
    subVi: "Dòng rượu mùi ngọt ngào mang hương hạnh nhân từ Saronno, dùng nguyên chất hoặc đá lạnh.",
    pairingEn: "Pair with: House tiramisu or cantucci biscuits",
    pairingVi: "Gợi ý kết hợp: Bánh tiramisu nhà làm hoặc bánh quy hạnh nhân"
  },
  {
    id: 9,
    src: gal9,
    category: "food_drink" as const,
    aspect: "landscape" as const,
    menuKey: "Spaghetti Frutti di Mare",
    titleEn: "Spaghetti Frutti di Mare",
    titleVi: "Spaghetti Hải Sản Địa Trung Hải",
    subEn: "Seafood spaghetti tossed with prawns, mussels, squid, garlic, and white wine sauce.",
    subVi: "Mì Ý sợi dài cùng tôm, vẹm xanh, mực áp chảo trong nước sốt tỏi và vang trắng.",
    pairingEn: "Pair with: Dry Tokaj Furmint white wine",
    pairingVi: "Gợi ý kết hợp: Vang trắng Tokaj Furmint khô"
  },
  {
    id: 10,
    src: gal10,
    category: "food_drink" as const,
    aspect: "portrait" as const,
    menuKey: "Espresso Martini",
    titleEn: "Espresso Martini",
    titleVi: "Espresso Martini Đậm Đà",
    subEn: "Rich freshly brewed espresso, premium vodka, and coffee liqueur.",
    subVi: "Cà phê espresso mới pha đậm đặc kết hợp cùng vodka hảo hạng và rượu mùi cà phê.",
    pairingEn: "Pair with: Dark chocolate tart or almond cake",
    pairingVi: "Gợi ý kết hợp: Bánh tart socola đen hoặc bánh hạnh nhân"
  },
  {
    id: 11,
    src: gal11,
    category: "food_drink" as const,
    aspect: "landscape" as const,
    menuKey: "Tiramisu",
    titleEn: "Tiramisu della Casa",
    titleVi: "Bánh Tiramisu Nhà Làm",
    subEn: "Espresso-soaked ladyfingers layered with fresh whipped mascarpone and cocoa powder.",
    subVi: "Bánh quy sampa nhúng đẫm cà phê espresso, phủ kem mascarpone béo mịn và bột cacao.",
    pairingEn: "Pair with: Espresso Martini or sweet dessert wine",
    pairingVi: "Gợi ý kết hợp: Cocktail Espresso Martini hoặc vang ngọt tráng miệng"
  },

  // --- SPACE (7 items) ---
  {
    id: 12,
    src: place1,
    category: "space" as const,
    aspect: "portrait" as const,
    titleEn: "Elegant Dining Parlor",
    titleVi: "Sảnh Tiệc Sang Trọng",
    subEn: "Sophisticated interior dining room styled with signature Italian features.",
    subVi: "Sảnh tiệc trong nhà sang trọng được thiết kế với phong cách Ý đặc trưng."
  },
  {
    id: 13,
    src: place2,
    category: "space" as const,
    aspect: "landscape" as const,
    titleEn: "Veranda Garden Terrace",
    titleVi: "Ban Công Sân Vườn Veranda",
    subEn: "Lush outdoor seating under open skies surrounded by green foliage.",
    subVi: "Không gian tiệc ngoài trời dưới trời xanh bao quanh bởi mảng xanh tươi mát."
  },
  {
    id: 14,
    src: place3,
    category: "space" as const,
    aspect: "portrait" as const,
    titleEn: "Cozy Fireside Corner",
    titleVi: "Góc Lò Sưởi Ấm Cúng",
    subEn: "Warm brick arches and romantic fireplace seating details.",
    subVi: "Góc bàn ăn ấm áp bên lò sưởi cổ điển và những bức tường gạch đỏ."
  },
  {
    id: 15,
    src: place4,
    category: "space" as const,
    aspect: "landscape" as const,
    titleEn: "The Wine Library Cellar",
    titleVi: "Hầm Rượu Vang Tinh Hoa",
    subEn: "Our exclusive showcase of regional Italian wines and vintage selections.",
    subVi: "Hầm rượu vang trưng bày những dòng vang Ý hảo hạng và tuyển chọn lâu năm."
  },
  {
    id: 16,
    src: place5,
    category: "space" as const,
    aspect: "portrait" as const,
    titleEn: "Alfresco Garden Path",
    titleVi: "Lối Đi Sân Vườn Thơ Mộng",
    subEn: "A romantic pathway leading guests through lush gardens under fairy lights.",
    subVi: "Lối đi thơ mộng dẫn thực khách qua khu vườn ngập tràn ánh đèn ấm áp."
  },
  {
    id: 17,
    src: place6,
    category: "space" as const,
    aspect: "landscape" as const,
    titleEn: "Bar & Mixology Counter",
    titleVi: "Quầy Bar Pha Chế Hiện Đại",
    subEn: "Stylish counter serving custom cocktails, digestifs, and barista coffee.",
    subVi: "Quầy bar hiện đại, nơi phục vụ cocktail tinh tế, rượu tiêu vị và cà phê Ý."
  },
  {
    id: 18,
    src: place7,
    category: "space" as const,
    aspect: "portrait" as const,
    titleEn: "Intimate Dinner Tables",
    titleVi: "Bàn Tiệc Đôi Lãng Mạn",
    subEn: "Beautifully styled candlelight tables perfect for anniversary date nights.",
    subVi: "Bàn tiệc nến lãng mạn chuẩn bị riêng cho những buổi tối hẹn hò kỷ niệm."
  }
];

type Scene = 0 | 1 | 2 | 3 | 4 | 5;

// ══════════════════════════════════════════════════════════════════════════════
// COUNTDOWN HOOK
// ══════════════════════════════════════════════════════════════════════════════

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    const s = Math.floor(diff / 1000);
    return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ══════════════════════════════════════════════════════════════════════════════
// FLIPPABLE EVENT CARD
// ══════════════════════════════════════════════════════════════════════════════

function EventCard({ ev, delay, onBook }: { ev: typeof EVENTS[0]; delay: number; onBook: (title: string, targetDate: Date) => void }) {
  const [flipped, setFlipped] = useState(false);
  const [reminded, setReminded] = useState(false);
  const cd = useCountdown(ev.target);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.82, rotateX: 14, y: 50 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
      transition={{ delay, duration: 0.85, type: "spring", stiffness: 65, damping: 14 }}
      style={{ perspective: "900px", height: "430px" }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 75, damping: 16 }}
        style={{
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => setFlipped((f) => !f)}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 overflow-hidden flex flex-col bg-white dark:bg-[#5B1A24] border border-[rgba(44,44,42,0.12)] dark:border-white/10 shadow-lg transition-colors duration-500 rounded-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-44 overflow-hidden bg-[#EDE9E2] dark:bg-[#5B1A24] shrink-0">
            <img src={ev.img} alt={ev.title} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span
              className="absolute top-3 left-3 text-[9px] tracking-[0.15em] uppercase text-white font-medium px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-sm"
            >
              {ev.tag}
            </span>
            {/* Countdown */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-[9px] font-mono text-white tracking-wider bg-black/60 backdrop-blur-md px-2 py-1 rounded-sm">
              <Clock size={9} className="opacity-60" />
              <span>
                {cd.d}d&nbsp;{String(cd.h).padStart(2, "0")}h&nbsp;{String(cd.m).padStart(2, "0")}m&nbsp;{String(cd.s).padStart(2, "0")}s
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#D4AF37] text-lg leading-snug font-semibold transition-colors duration-500 mb-2">{ev.title}</h3>
            <p className="font-['Plus_Jakarta_Sans'] text-[#7A7A72] dark:text-[#F5F2EB]/90 text-xs leading-relaxed flex-1 transition-colors duration-500">{ev.sub}</p>
            <div className="flex items-center justify-between border-t border-[rgba(44,44,42,0.1)] dark:border-white/10 transition-colors duration-500 pt-3 mt-3">
              <span className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#D4AF37] text-2xl font-bold transition-colors duration-500">{formatPrice(ev.price)}</span>
              <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#B48C50] dark:text-[#D4AF37] transition-colors duration-500">
                <RotateCcw size={9} />
                tap to book
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 flex flex-col p-6 bg-[#F7F5F0] dark:bg-[#4A151D] border border-[rgba(44,44,42,0.12)] dark:border-white/10 shadow-lg transition-colors duration-500 rounded-sm"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-[9px] tracking-[0.2em] uppercase text-[#B48C50] dark:text-[#D4AF37] mb-2 transition-colors duration-500">{ev.tag}</p>
          <h3 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#F5F2EB] text-xl leading-tight mb-4 font-semibold transition-colors duration-500">{ev.title}</h3>

          <div className="flex flex-col gap-2 text-xs text-[#7A7A72] dark:text-[#F5F2EB]/90 mb-4 transition-colors duration-500">
            <span className="flex items-center gap-2">
              <Calendar size={11} className="text-[#B48C50] dark:text-[#D4AF37]" />
              {ev.date} · {ev.time}
            </span>
            <span className="flex items-center gap-2">
              <Users size={11} className="text-[#B48C50] dark:text-[#D4AF37]" />
              {ev.spots} seats remaining
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-end gap-2">
            <div className="text-center py-3 border-t border-[rgba(44,44,42,0.1)] dark:border-white/10 border-b border-b-[rgba(44,44,42,0.1)] dark:border-b-white/10 transition-colors duration-500 mb-1">
              <span className="font-['Playfair_Display'] text-3xl text-[#2C2C2A] dark:text-[#D4AF37] font-bold transition-colors duration-500">{formatPrice(ev.price)}</span>
              <span className="text-xs text-[#7A7A72] dark:text-[#F5F2EB]/60 font-['DM_Sans'] ml-1 transition-colors duration-500">/ person</span>
            </div>

            <button
              className="w-full text-[10px] tracking-[0.15em] uppercase font-bold py-3 transition-colors duration-500 hover:opacity-85 bg-[#2C2C2A] text-white dark:bg-[#D4AF37] dark:text-[#1A1112]"
              onClick={(e) => {
                e.stopPropagation();
                onBook(ev.title, ev.target);
              }}
            >
              Reserve Table
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setReminded((r) => !r);
              }}
              className={`w-full border text-[10px] tracking-[0.15em] uppercase font-medium py-2.5 transition-all flex items-center justify-center gap-1.5
                ${reminded ? "border-[#B48C50] text-[#B48C50] dark:border-[#D4AF37] dark:text-[#D4AF37]" : "border-[rgba(44,44,42,0.2)] dark:border-white/20 text-[#7A7A72] dark:text-[#F5F2EB]/50 hover:border-[#B48C50] dark:hover:border-white/60 hover:text-[#B48C50] dark:hover:text-[#F5F2EB]/80"}`}
            >
              <Mail size={11} />
              {reminded ? "Reminder Confirmed ✓" : "Remind Me via Email"}
            </button>

            <button
              className="text-[8px] text-[#7A7A72]/60 dark:text-[#F5F2EB]/30 hover:text-[#2C2C2A] dark:hover:text-[#F5F2EB]/60 transition-colors text-center tracking-wider uppercase mt-1"
              onClick={(e) => {
                e.stopPropagation();
                setFlipped(false);
              }}
            >
              ← flip back
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// 3D MOOD CAROUSEL
// ══════════════════════════════════════════════════════════════════════════════

interface MoodCarouselProps {
  lang: "en" | "vi";
  isDark: boolean;
  onSelect: (label: string) => void;
  onMoodChange?: (idx: number) => void;
}

function MoodCarousel({ lang, isDark, onSelect, onMoodChange }: MoodCarouselProps) {
  const [active, setActive] = useState(0);
  const N = MOODS.length;

  useEffect(() => {
    if (onMoodChange) {
      onMoodChange(active);
    }
  }, [active, onMoodChange]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotate = (dir: 1 | -1) => setActive((a) => (a + dir + N) % N);

  const cardPositions: Record<number, React.CSSProperties> = isMobile ? {
    [-2]: { transform: "translateX(-130px) translateZ(-150px) rotateY(20deg) scale(0.6)", opacity: 0.25, zIndex: 1 },
    [-1]: { transform: "translateX(-75px) translateZ(-70px) rotateY(12deg) scale(0.8)", opacity: 0.65, zIndex: 5 },
    [0]: { transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 10 },
    [1]: { transform: "translateX(75px) translateZ(-70px) rotateY(-12deg) scale(0.8)", opacity: 0.65, zIndex: 5 },
    [2]: { transform: "translateX(130px) translateZ(-150px) rotateY(-20deg) scale(0.6)", opacity: 0.25, zIndex: 1 },
  } : {
    [-2]: { transform: "translateX(-640px) translateZ(-200px) rotateY(28deg) scale(0.58)", opacity: 0.22, zIndex: 1 },
    [-1]: { transform: "translateX(-360px) translateZ(-90px) rotateY(16deg) scale(0.8)", opacity: 0.58, zIndex: 5 },
    [0]: { transform: "translateX(0px) translateZ(0px) rotateY(0deg) scale(1)", opacity: 1, zIndex: 10 },
    [1]: { transform: "translateX(360px) translateZ(-90px) rotateY(-16deg) scale(0.8)", opacity: 0.58, zIndex: 5 },
    [2]: { transform: "translateX(640px) translateZ(-200px) rotateY(-28deg) scale(0.58)", opacity: 0.22, zIndex: 1 },
  };

  const getCardStyle = (i: number): React.CSSProperties => {
    const offset = ((i - active) % N + N) % N;
    const norm = offset > N / 2 ? offset - N : offset;
    const clamped = Math.max(-2, Math.min(2, norm));
    return cardPositions[clamped] ?? { transform: "translateZ(-400px) scale(0.3)", opacity: 0, zIndex: 0 };
  };

  const current = MOODS[active];

  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-sm px-4">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] tracking-[0.22em] uppercase text-[#5B1A24] dark:text-[#FAF8F5] text-center mb-2"
          >
            {lang === "vi" ? "Thiết kế riêng cho Khoảnh khắc của Bạn" : "Curated for Your Moment"}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-['Playfair_Display'] text-3xl text-[#2C2C2A] dark:text-[#F5F2EB] text-center"
          >
            {lang === "vi" ? "Không Gian & Trải Nghiệm" : "Mood & Occasion"}
          </motion.h2>
        </div>

        {/* Flat Snap Slider for mobile screens */}
        <div
          className="w-full overflow-x-auto flex gap-4 pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {MOODS.map((m, i) => (
            <div
              key={i}
              className="w-[260px] shrink-0 snap-center cursor-pointer"
              onClick={() => setActive(i)}
            >
              <div
                className={`overflow-hidden border transition-all duration-300 ${i === active ? "border-[#5B1A24] dark:border-[#D4AF37] shadow-lg scale-[1.02]" : "border-[rgba(44,44,42,0.08)] dark:border-white/10"}`}
                style={{
                  background: isDark ? "rgba(42, 26, 28, 0.95)" : "rgba(247, 244, 239, 0.88)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="relative h-44 overflow-hidden bg-[#EDE9E2] dark:bg-[#5B1A24]">
                  <img
                    src={m.img}
                    alt={lang === "vi" ? m.labelVi : m.label}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-2 text-white mb-0.5">
                      <m.Icon size={12} />
                      <span className="font-['Playfair_Display'] text-xs leading-tight">
                        {lang === "vi" ? m.labelVi : m.label}
                      </span>
                    </div>
                    <p className="text-white/70 text-[9px] leading-relaxed">
                      {lang === "vi" ? m.subVi : m.sub}
                    </p>
                  </div>
                </div>
                <div className="p-3">
                  <button
                    className="w-full text-[9px] tracking-[0.15em] uppercase font-medium py-2 transition-colors duration-500 hover:opacity-90 cursor-pointer"
                    style={{
                      background: isDark ? "#FAF8F5" : "#5B1A24",
                      color: isDark ? "#5B1A24" : "#ffffff"
                    }}
                    onClick={(e) => { e.stopPropagation(); onSelect(m.label); }}
                  >
                    {lang === "vi" ? "Đặt bàn với không gian này" : "Explore This Experience"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel indicators */}
        <div className="flex gap-1.5 items-center">
          {MOODS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === active ? "18px" : "6px",
                height: "6px",
                background: i === active ? "#5B1A24" : "rgba(44,44,42,0.18)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] tracking-[0.22em] uppercase text-[#5B1A24] dark:text-[#FAF8F5] text-center mb-2"
        >
          {lang === "vi" ? "Thiết kế riêng cho Khoảnh khắc của Bạn" : "Curated for Your Moment"}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-['Playfair_Display'] text-4xl text-[#2C2C2A] dark:text-[#F5F2EB] text-center"
        >
          {lang === "vi" ? "Không Gian & Trải Nghiệm" : "Mood & Occasion"}
        </motion.h2>
      </div>

      {/* 3D stage (adjusted height to prevent cutoff of bottom paragraph text) */}
      <div style={{ perspective: "1200px", width: "100%", height: "450px", position: "relative" }}>
        <div
          style={{
            transformStyle: "preserve-3d",
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {MOODS.map((m, i) => {
            const style = getCardStyle(i);
            const offset = ((i - active) % N + N) % N;
            const norm = offset > N / 2 ? offset - N : offset;
            const isActive = norm === 0;

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "340px",
                  transition: "all 0.65s cubic-bezier(0.34, 1.4, 0.64, 1)",
                  ...style,
                }}
                onClick={() => isActive ? onSelect(m.label) : setActive(i)}
                className="cursor-pointer"
              >
                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{
                    background: isDark ? "rgba(42, 26, 28, 0.95)" : "rgba(247, 244, 239, 0.88)",
                    backdropFilter: "blur(12px)",
                    border: isActive 
                      ? (isDark ? "1px solid rgba(212, 175, 55, 0.5)" : "1px solid rgba(90, 20, 35, 0.5)") 
                      : (isDark ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(255, 255, 255, 0.5)"),
                    boxShadow: isActive 
                      ? (isDark ? "0 20px 60px rgba(0, 0, 0, 0.55)" : "0 20px 60px rgba(44, 44, 42, 0.18)") 
                      : (isDark ? "0 4px 20px rgba(0, 0, 0, 0.35)" : "0 4px 20px rgba(44, 44, 42, 0.08)"),
                  }}
                >
                  <div className="relative h-96 overflow-hidden bg-[#EDE9E2] dark:bg-[#5B1A24]">
                    <img
                      src={m.img}
                      alt={lang === "vi" ? m.labelVi : m.label}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{ transform: isActive ? "scale(1.04)" : "scale(1)", transition: "transform 0.7s ease" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2 text-white mb-0.5">
                        <m.Icon size={13} />
                        <span className="font-['Playfair_Display'] text-sm leading-tight">
                          {lang === "vi" ? m.labelVi : m.label}
                        </span>
                      </div>
                      {isActive && (
                        <p className="text-white/65 text-[10px] leading-relaxed">
                          {lang === "vi" ? m.subVi : m.sub}
                        </p>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <div className="p-3">
                      <button
                        className="w-full text-[9px] tracking-[0.15em] uppercase font-medium py-2.5 transition-all duration-500 hover:opacity-85 cursor-pointer"
                        style={{
                          background: isDark ? "#FAF8F5" : "#5B1A24",
                          color: isDark ? "#5B1A24" : "#ffffff"
                        }}
                        onClick={(e) => { e.stopPropagation(); onSelect(m.label); }}
                      >
                        {lang === "vi" ? "Đặt bàn với không gian này" : "Explore This Experience"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => rotate(-1)}
          className="w-9 h-9 border border-[rgba(44,44,42,0.18)] dark:border-white/20 flex items-center justify-center text-[#2C2C2A] dark:text-[#F5F2EB] hover:border-[#5B1A24] hover:text-[#5B1A24] dark:text-[#FAF8F5] transition-colors"
        >
          <ChevronLeft size={17} />
        </button>
        <div className="flex gap-1.5 items-center">
          {MOODS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === active ? "18px" : "6px",
                height: "6px",
                background: i === active ? "#5B1A24" : "rgba(44,44,42,0.18)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => rotate(1)}
          className="w-9 h-9 border border-[rgba(44,44,42,0.18)] dark:border-white/20 flex items-center justify-center text-[#2C2C2A] dark:text-[#F5F2EB] hover:border-[#5B1A24] hover:text-[#5B1A24] dark:text-[#FAF8F5] transition-colors"
        >
          <ChevronRight size={17} />
        </button>
      </div>

      <motion.p
        key={active}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`font-['Playfair_Display'] text-[#7A7A72] dark:text-[#F5F2EB]/90 text-center text-sm max-w-xs ${lang === 'en' ? 'italic' : ''}`}
      >
        "{lang === "vi" ? current.subVi : current.sub}"
      </motion.p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// SCENE COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

const heroVariants = {
  initial: { opacity: 0, scale: 0.94, y: 30, rotateX: 6 },
  animate: { opacity: 1, scale: 1, y: 0, rotateX: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  exit: { opacity: 0, scale: 1.03, y: -20, transition: { duration: 0.55, ease: "easeIn" as const } },
};

const sceneVariants = {
  initial: { opacity: 0, scale: 0.88, y: 45 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.85, type: "spring" as const, stiffness: 60, damping: 14 } },
  exit: { opacity: 0, scale: 1.04, y: -30, transition: { duration: 0.45 } },
};

interface HeroSceneProps {
  lang: "en" | "vi";
  isDark: boolean;
  setShowBookingModal: (show: boolean) => void;
  bgSlide: number;
  setBgSlide: React.Dispatch<React.SetStateAction<number>>;
}
function HeroScene({ lang, isDark, setShowBookingModal, bgSlide, setBgSlide }: HeroSceneProps) {
  // Chọn bộ mảng ảnh động tương ứng theo trạng thái sáng/tối
  const currentSlides = isDark ? darkSlides : lightSlides;

  // Tự động chạy Slide sau mỗi 5 giây cho CẢ TONE SÁNG LẪN TỐI
  useEffect(() => {
    const timer = setInterval(() => {
      setBgSlide((prev) => (prev + 1) % currentSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlides]);

  // Đồng bộ index khi người dùng bấm đổi giữa Light/Dark Mode đột ngột
  const activeIndex = bgSlide % currentSlides.length;

  const handleNext = () => {
    setBgSlide((prev) => (prev + 1) % currentSlides.length);
  };

  const handlePrev = () => {
    setBgSlide((prev) => (prev - 1 + currentSlides.length) % currentSlides.length);
  };

  const handleDotClick = (idx: number) => {
    setBgSlide(idx);
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#1A1112]' : 'bg-[#F7F5F0]'}`}>

      {/* ── CENTERED IMAGE CANVAS (Căn giữa, Sắc nét 100% không phóng to) ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${isDark ? 'dark' : 'light'}-${activeIndex}`}
            src={currentSlides[activeIndex]}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-contain object-center"
            alt={`Fellini Slide ${activeIndex + 1}`}
          />
        </AnimatePresence>

        {/* Lớp phủ dải màu vuốt mờ tiệp vào màu canvas tương ứng để giấu rìa ảnh thừa */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'linear-gradient(to top, rgba(26,17,18,0.85) 0%, rgba(26,17,18,0.30) 35%, transparent 65%)'
              : 'linear-gradient(to top, rgba(247,245,240,0.90) 0%, rgba(247,245,240,0.35) 35%, transparent 65%)',
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 20%)' }}
        />
      </div>

      {/* ── TYPOGRAPHY — bottom-left overlay ── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end px-10 md:px-16 lg:px-20 pb-24 md:pb-28">
        <motion.div variants={heroVariants} initial="initial" animate="animate" exit="exit">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9 }}
            className={`text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-['DM_Sans'] font-medium mb-4 transition-colors duration-500 ${isDark ? 'text-[#D4AF37]/80' : 'text-[#B48C50]'}`}
          >
            {lang === 'vi' ? 'Ẩm Thực Ý Nguyên Bản · Ho Chi Minh City' : 'Authentic Italian Cuisine · Ho Chi Minh City'}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            className={`font-['Playfair_Display'] leading-none mb-5 transition-colors duration-500 ${isDark ? 'text-[#F5F2EB]' : 'text-[#2C2C2A]'}`}
            style={{ fontSize: 'clamp(52px, 8vw, 96px)', letterSpacing: '0.03em' }}
          >
            FELLINI
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: 'easeOut' }}
            style={{ originX: 0 }}
            className={`h-px w-14 mb-5 ${isDark ? 'bg-[#D4AF37]' : 'bg-[#B48C50]'}`}
          />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 1.2 }} className="pointer-events-auto">
            <button
              onClick={() => setShowBookingModal(true)}
              className={`text-[9px] md:text-[10px] tracking-[0.28em] uppercase font-medium transition-colors duration-300 border-b pb-1 hover:text-[#B48C50] hover:border-[#B48C50] ${isDark ? 'text-[#F5F2EB]/85 border-[#F5F2EB]/20' : 'text-[#2C2C2A]/75 border-[#2C2C2A]/20'}`}
            >
              {lang === 'vi' ? 'Đặt Bàn' : 'Reserve A Table'}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── SLIDE CONTROLS (Hiển thị nút cho cả 2 chế độ và tự động căn chỉnh số lượng dấu chấm indicators) ── */}
      <div className="absolute bottom-10 right-10 md:right-14 z-30 pointer-events-auto flex items-center gap-4">
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={handlePrev}
            className={`w-8 h-8 border flex items-center justify-center transition-colors rounded-sm cursor-pointer ${isDark ? 'border-white/20 text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37]' : 'border-[#2C2C2A]/18 text-[#2C2C2A]/50 hover:border-[#B48C50] hover:text-[#B48C50]'}`}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`w-8 h-8 border flex items-center justify-center transition-colors rounded-sm cursor-pointer ${isDark ? 'border-white/20 text-white/50 hover:border-[#D4AF37] hover:text-[#D4AF37]' : 'border-[#2C2C2A]/18 text-[#2C2C2A]/50 hover:border-[#B48C50] hover:text-[#B48C50]'}`}
            aria-label="Next Slide"
          >
            <ChevronRight size={13} />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          {currentSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleDotClick(idx)}
              className="rounded-full cursor-pointer transition-all duration-300"
              style={{
                width: idx === activeIndex ? '18px' : '5px',
                height: '5px',
                backgroundColor: idx === activeIndex
                  ? (isDark ? '#D4AF37' : '#B48C50')
                  : (isDark ? 'rgba(245, 242, 235, 0.25)' : 'rgba(44, 44, 42, 0.20)'),
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}


function MoodScene({ lang, isDark, onMoodSelect, onMoodChange }: { lang: "en" | "vi"; isDark: boolean; onMoodSelect: (moodLabel: string) => void; onMoodChange?: (idx: number) => void }) {
  return (
    <motion.div
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full flex items-center justify-center px-10"
      style={{ perspective: "800px" }}
    >
      <div className="w-full">
        <MoodCarousel lang={lang} isDark={isDark} onSelect={onMoodSelect} onMoodChange={onMoodChange} />
      </div>
    </motion.div>
  );
}

interface EventsSceneProps {
  onSelectEvent: (title: string, targetDate: Date) => void;
}

function EventsScene({ onSelectEvent }: EventsSceneProps) {
  return (
    <motion.div
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full overflow-y-auto overscroll-contain"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="px-6 lg:px-10 pt-8 pb-3">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] tracking-[0.22em] uppercase text-[#5B1A24] dark:text-[#FAF8F5] mb-1.5"
        >
          The Social Table
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-['Playfair_Display'] text-4xl text-[#2C2C2A] dark:text-[#F5F2EB]"
        >
          Events &amp; Offers
        </motion.h2>
      </div>
      <div className="px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-10">
        {EVENTS.map((ev, i) => (
          <EventCard key={ev.id} ev={ev} delay={i * 0.09} onBook={onSelectEvent} />
        ))}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// GALLERY SCENE
// ══════════════════════════════════════════════════════════════════════════════

interface GallerySceneProps {
  lang: "en" | "vi";
  setShowBookingModal: (show: boolean) => void;
  cart: Record<string, number>;
  updateQuantity: (name: string, diff: number) => void;
  setBookingNote: (note: string) => void;
}

function GalleryImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#1A1A18]">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A18] via-[#2A2A27] to-[#1A1A18] animate-pulse z-10" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={`${className || ""} transition-opacity duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

function GalleryScene({
  lang,
  setShowBookingModal,
  cart,
  updateQuantity,
  setBookingNote
}: GallerySceneProps) {
  const [filter, setFilter] = useState<"food_drink" | "space">("food_drink");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => item.category === filter
  );

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  const handleCopyLink = () => {
    if (lightboxIndex === null) return;
    const activeItem = filteredItems[lightboxIndex];
    navigator.clipboard.writeText(
      window.location.origin + `?tab=gallery&item=${activeItem.id}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  const foodDrinkCount = GALLERY_ITEMS.filter((item) => item.category === "food_drink").length;
  const spaceCount = GALLERY_ITEMS.filter((item) => item.category === "space").length;


  return (
    <motion.div
      variants={sceneVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="h-full overflow-y-auto overscroll-contain bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 text-[#2C2C2A] dark:text-[#F5F2EB]"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="px-6 lg:px-10 py-8 flex flex-col lg:flex-row gap-8 relative max-w-[1600px] mx-auto w-full">

        {/* LEFT SIDE: Dynamic Masonry Grid (3/4 width on desktop) */}
        <div className="w-full lg:w-3/4 flex flex-col gap-6 order-2 lg:order-1">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] tracking-[0.22em] uppercase text-[#B48C50] mb-1.5 font-bold"
            >
              {lang === "vi" ? "Nhật Ký Thị Giác" : "Visual Journal"}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="font-['Playfair_Display'] text-4xl text-[#2C2C2A] dark:text-[#F5F2EB] mb-6"
            >
              {lang === "vi" ? "Thư Viện Ảnh" : "Food, Drink & Vibe Gallery"}
            </motion.h2>
          </div>

          <motion.div
            layout
            className="columns-2 sm:columns-3 md:columns-4 lg:columns-4 xl:columns-5 gap-3.5 space-y-3.5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => {
                const isPortrait = item.aspect === "portrait";
                const aspectClass = isPortrait ? "aspect-[3/4]" : "aspect-[4/3]";

                return (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setLightboxIndex(idx)}
                    className={`break-inside-avoid w-full group relative cursor-pointer overflow-hidden bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[rgba(44,44,42,0.08)] dark:border-white/10 shadow-md hover:shadow-2xl hover:border-[#B48C50]/40 transition-all duration-300 flex flex-col rounded-sm ${aspectClass}`}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      <GalleryImage
                        src={item.src}
                        alt={lang === "vi" ? item.titleVi : item.titleEn}
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
                      />

                      {/* Desktop Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 hidden md:flex">
                        <span className="text-[8px] uppercase tracking-widest text-[#B48C50] font-semibold mb-0.5">
                          {lang === "vi"
                            ? item.category === "food_drink"
                              ? "Thực Đơn & Đồ Uống"
                              : "Không Gian"
                            : item.category === "food_drink"
                              ? "Food & Drink"
                              : "Space"}
                        </span>
                        <h4 className="font-['Playfair_Display'] text-white text-sm leading-tight font-medium">
                          {lang === "vi" ? item.titleVi : item.titleEn}
                        </h4>
                      </div>
                    </div>

                    {/* Mobile Caption (Shows below card on mobile viewports) */}
                    <div className="md:hidden p-2.5 bg-white dark:bg-[#5B1A24] transition-colors duration-500 flex flex-col border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 shrink-0">
                      <span className="text-[7px] uppercase tracking-widest text-[#B48C50] font-bold mb-0.5">
                        {lang === "vi"
                          ? item.category === "food_drink"
                            ? "Thực Đơn & Đồ Uống"
                            : "Không Gian"
                          : item.category === "food_drink"
                            ? "Food & Drink"
                            : "Space"}
                      </span>
                      <h4 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#F5F2EB] text-[10px] sm:text-xs font-semibold leading-tight">
                        {lang === "vi" ? item.titleVi : item.titleEn}
                      </h4>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Sticky Sidebar Navigation (1/4 width on desktop) */}
        <div className="w-full lg:w-1/4 lg:sticky lg:top-20 h-fit order-1 lg:order-2 z-30">
          <div className="bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 p-5 shadow-xl relative rounded-sm">
            {/* Sidebar Header with Minimalist Plus/Minus Toggle */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#B48C50]">
                {lang === "vi" ? "Bộ Lọc Thư Viện" : "Gallery Filter"}
              </span>
              <button
                onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                className="text-[#B48C50] hover:text-[#2C2C2A] dark:text-[#F5F2EB] transition-colors cursor-pointer p-1"
                aria-label="Toggle Sidebar Menu"
              >
                {isSidebarExpanded ? <Minus size={14} /> : <Plus size={14} />}
              </button>
            </div>

            {/* Collapsible Content */}
            <AnimatePresence initial={false}>
              {isSidebarExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden flex flex-col gap-2.5 pt-2"
                >
                  {[
                    { cat: "food_drink" as const, labelEn: "Food & Drink", labelVi: "Thực Đơn & Đồ Uống", count: foodDrinkCount },
                    { cat: "space" as const, labelEn: "Space", labelVi: "Không Gian", count: spaceCount }
                  ].map((btn) => (
                    <button
                      key={btn.cat}
                      onClick={() => {
                        setFilter(btn.cat);
                        setLightboxIndex(null);
                      }}
                      className={`text-left text-[10px] uppercase tracking-widest px-3 py-2.5 transition-all duration-300 rounded-sm flex justify-between items-center cursor-pointer font-bold ${filter === btn.cat
                        ? "bg-[#B48C50] text-white shadow-sm"
                        : "text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB] hover:bg-[#B48C50]/10"
                        }`}
                    >
                      <span>{lang === "vi" ? btn.labelVi : btn.labelEn}</span>
                      <span className={`text-[8.5px] font-mono font-bold ${filter === btn.cat ? "text-[#0C0C0B]" : "text-[#B48C50]/80"}`}>
                        ({btn.count})
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (() => {
          const activeItem = filteredItems[lightboxIndex];
          if (!activeItem) return null;
          const isFoodDrink = activeItem.category === "food_drink";
          const cartQty = isFoodDrink && activeItem.menuKey ? (cart[activeItem.menuKey] || 0) : 0;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
              />

              {/* Backdrop Close Hint Label */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] text-white/40 tracking-[0.25em] uppercase pointer-events-none hidden md:block">
                {lang === "vi" ? "Nhấp vùng trống để đóng" : "Click backdrop to close"}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 md:left-8 z-40 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer"
              >
                <ChevronLeft size={24} />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 md:right-8 z-40 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors cursor-pointer"
              >
                <ChevronRight size={24} />
              </button>

              {/* Content Panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative max-w-4xl w-full bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 border border-[#B48C50]/30 shadow-2xl flex flex-col md:flex-row overflow-hidden rounded-sm z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image side */}
                <div className="w-full md:w-3/5 bg-black flex items-center justify-center relative aspect-[4/3] md:aspect-auto md:h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <GalleryImage
                        src={activeItem.src}
                        alt={lang === "vi" ? activeItem.titleVi : activeItem.titleEn}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Details side */}
                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between h-fit md:h-[500px] bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500">
                  <div>
                    {/* Header line with pagination and share link */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#B48C50] font-bold">
                        {lang === "vi"
                          ? activeItem.category === "food_drink"
                            ? "Thực Đơn & Đồ Uống Ý"
                            : "Không Gian Fellini"
                          : activeItem.category === "food_drink"
                            ? "Italian Food & Drink"
                            : "Fellini Dining Vibe"}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleCopyLink}
                          className="text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#B48C50] transition-colors flex items-center gap-1.5 cursor-pointer font-bold font-mono"
                        >
                          <Mail size={10} />
                          {copied ? (lang === "vi" ? "Đã chép!" : "Copied!") : (lang === "vi" ? "Chia sẻ" : "Share")}
                        </button>
                        <span className="text-[10px] font-mono text-[#7A7A72] dark:text-[#F5F2EB]/90/85 tracking-widest font-semibold">
                          {String(lightboxIndex + 1).padStart(2, "0")} / {String(filteredItems.length).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#F5F2EB] text-2xl font-bold leading-tight mb-3">
                      {lang === "vi" ? activeItem.titleVi : activeItem.titleEn}
                    </h3>
                    <div className="w-10 h-[1.5px] bg-[#B48C50] mb-4" />
                    <p className="text-xs text-[#5A5A56] dark:text-[#FAF8F5] leading-relaxed mb-4 font-serif">
                      {lang === "vi" ? activeItem.subVi : activeItem.subEn}
                    </p>

                    {/* Sommelier & Chef recommendations */}
                    {isFoodDrink && activeItem.pairingEn && (
                      <div className="border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 pt-4 mt-2 space-y-1.5">
                        <p className="text-[10px] tracking-wider text-[#2C2C2A] dark:text-[#F5F2EB] font-bold flex items-center gap-1.5 uppercase">
                          <ChefHat size={11} className="text-[#B48C50]" />
                          {lang === "vi" ? "Gợi ý của Bếp Trưởng:" : "Chef Recommends:"}
                        </p>
                        <p className="text-xs text-[#7A7A72] dark:text-[#F5F2EB]/90 font-serif italic pl-4">
                          {lang === "vi" ? activeItem.pairingVi : activeItem.pairingEn}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mt-6">
                    {/* Add to Pre-order Button */}
                    {isFoodDrink && activeItem.menuKey && (
                      <button
                        onClick={() => {
                          updateQuantity(activeItem.menuKey!, 1);
                        }}
                        className={`w-full text-[10px] tracking-widest uppercase font-bold py-3 transition-colors rounded-sm cursor-pointer shadow-sm flex items-center justify-center gap-1.5 ${cartQty > 0
                          ? "bg-[#5B1A24] dark:bg-[#FAF8F5] text-white hover:bg-[#7e9388]"
                          : "border border-[rgba(44,44,42,0.2)] dark:border-white/20 text-[#2C2C2A] dark:text-[#F5F2EB] hover:bg-[#2C2C2A] hover:text-white hover:border-[#2C2C2A]"
                          }`}
                      >
                        {cartQty > 0 ? (
                          <>
                            <span>✓ {lang === "vi" ? `Đã thêm (${cartQty})` : `Added (${cartQty})`}</span>
                          </>
                        ) : (
                          <>
                            <span>{lang === "vi" ? "Thêm vào thực đơn đặt trước" : "Add to Pre-order"}</span>
                          </>
                        )}
                      </button>
                    )}

                    {/* Book Table Button */}
                    <button
                      onClick={() => {
                        setLightboxIndex(null);
                        const noteText = lang === "vi"
                          ? `Yêu cầu bàn trải nghiệm: ${activeItem.titleVi}`
                          : `Requested space/dish: ${activeItem.titleEn}`;
                        setBookingNote(noteText);
                        setShowBookingModal(true);
                      }}
                      className="w-full text-[10px] tracking-widest uppercase font-bold text-white py-3 bg-[#B48C50] hover:bg-[#a27c32] transition-colors rounded-sm cursor-pointer shadow-sm"
                    >
                      {lang === "vi" ? "Đặt Bàn Trải Nghiệm" : "Book Table & Visit"}
                    </button>

                    <div className="text-center flex justify-between items-center text-[7.5px] text-[#7A7A72] dark:text-[#F5F2EB]/90/60 uppercase tracking-wider font-semibold font-mono mt-1">
                      <span>{lang === "vi" ? "Mũi tên ← / → để chuyển ảnh" : "Arrow keys ← / → to browse"}</span>
                      <span>ESC để đóng</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// CONTACT SCENE
// ══════════════════════════════════════════════════════════════════════════════

interface ContactSceneProps {
  lang: "en" | "vi";
}

function ContactScene({ lang }: ContactSceneProps) {
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [inquiryType, setInquiryType] = useState<"celebration" | "corporate" | "press" | "general">("general");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Custom select states
  const [guests, setGuests] = useState("2");
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  // Custom Date Picker states
  const [selectedDay, setSelectedDay] = useState("21");
  const [selectedMonth, setSelectedMonth] = useState("6");
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);

  // File upload state
  const [attachedFiles, setAttachedFiles] = useState<{ name: string; size: string }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [callbackMethod, setCallbackMethod] = useState<"phone" | "zalo" | "email">("zalo");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isVi = lang === "vi";

  // Auto-set initial subject based on category
  useEffect(() => {
    if (inquiryType === "press") {
      setSubject(isVi ? "Chụp ảnh & Quay phim thực đơn" : "Food Photography & Filming");
    } else if (inquiryType === "general") {
      setSubject(isVi ? "Hỏi đáp Thực đơn & Nguyên liệu" : "Menu & Ingredients Inquiry");
    } else {
      setSubject("");
    }
  }, [inquiryType, lang]);

  const handleInquirySelect = (type: "celebration" | "corporate" | "press" | "general") => {
    setInquiryType(type);
    setFormStep(2);
    setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!name.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập Họ và Tên!" : "Please enter your Full Name!");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg(isVi ? "Vui lòng nhập địa chỉ Email hợp lệ!" : "Please enter a valid Email address!");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập Số điện thoại hoặc Zalo!" : "Please enter your Phone or Zalo number!");
      return;
    }
    if (!message.trim()) {
      setErrorMsg(isVi ? "Vui lòng điền nội dung yêu cầu chi tiết!" : "Please enter your detailed inquiry message!");
      return;
    }
    setErrorMsg("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1200);
  };

  // Mock File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      addFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      addFile(file);
    }
  };

  const addFile = (file: File) => {
    const sizeInKb = (file.size / 1024).toFixed(1);
    setAttachedFiles(prev => [...prev, { name: file.name, size: `${sizeInKb} KB` }]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const INQUIRY_OPTIONS = [
    {
      type: "celebration" as const,
      icon: Sparkles,
      titleEn: "Celebration & Date",
      titleVi: "Tiệc Kỷ Niệm & Hẹn Hò",
      descEn: "Anniversaries, proposals, birthdays, or candlelit date nights.",
      descVi: "Kỷ niệm ngày cưới, lời cầu hôn, tiệc sinh nhật hoặc bữa tối lãng mạn."
    },
    {
      type: "corporate" as const,
      icon: Briefcase,
      titleEn: "Corporate & Private Event",
      titleVi: "Sự Kiện Doanh Nghiệp",
      descEn: "Company dinners, quiet booths, or custom private dining packages.",
      descVi: "Tiệc công ty, phòng đối tác yên tĩnh hoặc thực đơn tiệc thiết kế riêng."
    },
    {
      type: "press" as const,
      icon: FileText,
      titleEn: "Media & Collaboration",
      titleVi: "Truyền Thông & Hợp Tác",
      descEn: "Press kits, food photography, branding, or business partnerships.",
      descVi: "Phỏng vấn báo chí, chụp ảnh món ăn, hoặc các cơ hội hợp tác thương hiệu."
    },
    {
      type: "general" as const,
      icon: Mail,
      titleEn: "General Concierge",
      titleVi: "Yêu Cầu Chung",
      descEn: "General questions, recipes, sommelier cellars, or dining feedback.",
      descVi: "Thắc mắc chung, công thức món ăn, câu hỏi hầm rượu hoặc ý kiến phản hồi."
    }
  ];

  const MONTHS = isVi
    ? ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const PRESS_SUBJECTS = isVi
    ? ["Chụp ảnh & Quay phim thực đơn", "Tài trợ sự kiện / Phỏng vấn", "Hợp tác Đại sứ thương hiệu"]
    : ["Food Photography & Filming", "Press Interview / Event Sponsor", "Brand Ambassador Collaboration"];

  const GENERAL_SUBJECTS = isVi
    ? ["Hỏi đáp Thực đơn & Nguyên liệu", "Liên hệ Chuyên gia Sommelier", "Góp ý chất lượng phục vụ"]
    : ["Menu & Ingredients Inquiry", "Sommelier wine cellar request", "Service Quality Feedback"];

  const subjectOptions = inquiryType === "press" ? PRESS_SUBJECTS : GENERAL_SUBJECTS;

  return (
    <div className="h-full overflow-y-auto overscroll-contain bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 text-[#2C2C2A] dark:text-[#F5F2EB]" style={{ scrollbarWidth: "none" }}>
      <div className="px-6 lg:px-10 py-8 flex flex-col lg:flex-row gap-8 relative max-w-[1600px] mx-auto w-full">

        {/* LEFT COLUMN: Interactive Concierge Flow */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6 order-2 lg:order-1">
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#B48C50] mb-1.5 font-bold">
              {isVi ? "Dịch Vụ Hỗ Trợ" : "Concierge Service"}
            </p>
            <h2 className="font-['Playfair_Display'] text-4xl text-[#2C2C2A] dark:text-[#F5F2EB] mb-6">
              {isVi ? "Liên Hệ Ban Quản Lý" : "Concierge & Inquiries"}
            </h2>
          </div>

          <div className="bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 p-6 md:p-8 shadow-xl relative rounded-sm min-h-[420px] flex flex-col justify-between">
            {/* Form Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-[8.5px] uppercase tracking-widest text-[#7A7A72] dark:text-[#F5F2EB]/90 font-bold mb-2">
                <span>{isVi ? `BƯỚC ${formStep} / 2` : `STEP ${formStep} OF 2`}</span>
                <span>{isVi ? (formStep === 1 ? "Chọn Loại Yêu Cầu" : "Thông Tin Yêu Cầu") : (formStep === 1 ? "Select Inquiry Type" : "Inquiry Details")}</span>
              </div>
              <div className="w-full h-[2px] bg-black/5 relative rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-[#B48C50] transition-all duration-500 rounded-full"
                  style={{ width: formStep === 1 ? "50%" : "100%" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center py-10"
                >
                  <div className="w-14 h-14 rounded-full bg-[#5B1A24] dark:bg-[#FAF8F5]/15 text-[#5B1A24] dark:text-[#FAF8F5] flex items-center justify-center text-2xl mb-4 font-bold">
                    ✓
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl text-[#2C2C2A] dark:text-[#F5F2EB] font-bold mb-3">
                    {isVi ? "Đã Tiếp Nhận Yêu Cầu! ✓" : "Inquiry Received! ✓"}
                  </h3>
                  <p className="text-xs text-[#5A5A56] dark:text-[#FAF8F5] leading-relaxed max-w-sm font-serif italic mb-6">
                    {isVi
                      ? `Kính gửi Quý khách ${name}, ban quản lý Fellini đã tiếp nhận yêu cầu của Quý khách. Bản sao chi tiết yêu cầu đã được gửi tự động tới hòm thư ${email}. Chúng tôi sẽ phản hồi qua ${callbackMethod.toUpperCase()} sớm nhất trong vòng 2 giờ.`
                      : `Dear Guest ${name}, your inquiry has been successfully received by Fellini's management desk. A receipt summary was sent automatically to ${email}. We will contact you via ${callbackMethod.toUpperCase()} shortly, within 2 hours.`}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormStep(1);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                      setCompany("");
                      setAttachedFiles([]);
                    }}
                    className="px-6 py-2.5 bg-[#2C2C2A] text-white text-[9px] tracking-widest uppercase font-bold hover:bg-black transition-colors rounded-sm"
                  >
                    {isVi ? "Gửi Yêu Cầu Khác" : "Send Another Inquiry"}
                  </button>
                </motion.div>
              ) : formStep === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex-1 flex flex-col justify-center"
                >
                  <p className="text-xs text-[#7A7A72] dark:text-[#F5F2EB]/90 italic font-serif mb-5 leading-relaxed text-center">
                    {isVi
                      ? "“Chào mừng Quý khách đến với dịch vụ hỗ trợ Fellini. Xin vui lòng chọn danh mục phù hợp để chúng tôi phục vụ tốt nhất.”"
                      : "“Greetings from Fellini Thao Dien. Please select a category below so our concierge desk can assist you.”"}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INQUIRY_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <div
                          key={opt.type}
                          onClick={() => handleInquirySelect(opt.type)}
                          className="p-4 border border-[rgba(44,44,42,0.12)] bg-white dark:bg-[#5B1A24] transition-colors duration-500 hover:border-[#B48C50]/60 hover:shadow-md cursor-pointer transition-all duration-300 rounded-sm flex gap-3.5 items-start"
                        >
                          <div className="p-2 rounded bg-[#B48C50]/10 text-[#B48C50] shrink-0 mt-0.5">
                            <Icon size={16} />
                          </div>
                          <div>
                            <h4 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#F5F2EB] text-sm font-semibold leading-tight mb-1">
                              {isVi ? opt.titleVi : opt.titleEn}
                            </h4>
                            <p className="text-[#7A7A72] dark:text-[#F5F2EB]/90 text-[10px] sm:text-[11px] leading-relaxed">
                              {isVi ? opt.descVi : opt.descEn}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleSubmit}
                  className="flex-1 flex flex-col gap-4 mt-2"
                >
                  {/* Dynamic context guide banner */}
                  <div className="bg-[#B48C50]/5 border border-[#B48C50]/20 p-3 rounded-sm flex items-center justify-between">
                    <span className="text-[10px] text-[#B48C50] uppercase font-bold tracking-wider">
                      {isVi ? "Danh mục đang chọn:" : "Selected Inquiry:"} {
                        inquiryType === "celebration" ? (isVi ? "Kỷ Niệm / Hẹn Hò" : "Celebration") :
                          inquiryType === "corporate" ? (isVi ? "Doanh Nghiệp / Sự Kiện" : "Corporate") :
                            inquiryType === "press" ? (isVi ? "Hợp Tác / Truyền Thông" : "Press") :
                              (isVi ? "Yêu Cầu Chung" : "General")
                      }
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="text-[9px] uppercase tracking-wider font-bold text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-black"
                    >
                      {isVi ? "← Thay Đổi" : "← Change"}
                    </button>
                  </div>

                  {/* Custom Validation Alert Banner */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-sm flex items-start gap-2.5 overflow-hidden"
                      >
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-relaxed font-serif font-medium">{errorMsg}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                        {isVi ? "Họ và Tên *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isVi ? "Ví dụ: Nguyễn Văn An" : "e.g., Alexander Mercer"}
                        className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                        {isVi ? "Địa chỉ Email *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={isVi ? "email@vi-du.com" : "email@example.com"}
                        className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                        {isVi ? "Số điện thoại / Zalo *" : "Phone / Zalo Number *"}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={isVi ? "Ví dụ: 0901 234 567" : "e.g., +84 907 123 456"}
                        className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB]"
                      />
                    </div>

                    {/* Celebration specific fields (Custom dropdown selectors) */}
                    {inquiryType === "celebration" && (
                      <div className="grid grid-cols-2 gap-2">
                        {/* Custom Guests Dropdown */}
                        <div className="relative">
                          <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                            {isVi ? "Số Khách" : "Guests"}
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                            className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                          >
                            <span>{guests} {isVi ? "Khách" : "Guests"}</span>
                            <span className="text-[9px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                          </button>
                          {isGuestsOpen && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setIsGuestsOpen(false)} />
                              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-48 overflow-y-auto overscroll-contain rounded-sm">
                                {["2", "3", "4", "5", "6", "8", "10+"].map(g => (
                                  <button
                                    key={g}
                                    type="button"
                                    onClick={() => {
                                      setGuests(g);
                                      setIsGuestsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#B48C50]/10 transition-colors ${guests === g ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                                  >
                                    {g} {isVi ? "Khách" : "Guests"}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Custom Date Pickers */}
                        <div>
                          <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                            {isVi ? "Ngày" : "Date"}
                          </label>
                          <div className="grid grid-cols-2 gap-1">
                            {/* Day */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsDayOpen(!isDayOpen)}
                                className="w-full px-2 py-2 text-[11px] border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                              >
                                <span>{selectedDay}</span>
                                <span className="text-[7px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                              </button>
                              {isDayOpen && (
                                <>
                                  <div className="fixed inset-0 z-40" onClick={() => setIsDayOpen(false)} />
                                  <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-40 overflow-y-auto overscroll-contain rounded-sm">
                                    {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(d => (
                                      <button
                                        key={d}
                                        type="button"
                                        onClick={() => {
                                          setSelectedDay(d);
                                          setIsDayOpen(false);
                                        }}
                                        className={`w-full text-left px-2 py-1.5 text-[11px] hover:bg-[#B48C50]/10 transition-colors ${selectedDay === d ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                                      >
                                        {d}
                                      </button>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Month */}
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setIsMonthOpen(!isMonthOpen)}
                                className="w-full px-2 py-2 text-[10px] border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                              >
                                <span className="truncate">{MONTHS[Number(selectedMonth) - 1]}</span>
                                <span className="text-[7px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                              </button>
                              {isMonthOpen && (
                                <>
                                  <div className="fixed inset-0 z-40" onClick={() => setIsMonthOpen(false)} />
                                  <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-40 overflow-y-auto overscroll-contain rounded-sm">
                                    {MONTHS.map((m, idx) => (
                                      <button
                                        key={m}
                                        type="button"
                                        onClick={() => {
                                          setSelectedMonth(String(idx + 1));
                                          setIsMonthOpen(false);
                                        }}
                                        className={`w-full text-left px-2 py-1.5 text-[10px] hover:bg-[#B48C50]/10 transition-colors ${selectedMonth === String(idx + 1) ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                                      >
                                        {m}
                                      </button>
                                    ))}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Corporate specific fields */}
                    {inquiryType === "corporate" && (
                      <div>
                        <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                          {isVi ? "Tên Doanh Nghiệp / Nhóm" : "Company / Group Name"}
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Fellini HCMC Team"
                          className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB]"
                        />
                      </div>
                    )}

                    {/* Press and general fields (Custom subject select lists) */}
                    {(inquiryType === "press" || inquiryType === "general") && (
                      <div className="relative">
                        <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                          {isVi ? "Chủ đề yêu cầu" : "Subject Category"}
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsSubjectOpen(!isSubjectOpen)}
                          className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                        >
                          <span className="truncate pr-4">{subject}</span>
                          <span className="text-[9px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                        </button>
                        {isSubjectOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsSubjectOpen(false)} />
                            <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-48 overflow-y-auto overscroll-contain rounded-sm">
                              {subjectOptions.map(subOpt => (
                                <button
                                  key={subOpt}
                                  type="button"
                                  onClick={() => {
                                    setSubject(subOpt);
                                    setIsSubjectOpen(false);
                                  }}
                                  className={`w-full text-left px-3 py-2 text-xs hover:bg-[#B48C50]/10 transition-colors ${subject === subOpt ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                                >
                                  {subOpt}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Drag & Drop File Zone (For Corporate and Press Categories) */}
                  {(inquiryType === "corporate" || inquiryType === "press") && (
                    <div className="col-span-full">
                      <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                        {isVi ? "Tài liệu đính kèm (Không bắt buộc)" : "Attachments (Optional)"}
                      </label>
                      <div
                        onDragEnter={handleDrag}
                        onDragOver={handleDrag}
                        onDragLeave={handleDrag}
                        onDrop={handleDrop}
                        onClick={triggerFileSelect}
                        className={`border border-dashed p-4 rounded-sm transition-all duration-300 text-center cursor-pointer flex flex-col items-center justify-center gap-1.5
                          ${dragActive
                            ? "border-[#B48C50] bg-[#B48C50]/5"
                            : "border-[rgba(44,44,42,0.15)] bg-white dark:bg-[#5B1A24] transition-colors duration-500 hover:border-[#B48C50]/40"
                          }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <Upload size={16} className="text-[#B48C50] opacity-80" />
                        <span className="text-[10px] text-[#2C2C2A] dark:text-[#F5F2EB] font-semibold">
                          {isVi ? "Kéo & thả file hoặc click để tải lên" : "Drag & drop files or click to upload"}
                        </span>
                        <span className="text-[8.5px] text-[#7A7A72] dark:text-[#F5F2EB]/90">
                          {isVi ? "Hỗ trợ định dạng PDF, DOC, PNG, JPG (Tối đa 10MB)" : "Supports PDF, DOC, PNG, JPG (Max 10MB)"}
                        </span>
                      </div>

                      {attachedFiles.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          {attachedFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-black/5 p-2 rounded-sm border border-[rgba(44,44,42,0.06)]">
                              <div className="flex items-center gap-2 text-xs truncate max-w-[80%]">
                                <Paperclip size={12} className="text-[#B48C50]" />
                                <span className="truncate font-serif text-[#2C2C2A] dark:text-[#F5F2EB]">{file.name}</span>
                                <span className="text-[9px] text-[#7A7A72] dark:text-[#F5F2EB]/90 font-mono">({file.size})</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeFile(idx); }}
                                className="text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-red-600 transition-colors p-1"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                      {isVi ? "Nội dung yêu cầu chi tiết *" : "Detailed Inquiry Message *"}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isVi ? "Quý khách vui lòng cung cấp thêm chi tiết để được hỗ trợ tốt nhất..." : "Please provide more detail for our concierge staff to assist..."}
                      rows={3}
                      className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] resize-none font-serif"
                    />
                  </div>

                  {/* Callback methods toggle */}
                  <div className="pt-2 border-t border-[rgba(44,44,42,0.06)]">
                    <label className="block text-[9.5px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-2">
                      {isVi ? "Kênh phản hồi ưu tiên" : "Preferred Callback Channel"}
                    </label>
                    <div className="flex gap-2.5">
                      {[
                        { type: "zalo" as const, label: "Zalo Chat" },
                        { type: "phone" as const, label: isVi ? "Gọi điện trực tiếp" : "Direct Phone Call" },
                        { type: "email" as const, label: "Email Desk" }
                      ].map((ch) => (
                        <button
                          key={ch.type}
                          type="button"
                          onClick={() => setCallbackMethod(ch.type)}
                          className={`text-xs uppercase tracking-wider px-4 py-2.5 transition-all duration-300 font-bold rounded-sm border cursor-pointer ${callbackMethod === ch.type
                            ? "bg-[#B48C50] text-white border-[#B48C50] shadow-sm"
                            : "border-[rgba(44,44,42,0.15)] text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB] hover:bg-black/5"
                            }`}
                        >
                          {ch.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3.5 mt-4">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="w-1/3 py-3 border border-[rgba(44,44,42,0.2)] dark:border-white/20 text-[#2C2C2A] dark:text-[#F5F2EB] hover:bg-black/5 font-bold text-[10px] tracking-widest uppercase transition-colors rounded-sm cursor-pointer"
                    >
                      {isVi ? "Quay lại" : "Back"}
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-2/3 py-3 bg-[#B48C50] text-white hover:bg-[#a27c32] font-bold text-[10px] tracking-widest uppercase transition-all rounded-sm shadow-md flex items-center justify-center gap-1.5 ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      {isLoading ? (
                        <>
                          <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{isVi ? "ĐANG GỬI..." : "SENDING..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{isVi ? "Gửi tới Ban quản lý" : "Submit to Concierge"}</span>
                          <ArrowRight size={12} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Privacy Link Notice */}
                  <p className="text-[9px] text-[#7A7A72] dark:text-[#F5F2EB]/90/85 text-center italic mt-2 font-serif">
                    {isVi
                      ? "“Thông tin của Quý khách được cam kết bảo mật tuyệt đối theo Chính sách Quyền riêng tư của Fellini.”"
                      : "“Your information is strictly secured under Fellini's Privacy & Concierge Security Policy.”"}
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: Sensory Contact Info & Guide Map */}
        <div className="w-full lg:w-2/5 flex flex-col gap-6 order-1 lg:order-2 z-30">
          <div className="bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 p-6 md:p-8 shadow-xl relative rounded-sm flex flex-col gap-6">

            {/* Quick hotlines */}
            <div>
              <span className="text-[9px] tracking-widest uppercase font-bold text-[#B48C50] block mb-2">
                {isVi ? "Hotline Trực Tiếp" : "Hotline & Chat Support"}
              </span>
              <div className="flex flex-col gap-2.5">
                <a
                  href="tel:+84703338877"
                  className="flex items-center gap-3 text-sm text-[#2C2C2A] dark:text-[#F5F2EB] font-semibold hover:text-[#B48C50] transition-colors"
                >
                  <div className="p-2 rounded-full bg-[#B48C50]/10 text-[#B48C50]">
                    <Phone size={13} />
                  </div>
                  <span>+84 703 338 877</span>
                </a>
                <a
                  href="https://zalo.me/84703338877"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-[#2C2C2A] dark:text-[#F5F2EB] font-semibold hover:text-[#B48C50] transition-colors"
                >
                  <div className="p-2 rounded-full bg-[#B48C50]/10 text-[#B48C50]">
                    <Globe size={13} />
                  </div>
                  <span>Zalo Concierge Desk</span>
                </a>
              </div>
            </div>

            {/* Address & Vibe */}
            <div className="border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 pt-4">
              <span className="text-[9px] tracking-widest uppercase font-bold text-[#B48C50] block mb-1">
                {isVi ? "Địa Chỉ & Thời Gian" : "Address & Hours"}
              </span>
              <p className="text-xs text-[#2C2C2A] dark:text-[#F5F2EB] leading-relaxed font-serif">
                34 Thao Dien Street, Thao Dien Ward, District 2, Thu Duc City, HCMC.
              </p>
              <div className="flex flex-col gap-1 text-[11px] text-[#7A7A72] dark:text-[#F5F2EB]/90 mt-2 font-mono">
                <span className="flex items-center gap-1.5">
                  <Clock size={11} />
                  {isVi ? "Mở cửa hàng ngày: 11:00 AM - 10:30 PM" : "Open Daily: 11:00 AM - 10:30 PM"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Wine size={11} />
                  {isVi ? "Phục vụ thử rượu: 6:00 PM - 10:00 PM" : "Sommelier Tasting: 6:00 PM - 10:00 PM"}
                </span>
              </div>
            </div>

            {/* Valet Parking services */}
            <div className="border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 pt-4">
              <span className="text-[9px] tracking-widest uppercase font-bold text-[#B48C50] block mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                {isVi ? "Dịch Vụ Đỗ Xe Cho Khách" : "Complimentary Valet Parking"}
              </span>
              <p className="text-xs text-[#5A5A56] dark:text-[#FAF8F5] leading-relaxed font-serif italic pl-3">
                {isVi
                  ? "Chúng tôi cung cấp dịch vụ giao nhận và đỗ xe (valet parking) hoàn toàn miễn phí tại lối vào chính của nhà hàng sân vườn."
                  : "Complimentary private valet parking service is provided directly at our garden entrance courtyard upon your arrival."}
              </p>
            </div>

            {/* Sommelier Duty */}
            <div className="border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 pt-4">
              <span className="text-[9px] tracking-widest uppercase font-bold text-[#B48C50] block mb-1">
                {isVi ? "Chuyên Gia Rượu Vang Trực Tối Nay" : "On-Duty Sommelier Tonight"}
              </span>
              <p className="text-xs text-[#5A5A56] dark:text-[#FAF8F5] leading-relaxed font-serif pl-3 font-semibold">
                {isVi
                  ? "Nguyễn Hoàng Long (Certified Court of Master Sommeliers)"
                  : "Alex Nguyen (Certified Court of Master Sommeliers)"}
              </p>
            </div>

            {/* Stylized Guide Map container */}
            <div className="border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 pt-4">
              <span className="text-[9px] tracking-widest uppercase font-bold text-[#B48C50] block mb-2">
                {isVi ? "Bản Đồ Chỉ Đường" : "Access Guide Map"}
              </span>
              <div className="relative h-40 bg-[#2C2C2A] overflow-hidden rounded-sm flex items-center justify-center border border-[#B48C50]/20 group">
                {/* Schematic SVG Vector Map */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background */}
                  <rect width="300" height="200" fill="#1C1C1A" />

                  {/* Grid Lines */}
                  <path d="M 0 40 L 300 40" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 0 80 L 300 80" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 0 120 L 300 120" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 0 160 L 300 160" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 60 0 L 60 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 120 0 L 120 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 180 0 L 180 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                  <path d="M 240 0 L 240 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                  {/* River (Saigon River concept) */}
                  <path d="M -20 -10 C 50 20 80 -10 160 30 C 240 70 270 40 320 90 L 320 -20 Z" fill="rgba(90,20,35,0.12)" stroke="rgba(90,20,35,0.2)" strokeWidth="1.5" />

                  {/* Roads (Gold/Cream Schematic lines) */}
                  {/* Hanoi Highway */}
                  <path d="M -10 170 L 310 170" stroke="rgba(180, 140, 80, 0.35)" strokeWidth="6" />
                  <path d="M -10 170 L 310 170" stroke="#FAF9F6" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Thao Dien Street */}
                  <path d="M 110 210 L 110 50 C 110 30 180 30 200 -10" stroke="rgba(180, 140, 80, 0.5)" strokeWidth="2.5" fill="none" />

                  {/* Xuan Thuy Street */}
                  <path d="M -10 110 L 310 110" stroke="rgba(180, 140, 80, 0.3)" strokeWidth="2.5" />

                  {/* Quoc Huong Street */}
                  <path d="M 220 210 L 220 80" stroke="rgba(180, 140, 80, 0.3)" strokeWidth="1.8" />

                  {/* Road names */}
                  <text x="12" y="180" fill="rgba(255,255,255,0.35)" fontSize="5.5" fontFamily="sans-serif" letterSpacing="0.1em">HANOI HIGHWAY</text>
                  <text x="117" y="145" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="sans-serif" letterSpacing="0.05em" transform="rotate(-90 117 145)">THAO DIEN ST</text>
                  <text x="230" y="105" fill="rgba(255,255,255,0.25)" fontSize="5" fontFamily="sans-serif" letterSpacing="0.05em">XUAN THUY ST</text>
                  <text x="5" y="30" fill="rgba(90,20,35,0.4)" fontSize="5.5" fontFamily="serif" fontStyle="italic">Saigon River</text>

                  {/* FELLINI pulsing pin */}
                  <circle cx="110" cy="75" r="4.5" fill="#B48C50" />
                  <circle cx="110" cy="75" r="12" fill="none" stroke="#B48C50" strokeWidth="0.8">
                    <animate attributeName="r" values="4.5;15;4.5" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite" />
                  </circle>

                  {/* Compass Rose decoration */}
                  <g transform="translate(270, 30) scale(0.5)">
                    <circle cx="0" cy="0" r="12" stroke="rgba(180, 140, 80, 0.15)" strokeWidth="0.8" />
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="rgba(180, 140, 80, 0.2)" strokeWidth="0.8" />
                    <line x1="0" y1="-15" x2="0" y2="15" stroke="rgba(180, 140, 80, 0.2)" strokeWidth="0.8" />
                    <polygon points="0,-12 -3,0 0,2 3,0" fill="#B48C50" />
                    <polygon points="0,12 -3,0 0,-2 3,0" fill="rgba(180, 140, 80, 0.2)" />
                    <text x="-2.2" y="-14" fill="#B48C50" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">N</text>
                  </g>
                </svg>

                {/* Click layer overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                  <a
                    href="https://maps.google.com/?q=34+Thao+Dien+Street+District+2+HCMC"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[9px] uppercase tracking-widest bg-[#B48C50] hover:bg-[#a27c32] transition-colors text-white py-1.5 px-4 rounded-sm font-bold shadow-md cursor-pointer"
                  >
                    {isVi ? "Xem Bản Đồ Lớn" : "Get Directions"}
                  </a>
                </div>

                <div className="absolute bottom-2 left-2 z-10 bg-[#1C1C1A]/85 backdrop-blur-sm border border-white/10 px-2 py-0.5 pointer-events-none rounded-sm">
                  <span className="text-[7px] uppercase tracking-wider text-[#B48C50] font-bold">Ristorante Fellini</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MENU SCENE
// ══════════════════════════════════════════════════════════════════════════════

const WINE_PAIRINGS: Record<string, string> = {
  // Antipasti
  "Caprese con Mozzarella di Bufala": "Pinot Grigio Colli Orientali",
  "Gamberi Aglio e Olio": "Tokaj Furmint Dry - Grand Tokaj",
  "Zuppa Pavese": "Primadonna Chardonnay Puglia",
  "Burrata with Roasted Cherry Tomatoes & Pesto": "Tokaj Furmint Dry or Prosecco",
  "Bruschetta al Pomodoro": "Aperol Spritz or Pinot Grigio",
  "Parmigiana di Melanzona": "Bodegas Artero Tempranillo",
  // Pastas
  "Penne all'Arrabbiata": "Luis Cañas Tempranillo",
  "Penne Ricotta e Spinach": "Primadonna Chardonnay Puglia",
  "Penne Cinque Pi": "Primadonna Chardonnay Puglia",
  "Penne al Forno": "V3 Negroamaro Del Salento",
  "Rigatoni Boscaiola": "Luis Cañas Tempranillo",
  "Rigatoni ai Quattro Formaggi": "Tokaj Furmint Dry",
  "Rigatoni al Pesto": "Primadonna Chardonnay Puglia",
  "Spaghetti alla Carbonara": "V3 Negroamaro Del Salento",
  "Rigatoni all'Amatriciana": "V3 Negroamaro Del Salento",
  "Spaghetti aglio e olio": "Primadonna Chardonnay Puglia",
  "Spaghetti Frutti di Mare": "Tokaj Furmint Dry",
  "Spaghetti al Pomodoro": "Bodegas Artero Tempranillo",
  "Spaghetti al Limone": "Primadonna Chardonnay Puglia",
  "Spaghetti alle Vongole": "Tokaj Furmint Dry",
  "Spaghetti al tonno": "Primadonna Chardonnay",
  "Tagliatelle agli Asparagi": "Primadonna Chardonnay",
  "Tagliatelle al Salmone": "Primadonna Chardonnay Puglia",
  "Tagliatelle alla Bolognese": "Papale Primitivo Di Manduria",
  "Tagliatelle Aglio e Olio con Gamberoni": "Tokaj Furmint Dry",
  // Secondi
  "Risotto alla Milanese": "Primadonna Chardonnay Puglia",
  "Piccata Milanese": "Bodegas Artero Tempranillo",
  "Cozze alla Tarantina": "Tokaj Furmint Dry - Grand Tokaj",
  "Cotoletta alla Milanese con Patatine": "V3 Negroamaro Del Salento",
  "Risotto asperagi": "Primadonna Chardonnay Puglia",
  // Dolci
  "Tiramisu": "Espresso Martini or Vin Santo",
  "Affogato al Cafè": "Baileys Irish Cream",
  "Crème brûlée": "Tokaj Furmint Dry"
};

const CATEGORY_DETAILS: Record<string, { label: string; sub: string; quote: string }> = {
  antipasti: {
    label: "Antipasti",
    sub: "L'Inizio dell'Esperienza",
    quote: "“A meal is a conversation that begins with the hands.”"
  },
  pasta: {
    label: "I Primi Piatti",
    sub: "L'Arte della Sfoglia",
    quote: "“Hand-rolled pasta is the heart of Italian hospitality.”"
  },
  secondi: {
    label: "I Secondi Piatti",
    sub: "I Capolavori del Fuoco",
    quote: "“Simple ingredients cooked over slow, masterly flames.”"
  },
  dolci: {
    label: "I Dolci",
    sub: "La Dolce Conclusione",
    quote: "“Life is sweet, but a perfect tiramisu makes it sweet art.”"
  },
  drinks: {
    label: "Le Bevande",
    sub: "La Cantina & I Cocktail",
    quote: "“Wine is sunlight held together by water.”"
  }
};

const SPOTLIGHT_DISHES = [
  "Burrata with Roasted Cherry Tomatoes & Pesto",
  "Spaghetti alla Carbonara",
  "Risotto alla Milanese",
  "Tiramisu"
];

const UI_LABELS = {
  en: {
    searchPlaceholder: "Search dishes...",
    vegOnly: "Veg Only",
    gridTitle: "Grid View",
    paperTitle: "Paper View",
    noDishes: "No dishes match your selected filters.",
    resetFilters: "Reset Filters",
    selection: "My Selection",
    estTotal: "Est. Total",
    clear: "Clear All",
    bookWithMenu: "Book Table with Menu",
    sommelierPairing: "Sommelier Pairing:",
    grape: "Grape",
    origin: "Origin",
    abv: "ABV",
    pour: "Pour",
    bottle: "bottle",
    glass: "glass",
    itemsCount: "items",
    allergens: "If you have questions regarding allergens, please don't hesitate to ask our staff.",
    vatNote: "*Prices in thousands of VND (e.g. 295 = 295,000 VND) · Excl. 10% VAT & 5% Service Charge.",
    bookingTitle: "Book a Table",
    bookingSub: "A pre-order summary will be attached to your reservation.",
    fullName: "Full Name",
    phone: "Phone Number",
    date: "Date",
    time: "Time",
    guests: "Guests",
    confirmBooking: "Confirm Table & Selection",
    successTitle: "Table Reserved! ✓",
    successMsg: "Your table reservation and pre-ordered selection have been recorded. We will contact you shortly to confirm your booking.",
    close: "Close",
    add: "Add",
    chefFav: "Chef's Fav",
    rec: "Recommended",
    signature: "Signature Selection"
  },
  vi: {
    searchPlaceholder: "Tìm món ăn...",
    vegOnly: "Món Chay",
    gridTitle: "Xem Lưới",
    paperTitle: "Xem Giấy",
    noDishes: "Không tìm thấy món ăn nào phù hợp với bộ lọc.",
    resetFilters: "Đặt lại bộ lọc",
    selection: "Thực đơn đã chọn",
    estTotal: "Tổng tạm tính",
    clear: "Xóa hết",
    bookWithMenu: "Đặt bàn cùng Thực đơn",
    sommelierPairing: "Gợi ý rượu vang:",
    grape: "Nho",
    origin: "Xuất xứ",
    abv: "Độ cồn",
    pour: "Ly",
    bottle: "chai",
    glass: "ly",
    itemsCount: "món",
    allergens: "Nếu Quý khách có bất kỳ câu hỏi nào về các chất gây dị ứng, xin vui lòng liên hệ nhân viên phục vụ.",
    vatNote: "*Đơn vị giá: nghìn VNĐ (ví dụ: 295 = 295.000 VNĐ) · Chưa bao gồm 10% VAT & 5% phí dịch vụ.",
    bookingTitle: "Đặt bàn",
    bookingSub: "Thực đơn Quý khách đã chọn sẽ được gửi kèm theo thông tin đặt bàn.",
    fullName: "Họ và Tên",
    phone: "Số Điện Thoại",
    date: "Ngày đặt",
    time: "Giờ đặt",
    guests: "Số khách",
    confirmBooking: "Xác nhận Đặt bàn & Thực đơn",
    successTitle: "Đặt bàn thành công! ✓",
    successMsg: "Yêu cầu đặt bàn cùng thực đơn đã chọn của Quý khách đã được ghi nhận. Chúng tôi sẽ liên hệ lại với Quý khách trong thời gian sớm nhất để xác nhận đặt bàn.",
    close: "Đóng",
    add: "Thêm",
    chefFav: "Gợi ý Bếp trưởng",
    rec: "Khuyên dùng",
    signature: "Món đặc sắc của Bếp trưởng"
  }
};

const ALLERGEN_BADGES: Record<string, { label: string; bg: string; text: string; desc: string }> = {
  "vegetarian": { label: "V", bg: "bg-green-50 text-green-700 border-green-200/50", text: "Vegetarian", desc: "Vegetarian" },
  "spicy": { label: "🌶️", bg: "bg-red-50 text-red-700 border-red-200/50", text: "Spicy", desc: "Spicy" },
  "seafood": { label: "🍤", bg: "bg-blue-50 text-blue-700 border-blue-200/50", text: "Seafood", desc: "Contains Seafood" },
  "nuts": { label: "🥜", bg: "bg-amber-50 text-amber-700 border-amber-200/50", text: "Nuts", desc: "Contains Nuts" },
  "gluten-free": { label: "GF", bg: "bg-orange-50 text-orange-700 border-orange-200/50", text: "Gluten-Free", desc: "Gluten-Free" }
};

interface MenuSceneProps {
  cart: Record<string, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  lang: "en" | "vi";
  setLang: (lang: "en" | "vi") => void;
  setShowBookingModal: (show: boolean) => void;
  updateQuantity: (name: string, diff: number) => void;
  scene: Scene;
}

function MenuScene({
  cart,
  setCart,
  lang,
  setLang,
  setShowBookingModal,
  updateQuantity,
  scene
}: MenuSceneProps) {
  const [activeTab, setActiveTab] = useState<string>("antipasti");
  const [subTab, setSubTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [vegetarianOnly, setVegetarianOnly] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "paper">("grid");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Get active section
  const section = MENU_DATA[activeTab];

  // Get all items in current section
  let items = section ? section.items : [];

  // Filter by subTab
  if (subTab !== "All") {
    items = items.filter(item => item.subCategory === subTab);
  }

  // Filter by search query
  if (searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase();
    items = items.filter(item =>
      item.name.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.subCategory && item.subCategory.toLowerCase().includes(q))
    );
  }

  // Filter by vegetarian
  if (vegetarianOnly) {
    items = items.filter(item => item.tags?.includes("vegetarian"));
  }

  // formatPrice is handled globally

  // Sub-categories list for activeTab
  const getSubCategories = () => {
    if (activeTab === "pasta") {
      return ["All", "Penne", "Rigatoni", "Spaghetti", "Tagliatelle"];
    }
    if (activeTab === "drinks") {
      return ["All", "Coffee & Tea", "Soft Drinks", "Juices", "Beer & Mocktails", "Cocktails & Spirits", "Wine Cellar"];
    }
    return [];
  };

  const subCats = getSubCategories();
  const labels = UI_LABELS[lang];

  // Cart calculations for pre-order summary and pricing
  const cartItems = Object.entries(cart).filter(([_, qty]) => qty > 0);
  const totalItemsCount = cartItems.reduce((sum, [_, qty]) => sum + qty, 0);
  const cartTotalPrice = cartItems.reduce((sum, [name, qty]) => {
    for (const sec of Object.values(MENU_DATA)) {
      const match = sec.items.find(i => i.name === name);
      if (match) {
        return sum + ((match.price || match.bottlePrice || 0) * qty);
      }
    }
    return sum;
  }, 0);
  const cartItemNamesString = cartItems.map(([name, qty]) => {
    let displayName = name;
    if (lang === "vi") {
      for (const sec of Object.values(MENU_DATA)) {
        const match = sec.items.find(i => i.name === name);
        if (match && match.nameVi) {
          displayName = match.nameVi;
          break;
        }
      }
    }
    return `${displayName} (x${qty})`;
  }).join(", ");

  return (
    <div className="h-full flex flex-col pt-8 pb-3 px-6 lg:px-10" data-scroll-zone>
      {/* HEADER SECTION */}
      {(() => {
        const catDetail = CATEGORY_DETAILS[activeTab] || { label: "Il Menu", sub: "Ristorante Felini", quote: "“A culinary journey of passion.”" };
        return (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shrink-0 border-b border-[#B48C50]/20 pb-4">
            <div>
              <p className="text-[10px] tracking-[0.22em] uppercase text-[#B48C50] font-semibold mb-1">{catDetail.sub}</p>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium text-[#2C2C2A] dark:text-[#F5F2EB]">{lang === "vi" && activeTab === "antipasti" ? "Món Khai Vị" : lang === "vi" && activeTab === "pasta" ? "Mì Ý Thủ Công" : lang === "vi" && activeTab === "secondi" ? "Món Chính" : lang === "vi" && activeTab === "dolci" ? "Món Tráng Miệng" : lang === "vi" && activeTab === "drinks" ? "Đồ Uống & Vang" : catDetail.label}</h2>
              <p className="text-xs text-[#7A7A72] dark:text-[#F5F2EB]/90 italic font-serif mt-1 max-w-xl leading-relaxed">"{section?.description}"</p>
            </div>
            <div className="hidden md:flex flex-col items-end max-w-xs text-right border-l border-[#B48C50]/20 pl-4">
              <p className="font-['Playfair_Display'] italic text-[11px] text-[#B48C50] leading-normal font-medium">{catDetail.quote}</p>
              <span className="text-[8px] tracking-[0.2em] uppercase text-[#7A7A72] dark:text-[#F5F2EB]/90/80 mt-1 block">Fellini Thảo Điền</span>
            </div>
          </div>
        );
      })()}

      {/* CONTROLS (SEARCH, SWITCHER, ETC) */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-4 shrink-0 bg-white/40 backdrop-blur-md p-3 border border-white/50 rounded-sm">
        <div className="text-[9px] tracking-widest text-[#7A7A72] dark:text-[#F5F2EB]/90 uppercase font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B48C50]" />
          {lang === "vi" && activeTab === "antipasti" ? "Khai Vị" : lang === "vi" && activeTab === "pasta" ? "Mì Ý" : lang === "vi" && activeTab === "secondi" ? "Món Chính" : lang === "vi" && activeTab === "dolci" ? "Tráng Miệng" : lang === "vi" && activeTab === "drinks" ? "Đồ Uống" : section?.title} · {items.length} {labels.itemsCount}
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Language Switcher Toggle */}
          <div className="flex items-center bg-white/60 backdrop-blur-md rounded-full border border-[rgba(44,44,42,0.12)] p-0.5 text-[9px] font-bold">
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-[#B48C50] text-white shadow-sm" : "text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("vi")}
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "vi" ? "bg-[#B48C50] text-white shadow-sm" : "text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
            >
              VI
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder={labels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-7 py-2 text-xs rounded-full border border-[rgba(44,44,42,0.12)] bg-white/60 backdrop-blur-md text-[#2C2C2A] dark:text-[#F5F2EB] placeholder-[#7A7A72]/60 focus:outline-none focus:border-[#B48C50] w-44 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A72] dark:text-[#F5F2EB]/90 opacity-60" size={11} />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"
              >
                <X size={10} />
              </button>
            )}
          </div>

          {/* Vegetarian Filter */}
          <button
            onClick={() => setVegetarianOnly(!vegetarianOnly)}
            className={`px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all
              ${vegetarianOnly
                ? "bg-[#B48C50] border-[#B48C50] text-white shadow-sm"
                : "border-[rgba(44,44,42,0.12)] bg-white/60 hover:border-[#B48C50] text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
            {labels.vegOnly}
          </button>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-white/60 backdrop-blur-md rounded-full border border-[rgba(44,44,42,0.12)] p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-full transition-all ${viewMode === "grid" ? "bg-[#B48C50] text-white" : "text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
              title={labels.gridTitle}
            >
              <Grid size={11} />
            </button>
            <button
              onClick={() => setViewMode("paper")}
              className={`p-1.5 rounded-full transition-all ${viewMode === "paper" ? "bg-[#B48C50] text-white" : "text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
              title={labels.paperTitle}
            >
              <FileText size={11} />
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY TABS (TABS BAR) */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 shrink-0 border-b border-[rgba(44,44,42,0.06)] mb-4">
        {Object.entries(MENU_DATA).map(([key, sec]) => (
          <button
            key={key}
            onClick={() => {
              setActiveTab(key);
              setSubTab("All");
            }}
            className={`px-4 py-2 text-[10px] uppercase tracking-[0.16em] font-medium whitespace-nowrap border-b-2 transition-all duration-300
              ${activeTab === key
                ? "border-[#5B1A24] text-[#5B1A24] dark:text-[#FAF8F5] font-bold"
                : "border-transparent text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* SUB-CATEGORY TABS IF APPLICABLE */}
      {subCats.length > 0 && (
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-3 shrink-0 mb-3">
          {subCats.map((sc) => (
            <button
              key={sc}
              onClick={() => setSubTab(sc)}
              className={`px-3 py-1 text-[9px] uppercase tracking-wider rounded-full border transition-all duration-200
                ${subTab === sc
                  ? "bg-[#2C2C2A] border-[#2C2C2A] text-white"
                  : "border-[rgba(44,44,42,0.08)] dark:border-white/10 bg-white/40 text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:border-[rgba(44,44,42,0.2)] dark:border-white/20 hover:text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
            >
              {sc}
            </button>
          ))}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto overscroll-contain pr-1 pb-24 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key={`${activeTab}-${subTab}-grid`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {items.length === 0 ? (
                <div className="col-span-full text-center py-16 text-[#7A7A72] dark:text-[#F5F2EB]/90 text-xs font-medium">
                  <p className="mb-4">{labels.noDishes}</p>
                  <button
                    onClick={() => { setSearchQuery(""); setVegetarianOnly(false); setSubTab("All"); }}
                    className="px-5 py-2 text-[10px] uppercase tracking-wider bg-[#B48C50] text-[#FAF9F6] font-semibold rounded-sm hover:opacity-88 transition-opacity shadow-sm"
                  >
                    {labels.resetFilters}
                  </button>
                </div>
              ) : (
                items.map((item, idx) => {
                  const quantity = cart[item.name] || 0;
                  const isRecommend = item.tags?.includes("chef-recommendation");
                  const isFavStyle = item.tags?.includes("chef-favorite");
                  const pairing = WINE_PAIRINGS[item.name];
                  const isSpotlight = SPOTLIGHT_DISHES.includes(item.name) && searchQuery === "" && subTab === "All";

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: idx * 0.02, duration: 0.45, type: "spring", stiffness: 60 }}
                      className={`group p-6 flex flex-col transition-all duration-500 relative overflow-hidden rounded-sm border-double border-2 shadow-xl
                        ${isSpotlight
                          ? "md:col-span-2 bg-gradient-to-br from-[#5B1A24] via-[#6a1f2b] to-[#5B1A24] border-[#D4AF37]/60 dark:bg-gradient-to-br dark:from-[#FAF8F5] dark:via-[#F3EFE6] dark:to-[#FAF8F5] dark:border-[#B48C50]/60"
                          : isRecommend
                            ? "bg-white dark:bg-[#4A151D] border-[#B48C50]/30 dark:border-[#D4AF37]/30 border-l-[3px] border-l-[#B48C50] dark:border-l-[#D4AF37]/65"
                            : "bg-white dark:bg-[#4A151D] border-[rgba(44,44,42,0.12)] dark:border-white/10 border-l-[3px] border-l-transparent"}`}
                      whileHover={{
                        y: -4,
                        borderLeftColor: "#B48C50",
                        borderColor: isSpotlight ? "rgba(180, 140, 80, 0.9)" : "rgba(180, 140, 80, 0.4)",
                        boxShadow: "0 14px 35px rgba(180,140,80,0.12)"
                      }}
                    >
                      {isSpotlight && (
                        <div className="absolute top-0 right-0 bg-[#B48C50] text-[#FAF9F6] text-[8px] uppercase tracking-widest font-bold px-3 py-1 rounded-bl-sm flex items-center gap-1 shadow-sm font-sans z-10">
                          <ChefHat size={9} /> {labels.signature}
                        </div>
                      )}

                      {isRecommend && !isSpotlight && (
                        <div className="absolute top-0 right-0 bg-[#5B1A24] dark:bg-[#FAF8F5] text-white text-[8px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-bl-sm flex items-center gap-1 shadow-sm z-10">
                          <Star size={7} className="fill-white" /> {labels.rec}
                        </div>
                      )}

                      <div className="flex justify-between items-start gap-3 mb-2 pr-12">
                        <h4 className={`font-['Playfair_Display'] text-[17px] transition-colors leading-tight font-semibold tracking-wide [text-shadow:_0_1px_8px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.6)] ${isSpotlight ? 'text-[#D4AF37] dark:text-[#5B1A24]' : 'text-[#2C2C2A] dark:text-[#D4AF37]'}`}>
                          {lang === "vi" && item.nameVi ? item.nameVi : item.name}

                          {/* Allergen & Dietary Badges */}
                          <span className="inline-flex gap-1.5 ml-2 items-center">
                            {item.tags?.map(t => {
                              const badge = ALLERGEN_BADGES[t];
                              if (!badge) return null;
                              return (
                                <span
                                  key={t}
                                  className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded-full border text-[8px] font-bold ${badge.bg}`}
                                  title={lang === "vi" ? badge.desc === "Vegetarian" ? "Chay" : badge.desc === "Spicy" ? "Cay" : badge.desc === "Contains Seafood" ? "Có Hải sản" : badge.desc === "Contains Nuts" ? "Có Hạt" : "Không chứa Gluten" : badge.desc}
                                >
                                  {badge.label}
                                </span>
                              );
                            })}
                          </span>

                          {isFavStyle && (
                            <span
                              className="ml-1.5 inline-flex items-center gap-0.5 text-[8px] text-[#B48C50] font-medium tracking-wide uppercase"
                            >
                              ★ {labels.chefFav}
                            </span>
                          )}
                        </h4>
                      </div>

                      {item.description && (
                        <p className={`font-['Plus_Jakarta_Sans'] leading-relaxed flex-1 mb-4 ${isSpotlight ? `text-xs ${lang === 'en' ? 'italic' : ''}` : "text-[11px]"} ${isSpotlight ? 'text-[#F5F2EB]/90 dark:text-[#7A7A72]' : 'text-[#7A7A72] dark:text-[#F5F2EB]/90'}`}>
                          {lang === "vi" && item.descriptionVi ? item.descriptionVi : item.description}
                        </p>
                      )}

                      {/* Wine Details */}
                      {item.details && (
                        <div className="mt-1 mb-3 grid grid-cols-2 gap-x-2 gap-y-1 bg-[#F0EDE8]/40 p-2 rounded text-[10px] text-[#7A7A72] dark:text-[#F5F2EB]/90 border border-[#2C2C2A]/5 font-mono">
                          {item.details.grape && <div><span className="opacity-60">{labels.grape}:</span> {item.details.grape}</div>}
                          {item.details.region && <div><span className="opacity-60">{labels.origin}:</span> {item.details.region}</div>}
                          {item.details.alcohol && <div><span className="opacity-60">{labels.abv}:</span> {item.details.alcohol}</div>}
                          {item.details.volume && <div><span className="opacity-60">{labels.pour}:</span> {item.details.volume}</div>}
                        </div>
                      )}

                      {/* Sommelier's Wine Pairing */}
                      {pairing && (
                        <div className={`mt-1 mb-4 flex items-center gap-1.5 border border-[#B48C50]/20 rounded-sm px-2.5 py-1.5 bg-[#B48C50]/5
                          ${isSpotlight ? "text-[10px] text-[#8C6227] dark:text-[#5B1A24]" : "text-[9.5px] text-[#B48C50]"}`}>
                          <Wine size={11} className="text-[#B48C50] shrink-0" />
                          <span className={`font-['Plus_Jakarta_Sans'] ${lang === 'en' ? 'italic' : ''}`}>
                            <strong>{labels.sommelierPairing} </strong>
                            {pairing}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(44,44,42,0.06)]">
                        <div className="flex flex-col">
                          {item.price && (
                            <span className={`font-['Playfair_Display'] text-[17px] leading-none font-bold tracking-wide [text-shadow:_0_1px_8px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.6)] ${isSpotlight ? 'text-[#FAF8F5] dark:text-[#5B1A24]' : 'text-[#2C2C2A] dark:text-[#D4AF37]'}`}>
                              {formatPrice(item.price)}
                              {item.bottlePrice && <span className={`text-[10px] font-sans font-normal ml-1 ${isSpotlight ? 'text-[#FAF8F5]/80 dark:text-[#7A7A72]' : 'text-[#7A7A72] dark:text-[#F5F2EB]'}`}>/ {labels.glass}</span>}
                            </span>
                          )}
                          {item.bottlePrice && (
                            <span className={`font-['Playfair_Display'] text-[14px] leading-none mt-1.5 font-semibold tracking-wide [text-shadow:_0_1px_8px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.6)] ${isSpotlight ? 'text-[#FAF8F5] dark:text-[#5B1A24]' : 'text-[#2C2C2A] dark:text-[#D4AF37]'}`}>
                              {formatPrice(item.bottlePrice)}
                              <span className={`text-[9px] font-sans font-normal ml-1 ${isSpotlight ? 'text-[#FAF8F5]/80 dark:text-[#7A7A72]' : 'text-[#7A7A72] dark:text-[#F5F2EB]'}`}>/ {labels.bottle}</span>
                            </span>
                          )}
                        </div>

                        {/* Elegant quantity adjustment counter */}
                        {quantity > 0 ? (
                          <div className={`flex items-center border rounded-full p-0.5 shadow-sm transition-colors duration-500 ${isSpotlight ? 'bg-transparent border-[#D4AF37]/40 dark:bg-white dark:border-[#B48C50]' : 'bg-white dark:bg-[#5B1A24] border-[#B48C50]'}`}>
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors font-bold text-xs ${isSpotlight ? 'text-[#D4AF37] hover:bg-[#D4AF37]/20 dark:text-[#B48C50] dark:hover:bg-[#B48C50]/10' : 'text-[#B48C50] hover:bg-[#B48C50]/10'}`}
                            >
                              <Minus size={9} />
                            </button>
                            <span className={`px-2 text-xs font-semibold min-w-[12px] text-center ${isSpotlight ? 'text-white dark:text-[#2C2C2A]' : 'text-[#2C2C2A] dark:text-[#F5F2EB]'}`}>{quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
                              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors font-bold text-xs ${isSpotlight ? 'text-[#D4AF37] hover:bg-[#D4AF37]/20 dark:text-[#B48C50] dark:hover:bg-[#B48C50]/10' : 'text-[#B48C50] hover:bg-[#B48C50]/10'}`}
                            >
                              <Plus size={9} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => updateQuantity(item.name, 1)}
                            className={`px-3 py-1.5 rounded-full border transition-all text-[10px] uppercase font-semibold flex items-center gap-1 ${isSpotlight ? 'border-[#D4AF37]/30 bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white hover:border-[#D4AF37] dark:border-[#5B1A24]/30 dark:text-[#5B1A24] dark:hover:bg-[#5B1A24] dark:hover:text-white dark:hover:border-[#5B1A24]' : 'border-[rgba(44,44,42,0.12)] bg-white/50 text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:border-[#B48C50] hover:text-[#B48C50] hover:bg-white dark:bg-[#5B1A24] transition-colors duration-500'}`}
                          >
                            <Plus size={9} /> {labels.add}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`${activeTab}-${subTab}-paper`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
              className="flex justify-center py-4 px-2"
            >
              {/* WOOD CLIPBOARD FRAME */}
              <div
                className="w-full max-w-2xl relative shadow-2xl overflow-hidden rounded-md border-t-[10px] border-b-[10px] border-[#29170e]"
                style={{
                  background: "linear-gradient(135deg, #4A3326 0%, #2B1810 100%)",
                  boxShadow: "0 30px 65px rgba(0, 0, 0, 0.55)",
                  padding: "50px 32px 32px 32px"
                }}
              >
                {/* METALLIC BRASS CLIP CLAMP AT THE TOP */}
                <div
                  className="absolute top-2.5 left-1/2 -translate-x-1/2 w-48 h-8 rounded-sm shadow-lg z-10 border border-[#dfba73]/30 flex items-center justify-center"
                  style={{
                    background: "linear-gradient(to bottom, #dfba73 0%, #a27c32 100%)",
                  }}
                >
                  <div className="w-20 h-1 bg-zinc-950/40 rounded-full opacity-40" />
                  <div className="absolute -bottom-1 left-4 w-2.5 h-2.5 rounded-full bg-[#8d671b] border border-[#dfba73]/30 shadow-inner" />
                  <div className="absolute -bottom-1 right-4 w-2.5 h-2.5 rounded-full bg-[#8d671b] border border-[#dfba73]/30 shadow-inner" />
                </div>

                {/* PAPER PAGE CONTENT WITH DOUBLE BORDER TRIM */}
                <div
                  className="w-full min-h-[680px] p-8 md:p-14 relative flex flex-col border-[3px] border-double border-[#B48C50]/30 dark:border-[#D4AF37]/30 bg-[#FAF9F6] dark:bg-[#4A151D] transition-colors duration-500"
                  style={{
                    boxShadow: "inset 0 0 45px rgba(0,0,0,0.06), 0 5px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  {/* Fellini Small Logo */}
                  <div className="flex flex-col items-center mb-10 text-center shrink-0">
                    <span className="font-['Playfair_Display'] text-[#B48C50] text-2xl tracking-[0.22em] font-semibold leading-none">
                      Fellini
                    </span>
                    <span className="block text-[8px] tracking-[0.32em] uppercase text-[#7A7A72] dark:text-[#F5F2EB]/90 mt-1.5">
                      • THAO DIEN •
                    </span>
                    <span className="block text-[7px] tracking-[0.2em] uppercase text-[#7A7A72] dark:text-[#F5F2EB]/90 mt-1 font-medium">
                      LA CUCINA ITALIANA
                    </span>
                    {/* Decorative gold diamond scroll */}
                    <div className="flex items-center gap-1.5 mt-3.5 opacity-65">
                      <div className="w-6 h-[0.5px] bg-[#B48C50]" />
                      <span className="text-[8px] text-[#B48C50]">✧</span>
                      <div className="w-6 h-[0.5px] bg-[#B48C50]" />
                    </div>
                  </div>

                  {/* Section Title */}
                  <div className="mb-8 text-center shrink-0">
                    <h3 className="font-['Playfair_Display'] italic text-[#5c4033] text-xl font-medium">
                      {section.title} {subTab !== "All" ? `- ${subTab}` : ""}
                    </h3>
                    <p className="text-[10px] text-[#7A7A72] dark:text-[#F5F2EB]/90 italic font-serif mt-1 max-w-sm mx-auto">
                      "{section.description}"
                    </p>
                  </div>

                  {/* PAPER LIST ITEMS */}
                  <div className="flex flex-col gap-6 flex-1 justify-start">
                    {items.length === 0 ? (
                      <div className={`text-center py-16 text-[#7A7A72] dark:text-[#F5F2EB]/90 text-xs font-serif ${lang === 'en' ? 'italic' : ''}`}>
                        {labels.noDishes}
                      </div>
                    ) : (
                      items.map((item) => {
                        const quantity = cart[item.name] || 0;
                        const isFavStyle = item.tags?.includes("chef-favorite");
                        const pairing = WINE_PAIRINGS[item.name];

                        return (
                          <div key={item.name} className="flex flex-col relative group pb-2 border-b border-[#5c4033]/5 last:border-0 last:pb-0">
                            {/* Dotted separator layout */}
                            <div className="flex justify-between items-baseline gap-2 mb-1">
                              <h4 className="font-['Playfair_Display'] font-semibold text-[#2C2C2A] dark:text-[#D4AF37] text-sm md:text-[16px] tracking-wide flex items-center gap-1.5 flex-wrap group-hover:text-[#FDE08D] transition-colors [text-shadow:_0_1px_8px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
                                {lang === "vi" && item.nameVi ? item.nameVi : item.name}

                                {/* Allergen & Dietary Badges */}
                                <span className="inline-flex gap-1 ml-1.5 items-center">
                                  {item.tags?.map(t => {
                                    const badge = ALLERGEN_BADGES[t];
                                    if (!badge) return null;
                                    return (
                                      <span
                                        key={t}
                                        className={`inline-flex items-center justify-center w-3 h-3 rounded-full border text-[7px] font-bold ${badge.bg}`}
                                        title={lang === "vi" ? badge.desc === "Vegetarian" ? "Chay" : badge.desc === "Spicy" ? "Cay" : badge.desc === "Contains Seafood" ? "Có Hải sản" : badge.desc === "Contains Nuts" ? "Có Hạt" : "Không chứa Gluten" : badge.desc}
                                      >
                                        {badge.label}
                                      </span>
                                    );
                                  })}
                                </span>

                                {isFavStyle && (
                                  <span className="text-[7px] text-[#B48C50] font-medium tracking-wide uppercase">
                                    ★ {labels.chefFav}
                                  </span>
                                )}
                              </h4>

                              {/* Dotted filler line */}
                              <div className="flex-1 border-b border-dotted border-[#B48C50]/25 mx-2" />

                              {/* Price & Quantity Selector */}
                              <div className="flex flex-col items-end text-[#2C2C2A] dark:text-[#D4AF37] font-['Playfair_Display'] font-bold tracking-wide text-[13px] md:text-[15px] shrink-0 [text-shadow:_0_1px_8px_rgba(0,0,0,0.1)] dark:[text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
                                {item.price && (
                                  <span>
                                    {formatPrice(item.price)}
                                    {item.bottlePrice && <span className="text-[8px] font-sans font-normal ml-0.5">/{labels.glass.substring(0, 2)}</span>}
                                  </span>
                                )}
                                {item.bottlePrice && (
                                  <span className="text-[10px] opacity-80 font-medium">
                                    {formatPrice(item.bottlePrice)}
                                    <span className="text-[8px] font-sans font-normal ml-0.5">/{labels.bottle.substring(0, 2)}</span>
                                  </span>
                                )}

                                {/* Elegant inline quantity selector for paper view */}
                                <div className="mt-1">
                                  {quantity > 0 ? (
                                    <div className="flex items-center bg-[#FAF9F6] border border-[#B48C50]/65 rounded-full p-0.5 shadow-sm">
                                      <button
                                        onClick={() => updateQuantity(item.name, -1)}
                                        className="w-4 h-4 rounded-full flex items-center justify-center text-[#B48C50] hover:bg-[#B48C50]/10 transition-colors font-bold"
                                      >
                                        <Minus size={8} />
                                      </button>
                                      <span className="px-1.5 text-[9px] font-sans font-bold text-[#2C2C2A] dark:text-[#F5F2EB] min-w-[10px] text-center">{quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.name, 1)}
                                        className="w-4 h-4 rounded-full flex items-center justify-center text-[#B48C50] hover:bg-[#B48C50]/10 transition-colors font-bold"
                                      >
                                        <Plus size={8} />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => updateQuantity(item.name, 1)}
                                      className="px-2 py-0.5 rounded-full border border-[#B48C50]/35 bg-transparent text-[#B48C50] hover:bg-[#B48C50]/15 hover:border-[#B48C50] transition-all text-[8px] uppercase font-semibold flex items-center gap-0.5 font-sans"
                                    >
                                      <Plus size={7} /> {labels.add}
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Description */}
                            {item.description && (
                              <p className={`text-[#7A7A72] dark:text-[#F5F2EB]/90 font-['Plus_Jakarta_Sans'] text-[11px] leading-relaxed pr-10 ${lang === 'en' ? 'italic' : ''}`}>
                                {lang === "vi" && item.descriptionVi ? item.descriptionVi : item.description}
                              </p>
                            )}

                            {/* Wine details */}
                            {item.details && (
                              <p className="text-[9px] text-[#7A7A72] dark:text-[#F5F2EB]/90/85 font-mono mt-0.5">
                                {[
                                  item.details.grape && `${labels.grape}: ${item.details.grape}`,
                                  item.details.region && `${labels.origin}: ${item.details.region}`,
                                  item.details.alcohol && `${labels.abv}: ${item.details.alcohol}`,
                                  item.details.volume && `${labels.pour}: ${item.details.volume}`
                                ].filter(Boolean).join("  ·  ")}
                              </p>
                            )}

                            {/* Sommelier's Wine Pairing */}
                            {pairing && (
                              <p className={`text-[9.5px] text-[#B48C50] font-['Plus_Jakarta_Sans'] mt-1 flex items-center gap-1 ${lang === 'en' ? 'italic' : ''}`}>
                                <Wine size={9} className="opacity-80 shrink-0" />
                                <span>{labels.sommelierPairing} {pairing}</span>
                              </p>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footnote */}
                  <div className="mt-14 pt-6 border-t border-[#5c4033]/15 text-center flex flex-col items-center justify-center gap-1 shrink-0 font-serif">
                    <span className="text-[10px] text-[#B48C50] font-semibold italic">Buon Appetito</span>
                    <p className="text-[9px] text-[#7A7A72] dark:text-[#F5F2EB]/90/80 italic max-w-md">
                      {labels.allergens}
                    </p>
                    <p className="text-[8px] text-[#7A7A72] dark:text-[#F5F2EB]/90/50 mt-1 font-mono">
                      {labels.vatNote}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FLOAT SELECTOR SUMMARY BAR */}
      {totalItemsCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-16 left-6 right-6 z-50 flex items-center justify-between p-4 bg-[#2C2C2A]/95 text-white shadow-2xl border border-white/10 rounded-lg backdrop-blur-xl animate-fade-in transition-all duration-500 ${scene === 0 ? "lg:right-[390px]" : "lg:right-6"
            }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#5B1A24] dark:bg-[#FAF8F5] flex items-center justify-center font-bold text-xs text-white">
              {totalItemsCount}
            </div>
            <div className="max-w-xs md:max-w-md">
              <p className="text-[10px] tracking-wider uppercase text-white/50">{labels.selection}</p>
              <p className="text-xs font-medium truncate text-white/90">
                {cartItemNamesString}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-wider text-white/40">{labels.estTotal}</p>
              <p className="font-['Playfair_Display'] text-base text-[#5B1A24] dark:text-[#FAF8F5] font-bold">
                {formatPrice(cartTotalPrice)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCart({})}
                className="text-[9px] tracking-widest uppercase font-semibold text-white/60 hover:text-white border border-white/20 hover:border-white px-2.5 py-1.5 transition-colors"
              >
                {labels.clear}
              </button>
              <button
                onClick={() => setShowBookingModal(true)}
                className="px-4 py-2 bg-[#B48C50] text-[#FAF9F6] font-semibold text-[10px] tracking-widest uppercase hover:bg-[#a27c32] transition-colors rounded-sm shadow-md"
              >
                {labels.bookWithMenu}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

interface ReservationModalProps {
  lang: "en" | "vi";
  showBookingModal: boolean;
  setShowBookingModal: (show: boolean) => void;
  bookingName: string;
  setBookingName: (name: string) => void;
  bookingPhone: string;
  setBookingPhone: (phone: string) => void;
  bookingDate: string;
  setBookingDate: (date: string) => void;
  bookingTime: string;
  setBookingTime: (time: string) => void;
  bookingGuests: number;
  setBookingGuests: (guests: number) => void;
  bookingSuccess: boolean;
  setBookingSuccess: (success: boolean) => void;
  bookingNote: string;
  setBookingNote: (note: string) => void;
  cart: Record<string, number>;
  setCart: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}

function ReservationModal({
  lang,
  showBookingModal,
  setShowBookingModal,
  bookingName,
  setBookingName,
  bookingPhone,
  setBookingPhone,
  bookingDate,
  setBookingDate,
  bookingTime,
  setBookingTime,
  bookingGuests,
  setBookingGuests,
  bookingSuccess,
  setBookingSuccess,
  bookingNote,
  setBookingNote,
  cart,
  setCart
}: ReservationModalProps) {
  const labels = UI_LABELS[lang];
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingLoading, setBookingLoading] = useState<boolean>(false);
  const isVi = lang === "vi";

  // Custom Dropdown Open States
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);

  // Custom Date Picker States (Synced with bookingDate prop)
  const [selectedDay, setSelectedDay] = useState("21");
  const [selectedMonth, setSelectedMonth] = useState("6");

  const MONTHS = isVi
    ? ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"]
    : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Sync date selection states from bookingDate parent prop (e.g. from events pre-fill)
  useEffect(() => {
    if (bookingDate && bookingDate.includes("-")) {
      const parts = bookingDate.split("-");
      if (parts.length === 3) {
        setSelectedDay(String(parseInt(parts[2])));
        setSelectedMonth(String(parseInt(parts[1])));
      }
    }
  }, [bookingDate]);

  const handleDateChange = (newDay: string, newMonth: string) => {
    setSelectedDay(newDay);
    setSelectedMonth(newMonth);
    const currentYear = new Date().getFullYear();
    const paddedMonth = newMonth.padStart(2, "0");
    const paddedDay = newDay.padStart(2, "0");
    setBookingDate(`${currentYear}-${paddedMonth}-${paddedDay}`);
  };

  const handleUpdateQty = (name: string, diff: number) => {
    setCart(prev => {
      const next = { ...prev };
      const currentQty = next[name] || 0;
      const newQty = currentQty + diff;
      if (newQty <= 0) {
        delete next[name];
      } else {
        next[name] = newQty;
      }
      return next;
    });
  };

  const cartItems = Object.entries(cart).filter(([_, qty]) => qty > 0);

  const cartTotalPrice = cartItems.reduce((sum, [name, qty]) => {
    for (const sec of Object.values(MENU_DATA)) {
      const match = sec.items.find(i => i.name === name);
      if (match) {
        return sum + ((match.price || match.bottlePrice || 0) * qty);
      }
    }
    return sum;
  }, 0);

  // formatPrice is handled globally

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingLoading) return;
    if (!bookingName.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập Họ và Tên!" : "Please enter your Full Name!");
      return;
    }
    if (!bookingPhone.trim()) {
      setErrorMsg(isVi ? "Vui lòng nhập Số điện thoại!" : "Please enter your Phone number!");
      return;
    }
    if (!bookingDate) {
      setErrorMsg(isVi ? "Vui lòng chọn Ngày đặt bàn!" : "Please select your reservation Date!");
      return;
    }
    setErrorMsg("");
    setBookingLoading(true);
    setTimeout(() => {
      setBookingLoading(false);
      setBookingSuccess(true);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (!bookingSuccess) setShowBookingModal(false);
            }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 border border-[#B48C50]/30 shadow-2xl p-6 md:p-8 rounded-md overflow-y-auto overscroll-contain max-h-[90vh] scrollbar-none z-10"
            style={{ scrollbarWidth: "none" }}
          >
            {bookingSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 z-20 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#5B1A24] dark:bg-[#FAF8F5]/15 text-[#5B1A24] dark:text-[#FAF8F5] flex items-center justify-center text-3xl mb-4 font-sans font-bold">
                  ✓
                </div>
                <h3 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#F5F2EB] text-2xl font-bold mb-2">
                  {labels.successTitle}
                </h3>
                <p className="text-xs text-[#7A7A72] dark:text-[#F5F2EB]/90 leading-relaxed max-w-sm mb-6 font-serif">
                  {labels.successMsg}
                </p>
                <button
                  onClick={() => {
                    setBookingSuccess(false);
                    setShowBookingModal(false);
                    setCart({});
                    setBookingName("");
                    setBookingPhone("");
                    setBookingDate("");
                    setBookingNote("");
                  }}
                  className="px-6 py-2.5 bg-[#2C2C2A] text-white text-[10px] tracking-widest uppercase font-semibold hover:bg-black transition-colors rounded-sm"
                >
                  {labels.close}
                </button>
              </motion.div>
            )}

            <div className="flex justify-between items-start mb-5">
              <div>
                <h3 className="font-['Playfair_Display'] text-2xl text-[#2C2C2A] dark:text-[#F5F2EB] font-bold">
                  {labels.bookingTitle}
                </h3>
                <p className="text-[10px] text-[#7A7A72] dark:text-[#F5F2EB]/90 tracking-wide uppercase mt-0.5">
                  {labels.bookingSub}
                </p>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB] p-1 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Custom Warning Alert Banner */}
            <AnimatePresence>
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-sm flex items-start gap-2.5 overflow-hidden mb-4"
                >
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed font-serif font-medium">{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                    {labels.fullName} *
                  </label>
                  <input
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder={isVi ? "Ví dụ: Nguyễn Văn An" : "e.g., Alexander Mercer"}
                    className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                    {labels.phone} *
                  </label>
                  <input
                    type="tel"
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder={isVi ? "Ví dụ: 0901 234 567" : "e.g., +84 907 123 456"}
                    className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB]"
                  />
                </div>

                {/* Custom Date Pickers */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                    {labels.date} *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {/* Day selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDayOpen(!isDayOpen)}
                        className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                      >
                        <span>{isVi ? `Ngày ${selectedDay}` : `Day ${selectedDay}`}</span>
                        <span className="text-[8px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                      </button>
                      {isDayOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsDayOpen(false)} />
                          <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-40 overflow-y-auto overscroll-contain rounded-sm">
                            {Array.from({ length: 31 }, (_, i) => String(i + 1)).map(d => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  handleDateChange(d, selectedMonth);
                                  setIsDayOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs hover:bg-[#B48C50]/10 transition-colors ${selectedDay === d ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                              >
                                {isVi ? `Ngày ${d}` : `Day ${d}`}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Month selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsMonthOpen(!isMonthOpen)}
                        className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                      >
                        <span className="truncate">{MONTHS[Number(selectedMonth) - 1]}</span>
                        <span className="text-[8px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                      </button>
                      {isMonthOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsMonthOpen(false)} />
                          <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-40 overflow-y-auto overscroll-contain rounded-sm">
                            {MONTHS.map((m, idx) => (
                              <button
                                key={m}
                                type="button"
                                onClick={() => {
                                  handleDateChange(selectedDay, String(idx + 1));
                                  setIsMonthOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-xs hover:bg-[#B48C50]/10 transition-colors ${selectedMonth === String(idx + 1) ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* Custom Time Selector */}
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                      {labels.time}
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsTimeOpen(!isTimeOpen)}
                      className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                    >
                      <span>{bookingTime}</span>
                      <span className="text-[8px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                    </button>
                    {isTimeOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsTimeOpen(false)} />
                        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-40 overflow-y-auto overscroll-contain rounded-sm">
                          {["11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"].map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => {
                                setBookingTime(t);
                                setIsTimeOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#B48C50]/10 transition-colors ${bookingTime === t ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Custom Guests Selector */}
                  <div className="relative">
                    <label className="block text-[10px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                      {labels.guests}
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                      className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] text-left flex justify-between items-center"
                    >
                      <span>{bookingGuests} {bookingGuests === 1 ? (isVi ? "Khách" : "Guest") : (isVi ? "Khách" : "Guests")}</span>
                      <span className="text-[8px] text-[#7A7A72] dark:text-[#F5F2EB]/90">&#9660;</span>
                    </button>
                    {isGuestsOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsGuestsOpen(false)} />
                        <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-[#5B1A24] transition-colors duration-500 border border-[#B48C50]/20 shadow-lg z-50 max-h-40 overflow-y-auto overscroll-contain rounded-sm">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map(n => (
                            <button
                              key={n}
                              type="button"
                              onClick={() => {
                                setBookingGuests(n);
                                setIsGuestsOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#B48C50]/10 transition-colors ${bookingGuests === n ? "bg-[#B48C50]/5 text-[#B48C50] font-bold" : "text-[#2C2C2A] dark:text-[#F5F2EB]"}`}
                            >
                              {n} {n === 1 ? (isVi ? "Khách" : "Guest") : (isVi ? "Khách" : "Guests")}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#7A7A72] dark:text-[#F5F2EB]/90 font-semibold mb-1">
                  {lang === "vi" ? "Yêu cầu đặc biệt (Không gian / Dịp kỷ niệm)" : "Special Requests (Space / Occasion)"}
                </label>
                <textarea
                  value={bookingNote}
                  onChange={(e) => setBookingNote(e.target.value)}
                  placeholder={lang === "vi" ? "Ví dụ: Yêu cầu bàn gần cửa sổ, setup nến hẹn hò lãng mạn..." : "e.g., Table near window, romantic candlelit setup..."}
                  rows={2}
                  className="w-full px-3 py-2 text-xs border border-[rgba(44,44,42,0.15)] rounded-sm bg-white dark:bg-[#5B1A24] transition-colors duration-500 focus:outline-none focus:border-[#B48C50] text-[#2C2C2A] dark:text-[#F5F2EB] resize-none"
                />
              </div>

              {/* Editable Pre-order Summary List */}
              {cartItems.length > 0 && (
                <div className="border border-[#B48C50]/20 rounded-sm bg-[#FAF8F5] dark:bg-[#5B1A24] dark:bg-[#FAF8F5]/80 p-4 space-y-3">
                  <p className="text-[10px] uppercase tracking-widest text-[#B48C50] font-bold border-b border-[#B48C50]/15 pb-1">
                    {lang === "vi" ? "Chi tiết thực đơn pre-order" : "Pre-order Menu Summary"}
                  </p>
                  <div className="max-h-[140px] overflow-y-auto overscroll-contain space-y-2 pr-1 scrollbar-hide text-xs text-[#2C2C2A] dark:text-[#F5F2EB]" style={{ scrollbarWidth: "none" }}>
                    {cartItems.map(([name, qty]) => {
                      let itemPrice = 0;
                      let displayName = name;
                      for (const sec of Object.values(MENU_DATA)) {
                        const match = sec.items.find(i => i.name === name);
                        if (match) {
                          itemPrice = match.price || match.bottlePrice || 0;
                          if (lang === "vi" && match.nameVi) {
                            displayName = match.nameVi;
                          }
                          break;
                        }
                      }
                      return (
                        <div key={name} className="flex justify-between items-center text-xs bg-white/40 p-1.5 rounded-sm border border-black/5">
                          <span className="truncate pr-4 font-medium max-w-[50%]">{displayName}</span>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-[rgba(44,44,42,0.12)] bg-white dark:bg-[#5B1A24] transition-colors duration-500 rounded-sm">
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(name, -1)}
                                className="px-1.5 py-0.5 text-[10px] hover:bg-black/5 font-bold transition-colors"
                              >
                                -
                              </button>
                              <span className="px-1.5 text-[10px] font-bold text-[#B48C50]">{qty}</span>
                              <button
                                type="button"
                                onClick={() => handleUpdateQty(name, 1)}
                                className="px-1.5 py-0.5 text-[10px] hover:bg-black/5 font-bold transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-mono text-[#7A7A72] dark:text-[#F5F2EB]/90 text-[10px] font-medium w-16 text-right">{formatPrice(itemPrice * qty)}</span>
                            <button
                              type="button"
                              onClick={() => handleUpdateQty(name, -qty)}
                              className="text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-red-600 transition-colors p-1"
                              title={isVi ? "Xóa món" : "Delete item"}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-[#B48C50]/15 pt-2 flex justify-between items-baseline">
                    <span className="text-xs uppercase tracking-wider text-[#2C2C2A] dark:text-[#F5F2EB]/70 font-semibold">{labels.estTotal}</span>
                    <span className="font-['Playfair_Display'] text-[#B48C50] text-lg font-bold">
                      {formatPrice(cartTotalPrice)}
                    </span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={bookingLoading}
                className={`w-full py-3 bg-[#B48C50] text-[#FAF9F6] text-[10px] tracking-widest uppercase font-bold hover:bg-[#a27c32] transition-all rounded-sm shadow-md flex items-center justify-center gap-2 ${bookingLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {bookingLoading ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{lang === "vi" ? "ĐANG XỬ LÝ..." : "PROCESSING..."}</span>
                  </>
                ) : (
                  labels.confirmBooking
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [scene, setScene] = useState<Scene>(0);
  const sceneRef = useRef<Scene>(0);
  sceneRef.current = scene;

  // Hoisted state hooks
  const [cart, setCart] = useState<Record<string, number>>(() => {
    try {
      const stored = localStorage.getItem("fellini_cart");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [lang, setLang] = useState<"en" | "vi">(() => {
    try {
      const stored = localStorage.getItem("fellini_lang");
      return (stored as "en" | "vi") || "en";
    } catch {
      return "en";
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("fellini_theme");
      if (stored) return stored === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("fellini_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("fellini_theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("fellini_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("fellini_lang", lang);
  }, [lang]);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("19:00");
  const [bookingGuests, setBookingGuests] = useState<number>(2);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingNote, setBookingNote] = useState<string>("");
  const [activeMoodIdx, setActiveMoodIdx] = useState<number>(0);
  const [bgSlide, setBgSlide] = useState<number>(0);

  const handleMoodSelect = (moodLabel: string) => {
    const selectedMood = MOODS.find(m => m.label === moodLabel);
    if (selectedMood) {
      setBookingGuests(selectedMood.guests);
      setBookingTime(selectedMood.time);
      const noteText = lang === "vi"
        ? `Yêu cầu không gian: ${selectedMood.labelVi}`
        : `Requested Occasion/Space: ${selectedMood.label}`;
      setBookingNote(noteText);
      setShowBookingModal(true);
    }
  };

  const handleEventSelect = (eventTitle: string, dateObj: Date) => {
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    setBookingDate(`${yyyy}-${mm}-${dd}`);

    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    setBookingTime(`${hours}:${minutes}`);

    const noteText = lang === "vi"
      ? `Đặt chỗ sự kiện: ${eventTitle}`
      : `Event Reservation: ${eventTitle}`;
    setBookingNote(noteText);
    setShowBookingModal(true);
  };

  // Mobile drawer story overlay state
  const [showMobileStory, setShowMobileStory] = useState<boolean>(false);

  // Update quantity handler
  const updateQuantity = (name: string, diff: number) => {
    setCart(prev => {
      const next = { ...prev };
      const currentVal = next[name] || 0;
      const newVal = currentVal + diff;
      if (newVal <= 0) {
        delete next[name];
      } else {
        next[name] = newVal;
      }
      return next;
    });
  };

  // Mouse parallax (updates CSS variables natively via requestAnimationFrame to avoid high-frequency React re-renders and layout thrashing)
  useEffect(() => {
    let activeFrame: number | null = null;
    const handler = (e: MouseEvent) => {
      if (activeFrame !== null) return;
      activeFrame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        const root = document.documentElement;
        root.style.setProperty("--bg-x", `${x * 18}px`);
        root.style.setProperty("--bg-y", `${y * 10}px`);
        root.style.setProperty("--card-x", `${x * 7}px`);
        root.style.setProperty("--card-y", `${y * 5}px`);
        activeFrame = null;
      });
    };
    window.addEventListener("mousemove", handler);
    return () => {
      window.removeEventListener("mousemove", handler);
      if (activeFrame !== null) cancelAnimationFrame(activeFrame);
    };
  }, []);

  // Keyboard navigation (Only active on non-scrollable landing pages)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      if (sceneRef.current !== 0 && sceneRef.current !== 1) return; // Disallow keyboard page jumps on scrollable pages

      const order = [0, 3, 1, 2, 4, 5] as Scene[];
      const idx = order.indexOf(sceneRef.current);
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        if (idx < order.length - 1) setScene(order[idx + 1]);
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        if (idx > 0) setScene(order[idx - 1]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);



  // Parallax values are handled natively via CSS custom properties

  const SCENE_LABELS = ["Home", "Mood Dining", "Events", "Menu", "Gallery", "Contact"];

  return (
    <div
      className="fixed inset-0 overflow-hidden font-['DM_Sans'] bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 text-[#2C2C2A] dark:text-[#F5F2EB] transition-colors duration-300"
      style={{ perspective: "1200px" }}
    >
      {/* ── BACKGROUND LAYER (Bung toàn màn hình, mượt mà và không vỡ hình) ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <AnimatePresence mode="popLayout">
          {scene === 1 ? (
            <motion.div
              key={`mood-bg-${activeMoodIdx}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 overflow-hidden"
            >
              <div
                className="absolute inset-0 w-full h-full select-none pointer-events-none scale-105"
                style={{
                  transform: "translateX(calc(var(--bg-x, 0px) * -0.3)) translateY(calc(var(--bg-y, 0px) * -0.3))",
                  transition: "transform 0.25s ease-out",
                }}
              >
                <img
                  src={MOODS[activeMoodIdx].img}
                  alt=""
                  className={`w-full h-full object-cover select-none pointer-events-none blur-[8px] transition-all duration-700 ${isDarkMode ? 'brightness-[0.25]' : 'brightness-[0.55]'}`}
                  style={{
                    imageRendering: "auto",
                  }}
                />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>


      {/* ── SCENE CONTENT AREA ── */}
      <div
        className={`absolute z-20 top-0 left-0 bottom-14 right-0 transition-all duration-500 ease-in-out lg:right-0`}
      >
        <AnimatePresence mode="wait">
          {scene === 0 && (
            <motion.div key="hero" className="absolute inset-0">
              <HeroScene
                lang={lang}
                isDark={isDarkMode}
                setShowBookingModal={setShowBookingModal}
                bgSlide={bgSlide}
                setBgSlide={setBgSlide}
              />
            </motion.div>
          )}
          {scene === 1 && (
            <motion.div key="mood" className="absolute inset-0">
              <MoodScene lang={lang} isDark={isDarkMode} onMoodSelect={handleMoodSelect} onMoodChange={setActiveMoodIdx} />
            </motion.div>
          )}
          {scene === 2 && (
            <motion.div key="events" className="absolute inset-0" data-scroll-zone>
              <EventsScene onSelectEvent={handleEventSelect} />
            </motion.div>
          )}
          {scene === 3 && (
            <motion.div key="menu" className="absolute inset-0" data-scroll-zone>
              <MenuScene
                cart={cart}
                setCart={setCart}
                lang={lang}
                setLang={setLang}
                setShowBookingModal={setShowBookingModal}
                updateQuantity={updateQuantity}
                scene={scene}
              />
            </motion.div>
          )}
          {scene === 4 && (
            <motion.div key="gallery" className="absolute inset-0" data-scroll-zone>
              <GalleryScene
                lang={lang}
                setShowBookingModal={setShowBookingModal}
                cart={cart}
                updateQuantity={updateQuantity}
                setBookingNote={setBookingNote}
              />
            </motion.div>
          )}
          {scene === 5 && (
            <motion.div key="contact" className="absolute inset-0" data-scroll-zone>
              <ContactScene
                lang={lang}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── VERTICAL SCENE PROGRESS (left edge) ── */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5 items-center">
        {([0, 3, 1, 2, 4, 5] as Scene[]).map((s) => (
          <button
            key={s}
            onClick={() => setScene(s)}
            className="group relative flex items-center justify-center py-1 cursor-pointer"
          >
            {/* Dot line */}
            <div
              className="w-1 rounded-full transition-all duration-500"
              style={{
                height: scene === s ? "28px" : "8px",
                background: scene === s ? (isDarkMode ? "#D4AF37" : "#B48C50") : (isDarkMode ? "rgba(245, 242, 235, 0.25)" : "rgba(44, 44, 42, 0.22)"),
              }}
            />
            {/* Tooltip Label */}
            <span className="absolute left-6 text-[9px] tracking-widest uppercase font-bold text-[#B48C50] opacity-0 group-hover:opacity-100 bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 border border-[#B48C50]/20 px-2 py-1 shadow-sm rounded-sm pointer-events-none transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50">
              {lang === "vi" ? (s === 0 ? "Trang Chủ" : s === 3 ? "Thực Đơn" : s === 1 ? "Không Gian" : s === 2 ? "Sự Kiện" : s === 4 ? "Thư Viện" : "Liên Hệ") : SCENE_LABELS[s]}
            </span>
          </button>
        ))}
      </div>

      {/* ── DESKTOP BOTTOM NAVIGATION ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 h-14 hidden lg:flex items-center px-10 will-change-[transform,backdrop-filter] border-t transition-colors duration-500"
        style={{
          background: isDarkMode ? "rgba(26, 17, 18, 0.96)" : "rgba(250, 249, 246, 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(44, 44, 42, 0.12)",
          transform: "translateZ(0)",
        }}
      >
        {/* Logo */}
        <div className="shrink-0 mr-8 cursor-pointer" onClick={() => setScene(0)}>
          <span className={`font-['Playfair_Display'] text-[15px] tracking-widest font-semibold leading-none transition-colors duration-500 ${isDarkMode ? 'text-[#D4AF37]' : 'text-[#2C2C2A]'}`}>
            FELLINI
          </span>
          <span className={`block text-[7px] tracking-[0.3em] uppercase transition-colors duration-500 mt-0.5 ${isDarkMode ? 'text-[#F5F2EB]/60' : 'text-[#7A7A72]'}`}>
            Cucina Italiana
          </span>
        </div>

        {/* Nav links */}
        <div className="flex-1 flex items-center justify-center gap-7 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {[
            { label: lang === "vi" ? "Trang Chủ" : "Home", s: 0 as Scene | null },
            { label: lang === "vi" ? "Thực Đơn" : "Menu", s: 3 as Scene | null },
            { label: lang === "vi" ? "Không Gian" : "Mood Dining", s: 1 as Scene | null },
            { label: lang === "vi" ? "Sự Kiện" : "Events & Offers", s: 2 as Scene | null },
            { label: lang === "vi" ? "Thư Viện" : "Gallery", s: 4 as Scene | null },
          ].map((l) => (
            <button
              key={l.label}
              onClick={() => l.s !== null && setScene(l.s)}
              className="relative text-[10px] tracking-[0.12em] uppercase font-semibold whitespace-nowrap py-1.5 cursor-pointer group transition-colors duration-300"
              style={{
                color: l.s === scene 
                  ? (isDarkMode ? "#D4AF37" : "#2C2C2A") 
                  : (isDarkMode ? "rgba(245, 242, 235, 0.6)" : "#7A7A72"),
              }}
            >
              <span>{l.label}</span>
              <span 
                className={`absolute bottom-0 left-0 right-0 h-[1.5px] transition-all duration-300 transform origin-left
                  ${l.s === scene 
                    ? (isDarkMode ? "bg-[#D4AF37] scale-x-100" : "bg-[#2C2C2A] scale-x-100") 
                    : (isDarkMode ? "bg-[#D4AF37]/50 scale-x-0 group-hover:scale-x-100" : "bg-[#2C2C2A]/50 scale-x-0 group-hover:scale-x-100")
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Language & Theme switcher */}
        <div className="shrink-0 ml-6 flex items-center gap-3">
          <div className="flex items-center gap-2 border-r border-[#7A7A72]/30 pr-3">
            <Globe size={11} style={{ color: "#7A7A72" }} />
            {["EN", "VI"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase() as "en" | "vi")}
                className="text-[9px] tracking-widest transition-colors cursor-pointer font-bold"
                style={{ color: lang === l.toLowerCase() ? "#2C2C2A" : "#7A7A72" }}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-[#7A7A72] hover:text-[#2C2C2A] dark:hover:text-[#F5F2EB] transition-colors cursor-pointer"
          >
            {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE BOTTOM NAVIGATION ── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 flex flex-col w-full lg:hidden will-change-[transform,backdrop-filter] transition-colors duration-500"
        style={{
          background: isDarkMode ? "rgba(26, 17, 18, 0.96)" : "rgba(250, 249, 246, 0.95)",
          backdropFilter: "blur(20px)",
          borderTop: isDarkMode ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(44, 44, 42, 0.12)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 12px)",
          transform: "translateZ(0)",
        }}
      >
        {/* Info Line */}
        <div className={`w-full flex justify-between items-center py-1.5 px-4 border-b transition-colors duration-500 ${isDarkMode ? 'bg-black/20 border-white/5' : 'bg-[rgba(44,44,42,0.04)] border-[rgba(44,44,42,0.1)]'}`}>
          <span className={`text-[9px] tracking-wider font-medium truncate flex-1 font-serif italic transition-colors duration-500 ${isDarkMode ? 'text-[#F5F2EB]/60' : 'text-[#7A7A72]'}`}>
            {lang === "vi" ? "40/24 Thảo Điền, Quận 2 • 090 123 4567" : "40/24 Thao Dien, D2 • 090 123 4567"}
          </span>
          {/* Language & Theme switcher for mobile */}
          <div className={`flex items-center gap-2 pl-3 shrink-0 border-l transition-colors duration-500 ${isDarkMode ? 'border-white/10' : 'border-[rgba(44,44,42,0.1)]'}`}>
            <Globe size={10} className={isDarkMode ? 'text-[#F5F2EB]/60' : 'text-[#7A7A72]'} />
            {["EN", "VI"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l.toLowerCase() as "en" | "vi")}
                className="text-[9px] tracking-widest transition-colors cursor-pointer font-bold"
                style={{ color: lang === l.toLowerCase() ? (isDarkMode ? "#D4AF37" : "#2C2C2A") : (isDarkMode ? "rgba(245, 242, 235, 0.4)" : "#7A7A72") }}
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="ml-1 transition-colors cursor-pointer"
              style={{ color: isDarkMode ? "#D4AF37" : "#7A7A72" }}
            >
              {isDarkMode ? <Sun size={10} /> : <Moon size={10} />}
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex justify-around items-center w-full px-1 pt-2 pb-1">
          {[
            { label: lang === "vi" ? "Trang Chủ" : "Home", s: 0 as Scene | null, icon: Home },
            { label: lang === "vi" ? "Không Gian" : "Dining", s: 1 as Scene | null, icon: Sparkles },
            { label: lang === "vi" ? "Sự Kiện" : "Events", s: 2 as Scene | null, icon: Calendar },
            { label: lang === "vi" ? "Thực Đơn" : "Menu", s: 3 as Scene | null, icon: FileText },
            { label: lang === "vi" ? "Thư Viện" : "Gallery", s: 4 as Scene | null, icon: Image },
            { label: lang === "vi" ? "Liên Hệ" : "Contact", s: 5 as Scene | null, icon: Phone },
          ].map((l) => (
            <button
              key={l.label}
              onClick={() => l.s !== null && setScene(l.s)}
              className="flex flex-col items-center justify-center min-w-[48px] min-h-[48px] transition-colors duration-200"
              style={{
                color: l.s === scene ? (isDarkMode ? "#D4AF37" : "#B48C50") : (isDarkMode ? "rgba(245, 242, 235, 0.5)" : "#7A7A72"),
              }}
            >
              <l.icon size={18} strokeWidth={l.s === scene ? 2.5 : 1.5} className="mb-1" />
              <span className="text-[9px] tracking-wide uppercase font-semibold text-center leading-tight max-w-[60px] truncate">
                {l.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* Root Reservation Booking Modal */}
      <ReservationModal
        lang={lang}
        showBookingModal={showBookingModal}
        setShowBookingModal={setShowBookingModal}
        bookingName={bookingName}
        setBookingName={setBookingName}
        bookingPhone={bookingPhone}
        setBookingPhone={setBookingPhone}
        bookingDate={bookingDate}
        setBookingDate={setBookingDate}
        bookingTime={bookingTime}
        setBookingTime={setBookingTime}
        bookingGuests={bookingGuests}
        setBookingGuests={setBookingGuests}
        bookingSuccess={bookingSuccess}
        setBookingSuccess={setBookingSuccess}
        bookingNote={bookingNote}
        setBookingNote={setBookingNote}
        cart={cart}
        setCart={setCart}
      />

      {/* MOBILE STORY OVERLAY DRAWER */}
      <AnimatePresence>
        {showMobileStory && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileStory(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[320px] h-full bg-[#F7F5F0] dark:bg-[#1A1112] transition-colors duration-500 shadow-2xl p-8 flex flex-col overflow-y-auto overscroll-contain"
            >
              <button
                onClick={() => setShowMobileStory(false)}
                className="absolute top-5 right-5 text-[#7A7A72] dark:text-[#F5F2EB]/90 hover:text-[#2C2C2A] dark:text-[#F5F2EB] cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col gap-6 mt-6">
                <p className="text-[9px] tracking-[0.24em] uppercase text-[#B48C50] font-bold">Est. 2019 · Thảo Điền, HCMC</p>
                <div>
                  <h2 className="font-['Playfair_Display'] text-[#2C2C2A] dark:text-[#F5F2EB] text-2xl leading-tight">
                    {lang === "vi" ? "Tinh Hoa\nẨm Thực" : "Artisanal\nCuisine"}
                  </h2>
                </div>

                <div className="border-l-2 border-[#B48C50] pl-4">
                  <p className={`font-['Playfair_Display'] text-[#7A7A72] dark:text-[#F5F2EB]/90 text-sm leading-relaxed ${lang === 'en' ? 'italic' : ''}`}>
                    {lang === "vi" ? (bgSlide === 0 ? "Fellini Thảo Điền" : "Bữa Tối Ấm Cúng") : BG_SLIDES[bgSlide].quote}
                  </p>
                </div>

                <p className="text-[#5A5A56] dark:text-[#FAF8F5] text-xs leading-relaxed font-serif">
                  {lang === "vi"
                    ? (bgSlide === 0
                      ? "Gian bếp Ý truyền thống giao hòa cùng không gian sân vườn lãng mạn."
                      : "Thiên đường ấm áp của sự lãng mạn, hầm rượu vang tuyển chọn và nghệ thuật thưởng ẩm chậm.")
                    : BG_SLIDES[bgSlide].sub}
                </p>

                <div className="flex flex-col gap-2 pt-6 border-t border-[rgba(44,44,42,0.08)] dark:border-white/10 mt-4">
                  {([0, 3, 1, 2] as Scene[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setScene(s);
                        setShowMobileStory(false);
                      }}
                      className="text-left flex items-center gap-2.5 py-1.5 cursor-pointer"
                    >
                      <span
                        className="w-1 h-1 rounded-full transition-all duration-300"
                        style={{
                          background: scene === s ? "#B48C50" : "rgba(44,44,42,0.2)",
                          width: scene === s ? "14px" : "4px",
                          height: "4px"
                        }}
                      />
                      <span
                        className="text-[10px] tracking-[0.14em] uppercase font-bold transition-colors"
                        style={{ color: scene === s ? "#B48C50" : "#7A7A72" }}
                      >
                        {lang === "vi" ? (s === 0 ? "Trang Chủ" : s === 3 ? "Thực Đơn" : s === 1 ? "Không Gian" : "Sự Kiện") : SCENE_LABELS[s]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

