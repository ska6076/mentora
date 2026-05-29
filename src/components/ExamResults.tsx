import React, { useState } from 'react';
import { ExternalLink, Search, Info } from 'lucide-react';

interface ExamLink {
  title: string;
  meta: string;
  site: string;
  url: string;
  category: 'board' | 'state' | 'competitive' | 'scholarship';
  char: string;
  bgGrad: string;
  textCol: string;
}

const EXAMS_DATA: ExamLink[] = [
  {
    title: 'CBSE Board Results',
    meta: 'Class 10 & 12 Board Results',
    site: 'cbse.gov.in',
    url: 'https://results.cbse.gov.in/',
    category: 'board',
    char: 'C',
    bgGrad: 'bg-blue-50 border-blue-200',
    textCol: 'text-blue-600'
  },
  {
    title: 'ICSE Board Results',
    meta: 'Class 10 & 12 CISCE Results',
    site: 'cisce.org',
    url: 'https://www.cisce.org/results',
    category: 'board',
    char: 'I',
    bgGrad: 'bg-green-50 border-green-200',
    textCol: 'text-green-600'
  },
  {
    title: 'UP Board Results',
    meta: 'High School & Intermediate',
    site: 'upresults.nic.in',
    url: 'https://upresults.nic.in/',
    category: 'state',
    char: 'U',
    bgGrad: 'bg-red-50 border-red-200',
    textCol: 'text-red-500'
  },
  {
    title: 'MP Board Results',
    meta: 'Class 5 to 12 & Vocational',
    site: 'mpresults.nic.in',
    url: 'https://mpresults.nic.in/',
    category: 'state',
    char: 'M',
    bgGrad: 'bg-orange-50 border-orange-200',
    textCol: 'text-orange-600'
  },
  {
    title: 'Bihar Board Results',
    meta: 'Matric & Inter Exam Results',
    site: 'biharboardonline.bihar.gov.in',
    url: 'https://biharboardonline.bihar.gov.in/',
    category: 'state',
    char: 'B',
    bgGrad: 'bg-yellow-50 border-yellow-200',
    textCol: 'text-yellow-600'
  },
  {
    title: 'Rajasthan Board BST',
    meta: 'Class 10 & 12 Local Results',
    site: 'rajresults.nic.in',
    url: 'https://rajresults.nic.in/',
    category: 'state',
    char: 'R',
    bgGrad: 'bg-pink-50 border-pink-200',
    textCol: 'text-pink-500'
  },
  {
    title: 'Maharashtra Board HSC',
    meta: 'SSC & HSC Std Results',
    site: 'mahahsscboard.in',
    url: 'https://mahahsscboard.in/',
    category: 'state',
    char: 'M',
    bgGrad: 'bg-purple-50 border-purple-200',
    textCol: 'text-purple-600'
  },
  {
    title: 'JEE Main Results',
    meta: 'NTA engineering entrance marks',
    site: 'jeemain.nta.nic.in',
    url: 'https://results.jeemain.nta.nic.in/',
    category: 'competitive',
    char: 'J',
    bgGrad: 'bg-indigo-50 border-indigo-200',
    textCol: 'text-indigo-600'
  },
  {
    title: 'JEE Advanced Rank',
    meta: 'JoSAA Rank list & allotments',
    site: 'josaa.nic.in',
    url: 'https://josaa.nic.in/',
    category: 'competitive',
    char: 'A',
    bgGrad: 'bg-amber-50 border-amber-200',
    textCol: 'text-amber-600'
  },
  {
    title: 'NEET UG Scorecard',
    meta: 'Medical test rank list & scores',
    site: 'neet.nta.nic.in',
    url: 'https://neet.nta.nic.in/',
    category: 'competitive',
    char: 'N',
    bgGrad: 'bg-green-100 border-green-200',
    textCol: 'text-green-700'
  },
  {
    title: 'CUET UG Admissions',
    meta: 'Central University Entrance Results',
    site: 'cuet.samarth.ac.in',
    url: 'https://cuet.samarth.ac.in/',
    category: 'competitive',
    char: 'C',
    bgGrad: 'bg-teal-50 border-teal-200',
    textCol: 'text-teal-600'
  },
  {
    title: 'CLAT Law Entrance',
    meta: 'Common Law Admission Test rank',
    site: 'clat.ac.in',
    url: 'https://clat.ac.in/',
    category: 'competitive',
    char: 'L',
    bgGrad: 'bg-violet-50 border-violet-200',
    textCol: 'text-violet-600'
  },
  {
    title: 'NDA Entrance Written',
    meta: 'UPSC Defense Forces merit list',
    site: 'nda.gov.in',
    url: 'https://nda.gov.in/',
    category: 'competitive',
    char: 'N',
    bgGrad: 'bg-sky-50 border-sky-200',
    textCol: 'text-sky-600'
  },
  {
    title: 'GATE Results IIT',
    meta: 'MTech & PSU qualification ranks',
    site: 'gate.iitm.ac.in',
    url: 'https://gate.iitm.ac.in/',
    category: 'competitive',
    char: 'G',
    bgGrad: 'bg-orange-100 border-orange-200',
    textCol: 'text-orange-700'
  },
  {
    title: 'NTSE Scholarship',
    meta: 'NCERT Talent Search results',
    site: 'ncert.nic.in',
    url: 'https://ncert.nic.in/ncerts/ntse/national-talent-search-examination-ntse',
    category: 'scholarship',
    char: 'N',
    bgGrad: 'bg-yellow-50 border-yellow-300',
    textCol: 'text-yellow-700'
  },
  {
    title: 'OI Olympiad Results',
    meta: 'SOF IMO, NSO & NCO scoreboards',
    site: 'sofworld.org',
    url: 'https://www.sofworld.org/',
    category: 'scholarship',
    char: 'S',
    bgGrad: 'bg-sky-100 border-sky-200',
    textCol: 'text-sky-700'
  }
];

