import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus, LogOut, ChevronDown, MessageCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile | null;
  onOpenLogin: () => void;
  onOpenSignup: (role: 'parent' | 'tutor') => void;
  onLogout: () => void;
}

export default function Header({ profile, onOpenLogin, onOpenSignup, onLogout }: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-100 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="font-brand text-xl font-bold tracking-tight text-neutral-900">
            Mentora Tutors Hub<span className="text-cream-600">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-7">
            <a href="#books" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
              Books
            </a>
            <a href="#papers" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
              Papers
            </a>
            <a href="#results" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
              Results
            </a>
            <a href="#whatsapp" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-green-500 fill-green-500" />
              WhatsApp
            </a>
            <a href="#reviews" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
              Reviews
            </a>
            <a href="#faq" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
              FAQs
            </a>
            <a href="#contact" className="text-sm font-semibold text-neutral-500 hover:text-neutral-900 transition-colors font-sans">
              Contact
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {profile ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-cream-50 border border-cream-200 px-4 py-2.5 rounded-full text-sm font-bold text-cream-700 hover:bg-cream-100 transition-all"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-cream-500 animate-custom-ping" />
                  👤 Hi, {profile.fullName.split(' ')[0]}
                  <ChevronDown className="w-4 h-4" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-neutral-200 rounded-2xl shadow-xl py-2 z-50 animate-fade-in">
                    <a
                      href="#dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-cream-100 hover:text-cream-800 transition"
                    >
                      My Class Dashboard
                    </a>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left block px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 transition"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 text-sm font-bold text-cream-600 hover:text-cream-700 px-4 py-2.5 rounded-full border border-cream-300 hover:border-cream-400 hover:bg-cream-50 transition-all duration-300"
                >
                  <LogIn className="w-4 h-4" />
                  Log In
                </button>
                <button
                  onClick={() => onOpenSignup('parent')}
                  className="bg-cream-600 text-white font-bold px-5 py-2.5 rounded-full hover:bg-cream-700 transition-all text-sm shadow-sm flex items-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-300 transition-colors bg-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-neutral-700" /> : <Menu className="w-5 h-5 text-neutral-700" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-45 bg-white/98 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <a href="#" className="font-brand text-xl font-bold tracking-tight text-neutral-900">
            Mentora<span className="text-cream-600">.</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col items-center justify-center gap-6">
          <a
            href="#books"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-cream-600 transition"
          >
            Books
          </a>
          <a
            href="#papers"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-cream-600 transition"
          >
            Papers
          </a>
          <a
            href="#results"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-cream-600 transition"
          >
            Results
          </a>
          <a
            href="#whatsapp"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-green-600 transition flex items-center gap-1.5"
          >
            <MessageCircle className="w-5 h-5 text-green-500 fill-green-500" />
            WhatsApp Channel
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-cream-600 transition"
          >
            Reviews
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-cream-600 transition"
          >
            FAQs
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="font-heading text-2xl font-bold text-neutral-800 hover:text-cream-600 transition"
          >
            Contact
          </a>
        </nav>

        <div className="p-12 border-t border-neutral-100 flex flex-col gap-3">
          {profile ? (
            <>
              <div className="text-center mb-2">
                <p className="text-sm font-semibold text-neutral-700">Account: {profile.fullName}</p>
                <p className="text-xs text-neutral-400 capitalize">Role: {profile.role}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-full transition text-sm flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full border border-cream-300 text-cream-600 font-bold py-3 rounded-full hover:bg-cream-50 transition text-sm"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSignup('parent');
                }}
                className="w-full bg-cream-600 text-white font-bold py-3 rounded-full hover:bg-cream-700 transition text-sm"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
