import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

const PRESETS = [
  { name: 'Khai vị (Antipasti)', keyword: 'antipasti', url: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80' },
  { name: 'Pasta (Món chính)', keyword: 'pasta', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80' },
  { name: 'Thịt bò (Steak)', keyword: 'steak', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80' },
  { name: 'Tráng miệng (Dessert)', keyword: 'tiramisu', url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80' },
  { name: 'Rượu vang đỏ (Red Wine)', keyword: 'red-wine', url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80' },
  { name: 'Vang trắng (White Wine)', keyword: 'white-wine', url: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=600&q=80' },
  { name: 'Đồ uống (Cocktail)', keyword: 'cocktail', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80' },
  { name: 'Cà phê (Coffee)', keyword: 'cappuccino', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80' },
];

export default function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const simulateUpload = (presetUrl?: string) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      if (presetUrl) {
        onChange(presetUrl);
      } else {
        // Fallback or random based on dishName keyword
        const randomUrl = `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80`;
        onChange(randomUrl);
      }
    }, 1200);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Pick random matching preset or default
      const file = e.dataTransfer.files[0];
      const match = PRESETS.find(p => file.name.toLowerCase().includes(p.keyword));
      simulateUpload(match?.url);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const match = PRESETS.find(p => file.name.toLowerCase().includes(p.keyword));
      simulateUpload(match?.url);
    }
  };

  return (
    <div className="space-y-3 font-sans">
      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
        Hình ảnh món ăn / đồ uống
      </label>

      {/* Image Preview & Drag Area */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-5 flex flex-col items-center justify-center min-h-[140px] transition-all ${
          dragActive ? 'border-[#D4AF37] bg-[#4A0E0E]/20' : 'border-[#5C1A24] bg-[#1E0505]'
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-4">
            <Loader2 className="animate-spin text-[#D4AF37] w-8 h-8" />
            <span className="text-xs text-stone-400">Đang tải ảnh lên máy chủ Fellini...</span>
          </div>
        ) : value ? (
          <div className="w-full flex items-center gap-4">
            <div className="w-24 h-20 rounded bg-stone-900 border border-[#5C1A24] overflow-hidden shrink-0 relative group">
              <img src={value} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-stone-200">Đang sử dụng</span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 text-left">
              <div className="flex items-center gap-1.5 text-green-400 text-xs font-semibold">
                <CheckCircle size={14} />
                Tải ảnh thành công
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Link ảnh URL..."
                className="w-full bg-[#2D0A0A] border border-[#5C1A24] px-2 py-1 rounded text-[11px] text-stone-300 focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="button"
                onClick={() => onChange('')}
                className="text-[10px] text-red-400 hover:underline block"
              >
                Gỡ bỏ ảnh
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-2">
            <UploadCloud className="mx-auto text-stone-500 w-8 h-8" />
            <div>
              <label className="text-xs text-amber-300 hover:text-amber-100 cursor-pointer font-semibold underline">
                Chọn tệp tin ảnh
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-xs text-stone-500"> hoặc kéo thả ảnh vào đây</span>
            </div>
            <p className="text-[10px] text-stone-600">Hỗ trợ PNG, JPG, WEBP lên đến 5MB</p>
          </div>
        )}
      </div>

      {/* Preset Library Quick Picks */}
      {!value && !uploading && (
        <div className="space-y-1.5">
          <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-medium">
            💡 Hoặc chọn nhanh từ thư viện ảnh mẫu cao cấp:
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
            {PRESETS.map((preset) => (
              <button
                key={preset.keyword}
                type="button"
                onClick={() => simulateUpload(preset.url)}
                className="flex items-center gap-1 px-2 py-1.5 bg-[#2D0A0A] hover:bg-[#4A0E0E] border border-[#5C1A24]/60 rounded text-[10px] text-stone-300 transition-colors text-left truncate"
                title={preset.name}
              >
                <ImageIcon size={10} className="text-[#D4AF37] shrink-0" />
                <span className="truncate">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
