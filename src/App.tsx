import React, { useState, useEffect } from 'react';
import { CmsProvider, useWeddingCms } from './context/CmsContext';
import { OpeningEnvelope } from './components/envelope/OpeningEnvelope';
import { FloatingPetals } from './components/common/FloatingPetals';
import { Navbar } from './components/common/Navbar';
import { AudioPlayer } from './components/common/AudioPlayer';
import { HeroSection } from './components/hero/HeroSection';
import { GodsBlessingsSection } from './components/blessings/GodsBlessingsSection';
import { LoveStorySection } from './components/story/LoveStorySection';
import { CoupleSection } from './components/couple/CoupleSection';
import { CountdownSection } from './components/countdown/CountdownSection';
import { EventsSection } from './components/events/EventsSection';
import { GallerySection } from './components/gallery/GallerySection';
import { FamilyBlessingsSection } from './components/family/FamilyBlessingsSection';
import { WarmRegardsSection } from './components/warmRegards/WarmRegardsSection';
import { FinalSection } from './components/final/FinalSection';
import { SectionTransitionAnimation } from './components/common/SectionTransitionAnimation';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { CmsDashboard } from './components/cms/CmsDashboard';
import { CmsLoginModal } from './components/cms/CmsLoginModal';

const checkIsAdminUrl = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase().replace(/\/+$/, '');
  return path === '/admin' || hash === '#admin' || hash === '#/admin';
};

const WeddingSiteContent: React.FC = () => {
  const { isAdminLoggedIn, openCms, closeCms } = useWeddingCms();
  const [isAdminPath, setIsAdminPath] = useState<boolean>(checkIsAdminUrl);
  const [envelopeOpened, setEnvelopeOpened] = useState<boolean>(false);
  const [musicStarted, setMusicStarted] = useState<boolean>(false);

  // Monitor URL path changes for /admin direct URL access
  useEffect(() => {
    const handleUrlChange = () => {
      setIsAdminPath(checkIsAdminUrl());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // When /admin is accessed, open CMS if authenticated
  useEffect(() => {
    if (isAdminPath) {
      if (isAdminLoggedIn) {
        openCms();
      }
    } else {
      closeCms();
    }
  }, [isAdminPath, isAdminLoggedIn, openCms, closeCms]);

  const handleEnvelopeOpened = () => {
    setEnvelopeOpened(true);
    setMusicStarted(true);
  };

  const handleReplayEnvelope = () => {
    setEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    window.history.pushState(null, '', '/');
    setIsAdminPath(false);
    closeCms();
  };

  // 1. Direct CMS Admin Route (/admin)
  if (isAdminPath) {
    return (
      <div className="relative min-h-screen bg-[#F8F3EE] text-[#66564D] font-sans selection:bg-[#E9D8DE] selection:text-[#43362F] overflow-x-hidden">
        <FloatingPetals />

        {isAdminLoggedIn ? (
          <CmsDashboard />
        ) : (
          <CmsLoginModal
            isOpen={true}
            onClose={handleExitAdmin}
            onSuccess={() => {
              openCms();
            }}
          />
        )}
      </div>
    );
  }

  // 2. Public Wedding Invitation Site (Zero CMS buttons anywhere)
  return (
    <div className="relative min-h-screen bg-[#F8F3EE] text-[#66564D] font-sans selection:bg-[#E9D8DE] selection:text-[#43362F] overflow-x-hidden">
      {/* Floating Rose Petals Ambient Layer */}
      <FloatingPetals />

      {/* Interactive 3D Envelope Opening Experience */}
      {!envelopeOpened && (
        <OpeningEnvelope onOpened={handleEnvelopeOpened} />
      )}

      {/* Main Wedding Portal (revealed upon envelope open) */}
      <div
        className={`transition-opacity duration-1000 ${
          envelopeOpened ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ScrollProgressBar />
        <Navbar onReplayEnvelope={handleReplayEnvelope} />

        <main>
          <HeroSection />
          <SectionTransitionAnimation variant="cross" tagline="United in His Sacred Grace" />

          <GodsBlessingsSection />
          <SectionTransitionAnimation variant="scripture" tagline="Two are Better Than One • Ecclesiastes 4:9" />

          <LoveStorySection />
          <SectionTransitionAnimation variant="heart" tagline="A Divine Love Story Unfolding" />

          <CoupleSection />
          <SectionTransitionAnimation variant="rings" tagline="Two Hearts • One Beautiful Forever" />

          <CountdownSection />
          <SectionTransitionAnimation variant="floral" tagline="With Joyful Expectation" />

          <EventsSection />
          <SectionTransitionAnimation variant="dove" tagline="Walking Together in His Peace" />

          <GallerySection />
          <SectionTransitionAnimation variant="floral" tagline="Cherished Moments of Grace" />

          <FamilyBlessingsSection />
          <SectionTransitionAnimation variant="heart" tagline="Blessed by Family • Anchored in Faith" />

          <WarmRegardsSection />
          <SectionTransitionAnimation variant="rings" tagline="Until Forever Begins" />
        </main>

        <FinalSection onReplayEnvelope={handleReplayEnvelope} />
      </div>

      {/* Ambient Peaceful Wedding Music Player (Always visible & interactive) */}
      <AudioPlayer autoStarted={musicStarted} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CmsProvider>
      <WeddingSiteContent />
    </CmsProvider>
  );
};

export default App;
