import React, { useState } from 'react';
import { Wine, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  apiBase: string;
  onLoginSuccess: (token: string) => void;
}

export default function LoginScreen({ apiBase, onLoginSuccess }: LoginScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu truy cập.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const trimmedPassword = password.trim();
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: trimmedPassword }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.token);
      } else {
        setError(data.message || 'Mật khẩu đăng nhập không chính xác.');
      }
    } catch (err) {
      setError('Lỗi kết nối đến máy chủ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E0505] relative overflow-hidden font-sans">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5C1A24]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#D4AF37]/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md p-8 bg-[#2D0A0A]/60 border border-[#5C1A24]/60 rounded-xl shadow-2xl backdrop-blur-md z-10">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-[#4A0E0E] rounded-full border border-[#D4AF37]/30 shadow-inner mb-3">
            <Wine className="text-[#D4AF37] w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold tracking-widest text-[#D4AF37] uppercase">
            FELLINI
          </h1>
          <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
            Lounge & Concierge Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
              Mật khẩu truy cập hệ thống
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-stone-500">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mã pin hoặc mật khẩu..."
                className="w-full pl-10 pr-10 py-3 bg-[#1E0505] border border-[#5C1A24] rounded-md text-stone-100 placeholder-stone-600 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-stone-500 hover:text-stone-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-950/50 border border-red-900/40 rounded text-red-300 text-xs">
              <AlertCircle size={14} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-900 hover:brightness-110 active:scale-[0.98] font-bold rounded text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập vào Portal'}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] text-stone-500 uppercase tracking-widest border-t border-[#5C1A24]/30 pt-4">
          Hệ thống quản lý nội bộ nhà hàng Fellini
        </div>
      </div>
    </div>
  );
}
