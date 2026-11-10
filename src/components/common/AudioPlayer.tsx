import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Disc } from 'lucide-react';
import { soundService } from '../../services/soundService';
import { useWeddingCms } from '../../context/CmsContext';

interface AudioPlayerProps {
  autoStarted?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoStarted = false }) => {
  const { siteData } = useWeddingCms();
  const { music } = siteData;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);

  const hasCustomAudio = Boolean(music.customAudioUrl && music.customAudioUrl.trim().length > 0);

  // Handle auto-start on envelope open if enabled
  useEffect(() => {
    if (autoStarted && (music.autoPlayAfterEnvelope ?? true)) {
      startPlayback();
    }
  }, [autoStarted, music.autoPlayAfterEnvelope]);

  // If custom audio URL changes in CMS while playing, switch to new audio
  useEffect(() => {
    if (audioRef.current && hasCustomAudio) {
      audioRef.current.src = music.customAudioUrl!;
      audioRef.current.load();
      setAudioError(false);
      if (isPlaying) {
        soundService.stopBackgroundMusic();
        audioRef.current.play().catch(() => {
          // Browser autoplay restriction
        });
      }
    }
  }, [music.customAudioUrl, hasCustomAudio]);

  const startPlayback = () => {
    setIsPlaying(true);
    setIsMuted(false);

    if (hasCustomAudio && audioRef.current && !audioError) {
      soundService.stopBackgroundMusic();
      audioRef.current.play().catch((err) => {
        console.warn('Custom audio playback failed, falling back to ambient synth:', err);
        setAudioError(true);
        soundService.startBackgroundMusic();
      });
    } else {
      soundService.startBackgroundMusic();
    }
  };

  const stopPlayback = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    soundService.stopBackgroundMusic();
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
    }
    soundService.toggleMute();

    if (!isPlaying && !nextMuted) {
      startPlayback();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Hidden HTML5 Audio Element for custom audio/MP3 */}
      {hasCustomAudio && (
        <audio
          ref={audioRef}
          src={music.customAudioUrl}
          loop
          preload="auto"
          onEnded={() => {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(() => {});
            }
          }}
          onError={() => {
            console.warn('Audio URL failed to load. Falling back to ambient melody.');
            setAudioError(true);
            if (isPlaying) {
              soundService.startBackgroundMusic();
            }
          }}
        />
      )}

      {/* Floating Audio Control Pill */}
      <div className="flex items-center gap-2.5 rounded-full border border-[#DCE8E2] bg-[#FDFAF7]/95 px-4 py-2.5 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:border-[#BA8FA0]/50 group">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayback}
          className="flex items-center gap-2.5 text-xs font-medium tracking-wider text-[#66564D] hover:text-[#43362F] transition-colors"
          title={isPlaying ? `Pause: ${music.trackTitle}` : `Play: ${music.trackTitle}`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Disc className="h-4 w-4 text-[#8EAFA0] animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          ) : (
            <Play className="h-4 w-4 text-[#8EAFA0] fill-[#8EAFA0]" />
          )}

          <div className="flex flex-col text-left">
            <span className="font-serif italic text-xs sm:text-sm text-[#43362F] font-medium max-w-[140px] sm:max-w-[200px] truncate leading-tight">
              {music.trackTitle || 'Wedding Hymn'}
            </span>
            <span className="text-[10px] text-[#A8978A] font-serif uppercase tracking-wider leading-none">
              {isPlaying && !isMuted
                ? hasCustomAudio && !audioError
                  ? 'Playing Audio'
                  : 'Playing Ambient'
                : 'Tap to Play'}
            </span>
          </div>
        </button>

        {/* Animated Equalizer Waveform */}
        {isPlaying && !isMuted && (
          <div className="flex items-end gap-0.5 h-4 px-1" title="Sound playing">
            <span className="w-0.5 rounded-full bg-[#8EAFA0] animate-pulse h-3" />
            <span className="w-0.5 rounded-full bg-[#BA8FA0] animate-pulse h-4 delay-75" />
            <span className="w-0.5 rounded-full bg-[#8EAFA0] animate-pulse h-2.5 delay-150" />
            <span className="w-0.5 rounded-full bg-[#BA8FA0] animate-pulse h-3.5 delay-100" />
          </div>
        )}

        {/* Volume / Mute Button */}
        <button
          onClick={toggleMute}
          className="p-1 rounded-full text-[#66564D] hover:text-[#43362F] hover:bg-[#EBF2EE] transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted || !isPlaying ? (
            <VolumeX className="h-4 w-4 text-[#A8978A]" />
          ) : (
            <Volume2 className="h-4 w-4 text-[#597B6B]" />
          )}
        </button>
      </div>
    </div>
  );
};
