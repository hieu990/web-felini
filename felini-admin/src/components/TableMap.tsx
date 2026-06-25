import { Check, Info } from 'lucide-react';

interface Reservation {
  id: string;
  customerName: string;
  tableNumber: string | null;
  status: string;
}

interface TableMapProps {
  selectedTable: string;
  onSelectTable: (tableNum: string) => void;
  activeReservations: Reservation[];
}

interface TableInfo {
  id: string;
  label: string;
  zone: 'Main' | 'Garden' | 'VIP';
  capacity: number;
}

const TABLES: TableInfo[] = [
  // Main Room
  { id: 'M01', label: 'Bàn M01', zone: 'Main', capacity: 2 },
  { id: 'M02', label: 'Bàn M02', zone: 'Main', capacity: 2 },
  { id: 'M03', label: 'Bàn M03', zone: 'Main', capacity: 4 },
  { id: 'M04', label: 'Bàn M04', zone: 'Main', capacity: 4 },
  { id: 'M05', label: 'Bàn M05', zone: 'Main', capacity: 4 },
  { id: 'M06', label: 'Bàn M06', zone: 'Main', capacity: 6 },
  { id: 'M07', label: 'Bàn M07', zone: 'Main', capacity: 8 },
  
  // Garden Room
  { id: 'G01', label: 'Sân G01', zone: 'Garden', capacity: 2 },
  { id: 'G02', label: 'Sân G02', zone: 'Garden', capacity: 4 },
  { id: 'G03', label: 'Sân G03', zone: 'Garden', capacity: 4 },
  { id: 'G04', label: 'Sân G04', zone: 'Garden', capacity: 6 },
  { id: 'G05', label: 'Sân G05', zone: 'Garden', capacity: 6 },

  // VIP Room
  { id: 'V01', label: 'VIP V01', zone: 'VIP', capacity: 6 },
  { id: 'V02', label: 'VIP V02', zone: 'VIP', capacity: 8 },
  { id: 'V03', label: 'VIP V03', zone: 'VIP', capacity: 10 },
  { id: 'V04', label: 'VIP V04', zone: 'VIP', capacity: 12 },
];

export default function TableMap({ selectedTable, onSelectTable, activeReservations }: TableMapProps) {
  // Get occupancy status for all tables
  const getTableStatus = (tableId: string) => {
    const activeRes = activeReservations.find(
      r => r.tableNumber === tableId && r.status !== 'CANCELLED' && r.status !== 'COMPLETED'
    );
    if (!activeRes) return { status: 'vacant', res: null };
    if (activeRes.status === 'SEATED') return { status: 'seated', res: activeRes };
    return { status: 'reserved', res: activeRes };
  };

  const renderZone = (zone: 'Main' | 'Garden' | 'VIP', title: string, bgClass: string, borderClass: string) => {
    const zoneTables = TABLES.filter(t => t.zone === zone);

    return (
      <div className={`p-4 rounded-lg border ${bgClass} ${borderClass} space-y-3`}>
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-200">{title}</h4>
          <span className="text-[10px] text-stone-400 font-mono">{zoneTables.length} Bàn</span>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-2">
          {zoneTables.map((table) => {
            const { status, res } = getTableStatus(table.id);
            const isSelected = selectedTable === table.id;

            let statusColor = 'bg-green-950 border-green-800 text-green-300 hover:bg-green-900/60';
            if (status === 'seated') {
              statusColor = 'bg-red-950 border-red-900 text-red-300 cursor-not-allowed';
            } else if (status === 'reserved') {
              statusColor = 'bg-amber-950 border-amber-800 text-amber-300 hover:bg-amber-900/40';
            }

            if (isSelected) {
              statusColor = 'bg-gradient-to-b from-amber-500 to-amber-600 border-[#D4AF37] text-stone-900 shadow-md font-bold';
            }

            return (
              <button
                key={table.id}
                type="button"
                onClick={() => {
                  if (status !== 'seated') {
                    onSelectTable(table.id === selectedTable ? '' : table.id);
                  }
                }}
                className={`p-3 rounded border text-center transition-all flex flex-col items-center justify-between text-xs min-h-[64px] ${statusColor}`}
                title={res ? `Khách: ${res.customerName} (${res.status})` : `Bàn trống cho ${table.capacity} khách`}
              >
                <div className="font-bold flex items-center gap-1">
                  {table.id}
                  {isSelected && <Check size={10} className="stroke-[3]" />}
                </div>
                <div className="text-[9px] opacity-75 font-medium">
                  {status === 'seated' && 'Đang ngồi'}
                  {status === 'reserved' && 'Đặt trước'}
                  {status === 'vacant' && `${table.capacity} chỗ`}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Sơ đồ bàn ảo Fellini (Click để chọn bàn)
        </span>
        {selectedTable && (
          <span className="text-xs text-amber-400 font-bold bg-[#4A0E0E] px-2 py-0.5 rounded border border-[#D4AF37]/35">
            Đang chọn bàn: {selectedTable}
          </span>
        )}
      </div>

      <div className="space-y-4">
        {renderZone('VIP', '🥂 VIP Lounge (Phòng Riêng)', 'bg-[#3A0A0E]/30', 'border-purple-900/30')}
        {renderZone('Main', '🍽️ Dining Hall (Phòng Chính)', 'bg-[#1E0505]', 'border-[#5C1A24]/40')}
        {renderZone('Garden', '🌿 Garden Patio (Sân Vườn)', 'bg-emerald-950/5', 'border-emerald-900/20')}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-[10px] text-stone-400 bg-[#1E0505] p-2.5 rounded border border-[#5C1A24]/40">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-green-950 border border-green-800" />
          <span>Trống (Vacant)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-amber-950 border border-amber-800" />
          <span>Đã Đặt (Reserved)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-red-950 border border-red-900" />
          <span>Đang Ngồi (Seated)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-gradient-to-r from-amber-400 to-amber-600 border border-[#D4AF37]" />
          <span>Lựa chọn của bạn</span>
        </div>
        <div className="ml-auto flex items-center gap-1 text-[9px] text-stone-500">
          <Info size={10} />
          Bàn đang dùng bữa (Seated) tạm khóa không cho đặt trùng.
        </div>
      </div>
    </div>
  );
}