export default function ExamResults() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filtered = EXAMS_DATA.filter((exam) => {
    const matchesCat = activeCategory === 'all' || exam.category === activeCategory;
    const matchesSearch = exam.title.toLowerCase().includes(search.toLowerCase()) || 
                          exam.meta.toLowerCase().includes(search.toLowerCase()) ||
                          exam.site.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="results" className="py-24 bg-neutral-50 relative">
      <div className="absolute top-1/2 left-0 max-w-[500px] w-full h-[400px] bg-cream-100/40 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-12">
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
            Direct Access Hub
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            Check Your <span className="hero-text">Exam Results</span>
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto text-sm">
            Quick redirected links to official result portals — all examinations, in one clean directory.
          </p>
        </div>

        {/* Search Engine and Category Filters */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search boards (e.g. CBSE, JEE, NEET, KVPY)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-cream-500 focus:ring-2 focus:ring-cream-500/10 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {['all', 'board', 'state', 'competitive', 'scholarship'].map((cat) => {
              const labelMap: any = {
                all: 'All Exams',
                board: '🎓 Central Boards',
                state: '🗺️ State Boards2026',
                competitive: '🏆 Entrance Exams',
                scholarship: '🏅 Scholarships / Olympiads'
              };

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-wider font-bold px-4 py-2 rounded-full border transition-all ${
                    activeCategory === cat
                      ? 'bg-[#92400e] border-[#92400e] text-white'
                      : 'bg-white border-neutral-200 text-neutral-500 hover:border-neutral-300'
                  }`}
                >
                  {labelMap[cat]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((exam, idx) => (
            <a
              key={idx}
              href={exam.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-neutral-200 hover:border-cream-300 rounded-2xl p-5 block transition-all hover:scale-[1.01] hover:shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold border ${exam.bgGrad} ${exam.textCol}`}>
                  {exam.char}
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-neutral-900 group-hover:text-cream-600 transition-colors">
                    {exam.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {exam.meta}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-neutral-50/70">
                <span className="text-[9px] font-mono text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-full">
                  {exam.site}
                </span>
                <ExternalLink className="w-4 h-4 text-neutral-300 group-hover:text-cream-600 transition-colors" />
              </div>
            </a>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-neutral-400">
              No exam links matching that filter. Send a feedback message to request it!
            </div>
          )}
        </div>

        {/* Info Banner */}
        <div className="mt-8 bg-white border border-neutral-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4 border-l-4 border-l-cream-500">
          <div className="w-12 h-12 rounded-xl bg-cream-100 border border-cream-200 flex items-center justify-center flex-shrink-0 text-cream-600">
            <Info className="w-6 h-6" />
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed">
            <strong className="text-neutral-700">Official Portal Warning:</strong> These links serve purely as direct shortcuts routing to government and testing body web structures. Mentora Tutors Hub does not generate or host academic outcome sheets. Result schedules are subject to the respective external agencies.
          </p>
        </div>
      </div>
    </section>
  );
}
