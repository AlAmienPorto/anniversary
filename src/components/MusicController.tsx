import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Volume1 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicControllerProps {
  play: boolean;
}

export default function MusicController({ play }: MusicControllerProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (play && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else if (!play && audioRef.current) {
      audioRef.current.pause();
    }
  }, [play]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <VolumeX size={20} />;
    if (volume < 0.5) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/assets/audio/music.mp3" 
        loop 
      />

      <AnimatePresence>
        {play && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onMouseEnter={() => setShowVolume(true)}
            onMouseLeave={() => setShowVolume(false)}
            className="fixed top-6 right-6 z-[100] flex items-center gap-3 p-1 rounded-full group"
          >
            {/* Volume Slider - Slides out on hover */}
            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ opacity: 0, width: 0, x: 10 }}
                  animate={{ opacity: 1, width: 100, x: 0 }}
                  exit={{ opacity: 0, width: 0, x: 10 }}
                  className="overflow-hidden glass rounded-full h-10 flex items-center px-4"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1.5 bg-primary/20 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Visualizer and Button Container */}
            <div className="flex items-center gap-3">
              {/* Playing Indicator */}
              {!isMuted && volume > 0 && (
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="hidden md:block"
                >
                  <div className="flex gap-1 h-3 items-end">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [4, 12, 6, 10, 4] }}
                        transition={{ 
                          duration: 1.5 / (volume + 0.5), // Faster animation for higher volume
                          repeat: Infinity, 
                          delay: i * 0.1 
                        }}
                        className="w-0.5 bg-primary/40 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <button 
                onClick={toggleMute}
                className="relative p-4 glass-gold rounded-full shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] transition-all duration-500 cursor-pointer overflow-hidden group border border-primary/30"
              >
                <div className="relative z-10 text-primary drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                  {getVolumeIcon()}
                </div>
                
                {!isMuted && volume > 0 && (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 opacity-10"
                  >
                    <Music className="w-full h-full p-1" />
                  </motion.div>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


