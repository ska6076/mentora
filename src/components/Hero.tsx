import React from 'react';
import { ArrowRight, ChevronDown, BookOpen } from 'lucide-react';

interface HeroProps {
}

export default function Hero({}: HeroProps) {
  const [stats, setStats] = React.useState({ tutors: 512, scholars: 10450 });

  React.useEffect(() => {
    // Statistically healthy baseline
    setStats({ tutors: 512, scholars: 10450 });
  }, []);

  const formattedScholars = "10K+";

  return (
    <section className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-neutral-50/70">
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[800px] w-full h-[500px] bg-cream-100/60 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="flex-1 flex items-center relative z-10">
        <div className="max-w-6xl mx-auto px-6 pt-36 pb-16 text-center">
          
          {/* Active Enrollment Bar */}
          <div className="inline-flex items-center gap-2 bg-white border border-cream-300 rounded-full px-4 py-1.5 mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cream-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cream-500" />
            </span>
            <span className="text-xs font-bold text-neutral-500 tracking-wider uppercase font-heading">
              Enrolling Now for Academic Year 2026-2027
            </span>
          </div>

          {/* Majestic Typography */}
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] hero-text mb-6 w-full">
            Learn. Grow.<br />Succeed.
          </h1>

          <p className="text-neutral-500 text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Mentora Tutors Hub — Connecting Minds, Guiding Futures. More than a tutoring platform, we are a mentor-driven learning hub designed to simplify, personalize, and elevate education.
          </p>

          {/* Action Callouts */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#books"
              className="group bg-cream-600 text-white font-bold px-8 py-4 rounded-full hover:bg-cream-700 hover:scale-[1.01] active:translate-y-0.5 transition-all text-sm flex items-center gap-2 shadow-lg"
              style={{ boxShadow: '0 8px 25px rgba(146,64,14,0.18)' }}
            >
              <BookOpen className="w-4 h-4" />
              Explore Academic Books
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#papers"
              className="group border border-cream-300 text-cream-700 font-bold px-8 py-4 rounded-full hover:border-cream-400 hover:bg-cream-50 bg-white/60 backdrop-blur-sm transition-all duration-300 text-sm flex items-center gap-2"
            >
              <span>Download Model Papers</span>
            </a>
          </div>

          {/* Live Platform Statistics Widgets */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {/* Verified Tutors Indicator */}
            <div className="relative bg-white/80 p-3 rounded-2xl border border-neutral-100 shadow-sm transition-all duration-300 hover:border-neutral-200">
              <div className="font-heading text-xl md:text-3xl font-bold text-neutral-900">
                {stats.tutors}<span className="text-cream-600">+</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">
                Verified Tutors
              </div>
            </div>

            {/* Active Scholars Indicator */}
            <div className="relative bg-white/80 p-3 rounded-2xl border border-neutral-100 shadow-sm transition-all duration-300 hover:border-neutral-200">
              <div className="font-heading text-xl md:text-3xl font-bold text-neutral-900">
                {formattedScholars}
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">
                Active Scholars
              </div>
            </div>

            {/* Success Ratio Indicator */}
            <div className="relative bg-white/80 p-3 rounded-2xl border border-neutral-100 shadow-sm transition-all duration-300 hover:border-neutral-200">
              <div className="font-heading text-xl md:text-3xl font-bold text-neutral-900">
                95<span className="text-cream-600">%</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">
                Success Ratio
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 grid-bg pointer-events-none z-0" />

      <div className="flex justify-center pb-8">
        <ChevronDown className="w-6 h-6 text-cream-500 animate-bounce cursor-pointer" />
      </div>
    </section>
  );
}
