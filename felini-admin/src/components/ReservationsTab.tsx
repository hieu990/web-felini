import { Calendar as CalendarIcon, Plus, Clock, Phone, Users, Trash2, X } from 'lucide-react';
import TableMap from './TableMap';

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  reservationTime: string;
  numberOfGuests: number;
  tableNumber: string | null;
  status: string;
  specialRequests: string | null;
  notes: string | null;
}

interface ReservationsTabProps {
  reservations: Reservation[];
  resStatusFilter: string;
  setResStatusFilter: (val: string) => void;
  resDateFilter: string;
  setResDateFilter: (val: string) => void;
  setShowAddResModal: (show: boolean) => void;
  editingTableResId: string | null;
  setEditingTableResId: (id: string | null) => void;
  tempTableNumber: string;
  setTempTableNumber: (num: string) => void;
  saveTableAssignment: (id: string) => void;
  handleUpdateResStatus: (id: string, status: string, phone?: string) => void;
  handleDeleteRes: (id: string) => void;
  lang: 'vi' | 'en';
}

export default function ReservationsTab({
  reservations,
  resStatusFilter,
  setResStatusFilter,
  resDateFilter,
  setResDateFilter,
  setShowAddResModal,
  editingTableResId,
  setEditingTableResId,
  tempTableNumber,
  setTempTableNumber,
  saveTableAssignment,
  handleUpdateResStatus,
  handleDeleteRes,
  lang
}: ReservationsTabProps) {
  return (
    <div className="space-y-6 font-sans animate-in fade-in duration-200">
      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#380F12] border border-[#5C1A24] p-4 rounded shadow-md">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={resStatusFilter}
            onChange={(e) => setResStatusFilter(e.target.value)}
            className="px-3 py-2 bg-[#1E0505] border border-[#5C1A24] text-stone-200 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-all"
          >
            <option value="">{lang === 'vi' ? 'Tất cả trạng thái' : 'All Status'}</option>
            <option value="PENDING">Chờ xác nhận (Pending)</option>
            <option value="CONFIRMED">Đã xác nhận (Confirmed)</option>
            <option value="SEATED">Đã xếp bàn (Seated)</option>
            <option value="COMPLETED">Hoàn tất (Completed)</option>
            <option value="CANCELLED">Đã hủy (Cancelled)</option>
          </select>

          <input
            type="date"
            value={resDateFilter}
            onChange={(e) => setResDateFilter(e.target.value)}
            className="px-3 py-2 bg-[#1E0505] border border-[#5C1A24] text-stone-200 text-sm rounded focus:outline-none focus:border-[#D4AF37] transition-all"
          />
          
          {(resStatusFilter || resDateFilter) && (
            <button
              onClick={() => { setResStatusFilter(''); setResDateFilter(''); }}
              className="text-xs text-amber-400 hover:underline flex items-center"
            >
              {lang === 'vi' ? 'Xóa bộ lọc' : 'Clear Filters'}
            </button>
          )}
        </div>

        <button
          onClick={() => setShowAddResModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-stone-900 rounded text-sm font-bold uppercase tracking-wider transition-colors shadow-md"
        >
          <Plus size={16} />
          {lang === 'vi' ? 'Nhận Đặt Bàn Mới' : 'Accept New Booking'}
        </button>
      </div>

      {/* Visual Table Editor Panel when editing Table Assignment */}
      {editingTableResId && (
        <div className="bg-[#380F12] border border-[#D4AF37]/50 p-6 rounded-lg shadow-lg space-y-4 animate-in slide-in-from-top duration-250">
          <div className="flex items-center justify-between border-b border-[#5C1A24]/60 pb-3">
            <div>
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-widest">
                {lang === 'vi' ? 'Sắp Xếp Bàn Ăn Cho Khách' : 'Assign Dining Table Layout'}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {lang === 'vi' ? 'Chọn bàn trống từ sơ đồ phía dưới cho khách:' : 'Select an available table layout below for guest:'}{' '}
                <strong className="text-amber-100">
                  {reservations.find(r => r.id === editingTableResId)?.customerName}
                </strong>
              </p>
            </div>
            <button
              onClick={() => setEditingTableResId(null)}
              className="text-stone-400 hover:text-stone-200"
            >
              <X size={18} />
            </button>
          </div>

          <TableMap
            selectedTable={tempTableNumber}
            onSelectTable={setTempTableNumber}
            activeReservations={reservations}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setEditingTableResId(null)}
              className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] text-xs text-stone-400 rounded transition-colors"
            >
              {lang === 'vi' ? 'Hủy bỏ' : 'Cancel'}
            </button>
            <button
              onClick={() => saveTableAssignment(editingTableResId)}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 text-xs font-bold rounded uppercase tracking-wider shadow-md transition-all"
            >
              {lang === 'vi' ? 'Xác Nhận Xếp Bàn' : 'Confirm Assignment'}
            </button>
          </div>
        </div>
      )}

      {/* Reservations Grid */}
      {reservations.length === 0 ? (
        <div className="bg-[#380F12]/30 border border-[#5C1A24] p-12 text-center rounded-lg">
          <CalendarIcon size={48} className="mx-auto text-stone-600 mb-2" />
          <h4 className="text-stone-300 font-bold">{lang === 'vi' ? 'Không tìm thấy yêu cầu đặt bàn nào' : 'No reservations found'}</h4>
          <p className="text-xs text-stone-500 mt-1">{lang === 'vi' ? 'Thay đổi bộ lọc hoặc thêm mới đặt bàn.' : 'Adjust filter query or add new booking.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((res) => (
            <div
              key={res.id}
              className={`bg-[#380F12] border p-5 rounded-lg shadow-md relative flex flex-col justify-between transition-all ${
                res.status === 'PENDING' ? 'border-amber-500/40 shadow-amber-950/10' :
                res.status === 'CONFIRMED' ? 'border-blue-500/30' :
                res.status === 'SEATED' ? 'border-green-500/40 bg-[#2b1618]' :
                'border-[#5C1A24]/30'
              }`}
            >
              {/* Top bar status */}
              <div className="flex items-center justify-between mb-3 border-b border-[#5C1A24]/60 pb-2">
                <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                  res.status === 'PENDING' ? 'bg-amber-600 text-amber-100' :
                  res.status === 'CONFIRMED' ? 'bg-blue-700 text-blue-100' :
                  res.status === 'SEATED' ? 'bg-green-700 text-green-100' :
                  res.status === 'COMPLETED' ? 'bg-stone-700 text-stone-300' :
                  'bg-red-950/40 text-red-400 border border-red-900/30'
                }`}>
                  {res.status === 'PENDING' && (lang === 'vi' ? 'Chờ duyệt' : 'Pending')}
                  {res.status === 'CONFIRMED' && (lang === 'vi' ? 'Đã duyệt' : 'Approved')}
                  {res.status === 'SEATED' && (lang === 'vi' ? 'Đã ngồi bàn' : 'Seated')}
                  {res.status === 'COMPLETED' && (lang === 'vi' ? 'Đã xong' : 'Completed')}
                  {res.status === 'CANCELLED' && (lang === 'vi' ? 'Hủy bỏ' : 'Cancelled')}
                </span>
                <div className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                  <Clock size={11} />
                  {new Date(res.reservationTime).toLocaleTimeString(lang === 'vi' ? 'vi-VN' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                  {' - '}
                  {new Date(res.reservationTime).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit' })}
                </div>
              </div>

              {/* Guest details */}
              <div className="space-y-2 mb-4">
                <div className="font-bold text-base text-amber-100">{res.customerName}</div>
                <div className="text-xs text-stone-400 flex items-center gap-2">
                  <span className="flex items-center gap-1"><Phone size={11} /> {res.customerPhone}</span>
                  <span className="text-stone-700">|</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {res.numberOfGuests} {lang === 'vi' ? 'khách' : 'guests'}</span>
                </div>
                {res.specialRequests && (
                  <div className="bg-[#1E0505] p-2.5 rounded text-xs border border-amber-900/20 text-amber-300 leading-normal">
                    <strong>{lang === 'vi' ? 'Ghi chú đặt:' : 'Special requests:'}</strong> {res.specialRequests}
                  </div>
                )}
                {res.notes && (
                  <div className="text-[11px] text-stone-400 italic">
                    💡 {res.notes}
                  </div>
                )}

                {/* Table Number Area */}
                <div className="mt-3 pt-2 border-t border-[#5C1A24]/30 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-medium">{lang === 'vi' ? 'Bàn số:' : 'Assigned Table:'}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-amber-400 font-mono">
                      {res.tableNumber || (lang === 'vi' ? 'Chưa xếp' : 'Not assigned')}
                    </span>
                    {res.status !== 'CANCELLED' && res.status !== 'COMPLETED' && (
                      <button
                        onClick={() => {
                          setEditingTableResId(res.id);
                          setTempTableNumber(res.tableNumber || '');
                        }}
                        className="text-[10px] text-stone-400 hover:text-amber-300 underline font-semibold transition-colors"
                      >
                        {lang === 'vi' ? 'Xếp bàn' : 'Assign layout'}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2 border-t border-[#5C1A24]/40 pt-3">
                {res.status === 'PENDING' && (
                  <>
                    <button
                      onClick={() => handleUpdateResStatus(res.id, 'CONFIRMED')}
                      className="flex-1 py-1.5 bg-[#D4AF37] hover:brightness-110 text-stone-900 font-bold rounded text-xs uppercase transition-all"
                    >
                      {lang === 'vi' ? 'Xác Nhận' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleUpdateResStatus(res.id, 'CANCELLED')}
                      className="px-2.5 py-1.5 bg-red-950 hover:bg-red-900 border border-red-800/40 text-red-400 rounded text-xs transition-colors"
                    >
                      {lang === 'vi' ? 'Hủy' : 'Reject'}
                    </button>
                  </>
                )}

                {res.status === 'CONFIRMED' && (
                  <>
                    <button
                      onClick={() => handleUpdateResStatus(res.id, 'SEATED', res.customerPhone)}
                      className="flex-1 py-1.5 bg-green-750 hover:bg-green-700 text-stone-100 font-bold rounded text-xs uppercase transition-all"
                    >
                      {lang === 'vi' ? 'Khách Đã Đến / Xếp Ngồi' : 'Seated Guest'}
                    </button>
                    <button
                      onClick={() => handleUpdateResStatus(res.id, 'CANCELLED')}
                      className="px-2.5 py-1.5 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800/30 rounded text-xs transition-colors"
                    >
                      {lang === 'vi' ? 'Bỏ' : 'Cancel'}
                    </button>
                  </>
                )}

                {res.status === 'SEATED' && (
                  <button
                    onClick={() => handleUpdateResStatus(res.id, 'COMPLETED')}
                    className="flex-1 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold rounded text-xs uppercase transition-all"
                  >
                    {lang === 'vi' ? 'Hoàn Tất Bữa Ăn' : 'Complete Meal'}
                  </button>
                )}

                <button
                  onClick={() => handleDeleteRes(res.id)}
                  className="p-1.5 hover:text-red-400 text-stone-500 ml-auto rounded hover:bg-[#1E0505] transition-colors"
                  title="Xóa đặt bàn"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
