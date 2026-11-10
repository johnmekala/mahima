import React, { useState, useEffect } from 'react';
import { Menu, X, MailOpen } from 'lucide-react';
import { MonogramSP } from './MonogramSP';
import { useWeddingCms } from '../../context/CmsContext';

interface NavbarProps {
  onReplayEnvelope: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayEnvelope }) => {
  const { siteData } = useWeddingCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "God's Grace", href: '#blessings' },
    { label: 'Our Story', href: '#story' },
    { label: 'Couples', href: '#couples' },
    { label: 'Countdown', href: '#countdown' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Family', href: '#family' },
    { label: 'Warm Regards', href: '#warm-regards' },
    { label: 'Location', href: '#location' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8F3EE]/92 backdrop-blur-md border-b border-[#D8D0C9]/50 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <MonogramSP size={34} className="transition-transform group-hover:scale-105 rounded-full shadow-xs border border-[#EDE4DC]" />
          <span className="font-script text-2xl sm:text-3xl text-[#43362F] tracking-wide">
            {siteData.couple.brideName} &amp; {siteData.couple.groomName}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-serif text-sm tracking-wider uppercase text-[#66564D] hover:text-[#43362F] transition-colors relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[#BA8FA0] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Replay Envelope & Mobile Menu Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onReplayEnvelope}
            className="flex items-center gap-1.5 rounded-full border border-[#DCE8E2] bg-[#FDFAF7] px-3.5 py-1.5 text-xs font-serif tracking-wider text-[#66564D] hover:border-[#BA8FA0] hover:text-[#43362F] transition-all shadow-sm active:scale-95"
            title="Replay Envelope Opening Animation"
          >
            <MailOpen className="h-3.5 w-3.5 text-[#8EAFA0]" />
            <span className="hidden sm:inline">Reopen Envelope</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#66564D] hover:bg-[#EDE4DC]/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F3EE] border-b border-[#D8D0C9] px-6 py-4 shadow-lg">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-base tracking-wider uppercase text-[#66564D] hover:text-[#43362F] py-1 border-b border-[#EDE4DC] last:border-none"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

