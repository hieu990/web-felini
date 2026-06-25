import { Search, Plus, ChefHat, Edit3, Trash2 } from 'lucide-react';

interface MenuItem {
  id: string;
  nameEn: string;
  nameVi: string;
  descriptionEn: string | null;
  descriptionVi: string | null;
  price: number;
  category: string;
  subCategory: string | null;
  isAvailable: boolean;
  imageUrl: string | null;
}

interface MenuTabProps {
  menuItems: MenuItem[];
  selectedMenuCategory: string;
  setSelectedMenuCategory: (val: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (val: string) => void;
  menuSearchQuery: string;
  setMenuSearchQuery: (val: string) => void;
  setShowAddMenuModal: (show: boolean) => void;
  setEditingMenuItem: (item: MenuItem | null) => void;
  toggleMenuAvailability: (item: MenuItem) => void;
  handleDeleteMenuItem: (id: string) => void;
  SUB_CATS: Record<string, string[]>;
  CAT_LABELS: Record<string, string>;
  lang: 'vi' | 'en';
}

export default function MenuTab({
  menuItems,
  selectedMenuCategory,
  setSelectedMenuCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  menuSearchQuery,
  setMenuSearchQuery,
  setShowAddMenuModal,
  setEditingMenuItem,
  toggleMenuAvailability,
  handleDeleteMenuItem,
  SUB_CATS,
  CAT_LABELS,
  lang
}: MenuTabProps) {
  const subCats = SUB_CATS[selectedMenuCategory] || [];

  // 1. Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchCat = !selectedMenuCategory || item.category === selectedMenuCategory;
    const matchSub = !selectedSubCategory || item.subCategory === selectedSubCategory;
    const q = menuSearchQuery.toLowerCase();
    const matchQ = !q || item.nameEn.toLowerCase().includes(q) || item.nameVi.toLowerCase().includes(q);
    return matchCat && matchSub && matchQ;
  });

  // 2. Group by subCategory for display
  const groupedItems: Record<string, MenuItem[]> = {};
  filteredItems.forEach((item) => {
    const key = item.subCategory || item.category;
    if (!groupedItems[key]) groupedItems[key] = [];
    groupedItems[key].push(item);
  });

  // 3. Category stats
  const catCounts: Record<string, number> = {};
  menuItems.forEach((item) => {
    catCounts[item.category] = (catCounts[item.category] || 0) + 1;
  });

  return (
    <div className="space-y-6 font-sans animate-in fade-in duration-200">
      {/* ── Category tabs + Search ── */}
      <div className="bg-[#380F12] border border-[#5C1A24] p-4 rounded shadow-md space-y-4">
        {/* Row 1: Category tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {['', 'APPETIZERS', 'MAINS', 'DESSERTS', 'DRINKS', 'WINES'].map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedMenuCategory(cat); setSelectedSubCategory(''); }}
                className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  selectedMenuCategory === cat
                    ? 'bg-[#D4AF37] text-stone-900 font-bold shadow-md'
                    : 'text-stone-300 hover:bg-[#4A0E0E] border border-[#5C1A24]/50'
                }`}
              >
                {CAT_LABELS[cat]}
                {cat !== '' && catCounts[cat] ? (
                  <span className={`text-[10px] px-1.5 rounded-full ${
                    selectedMenuCategory === cat ? 'bg-stone-900/20 text-stone-900 font-bold' : 'bg-[#5C1A24] text-amber-400 font-bold'
                  }`}>
                    {catCounts[cat]}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowAddMenuModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded text-sm font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <Plus size={16} />
            {lang === 'vi' ? 'Thêm Món Mới' : 'Add New Item'}
          </button>
        </div>

        {/* Row 2: SubCategory filter + Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 text-stone-500" size={14} />
            <input
              type="text"
              placeholder={lang === 'vi' ? "Tìm tên món (EN/VI)..." : "Search dish name (EN/VI)..."}
              value={menuSearchQuery}
              onChange={(e) => setMenuSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#1E0505] border border-[#5C1A24] rounded text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>

          {/* SubCategory filter pills */}
          {subCats.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[10px] text-stone-500 uppercase tracking-wider font-semibold">
                {lang === 'vi' ? 'Phân loại:' : 'Filter:'}
              </span>
              <button
                onClick={() => setSelectedSubCategory('')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                  !selectedSubCategory
                    ? 'bg-amber-700/60 text-amber-200 border border-amber-600/50'
                    : 'text-stone-400 hover:text-stone-200 border border-[#5C1A24]/50'
                }`}
              >
                {lang === 'vi' ? 'Tất cả' : 'All'}
              </button>
              {subCats.map((sc) => (
                <button
                  key={sc}
                  onClick={() => setSelectedSubCategory(sc)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                    selectedSubCategory === sc
                      ? 'bg-amber-700/60 text-amber-200 border border-amber-600/50'
                      : 'text-stone-400 hover:text-stone-200 border border-[#5C1A24]/50'
                  }`}
                >
                  {sc}
                </button>
              ))}
            </div>
          )}

          {/* Clear filters */}
          {(menuSearchQuery || selectedSubCategory) && (
            <button
              onClick={() => { setMenuSearchQuery(''); setSelectedSubCategory(''); }}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              {lang === 'vi' ? 'Xóa lọc' : 'Clear filters'}
            </button>
          )}

          <span className="text-xs text-stone-500 ml-auto font-mono">
            {filteredItems.length} / {menuItems.length} {lang === 'vi' ? 'món' : 'items'}
          </span>
        </div>
      </div>

      {/* ── Menu items display (grouped by subCategory) ── */}
      {filteredItems.length === 0 ? (
        <div className="bg-[#380F12]/30 border border-[#5C1A24] p-12 text-center rounded-lg">
          <ChefHat size={48} className="mx-auto text-stone-600 mb-2" />
          <h4 className="text-stone-300 font-bold">{lang === 'vi' ? 'Không tìm thấy món ăn nào' : 'No menu items found'}</h4>
          <p className="text-xs text-stone-500 mt-1">{lang === 'vi' ? 'Thay đổi bộ lọc hoặc thêm mới món ăn.' : 'Change filter criteria or add new items.'}</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groupedItems).map(([subCat, items]) => (
            <div key={subCat}>
              {/* SubCategory header */}
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-amber-300 font-bold text-xs uppercase tracking-widest">{subCat}</h3>
                <div className="flex-1 h-px bg-[#5C1A24]/40"></div>
                <span className="text-xs text-stone-500 font-mono">{items.length} {lang === 'vi' ? 'món' : 'items'}</span>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-[#380F12] border border-[#5C1A24]/60 rounded-lg overflow-hidden flex flex-col justify-between shadow-md transition-all ${
                      !item.isAvailable ? 'opacity-50 saturate-0' : 'hover:border-[#D4AF37]/50 hover:shadow-amber-955/10'
                    }`}
                  >
                    {/* Image */}
                    <div className="h-36 bg-[#1E0505] relative flex items-center justify-center overflow-hidden">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.nameEn} className="w-full h-full object-cover" />
                      ) : (
                        <ChefHat className="text-[#D4AF37]/15" size={54} />
                      )}
                      {/* Availability overlay */}
                      {!item.isAvailable && (
                        <div className="absolute inset-0 bg-stone-950/70 flex items-center justify-center">
                          <span className="text-[10px] font-bold text-stone-300 uppercase tracking-widest border border-stone-500 px-2.5 py-1 rounded">
                            {lang === 'vi' ? 'Hết món' : 'Out of Stock'}
                          </span>
                        </div>
                      )}
                      {/* Category + subCategory badges */}
                      <div className="absolute top-2 left-2 flex gap-1 flex-wrap z-10">
                        <span className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 bg-black/70 rounded-full text-[#D4AF37]">
                          {item.category}
                        </span>
                        {item.subCategory && item.subCategory !== item.category && (
                          <span className="text-[8px] font-medium px-1.5 py-0.5 bg-black/60 rounded-full text-stone-300">
                            {item.subCategory}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-bold text-amber-100 text-sm line-clamp-2 leading-snug">{item.nameEn}</h4>
                        <p className="font-semibold text-stone-400 text-xs italic line-clamp-1">{item.nameVi}</p>
                        {item.descriptionVi && (
                          <p className="text-[11px] text-stone-500 line-clamp-2 pt-1.5 leading-normal">{item.descriptionVi}</p>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between border-t border-[#5C1A24]/30 pt-2">
                          <span className="text-[#D4AF37] font-bold text-sm">
                            {item.price >= 500
                              ? `${(item.price * 1000).toLocaleString('vi-VN')} ₫`
                              : `${(item.price * 1000).toLocaleString('vi-VN')} ₫`
                            }
                          </span>
                        </div>

                        {/* Toggle + Edit/Delete */}
                        <div className="flex items-center justify-between">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.isAvailable}
                              onChange={() => toggleMenuAvailability(item)}
                              className="sr-only peer"
                            />
                            <div className="w-7 h-4 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:transition-all peer-checked:bg-amber-600 relative after:h-3 after:w-3"></div>
                            <span className={`text-[10px] font-bold ${item.isAvailable ? 'text-green-400' : 'text-stone-500'}`}>
                              {item.isAvailable ? (lang === 'vi' ? 'Còn món' : 'In Stock') : (lang === 'vi' ? 'Hết' : 'Out')}
                            </span>
                          </label>

                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setEditingMenuItem(item)}
                              className="p-1 hover:text-amber-300 text-stone-500 rounded hover:bg-amber-900/20 transition-colors"
                              title="Sửa món"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteMenuItem(item.id)}
                              className="p-1 hover:text-red-400 text-stone-500 rounded hover:bg-red-900/20 transition-colors"
                              title="Xóa món"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
