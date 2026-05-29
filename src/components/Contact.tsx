import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, Check } from 'lucide-react';

export default function Contact() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>('General Inquiry');
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      alert('Please fill out all contact parameters.');
      return;
    }

    setSending(true);

    const textPayload = 
      `*New Inquiry — Mentora Tutors Hub*\n\n` +
      `👤 *Name:* ${fullName.trim()}\n` +
      `✉️ *Email:* ${email.trim()}\n` +
      `📋 *Topic:* ${subject}\n` +
      `💬 *Message:* ${message.trim()}\n`;

    const encoded = encodeURIComponent(textPayload);
    const whatsappLink = `https://wa.me/918179109801?text=${encoded}`;

    setTimeout(() => {
      setSending(false);
      setSent(true);
      window.open(whatsappLink, '_blank');
      
      // Reset inputs after interval pass
      setFullName('');
      setEmail('');
      setMessage('');
      
      setTimeout(() => setSent(false), 4000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-50 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 max-w-[500px] w-full h-[400px] bg-cream-100/40 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="text-xs font-bold font-heading tracking-widest uppercase text-cream-600 mb-4 block">
            Communication Portal
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-tight mb-4 text-neutral-900">
            Get in <span className="hero-text">Touch</span>
          </h2>
          <p className="text-neutral-500 max-w-sm mx-auto text-sm">
            Have questions or custom syllabus requests? We are here to assist.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Quick contact card decks */}
          <div className="md:col-span-2 space-y-4">
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 hover:border-cream-300 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cream-100 border border-cream-200 flex items-center justify-center text-cream-600 mb-3">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-sm font-bold text-neutral-900 mb-1">Direct Email</h4>
              <p className="text-xs text-neutral-500">tutors@mentoratutorshub.com</p>
            </div>

            <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 hover:border-cream-300 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-cream-100 border border-cream-200 flex items-center justify-center text-cream-600 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-sm font-bold text-neutral-900 mb-1">Call Representative</h4>
              <p className="text-xs text-neutral-500">+91 81791 09801</p>
            </div>

            <div className="bg-white border border-neutral-200/80 rounded-2xl p-5 hover:border-green-300 shadow-sm transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-600 mb-3">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-heading text-sm font-bold text-green-700 mb-1 font-sans">WhatsApp Business</h4>
              <p className="text-xs text-neutral-500">Fast 24-hr responses • Click below to chat</p>
            </div>
          </div>

          {/* Form container linking directly to WhatsApp payload */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 space-y-4.5 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-cream-100/50 border border-cream-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-cream-600 transition-all font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-500 mb-1">Email Coordinates</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-cream-100/50 border border-cream-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-cream-600 transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 mb-1">Interest Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-cream-100/50 border border-cream-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Tutoring Services">Tutoring Services</option>
                  <option value="Pricing & Plans">Pricing & Classes Plans</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Tutor Application">Tutor Application Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-500 mb-1">Inquiry Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your child's textbook goals or syllabus needs..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-cream-100/50 border border-cream-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-cream-600 transition-all resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className={`w-full text-white font-bold py-3.5 rounded-xl transition-all text-xs font-heading tracking-wide flex items-center justify-center gap-1.5 focus:outline-none shadow-sm ${
                  sent 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-[#92400e] hover:bg-[#78350f]'
                }`}
              >
                {sending ? (
                  'Aggregating Message Coordinates...'
                ) : sent ? (
                  <>
                    <Check className="w-4 h-4" /> Message Enacted on Chat!
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Dispatch Inquiry on WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
