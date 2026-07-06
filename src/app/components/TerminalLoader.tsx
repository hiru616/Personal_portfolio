import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_SEQUENCE = [
  "[SYSTEM] Initiating core hardware processes...",
  "[KERNEL] Mounting React virtual DOM...",
  "[NETWORK] Resolving NGINX load balancers... [OK]",
  "[DATABASE] Connecting to SkyNest MySQL schema... [OK]",
  "[ML] Warming up PredictiveOps models... [OK]",
  "[LOGISTICS] Bootstrapping MoraXtreme 10.0 parameters... [OK]",
  "[AUTH] Connection established. User identified."
];

// The glowing text phrases mimicking Apple Intelligence combining data
const AI_PHRASES = [
  "Resolving University of Moratuwa...",
  "Intake 2023 Batch Representative...",
  "Integrating Software Engineering...",
  "Ishakya Gamage"
];

// Provide some photos for the intelligence collage shuffle effect
const SHUFFLE_PHOTOS = [
  "/images/loadGallery/2.jpeg",
  "/images/loadGallery/3.jpeg",
  "/images/loadGallery/4.jpg",
  "/images/loadGallery/5.jpeg"
];

export function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isBooting, setIsBooting] = useState(true);

  const [userInput, setUserInput] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  // Tracks the transition from Terminal -> Apple Intelligence -> Dashboard
  const [phase, setPhase] = useState<'terminal' | 'intelligence' | 'complete'>('terminal');
  const [activePhrase, setActivePhrase] = useState(0);

  // 1. The Typewriter Effect
  useEffect(() => {
    if (!isBooting || phase !== 'terminal') return;

    if (currentLineIndex < BOOT_SEQUENCE.length) {
      const currentLine = BOOT_SEQUENCE[currentLineIndex];

      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (newLines[currentLineIndex] === undefined) newLines[currentLineIndex] = "";
            newLines[currentLineIndex] += currentLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 15);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      setIsBooting(false);
    }
  }, [currentLineIndex, currentCharIndex, isBooting, phase]);

  // 2. Keyboard Event Listener
  useEffect(() => {
    if (isBooting || phase !== 'terminal') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (userInput.toLowerCase().trim() === 'start_portfolio') {
          setPhase('intelligence');
        } else {
          setErrorMsg(true);
          setTimeout(() => setErrorMsg(false), 1000);
          setUserInput("");
        }
      } else if (e.key === 'Backspace') {
        setUserInput(prev => prev.slice(0, -1));
      } else if (e.key.length === 1) {
        setUserInput(prev => prev + e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBooting, userInput, phase]);

  // 3. Apple Intelligence Phase Progression
  useEffect(() => {
    if (phase !== 'intelligence') return;

    // Cycle through the glowing phrases
    const phraseTimer = setInterval(() => {
      setActivePhrase(prev => {
        if (prev === AI_PHRASES.length - 1) {
          clearInterval(phraseTimer);
          // Wait briefly on the final name, then complete
          setTimeout(() => setPhase('complete'), 2500);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    return () => clearInterval(phraseTimer);
  }, [phase]);

  // 4. Trigger Final Dashboard Load
  useEffect(() => {
    if (phase === 'complete') {
      setTimeout(onComplete, 800);
    }
  }, [phase, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-[#050505] w-full text-left font-mono relative overflow-hidden">

      {/* THE INTELLIGENCE GLOW BACKGROUND (Only visible in Intelligence phase) */}
      <AnimatePresence>
        {phase === 'intelligence' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Soft, rotating, colorful blurred blobs simulating AI generation */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-full blur-[100px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === 'terminal' ? (
          // --- THE TERMINAL PHASE ---
          <motion.div
            key="terminal"
            exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full max-w-2xl bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 shadow-2xl relative z-10"
          >
            <div className="flex items-center gap-3 mb-6 text-white/50 border-b border-white/10 pb-4">
              <Terminal size={18} />
              <span>root@ishakya:~</span>
            </div>

            <div className="space-y-2 text-green-400 text-sm sm:text-base leading-relaxed">
              {displayedLines.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>

            {!isBooting && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm sm:text-base">
                <div className="text-gray-400 mb-2">
                  System Ready. Type <span className="text-white font-bold">'start_portfolio'</span> and press Enter.
                </div>

                <div className="flex items-center text-green-400">
                  <span className="mr-2 text-white">root@ishakya:~#</span>
                  <span>{userInput}</span>
                  <motion.div
                    animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2.5 h-5 bg-green-400 ml-1"
                  />
                </div>

                {errorMsg && <div className="text-red-500 mt-2 text-sm">Command not found. Please type 'start_portfolio'.</div>}

                <div className="mt-8 border-t border-white/10 pt-4 md:hidden">
                  <p className="text-gray-500 text-xs mb-3">Mobile device detected. Tap to bypass keyboard input:</p>
                  <button onClick={() => setPhase('intelligence')} className="px-4 py-2 bg-white/10 border border-white/20 rounded text-white text-sm active:bg-white/30">
                    [ EXECUTE start_portfolio ]
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

        ) : phase === 'intelligence' ? (

          // --- THE APPLE INTELLIGENCE PHASE ---
          <motion.div
            key="intelligence"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="text-center z-10 w-full max-w-4xl flex flex-col items-center justify-center h-[60vh]"
          >
            {/* Photo Shuffling Cluster */}
            <div className="relative w-64 h-64 mb-16">
              {SHUFFLE_PHOTOS.map((photo, i) => (
                <motion.img
                  key={i}
                  src={photo}
                  initial={{ opacity: 0, scale: 0.5, rotate: Math.random() * 20 - 10, x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 1.1, 0.9],
                    zIndex: i
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl border border-white/10"
                />
              ))}
            </div>

            {/* Glowing Text Combiner */}
            <div className="h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activePhrase}
                  initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                  transition={{ duration: 0.6 }}
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
        ) : null}
      </AnimatePresence>
    </div>
  );
}