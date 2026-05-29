import React from 'react';
import { ArrowRight, UserPlus, LogIn, ChevronDown, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface HeroProps {
  profile: UserProfile | null;
  onOpenSignup: (role: 'parent' | 'tutor') => void;
  onOpenLogin: () => void;
}

export default function Hero({ profile, onOpenSignup, onOpenLogin }: HeroProps) {
  const [stats, setStats] = React.useState({ tutors: 500, scholars: 10000 });

  React.useEffect(() => {
    const loadStats = () => {
      try {
        const localUsersRaw = localStorage.getItem('mentora_offline_registered_users');
        const localUsers = localUsersRaw ? JSON.parse(localUsersRaw) : [];
        
        let tutorsCount = 0;
        let scholarsCount = 0;
        
        localUsers.forEach((u: any) => {
          if (u.profile?.role === 'tutor') {
            tutorsCount++;
          } else if (u.profile?.role === 'parent') {
            scholarsCount++;
          }
        });

        // Ensure we count the currently logged-in profile if it's not present in the local database list
        if (profile) {
          const alreadyInList = localUsers.some(
            (u: any) => u.email?.toLowerCase() === profile.email?.toLowerCase()
          );
          if (!alreadyInList) {
            if (profile.role === 'tutor') {
              tutorsCount++;
            } else if (profile.role === 'parent') {
              scholarsCount++;
            }
          }
        }

        setStats({
          tutors: 500 + tutorsCount,
          scholars: 10000 + scholarsCount
        });
      } catch (err) {
        console.error('Error calculating dynamic hero statistics:', err);
      }
    };

    loadStats();
    
    // We can listen to a custom storage event, or run when the profile changes
    window.addEventListener('storage', loadStats);
    
    // Custom trigger event occasionally sent from forms
    window.addEventListener('user_profile_updated', loadStats);
    
    return () => {
      window.removeEventListener('storage', loadStats);
      window.removeEventListener('user_profile_updated', loadStats);
    };
  }, [profile]);

  // Derive display values
  const formattedScholars = stats.scholars >= 10000 
    ? `${(stats.scholars / 1000).toFixed(1).replace('.0', '')}K`
    : stats.scholars.toLocaleString();

  return (
    <section className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-neutral-50/70">
      {/* Background radial soft light gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[800px] w-full h-[500px] bg-cream-100/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 bottom-0 grid-bg pointer-events-none" />
      
      <div className="flex-1 flex items-center">
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
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] hero-text mb-6">
            Learn. Grow.<br />Succeed.
          </h1>

          <p className="text-neutral-500 text-sm md:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Mentora Tutors Hub — Connecting Minds, Guiding Futures. More than a tutoring platform, we are a mentor-driven learning hub designed to simplify, personalize, and elevate education.
          </p>

          {/* Action Callouts */}
          {!profile ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenSignup('parent')}
                className="group bg-cream-600 text-white font-bold px-8 py-4 rounded-full hover:bg-cream-700 hover:scale-[1.01] active:translate-y-0.5 transition-all text-sm flex items-center gap-2 shadow-lg"
                style={{ boxShadow: '0 8px 25px rgba(146,64,14,0.18)' }}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenLogin}
                className="group border border-cream-300 text-cream-700 font-bold px-8 py-4 rounded-full hover:border-cream-400 hover:bg-cream-50 bg-white/60 backdrop-blur-sm transition-all duration-300 text-sm flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Log In
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
              <a
                href="#dashboard"
                className="group bg-[#92400e] text-white font-bold px-8 py-4 rounded-full hover:bg-[#78350f] hover:scale-[1.01] active:translate-y-0.5 transition-all text-sm flex items-center gap-2.5 shadow-lg"
                style={{ boxShadow: '0 8px 25px rgba(146,64,14,0.18)' }}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Go to Your Profile Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-xs text-neutral-400 font-medium">
                Signed in securely as <span className="font-bold text-neutral-700">{profile.fullName}</span> ({profile.email})
              </p>
            </div>
          )}

          {/* Live Platform Statistics Widgets */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {/* Verified Tutors Indicator */}
            <div className={`relative p-3 rounded-2xl border transition-all duration-300 ${
              profile?.role === 'tutor'
                ? 'bg-[#fffbeb]/95 border-[#fcdc94]/80 ring-4 ring-cream-600/10 scale-[1.04] shadow-md'
                : 'bg-white/80 border-neutral-100 shadow-sm hover:border-neutral-200'
            }`}>
              {profile?.role === 'tutor' && (
                <div className="absolute -top-1.5 -right-1.5 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse z-10" title="You are Online" />
              )}
              <div className="font-heading text-xl md:text-3xl font-bold text-neutral-900">
                {stats.tutors}<span className="text-cream-600">+</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">
                Verified Tutors
              </div>
              {profile?.role === 'tutor' && (
                <div className="text-[8px] font-extrabold text-[#92400e] uppercase tracking-wider mt-1.5 leading-relaxed">
                  Your Account Online 🟢
                </div>
              )}
            </div>

            {/* Active Scholars Indicator */}
            <div className={`relative p-3 rounded-2xl border transition-all duration-300 ${
              profile?.role === 'parent'
                ? 'bg-[#fffbeb]/95 border-[#fcdc94]/80 ring-4 ring-cream-600/10 scale-[1.04] shadow-md'
                : 'bg-white/80 border-neutral-100 shadow-sm hover:border-neutral-200'
            }`}>
              {profile?.role === 'parent' && (
                <div className="absolute -top-1.5 -right-1.5 bg-green-500 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse z-10" title="You are Connected" />
              )}
              <div className="font-heading text-xl md:text-3xl font-bold text-neutral-900">
                {formattedScholars}<span className="text-cream-600">+</span>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400 mt-0.5">
                Active Scholars
              </div>
              {profile?.role === 'parent' && (
                <div className="text-[8px] font-extrabold text-[#92400e] uppercase tracking-wider mt-1.5 leading-relaxed">
                  You are Active! 🎓
                </div>
              )}
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

      <div className="flex justify-center pb-8">
        <ChevronDown className="w-6 h-6 text-cream-500 animate-bounce cursor-pointer" />
      </div>
    </section>
  );
}
