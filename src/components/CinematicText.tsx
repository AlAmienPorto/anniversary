import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import PhotoCard from './PhotoCard';

const STORY_LINES = [
  "kita dulu tidak saling kenal",
  "awal mula mendekatimu lewat sosial media",
  "and somehow...",
  "kita ternyata sudah sejauh ini",
];

export default function CinematicText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (currentIndex < STORY_LINES.length) {
      const timer = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 3500); // Wait 3.5s per line
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-transparent px-4 z-10 relative overflow-hidden">
      <AnimatePresence mode="wait">
        {currentIndex < STORY_LINES.length ? (
          <motion.p
            key={currentIndex}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="font-sacramento text-4xl md:text-5xl lg:text-7xl text-primary text-center absolute"
          >
            {STORY_LINES[currentIndex]}
          </motion.p>
        ) : (
          isFinished && <PhotoCard />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFinished ? 1 : 0 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-10 flex flex-col items-center text-secondary/50 animate-bounce"
      >
        <span className="font-sans text-xs tracking-widest uppercase mb-2">scroll down</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
      </motion.div>
    </div>
  );
}
