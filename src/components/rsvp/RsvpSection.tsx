import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Check, Send, Heart, Sparkles, User, Mail, Phone, Users, MessageSquare, Edit3 } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { submitRsvp, getSavedRsvp } from '../../services/rsvpService';
import { useWeddingCms } from '../../context/CmsContext';
import type { RsvpSubmission } from '../../types/wedding';

export const RsvpSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const existingRsvp = getSavedRsvp();

  const [fullName, setFullName] = useState(existingRsvp?.fullName || '');
  const [email, setEmail] = useState(existingRsvp?.email || '');
  const [phone, setPhone] = useState(existingRsvp?.phone || '');
  const [attendance, setAttendance] = useState<'accept' | 'decline'>(
    existingRsvp?.attendance || 'accept'
  );
  const [guestCount, setGuestCount] = useState<number>(existingRsvp?.guestCount || 1);
  const [eventsAttending, setEventsAttending] = useState<string[]>(
    existingRsvp?.eventsAttending || ['Holy Matrimony', 'Wedding Reception']
  );
  const [dietaryRequirements, setDietaryRequirements] = useState(
    existingRsvp?.dietaryRequirements || ''
  );
  const [blessingMessage, setBlessingMessage] = useState(existingRsvp?.blessingMessage || '');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<RsvpSubmission | null>(existingRsvp);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleToggleEvent = (eventName: string) => {
    if (eventsAttending.includes(eventName)) {
      if (eventsAttending.length > 1) {
        setEventsAttending(eventsAttending.filter((e) => e !== eventName));
      }
    } else {
      setEventsAttending([...eventsAttending, eventName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const response = await submitRsvp({
        fullName,
        email,
        phone,
        attendance,
        guestCount: attendance === 'accept' ? guestCount : 0,
        eventsAttending: attendance === 'accept' ? eventsAttending : [],
        dietaryRequirements,
        blessingMessage,
      });

      setSubmittedData(response.data);
      setStatusMessage(response.message);

      // Fire celebratory confetti if attending!
      if (attendance === 'accept') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#DCE8E2', '#E9D8DE', '#BA8FA0', '#8EAFA0', '#FDFAF7'],
        });
      }
    } catch {
      setStatusMessage('Submission error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#FDFAF7]">
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {siteData.rsvpSettings?.sectionSubtitle || 'Celebrate With Us'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {siteData.rsvpSettings?.sectionTitle || 'Wedding RSVP'}
          </h2>
          <p className="font-serif italic text-base text-[#66564D] max-w-lg mx-auto mt-2">
            {siteData.rsvpSettings?.deadlineNotice ||
              'Kindly respond by October 25, 2026. Your presence and prayers mean the world to us.'}
          </p>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Confirmation Screen OR Form */}
        <div className="rounded-3xl bg-[#F8F3EE] border border-[#DCE8E2] card-shadow p-8 sm:p-12">
          <AnimatePresence mode="wait">
            {submittedData ? (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-6"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EBF2EE] border-2 border-[#8EAFA0] text-[#597B6B] mb-5 shadow-sm">
                  {submittedData.attendance === 'accept' ? (
                    <Sparkles className="h-8 w-8" />
                  ) : (
                    <Heart className="h-8 w-8 text-[#BA8FA0]" />
                  )}
                </div>

                <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#8EAFA0] font-medium">
                  {submittedData.attendance === 'accept' ? 'Joyfully Confirmed' : 'Response Received'}
                </p>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#43362F] font-normal mt-1 mb-3">
                  Thank You, {submittedData.fullName}!
                </h3>

                <p className="font-serif italic text-base text-[#66564D] max-w-md mx-auto mb-6">
                  {submittedData.attendance === 'accept'
                    ? 'We praise God for your presence and eagerly look forward to worshiping and celebrating together on November 28, 2026.'
                    : 'We will truly miss having you with us in person, but we treasure your love, warm wishes, and continuous prayers.'}
                </p>

                {/* RSVP Summary Box */}
                <div className="rounded-2xl bg-[#FDFAF7] border border-[#D8D0C9] p-5 max-w-md mx-auto text-left mb-6 text-xs text-[#66564D] space-y-2">
                  <div className="flex justify-between border-b border-[#EDE4DC] pb-2">
                    <span className="font-serif uppercase tracking-wider text-[#A8978A]">Attendance</span>
                    <span className="font-medium text-[#43362F]">
                      {submittedData.attendance === 'accept' ? 'Attending' : 'Decline with Blessings'}
                    </span>
                  </div>
                  {submittedData.attendance === 'accept' && (
                    <>
                      <div className="flex justify-between border-b border-[#EDE4DC] pb-2">
                        <span className="font-serif uppercase tracking-wider text-[#A8978A]">Guests</span>
                        <span className="font-medium text-[#43362F]">{submittedData.guestCount} Guest(s)</span>
                      </div>
                      <div className="flex justify-between border-b border-[#EDE4DC] pb-2">
                        <span className="font-serif uppercase tracking-wider text-[#A8978A]">Events</span>
                        <span className="font-medium text-[#43362F]">{submittedData.eventsAttending.join(', ')}</span>
                      </div>
                    </>
                  )}
                  {submittedData.blessingMessage && (
                    <div className="pt-1">
                      <span className="font-serif uppercase tracking-wider text-[#A8978A] block mb-1">Your Blessing</span>
                      <p className="font-serif italic text-sm text-[#43362F]">"{submittedData.blessingMessage}"</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSubmittedData(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-[#A8978A]/40 bg-white px-5 py-2 text-xs font-serif tracking-wider text-[#66564D] hover:border-[#BA8FA0] transition-colors"
                  >
                    <Edit3 className="h-3.5 w-3.5 text-[#8EAFA0]" />
                    <span>Edit Response</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Attendance Toggle */}
                <div>
                  <label className="block font-serif text-sm uppercase tracking-wider text-[#66564D] mb-3 text-center">
                    Will You Be Joining Us?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttendance('accept')}
                      className={`flex items-center justify-center gap-3 rounded-2xl p-4 border transition-all duration-300 ${
                        attendance === 'accept'
                          ? 'bg-[#EBF2EE] border-[#8EAFA0] text-[#395246] shadow-xs'
                          : 'bg-[#FDFAF7] border-[#D8D0C9] text-[#66564D] hover:border-[#8EAFA0]'
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                          attendance === 'accept'
                            ? 'border-[#597B6B] bg-[#597B6B] text-white'
                            : 'border-[#A8978A]'
                        }`}
                      >
                        {attendance === 'accept' && <Check className="h-3 w-3" />}
                      </div>
                      <span className="font-serif text-base font-medium">Joyfully Accepts</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('decline')}
                      className={`flex items-center justify-center gap-3 rounded-2xl p-4 border transition-all duration-300 ${
                        attendance === 'decline'
                          ? 'bg-[#F8F2F5] border-[#BA8FA0] text-[#7D4E60] shadow-xs'
                          : 'bg-[#FDFAF7] border-[#D8D0C9] text-[#66564D] hover:border-[#BA8FA0]'
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full flex items-center justify-center border ${
                          attendance === 'decline'
                            ? 'border-[#8E546B] bg-[#8E546B] text-white'
                            : 'border-[#A8978A]'
                        }`}
                      >
                        {attendance === 'decline' && <Check className="h-3 w-3" />}
                      </div>
                      <span className="font-serif text-base font-medium">Regretfully Declines</span>
                    </button>
                  </div>
                </div>

                {/* Personal Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  {/* Full Name */}
                  <div>
                    <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8978A]" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Dr. Arthur &amp; Jane Miller"
                        className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] pl-10 pr-4 py-2.5 text-sm text-[#43362F] placeholder:text-[#A8978A]/60 focus:border-[#8EAFA0] focus:outline-none focus:ring-1 focus:ring-[#8EAFA0]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8978A]" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] pl-10 pr-4 py-2.5 text-sm text-[#43362F] placeholder:text-[#A8978A]/60 focus:border-[#8EAFA0] focus:outline-none focus:ring-1 focus:ring-[#8EAFA0]"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8978A]" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] pl-10 pr-4 py-2.5 text-sm text-[#43362F] placeholder:text-[#A8978A]/60 focus:border-[#8EAFA0] focus:outline-none focus:ring-1 focus:ring-[#8EAFA0]"
                      />
                    </div>
                  </div>

                  {/* Number of Guests */}
                  {attendance === 'accept' && (
                    <div>
                      <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-1.5">
                        Number of Guests Attending
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8978A]" />
                        <select
                          value={guestCount}
                          onChange={(e) => setGuestCount(Number(e.target.value))}
                          className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] pl-10 pr-4 py-2.5 text-sm text-[#43362F] focus:border-[#8EAFA0] focus:outline-none focus:ring-1 focus:ring-[#8EAFA0]"
                        >
                          <option value={1}>1 Person</option>
                          <option value={2}>2 Persons (Couple)</option>
                          <option value={3}>3 Persons (Family)</option>
                          <option value={4}>4 Persons (Family)</option>
                          <option value={5}>5 Persons (Family)</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Attending Events Checkboxes */}
                {attendance === 'accept' && (
                  <div>
                    <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-2">
                      Which Events Will You Attend?
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {['Holy Matrimony', 'Wedding Reception'].map((event) => {
                        const isChecked = eventsAttending.includes(event);
                        return (
                          <button
                            type="button"
                            key={event}
                            onClick={() => handleToggleEvent(event)}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-serif tracking-wider border transition-colors ${
                              isChecked
                                ? 'bg-[#EBF2EE] border-[#8EAFA0] text-[#395246]'
                                : 'bg-[#FDFAF7] border-[#D8D0C9] text-[#66564D]'
                            }`}
                          >
                            <span
                              className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                                isChecked
                                  ? 'bg-[#597B6B] border-[#597B6B] text-white'
                                  : 'border-[#A8978A]'
                              }`}
                            >
                              {isChecked && <Check className="h-3 w-3" />}
                            </span>
                            <span>{event}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Dietary requirements */}
                {attendance === 'accept' && (
                  <div>
                    <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-1.5">
                      Dietary Preferences (Optional)
                    </label>
                    <input
                      type="text"
                      value={dietaryRequirements}
                      onChange={(e) => setDietaryRequirements(e.target.value)}
                      placeholder="e.g. Pure Vegetarian, Gluten-Free, Nut Allergies"
                      className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] px-4 py-2.5 text-sm text-[#43362F] placeholder:text-[#A8978A]/60 focus:border-[#8EAFA0] focus:outline-none focus:ring-1 focus:ring-[#8EAFA0]"
                    />
                  </div>
                )}

                {/* Optional Message / Blessing */}
                <div>
                  <label className="block font-serif text-xs uppercase tracking-wider text-[#A8978A] mb-1.5">
                    Your Blessing or Message to the Couple
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-[#A8978A]" />
                    <textarea
                      rows={3}
                      value={blessingMessage}
                      onChange={(e) => setBlessingMessage(e.target.value)}
                      placeholder="Share a heartfelt prayer, advice, or Bible verse for John and Sriya..."
                      className="w-full rounded-xl border border-[#D8D0C9] bg-[#FDFAF7] pl-10 pr-4 py-2.5 text-sm text-[#43362F] placeholder:text-[#A8978A]/60 focus:border-[#8EAFA0] focus:outline-none focus:ring-1 focus:ring-[#8EAFA0]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 text-center">
                  {statusMessage && (
                    <p className="font-serif italic text-xs text-[#8EAFA0] mb-3">
                      {statusMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#8EAFA0] px-10 py-3.5 font-serif text-sm tracking-widest uppercase text-white shadow-md hover:bg-[#597B6B] transition-all hover:shadow-lg disabled:opacity-50 active:scale-95"
                  >
                    {isSubmitting ? (
                      <span>Submitting Your Blessing...</span>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send RSVP &amp; Blessing</span>
                      </>
                    )}
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-sans text-[#A8978A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8EAFA0]" />
                    <span>Connected to Firebase Realtime Database (RTDB)</span>
                  </div>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
