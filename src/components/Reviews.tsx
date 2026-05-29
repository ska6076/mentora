import React, { useState, useEffect } from 'react';
import { Star, GraduationCap, BookOpen, Quote } from 'lucide-react';
import { UserProfile } from '../types';

interface Review {
  id: string;
  name: string;
  role: string;
  type: 'student' | 'tutor';
  comment: string;
  rating: number;
}

const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Parent • Mumbai',
    type: 'student',
    comment: "My daughter's mathematics scoring jumped from 62% to 91% in just 3 months! The matched tutor was highly patient and knew exactly how to simplify complex algebraic theorems. Highly suggested!",
    rating: 5
  },
  {
    id: '2',
    name: 'Prof. Rahul Kumar',
    role: 'Mathematics Tutor • Delhi',
    type: 'tutor',
    comment: "Mentora Tutors Hub transformed my teaching practice. I went from struggling to find active local classes to organizing a fully booked schedule. Direct client communication is excellent.",
    rating: 5
  },
  {
    id: '3',
    name: 'Arjun Patel',
    role: 'Scholar Candidate • Ahmedabad',
    type: 'student',
    comment: 'The JEE previous year analysis sheets and practice model briefs are excellent. The daily Telegram updates kept my revisions targeted. Cracked the first phase seamlessly!',
    rating: 5
  },
  {
    id: '4',
    name: 'Dr. Sneha Mehta',
    role: 'Science Tutor • Pune Academy',
    type: 'tutor',
    comment: 'As a private educator, safety and verification are highly prioritized. Mentora validates profiles meticulously. It is easily the safest teaching hub in the country.',
    rating: 4
  },
  {
    id: '5',
    name: 'Vikram Reddy',
    role: 'Parent • Hyderabad',
    type: 'student',
    comment: 'Extremely content with the home tutoring setup. The physical tutor is highly punctual, academically resourceful, and my child looks forward to chemical reactions classes now!',
    rating: 5
  },
  {
    id: '6',
    name: 'Neha Kapoor',
    role: 'English Teacher • Bangalore',
    type: 'tutor',
    comment: 'I guide high school writing compositions part-time while pursuing structural research. Flexible calendars and seamless weekly payments make this an elite side employment choice.',
    rating: 5
  }
];

