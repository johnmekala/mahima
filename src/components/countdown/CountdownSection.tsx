import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Download, Check } from 'lucide-react';
import { ChristianCross, FloralDivider } from '../common/FloralDecor';
import { useWeddingCms } from '../../context/CmsContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC = () => {
  const { siteData } = useWeddingCms();
  const { couple, countdown } = siteData;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedCalendar, setCopiedCalendar] = useState<boolean>(false);

  useEffect(() => {
    const targetDate = new Date(couple.weddingDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [couple.weddingDate]);

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(countdown.googleCalendarTitle);
    const details = encodeURIComponent(countdown.googleCalendarDescription);
    const location = encodeURIComponent(countdown.calendarLocation);
    const dates = '20261128T050000Z/20261128T163000Z'; // UTC equivalent
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate and download .ics iCal file
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${couple.brideName} and ${couple.groomName} Wedding//EN`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:wedding-${couple.brideName}-${couple.groomName}-${Date.now()}@matrimony.org`,
      'DTSTAMP:20261101T000000Z',
      'DTSTART:20261128T050000Z',
      'DTEND:20261128T163000Z',
      `SUMMARY:${countdown.googleCalendarTitle}`,
      `DESCRIPTION:${countdown.googleCalendarDescription}`,
      `LOCATION:${countdown.calendarLocation}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${couple.brideName}_${couple.groomName}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedCalendar(true);
    setTimeout(() => setCopiedCalendar(false), 3000);
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, color: '#8EAFA0' },
    { label: 'Hours', value: timeLeft.hours, color: '#BA8FA0' },
    { label: 'Minutes', value: timeLeft.minutes, color: '#8EAFA0' },
    { label: 'Seconds', value: timeLeft.seconds, color: '#A8978A' },
  ];

  return (
    <section id="countdown" className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#F8F3EE]">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
            <ChristianCross size={18} className="text-[#8EAFA0]" />
            <span className="h-[1px] w-10 bg-[#A8978A]/40" />
          </div>
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-[#A8978A]">
            {countdown.sectionSubtitle}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#43362F] font-normal mt-1">
            {countdown.sectionTitle}
          </h2>
          <p className="font-serif italic text-base text-[#66564D] max-w-md mx-auto mt-2">
            “{countdown.scriptureVerse}” — {countdown.scriptureRef}
          </p>
          <FloralDivider showCross={false} className="my-3" />
        </div>

        {/* Countdown Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-10">
          {timeUnits.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="rounded-2xl bg-[#FDFAF7] border border-[#DCE8E2] p-5 sm:p-6 card-shadow flex flex-col items-center justify-center relative overflow-hidden group transition-shadow duration-300 hover:shadow-md"
            >
              <div
                className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#8EAFA0] to-transparent opacity-60"
              />
              <span className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#43362F] font-medium tracking-tight">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-serif text-xs uppercase tracking-[0.2em] text-[#A8978A] mt-2 font-medium">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Date and Add to Calendar Controls */}
        <div className="rounded-2xl bg-[#FDFAF7]/80 border border-[#D8D0C9]/50 p-6 max-w-xl mx-auto shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 rounded-full bg-[#E9D8DE]/40 border border-[#BA8FA0]/30 text-[#8E546B]">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-serif text-base text-[#43362F] font-medium">
                  {couple.weddingDateFormatted}
                </p>
                <p className="text-xs font-sans text-[#66564D]">{couple.weddingTime}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-full bg-[#8EAFA0] px-4 py-2 text-xs font-serif tracking-wider text-white hover:bg-[#597B6B] transition-colors shadow-xs"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Google Cal</span>
              </a>
              <button
                onClick={downloadIcsFile}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-full border border-[#A8978A]/40 bg-white px-4 py-2 text-xs font-serif tracking-wider text-[#66564D] hover:border-[#BA8FA0] hover:text-[#43362F] transition-colors shadow-xs"
              >
                {copiedCalendar ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#597B6B]" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5 text-[#A8978A]" />
                    <span>iCal / Apple</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

