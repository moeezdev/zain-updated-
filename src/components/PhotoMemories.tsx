import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2 } from 'lucide-react';
import { PhotoMemory, DEFAULT_MEMORIES } from '../utils/photoStorage';
import { BatHeartEmblem } from './BatmanDetails';
import { sound } from '../utils/sound';

interface PhotoMemoriesProps {
  className?: string;
}

export const PhotoMemories: React.FC<PhotoMemoriesProps> = ({ className = '' }) => {
  const [photos] = useState<PhotoMemory[]>(DEFAULT_MEMORIES);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoMemory | null>(null);

  return (
    <div className={`w-full max-w-3xl mx-auto my-8 ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-6 px-2">
        <div className="flex items-center justify-center gap-2">
          <BatHeartEmblem size={22} color="#18181b" />
          <h3 className="text-xl sm:text-2xl font-display font-bold text-pink-950">
            Our Memory Gallery 📸💕
          </h3>
          <BatHeartEmblem size={22} color="#18181b" />
        </div>
        <p className="text-xs text-pink-700/80 mt-1">
          Moments of my favorite human in the whole universe 🦇💗
        </p>
      </div>

      {/* Grid of Polaroid Cards (Pure 7 Photos) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => {
              setSelectedPhoto(photo);
              sound.playPop();
            }}
            className="relative bg-white rounded-2xl p-3 pb-5 shadow-xl shadow-pink-200/50 border border-pink-100 transition-all duration-300 hover:rotate-0 hover:scale-[1.03] cursor-pointer group max-w-sm mx-auto sm:max-w-none w-full"
            style={{
              transform: `rotate(${photo.rotation || 0}deg)`,
            }}
          >
            {/* Cute Washi Tape Decor on Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/80 backdrop-blur-xs rounded-sm rotate-[-2deg] shadow-xs pointer-events-none border-t border-b border-pink-300/40" />

            {/* Photo Frame */}
            <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-pink-50 mb-3 border border-pink-100/80">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Subtle bat icon badge on photo corner */}
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md rounded-full p-1 shadow-sm">
                <BatHeartEmblem size={16} color="#ffffff" />
              </div>

              {/* Tap to view full size icon */}
              <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Polaroid Caption */}
            <div className="px-1 text-center">
              <p className="text-xs sm:text-sm font-script text-pink-900 leading-tight">
                "{photo.caption}"
              </p>
              {photo.date && (
                <span className="text-[10px] text-pink-400 block mt-1 font-mono">
                  {photo.date}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 shadow-2xl border border-pink-200 text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 p-2 bg-black/60 text-white rounded-full hover:bg-black transition-colors z-20 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="max-h-[70vh] rounded-2xl overflow-hidden mb-4 bg-zinc-950 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.caption}
                  className="max-h-[70vh] w-auto object-contain mx-auto"
                />
              </div>

              <p className="text-base sm:text-lg font-script font-bold text-pink-950">
                "{selectedPhoto.caption}"
              </p>
              {selectedPhoto.date && (
                <span className="text-xs text-pink-400 font-mono block mt-1">
                  {selectedPhoto.date}
                </span>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
