import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const COSMIC_GLOWS = [
  { id: 1, color: 'rgba(212, 175, 55, 0.15)', initialX: 0, initialY: 200, targetX: -400, targetY: -300, size: 'w-96 h-96' },
  { id: 2, color: 'rgba(30, 27, 75, 0.3)', initialX: 0, initialY: 300, targetX: 400, targetY: -200, size: 'w-[500px] h-[500px]' },
  { id: 3, color: 'rgba(212, 175, 55, 0.1)', initialX: 0, initialY: 400, targetX: -500, targetY: 100, size: 'w-[600px] h-[600px]' },
  { id: 4, color: 'rgba(56, 189, 248, 0.15)', initialX: 0, initialY: 200, targetX: 500, targetY: 200, size: 'w-80 h-80' },
];

export default function MemoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowProgress = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  const bookOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const bookScale = useTransform(scrollYProgress, [0.1, 0.3], [0.9, 1]);

  return (
    <div ref={containerRef} className="h-[150vh] w-full relative z-20">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-transparent">

        {/* Title */}
        <motion.div
          className="absolute top-[8%] text-center z-30"
          style={{ opacity: bookOpacity }}
        >
          <h2 className="font-sacramento text-6xl md:text-8xl text-gold mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">Prolog</h2>
        </motion.div>

        {/* Scattered Cosmic Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {COSMIC_GLOWS.map((glow) => {
            const x = useTransform(glowProgress, [0, 1], [glow.initialX, glow.targetX]);
            const y = useTransform(glowProgress, [0, 1], [glow.initialY, glow.targetY]);
            const scale = useTransform(glowProgress, [0, 0.5, 1], [0.8, 1.2, 1]);
            const opacity = useTransform(glowProgress, [0, 0.2, 1], [0, 1, 0.4]);

            return (
              <motion.div
                key={glow.id}
                style={{
                  x,
                  y,
                  scale,
                  opacity,
                  background: `radial-gradient(circle, ${glow.color} 0%, transparent 70%)`
                }}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${glow.size} rounded-full blur-[80px] z-0`}
              />
            );
          })}
        </div>

        {/* Book Aura Glow (Pink & Cyan) */}
        <motion.div
          style={{ opacity: bookOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[80%] h-[70%] rounded-full blur-[120px]"
            style={{
              background: 'radial-gradient(circle, rgba(255, 0, 255, 0.2) 0%, rgba(0, 255, 255, 0.2) 50%, transparent 70%)'
            }}
          />
        </motion.div>

        {/* Realistic Book Scene (Static Open) */}
        <motion.div
          style={{ opacity: bookOpacity, scale: bookScale }}
          className="relative w-[92%] max-w-[1100px] aspect-[1/1.2] md:aspect-[1.6/1] mt-10 z-10 shadow-[0_0_80px_rgba(212,175,55,0.1)]"
        >
          <div
            className="absolute inset-0 shadow-[0_50px_100px_rgba(0,0,0,0.9)] rounded-[4px] overflow-hidden flex flex-col md:flex-row"
            style={{
              background: 'linear-gradient(135deg, #1a1512 0%, #2d241e 100%)',
              border: '6px md:border-[8px] solid #3d2f26',
              boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5), 0 20px 50px rgba(0,0,0,0.8)'
            }}
          >
            {/* Inner Page Texture - Parchment */}
            <div className="absolute inset-[3px] md:inset-[4px] flex flex-col md:flex-row">
              {/* Top/Left Page */}
              <div className="flex-1 bg-[#f4e4bc] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')` }} />
                <div className="absolute inset-0 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.1)] md:shadow-[inset_-20px_0_40px_rgba(0,0,0,0.1)]" />
              </div>
              {/* Bottom/Right Page */}
              <div className="flex-1 bg-[#fdf5e6] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/paper-fibers.png')` }} />
                <div className="absolute inset-0 shadow-[inset_0_20px_40px_rgba(0,0,0,0.05)] md:shadow-[inset_20px_0_40px_rgba(0,0,0,0.05)]" />
              </div>
            </div>
          </div>

          {/* Book Content (Pages) */}
          <div className="absolute inset-0 flex flex-col md:flex-row">
            {/* Left Page Content */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-12 relative">
              {/* Polaroid Photocard Stack */}
              <div className="relative w-[65%] md:w-[75%] max-w-[320px]">
                {/* Photo 3 (Back) */}
                <motion.div
                  initial={{ opacity: 0, rotate: -15, x: -20, y: 10 }}
                  whileInView={{ opacity: 0.6, rotate: -12, x: -15, y: 5 }}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="absolute inset-0 bg-[#fff] p-1 md:p-2 pb-6 md:pb-8 shadow-xl transform"
                >
                  <img
                    src="/assets/photos/60DDAA87-7E98-4AE3-8331-F3EB9902A524.jpg"
                    alt="Us 3"
                    className="w-full aspect-square object-cover sepia-[0.3]"
                  />
                </motion.div>

                {/* Photo 2 (Middle) */}
                <motion.div
                  initial={{ opacity: 0, rotate: 15, x: 20, y: -10 }}
                  whileInView={{ opacity: 0.8, rotate: 8, x: 15, y: -5 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="absolute inset-0 bg-[#fff] p-1 md:p-2 pb-6 md:pb-8 shadow-xl transform"
                >
                  <img
                    src="/assets/photos/3B74FBA0-5EBE-41DB-8BC9-79C5525985B2.jpg"
                    alt="Us 2"
                    className="w-full aspect-square object-cover sepia-[0.2]"
                  />
                </motion.div>

                {/* Photo 1 (Front) */}
                <motion.div
                  initial={{ opacity: 0, rotate: -10 }}
                  whileInView={{ opacity: 1, rotate: -3 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="relative bg-[#fff] p-1.5 md:p-3 pb-8 md:pb-14 shadow-2xl z-10 ring-1 ring-black/5"
                >
                  <div className="w-full aspect-square bg-stone-100 overflow-hidden relative">
                    <img
                      src="/assets/photos/photo1.jpg"
                      alt="Us 1"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 md:mt-4 text-center">
                    <span className="font-handwritten text-sm md:text-2xl text-stone-800 whitespace-nowrap">First memories</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Page Content */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-16 relative">
              <div className="w-full max-w-[400px] flex flex-col items-center">
                <p className="font-handwritten text-xl md:text-4xl lg:text-5xl text-[#2D241E]/90 leading-[1.3] md:leading-[1.6] text-center drop-shadow-sm">
                  Setelah sekian purnama dan malam yang telah kita lewati, ternyata kita sudah sejauh ini, dan doaku unutuk perayaan berikutnya kita akan menjadi pasangan suami istri.
                </p>
                <div className="mt-6 md:mt-10 relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: -12 }}
                    className="w-12 h-12 md:w-24 md:h-24 rounded-full bg-[#8b0000] shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-2 md:border-4 border-[#a52a2a] flex items-center justify-center overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
                    <span className="font-dancing text-white text-[8px] md:text-xl drop-shadow-lg relative z-10">forever</span>
                  </motion.div>
                  {/* Ribbon effect */}
                  <div className="absolute top-1/2 left-full w-12 md:w-20 h-2 md:h-4 bg-[#8b0000]/40 blur-sm -translate-y-1/2 -z-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Spine shadow (Vertical on mobile, Horizontal spine doesn't make sense, so we hide or adjust) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-8 md:w-16 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/40 to-transparent pointer-events-none hidden md:block"></div>
          <div className="absolute left-0 right-0 top-1/2 h-8 -translate-y-1/2 bg-gradient-to-b from-transparent via-black/20 to-transparent pointer-events-none block md:hidden"></div>
        </motion.div>

      </div>
    </div>
  );
}
