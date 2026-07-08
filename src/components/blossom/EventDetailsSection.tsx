'use client';

import { Clock, MapPin, Heart, Calendar } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInvitationData } from '../InvitationContext';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Clock': return Clock;
    case 'Heart': return Heart;
    case 'Calendar': return Calendar;
    default: return Clock;
  }
};

export default function EventDetailsSection() {
  const invitationData = useInvitationData();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 },
    );
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#faf6ec] text-[#333] relative overflow-hidden">
      {/* Bej palet: yeşil tonlu görseli sepya + düşük doygunlukla sıcak tona çeker */}
      <div className="absolute inset-0 bg-[url('/themes/blossom/event-bg.webp')] bg-cover bg-center bg-no-repeat opacity-70 pointer-events-none mix-blend-multiply sepia-[.35] saturate-[.6]" />
      <div className="absolute inset-0 bg-white/30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2c352b] mb-6">Program &amp; Mekan</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-[#8a9a86]" />
            <Heart className="w-5 h-5 text-[#6b7b67]" strokeWidth={1.5} />
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-[#8a9a86]" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {invitationData.events.map((event, index) => {
            const Icon = getIcon(event.iconName);
            return (
              <div
                key={index}
                className={`group bg-white/70 backdrop-blur-md border border-white/60 p-8 rounded-3xl text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#e8ddc4]/50 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="w-16 h-16 bg-[#f4ecdf] rounded-full flex items-center justify-center mx-auto mb-6 text-[#6b7b67] group-hover:scale-110 group-hover:bg-[#e8ddc4] transition-all duration-500">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-[#2c352b] mb-3 uppercase tracking-widest">{event.title}</h3>
                <p className="text-[#6b7b67] font-sans text-sm tracking-[0.2em] mb-4">{event.time}</p>
                <p className="text-[#4c5c48] text-sm font-sans leading-relaxed px-2">{event.description}</p>
              </div>
            );
          })}
        </div>

        <div className={`bg-white/90 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-2xl shadow-[#e8ddc4]/40 border border-white p-2 md:p-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
          <div className="grid md:grid-cols-3 gap-0 border border-[#f0e7d2] rounded-[1.5rem] overflow-hidden">
            <div className="p-10 flex flex-col justify-center space-y-8 md:border-r border-[#f0e7d2] bg-white">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-[#f4ecdf] rounded-full text-[#6b7b67]">
                  <MapPin className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-[#2c352b] mb-4">Adres Bilgileri</h3>
                  <p className="text-[#3a3f38] font-medium font-sans mb-2">{invitationData.venue.name}</p>
                  <p className="text-[#6b7b67] font-sans text-xs tracking-wider mt-1">{invitationData.venue.addressLine1}</p>
                  {invitationData.venue.addressLine2 ? (
                    <p className="text-[#6b7b67] font-sans text-xs tracking-wider mt-1">{invitationData.venue.addressLine2}</p>
                  ) : null}
                </div>
              </div>
              {invitationData.venue.googleMapsUrl ? (
                <div className="flex justify-center pt-4">
                  <a
                    href={invitationData.venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-[#f4ecdf] text-[#3a3f38] hover:bg-[#e8ddc4] transition-colors font-sans text-xs tracking-widest uppercase rounded-full shadow-sm border border-[#d9caa5]"
                  >
                    Yol Tarifi Al
                  </a>
                </div>
              ) : null}
            </div>
            {invitationData.venue.googleMapsEmbed ? (
              <div className="md:col-span-2 h-[400px] md:h-auto sepia-[0.1] contrast-90 hover:sepia-0 hover:contrast-100 transition-all duration-700">
                <iframe
                  src={invitationData.venue.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Mekan Konumu"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="md:col-span-2 min-h-[260px] md:min-h-0 bg-[url('/themes/blossom/event-bg.webp')] bg-cover bg-center opacity-60" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
