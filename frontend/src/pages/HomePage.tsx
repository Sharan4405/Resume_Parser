'use client';

import { useState } from 'react';
import Header from '@/src/components/Header';
import Hero from '@/src/components/Hero';
import Footer from '@/src/components/Footer';
import ResumeUploader from '@/src/components/ResumeUploader';
import ResumeDisplay from '@/src/components/ResumeDisplay';

export default function HomePage() {
  const [parsedData, setParsedData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      
      <div className="relative">
        <Header />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Hero />

          {/* Upload and Display Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            <ResumeUploader 
              setParsedData={setParsedData}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
            
            <ResumeDisplay 
              data={parsedData}
              isLoading={isLoading}
            />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
