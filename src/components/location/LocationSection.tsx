import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, Train, Camera, ExternalLink } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';

export const LocationSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const [activeTab, setActiveTab] = useState<'ceremony' | 'reception'>('ceremony');

  const ceremonyEvent = siteData.events.find((e) => e.type === 'ceremony') || siteData.events[0];
  const receptionEvent = siteData.events.find((e) => e.type === 'reception') || siteData.events[1] || siteData.events[0];

  const currentEvent = activeTab === 'ceremony' ? ceremonyEvent : receptionEvent;

  return (
    <section id="location" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#F8F3EE]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {siteData.locations.sectionSubtitle || 'Getting There'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {siteData.locations.sectionTitle || 'Wedding Locations & Directions'}
          </h2>
          <p className="font-serif italic text-base text-[#66564D] max-w-lg mx-auto mt-2">
            {siteData.locations.sectionDescription ||
              'Find your way to the sacred church ceremony and celebratory evening reception.'}
          </p>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Tab Controls for Church / Reception */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('ceremony')}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-serif tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'ceremony'
                ? 'bg-[#8EAFA0] text-white shadow-sm'
                : 'bg-[#FDFAF7] text-[#66564D] border border-[#DCE8E2] hover:border-[#8EAFA0]'
            }`}
          >
            <ChristianCross size={14} className={activeTab === 'ceremony' ? 'text-white' : 'text-[#8EAFA0]'} />
            <span>Church (Holy Matrimony)</span>
          </button>

          <button
            onClick={() => setActiveTab('reception')}
            className={`flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-serif tracking-wider uppercase transition-all duration-300 ${
              activeTab === 'reception'
                ? 'bg-[#BA8FA0] text-white shadow-sm'
                : 'bg-[#FDFAF7] text-[#66564D] border border-[#DCE8E2] hover:border-[#BA8FA0]'
            }`}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>Reception Pavilion</span>
          </button>
        </div>

        {/* Location Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl bg-[#FDFAF7] border border-[#DCE8E2] card-shadow overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0"
        >
          {/* Details Column */}
          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-wider text-[#A8978A] mb-2">
                <span>{activeTab === 'ceremony' ? 'Morning Service' : 'Evening Celebration'}</span>
                <span>•</span>
                <span>{currentEvent.time}</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#43362F] font-normal mb-2">
                {currentEvent.venueName}
              </h3>

              <p className="font-serif italic text-sm text-[#8EAFA0] mb-5">
                {currentEvent.subtitle}
              </p>

              <div className="flex items-start gap-2.5 text-sm text-[#66564D] mb-6">
                <MapPin className="h-4 w-4 text-[#BA8FA0] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{currentEvent.address}</span>
              </div>

              {/* Guest Logistics Advice */}
              <div className="space-y-3 border-t border-[#A8978A]/20 pt-5 text-xs text-[#66564D]">
                <div className="flex items-center gap-2.5">
                  <Car className="h-4 w-4 text-[#8EAFA0]" />
                  <span>
                    {activeTab === 'ceremony'
                      ? siteData.locations.churchParkingNote
                      : siteData.locations.receptionParkingNote}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Train className="h-4 w-4 text-[#8EAFA0]" />
                  <span>
                    {activeTab === 'ceremony'
                      ? siteData.locations.churchTransitNote
                      : siteData.locations.receptionTransitNote}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Camera className="h-4 w-4 text-[#BA8FA0]" />
                  <span>
                    {activeTab === 'ceremony'
                      ? siteData.locations.churchEtiquetteNote
                      : siteData.locations.receptionPhotoNote}
                  </span>
                </div>
              </div>
            </div>

            {/* Google Maps External Button */}
            <div className="pt-6 mt-6 border-t border-[#A8978A]/20 flex flex-col sm:flex-row gap-3">
              <a
                href={currentEvent.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8EAFA0] px-6 py-3 text-xs font-serif tracking-wider text-white hover:bg-[#597B6B] transition-colors shadow-xs"
              >
                <Navigation className="h-4 w-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Interactive Map Embed / Preview Column */}
          <div className="lg:col-span-7 bg-[#EDE4DC] relative min-h-[360px] lg:min-h-full">
            <iframe
              title={`Map for ${currentEvent.venueName}`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                currentEvent.embedMapQuery
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              className="w-full h-full filter saturate-[0.85] contrast-[1.05]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
