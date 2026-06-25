import { Search, Plus, Edit3, Trash2 } from 'lucide-react';

interface ICustomerPreferences {
  allergies: string[];
  favoriteWine?: string[];
  seatingPreference?: string;
  dietaryNotes?: string;
  specialNotes?: string;
}

interface Customer {
  id: string;
  fullName: string;
  phoneNumber: string | null;
  email: string | null;
  vipTag: string;
  preferences: ICustomerPreferences;
  visitCount: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CustomersTabProps {
  customers: Customer[];
  customerSearchQuery: string;
  setCustomerSearchQuery: (val: string) => void;
  selectedVipFilter: string;
  setSelectedVipFilter: (val: string) => void;
  setShowAddCustomerModal: (show: boolean) => void;
  setEditingCustomer: any;
  handleDeleteCustomer: (id: string) => void;
  setCheckInSearch: (val: string) => void;
  setCheckedInCustomer: any;
  setActiveTab: (tab: 'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers') => void;
  getVipBadgeClass: (vip: string) => string;
  lang: 'vi' | 'en';
}

export default function CustomersTab({
  customers,
  customerSearchQuery,
  setCustomerSearchQuery,
  selectedVipFilter,
  setSelectedVipFilter,
  setShowAddCustomerModal,
  setEditingCustomer,
  handleDeleteCustomer,
  setCheckInSearch,
  setCheckedInCustomer,
  setActiveTab,
  getVipBadgeClass,
  lang
}: CustomersTabProps) {
  return (
    <div className="space-y-6 font-sans animate-in fade-in duration-200">
      {/* Filter controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#380F12] border border-[#5C1A24] p-4 rounded shadow-md">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 text-stone-400" size={16} />
          <input
            type="text"
            placeholder={lang === 'vi' ? "Tìm theo Tên, Số điện thoại hoặc Email..." : "Search by Name, Phone or Email..."}
            value={customerSearchQuery}
            onChange={(e) => setCustomerSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#1E0505] border border-[#5C1A24] rounded text-stone-100 placeholder-stone-550 text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedVipFilter}
            onChange={(e) => setSelectedVipFilter(e.target.value)}
            className="px-3 py-2 bg-[#1E0505] border border-[#5C1A24] text-stone-200 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-all"
          >
            <option value="">{lang === 'vi' ? 'Tất cả hạng VIP' : 'All VIP Tiers'}</option>
            <option value="CELEB">CELEB</option>
            <option value="VVIP">VVIP</option>
            <option value="VIP">VIP</option>
            <option value="STANDARD">STANDARD</option>
          </select>

          <button
            onClick={() => setShowAddCustomerModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded text-sm font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <Plus size={16} />
            {lang === 'vi' ? 'Thêm Khách VIP' : 'Add VIP Guest'}
          </button>
        </div>
      </div>

      {/* Customers list table */}
      <div className="bg-[#380F12] border border-[#5C1A24] rounded-lg overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-[#1E0505] border-b border-[#5C1A24] text-stone-400 font-semibold text-xs uppercase tracking-wider">
                <th className="px-6 py-4">{lang === 'vi' ? 'Tên khách hàng' : 'Customer Name'}</th>
                <th className="px-6 py-4">{lang === 'vi' ? 'Số điện thoại' : 'Phone Number'}</th>
                <th className="px-6 py-4">{lang === 'vi' ? 'Email' : 'Email Address'}</th>
                <th className="px-6 py-4">{lang === 'vi' ? 'Hạng VIP' : 'VIP Tier'}</th>
                <th className="px-6 py-4 text-center">{lang === 'vi' ? 'Số lượt ghé' : 'Visits'}</th>
                <th className="px-6 py-4">{lang === 'vi' ? 'Lưu ý đặc biệt (Allergies / Table)' : 'Special logs (Allergies / Seating)'}</th>
                <th className="px-6 py-4 text-right">{lang === 'vi' ? 'Hành động' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C1A24]/30 text-stone-300">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center text-stone-500 font-medium">
                    {lang === 'vi' ? 'Không có hồ sơ thực khách nào khớp với bộ lọc' : 'No VIP profiles matching current filters'}
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#4A0E0E]/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-amber-100">{c.fullName}</td>
                    <td className="px-6 py-4 text-stone-300 font-mono text-xs">{c.phoneNumber || '-'}</td>
                    <td className="px-6 py-4 text-stone-400 text-xs">{c.email || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${getVipBadgeClass(c.vipTag)}`}>
                        {c.vipTag}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-amber-400 font-mono">{c.visitCount}</td>
                    <td className="px-6 py-4 text-xs text-stone-300 max-w-xs truncate leading-normal">
                      {c.preferences?.allergies?.length ? `⚠️ Dị ứng: ${c.preferences.allergies.join(', ')}. ` : ''}
                      {c.preferences?.seatingPreference ? `🪑 Bàn thích: ${c.preferences.seatingPreference}` : ''}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 items-center">
                        <button
                          onClick={() => {
                            setCheckInSearch(c.phoneNumber || c.email || '');
                            setCheckedInCustomer(c);
                            setActiveTab('checkin');
                          }}
                          className="text-xs text-amber-400 hover:text-amber-200 bg-[#4A0E0E] px-2.5 py-1 rounded font-bold border border-[#D4AF37]/20 transition-all hover:border-[#D4AF37]/50"
                        >
                          {lang === 'vi' ? 'Check-in' : 'Concierge'}
                        </button>
                        <button
                          onClick={() => setEditingCustomer(c)}
                          className="p-1.5 text-stone-400 hover:text-amber-300 rounded hover:bg-stone-800 transition-colors"
                          title="Sửa hồ sơ"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(c.id)}
                          className="p-1.5 text-stone-500 hover:text-red-400 rounded hover:bg-stone-850 transition-colors"
                          title="Xóa hồ sơ"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
