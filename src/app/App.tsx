import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dashboard } from './components/Dashboard';
import { TerminalLoader } from './components/TerminalLoader';


export default function App() {

  const [isBooting, setIsBooting] = useState(true)

  return (
    <main className="w-full min-h-screen bg-[#0A0A0A] text-white font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {isBooting ? (
          // Show Loading Terminal First
          <motion.div
            key="loader"
            exit={{ opacity: 0, y: -20, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 z-50"
          >
            <TerminalLoader onComplete={() => setIsBooting(false)} />
          </motion.div>
        ) : (
          // Show Dashboard After Terminal Completes
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
            className="absolute inset-0 overflow-y-auto"
          >
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
