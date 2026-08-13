import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// The glowing text phrases mimicking Apple Intelligence combining data
const AI_PHRASES = [
  "Resolving University of Moratuwa...",
  "Intake 2023 Batch Representative...",
  "Integrating Software Engineering...",
  "Ishakya Gamage"
];

// Photos scattered across the full screen for the intelligence collage shuffle effect
const SHUFFLE_PHOTOS = [
  { src: "/images/loadGallery/2.jpeg", top: "12%", left: "12%", size: "13vmin", rotate: -8 },
  { src: "/images/loadGallery/3.jpeg", top: "18%", left: "80%", size: "15vmin", rotate: 6 },
  { src: "/images/loadGallery/4.jpg", top: "72%", left: "10%", size: "14vmin", rotate: 5 },
  { src: "/images/loadGallery/5.jpeg", top: "78%", left: "82%", size: "13vmin", rotate: -6 },
  { src: "/images/gallery/2.jpg", top: "8%", left: "45%", size: "11vmin", rotate: 4 },
  { src: "/images/gallery/5.jpg", top: "85%", left: "46%", size: "12vmin", rotate: -4 },
  { src: "/images/gallery/8.jpg", top: "45%", left: "6%", size: "12vmin", rotate: 7 },
  { src: "/images/gallery/11.jpg", top: "40%", left: "88%", size: "13vmin", rotate: -5 },
  { src: "/images/gallery/14.jpg", top: "25%", left: "25%", size: "10vmin", rotate: -3 },
  { src: "/images/gallery/17.jpg", top: "62%", left: "68%", size: "11vmin", rotate: 3 },
];

export function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [activePhrase, setActivePhrase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Cycle through the glowing phrases, then trigger completion
  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setActivePhrase(prev => {
        if (prev === AI_PHRASES.length - 1) {
          clearInterval(phraseTimer);
          setTimeout(() => setIsComplete(true), 900);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    return () => clearInterval(phraseTimer);
  }, []);

  useEffect(() => {
    if (isComplete) {
      setTimeout(onComplete, 300);
    }
  }, [isComplete, onComplete]);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#050505] relative overflow-hidden">

      {/* THE INTELLIGENCE GLOW BACKGROUND */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-[100px]"
        />
      </motion.div>

      {/* Photo Shuffling Cluster - scattered across the full screen */}
      <div className="absolute inset-0 pointer-events-none">
        {SHUFFLE_PHOTOS.map((photo, i) => (
          <motion.img
            key={i}
            src={photo.src}
            initial={{ opacity: 0, scale: 0.6, rotate: photo.rotate }}
            animate={{
              opacity: [0, 0.85, 0],
              scale: [0.85, 1, 0.9],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.22,
              ease: "easeInOut"
            }}
            style={{
              top: photo.top,
              left: photo.left,
              width: photo.size,
              height: photo.size,
              transform: `translate(-50%, -50%) rotate(${photo.rotate}deg)`
            }}
            className="absolute object-cover rounded-2xl shadow-2xl border border-white/10"
          />
        ))}
      </div>

      {/* Vignette so the text stays legible over the scattered photos */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(5,5,5,0.75) 0%, rgba(5,5,5,0.35) 40%, rgba(5,5,5,0.85) 100%)" }} />

      <AnimatePresence>
        {!isComplete && (
          <motion.div
            exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 w-full max-w-4xl flex flex-col items-center justify-center px-4"
          >
            <div className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activePhrase}
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.4 }}
                  className={`text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r ${activePhrase === AI_PHRASES.length - 1
                    ? "from-white via-gray-200 to-gray-400" // Final name resolves in sleek white/silver
                    : "from-blue-400 via-purple-400 to-pink-400" // Combining data glows colorful
                    }`}
                  style={{
                    filter: activePhrase === AI_PHRASES.length - 1 ? 'drop-shadow(0px 0px 20px rgba(255,255,255,0.4))' : 'drop-shadow(0px 0px 30px rgba(168,85,247,0.5))'
                  }}
                >
                  {AI_PHRASES[activePhrase]}
                </motion.h1>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
