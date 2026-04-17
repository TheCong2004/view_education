'use client';

import React, { useState } from 'react';
import { courses } from './data';
import Sidebar from './Sidebar';
import Header from './header';
import SearchBar from './SearchBar';

export default function EducationPlatform() {
  const [currentVideo, setCurrentVideo] = useState(courses[0]);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const totalLessons = courses.length;
  const courseProgress = Math.round((completedLessons / totalLessons) * 100);

  const handleAddToSearchHistory = (term: string) => {
    setSearchHistory(prev => {
      // Avoid duplicates and limit history to 10 items
      const filtered = prev.filter(item => item !== term);
      return [term, ...filtered].slice(0, 10);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentCourseName={currentVideo.title}
        courseProgress={courseProgress}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
        onSelectVideo={setCurrentVideo}
        onSearch={handleAddToSearchHistory}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* 
          Mobile:  flex-col  → video trên, sidebar dưới
          Desktop: grid 2/3 + 1/3 → video trái, sidebar phải sticky
        */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── Video Player ── */}
          <div className="w-full lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
            <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-lg">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={currentVideo.videoUrl}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-3">
              <h1 className="text-lg lg:text-2xl font-Inter font-semibold text-gray-900 mb-2">
                {currentVideo.title}
              </h1>
              <div className="flex items-center gap-3 text-gray-600 flex-wrap">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-Inter font-semibold">
                  {currentVideo.tag}
                </span>
                <span className="text-sm font-Inter font-semibold">Thời lượng: {currentVideo.duration}</span>
              </div>
            </div>
          </div>

          {/* ── Sidebar (danh sách bài) ── */}
          {/* Mobile: hiện bên dưới video; Desktop: cột phải, có thể scroll riêng */}
          <div className="w-full lg:col-span-1 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
            <Sidebar
              courses={courses}
              currentVideo={currentVideo}
              onSelectVideo={setCurrentVideo}
              searchHistory={searchHistory}
            />
          </div>

        </div>
      </main>
    </div>
  );
}