export default function Reviews({ profile, onOpenLogin }: { profile?: UserProfile | null; onOpenLogin?: () => void }) {
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Dynamic reviews local persistence
  const [localReviews, setLocalReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('mentora_public_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Error recovering public reviews', err);
      }
    }
    return [];
  });

  // Review Form States
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [type, setType] = useState<'student' | 'tutor'>('student');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Auto pre-fill if profile exists
  useEffect(() => {
    if (profile) {
      setName(profile.fullName || '');
      setType(profile.role === 'tutor' ? 'tutor' : 'student');
      setRole(
        profile.role === 'tutor'
          ? `Tutor • ${profile.subjects || profile.qualification || 'Educator'}`
          : `Parent • Class ${profile.grade || 'Scholar'}`
      );
    }
  }, [profile]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) {
      setErrorMsg('Please log in first to write a review.');
      return;
    }
    if (!name.trim()) {
      setErrorMsg('Please specify your name.');
      return;
    }
    if (!comment.trim()) {
      setErrorMsg('Please write a review comment.');
      return;
    }

    const newRev: Review = {
      id: `local_${Date.now()}`,
      name: name.trim(),
      role: role.trim() || (type === 'tutor' ? 'Expert Private Educator' : 'Scholar Parent'),
      type,
      comment: comment.trim(),
      rating
    };

    const updated = [newRev, ...localReviews];
    setLocalReviews(updated);
    localStorage.setItem('mentora_public_reviews', JSON.stringify(updated));

    // Reset comment
    setComment('');
    setErrorMsg('');
    setSuccessMsg('Your review was successfully submitted and added to the public board! ✨');

    setTimeout(() => {
      setSuccessMsg('');
    }, 5000);
  };

  const allReviews = [...localReviews, ...REVIEWS_DATA];

  // Dynamic board statistics
  const totalReviewsCount = allReviews.length;
  const ratingSum = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalReviewsCount > 0 ? (ratingSum / totalReviewsCount).toFixed(1) : '5.0';
  const roundedAvgRating = Math.round(Number(averageRating));

  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  allReviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 5 | 4 | 3 | 2 | 1;
    starCounts[star] += 1;
  });

  const ratingStats = [
    { stars: '5★', percent: totalReviewsCount > 0 ? Math.round((starCounts[5] / totalReviewsCount) * 100) : 0 },
    { stars: '4★', percent: totalReviewsCount > 0 ? Math.round((starCounts[4] / totalReviewsCount) * 100) : 0 },
    { stars: '3★', percent: totalReviewsCount > 0 ? Math.round((starCounts[3] / totalReviewsCount) * 100) : 0 },
    { stars: '2★', percent: totalReviewsCount > 0 ? Math.round((starCounts[2] / totalReviewsCount) * 100) : 0 },
    { stars: '1★', percent: totalReviewsCount > 0 ? Math.round((starCounts[1] / totalReviewsCount) * 100) : 0 }
  ];

  const filtered = allReviews.filter(
    (r) => activeTab === 'all' || r.type === activeTab
  );

  return (
    <section id="reviews" className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[700px] w-full h-[500px] bg-cream-100/30 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
            Acclamations & Reviews
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            What People Are <span className="hero-text">Saying</span>
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto text-sm">
            Read direct real-world reviews from families and expert educators on their Mentora successes.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Reviews', icon: null },
            { id: 'student', label: 'Parents & Scholars', icon: <GraduationCap className="w-3.5 h-3.5" /> },
            { id: 'tutor', label: 'Expert Tutors', icon: <BookOpen className="w-3.5 h-3.5" /> }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-xs font-bold px-5 py-2.5 rounded-full border flex items-center gap-1.5 transition-all outline-none ${
                  isSelected
                    ? 'bg-cream-100 border-cream-300 text-cream-700 font-bold'
                    : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Reviews Block Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-neutral-200 hover:border-cream-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
            >
              <div>
                <Quote className="absolute top-4 right-4 w-10 h-10 text-cream-100 stroke-[1.5]" />
                
                {/* Visual stars rating */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'text-cream-500 fill-cream-500' : 'text-neutral-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed italic pr-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-cream-100 border border-cream-200 flex items-center justify-center font-bold text-xs text-cream-700">
                  {rev.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <h5 className="text-xs font-bold text-neutral-900 truncate">{rev.name}</h5>
                  <p className="text-[10px] text-neutral-400 font-medium truncate">{rev.role}</p>
                </div>
                <span className={`ml-auto text-[9px] font-bold px-2.5 py-0.5 rounded-full border uppercase shrink-0 ${
                  rev.type === 'tutor' 
                    ? 'bg-cream-600 text-white border-cream-700' 
                    : 'bg-cream-50 border-cream-200 text-cream-700'
                }`}>
                  {rev.type}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full bg-white border border-neutral-200 rounded-2xl p-12 text-center text-neutral-400 text-xs">
              No reviews registered yet for this category. Be the first to write one!
            </div>
          )}
        </div>

        {/* Bottom Section: Side-by-side Stats and Submission Form */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto mt-16 items-start">
          
          {/* General Assessment Statistics Summary Card */}
          <div className="lg:col-span-5 bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm">
            <h4 className="font-heading text-lg font-bold text-neutral-800 mb-4">Board Trust Metrics</h4>
            <div className="text-center border-b border-neutral-100 pb-6 mb-6">
              <div className="font-heading text-5xl font-bold text-neutral-900">
                {averageRating}<span className="text-cream-500 text-3xl">/5</span>
              </div>
              <div className="flex items-center justify-center gap-0.5 mt-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < roundedAvgRating ? 'text-cream-500 fill-cream-500' : 'text-neutral-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-[10px] font-bold text-neutral-400 mt-2 uppercase tracking-wider">
                From {2400 + localReviews.length}+ Verified submissions
              </p>
            </div>

            <div className="space-y-2.5">
              {ratingStats.map((bar, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-neutral-400 w-6 text-right font-sans">
                    {bar.stars}
                  </span>
                  <div className="flex-1 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cream-500 rounded-full transition-all"
                      style={{ width: `${bar.percent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 w-8 text-left font-sans">
                    {bar.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Public Experience Submission Form */}
          <div className="lg:col-span-7 bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 shadow-sm relative">
            <h4 className="font-heading text-lg font-bold text-neutral-800 mb-1">Share Your Public Experience</h4>
            <p className="text-xs text-neutral-400 mb-6 font-medium">Your public appraisal guides potential students and verifies top tutor matches.</p>

            {!profile ? (
              <div className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4 border border-dashed border-neutral-200 bg-neutral-50/50 rounded-2xl">
                <div className="w-12 h-12 bg-cream-100 border border-cream-200 rounded-2xl flex items-center justify-center text-cream-600">
                  <GraduationCap className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h5 className="font-heading text-sm font-bold text-neutral-800">Account Log In Required</h5>
                  <p className="text-[11px] text-neutral-500 mt-1 max-w-sm leading-relaxed">
                    Only registered Parents, Students, and Tutors of Mentora Tutors Hub can share public appraisals. Use your authenticated academic credentials!
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="bg-cream-600 hover:bg-cream-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs tracking-wider uppercase font-heading hover:shadow-md transition-all active:scale-95 duration-150"
                >
                  Log In or Register to Review 🚀
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                {errorMsg && (
                  <p className="bg-red-50 text-red-700 text-[11px] font-bold px-3 py-2 rounded-xl border border-red-200">
                    ⚠️ {errorMsg}
                  </p>
                )}
                {successMsg && (
                  <p className="bg-green-50 text-green-700 text-[11px] font-bold px-3 py-2 rounded-xl border border-green-200">
                    ✨ {successMsg}
                  </p>
                )}

                {/* Logged in credentials showcase card */}
                <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-cream-600 border border-[#b45309] text-white flex items-center justify-center font-bold text-xs">
                    {name ? name.split(' ').map((n) => n[0]).join('') : 'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase font-bold text-cream-700 tracking-wider block">Verified Academic Profile</span>
                    <h5 className="text-xs font-bold text-neutral-800 truncate">{name}</h5>
                    <p className="text-[10px] text-neutral-400 font-medium truncate mt-0.5">{role}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full border uppercase shrink-0 tracking-wider ${
                    type === 'tutor' 
                      ? 'bg-cream-600 border-[#b45309] text-white' 
                      : 'bg-white border-[#fed7aa] text-cream-700'
                  }`}>
                    {type === 'tutor' ? 'Expert Tutor' : 'Verified Member'}
                  </span>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1.5">Quality Assessment Score</label>
                  <div className="flex items-center gap-1.5 p-1 bg-neutral-50 border border-neutral-200/60 rounded-xl max-w-max">
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isStarred = (hoveredRating !== null ? hoveredRating : rating) >= starValue;
                      return (
                        <button
                          type="button"
                          key={starValue}
                          onClick={() => setRating(starValue)}
                          onMouseEnter={() => setHoveredRating(starValue)}
                          onMouseLeave={() => setHoveredRating(null)}
                          className="focus:outline-none transition-transform active:scale-90 duration-700"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              isStarred
                                ? 'text-cream-500 fill-cream-500 drop-shadow-[0_1px_2px_rgba(200,149,106,0.15)]'
                                : 'text-neutral-200 hover:text-cream-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                    <span className="text-[10px] font-extrabold text-neutral-500 ml-2 capitalize font-sans pr-2">
                      {rating === 5 ? 'Excellent' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : rating === 2 ? 'Disappointment' : 'Poor'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-neutral-400 mb-1">Your Evaluation / Comment</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us about the accredited tutors matched, resources accessed, or your learning accomplishments..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cream-600 font-medium text-neutral-800 placeholder-neutral-400 resize-none transition-all leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#92400e] hover:bg-[#78350f] text-white font-bold py-3 text-xs rounded-xl tracking-wider uppercase font-heading hover:shadow-md transition-all active:scale-[0.99] duration-150"
                >
                  Publish Certified Appraisal Form 🚀
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
