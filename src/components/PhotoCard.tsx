import { motion } from 'framer-motion';

export default function PhotoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      className="photocard-wrapper w-full"
    >
      <div className="stack">
        <div className="card-single">
          <div className="photo-frame">
            <img src="/assets/photos/1AB04405-F2F1-44C2-9D8F-FA0C81BA22FE.jpg" alt="Our Memory" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="anniversary-text-container"
      >
        <motion.h2
          animate={{
            textShadow: [
              "0 0 10px rgba(212, 175, 55, 0.3)",
              "0 0 30px rgba(212, 175, 55, 0.8)",
              "0 0 10px rgba(212, 175, 55, 0.3)"
            ],
            color: ["#D4AF37", "#efd079ff", "#D4AF37"]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="font-sacramento text-4xl md:text-6xl lg:text-7xl text-center md:text-left drop-shadow-sm"
        >
          Happy Anniversary 3rd❤️
        </motion.h2>
      </motion.div>
    </motion.div>
  );
}
