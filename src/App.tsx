import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LockScreen from './components/LockScreen';
import OpeningGate from './components/OpeningGate';
import CinematicText from './components/CinematicText';
import MemoryScroll from './components/MemoryScroll';
import InteractiveReveal from './components/InteractiveReveal';
import PhotoBooth from './components/PhotoBooth';
import MemoryGalaxy from './components/MemoryGalaxy';
import LoveLetter from './components/LoveLetter';
import FinalScene from './components/FinalScene';
import MusicController from './components/MusicController';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isLocked, setIsLocked] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);

  // Prevent scroll before opening
  useEffect(() => {
    if (isLocked || !hasOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLocked, hasOpened]);

  return (
    <main className="min-h-screen text-primary selection:bg-accent-pink selection:text-white relative">
      {/* Global Background is now handled by CSS in index.css on the body */}
      <div className="shooting-star-container">
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      </div>

      <MusicController play={hasOpened} />
      <ThemeToggle />

      <AnimatePresence mode="wait">
        {isLocked ? (
          <motion.div
            key="lock"
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100]"
          >
            <LockScreen onUnlock={() => setIsLocked(false)} />
          </motion.div>
        ) : !hasOpened ? (
          <motion.div 
            key="gate"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.5, 
              filter: "blur(40px)",
              transition: { duration: 2, ease: "easeInOut" }
            }}
            className="fixed inset-0 z-50"
          >
            <OpeningGate onOpen={() => setHasOpened(true)} />
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              filter: "blur(0px)",
              transition: { duration: 2, ease: "easeOut" }
            }}
            className="relative"
          >
            <CinematicText />
            <MemoryScroll />
            <InteractiveReveal />
            <PhotoBooth />
            <MemoryGalaxy />
            <LoveLetter />
            <FinalScene />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
