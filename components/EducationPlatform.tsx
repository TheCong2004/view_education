'use client';

import React, { useState } from 'react';
import { courses } from './data';
import Sidebar from './Sidebar';
import Header from './header';
export default function EducationPlatform() {
  const [currentVideo, setCurrentVideo] = useState(courses[0]);
  const [completedLessons, setCompletedLessons] = useState(0);

  const totalLessons = courses.length;
  const courseProgress = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentCourseName={currentVideo.title}
        courseProgress={courseProgress}
        totalLessons={totalLessons}
        completedLessons={completedLessons}
      />


      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Section */}
          <div className="lg:col-span-2">
            <div className="fixed left-0 top-20 w-full lg:w-2/3 px-4 z-50">
              <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-lg">
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={currentVideo.videoUrl}
                    title={currentVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
                <h1 className="text-2xl font-semibold font-Inter text-gray-900 pt-2 mb-4">
                  {currentVideo.title}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="badge px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    {currentVideo.tag}
                  </span>
                  <span className="text-sm">Thời lượng: {currentVideo.duration}</span>
                </div>
              </div>
          </div>

          <Sidebar courses={courses} currentVideo={currentVideo} onSelectVideo={setCurrentVideo} />
        </div>
      </main>
    </div>
  );
}
