import { useState } from 'react';
import { RefreshCw, Globe, Server } from 'lucide-react';

interface HeaderProps {
  activeTab: 'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers';
  onSync: () => void;
  lang: 'vi' | 'en';
  setLang: (lang: 'vi' | 'en') => void;
}

const TAB_TITLES_VI = {
  dashboard: 'Bảng Điều Khiển Tổng Quan',
  checkin: 'CRM - Check-In Thực Khách',
  reservations: 'Quản Lý Đặt Bàn & Sắp Xếp',
  menu: 'Danh Mục Thực Đơn Nhà Hàng',
  customers: 'Cơ Sở Dữ Liệu Thực Khách VIP',
};

const TAB_TITLES_EN = {
  dashboard: 'Dashboard Analytics',
  checkin: 'CRM - Customer Check-In',
  reservations: 'Reservations & Table Layout',
  menu: 'Restaurant Menu Directory',
  customers: 'VIP Customer CRM Database',
};

export default function Header({ activeTab, onSync, lang, setLang }: HeaderProps) {
  const [syncing, setSyncing] = useState(false);

  const handleSyncClick = () => {
    setSyncing(true);
    onSync();
    setTimeout(() => {
      setSyncing(false);
    }, 800);
  };

  const formattedDate = new Date().toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="h-16 border-b border-[#4A0E0E] bg-[#1E0505] flex items-center justify-between px-8 shrink-0 font-sans">
      <div className="flex items-center gap-4">
        <h2 className="text-base font-bold uppercase tracking-wider text-amber-200">
          {lang === 'vi' ? TAB_TITLES_VI[activeTab] : TAB_TITLES_EN[activeTab]}
        </h2>
        {/* Sync Status Badge */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-[#2D0A0A] rounded-full border border-[#5C1A24]/60 text-[10px] text-stone-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="flex items-center gap-1 font-mono">
            <Server size={10} />
            Live Sync
          </span>
          <button
            onClick={handleSyncClick}
            className="hover:text-amber-300 transition-colors"
            title="Đồng bộ thủ công"
          >
            <RefreshCw size={10} className={syncing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Current Date */}
        <div className="text-xs text-stone-400 font-medium hidden md:block">
          {formattedDate}
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-1.5 bg-[#2D0A0A] p-1 rounded-md border border-[#5C1A24]/60">
          <button
            onClick={() => setLang('vi')}
            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
              lang === 'vi' ? 'bg-[#D4AF37] text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            VI
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
              lang === 'en' ? 'bg-[#D4AF37] text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            EN
          </button>
          <Globe size={11} className="text-stone-500 mx-1" />
        </div>
      </div>
    </header>
  );
}
