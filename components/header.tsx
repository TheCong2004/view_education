'use client';

import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Cột Trái: Nút Menu & Logo */}
          <div className="flex items-center gap-3">
            <Menu className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900" />
            <div className="flex items-center gap-1 cursor-pointer">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                KHÁNH HÙNG
              </div>
              <span className="text-xs text-gray-500 mt-1 font-medium">ACADEMY</span>
            </div>
          </div>

          {/* Cột Giữa: Thanh Tìm Kiếm */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-2.5 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Cột Phải: Thông báo & Profile */}
          <div className="flex items-center gap-5">
            {/* Nút Thông báo */}
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              {/* Dấu chấm đỏ báo có thông báo mới */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
            </button>

            {/* Dấu gạch dọc phân cách */}
            <div className="h-8 w-px bg-gray-200"></div>

            {/* Khu vực User Profile */}
            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
              
              {/* Avatar với viền vàng gradient */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#aa7c11] p-[2px] shadow-sm">
                <div className="w-full h-full rounded-full bg-[#ec4899] border-[1.5px] border-white flex items-center justify-center text-white font-medium text-lg">
                  C
                </div>
              </div>

              {/* Thông tin User */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800 text-sm">VoThe</span>
                  {/* Badge FREE màu xanh */}
                  <div className="flex items-center gap-1 bg-[#059669] text-white px-1.5 py-[2px] rounded text-[10px] font-bold">
                    <span className="bg-white text-[#059669] rounded-full w-3 h-3 flex items-center justify-center text-[8px] leading-none">
                      $
                    </span>
                    FREE
                  </div>
                </div>
                {/* Số dư màu tím */}
                <div className="flex items-center gap-1 mt-0.5 text-[#9333ea] text-xs font-bold">
                  <span className="bg-[#9333ea] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px]">
                    $
                  </span>
                  0đ
                </div>
              </div>

              {/* Icon mũi tên thả xuống */}
              <ChevronDown className="w-4 h-4 text-pink-500 ml-1" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}