import { motion } from 'framer-motion';

export default function FinalScene() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-transparent px-4 relative overflow-hidden z-50 sticky top-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-center z-10"
      >
        <p className="font-sacramento text-4xl md:text-5xl text-gold/80 mb-6 italic">
          so...
        </p>
        <h1 className="font-vibes text-6xl md:text-8xl text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.5)] px-4 leading-tight mb-4">
          will you continue this story with me?
        </h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          className="mt-16 font-sans font-light tracking-[0.3em] text-white/80 uppercase text-sm md:text-lg"
        >
          Happy 3rd Anniversary <span className="text-gold">✨</span>
        </motion.p>
      </motion.div>

      {/* Watermark */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 1.5, delay: 3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="font-dancing text-lg md:text-xl text-white tracking-widest">
          Made with Love Jawad❤️
        </p>
      </motion.div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50 + "%", 
              y: "110%", 
              opacity: Math.random() 
            }}
            animate={{ 
              y: "-10%",
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 10 
            }}
            className="absolute w-1 h-1 bg-gold rounded-full blur-[1px]"
          />
        ))}
      </div>
    </div>
  );
}
