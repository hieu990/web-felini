import { AlertCircle, X } from 'lucide-react';

interface CustomConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CustomConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel
}: CustomConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#380F12] border border-[#D4AF37]/40 w-full max-w-md rounded-lg shadow-2xl overflow-hidden text-stone-200 animate-in fade-in zoom-in duration-200">
        <div className="bg-[#1E0505] px-5 py-4 border-b border-[#5C1A24] flex items-center justify-between">
          <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-400" />
            {title}
          </h3>
          <button onClick={onCancel} className="text-stone-400 hover:text-stone-100 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-stone-300 leading-relaxed">
            {message}
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-[#5C1A24] hover:bg-[#1E0505] rounded text-xs text-stone-400 font-medium transition-colors"
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="px-4 py-2 bg-red-700 hover:bg-red-650 text-white font-bold rounded text-xs uppercase tracking-wider transition-all"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
