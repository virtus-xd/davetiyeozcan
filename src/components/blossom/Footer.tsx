'use client';

import { Globe, Mail } from 'lucide-react';
import { useInvitationData } from '../InvitationContext';

export default function Footer() {
  const invitationData = useInvitationData();

  return (
    <footer className="py-24 px-6 bg-[#f8faf7] text-[#333] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/themes/blossom/footer-bg.webp')] bg-cover bg-center bg-no-repeat opacity-80 pointer-events-none mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#f8faf7] via-transparent to-[#eaf0e8]/80 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10 bg-white/60 backdrop-blur-sm p-10 rounded-3xl border border-white/50 shadow-xl mt-8">
        <h3 className="font-handwriting text-5xl md:text-6xl text-[#2c352b]">
          {invitationData.brideName} <span className="text-3xl text-[#6b7b67] px-2">&amp;</span> {invitationData.groomName}
        </h3>

        <p className="text-[#4c5c48] font-serif italic text-lg md:text-xl tracking-wide max-w-2xl mx-auto">
          &quot;{invitationData.footer.message}&quot;
        </p>

        <div className="flex justify-center items-center py-4 opacity-60">
          <div className="w-24 h-[1px] bg-[#8a9a86]" />
        </div>

        {(invitationData.footer.instagramUrl || invitationData.footer.emailUrl) && (
          <div className="flex justify-center gap-8">
            {invitationData.footer.instagramUrl && (
              <a href={invitationData.footer.instagramUrl} className="text-[#6b7b67] hover:text-[#2c352b] hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6" strokeWidth={1.5} />
              </a>
            )}
            {invitationData.footer.emailUrl && (
              <a href={invitationData.footer.emailUrl} className="text-[#6b7b67] hover:text-[#2c352b] hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </a>
            )}
          </div>
        )}

        <div className="space-y-3 pt-6">
          <p className="text-[#2c352b] text-sm font-sans tracking-[0.3em] uppercase">
            {invitationData.footer.hashtag}
          </p>
          {invitationData.footer.contactEmail && (
            <div className="text-[#6b7b67] text-xs font-sans">
              <a href={invitationData.footer.emailUrl} className="hover:text-[#2c352b] transition-colors">
                {invitationData.footer.contactEmail}
              </a>
            </div>
          )}
        </div>

        <p className="text-[#8a9a86] text-[10px] font-sans pt-12 tracking-widest uppercase">
          {invitationData.footer.credits}
        </p>
      </div>
    </footer>
  );
}
