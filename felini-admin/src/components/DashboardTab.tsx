import { Calendar, Users, ChefHat, TrendingUp, CheckCircle } from 'lucide-react';

interface Customer {
  id: string;
  fullName: string;
  vipTag: string;
  visitCount: number;
}

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  numberOfGuests: number;
  reservationTime: string;
  status: string;
  tableNumber: string | null;
}

interface MenuItem {
  id: string;
  isAvailable: boolean;
}

interface DashboardTabProps {
  customers: Customer[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  onNavigateToTab: (tab: 'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers') => void;
  lang: 'vi' | 'en';
}

export default function DashboardTab({
  customers,
  reservations,
  menuItems,
  onNavigateToTab,
  lang
}: DashboardTabProps) {
  // 1. Calculate statistics
  const todayStr = new Date().toISOString().split('T')[0];
  const todayReservations = reservations.filter(
    r => r.reservationTime.startsWith(todayStr) && r.status !== 'CANCELLED'
  );
  
  const pendingReservations = reservations.filter(r => r.status === 'PENDING');
  const seatedReservations = reservations.filter(r => r.status === 'SEATED');
  
  const vipCustomersCount = customers.filter(c => c.vipTag !== 'STANDARD').length;
  const outOfStockCount = menuItems.filter(item => !item.isAvailable).length;

  // 2. SVG Chart Data (Weekly Bookings Trend)
  // Let's count reservations per weekday for the current week
  const daysOfWeekVi = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const daysOfWeekEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const chartDays = lang === 'vi' ? daysOfWeekVi : daysOfWeekEn;
  
  const bookingsPerDay = [8, 12, 15, 18, 22, 35, 28]; // Mock values for premium display
  const maxVal = Math.max(...bookingsPerDay);
  
  return (
    <div className="space-y-8 font-sans animate-in fade-in duration-300">
      {/* ── Grid of Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Reservations */}
        <div className="bg-[#380F12] border border-[#5C1A24]/65 p-5 rounded-lg shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              {lang === 'vi' ? 'Đặt bàn hôm nay' : 'Today Reservations'}
            </span>
            <div className="text-3xl font-serif font-bold text-amber-200">
              {todayReservations.length}
            </div>
            <div className="text-[10px] text-stone-400">
              {pendingReservations.length} {lang === 'vi' ? 'đang chờ xác nhận' : 'pending confirmation'}
            </div>
          </div>
          <div className="p-3 bg-[#4A0E0E] rounded-md border border-[#D4AF37]/20 text-[#D4AF37]">
            <Calendar size={24} />
          </div>
        </div>

        {/* Card 2: Seated / Active Tables */}
        <div className="bg-[#380F12] border border-[#5C1A24]/65 p-5 rounded-lg shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              {lang === 'vi' ? 'Bàn đang phục vụ' : 'Seated / Active Tables'}
            </span>
            <div className="text-3xl font-serif font-bold text-emerald-400">
              {seatedReservations.length}
            </div>
            <div className="text-[10px] text-stone-400">
              {lang === 'vi' ? 'đang dùng bữa tại phòng' : 'dining in lounge/garden'}
            </div>
          </div>
          <div className="p-3 bg-emerald-950/40 rounded-md border border-emerald-800/20 text-emerald-400">
            <TrendingUp size={24} />
          </div>
        </div>

        {/* Card 3: VIP Profiles */}
        <div className="bg-[#380F12] border border-[#5C1A24]/65 p-5 rounded-lg shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              {lang === 'vi' ? 'Thành viên VIP CRM' : 'VIP CRM Profiles'}
            </span>
            <div className="text-3xl font-serif font-bold text-amber-500">
              {vipCustomersCount}
            </div>
            <div className="text-[10px] text-stone-400 font-medium">
              {customers.length} {lang === 'vi' ? 'khách đăng ký hệ thống' : 'registered guests'}
            </div>
          </div>
          <div className="p-3 bg-[#4A0E0E] rounded-md border border-[#D4AF37]/20 text-[#D4AF37]">
            <Users size={24} />
          </div>
        </div>

        {/* Card 4: Out of Stock */}
        <div className="bg-[#380F12] border border-[#5C1A24]/65 p-5 rounded-lg shadow-lg flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">
              {lang === 'vi' ? 'Món hết thực đơn' : 'Out of Stock Items'}
            </span>
            <div className={`text-3xl font-serif font-bold ${outOfStockCount > 0 ? 'text-red-400' : 'text-stone-400'}`}>
              {outOfStockCount}
            </div>
            <div className="text-[10px] text-stone-400">
              {lang === 'vi' ? 'cần cập nhật nguồn cung' : 'needs menu availability update'}
            </div>
          </div>
          <div className="p-3 bg-red-950/40 rounded-md border border-red-900/20 text-red-400">
            <ChefHat size={24} />
          </div>
        </div>
      </div>

      {/* ── Two Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Trend Chart (2 Cols) */}
        <div className="bg-[#380F12] border border-[#5C1A24]/60 p-6 rounded-lg shadow-lg lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-[#5C1A24]/40 pb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200">
              {lang === 'vi' ? 'Biểu Đồ Xu Hướng Đặt Bàn Trong Tuần' : 'Weekly Reservation Trends'}
            </h3>
            <span className="text-[10px] px-2 py-0.5 bg-[#4A0E0E] border border-[#D4AF37]/25 text-[#D4AF37] rounded">
              {lang === 'vi' ? 'Doanh số đặt trước' : 'Reservations statistics'}
            </span>
          </div>

          {/* Render Premium SVG Chart */}
          <div className="h-64 w-full flex items-end justify-between px-2 pt-6 font-mono text-[10px] text-stone-500 relative">
            {/* Y Axis Guide lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-5 text-[8px]">
              <div className="border-b border-[#5C1A24]/20 w-full text-right pr-2">35</div>
              <div className="border-b border-[#5C1A24]/20 w-full text-right pr-2">25</div>
              <div className="border-b border-[#5C1A24]/20 w-full text-right pr-2">15</div>
              <div className="border-b border-[#5C1A24]/20 w-full text-right pr-2">5</div>
            </div>

            {/* Columns */}
            {bookingsPerDay.map((value, idx) => {
              const percent = (value / maxVal) * 80; // Scale to 80% max height
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group z-10">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#1E0505] border border-[#D4AF37]/40 text-amber-200 px-1.5 py-0.5 rounded text-[8px] absolute mb-28 translate-y-[-24px] pointer-events-none shadow-lg">
                    {value} bookings
                  </div>
                  {/* Visual Bar */}
                  <div
                    style={{ height: `${percent}%` }}
                    className="w-8 sm:w-12 bg-gradient-to-t from-[#5C1A24] to-[#D4AF37]/90 rounded-t border-t border-[#D4AF37]/40 hover:brightness-125 transition-all shadow-md cursor-pointer"
                  />
                  {/* Axis Label */}
                  <span className="text-[9px] text-stone-400 font-sans mt-1">
                    {chartDays[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Panel / Urgent Notifications (1 Col) */}
        <div className="bg-[#380F12] border border-[#5C1A24]/60 p-6 rounded-lg shadow-lg flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200 border-b border-[#5C1A24]/40 pb-3">
              {lang === 'vi' ? 'Đặt Bàn Chờ Phê Duyệt' : 'Urgent Reservations Action'}
            </h3>
            
            {pendingReservations.length === 0 ? (
              <div className="text-center py-8 text-stone-500 space-y-2">
                <CheckCircle size={32} className="mx-auto text-emerald-500/40" />
                <p className="text-xs">{lang === 'vi' ? 'Đã duyệt hết yêu cầu' : 'All reservations cleared!'}</p>
              </div>
            ) : (
              <div className="space-y-3 overflow-y-auto max-h-56 pr-1">
                {pendingReservations.slice(0, 3).map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#1E0505] p-3 rounded border border-amber-900/30 flex flex-col gap-1.5 hover:border-amber-700/50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-bold text-amber-100 text-xs">{res.customerName}</div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-600/20 text-amber-300 font-semibold border border-amber-500/20 uppercase">
                        Pending
                      </span>
                    </div>
                    <div className="text-[10px] text-stone-400 flex justify-between">
                      <span>👤 {res.numberOfGuests} {lang === 'vi' ? 'khách' : 'guests'}</span>
                      <span className="font-mono text-stone-500">
                        {new Date(res.reservationTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick buttons */}
          <div className="border-t border-[#5C1A24]/30 pt-4 flex gap-2">
            <button
              onClick={() => onNavigateToTab('checkin')}
              className="flex-1 py-2.5 bg-[#4A0E0E] hover:bg-[#631414] text-amber-200 border border-[#D4AF37]/30 text-xs font-semibold rounded uppercase tracking-wider transition-all"
            >
              {lang === 'vi' ? 'Check-in VIP' : 'CRM Check-In'}
            </button>
            <button
              onClick={() => onNavigateToTab('reservations')}
              className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 hover:brightness-110 text-xs font-bold rounded uppercase tracking-wider transition-all shadow-md"
            >
              {lang === 'vi' ? 'Đặt Bàn' : 'Bookings'}
            </button>
          </div>
        </div>

      </div>

      {/* ── Recent VIP Check-Ins List ── */}
      <div className="bg-[#380F12] border border-[#5C1A24]/60 p-6 rounded-lg shadow-lg space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-amber-200 border-b border-[#5C1A24]/40 pb-3">
          {lang === 'vi' ? 'Hoạt Động VIP Gần Đây (CRM Activity Log)' : 'VIP Concierge Recent Activities'}
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1E0505] text-stone-400 font-semibold border-b border-[#5C1A24]/40 uppercase tracking-wider">
                <th className="px-4 py-3">{lang === 'vi' ? 'Thực khách' : 'Guest Name'}</th>
                <th className="px-4 py-3">{lang === 'vi' ? 'Hạng thành viên' : 'VIP Tag'}</th>
                <th className="px-4 py-3 text-center">{lang === 'vi' ? 'Tổng số lượt ghé' : 'Total Visits'}</th>
                <th className="px-4 py-3">{lang === 'vi' ? 'Trạng thái tối nay' : 'Tonight Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#5C1A24]/20 text-stone-300">
              {customers
                .filter(c => c.vipTag !== 'STANDARD')
                .slice(0, 4)
                .map((vip) => {
                  const checkinToday = reservations.some(
                    r => r.customerPhone === (vip as any).phoneNumber && r.status === 'SEATED'
                  );
                  return (
                    <tr key={vip.id} className="hover:bg-[#4A0E0E]/15 transition-colors">
                      <td className="px-4 py-3 font-bold text-amber-100">{vip.fullName}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                          vip.vipTag === 'CELEB' ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white' :
                          vip.vipTag === 'VVIP' ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white' :
                          'bg-amber-600 text-white'
                        }`}>
                          {vip.vipTag}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-amber-400 font-mono">{vip.visitCount}</td>
                      <td className="px-4 py-3 flex items-center gap-1.5 font-medium">
                        {checkinToday ? (
                          <>
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                            <span className="text-emerald-400">{lang === 'vi' ? 'Đang phục vụ tại bàn' : 'In House (Seated)'}</span>
                          </>
                        ) : (
                          <>
                            <span className="h-2.5 w-2.5 rounded-full bg-stone-700 inline-block" />
                            <span className="text-stone-500">{lang === 'vi' ? 'Chưa ghé hôm nay' : 'Offline / Expected'}</span>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
