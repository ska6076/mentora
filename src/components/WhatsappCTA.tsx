import React from 'react';
import { Check, MessageSquare, ArrowUpRight, Wifi, Battery, Mic } from 'lucide-react';

export default function WhatsappCTA() {
  return (
    <section id="whatsapp" className="py-24 bg-white overflow-hidden relative border-t border-neutral-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[600px] w-full h-[400px] bg-green-100/30 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 md:p-12 shadow-sm relative overflow-hidden">
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              
              {/* Content Description */}
              <div>
                <span className="text-xs font-bold font-heading tracking-widest uppercase text-green-600 mb-4 block inline-flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 fill-green-500 text-green-600" /> Stay Instant Updated
                </span>
                
                <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4 text-neutral-900">
                  Join Our <span className="text-green-600">WhatsApp</span> Channel
                </h2>
                
                <p className="text-neutral-500 text-xs md:text-sm leading-relaxed mb-6">
                  Acquire instant status alerts on newly loaded tutors, reference notes, study sheets, competitive alerts, and discount privileges direct to your mobile chat interface.
                </p>

                <ul className="space-y-3.5 mb-8">
                  {[
                    'Instant alerts for newly published test models & exam guides.',
                    'Daily conceptual challenges and expert study hints.',
                    'Exam schedule calendars and central board reports.',
                    'Safe environment — zero personal identifier leaks or spam.'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-5.2 h-5.2 rounded-full bg-green-50 border border-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600 font-bold" />
                      </div>
                      <span className="text-xs text-neutral-600 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://whatsapp.com/channel/0029Vb7ZRnHBadmWa6Ey4U0I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#1da851] hover:scale-[1.01] active:translate-y-0.5 transition-all text-xs shadow-md"
                  style={{ boxShadow: '0 8px 25px rgba(37,211,102,0.25)' }}
                >
                  Join Telegram/WhatsApp broadcast
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              {/* Graphical Mobile Chat Mockup */}
              <div className="flex flex-col items-center justify-center relative">
                {/* Simulated Phone Chassis */}
                <div className="w-64 h-[440px] bg-neutral-950 rounded-[2.5rem] p-3 shadow-2xl relative border border-neutral-800">
                  <div className="w-full h-full bg-[#ECE5DD] rounded-[1.8rem] overflow-hidden relative flex flex-col justify-between">
                    
                    {/* Chat Header Status Bar */}
                    <div className="bg-[#075E54] px-4 pt-3.5 pb-2">
                      <div className="flex items-center justify-between text-white/80 text-[9px] mb-1 font-sans">
                        <span>9:41 AM</span>
                        <div className="flex items-center gap-1">
                          <Wifi className="w-2.5 h-2.5" />
                          <Battery className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <p className="text-white text-xs font-bold leading-tight">Mentora Updates</p>
                      <p className="text-white/70 text-[9px] font-semibold">Verified Channel • 5.4k scholars</p>
                    </div>

                    {/* Chat Messages Log */}
                    <div className="flex-1 p-3 space-y-2.5 overflow-y-auto max-h-[300px]">
                      <div className="bg-white rounded-lg rounded-tl-none p-2.5 shadow-sm max-w-[85%] border-l-2 border-l-[#075E54]">
                        <p className="text-[10px] text-neutral-800 leading-relaxed font-sans">
                          📚 <strong>NEW:</strong> Class 10 Maths Model Paper 2026 is officially available for download! Lock your prep targets.
                        </p>
                        <p className="text-[8px] text-neutral-400 mt-1 text-right">10:30 AM</p>
                      </div>

                      <div className="bg-white rounded-lg rounded-tl-none p-2.5 shadow-sm max-w-[85%] border-l-2 border-l-green-500">
                        <p className="text-[10px] text-neutral-800 leading-relaxed font-sans">
                          💡 <strong>Study Milestone:</strong> Re-solve at least 15 algebraic mocks daily. Consistency beats intensity!
                        </p>
                        <p className="text-[8px] text-neutral-400 mt-1 text-right">Yesterday</p>
                      </div>

                      <div className="bg-white rounded-lg rounded-tl-none p-2.5 shadow-sm max-w-[85%]">
                        <p className="text-[10px] text-neutral-800 leading-relaxed font-sans">
                          🔥 <strong>Free Trial:</strong> Book your first online academic demo session free of cost this week!
                        </p>
                        <p className="text-[8px] text-neutral-400 mt-1 text-right font-semibold text-green-600">Completed</p>
                      </div>
                    </div>

                    {/* Bottom Input Drawer */}
                    <div className="bg-neutral-100 p-2 border-t border-neutral-200 flex items-center gap-1.5 flex-shrink-0">
                      <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[9px] text-neutral-400">
                        Broadcasting updates only...
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#075E54] flex items-center justify-center text-white">
                        <Mic className="w-3.5 h-3.5" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Pulsating Alerts Badge */}
                <div className="absolute -top-3 -right-3 w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-bounce text-white text-[10px] font-bold">
                  +12
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
