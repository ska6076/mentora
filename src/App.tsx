import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import UserProfileDashboard from './components/UserProfileDashboard';
import BookList from './components/BookList';
import PaperList from './components/PaperList';
import ExamResults from './components/ExamResults';
import WhatsappCTA from './components/WhatsappCTA';
import Reviews from './components/Reviews';
import FAQs from './components/FAQs';
import Contact from './components/Contact';
import AuthModal from './components/AuthModal';
import { UserProfile, UserRole } from './types';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { GraduationCap, BookOpen, AlertTriangle } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [activeSignupRole, setActiveSignupRole] = useState<UserRole>('parent');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [firebaseWarning, setFirebaseWarning] = useState<boolean>(false);

  // Synchronize dynamic session listeners
  useEffect(() => {
    // Standard localStorage recovery for demo profiles before database activation
    const saved = localStorage.getItem('mentora_local_user_session');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (err) {
        console.error('Error recovering local backup session', err);
      }
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            // Attempt to retrieve profile from Firestore
            const docSnap = await getDoc(doc(db, 'users', user.uid));
            if (docSnap.exists()) {
              const fsProfile = docSnap.data() as UserProfile;
              setProfile(fsProfile);
              localStorage.setItem('mentora_local_user_session', JSON.stringify(fsProfile));
            } else {
              // Construct a default metadata profile if writing was pending
              const backupProfile: UserProfile = {
                uid: user.uid,
                fullName: user.displayName || 'Authentic Scholar',
                email: user.email || '',
                phone: '',
                role: 'parent',
                preferredMode: 'online',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              setProfile(backupProfile);
              localStorage.setItem('mentora_local_user_session', JSON.stringify(backupProfile));
            }
          } catch (dbErr) {
            console.warn('Firestore not fully initialized. Operating on secure authorization fallback.', dbErr);
            setFirebaseWarning(true);
          }
        }
      });
      return () => unsubscribe();
    } catch (authErr) {
      console.warn('Firebase Authentication is pending user project setup.', authErr);
      setFirebaseWarning(true);
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenLogin = () => {
    setAuthModalMode('login');
    setAuthModalOpen(true);
  };

  const handleOpenSignup = (role: UserRole = 'parent') => {
    setActiveSignupRole(role);
    setAuthModalMode('signup');
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('mentora_local_user_session', JSON.stringify(newProfile));
    triggerToast(`Welcome back, ${newProfile.fullName}! Session is persistently active ✨`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Auth system uninitialized. Clearing local mock tokens.');
    }
    setProfile(null);
    localStorage.removeItem('mentora_local_user_session');
    triggerToast('Logged out of Mentora Tutors Hub successfully.');
  };

  const handleUpdateProfile = (updated: UserProfile) => {
    setProfile(updated);
    localStorage.setItem('mentora_local_user_session', JSON.stringify(updated));
    triggerToast('Database records synchronized successfully.');
  };

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
      <Header
        profile={profile}
        onOpenLogin={handleOpenLogin}
        onOpenSignup={handleOpenSignup}
        onLogout={handleLogout}
      />

      {/* Setup alerts banner */}
      {firebaseWarning && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs px-6 py-3 mt-16 text-center font-bold flex items-center justify-center gap-1.5 z-30">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Note: Firebase connection is in safe mock mode as terms are pending user acceptance. All login credentials and dashboard milestones are persistent locally!</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 select-none">
        
        {/* Dynamic Hero component */}
        <Hero
          profile={profile}
          onOpenSignup={handleOpenSignup}
          onOpenLogin={handleOpenLogin}
        />

        {/* PROFILE REVISION DASHBOARD PANEL */}
        {profile && (
          <UserProfileDashboard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
          />
        )}

        {/* HOW TO REGISTER DETAILED INFORMATION SCREEN */}
        {!profile && (
          <section id="register" className="py-24 bg-white relative border-t border-b border-neutral-100">
            <div className="absolute top-0 right-0 max-w-[600px] w-full h-[400px] bg-[#fff8f0]/60 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6 relative">
              <div className="text-center mb-16">
                <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
                  Join Mentora Tutors Hub
                </span>
                <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
                  How to <span className="hero-text">Register Your Profile</span>
                </h2>
                <p className="text-neutral-500 max-w-sm mx-auto text-sm">
                  Unlock unrestricted access to reference textbooks, mock exam prep sheets, and expert tutors in under 2 minutes.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                
                {/* Parent instructions card */}
                <div className="border border-neutral-200 hover:border-cream-300 rounded-3xl p-8 bg-white relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff8f0] rounded-full blur-3xl pointer-events-none group-hover:bg-[#ffedd5] transition-all" />
                  <div className="relative space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-center text-cream-600">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-neutral-900">For Parents & Students</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Secure elite-level academic performance guidelines for your children. Monitor achievements, schedule online lesson reviews, and let them learn.
                    </p>
                    
                    <ol className="space-y-2.5 text-xs text-neutral-600 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-cream-600 border border-cream-200 flex items-center justify-center text-[10px]">1</span>
                        Provide basic contact details and current grade
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-cream-600 border border-cream-200 flex items-center justify-center text-[10px]">2</span>
                        Opt for online streams vs. physical home tuition
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-cream-600 border border-cream-200 flex items-center justify-center text-[10px]">3</span>
                        Match with elite accredited subject educators
                      </li>
                    </ol>

                    <button
                      onClick={() => handleOpenSignup('parent')}
                      className="w-full bg-[#92400e] text-white font-bold py-3 rounded-2xl hover:bg-[#78350f] transition-all text-xs flex items-center justify-center gap-1 shadow-sm mt-4"
                    >
                      🚀 Sign Up as Parent/Scholar
                    </button>
                  </div>
                </div>

                {/* Tutor instructions card */}
                <div className="border border-neutral-200 hover:border-cream-300 rounded-3xl p-8 bg-white relative overflow-hidden group shadow-sm transition-all duration-300 hover:shadow-md">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff8f0] rounded-full blur-3xl pointer-events-none group-hover:bg-[#ffedd5] transition-all" />
                  <div className="relative space-y-5">
                    <div className="w-12 h-12 rounded-2xl bg-cream-100 border border-cream-200 flex items-center justify-center text-cream-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-neutral-900">For Expert Educators</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Distribute academic expertise and earn outstanding rates based on custom hourly structures. Connect safely with local and online clients.
                    </p>

                    <ol className="space-y-2.5 text-xs text-neutral-600 font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-cream-600 border border-cream-200 flex items-center justify-center text-[10px]">1</span>
                        Register qualifications, experience, and subjects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-cream-600 border border-cream-200 flex items-center justify-center text-[10px]">2</span>
                        Submit academic certificates for screening review
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cream-100 text-cream-600 border border-cream-200 flex items-center justify-center text-[10px]">3</span>
                        Acquire direct slots and commence coaching sessions
                      </li>
                    </ol>

                    <button
                      onClick={() => handleOpenSignup('tutor')}
                      className="w-full border-2 border-[#c8956a] text-[#92400e] hover:bg-cream-50 font-bold py-2.5 rounded-2xl transition-all text-xs flex items-center justify-center gap-1 mt-4"
                    >
                      📝 Join Mentora Tutor Network
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* Text recommendations section */}
        <BookList
          profile={profile}
          onOpenLogin={handleOpenLogin}
        />

        {/* Specs papers sections */}
        <PaperList
          profile={profile}
          onOpenSignup={handleOpenLogin}
        />

        {/* Interactive searchable dynamic outcomes directory */}
        <ExamResults />

        {/* Telegram/WhatsApp Channel Mock segment */}
        <WhatsappCTA />

        {/* Comprehensive public evaluations */}
        <Reviews profile={profile} onOpenLogin={handleOpenLogin} />

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
                <li><a href="#register" className="hover:text-cream-600 transition">Syllabus Guidance</a></li>
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

      {/* Dynamic Authorization Popup Component */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        signupRole={activeSignupRole}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
