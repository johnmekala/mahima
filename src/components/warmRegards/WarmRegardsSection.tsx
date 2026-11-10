import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Quote, MapPin } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';

export const WarmRegardsSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const warmRegards = siteData.warmRegards;

  const sectionSubtitle = warmRegards?.sectionSubtitle || 'Cordial Invitation';
  const sectionTitle = warmRegards?.sectionTitle || 'With Warm Regards';
  const brideFamilyTitle = warmRegards?.brideFamilyTitle || "Invited by the Bride's Family";
  const parentsNames = warmRegards?.parentsNames || 'Mr. Samuel Joseph & Mrs. Mary Joseph';
  const parentsRelation = warmRegards?.parentsRelation || 'Loving Parents of Sunitha Grace';
  const invitationQuote =
    warmRegards?.invitationQuote ||
    '“With prayerful hearts and joyous praise to Almighty God, we cordially invite you and your family to witness and celebrate the Holy Matrimony of our beloved daughter Sunitha with Prasad. Your gracious presence and prayers will make our joy complete.”';
  const familyMembersList =
    warmRegards?.familyMembersList ||
    'Alan Joseph (Brother)\nLate Mr. P. Joseph & Mrs. Annamma Joseph (Grandparents)\nWith Best Compliments from Uncles, Aunts, Cousins, and the entire Joseph Family & Well-wishers';
  const scriptureVerse =
    warmRegards?.scriptureVerse ||
    '“The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace.” — Numbers 6:24-26';
  const footerNote =
    warmRegards?.footerNote || 'Warmly welcoming you from Bengaluru, Karnataka';

  // Split lines for family members
  const familyLines = familyMembersList
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  return (
    <section id="warm-regards" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#FDFAF7]">
      {/* Anchor alias */}
      <div id="regards" className="absolute -top-20 pointer-events-none" />

      {/* Ambient Pastel Background Lighting */}
      <div
        className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-[#E9D8DE]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full bg-[#DCE8E2]/35 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-12 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-12 bg-[#A8978A]/40" />
          </div>

          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {sectionSubtitle}
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1.5 tracking-tight">
            {sectionTitle}
          </h2>

          <p className="font-serif italic text-base sm:text-lg text-[#66564D] max-w-xl mx-auto mt-2 leading-relaxed">
            Together with our families, we praise God for His boundless grace and joyfully invite you to celebrate this holy covenant.
          </p>

          <FloralDivider showCross={false} className="my-4" />
        </div>

        {/* Central Invitation Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl sm:rounded-4xl bg-gradient-to-b from-[#FFFDFD] via-[#FDF9FA] to-[#FAF3F6] border border-[#E9D8DE] card-shadow overflow-hidden p-7 sm:p-12 text-center"
        >
          {/* Subtle Decorative Floral Background Watermark */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#BA8FA0]/5 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-[#8EAFA0]/5 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Top Badge: Invited by the Bride's Family */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#8E546B] border border-[#D7BAC5] shadow-xs mb-6">
            <Heart className="h-3.5 w-3.5 text-[#BA8FA0] fill-[#BA8FA0]" />
            <span className="font-medium">{brideFamilyTitle}</span>
            <Sparkles className="h-3.5 w-3.5 text-[#BA8FA0]" />
          </div>

          {/* Script Invitation Header */}
          <h3 className="font-script text-3xl sm:text-5xl text-[#43362F] leading-tight mb-1">
            Cordially Inviting You
          </h3>
          <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#8EAFA0] mb-6 font-medium">
            To Witness the Sacred Matrimony of
          </p>

          <div className="inline-block px-5 py-2 rounded-2xl bg-white/80 border border-[#EDE4DC] shadow-2xs mb-8">
            <span className="font-script text-2xl sm:text-3xl text-[#43362F]">
              {siteData.couple.brideName} &amp; {siteData.couple.groomName}
            </span>
          </div>

          {/* Bride's Parents Showcase */}
          <div className="max-w-xl mx-auto rounded-2xl bg-white/90 border border-[#E9D8DE] p-6 sm:p-7 shadow-xs mb-8">
            <p className="font-serif text-[11px] uppercase tracking-[0.25em] text-[#A8978A] mb-1 font-medium">
              Parents of the Bride
            </p>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#43362F] font-semibold tracking-wide">
              {parentsNames}
            </h4>
            <p className="font-serif italic text-xs sm:text-sm text-[#597B6B] mt-1 font-medium">
              {parentsRelation}
            </p>
          </div>

          {/* Heartfelt Invitation Quote */}
          {invitationQuote && (
            <div className="relative max-w-2xl mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-[#F8F3EE]/80 border border-[#DCE8E2] text-center">
              <Quote className="h-6 w-6 text-[#BA8FA0]/70 mx-auto mb-2" />
              <blockquote className="font-serif italic text-sm sm:text-base text-[#43362F] leading-relaxed">
                {invitationQuote}
              </blockquote>
            </div>
          )}

          {/* Invited By Bride Family Members & Near and Dear */}
          {familyLines.length > 0 && (
            <div className="max-w-2xl mx-auto my-8 pt-6 border-t border-[#EDE4DC]">
              <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#A8978A] mb-4 font-semibold">
                With Best Compliments &amp; Cordial Regards From:
              </p>
              <div className="space-y-2.5">
                {familyLines.map((line, idx) => (
                  <div
                    key={idx}
                    className="inline-block sm:block mx-1 sm:mx-0 py-1.5 px-4 rounded-xl bg-white/80 border border-[#EDE4DC] text-xs sm:text-sm font-serif text-[#66564D] shadow-2xs"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sacred Scripture Quote */}
          {scriptureVerse && (
            <div className="max-w-xl mx-auto mt-8 p-4 sm:p-5 rounded-2xl bg-white/90 border border-[#E9D8DE] shadow-2xs">
              <p className="font-serif italic text-xs sm:text-sm text-[#43362F] leading-relaxed">
                {scriptureVerse}
              </p>
            </div>
          )}

          {/* Footer Note / Location */}
          {footerNote && (
            <div className="mt-8 pt-6 border-t border-[#EDE4DC]/80 flex items-center justify-center gap-2 text-xs font-serif text-[#A8978A]">
              <MapPin className="h-3.5 w-3.5 text-[#8EAFA0]" />
              <span>{footerNote}</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WarmRegardsSection;

