import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';

interface HeaderProps {
}

export default function Header({}: HeaderProps) {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
            <a
              href="#contact"
              className="bg-cream-600 text-white font-bold px-6 py-2.5 rounded-full hover:bg-cream-700 transition-all text-sm shadow-sm"
            >
              Contact Us
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center hover:border-neutral-300 transition-colors bg-white z-50"
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
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center bg-cream-600 text-white font-bold py-3 rounded-full hover:bg-cream-700 transition text-sm"
          >
            Inquire Now
          </a>
        </div>
      </div>
    </>
  );
}
