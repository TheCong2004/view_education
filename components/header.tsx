'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, Bell, ChevronDown, Copy, LogOut } from 'lucide-react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SearchBar from './SearchBar';

interface Course {
  id: number;
  courseName: string;
  title: string;
  category: string;
  duration: string;
  tag: string;
  image: string;
  videoUrl: string;
  thumbnail: string;
}

interface HeaderProps {
  currentCourseName?: string;
  courseProgress?: number;
  totalLessons?: number;
  completedLessons?: number;
  onSelectVideo?: (course: Course) => void;
  onSearch?: (term: string) => void;
}

export default function Header({ 
  currentCourseName,
  courseProgress,
  totalLessons,
  completedLessons,
  onSelectVideo,
  onSearch
}: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const customerCode = 'KHA-43587';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(customerCode);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isDropdownOpen]);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Cột Trái: Nút Menu & Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 cursor-pointer">
              <div className="text-2xl font-bold font-Inter text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                E-learning
              </div>
              <span className="text-xs text-gray-500 mt-1 font-semibold font-Inter">ACADEMY</span>
            </div>
          </div>

          {/* Cột Giữa: Thanh Tìm Kiếm */}
          <SearchBar onSelectVideo={onSelectVideo} onSearch={onSearch} />

          {/* Cột Phải: Thông báo & Profile */}
          <div className="flex items-center gap-2 md:gap-5">
            {/* Nút Thông báo */}
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              {/* Dấu chấm đỏ báo có thông báo mới */}
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 border border-white rounded-full"></span>
            </button>

            {/* Dấu gạch dọc phân cách */}
            <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

            {/* Khu vực User Profile */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors"
              >
                
                {/* Avatar với Lottie animation */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center relative bg-[#ec4899] flex-shrink-0">
                  <DotLottieReact
                    src="/animation/test.lottie"
                    loop
                    autoplay
                    style={{ width: '140%', height: '140%', position: 'absolute', zIndex: 50 }}
                  />
                  <span className="text-white font-medium text-lg relative z-10">C</span>
                </div>

                {/* Thông tin User - ẩn trên mobile */}
                <div className="hidden md:flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold font-Inter text-gray-800 text-sm">••••••</span>
                    {/* Badge FREE màu xanh */}
                    <div className="flex items-center gap-1 bg-[#059669] text-white px-1.5 py-[2px] rounded text-[10px] font-semibold font-Inter">
                      <span className="bg-white text-[#059669] rounded-full w-3 h-3 flex items-center justify-center text-[8px] leading-none">
                        $
                      </span>
                      FREE
                    </div>
                  </div>
                  {/* Số dư màu tím */}
                  <div className="flex items-center gap-1 mt-0.5 text-[#9333ea] text-xs font-semibold font-Inter">
                    <span className="bg-[#9333ea] text-white rounded-full w-3.5 h-3.5 flex items-center justify-center text-[9px]">
                      $
                    </span>
                    0đ
                  </div>
                </div>

                {/* Icon mũi tên thả xuống */}
                <ChevronDown className={`w-4 h-4 text-pink-500 ml-1 transition-transform hidden md:block ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 md:w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mx-2 md:mx-0 max-w-[calc(100vw-16px)]">
                  {/* Mã khách hàng */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
                        👤
                      </div>
                      <span className="text-sm text-gray-600 font-Inter font-semibold">Mã khách hàng:</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold font-Inter text-blue-600">{customerCode}</span>
                      <button 
                        onClick={handleCopyCode}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Sao chép"
                      >
                        <Copy className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Affiliate Level */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 flex items-center justify-center text-xl">
                        🏆
                      </div>
                      <span className="text-sm text-gray-600 font-Inter font-semibold">Affiliate Level: <span className="font-semibold font-Inter text-pink-600">1</span></span>
                    </div>
                    <button className="text-blue-600 text-sm font-semibold font-Inter hover:underline">
                      Link Affiliate
                    </button>
                  </div>

                  {/* Lịch sử đơn hàng */}
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 font-Inter font-semibold hover:bg-gray-50 border-b border-gray-100 transition-colors flex items-center gap-2">
                    <span>📋</span>
                    Lịch sử đơn hàng
                  </button>

                  {/* Đối mặt khẩu */}
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-700 font-Inter font-semibold hover:bg-gray-50 border-b border-gray-100 transition-colors flex items-center gap-2">
                    <span>🔑</span>
                    Đối mặt khẩu
                  </button>

                  {/* Đăng xuất */}
                  <button className="w-full px-4 py-3 text-left text-sm text-white font-Inter font-semibold bg-pink-600 hover:bg-pink-800 transition-colors rounded-b-lg flex items-center gap-2 text-pink-600">
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}