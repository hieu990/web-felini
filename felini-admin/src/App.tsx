import { useState, useEffect } from 'react';
import {
  X, AlertCircle, CheckCircle
} from 'lucide-react';

import LoginScreen from './components/LoginScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardTab from './components/DashboardTab';
import CheckinTab from './components/CheckinTab';
import ReservationsTab from './components/ReservationsTab';
import MenuTab from './components/MenuTab';
import CustomersTab from './components/CustomersTab';
import CustomConfirmModal from './components/CustomConfirmModal';
import TableMap from './components/TableMap';
import ImageUploader from './components/ImageUploader';


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

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
  vipTag: string; // VIP, VVIP, CELEB, STANDARD
  preferences: ICustomerPreferences;
  visitCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Reservation {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  reservationTime: string;
  numberOfGuests: number;
  tableNumber: string | null;
  status: string; // PENDING, CONFIRMED, SEATED, COMPLETED, CANCELLED
  specialRequests: string | null;
  notes: string | null;
}

interface MenuItem {
  id: string;
  nameEn: string;
  nameVi: string;
  descriptionEn: string | null;
  descriptionVi: string | null;
  price: number;
  category: string; // APPETIZERS, MAINS, DESSERTS, DRINKS, WINES
  subCategory: string | null;
  isAvailable: boolean;
  imageUrl: string | null;
}

const SUB_CATS: Record<string, string[]> = {
  '': [],
  'APPETIZERS': ['Antipasti'],
  'MAINS': ['Penne', 'Rigatoni', 'Spaghetti', 'Tagliatelle', 'Secondi'],
  'DESSERTS': ['Dolci'],
  'DRINKS': ['Soft Drinks', 'Juices', 'Beer & Mocktails', 'Cocktails & Spirits', 'Coffee & Tea'],
  'WINES': ['Red Wine', 'White Wine'],
};

