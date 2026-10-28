import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface AudioToggleProps {
  currentStep: number;
  totalSteps: number;
  onJumpStep?: (step: number) => void;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ currentStep, totalSteps, onJumpStep }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  const songTitle = 'Kaash Woh Pal 🎶';

  useEffect(() => {
    setIsPlaying(sound.getIsBgmPlaying());

    // Update playing state if triggered elsewhere
    const interval = setInterval(() => {
      setIsPlaying(sound.getIsBgmPlaying());
    }, 600);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const active = sound.toggleBgm();
    setIsPlaying(active);
  };

  const stepNames = [
    'Secret Lock',
    'Love Check',
    'Love You More',
    'Love Explosion',
    'Text Heart',
    'Birthday Letter',
  ];

  return (
    <header className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex items-center gap-1.5 sm:gap-2 select-none">
      {/* Chapter Indicator / Quick Jump */}
      <div className="relative">
        <button
          onClick={() => setShowNav(!showNav)}
          title="Chapters"
          className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-white/90 hover:bg-white backdrop-blur-md rounded-full shadow-sm border border-pink-200/80 text-[11px] sm:text-xs font-medium text-pink-700 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Part {currentStep}/{totalSteps}</span>
        </button>

        {showNav && (
          <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-pink-200 p-2 text-xs flex flex-col gap-1 z-50">
            <div className="px-2 py-1 font-semibold text-pink-900 border-b border-pink-100 flex items-center justify-between">
              <span>Our Story</span>
              <span className="text-[10px] text-pink-400">Jump to</span>
            </div>
            {stepNames.map((name, idx) => {
              const stepNum = idx + 1;
              const isCurrent = stepNum === currentStep;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    onJumpStep?.(stepNum);
                    setShowNav(false);
                    sound.playSparkle();
                  }}
                  className={`text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer text-xs ${
                    isCurrent
                      ? 'bg-pink-100 text-pink-800 font-semibold'
                      : 'text-slate-600 hover:bg-pink-50 hover:text-pink-700'
                  }`}
                >
                  <span>{stepNum}. {name}</span>
                  {isCurrent && <span className="text-pink-500">💗</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Romantic Music Toggle Button for Kaash Woh Pal */}
      <div className="flex items-center bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-pink-200/80 p-0.5">
        <button
          onClick={handleToggle}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
              : 'text-pink-700 hover:bg-pink-50'
          }`}
          title={isPlaying ? 'Pause Kaash Woh Pal' : 'Play Kaash Woh Pal'}
        >
          {isPlaying ? (
            <>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-0.5 bg-white h-3 animate-pulse" />
                <span className="w-0.5 bg-white h-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 bg-white h-3.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="text-[11px] sm:text-xs font-semibold max-w-[80px] xs:max-w-[110px] sm:max-w-[140px] truncate">
                {songTitle}
              </span>
            </>
          ) : (
            <>
              <Music className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-500" />
              <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400" />
              <span className="text-[11px] sm:text-xs font-medium">Song 🎵</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
