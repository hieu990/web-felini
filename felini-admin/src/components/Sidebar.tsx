import type { ComponentType } from 'react';
import { Wine, LayoutDashboard, UserCheck, Calendar, ChefHat, Users, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: 'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers';
  setActiveTab: (tab: 'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers') => void;
  pendingReservationsCount: number;
  onLogout: () => void;
}

interface TabItem {
  id: 'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers';
  label: string;
  icon: ComponentType<any>;
  badge?: number;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  pendingReservationsCount,
  onLogout
}: SidebarProps) {
  const tabs: TabItem[] = [
    { id: 'dashboard', label: 'Dashboard Tổng quan', icon: LayoutDashboard },
    { id: 'checkin', label: 'Check-In Thực Khách', icon: UserCheck },
    {
      id: 'reservations',
      label: 'Quản Lý Đặt Bàn',
      icon: Calendar,
      badge: pendingReservationsCount > 0 ? pendingReservationsCount : undefined
    },
    { id: 'menu', label: 'Quản Lý Thực Đơn', icon: ChefHat },
    { id: 'customers', label: 'Hồ Sơ Thực Khách', icon: Users },
  ];


  return (
    <aside className="w-64 bg-[#1E0505] border-r border-[#4A0E0E] flex flex-col shrink-0 font-sans">
      {/* Brand header */}
      <div className="p-6 border-b border-[#4A0E0E] flex flex-col items-center">
        <h1 className="text-xl font-bold tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
          <Wine className="text-[#D4AF37]" /> FELLINI
        </h1>
        <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">Lounge & Concierge</span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium tracking-wide transition-all text-left ${
                isActive
                  ? 'bg-[#4A0E0E] text-[#D4AF37] border-l-4 border-[#D4AF37]'
                  : 'text-stone-300 hover:bg-[#2D0A0A] hover:text-[#D4AF37]'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1">{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="ml-auto bg-amber-500 text-stone-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Logout & Footer */}
      <div className="p-4 border-t border-[#4A0E0E] space-y-3">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-950/40 hover:bg-red-950/80 border border-red-900/40 text-red-300 hover:text-red-200 text-xs font-semibold rounded transition-colors uppercase tracking-wider"
        >
          <LogOut size={14} />
          Đăng xuất hệ thống
        </button>
        <div className="text-[10px] text-stone-500 text-center">
          <p>Fellini Admin Portal v1.5</p>
          <p className="mt-0.5">Connected to local node</p>
        </div>
      </div>
    </aside>
  );
}
