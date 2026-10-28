import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { BatHeartEmblem } from '../BatmanDetails';
import { sound } from '../../utils/sound';
import { getHeroPhoto, saveHeroPhoto, DEFAULT_MEMORIES } from '../../utils/photoStorage';

interface LoveMoreScreenProps {
  onProve: () => void;
}

export const LoveMoreScreen: React.FC<LoveMoreScreenProps> = ({ onProve }) => {
  const [heroPhoto, setHeroPhoto] = useState<string>(getHeroPhoto());
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  useEffect(() => {
    const saved = getHeroPhoto();
    setHeroPhoto(saved);
    const foundIdx = DEFAULT_MEMORIES.findIndex((m) => m.url === saved);
    if (foundIdx !== -1) setPhotoIndex(foundIdx);
  }, []);

  const handleProveClick = () => {
    sound.playSparkle();
    onProve();
  };

  const handleNextPhoto = () => {
    sound.playPop();
    const nextIdx = (photoIndex + 1) % DEFAULT_MEMORIES.length;
    setPhotoIndex(nextIdx);
    const nextUrl = DEFAULT_MEMORIES[nextIdx].url;
    setHeroPhoto(nextUrl);
    saveHeroPhoto(nextUrl);
  };

  const handlePrevPhoto = () => {
    sound.playPop();
    const prevIdx = (photoIndex - 1 + DEFAULT_MEMORIES.length) % DEFAULT_MEMORIES.length;
    setPhotoIndex(prevIdx);
    const prevUrl = DEFAULT_MEMORIES[prevIdx].url;
    setHeroPhoto(prevUrl);
    saveHeroPhoto(prevUrl);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 pt-16 pb-12 sm:py-12 z-10 text-center">
      {/* Top Banner (desktop only) */}
      <div className="hidden sm:flex absolute top-6 left-6 items-center gap-2 text-xs text-pink-800 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-pink-200/80 shadow-sm">
        <BatHeartEmblem size={18} color="#18181b" />
        <span className="font-medium">Unconditional Truth Alert</span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full max-w-xl mx-auto flex flex-col items-center"
      >
        {/* Real photo showcase of him */}
        <div className="relative mb-3 group">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-pink-400/25 blur-3xl rounded-full scale-125" />

          {/* Card containing His Photo */}
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 0.8, 0, -0.8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-56 h-64 sm:w-64 sm:h-76 rounded-3xl overflow-hidden border-4 border-white/95 shadow-2xl shadow-pink-300/40 bg-gradient-to-b from-white/90 to-pink-50/90 p-2 flex items-center justify-center"
          >
            <img
              src={heroPhoto}
              alt="My favorite Batman"
              className="w-full h-full object-cover rounded-2xl"
              referrerPolicy="no-referrer"
            />

            {/* Corner Bat Silhouette Badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-1.5 shadow-md border border-pink-200">
              <BatHeartEmblem size={20} color="#18181b" />
            </div>

            {/* Quick cycle left/right buttons on photo */}
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handlePrevPhoto}
                className="w-8 h-8 rounded-full bg-white/90 text-pink-900 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Previous photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="w-8 h-8 rounded-full bg-white/90 text-pink-900 shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
                title="Next photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Floating mini hearts and sparkles */}
          <motion.span
            animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-3 -right-3 text-3xl pointer-events-none"
          >
            💖
          </motion.span>
          <motion.span
            animate={{ y: [0, 8, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            className="absolute -bottom-2 -left-3 text-2xl pointer-events-none"
          >
            🦇
          </motion.span>
        </div>

        {/* Photo Switcher Dots */}
        <div className="mb-6 flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-pink-200 shadow-xs">
          {DEFAULT_MEMORIES.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => {
                setPhotoIndex(idx);
                setHeroPhoto(m.url);
                saveHeroPhoto(m.url);
                sound.playPop();
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                photoIndex === idx ? 'bg-pink-600 scale-125' : 'bg-pink-200 hover:bg-pink-400'
              }`}
              title={`Photo ${idx + 1}`}
            />
          ))}
        </div>

        {/* Headings */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-100/80 rounded-full border border-pink-200 text-pink-700 text-xs sm:text-sm font-semibold mb-3 shadow-sm">
            <span>✨ Undeniable Fact ✨</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-pink-950 tracking-tight mb-2">
            I LOVE YOU MORE! 💗
          </h2>

          <p className="text-base sm:text-lg text-pink-800/90 font-medium max-w-md mx-auto mb-8 leading-relaxed">
            And don't even try to argue with me about it 😤💕
          </p>
        </motion.div>

        {/* Interactive "PROVE YOUR LOVE 💌" Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleProveClick}
          className="group relative overflow-hidden px-10 py-4 sm:py-4.5 rounded-2xl font-bold text-base sm:text-lg text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 shadow-xl shadow-pink-500/35 hover:shadow-pink-500/50 transition-all cursor-pointer flex items-center gap-3"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
          <span className="relative tracking-wider font-semibold">
            PROVE YOUR LOVE 💌
          </span>
          <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
        </motion.button>

        {/* Batman Gotham Love Quote */}
        <p className="mt-6 text-xs text-pink-600/75 italic">
          "Even Batman in all of Gotham couldn't protect his heart from loving you this much 🦇🖤"
        </p>
      </motion.div>
    </div>
  );
};
