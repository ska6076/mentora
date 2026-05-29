import React, { useState } from 'react';
import { Download, Clock, ArrowRight, X, Sparkles, BookOpen } from 'lucide-react';
import { UserProfile, ModelPaper } from '../types';

interface PaperListProps {
  profile: UserProfile | null;
  onOpenSignup: () => void;
}

const DEFAULT_PAPERS: ModelPaper[] = [
  {
    id: 'cbse_maths_10',
    title: 'CBSE Maths — Model Question Paper 1',
    subject: 'Mathematics',
    category: 'class10',
    marksCode: '80 Marks',
    duration: '3.0 Hours',
    downloadsCount: 1240
  },
  {
    id: 'cbse_science_10',
    title: 'CBSE Science — Comprehensive Challenge Set',
    subject: 'Science',
    category: 'class10',
    marksCode: '80 Marks',
    duration: '3.0 Hours',
    downloadsCount: 984
  },
  {
    id: 'cbse_physics_12',
    title: 'CBSE Physics — Formula & Numerical Practice',
    subject: 'Physics',
    category: 'class12',
    marksCode: '70 Marks',
    duration: '3.0 Hours',
    downloadsCount: 752
  },
  {
    id: 'jee_maths_mock',
    title: 'JEE Main — High Speed Trigonometry & Calculus Mock',
    subject: 'Mathematics',
    category: 'jee',
    marksCode: '120 Marks',
    duration: '3.0 Hours',
    downloadsCount: 2120
  },
  {
    id: 'neet_bio_mock',
    title: 'NEET UG — Zoology & Botany Full Syllabus Mock',
    subject: 'Biology',
    category: 'neet',
    marksCode: '360 Marks',
    duration: '3.2 Hours',
    downloadsCount: 1845
  },
  {
    id: 'cbse_chem_12',
    title: 'CBSE Chemistry — Organic & Inorganic Reactions',
    subject: 'Chemistry',
    category: 'class12',
    marksCode: '70 Marks',
    duration: '3.0 Hours',
    downloadsCount: 624
  }
];

export default function PaperList({ profile, onOpenSignup }: PaperListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePaper, setActivePaper] = useState<ModelPaper | null>(null);

  const filtered = DEFAULT_PAPERS.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  const handleDownload = (paper: ModelPaper) => {
    if (!profile) {
      alert('Authentication required: Sign up or log in to download this document.');
      return;
    }
    alert(`📥 PDF download initiated for: ${paper.title}\nFormat: PDF | Size: 1.8MB\nThank you for choosing Mentora Tutors Hub!`);
  };

  return (
    <section id="papers" className="py-24 bg-white relative">
      <div className="absolute bottom-0 left-0 max-w-[600px] w-full h-[400px] bg-cream-100/50 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
            Practice Makes Perfect
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            Model Exam <span className="hero-text">Preparation Papers</span>
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto text-sm">
            Previous year trends & syllabus sets compiled by highly experienced academicians.
          </p>
        </div>

        {/* Category Filters Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['all', 'class10', 'class12', 'jee', 'neet'].map((cat) => {
            const isSelected = selectedCategory === cat;
            const labels: any = {
              all: 'All Papers',
              class10: 'Class 10 Board',
              class12: 'Class 12 Board',
              jee: 'JEE Mains',
              neet: 'NEET UG'
            };

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-5 py-2.5 rounded-full border transition-all ${
                  isSelected
                    ? 'bg-cream-600 border-cream-700 text-white shadow-sm'
                    : 'bg-cream-100 border-cream-200 text-neutral-500 hover:border-cream-300'
                }`}
              >
                {labels[cat]}
              </button>
            );
          })}
        </div>

        {/* Grids */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              onClick={() => setActivePaper(paper)}
              className="group bg-white border border-neutral-200 hover:border-cream-400 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between h-56"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider text-cream-600 uppercase bg-cream-100/60 px-2 py-0.5 rounded-lg border border-cream-200">
                    {paper.category === 'jee' || paper.category === 'neet' ? paper.category.toUpperCase() : `Class ${paper.category.replace('class', '')}`}
                  </span>
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {paper.duration}
                  </span>
                </div>
                <h4 className="font-heading text-base font-bold text-neutral-900 group-hover:text-cream-600 transition-colors line-clamp-2">
                  {paper.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-2">
                  Full syllabus coverage • Standard {paper.marksCode} test structure.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100/50">
                <span className="text-[10px] text-neutral-400 inline-flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {(paper.downloadsCount / 1000).toFixed(1)}k downloads
                </span>
                <span className="text-xs font-bold text-cream-600 inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Preview Sheets <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QUESTION SHEETS MODEL MODAL DETAIL DRAWER */}
      {activePaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-up">
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between border-b border-neutral-100 pb-5 mb-5 space-gap-4">
                <div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-neutral-950">
                    {activePaper.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 capitalize">
                    {activePaper.subject} Syllabus • {activePaper.marksCode} • {activePaper.duration} Limit
                  </p>
                </div>
                <button
                  onClick={() => setActivePaper(null)}
                  className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>
              </div>

              <div className="bg-cream-100/50 border border-cream-200 rounded-2xl p-6 space-y-5">
                <div className="flex justify-between text-xs text-neutral-500 font-bold border-b border-cream-300 pb-3">
                  <span>Duration: {activePaper.duration}</span>
                  <span>Maximum Assessment: {activePaper.marksCode}</span>
                </div>
                
                <div className="space-y-4 text-xs text-neutral-700 leading-relaxed">
                  <div>
                    <p className="text-cream-600 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Section A — Objective Core (20 Marks)
                    </p>
                    <p className="text-neutral-400 mt-0.5 pl-4">Q1 to Q20: Multiple choice conceptual queries. Each carries 1 mark.</p>
                  </div>
                  <div>
                    <p className="text-cream-600 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Section B — Short Analytic (30 Marks)
                    </p>
                    <p className="text-neutral-400 mt-0.5 pl-4">Q21 to Q30: Analytical reasoning answers. Each carries 3 marks.</p>
                  </div>
                  <div>
                    <p className="text-cream-600 font-bold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Section C — Advanced Deductions (30 Marks)
                    </p>
                    <p className="text-neutral-400 mt-0.5 pl-4">Q31 to Q36: Detailed computational derivations. Each carries 5 marks.</p>
                  </div>
                </div>

                <div className="border-t border-cream-200/80 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[10px] text-neutral-400 font-semibold inline-flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-cream-600" /> Complete set unlocked upon sign up
                  </span>
                  
                  {profile ? (
                    <button
                      onClick={() => {
                        handleDownload(activePaper);
                        setActivePaper(null);
                      }}
                      className="bg-cream-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-cream-700 transition shadow-sm inline-flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" /> Download Printable PDF
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setActivePaper(null);
                        onOpenSignup();
                      }}
                      className="bg-cream-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-cream-700 transition shadow-sm"
                    >
                      Sign Up To Acquire Files
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
