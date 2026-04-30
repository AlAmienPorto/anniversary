import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface OpeningGateProps {
  onOpen: () => void;
}

const HEARTS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: Math.random() * 8,
  duration: 5 + Math.random() * 7,
  size: 12 + Math.random() * 24,
  opacity: 0.2 + Math.random() * 0.5,
}));

export default function OpeningGate({ onOpen }: OpeningGateProps) {
  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      {/* Heart Rain Effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {HEARTS.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: -50, x: 0, opacity: 0 }}
            animate={{
              y: '110vh',
              x: [0, 20, -20, 0],
              opacity: [0, heart.opacity, heart.opacity, 0]
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear"
            }}
            className="absolute text-accent-pink"
            style={{ left: heart.left }}
          >
            <Heart
              size={heart.size}
              fill="currentColor"
              className="drop-shadow-[0_0_8px_rgba(224,92,74,0.5)]"
            />
          </motion.div>
        ))}
      </div>

      {/* Subtle Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.08, 0.03]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-primary rounded-full blur-[120px] top-1/4 -left-20 z-0"
      />

      <motion.button
        initial={{ scale: 0.5, opacity: 0, y: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -10, 0],
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        className="relative z-10 flex flex-col items-center justify-center gap-6 cursor-pointer bg-transparent border-none outline-none group"
      >
        <motion.span
          className="font-handwritten text-5xl md:text-7xl lg:text-8xl tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-[length:200%_auto] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-700 group-hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]"
          animate={{
            backgroundPosition: ["0% center", "200% center"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          Open your gift
        </motion.span>

        <div className="flex items-center gap-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-3xl"
          >
            ✨
          </motion.span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </div>

        {/* Pulsing glow behind the text */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#D4AF37] blur-[100px] rounded-full -z-10 pointer-events-none"
        />
      </motion.button>
    </div>
  );
}
