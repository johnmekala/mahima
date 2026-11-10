import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';
import type { GalleryPhoto } from '../../types/wedding';

export const GallerySection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const galleryPhotos = siteData.gallery;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Filter photos based on category
  const filteredPhotos =
    activeCategory === 'all'
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
        );
      } else if (e.key === 'Escape') {
        setSelectedPhotoIndex(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  // Touch swipe support for mobile
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      // Swiped left -> next
      setSelectedPhotoIndex((prev) =>
        prev !== null ? (prev + 1) % filteredPhotos.length : 0
      );
    } else if (distance < -50) {
      // Swiped right -> prev
      setSelectedPhotoIndex((prev) =>
        prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
      );
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'ceremony', label: 'Ceremony & Church' },
    { id: 'engagement', label: 'Engagement' },
    { id: 'candid', label: 'Candid Joy' },
  ];

  const currentPhoto: GalleryPhoto | undefined =
    selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : undefined;

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#F8F3EE]">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {siteData.gallerySettings?.sectionSubtitle || 'Cherished Moments'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {siteData.gallerySettings?.sectionTitle || 'Wedding Gallery'}
          </h2>
          <p className="font-serif italic text-base text-[#66564D] max-w-lg mx-auto mt-2">
            {siteData.gallerySettings?.sectionDescription ||
              'Capturing the smiles, sacred prayers, and quiet grace leading up to our forever.'}
          </p>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedPhotoIndex(null);
              }}
              className={`rounded-full px-5 py-2 text-xs font-serif tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-[#8EAFA0] text-white shadow-sm'
                  : 'bg-[#FDFAF7] text-[#66564D] border border-[#DCE8E2] hover:border-[#BA8FA0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Responsive Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, idx) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="break-inside-avoid group relative rounded-2xl overflow-hidden card-shadow bg-[#FDFAF7] border border-[#D8D0C9]/60 cursor-pointer"
              onClick={() => setSelectedPhotoIndex(idx)}
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Soft overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#43362F]/70 via-[#43362F]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <p className="font-serif text-lg font-medium">{photo.title}</p>
                    <span className="font-serif italic text-xs text-[#E9D8DE]">
                      View Full Portrait
                    </span>
                  </div>
                  <div className="p-2 rounded-full bg-white/25 backdrop-blur-xs">
                    <Maximize2 className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#43362F]/80 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedPhotoIndex(null)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar with counter & close button */}
            <div
              className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-8 flex items-center justify-between text-[#FDFAF7] z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-serif text-sm tracking-widest uppercase">
                {selectedPhotoIndex + 1} / {filteredPhotos.length}
              </div>
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex(
                  (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
                );
              }}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
              }}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-white/20 hover:bg-white/35 text-white transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Centered Image Container */}
            <motion.div
              key={currentPhoto.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[82vh] overflow-hidden rounded-2xl bg-black/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentPhoto.imageUrl}
                alt={currentPhoto.title}
                className="max-h-[75vh] w-auto max-w-full object-contain mx-auto rounded-t-2xl"
              />
              <div className="bg-[#FDFAF7] p-4 text-center">
                <h4 className="font-serif text-xl text-[#43362F] font-medium">{currentPhoto.title}</h4>
                <p className="font-serif italic text-xs text-[#8EAFA0] mt-0.5">
                  Swipe or use arrow keys to navigate
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