const CAT_LABELS: Record<string, string> = {
  '': 'Tất cả',
  'APPETIZERS': '🥗 Khai Vị',
  'MAINS': '🍝 Món Chính',
  'DESSERTS': '🍮 Tráng Miệng',
  'DRINKS': '🥂 Đồ Uống',
  'WINES': '🍷 Rượu Vang',
};

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('fellini-admin-session-token'));
  const [activeTab, setActiveTab] = useState<'dashboard' | 'checkin' | 'reservations' | 'menu' | 'customers'>('dashboard');
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // State definitions
  // 1. Check-in states
  const [checkInSearch, setCheckInSearch] = useState('');
  const [checkedInCustomer, setCheckedInCustomer] = useState<Customer | null>(null);
  const [checkInError, setCheckInError] = useState('');
  
  // 2. Add customer form
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerVip, setNewCustomerVip] = useState('STANDARD');
  const [newCustomerPrefs, setNewCustomerPrefs] = useState<ICustomerPreferences>({
    allergies: [],
    favoriteWine: [],
    seatingPreference: '',
    dietaryNotes: '',
    specialNotes: '',
  });

  // 3. Customers database state
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState('');
  const [selectedVipFilter, setSelectedVipFilter] = useState('');
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  // 4. Reservations state
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [resStatusFilter, setResStatusFilter] = useState('');
  const [resDateFilter, setResDateFilter] = useState('');
  const [showAddResModal, setShowAddResModal] = useState(false);
  const [newRes, setNewRes] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    reservationTime: '',
    numberOfGuests: 2,
    tableNumber: '',
    specialRequests: '',
    notes: '',
  });
  const [editingTableResId, setEditingTableResId] = useState<string | null>(null);
  const [tempTableNumber, setTempTableNumber] = useState('');

  // 5. Menu state
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedMenuCategory, setSelectedMenuCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);
  
  const [newMenuItem, setNewMenuItem] = useState({
    nameEn: '',
    nameVi: '',
    descriptionEn: '',
    descriptionVi: '',
    category: 'MAINS',
    subCategory: 'Penne',
    isAvailable: true,
    imageUrl: '',
  });
  const [newMenuItemPriceRaw, setNewMenuItemPriceRaw] = useState('');
  const [newMenuItemCustomSub, setNewMenuItemCustomSub] = useState('');
  const [showCustomSubField, setShowCustomSubField] = useState(false);

  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [editingMenuItemPriceRaw, setEditingMenuItemPriceRaw] = useState('');
  const [editingMenuItemCustomSub, setEditingMenuItemCustomSub] = useState('');
  const [showEditCustomSubField, setShowEditCustomSubField] = useState(false);

  // 6. Custom Confirm Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // Fetch initial data
  useEffect(() => {
    if (token) {
      fetchCustomers();
      fetchReservations();
      fetchMenuItems();
    }
  }, [token]);

  // Fetch functions
  const fetchCustomers = async () => {
    try {
      let url = `${API_BASE}/customers`;
      const params = [];
      if (customerSearchQuery) params.push(`search=${encodeURIComponent(customerSearchQuery)}`);
      if (selectedVipFilter) params.push(`vipTag=${encodeURIComponent(selectedVipFilter)}`);
      if (params.length) url += `?${params.join('&')}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setCustomers(data);
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  const fetchReservations = async () => {
    try {
      let url = `${API_BASE}/reservations`;
      const params = [];
      if (resStatusFilter) params.push(`status=${encodeURIComponent(resStatusFilter)}`);
      if (resDateFilter) params.push(`date=${encodeURIComponent(resDateFilter)}`);
      if (params.length) url += `?${params.join('&')}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setReservations(data);
      }
    } catch (err) {
      console.error('Error fetching reservations:', err);
    }
  };

  const fetchMenuItems = async () => {
    try {
      let url = `${API_BASE}/menu`;
      if (selectedMenuCategory) url += `?category=${encodeURIComponent(selectedMenuCategory)}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (err) {
      console.error('Error fetching menu items:', err);
    }
  };

  // Trigger search on filter/query changes
  useEffect(() => {
    if (token) fetchCustomers();
  }, [customerSearchQuery, selectedVipFilter]);

  useEffect(() => {
    if (token) fetchReservations();
  }, [resStatusFilter, resDateFilter]);

  useEffect(() => {
    if (token) fetchMenuItems();
  }, [selectedMenuCategory]);

  // Sync refresh helper
  const handleLiveSync = () => {
    fetchCustomers();
    fetchReservations();
    fetchMenuItems();
    showToast(lang === 'vi' ? 'Đã đồng bộ dữ liệu thời gian thực!' : 'Data synced with server!', 'success');
  };

  // Autorefresh every 15 seconds to simulate websocket sync
  useEffect(() => {
    if (!token) return;
    const interval = setInterval(() => {
      fetchCustomers();
      fetchReservations();
      fetchMenuItems();
    }, 15000);
    return () => clearInterval(interval);
  }, [token]);

  // Handle Login Success
  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('fellini-admin-session-token', newToken);
    setToken(newToken);
    showToast(lang === 'vi' ? 'Đăng nhập thành công!' : 'Authentication success!', 'success');
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('fellini-admin-session-token');
    setToken(null);
    setCheckedInCustomer(null);
    setCheckInSearch('');
    showToast(lang === 'vi' ? 'Đã đăng xuất hệ thống!' : 'Logged out successfully!', 'info');
  };

  // Handlers
  // 1. Quick Check-In Search
  const handleCheckInSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInSearch.trim()) return;
    setCheckInError('');
    try {
      const res = await fetch(`${API_BASE}/customers/check-in?search=${encodeURIComponent(checkInSearch.trim())}`);
      if (res.ok) {
        const customer = await res.json();
        setCheckedInCustomer(customer);
        showToast(
          lang === 'vi' ? `Check-in thành công thực khách: ${customer.fullName}!` : `Check-in success: ${customer.fullName}!`,
          'success'
        );
        fetchCustomers();
      } else {
        const err = await res.json();
        setCheckedInCustomer(null);
        setCheckInError(err.message || (lang === 'vi' ? 'Không tìm thấy thực khách' : 'Guest profile not found'));
        showToast(lang === 'vi' ? 'Không tìm thấy hồ sơ thực khách.' : 'VIP guest not found.', 'error');
      }
    } catch (err) {
      setCheckedInCustomer(null);
      setCheckInError(lang === 'vi' ? 'Lỗi kết nối đến Server.' : 'Server connection failed.');
      showToast(lang === 'vi' ? 'Lỗi kết nối server.' : 'Network error.', 'error');
    }
  };

  // Recheck-in button
  const triggerReCheckIn = async (customer: Customer) => {
    try {
      const res = await fetch(`${API_BASE}/customers/check-in?search=${encodeURIComponent(customer.phoneNumber || customer.email || '')}`);
      if (res.ok) {
        const data = await res.json();
        setCheckedInCustomer(data);
        showToast(
          lang === 'vi' ? `Tăng lượt ghé thăm cho ${customer.fullName}! Tổng cộng: ${data.visitCount}` : `Updated visit count for ${customer.fullName}! Total: ${data.visitCount}`,
          'success'
        );
        fetchCustomers();
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Không thể cập nhật lượt check-in.' : 'Could not check in.', 'error');
    }
  };

  // Save Preferences from Check-in detail panel
  const savePreferences = async (customerId: string, prefs: ICustomerPreferences) => {
    try {
      const res = await fetch(`${API_BASE}/customers/${customerId}/preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs)
      });
      if (res.ok) {
        const updated = await res.json();
        setCheckedInCustomer(updated);
        showToast(lang === 'vi' ? 'Đã lưu thông tin sở thích thành công.' : 'Preferences saved successfully.', 'success');
        fetchCustomers();
      } else {
        showToast(lang === 'vi' ? 'Lỗi lưu thông tin.' : 'Error saving preference.', 'error');
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi kết nối.' : 'Connection failure.', 'error');
    }
  };

  // 2. Add New Customer
  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/customers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newCustomerName,
          phoneNumber: newCustomerPhone || null,
          email: newCustomerEmail || null,
          vipTag: newCustomerVip,
          preferences: newCustomerPrefs
        })
      });
      if (res.ok) {
        const created = await res.json();
        showToast(lang === 'vi' ? `Đã tạo hồ sơ cho khách hàng: ${created.fullName}` : `Created VIP profile: ${created.fullName}`, 'success');
        setShowAddCustomerModal(false);
        // Reset form
        setNewCustomerName('');
        setNewCustomerPhone('');
        setNewCustomerEmail('');
        setNewCustomerVip('STANDARD');
        setNewCustomerPrefs({ allergies: [], favoriteWine: [], seatingPreference: '', dietaryNotes: '', specialNotes: '' });
        fetchCustomers();
        // Auto fill search checkin
        if (created.phoneNumber) {
          setCheckInSearch(created.phoneNumber);
          setCheckedInCustomer(created);
        }
      } else {
        showToast(lang === 'vi' ? 'Lỗi khi lưu khách hàng mới.' : 'Could not save guest profile.', 'error');
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi kết nối server.' : 'Server connection error.', 'error');
    }
  };

  // Update Customer Profile
  const handleUpdateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    try {
      const res = await fetch(`${API_BASE}/customers/${editingCustomer.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCustomer)
      });
      if (res.ok) {
        showToast(lang === 'vi' ? 'Hồ sơ khách hàng đã được cập nhật.' : 'VIP profile updated.', 'success');
        setEditingCustomer(null);
        fetchCustomers();
        if (checkedInCustomer && checkedInCustomer.id === editingCustomer.id) {
          setCheckedInCustomer(editingCustomer);
        }
      } else {
        showToast(lang === 'vi' ? 'Lỗi cập nhật.' : 'Update error.', 'error');
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi kết nối.' : 'Network connection failure.', 'error');
    }
  };

  // Delete Customer Profile
  const handleDeleteCustomer = (id: string) => {
    const cust = customers.find(c => c.id === id);
    triggerConfirm(
      lang === 'vi' ? 'Xác nhận xóa hồ sơ khách VIP' : 'Confirm VIP profile delete',
      lang === 'vi' 
        ? `Bạn có chắc chắn muốn xóa hồ sơ của khách VIP "${cust?.fullName}" khỏi hệ thống?`
        : `Are you sure you want to delete VIP profile "${cust?.fullName}"? This action is irreversible.`,
      async () => {
        try {
          const res = await fetch(`${API_BASE}/customers/${id}`, { method: 'DELETE' });
          if (res.ok) {
            showToast(lang === 'vi' ? 'Đã xóa hồ sơ khách hàng.' : 'Deleted guest profile.', 'info');
            fetchCustomers();
            if (checkedInCustomer?.id === id) setCheckedInCustomer(null);
          }
        } catch (err) {
          showToast(lang === 'vi' ? 'Lỗi kết nối.' : 'Connection failed.', 'error');
        }
      }
    );
  };

  // 3. Create Reservation
  const handleAddReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newRes,
          customerEmail: newRes.customerEmail || null,
          tableNumber: newRes.tableNumber || null,
          specialRequests: newRes.specialRequests || null,
          notes: newRes.notes || null,
        })
      });
      if (res.ok) {
        showToast(lang === 'vi' ? 'Tạo đặt bàn mới thành công!' : 'Created new table booking!', 'success');
        setShowAddResModal(false);
        setNewRes({
          customerName: '',
          customerPhone: '',
          customerEmail: '',
          reservationTime: '',
          numberOfGuests: 2,
          tableNumber: '',
          specialRequests: '',
          notes: '',
        });
        fetchReservations();
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi tạo đặt bàn.' : 'Error booking table.', 'error');
    }
  };

  // Update Reservation Status
  const handleUpdateResStatus = async (id: string, status: string, phoneForCheckIn?: string) => {
    try {
      const res = await fetch(`${API_BASE}/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        showToast(
          lang === 'vi' ? `Cập nhật trạng thái đặt bàn sang: ${status}` : `Booking status updated to: ${status}`,
          'success'
        );
        fetchReservations();

        // If status is SEATED, automatically trigger checkin to VIP profile
        if (status === 'SEATED' && phoneForCheckIn) {
          try {
            await fetch(`${API_BASE}/customers/check-in?search=${encodeURIComponent(phoneForCheckIn)}`);
            showToast(lang === 'vi' ? 'Đã tự động check-in hồ sơ VIP thực khách!' : 'Automatically checked in VIP guest profile!', 'success');
            fetchCustomers();
          } catch (e) {
            console.log('Customer profile does not exist yet. Not checking in.');
          }
        }
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi cập nhật trạng thái.' : 'Status update failure.', 'error');
    }
  };

  // Update table assignment
  const saveTableAssignment = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber: tempTableNumber || null })
      });
      if (res.ok) {
        showToast(
          lang === 'vi' ? `Đã xếp bàn số: ${tempTableNumber || 'Chưa xếp'}` : `Assigned table number: ${tempTableNumber || 'None'}`,
          'success'
        );
        setEditingTableResId(null);
        fetchReservations();
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi xếp bàn.' : 'Assignment failure.', 'error');
    }
  };

  // Delete Reservation
  const handleDeleteRes = (id: string) => {
    const resv = reservations.find(r => r.id === id);
    triggerConfirm(
      lang === 'vi' ? 'Hủy bỏ thông tin đặt bàn' : 'Delete reservation request',
      lang === 'vi'
        ? `Bạn có chắc muốn hủy và xóa đặt bàn của khách "${resv?.customerName}" vào lúc ${resv?.reservationTime}?`
        : `Are you sure you want to cancel and delete booking for guest "${resv?.customerName}" at ${resv?.reservationTime}?`,
      async () => {
        try {
          const res = await fetch(`${API_BASE}/reservations/${id}`, { method: 'DELETE' });
          if (res.ok) {
            showToast(lang === 'vi' ? 'Đã hủy thông tin đặt bàn.' : 'Removed reservation log.', 'info');
            fetchReservations();
          }
        } catch (err) {
          showToast(lang === 'vi' ? 'Lỗi kết nối.' : 'Connection error.', 'error');
        }
      }
    );
  };

  // 4. Menu item actions
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalSub = showCustomSubField ? newMenuItemCustomSub : newMenuItem.subCategory;
      const parsedPrice = Number(newMenuItemPriceRaw) / 1000; // Divide by 1000 to match DB schema (e.g. 180 instead of 180000)

      const res = await fetch(`${API_BASE}/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newMenuItem,
          subCategory: finalSub || null,
          price: parsedPrice,
        })
      });
      if (res.ok) {
        showToast(lang === 'vi' ? 'Đã thêm món mới vào thực đơn.' : 'Added new dish to menu catalog.', 'success');
        setShowAddMenuModal(false);
        setNewMenuItem({
          nameEn: '',
          nameVi: '',
          descriptionEn: '',
          descriptionVi: '',
          category: 'MAINS',
          subCategory: 'Penne',
          isAvailable: true,
          imageUrl: '',
        });
        setNewMenuItemPriceRaw('');
        setNewMenuItemCustomSub('');
        setShowCustomSubField(false);
        fetchMenuItems();
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi thêm món.' : 'Failed to add item.', 'error');
    }
  };

  const handleUpdateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenuItem) return;
    try {
      const finalSub = showEditCustomSubField ? editingMenuItemCustomSub : editingMenuItem.subCategory;
      const parsedPrice = Number(editingMenuItemPriceRaw) / 1000; // Divide by 1000

      const res = await fetch(`${API_BASE}/menu/${editingMenuItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingMenuItem,
          subCategory: finalSub || null,
          price: parsedPrice
        })
      });
      if (res.ok) {
        showToast(lang === 'vi' ? 'Đã lưu thay đổi món ăn.' : 'Dish details updated.', 'success');
        setEditingMenuItem(null);
        setEditingMenuItemPriceRaw('');
        setEditingMenuItemCustomSub('');
        setShowEditCustomSubField(false);
        fetchMenuItems();
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi lưu thay đổi.' : 'Error saving updates.', 'error');
    }
  };

  const toggleMenuAvailability = async (item: MenuItem) => {
    try {
      const res = await fetch(`${API_BASE}/menu/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isAvailable: !item.isAvailable })
      });
      if (res.ok) {
        showToast(
          lang === 'vi'
            ? `Đã chuyển trạng thái món sang: ${!item.isAvailable ? 'Còn món' : 'Hết món'}`
            : `Availability updated to: ${!item.isAvailable ? 'In Stock' : 'Out of Stock'}`,
          'info'
        );
        fetchMenuItems();
      }
    } catch (err) {
      showToast(lang === 'vi' ? 'Lỗi thay đổi trạng thái.' : 'Failed to toggle availability.', 'error');
    }
  };

  const handleDeleteMenuItem = (id: string) => {
    const item = menuItems.find(m => m.id === id);
    triggerConfirm(
      lang === 'vi' ? 'Xác nhận xóa món khỏi thực đơn' : 'Remove dish from menu',
      lang === 'vi'
        ? `Bạn có chắc chắn muốn xóa món "${item?.nameVi}" khỏi thực đơn Fellini?`
        : `Are you sure you want to permanently remove "${item?.nameEn}" from the Fellini catalog?`,
      async () => {
        try {
          const res = await fetch(`${API_BASE}/menu/${id}`, { method: 'DELETE' });
          if (res.ok) {
            showToast(lang === 'vi' ? 'Đã xóa món ăn.' : 'Deleted dish log.', 'info');
            fetchMenuItems();
          }
        } catch (err) {
          showToast(lang === 'vi' ? 'Lỗi kết nối.' : 'Connection failure.', 'error');
        }
      }
    );
  };

  // Populate raw price input on edit trigger
  useEffect(() => {
    if (editingMenuItem) {
      setEditingMenuItemPriceRaw((editingMenuItem.price * 1000).toString());
      setEditingMenuItemCustomSub('');
      setShowEditCustomSubField(false);
    }
  }, [editingMenuItem]);

  // VIP priority color mapping helper
  const getVipBadgeClass = (vip: string) => {
    switch (vip) {
      case 'CELEB':
        return 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-purple-900/40 shadow-sm border border-amber-300';
      case 'VVIP':
        return 'bg-gradient-to-r from-red-600 to-amber-500 text-white border border-amber-200';
      case 'VIP':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-stone-700 text-stone-300';
    }
  };

  // Render LoginScreen if not authenticated
  if (!token) {
    return <LoginScreen apiBase={API_BASE} onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-[#2D0A0A] text-stone-100 overflow-hidden font-sans">
      {/* Toast Alert System */}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2.5 px-4.5 py-3 rounded-lg shadow-2xl border transition-all duration-300 animate-in slide-in-from-bottom-4 ${
              toast.type === 'success' ? 'bg-amber-800/90 text-amber-100 border-amber-600/40' :
              toast.type === 'error' ? 'bg-red-950/95 text-red-200 border-red-800/40 animate-shake' :
              'bg-stone-900/90 text-stone-200 border-stone-850'
            }`}
          >
            {toast.type === 'success' && <CheckCircle size={18} className="text-amber-400" />}
            {toast.type === 'error' && <AlertCircle size={18} className="text-red-400" />}
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* SIDEBAR NAVIGATION */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingReservationsCount={reservations.filter(r => r.status === 'PENDING').length}
        onLogout={handleLogout}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#240808] overflow-hidden">
        <Header
          activeTab={activeTab}
          onSync={handleLiveSync}
          lang={lang}
          setLang={setLang}
        />

        {/* Tab content wrapper */}
        <div className="p-8 flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardTab
              customers={customers}
              reservations={reservations}
              menuItems={menuItems}
              onNavigateToTab={setActiveTab}
              lang={lang}
            />
          )}

          {activeTab === 'checkin' && (
            <CheckinTab
              checkInSearch={checkInSearch}
              setCheckInSearch={setCheckInSearch}
              checkedInCustomer={checkedInCustomer}
              setCheckedInCustomer={setCheckedInCustomer}
              checkInError={checkInError}
              handleCheckInSearch={handleCheckInSearch}
              triggerReCheckIn={triggerReCheckIn}
              savePreferences={savePreferences}
              setShowAddCustomerModal={setShowAddCustomerModal}
              setNewCustomerPhone={setNewCustomerPhone}
              getVipBadgeClass={getVipBadgeClass}
              lang={lang}
            />
          )}

          {activeTab === 'reservations' && (
            <ReservationsTab
              reservations={reservations}
              resStatusFilter={resStatusFilter}
              setResStatusFilter={setResStatusFilter}
              resDateFilter={resDateFilter}
              setResDateFilter={setResDateFilter}
              setShowAddResModal={setShowAddResModal}
              editingTableResId={editingTableResId}
              setEditingTableResId={setEditingTableResId}
              tempTableNumber={tempTableNumber}
              setTempTableNumber={setTempTableNumber}
              saveTableAssignment={saveTableAssignment}
              handleUpdateResStatus={handleUpdateResStatus}
              handleDeleteRes={handleDeleteRes}
              lang={lang}
            />
          )}

          {activeTab === 'menu' && (
            <MenuTab
              menuItems={menuItems}
              selectedMenuCategory={selectedMenuCategory}
              setSelectedMenuCategory={setSelectedMenuCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
              menuSearchQuery={menuSearchQuery}
              setMenuSearchQuery={setMenuSearchQuery}
              setShowAddMenuModal={setShowAddMenuModal}
              setEditingMenuItem={setEditingMenuItem}
              toggleMenuAvailability={toggleMenuAvailability}
              handleDeleteMenuItem={handleDeleteMenuItem}
              SUB_CATS={SUB_CATS}
              CAT_LABELS={CAT_LABELS}
              lang={lang}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersTab
              customers={customers}
              customerSearchQuery={customerSearchQuery}
              setCustomerSearchQuery={setCustomerSearchQuery}
              selectedVipFilter={selectedVipFilter}
              setSelectedVipFilter={setSelectedVipFilter}
              setShowAddCustomerModal={setShowAddCustomerModal}
              setEditingCustomer={setEditingCustomer}
              handleDeleteCustomer={handleDeleteCustomer}
              setCheckInSearch={setCheckInSearch}
              setCheckedInCustomer={setCheckedInCustomer}
              setActiveTab={setActiveTab}
              getVipBadgeClass={getVipBadgeClass}
              lang={lang}
            />
          )}
        </div>
      </main>

      {/* ================= MODAL DIALOGS ================= */}

      {/* 1. ADD NEW CUSTOMER MODAL */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#380F12] border border-[#D4AF37]/40 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden text-stone-200 font-sans">
            <div className="bg-[#1E0505] px-6 py-4 border-b border-[#5C1A24] flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                {lang === 'vi' ? 'Tạo Hồ Sơ Khách Hàng VIP' : 'Create VIP Client Profile'}
              </h3>
              <button onClick={() => setShowAddCustomerModal(false)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">
                    {lang === 'vi' ? 'TÊN KHÁCH HÀNG *' : 'GUEST FULL NAME *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">
                    {lang === 'vi' ? 'HẠNG VIP *' : 'VIP TIER *'}
                  </label>
                  <select
                    value={newCustomerVip}
                    onChange={(e) => setNewCustomerVip(e.target.value)}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="STANDARD">STANDARD</option>
                    <option value="VIP">VIP</option>
                    <option value="VVIP">VVIP</option>
                    <option value="CELEB">CELEB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">
                    {lang === 'vi' ? 'SỐ ĐIỆN THOẠI' : 'PHONE NUMBER'}
                  </label>
                  <input
                    type="tel"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    placeholder="0901234567"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">
                    {lang === 'vi' ? 'EMAIL' : 'EMAIL ADDRESS'}
                  </label>
                  <input
                    type="email"
                    value={newCustomerEmail}
                    onChange={(e) => setNewCustomerEmail(e.target.value)}
                    placeholder="customer@domain.com"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Preferences initial setups */}
              <div className="border-t border-[#5C1A24]/40 pt-4 space-y-3">
                <h4 className="text-xs text-amber-200 uppercase tracking-widest font-bold">
                  {lang === 'vi' ? 'Thông tin dịch vụ ban đầu' : 'Concierge setup'}
                </h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1">
                      {lang === 'vi' ? 'Dị ứng (dấu phẩy cách)' : 'Allergies (comma separated)'}
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setNewCustomerPrefs({
                        ...newCustomerPrefs,
                        allergies: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      placeholder={lang === 'vi' ? "Không có" : "None"}
                      className="w-full bg-[#1E0505] border border-[#5C1A24] p-2 rounded text-xs text-stone-200 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-400 mb-1">{lang === 'vi' ? 'Gu rượu vang' : 'Wine preferences'}</label>
                    <input
                      type="text"
                      onChange={(e) => setNewCustomerPrefs({
                        ...newCustomerPrefs,
                        favoriteWine: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                      })}
                      placeholder="VD: Cabernet"
                      className="w-full bg-[#1E0505] border border-[#5C1A24] p-2 rounded text-xs text-stone-200 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1">{lang === 'vi' ? 'Vị trí bàn thích thích' : 'Preferred seating area'}</label>
                  <input
                    type="text"
                    value={newCustomerPrefs.seatingPreference}
                    onChange={(e) => setNewCustomerPrefs({ ...newCustomerPrefs, seatingPreference: e.target.value })}
                    placeholder="Gần vườn"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1">{lang === 'vi' ? 'Ghi chú phục vụ đặc biệt' : 'Concierge notes'}</label>
                  <textarea
                    value={newCustomerPrefs.specialNotes}
                    onChange={(e) => setNewCustomerPrefs({ ...newCustomerPrefs, specialNotes: e.target.value })}
                    placeholder="Ghi chú nhân viên trước buổi tiệc..."
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2 rounded text-xs text-stone-200 focus:outline-none"
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#5C1A24]/40 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddCustomerModal(false)}
                  className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] rounded text-sm text-stone-400"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded text-sm uppercase tracking-wider"
                >
                  {lang === 'vi' ? 'Tạo Hồ Sơ' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. EDIT CUSTOMER MODAL */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#380F12] border border-[#D4AF37]/40 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden text-stone-200 font-sans">
            <div className="bg-[#1E0505] px-6 py-4 border-b border-[#5C1A24] flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                {lang === 'vi' ? 'Cập Nhật Hồ Sơ VIP' : 'Edit VIP Client Profile'}
              </h3>
              <button onClick={() => setEditingCustomer(null)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateCustomer} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">TÊN KHÁCH HÀNG *</label>
                  <input
                    type="text"
                    required
                    value={editingCustomer.fullName}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, fullName: e.target.value })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">HẠNG VIP *</label>
                  <select
                    value={editingCustomer.vipTag}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, vipTag: e.target.value })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  >
                    <option value="STANDARD">STANDARD</option>
                    <option value="VIP">VIP</option>
                    <option value="VVIP">VVIP</option>
                    <option value="CELEB">CELEB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">SỐ ĐIỆN THOẠI</label>
                  <input
                    type="tel"
                    value={editingCustomer.phoneNumber || ''}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, phoneNumber: e.target.value || null })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    value={editingCustomer.email || ''}
                    onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value || null })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-[#5C1A24]/40 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] rounded text-sm text-stone-400"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded text-sm uppercase tracking-wider"
                >
                  {lang === 'vi' ? 'Lưu Thay Đổi' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD RESERVATION MODAL */}
      {showAddResModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#380F12] border border-[#D4AF37]/40 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden text-stone-200 font-sans">
            <div className="bg-[#1E0505] px-6 py-4 border-b border-[#5C1A24] flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                {lang === 'vi' ? 'Tạo Yêu Cầu Đặt Bàn Mới' : 'Accept New Table Request'}
              </h3>
              <button onClick={() => setShowAddResModal(false)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddReservation} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">TÊN THỰC KHÁCH *</label>
                  <input
                    type="text"
                    required
                    value={newRes.customerName}
                    onChange={(e) => setNewRes({ ...newRes, customerName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">SỐ ĐIỆN THOẠI *</label>
                  <input
                    type="tel"
                    required
                    value={newRes.customerPhone}
                    onChange={(e) => setNewRes({ ...newRes, customerPhone: e.target.value })}
                    placeholder="0901234567"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">THỜI GIAN ĐẶT *</label>
                  <input
                    type="datetime-local"
                    required
                    value={newRes.reservationTime}
                    onChange={(e) => setNewRes({ ...newRes, reservationTime: e.target.value })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">SỐ LƯỢNG KHÁCH *</label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={newRes.numberOfGuests}
                    onChange={(e) => setNewRes({ ...newRes, numberOfGuests: parseInt(e.target.value) })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">EMAIL</label>
                  <input
                    type="email"
                    value={newRes.customerEmail}
                    onChange={(e) => setNewRes({ ...newRes, customerEmail: e.target.value })}
                    placeholder="customer@domain.com"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">BÀN SỐ</label>
                  <input
                    type="text"
                    value={newRes.tableNumber}
                    onChange={(e) => setNewRes({ ...newRes, tableNumber: e.target.value })}
                    placeholder="Ví dụ: M02"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>
              </div>

              {/* Table assignment selector map */}
              <div className="border-t border-[#5C1A24]/40 pt-4">
                <TableMap
                  selectedTable={newRes.tableNumber}
                  onSelectTable={(tbl: string) => setNewRes({ ...newRes, tableNumber: tbl })}
                  activeReservations={reservations}
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">GHI CHÚ ĐẶC BIỆT CỦA KHÁCH</label>
                <textarea
                  value={newRes.specialRequests}
                  onChange={(e) => setNewRes({ ...newRes, specialRequests: e.target.value })}
                  placeholder="Muốn ngồi bàn lãng mạn cạnh ban công..."
                  className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">GHI CHÚ NỘI BỘ NHÂN VIÊN</label>
                <textarea
                  value={newRes.notes}
                  onChange={(e) => setNewRes({ ...newRes, notes: e.target.value })}
                  placeholder="Khách VIP, cần xếp ly rượu vang đỏ trước..."
                  className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-[#5C1A24]/40 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddResModal(false)}
                  className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] rounded text-sm text-stone-400"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded text-sm uppercase tracking-wider"
                >
                  {lang === 'vi' ? 'Lưu Đặt Bàn' : 'Save Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD MENU ITEM MODAL */}
      {showAddMenuModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#380F12] border border-[#D4AF37]/40 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden text-stone-200 font-sans max-h-[90vh] overflow-y-auto">
            <div className="bg-[#1E0505] px-6 py-4 border-b border-[#5C1A24] flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                {lang === 'vi' ? 'Thêm Món Ăn Mới' : 'Add New Dish'}
              </h3>
              <button onClick={() => setShowAddMenuModal(false)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMenuItem} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">TÊN TIẾNG ANH *</label>
                  <input
                    type="text"
                    required
                    value={newMenuItem.nameEn}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, nameEn: e.target.value })}
                    placeholder="Classic Tiramisu"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">TÊN TIẾNG VIỆT *</label>
                  <input
                    type="text"
                    required
                    value={newMenuItem.nameVi}
                    onChange={(e) => setNewMenuItem({ ...newMenuItem, nameVi: e.target.value })}
                    placeholder="Bánh Tiramisu Truyền Thống"
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider flex justify-between">
                    <span>{lang === 'vi' ? 'GIÁ BÁN (VND) *' : 'PRICE (VND) *'}</span>
                    {newMenuItemPriceRaw && (
                      <span className="text-[#D4AF37] font-mono">
                        {Number(newMenuItemPriceRaw).toLocaleString('vi-VN')} ₫
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    required
                    value={newMenuItemPriceRaw}
                    onChange={(e) => setNewMenuItemPriceRaw(e.target.value)}
                    placeholder={lang === 'vi' ? "Ví dụ: 180000" : "Example: 180000"}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">PHÂN LOẠI CHÍNH *</label>
                  <select
                    value={newMenuItem.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      setNewMenuItem({
                        ...newMenuItem,
                        category: cat,
                        subCategory: SUB_CATS[cat]?.[0] || ''
                      });
                      setShowCustomSubField(false);
                    }}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  >
                    <option value="APPETIZERS">APPETIZERS (Khai vị)</option>
                    <option value="MAINS">MAINS (Món chính)</option>
                    <option value="DESSERTS">DESSERTS (Tráng miệng)</option>
                    <option value="DRINKS">DRINKS (Đồ uống)</option>
                    <option value="WINES">WINES (Rượu vang)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">DANH MỤC CON *</label>
                  <select
                    value={showCustomSubField ? 'CUSTOM' : newMenuItem.subCategory}
                    onChange={(e) => {
                      if (e.target.value === 'CUSTOM') {
                        setShowCustomSubField(true);
                      } else {
                        setShowCustomSubField(false);
                        setNewMenuItem({ ...newMenuItem, subCategory: e.target.value });
                      }
                    }}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  >
                    {(SUB_CATS[newMenuItem.category] || []).map(sc => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                    <option value="CUSTOM">-- Khác (Nhập mới...) --</option>
                  </select>
                </div>

                {showCustomSubField && (
                  <div>
                    <label className="block text-[10px] text-amber-300 mb-1 font-bold uppercase tracking-wider">
                      NHẬP DANH MỤC CON MỚI *
                    </label>
                    <input
                      type="text"
                      required
                      value={newMenuItemCustomSub}
                      onChange={(e) => setNewMenuItemCustomSub(e.target.value)}
                      placeholder="VD: Steak"
                      className="w-full bg-[#2D0A0A] border border-[#D4AF37]/50 p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Mock drag drop image upload */}
              <div className="pt-2">
                <ImageUploader
                  value={newMenuItem.imageUrl}
                  onChange={(url: string) => setNewMenuItem({ ...newMenuItem, imageUrl: url })}
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">MÔ TẢ TIẾNG ANH</label>
                <textarea
                  value={newMenuItem.descriptionEn}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, descriptionEn: e.target.value })}
                  placeholder="Espresso soaked ladyfingers with whipped mascarpone cream..."
                  className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">MÔ TẢ TIẾNG VIỆT</label>
                <textarea
                  value={newMenuItem.descriptionVi}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, descriptionVi: e.target.value })}
                  placeholder="Bánh quy sampa thấm đẫm cà phê espresso cùng kem phô mai mịn màng..."
                  className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-[#5C1A24]/40 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMenuModal(false)}
                  className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] rounded text-sm text-stone-400"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded text-sm uppercase tracking-wider shadow-md"
                >
                  {lang === 'vi' ? 'Thêm Món' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. EDIT MENU ITEM MODAL */}
      {editingMenuItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#380F12] border border-[#D4AF37]/40 w-full max-w-lg rounded-lg shadow-2xl overflow-hidden text-stone-200 font-sans max-h-[90vh] overflow-y-auto">
            <div className="bg-[#1E0505] px-6 py-4 border-b border-[#5C1A24] flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider">
                {lang === 'vi' ? 'Cập Nhật Món Ăn' : 'Update Menu Item'}
              </h3>
              <button onClick={() => setEditingMenuItem(null)} className="text-stone-400 hover:text-stone-100">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdateMenuItem} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">TÊN TIẾNG ANH *</label>
                  <input
                    type="text"
                    required
                    value={editingMenuItem.nameEn}
                    onChange={(e) => setEditingMenuItem({ ...editingMenuItem, nameEn: e.target.value })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">TÊN TIẾNG VIỆT *</label>
                  <input
                    type="text"
                    required
                    value={editingMenuItem.nameVi}
                    onChange={(e) => setEditingMenuItem({ ...editingMenuItem, nameVi: e.target.value })}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider flex justify-between">
                    <span>{lang === 'vi' ? 'GIÁ BÁN (VND) *' : 'PRICE (VND) *'}</span>
                    {editingMenuItemPriceRaw && (
                      <span className="text-[#D4AF37] font-mono">
                        {Number(editingMenuItemPriceRaw).toLocaleString('vi-VN')} ₫
                      </span>
                    )}
                  </label>
                  <input
                    type="number"
                    required
                    value={editingMenuItemPriceRaw}
                    onChange={(e) => setEditingMenuItemPriceRaw(e.target.value)}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">PHÂN LOẠI CHÍNH *</label>
                  <select
                    value={editingMenuItem.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      setEditingMenuItem({
                        ...editingMenuItem,
                        category: cat,
                        subCategory: SUB_CATS[cat]?.[0] || null
                      });
                      setShowEditCustomSubField(false);
                    }}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  >
                    <option value="APPETIZERS">APPETIZERS (Khai vị)</option>
                    <option value="MAINS">MAINS (Món chính)</option>
                    <option value="DESSERTS">DESSERTS (Tráng miệng)</option>
                    <option value="DRINKS">DRINKS (Đồ uống)</option>
                    <option value="WINES">WINES (Rượu vang)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">DANH MỤC CON *</label>
                  <select
                    value={showEditCustomSubField ? 'CUSTOM' : (editingMenuItem.subCategory || '')}
                    onChange={(e) => {
                      if (e.target.value === 'CUSTOM') {
                        setShowEditCustomSubField(true);
                      } else {
                        setShowEditCustomSubField(false);
                        setEditingMenuItem({ ...editingMenuItem, subCategory: e.target.value });
                      }
                    }}
                    className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                  >
                    {(SUB_CATS[editingMenuItem.category] || []).map(sc => (
                      <option key={sc} value={sc}>{sc}</option>
                    ))}
                    <option value="CUSTOM">-- Khác (Nhập mới...) --</option>
                  </select>
                </div>

                {showEditCustomSubField && (
                  <div>
                    <label className="block text-[10px] text-amber-300 mb-1 font-bold uppercase tracking-wider">
                      NHẬP DANH MỤC CON MỚI *
                    </label>
                    <input
                      type="text"
                      required
                      value={editingMenuItemCustomSub}
                      onChange={(e) => setEditingMenuItemCustomSub(e.target.value)}
                      placeholder="VD: Steak"
                      className="w-full bg-[#2D0A0A] border border-[#D4AF37]/50 p-2.5 rounded text-sm text-stone-200 focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Mock drag drop image upload */}
              <div className="pt-2">
                <ImageUploader
                  value={editingMenuItem.imageUrl || ''}
                  onChange={(url: string) => setEditingMenuItem({ ...editingMenuItem, imageUrl: url || null })}
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">MÔ TẢ TIẾNG ANH</label>
                <textarea
                  value={editingMenuItem.descriptionEn || ''}
                  onChange={(e) => setEditingMenuItem({ ...editingMenuItem, descriptionEn: e.target.value || null })}
                  className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-[10px] text-stone-400 mb-1 font-bold uppercase tracking-wider">MÔ TẢ TIẾNG VIỆT</label>
                <textarea
                  value={editingMenuItem.descriptionVi || ''}
                  onChange={(e) => setEditingMenuItem({ ...editingMenuItem, descriptionVi: e.target.value || null })}
                  className="w-full bg-[#1E0505] border border-[#5C1A24] p-2.5 rounded text-xs text-stone-200 focus:outline-none"
                  rows={2}
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-[#5C1A24]/40 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingMenuItem(null)}
                  className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] rounded text-sm text-stone-400"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-stone-900 font-bold rounded text-sm uppercase tracking-wider shadow-md"
                >
                  {lang === 'vi' ? 'Lưu Thay Đổi' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. GLOBAL CUSTOM CONFIRM DIALOG */}
      <CustomConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
