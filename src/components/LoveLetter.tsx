import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

const PARAGRAPHS = [
  "My dearest,",
  "It feels like just yesterday when we started this journey, yet I can't imagine a life before you. You have brought so much light, warmth, and peace into my world.",
  "Every small moment—our quiet mornings, our late-night talks, the way you laugh at my silly jokes—has become my favorite memory.",
  "Thank you for being my anchor, my best friend, and my home.",
  "I love you, more than words could ever say."
];

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="min-h-screen w-full flex items-center justify-center py-32 px-6 z-40 relative bg-transparent overflow-hidden">
      <div className="section-fade-top" />
      
      {/* Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ 
              opacity: [0, 0.4, 0], 
              scale: [0.5, 1, 0.5],
              y: -500,
              x: Math.sin(i) * 200
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: i * 0.5 
            }}
            className="absolute bottom-0 left-1/2 w-2 h-2 bg-pink-400/30 rounded-full blur-xl"
          />
        ))}
      </div>

      <div className="relative w-full max-w-lg flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2, y: -100, filter: 'blur(20px)' }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer group relative"
            >
              {/* Glow Aura */}
              <div className="absolute inset-0 bg-gold/20 blur-[60px] group-hover:bg-gold/40 transition-all duration-700" />
              
              {/* Envelope Body */}
              <div className="relative w-[300px] md:w-[400px] aspect-[1.4/1] bg-[#FDFBF7] rounded-lg shadow-2xl overflow-hidden border border-stone-200">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20" />
                
                {/* Flap */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-[#F8F5F0] border-b border-stone-100 shadow-sm origin-top transform skew-y-12 translate-y-[-20%]" />
                <div className="absolute top-0 inset-x-0 h-1/2 bg-[#F8F5F0] border-b border-stone-100 shadow-sm origin-top transform -skew-y-12 translate-y-[-20%]" />
                
                {/* Wax Seal */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-16 h-16 bg-[#8b0000] rounded-full shadow-lg border-4 border-[#a52a2a] flex items-center justify-center"
                  >
                    <Heart className="w-8 h-8 text-white fill-white/20" />
                  </motion.div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <p className="font-handwritten text-stone-400 text-sm tracking-widest uppercase">Click to open</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 60 }}
              className="relative w-full max-w-2xl px-4 py-12 flex flex-col items-center"
            >
              {/* Content - Pure Floating Text */}
              <div className="relative z-10 space-y-12">
                {PARAGRAPHS.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, delay: 0.5 + idx * 0.4 }}
                    className="font-dancing text-3xl md:text-4xl text-white leading-relaxed text-center drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  >
                    {p}
                  </motion.p>
                ))}
                
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 2, delay: 3 }}
                  className="h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-40 mt-16"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 4 }}
                  className="flex justify-center gap-3 text-gold italic font-sacramento text-4xl drop-shadow-lg"
                >
                  <span>Yours forever, Jawad</span>
                  <Heart className="w-8 h-8 fill-gold" />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
