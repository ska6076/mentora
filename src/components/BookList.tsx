import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronRight, BookCheck, Search } from 'lucide-react';
import { BookRecommendation } from '../types';

interface BookListProps {
}

const DEFAULT_BOOKS: BookRecommendation[] = [
  {
    id: 'rd_sharma',
    title: 'RD Sharma — Mathematics Class 10',
    subject: 'Mathematics',
    grade: 'Class 10',
    description: 'Comprehensive mathematics textbook with abundant step-by-step solved illustrations and model mock papers recommended by top subject experts.',
    emoji: '📐'
  },
  {
    id: 'ncert_exemplar',
    title: 'NCERT Exemplar — Board Science',
    subject: 'Science',
    grade: 'Class 10-12',
    description: 'Advanced logical reasoning tasks and objective assessment problems chosen to establish absolute conceptual mastery over complex natural sciences.',
    emoji: '🔬'
  },
  {
    id: 'wren_martin',
    title: 'Wren & Martin — High School English',
    subject: 'English',
    grade: 'All Grades',
    description: 'The definitive classic guide to English grammar, styling syntax patterns, descriptive compositions, and creative sentence structures.',
    emoji: '📖'
  },
  {
    id: 'hc_verma',
    title: 'HC Verma — Concepts of Physics (Vol 1 & 2)',
    subject: 'Physics',
    grade: 'Class 11-12 & JEE',
    description: 'A masterpiece study guide linking real-world kinematics with computational abstractions. Highly prioritized for JEE advanced aspirants.',
    emoji: '⚛️'
  },
  {
    id: 'op_tandon',
    title: 'OP Tandon — Organic Chemistry Guide',
    subject: 'Chemistry',
    grade: 'Class 11-12 & NEET',
    description: 'Explains chemical bonds, reaction structures, and hydrocarbons using streamlined formulas and detailed procedural breakdowns.',
    emoji: '🧪'
  },
  {
    id: 'cengage',
    title: 'Cengage Series — Advanced Algebra',
    subject: 'Mathematics',
    grade: 'JEE Prep',
    description: 'High difficulty challenge problems designed specifically to build elite-level speed and precision in engineering entrants.',
    emoji: '🧮'
  }
];

export default function BookList({}: BookListProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Trigger loading spinner/skeleton mock API loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Handle active filter with an organic simulated micro-reload
  const handleFilterChange = (filterId: string) => {
    setLoading(true);
    setActiveFilter(filterId);
    setTimeout(() => {
      setLoading(false);
    }, 450);
  };

  // Handle search inputs with simulated short load state
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const filteredBooks = DEFAULT_BOOKS.filter((book) => {
    // 1. Tag / Category Filter
    let matchesCategory = true;
    if (activeFilter === 'math') {
      matchesCategory = book.subject === 'Mathematics';
    } else if (activeFilter === 'science') {
      matchesCategory = ['Science', 'Physics', 'Chemistry'].includes(book.subject);
    } else if (activeFilter === 'english') {
      matchesCategory = book.subject === 'English';
    } else if (activeFilter === 'senior') {
      matchesCategory = 
        book.grade.includes('11-12') || 
        book.grade.includes('Prep') || 
        book.grade.includes('JEE') || 
        book.grade.includes('NEET');
    }

    // 2. Search query matches title, subject, grade, description
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      book.title.toLowerCase().includes(searchLower) ||
      book.subject.toLowerCase().includes(searchLower) ||
      book.grade.toLowerCase().includes(searchLower) ||
      book.description.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="books" className="py-24 bg-neutral-50 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
            Academic Catalogs
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            Suggested <span className="hero-text">Reference Books</span>
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto text-sm">
            Hand-picked resources curated by Mentora educators to guide your learning track.
          </p>
        </div>

        {/* Dynamic Search & Filters aligned with the Exam Results component formatting */}
        <div className="max-w-2xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reference books by title, subject, or grade (e.g. Mathematics, Class 10)..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-cream-500 focus:ring-2 focus:ring-cream-500/10 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {[
              { id: 'all', label: '📚 All Books' },
              { id: 'math', label: '📐 Mathematics' },
              { id: 'science', label: '🔬 Science & Prep' },
              { id: 'english', label: '✍️ English' },
              { id: 'senior', label: '🎓 Senior Prep' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-full border transition-all ${
                  activeFilter === filter.id
                    ? 'bg-[#92400e] border-[#92400e] text-white'
                    : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`book-skeleton-${index}`}
                className="bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between h-[410px]"
              >
                <div className="flex-1">
                  <div className="h-44 bg-neutral-100 flex items-center justify-center border-b border-neutral-100 relative overflow-hidden">
                    <div className="w-16 h-16 rounded-full skeleton-shimmer" />
                    <div className="absolute bottom-3 left-4 w-20 h-5 rounded-full skeleton-shimmer" />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="w-24 h-4 rounded skeleton-shimmer" />
                    <div className="w-5/6 h-5 rounded skeleton-shimmer" />
                    <div className="space-y-2 pt-2">
                      <div className="w-full h-3 rounded skeleton-shimmer" />
                      <div className="w-4/5 h-3 rounded skeleton-shimmer" />
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 mt-3 border-t border-neutral-100/50 flex justify-between items-center bg-cream-50/10">
                  <div className="w-20 h-4 rounded skeleton-shimmer" />
                  <div className="w-24 h-4 rounded skeleton-shimmer" />
                </div>
              </div>
            ))
          ) : (
            filteredBooks.map((book) => {
              return (
                <div
                  key={book.id}
                  className="group relative bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 hover:border-cream-300 hover:shadow-lg flex flex-col justify-between"
                >
                  <div className="flex-1">
                    {/* Subject Badge & Graphic Banner */}
                    <div className="h-44 bg-gradient-to-br from-cream-100/50 to-cream-100/80 flex items-center justify-center border-b border-neutral-100 relative">
                      <div className="text-6xl select-none group-hover:scale-105 transition-transform duration-300">
                        {book.emoji}
                      </div>
                      <span className="absolute bottom-3 left-4 text-[10px] font-bold tracking-widest text-[#92400e] bg-cream-200 border border-cream-300 uppercase px-2 py-0.5 rounded-full">
                        {book.subject}
                      </span>
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        {book.grade} Choice
                      </p>
                      <h4 className="font-heading text-lg font-bold text-neutral-950 mt-1 mb-2.5">
                        {book.title}
                      </h4>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {book.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer utility links unlocked for all */}
                  <div className="p-6 pt-0 mt-3 border-t border-neutral-100/50 flex justify-between items-center bg-cream-50/20">
                    <span className="text-[10px] font-bold text-green-600 flex items-center gap-1">
                      <BookCheck className="w-3.5 h-3.5" /> Activated
                    </span>
                    <button 
                      onClick={() => alert(`Redirecting to download guidelines and syllabus breakdowns for ${book.title}.`)}
                      className="text-xs font-bold text-cream-600 hover:text-cream-700 inline-flex items-center gap-0.5"
                    >
                      Get PDF Preview <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {!loading && filteredBooks.length === 0 && (
          <div className="py-12 text-center text-sm text-neutral-400">
            No suggested reference books match your search or filter tags. Try a different query!
          </div>
        )}
      </div>
    </section>
  );
}
