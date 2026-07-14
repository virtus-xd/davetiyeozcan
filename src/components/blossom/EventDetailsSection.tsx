'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useInvitationData } from '../InvitationContext';

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
        <div className={`mb-24 flex justify-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="bg-white p-2 rounded-xl shadow-lg w-full max-w-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/themes/blossom/event-details.jpeg"
              alt="Düğün gecemizin akışı: 19.00 Kokteyl, 20.00 Nikâh Töreni, 21.30 Akşam Yemeği, 23.00 Pasta Seremonisi, 01.00 Kutlamamızın Sonu"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
          </div>
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
