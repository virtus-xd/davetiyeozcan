'use client';

import { Heart, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInvitationData } from '../InvitationContext';

const STORAGE_KEY = 'rsvp-submitted';

type Attendance = 'Katılıyorum' | 'Katılamıyorum';
type Status = 'idle' | 'sending' | 'success' | 'error';

export default function RsvpSection() {
  const invitationData = useInvitationData();
  const scriptUrl = invitationData.rsvp?.scriptUrl ?? '';

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [status, setStatus] = useState<Status>('idle');
  const [validationError, setValidationError] = useState('');

  // Aynı tarayıcıdan mükerrer gönderimi önle (basit koruma).
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) setStatus('success');
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 },
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  if (!scriptUrl) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Lütfen adınızı ve soyadınızı yazın.');
      return;
    }
    if (!attendance) {
      setValidationError('Lütfen katılım durumunuzu seçin.');
      return;
    }
    setValidationError('');
    setStatus('sending');
    try {
      // Apps Script web app'leri CORS yanıt başlığı döndürmez; no-cors ile
      // istek gönderilir, ağ hatası fırlamazsa başarı kabul edilir.
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
          adSoyad: name.trim(),
          durum: attendance,
          kisiSayisi: attendance === 'Katılıyorum' ? String(guestCount) : '0',
        }),
      });
      localStorage.setItem(STORAGE_KEY, '1');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const choiceBase =
    'flex-1 px-6 py-4 rounded-2xl border font-sans text-sm tracking-widest uppercase transition-all duration-300';

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#f4ecdf] text-[#333] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ec] via-transparent to-[#faf6ec] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className={`text-center mb-14 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2c352b] mb-6">Katılım Durumu</h2>
          <p className="text-[#6b7b67] font-sans text-sm tracking-[0.2em] uppercase mb-6">LCV</p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#8a9a86]" />
            <Heart className="w-5 h-5 text-[#6b7b67]" strokeWidth={1.5} />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#8a9a86]" />
          </div>
          <p className="text-[#4c5c48] font-serif italic text-base md:text-lg mt-6 max-w-xl mx-auto">
            Düğünümüze teşrif edip edemeyeceğinizi bildirmenizi rica ederiz.
          </p>
        </div>

        <div
          className={`bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl shadow-lg p-8 md:p-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.15s' }}
        >
          {status === 'success' ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#f4ecdf] rounded-full flex items-center justify-center mx-auto text-[#6b7b67]">
                <Heart className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl text-[#2c352b]">Yanıtınız iletildi 🌸</h3>
              <p className="text-[#4c5c48] font-sans text-sm leading-relaxed">
                Teşekkür ederiz, katılım bilginiz bize ulaştı.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div>
                <label htmlFor="rsvp-name" className="block text-[#2c352b] font-sans text-xs tracking-widest uppercase mb-3">
                  Ad Soyad
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız ve soyadınız"
                  className="w-full px-5 py-4 rounded-2xl border border-[#d9caa5] bg-white/80 text-[#3a3f38] font-sans text-sm placeholder-[#8a9a86] focus:outline-none focus:border-[#8a9a86] focus:ring-2 focus:ring-[#e8ddc4] transition-all"
                />
              </div>

              <div>
                <span className="block text-[#2c352b] font-sans text-xs tracking-widest uppercase mb-3">
                  Katılım Durumunuz
                </span>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => setAttendance('Katılıyorum')}
                    className={`${choiceBase} ${
                      attendance === 'Katılıyorum'
                        ? 'bg-[#6b7b67] text-white border-[#6b7b67] shadow-md'
                        : 'bg-white/80 text-[#4c5c48] border-[#d9caa5] hover:bg-[#f4ecdf]'
                    }`}
                  >
                    Katılıyorum
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('Katılamıyorum')}
                    className={`${choiceBase} ${
                      attendance === 'Katılamıyorum'
                        ? 'bg-[#a08d6b] text-white border-[#a08d6b] shadow-md'
                        : 'bg-white/80 text-[#4c5c48] border-[#d9caa5] hover:bg-[#f4ecdf]'
                    }`}
                  >
                    Katılamıyorum
                  </button>
                </div>
              </div>

              {attendance === 'Katılıyorum' && (
                <div className="animate-fade-in-up">
                  <label htmlFor="rsvp-count" className="block text-[#2c352b] font-sans text-xs tracking-widest uppercase mb-3">
                    Kaç Kişi Katılacaksınız?
                  </label>
                  <select
                    id="rsvp-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-5 py-4 rounded-2xl border border-[#d9caa5] bg-white/80 text-[#3a3f38] font-sans text-sm focus:outline-none focus:border-[#8a9a86] focus:ring-2 focus:ring-[#e8ddc4] transition-all"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n} kişi
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {validationError && (
                <p className="text-[#b0513f] font-sans text-sm text-center">{validationError}</p>
              )}
              {status === 'error' && (
                <p className="text-[#b0513f] font-sans text-sm text-center">
                  Gönderilemedi, lütfen tekrar deneyin.
                </p>
              )}

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-3 px-10 py-4 bg-[#2c352b] text-[#faf6ec] hover:bg-[#4c5c48] disabled:opacity-60 disabled:cursor-not-allowed transition-colors font-sans text-xs tracking-widest uppercase rounded-full shadow-md"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  {status === 'sending' ? 'Gönderiliyor…' : 'Yanıtımı Gönder'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
