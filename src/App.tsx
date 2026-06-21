import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookList from './components/BookList';
import PaperList from './components/PaperList';
import ExamResults from './components/ExamResults';
import WhatsappCTA from './components/WhatsappCTA';
import Reviews from './components/Reviews';
import FAQs from './components/FAQs';
import Contact from './components/Contact';


export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Modern organic button ripple click effects
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('button, a, [role="button"]');
      if (!target) return;

      // Add relative positioning and overflow-hidden to contain ripple
      target.classList.add('ripple-container');

      const rect = target.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-bubble';
      
      const x = e.clientX - rect.left - radius;
      const y = e.clientY - rect.top - radius;

      ripple.style.width = `${diameter}px`;
      ripple.style.height = `${diameter}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      target.appendChild(ripple);
      
      // Auto-remove ripple once transition finishes
      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    document.removeEventListener('click', handleGlobalClick);
    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className="grain min-h-screen flex flex-col justify-between relative bg-neutral-50/20">
      
      {/* Toast Alert popups */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#3d1c06] text-[#fff8f0] px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-[#c8956a]/30 animate-fade-in">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Navigation Section */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 select-none">
        
        {/* Dynamic Hero component */}
        <Hero />



        {/* Text recommendations section */}
        <BookList />

        {/* Specs papers sections */}
        <PaperList />

        {/* Interactive searchable dynamic outcomes directory */}
        <ExamResults />

        {/* Telegram/WhatsApp Channel Mock segment */}
        <WhatsappCTA />

        {/* Comprehensive public evaluations */}
        <Reviews />

        {/* Accordions */}
        <FAQs />

        {/* Form queries mapping */}
        <Contact />

      </main>

      {/* Footer Credentials */}
      <footer className="border-t border-neutral-200 py-16 bg-white flex-shrink-0">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-1 space-y-4">
              <a href="#" className="font-brand text-xl font-bold tracking-tight text-neutral-900 block">
                Mentora Tutors Hub<span className="text-cream-600">.</span>
              </a>
              <p className="text-xs text-neutral-400 leading-relaxed max-w-[200px]">
                Connecting eager minds with premium accredited subject mentors to unleash scholastic excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-heading text-xs font-bold text-neutral-900 uppercase tracking-widest mb-4">Scholastic Help</h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-semibold">
                <li><a href="#papers" className="hover:text-cream-600 transition">Syllabus Guidance</a></li>
                <li><a href="#books" className="hover:text-cream-600 transition">Suggested Books</a></li>
                <li><a href="#papers" className="hover:text-cream-600 transition">Curated Specimen Mocks</a></li>
                <li><a href="#results" className="hover:text-cream-600 transition">Result Portal Keys</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-neutral-900 uppercase tracking-widest mb-4">Company Guidelines</h4>
              <ul className="space-y-2.5 text-xs text-neutral-400 font-semibold">
                <li><a href="#" className="hover:text-cream-600 transition">Tutor Safety Charter</a></li>
                <li><a href="#" className="hover:text-cream-600 transition">Privacy Coordination</a></li>
                <li><a href="#" className="hover:text-cream-600 transition">Terms of Enrollment</a></li>
                <li><a href="#" className="hover:text-cream-600 transition">Payment Safeguards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-xs font-bold text-neutral-900 uppercase tracking-widest mb-4">Platform Updates</h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">Follow our social feeds or WhatsApp to monitor standard exam briefs.</p>
              <a href="https://whatsapp.com/channel/0029Vb7ZRnHBadmWa6Ey4U0I" target="_blank" className="text-xs font-extrabold text-green-600 hover:underline">
                💬 Official WhatsApp Broadcast Link
              </a>
            </div>
          </div>

          <div className="border-t border-neutral-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
            <p>© 2026 Mentora Tutors Hub. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-neutral-600 transition">Class Registration Rules</a>
              <span>•</span>
              <a href="#" className="hover:text-neutral-600 transition">Tutor Verification Criteria</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
