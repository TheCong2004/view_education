'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Clock } from 'lucide-react';

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

interface SidebarProps {
  courses: Course[];
  currentVideo: Course;
  onSelectVideo: (course: Course) => void;
  courseProgress?: number;
  totalLessons?: number;
  completedLessons?: number;
  searchHistory?: string[];
}

export default function Sidebar({ 
  courses, 
  currentVideo, 
  onSelectVideo,
  courseProgress = 0,
  totalLessons = 172,
  completedLessons = 0,
  searchHistory = []
}: SidebarProps) {
  const [displayCourseName, setDisplayCourseName] = useState(currentVideo.courseName);
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter options
  const filterOptions = [
    'Tất cả',
    'Trong loạt video',
    'Video có liên quan',
    'Đã xem'
  ];

  // Filter courses based on selected filter
  const filteredCourses = (() => {
    switch(selectedFilter) {
      case 'Tất cả':
        return courses;
      case 'Dựa trên nội dung bạn tìm kiếm':
        // Return empty if no search history, otherwise show recent searches
        return searchHistory.length > 0 
          ? courses.filter(c => 
              searchHistory.some(term => 
                c.title.toLowerCase().includes(term.toLowerCase()) ||
                c.courseName.toLowerCase().includes(term.toLowerCase())
              )
            )
          : [];
      case 'Trong loạt video':
        // Show videos from same course as current video
        return courses.filter(c => c.courseName === currentVideo.courseName);
      case 'Video có liên quan':
        // Show videos from other courses (related by category)
        return courses.filter(c => 
          c.category === currentVideo.category && 
          c.courseName !== currentVideo.courseName
        );
      case 'Đã xem':
        // Show watched videos
        return courses.filter(c => watchedVideos.has(c.id));
      default:
        return courses;
    }
  })();

  const handleSelectCourse = (course: Course) => {
    // Mark as watched
    setWatchedVideos(prev => new Set(prev).add(course.id));
    // Call parent handler
    onSelectVideo(course);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Tìm khóa học nào đang ở phần trên cùng của danh sách
      const courseHeadings = container.querySelectorAll('[data-course-heading]');
      
      for (let heading of courseHeadings) {
        const rect = heading.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Nếu heading nằm trong viewport
        if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
          const courseName = heading.getAttribute('data-course-heading');
          if (courseName) {
            setDisplayCourseName(courseName);
          }
          break;
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md sticky top-0 z-40">
        
        {/* Phần Header của Sidebar */}
        <div className="p-4 border-b border-gray-200">
          {/* Đã thêm flex, items-center và justify-between ở đây */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xl text-pink-600 font-semibold font-Inter mt-1 truncate">
                {displayCourseName}
              </p>
            </div>
            
            {/* Overall Progress */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Progress Circle */}
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 48 48">
                  {/* Background circle */}
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  {/* Progress circle */}
                  <circle 
                    cx="24" 
                    cy="24" 
                    r="20" 
                    fill="none" 
                    stroke="url(#grad)" 
                    strokeWidth="3"
                    strokeDasharray={`${(courseProgress / 100) * 125.6} 125.6`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-Inter font-semibold text-gray-900">{courseProgress}%</span>
                </div>
              </div>

              {/* Total Lessons */}
              <div className="text-center">
                <p className="text-lg font-Inter font-semibold text-gray-900 leading-tight">
                  {completedLessons}/{courses.filter(c => c.courseName === displayCourseName).length}
                </p>
              </div>
            </div>
          </div>
            <div className="text-xs text-gray-600 mt-2 flex gap-4 font-Inter font-semibold">
                <p className="flex items-center gap-1">
                  <Play size={14} className="text-pink-500" />
                  Số lượng: {courses.filter(c => c.courseName === displayCourseName).length} video
                </p>
                <p className="flex items-center gap-1">
                  <Clock size={14} className="text-pink-500" />
                  Thời lượng: {courses.filter(c => c.courseName === displayCourseName).reduce((total, c) => {
                  const [min, sec] = c.duration.split(':').map(Number);
                  return total + (min * 60 + sec);
                }, 0).toString().match(/^(\d+)(.*)/) ? (() => {
                  const total = courses.filter(c => c.courseName === displayCourseName).reduce((total, c) => {
                    const [min, sec] = c.duration.split(':').map(Number);
                    return total + (min * 60 + sec);
                  }, 0);
                  const minutes = Math.floor(total / 60);
                  const seconds = total % 60;
                  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
                })() : '0:00'}
                </p>
              </div>
        </div>

        {/* Filter Buttons */}
        <div className="p-4 border-b border-gray-100 overflow-x-auto">
          <div className="flex gap-2 w-max">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-Inter font-semibold transition-all ${
                  selectedFilter === filter
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách khóa học */}
        <div className="space-y-3 p-4 overflow-y-auto max-h-[calc(100vh-320px)]" ref={scrollContainerRef}>
          {[...new Set(filteredCourses.map(c => c.courseName))].map((courseName) => (
            <div key={courseName}>
              <h3 className="text-sm font-Inter font-semibold text-pink-600 mt-3 mb-3" data-course-heading={courseName}>
                {courseName}
              </h3>
              {filteredCourses.filter(c => c.courseName === courseName).map((course) => (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                  className="group cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-all flex gap-2 bg-gray-50 hover:bg-gray-100 p-2 mb-2"
                >
                  {/* Thumbnail bên trái */}
                  <div 
                    className="w-[76px] h-14 rounded-lg flex-shrink-0 relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <svg className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Tiêu đề và thông tin bên phải */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-Inter font-semibold text-gray-900 text-sm line-clamp-2">
                        {course.title}
                      </h3>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <div className="flex items-center gap-2 text-xs text-gray-500 font-Inter font-semibold">
                        <Clock size={14} className="text-pink-500" />
                        <span>{course.duration}</span>
                      </div>
                      <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-Inter font-semibold">
                        {course.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          
          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm font-Inter font-semibold">Không có video nào cho bộ lọc này</p>
              {selectedFilter === 'Đã xem' && (
                <p className="text-xs text-gray-400 mt-1 font-Inter font-semibold">Hãy xem một số video để bắt đầu</p>
              )}
              {selectedFilter === 'Dựa trên nội dung bạn tìm kiếm' && (
                <p className="text-xs text-gray-400 mt-1 font-Inter font-semibold">Sử dụng thanh tìm kiếm để lấy gợi ý</p>
              )}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}