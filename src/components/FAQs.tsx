import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    q: 'How do I locate and select the perfect expert tutor?',
    a: 'After establishing a verified parents registration ID, you can filter our database by subject fields, academic grade, localized map areas, and scoring appraisals. You can also request a free 30-minute academic trial session before finalizing appointments.'
  },
  {
    q: 'What is the standard fee rate structure for tutoring sessions?',
    a: 'Mentora keeps pricing simple and transparent. Online standard sessions average around ₹300-₹500 per hour, while specific Home Tuition appointments range from ₹500-₹800 per hour. Individual teachers establish rate ranges according to experience.'
  },
  {
    q: 'How are tutors verified on the Mentora Hub?',
    a: 'Our screening panel enforces a strict 3-step credential audit: (1) Identity government document checks, (2) Qualified academic degrees verification, and (3) A mock live pedagogical lecture assessment. Only clean records are listed online.'
  },
  {
    q: 'Can we schedule trial/demo sessions with recommended tutors?',
    a: 'Yes, certainly. Most educators listed on the Mentora hub happily provide a 30-minute introductory mock stream free of charge. This lets families audit compatibility and syllabus plans before committing funds.'
  },
  {
    q: 'Is there a lesson cancelation plan or fund safety guarantee?',
    a: 'Absolutely. Parents can reschedule or cancel scheduled hours up to 4 hours in advance without penalization. In the case of documented dissatisfaction within 24 hours, our support team can credit your wallet for new assignments.'
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-b border-neutral-100 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
            Resolution Center
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            Frequently Asked <span className="hero-text">Questions</span>
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto text-sm">
            Answers to key procedural inquiries on learning paths, safety checklists, and billing.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-neutral-50/50 border border-neutral-200/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                >
                  <span className="font-heading text-sm md:text-base font-bold text-neutral-800 pr-4">
                    {faq.q}
                  </span>
                  <span className="text-cream-600 flex-shrink-0 bg-white shadow-sm border border-neutral-100 p-1 rounded-full">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out px-5 overflow-hidden ${
                    isOpen ? 'max-h-52 pb-5' : 'max-h-0'
                  }`}
                >
                  <p className="text-xs text-neutral-500 leading-relaxed pt-2.5 border-t border-neutral-100">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
