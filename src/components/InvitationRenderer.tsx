'use client';

import { useState } from 'react';
import { InvitationProvider } from './InvitationContext';
import GlowEnvelopeLanding from './shared/GlowEnvelopeLanding';
import MusicPlayer from './shared/MusicPlayer';
import HeroSection from './blossom/HeroSection';
import GallerySection from './blossom/GallerySection';
import EventDetailsSection from './blossom/EventDetailsSection';
import Footer from './blossom/Footer';
import type { InvitationData } from './types';

const ENVELOPE = {
  desktop: '/themes/blossom/envelope.webp',
  mobile: '/themes/blossom/envelope-mobile.webp',
};

export default function InvitationRenderer({ data }: { data: InvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);

  if (!isOpen) {
    return (
      <GlowEnvelopeLanding
        envelopeDesktop={ENVELOPE.desktop}
        envelopeMobile={ENVELOPE.mobile}
        onOpen={() => setIsOpen(true)}
        onStart={() => setMusicStarted(true)}
      />
    );
  }

  return (
    <InvitationProvider data={data}>
      <MusicPlayer src="/themes/_shared/music.mp3" startPlaying={musicStarted} />
      <div className="fade-in">
        <HeroSection />
        <GallerySection />
        <EventDetailsSection />
        <Footer />
      </div>
    </InvitationProvider>
  );
}
