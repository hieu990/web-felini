import {
  Search, Plus, UserCheck, Star, FileText, AlertCircle, Wine, Heart, Phone, Mail, Save
} from 'lucide-react';

interface ICustomerPreferences {
  allergies: string[];
  favoriteWine?: string[];
  seatingPreference?: string;
  dietaryNotes?: string;
  specialNotes?: string;
}

interface CheckinTabProps {
  checkInSearch: string;
  setCheckInSearch: (val: string) => void;
  checkedInCustomer: any;
  setCheckedInCustomer: any;
  checkInError: string;
  handleCheckInSearch: (e: React.FormEvent) => void;
  triggerReCheckIn: (customer: any) => any;
  savePreferences: (id: string, prefs: ICustomerPreferences) => void;
  setShowAddCustomerModal: (show: boolean) => void;
  setNewCustomerPhone: (val: string) => void;
  getVipBadgeClass: (vip: string) => string;
  lang: 'vi' | 'en';
}

export default function CheckinTab({
  checkInSearch,
  setCheckInSearch,
  checkedInCustomer,
  setCheckedInCustomer,
  checkInError,
  handleCheckInSearch,
  triggerReCheckIn,
  savePreferences,
  setShowAddCustomerModal,
  setNewCustomerPhone,
  getVipBadgeClass,
  lang
}: CheckinTabProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans animate-in fade-in duration-200">
      {/* Search Block */}
      <div className="bg-[#380F12] border border-[#5C1A24] p-6 rounded shadow-md">
        <h3 className="text-base font-medium text-amber-200 mb-4 uppercase tracking-wider">
          {lang === 'vi' ? 'Tra Cứu & Check-in VIP' : 'Lookup & Check-In VIP Client'}
        </h3>
        <form onSubmit={handleCheckInSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 text-stone-400" size={18} />
            <input
              type="text"
              placeholder={lang === 'vi' ? "Tìm kiếm bằng số điện thoại hoặc email thực khách..." : "Search guest by phone number or email..."}
              value={checkInSearch}
              onChange={(e) => setCheckInSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1E0505] border border-[#5C1A24] rounded text-stone-100 placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <button
            type="submit"
            className="px-6 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 font-bold rounded hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-wider"
          >
            {lang === 'vi' ? 'Tìm & Check-In' : 'Find & Check-In'}
          </button>
        </form>
        {checkInError && (
          <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-950/40 p-3 rounded border border-red-900/30 text-xs">
            <AlertCircle size={16} />
            <span>{checkInError}</span>
            <button
              type="button"
              onClick={() => {
                setNewCustomerPhone(checkInSearch);
                setShowAddCustomerModal(true);
              }}
              className="ml-auto text-amber-300 underline font-medium hover:text-amber-100 animate-pulse"
            >
              {lang === 'vi' ? 'Tạo hồ sơ mới' : 'Create profile'}
            </button>
          </div>
        )}
      </div>

      {/* Customer Profile detail Card */}
      {checkedInCustomer ? (
        <div className="bg-[#380F12] border-2 border-[#D4AF37]/50 rounded overflow-hidden shadow-2xl transition-all duration-300">
          {/* Card Header Banner */}
          <div className="bg-[#1E0505] px-6 py-6 border-b border-[#5C1A24] flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h4 className="text-2xl font-bold text-amber-100">{checkedInCustomer.fullName}</h4>
                <span className={`px-3 py-1 rounded text-xs font-bold tracking-widest ${getVipBadgeClass(checkedInCustomer.vipTag)}`}>
                  {checkedInCustomer.vipTag}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-stone-400">
                {checkedInCustomer.phoneNumber && (
                  <span className="flex items-center gap-1"><Phone size={12} /> {checkedInCustomer.phoneNumber}</span>
                )}
                {checkedInCustomer.email && (
                  <span className="flex items-center gap-1"><Mail size={12} /> {checkedInCustomer.email}</span>
                )}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-stone-400 uppercase tracking-widest">
                {lang === 'vi' ? 'Số lượt ghé thăm' : 'Total Visits'}
              </div>
              <div className="text-3xl font-serif font-semibold text-[#D4AF37]">{checkedInCustomer.visitCount}</div>
              <button
                onClick={() => triggerReCheckIn(checkedInCustomer)}
                className="mt-2 text-xs px-3 py-1.5 bg-[#4A0E0E] hover:bg-[#631414] text-amber-200 border border-[#D4AF37]/30 rounded transition-all font-semibold"
              >
                + Check-in Lần Nữa (Add Visit)
              </button>
            </div>
          </div>

          {/* Preferences Panel */}
          <div className="p-6 space-y-6">
            <h5 className="text-xs uppercase tracking-widest text-[#D4AF37] border-b border-[#5C1A24] pb-2 font-semibold">
              {lang === 'vi' ? 'Sở thích & Ghi chú dịch vụ' : 'Concierge Culinary Preferences'}
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <AlertCircle size={12} className="text-red-400" /> {lang === 'vi' ? 'DỊ ỨNG (Allergies)' : 'Allergies'}
                  </label>
                  <textarea
                    value={checkedInCustomer.preferences?.allergies?.join(', ') || ''}
                    onChange={(e) => {
                      const allergies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setCheckedInCustomer({
                        ...checkedInCustomer,
                        preferences: { ...checkedInCustomer.preferences, allergies }
                      });
                    }}
                    placeholder="Không dị ứng. (Ví dụ: hải sản, lạc, gluten)"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <Wine size={12} className="text-amber-400" /> {lang === 'vi' ? 'GU RƯỢU VANG (Wines)' : 'Wine Preferences'}
                  </label>
                  <textarea
                    value={checkedInCustomer.preferences?.favoriteWine?.join(', ') || ''}
                    onChange={(e) => {
                      const favoriteWine = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      setCheckedInCustomer({
                        ...checkedInCustomer,
                        preferences: { ...checkedInCustomer.preferences, favoriteWine }
                      });
                    }}
                    placeholder="Thích vang trắng Ý, vang đỏ Pinot Noir..."
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                    rows={2}
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <Heart size={12} className="text-amber-400" /> {lang === 'vi' ? 'CHẾ ĐỘ ĂN KIÊNG (Dietary)' : 'Dietary restrictions'}
                  </label>
                  <input
                    type="text"
                    value={checkedInCustomer.preferences?.dietaryNotes || ''}
                    onChange={(e) => setCheckedInCustomer({
                      ...checkedInCustomer,
                      preferences: { ...checkedInCustomer.preferences, dietaryNotes: e.target.value }
                    })}
                    placeholder="Thuần chay, Keto, ít muối..."
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    <Star size={12} className="text-amber-400" /> {lang === 'vi' ? 'VỊ TRÍ BÀN THÍCH HỢP (Seating)' : 'Preferred Table Area'}
                  </label>
                  <input
                    type="text"
                    value={checkedInCustomer.preferences?.seatingPreference || ''}
                    onChange={(e) => setCheckedInCustomer({
                      ...checkedInCustomer,
                      preferences: { ...checkedInCustomer.preferences, seatingPreference: e.target.value }
                    })}
                    placeholder="Gần cửa sổ vườn, phòng riêng tư..."
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Special Concierge Notes */}
            <div>
              <label className="block text-xs text-stone-400 mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                <FileText size={12} className="text-amber-400" /> {lang === 'vi' ? 'GHI CHÚ CHĂM SÓC ĐẶC BIỆT' : 'Concierge & Service Notes'}
              </label>
              <textarea
                value={checkedInCustomer.preferences?.specialNotes || ''}
                onChange={(e) => setCheckedInCustomer({
                  ...checkedInCustomer,
                  preferences: { ...checkedInCustomer.preferences, specialNotes: e.target.value }
                })}
                placeholder="Khách thích kỷ niệm ngày cưới, hay ngồi phòng lạnh, thanh toán trước..."
                className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-[#D4AF37] transition-all"
                rows={3}
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => savePreferences(checkedInCustomer.id, checkedInCustomer.preferences)}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#4A0E0E] hover:bg-[#631414] text-amber-200 border border-[#D4AF37] rounded font-bold text-sm transition-all shadow-md"
              >
                <Save size={16} />
                {lang === 'vi' ? 'Lưu Thay Đổi Sở Thích' : 'Save CRM Preferences'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#380F12]/50 border border-[#5C1A24] p-10 text-center rounded-lg space-y-4 shadow-inner">
          <UserCheck size={48} className="mx-auto text-[#D4AF37]/45" />
          <div>
            <h4 className="text-stone-300 font-bold">{lang === 'vi' ? 'Chưa có thông tin thực khách được check-in' : 'No guest has checked in yet'}</h4>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              {lang === 'vi' ? 'Tìm kiếm bằng Số điện thoại/Email để hiển thị chi tiết hồ sơ VIP và check-in phục vụ tại nhà hàng.' : 'Search by phone number or email to lookup VIP profiles and check them in.'}
            </p>
          </div>
          <button
            onClick={() => {
              setNewCustomerPhone('');
              setShowAddCustomerModal(true);
            }}
            className="inline-flex items-center gap-2 text-xs px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <Plus size={14} />
            {lang === 'vi' ? 'Thêm Mới Hồ Sơ VIP' : 'Create New VIP Profile'}
          </button>
        </div>
      )}
    </div>
  );
}
