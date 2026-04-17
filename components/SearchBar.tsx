'use client';

import { useState, useMemo } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { courses } from './data';

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

interface SearchBarProps {
  onSelectVideo?: (course: Course) => void;
  onSearch?: (term: string) => void;
}

export default function SearchBar({ onSelectVideo, onSearch }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Get unique course names for suggestions
  const uniqueCourses = useMemo(() => {
    const courseMap = new Map<string, Course>();
    courses.forEach(course => {
      if (!courseMap.has(course.courseName)) {
        courseMap.set(course.courseName, course);
      }
    });
    return Array.from(courseMap.values());
  }, []);

  // Filter courses based on search input
  const searchResults = useMemo(() => {
    if (!searchInput.trim()) return [];
    
    const query = searchInput.toLowerCase();
    return courses.filter(course => 
      course.title.toLowerCase().includes(query) ||
      course.courseName.toLowerCase().includes(query) ||
      course.category.toLowerCase().includes(query)
    );
  }, [searchInput]);

  const handleSelectCourse = (course: Course) => {
    // Track search history
    if (searchInput.trim() && onSearch) {
      onSearch(searchInput.trim());
    }
    if (onSelectVideo) {
      onSelectVideo(course);
    }
    setSearchInput('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <div className="relative group w-full">
          <Search className="absolute left-4 top-2.5 w-5 h-5 text-gray-400 group-focus-within:text-pink-500 transition-colors z-20" />
          <input
            type="text"
            placeholder="Tìm kiếm khóa học..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(false), 200)}
            className="w-full pl-11 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all text-sm"
          />
        </div>

        {/* Search Results Dropdown */}
        {isOpen && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-2 md:mx-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {searchResults.map((course) => (
              <div
                key={course.id}
                onClick={() => handleSelectCourse(course)}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex-shrink-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-Inter font-semibold text-gray-900">{course.courseName}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggestions Dropdown - Shows when focused but empty */}
        {isOpen && !searchInput.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-2 md:mx-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            {uniqueCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  setSearchInput(course.courseName);
                  setIsOpen(true);
                }}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3"
              >
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-sm font-Inter font-semibold text-gray-700">{course.courseName}</p>
              </div>
            ))}
          </div>
        )}

        {/* No Results Message */}
        {isOpen && searchResults.length === 0 && searchInput.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-2 md:mx-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500 text-sm">
            Không tìm thấy khóa học nào
          </div>
        )}

        {/* Permanent Suggestions - Show when focused but search is empty */}
        {isOpen && !searchInput.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-2 md:mx-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="px-4 py-2 text-xs text-gray-500 font-Inter font-semibold border-b border-gray-100">Tìm kiếm phổ biến</div>
            {uniqueCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => {
                  handleSelectCourse(course);
                }}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3"
              >
                <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <p className="text-sm font-Inter font-semibold text-gray-700">{course.courseName}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Search Button */}
      <button 
        onClick={() => setIsFullscreenOpen(true)}
        className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* Mobile Fullscreen Search Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 bg-white z-60 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <button 
              onClick={() => {
                setIsFullscreenOpen(false);
                setSearchInput('');
                setIsOpen(false);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                autoFocus
                type="text"
                placeholder="Tìm kiếm khóa học..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Results Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Search Results */}
            {isOpen && searchResults.length > 0 && (
              <div className="bg-white">
                {searchResults.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      handleSelectCourse(course);
                      setIsFullscreenOpen(false);
                    }}
                    className="px-4 py-4 border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                  >
                    <div className="w-14 h-14 rounded-lg flex-shrink-0 bg-cover bg-center" 
                      style={{ backgroundImage: `url(${course.thumbnail})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-Inter font-semibold text-gray-900">{course.courseName}</p>
                      <p className="text-xs text-gray-500 mt-1">{course.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Results */}
            {isOpen && searchResults.length === 0 && searchInput.trim() && (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-gray-500 text-sm">Không tìm thấy khóa học nào</p>
              </div>
            )}

            {/* Suggestions when empty */}
            {isOpen && !searchInput.trim() && (
              <div className="bg-white">
                <div className="px-4 py-3 text-xs text-gray-500 font-Inter font-semibold border-b border-gray-100">Tìm kiếm phổ biến</div>
                {uniqueCourses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => {
                      handleSelectCourse(course);
                      setIsFullscreenOpen(false);
                    }}
                    className="px-4 py-4 border-b border-gray-100 last:border-0 transition-colors flex items-center gap-3 cursor-pointer hover:bg-gray-50"
                  >
                    <Clock className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-Inter font-semibold text-gray-700">{course.courseName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
