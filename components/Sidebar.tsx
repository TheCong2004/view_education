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
}

export default function Sidebar({ 
  courses, 
  currentVideo, 
  onSelectVideo,
  courseProgress = 0,
  totalLessons = 172,
  completedLessons = 0
}: SidebarProps) {
  const [displayCourseName, setDisplayCourseName] = useState(currentVideo.courseName);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        <div className="p-6 border-b border-gray-200">
          {/* Đã thêm flex, items-center và justify-between ở đây */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold font-Inter text-gray-900">
                Các khóa học liên quan
              </h2>
              <p className="text-sm text-pink-600 font-medium mt-1">
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
                  <span className="text-[10px] font-bold text-gray-900">{courseProgress}%</span>
                </div>
              </div>

              {/* Total Lessons */}
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  {completedLessons}/{courses.filter(c => c.courseName === displayCourseName).length}
                </p>
              </div>
            </div>
          </div>
            <div className="text-xs text-gray-600 mt-2 flex gap-4">
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

        {/* Danh sách khóa học */}
        <div className="space-y-3 p-6 overflow-y-auto max-h-[calc(100vh-230px)]" ref={scrollContainerRef}>
          {[...new Set(courses.map(c => c.courseName))].map((courseName) => (
            <div key={courseName}>
              <h3 className="text-sm font-semibold text-pink-600 mt-3 mb-3" data-course-heading={courseName}>
                {courseName}
              </h3>
              {courses.filter(c => c.courseName === courseName).map((course) => (
                <div
                  key={course.id}
                  onClick={() => onSelectVideo(course)}
                  className="group cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-all flex gap-3 bg-gray-50 hover:bg-gray-100 p-3 mb-2"
                >
                  {/* Thumbnail bên trái */}
                  <div 
                    className="w-20 h-20 rounded-lg flex-shrink-0 relative bg-cover bg-center"
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
                      <h3 className="font-semibold font-Inter text-gray-900 text-sm line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <span className="text-pink-500">●</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-semibold">
                        {course.tag}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}