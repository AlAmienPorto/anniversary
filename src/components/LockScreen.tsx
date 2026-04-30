import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, ShieldAlert } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));

  const CORRECT_CODE = '290423';

  // Auto-focus first input on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      inputs.current[0]?.focus();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue && value !== '') return;

    const newCode = [...code];
    // Take only the last character entered
    newCode[index] = cleanValue.slice(-1);
    setCode(newCode);

    // Move to next input if value is entered
    if (newCode[index] !== '' && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    const fullCode = newCode.join('');
    if (fullCode.length === 6) {
      if (fullCode === CORRECT_CODE) {
        setUnlocked(true);
        console.log("Access Granted");
        setTimeout(onUnlock, 1200);
      } else {
        setError(true);
        console.log("Access Denied");
        // Shake and reset after delay
        setTimeout(() => {
          setError(false);
          setCode(['', '', '', '', '', '']);
          inputs.current[0]?.focus();
        }, 1000);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        inputs.current[index - 1]?.focus();
      } else {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020617] overflow-hidden">
      {/* Cinematic Star Field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020617]" />
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            style={{
              width: Math.random() * 2 + 'px',
              height: Math.random() * 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 flex flex-col items-center gap-10 px-6 w-full max-w-lg"
      >
        <div className="text-center space-y-4">
          <motion.div
            animate={error ? { x: [-10, 10, -10, 10, 0], color: ['#D4AF37', '#ef4444', '#D4AF37'] } : {}}
            transition={{ duration: 0.4 }}
          >
            <h1 className="font-sacramento text-6xl md:text-8xl text-gold drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              A Sacred Date
            </h1>
          </motion.div>
          <p className="font-sans text-white/30 text-[10px] tracking-[0.5em] uppercase">
            Unlock our cinematic universe
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex items-center justify-center gap-2 md:gap-4 w-full">
            {/* Left 3 Digits */}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={code[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={unlocked}
                  autoComplete="off"
                  className={`w-11 h-16 md:w-16 md:h-24 text-3xl md:text-5xl text-center bg-white/5 border-2 rounded-2xl focus:outline-none transition-all duration-300 font-sans ${
                    error ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 
                    unlocked ? 'border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 
                    'border-gold/20 focus:border-gold text-white focus:bg-white/10'
                  } backdrop-blur-xl shadow-2xl`}
                />
              ))}
            </div>

            {/* Lock Centerpiece */}
            <motion.div
              animate={unlocked ? { scale: [1, 1.3, 1], rotate: [0, -15, 15, 0] } : {}}
              className={`p-3 md:p-5 rounded-full border-2 transition-all duration-500 ${
                unlocked ? 'bg-green-500/20 border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.4)]' : 
                error ? 'bg-red-500/20 border-red-500/50' :
                'bg-gold/10 border-gold/30 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
              }`}
            >
              {unlocked ? (
                <Unlock className="w-5 h-5 md:w-8 md:h-8 text-green-400" />
              ) : error ? (
                <ShieldAlert className="w-5 h-5 md:w-8 md:h-8 text-red-400" />
              ) : (
                <Lock className="w-5 h-5 md:w-8 md:h-8 text-gold animate-pulse" />
              )}
            </motion.div>

            {/* Right 3 Digits */}
            <div className="flex gap-2">
              {[3, 4, 5].map((i) => (
                <input
                  key={i}
                  ref={(el) => { inputs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={code[i]}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={unlocked}
                  autoComplete="off"
                  className={`w-11 h-16 md:w-16 md:h-24 text-3xl md:text-5xl text-center bg-white/5 border-2 rounded-2xl focus:outline-none transition-all duration-300 font-sans ${
                    error ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 
                    unlocked ? 'border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 
                    'border-gold/20 focus:border-gold text-white focus:bg-white/10'
                  } backdrop-blur-xl shadow-2xl`}
                />
              ))}
            </div>
          </div>
          
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-red-400 font-dancing text-2xl drop-shadow-lg"
              >
                That doesn't feel right...
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mt-12 text-white/20 font-sans text-[10px] tracking-[0.8em] uppercase"
        >
          DD MM YY
        </motion.div>
      </motion.div>
    </div>
  );
}
