import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const STRIPS = [
  {
    id: 1,
    title: "Let's Party Together!!!",
    color: "bg-emerald-500",
    photos: [
      "/assets/photos/photo1.jpg",
      "/assets/photos/3B74FBA0-5EBE-41DB-8BC9-79C5525985B2.jpg",
      "/assets/photos/0031C2F5-D0D2-43B3-A185-1100FB9DA0D9.jpg",
      "/assets/photos/6bea67cb-cd32-41aa-bbdc-13db666bda52.jpg"
    ],
    stickers: [
      { text: "Snapshot!", top: "5%", left: "5%", color: "bg-yellow-400" },
      { text: "Great Vibes", top: "35%", right: "5%", color: "bg-emerald-400" },
      { emoji: "👀", top: "45%", left: "-10%", size: "text-3xl" },
      { text: "Celebrate", bottom: "25%", right: "5%", color: "bg-yellow-400" }
    ]
  },
  {
    id: 2,
    title: "Memories Forever",
    color: "bg-blue-500",
    photos: [
      "/assets/photos/1AB04405-F2F1-44C2-9D8F-FA0C81BA22FE.jpg",
      "/assets/photos/4CB65A0B-8F4C-4844-9999-4D3017130574.jpg",
      "/assets/photos/60DDAA87-7E98-4AE3-8331-F3EB9902A524.jpg",
      "/assets/photos/65b56b13-fd01-4cb6-9524-9cbe8618316a.jpg"
    ],
    stickers: [
      { text: "Good Times", top: "2%", right: "5%", color: "bg-blue-400" },
      { text: "Smile More", top: "30%", left: "5%", color: "bg-rose-400" },
      { emoji: "😊", top: "40%", left: "-5%", size: "text-4xl" },
      { emoji: "❤️", bottom: "20%", right: "-5%", size: "text-3xl" }
    ]
  },
  {
    id: 3,
    title: "Good Vibes Only",
    color: "bg-amber-500",
    photos: [
      "/assets/photos/87439B21-B8B1-4DAF-86D7-6AAD4D875A49.JPG",
      "/assets/photos/9b319c4f-4921-4b54-82ad-fdee1f01c205.jpg",
      "/assets/photos/IMG_0993.JPG",
      "/assets/photos/IMG_20230423_141444.jpg"
    ],
    stickers: [
      { text: "Cheese!", top: "2%", left: "10%", color: "bg-rose-400" },
      { text: "Happy Day!", top: "38%", left: "5%", color: "bg-sky-400" },
      { emoji: "⚡", top: "42%", right: "-10%", size: "text-3xl" },
      { text: "Fun Times", bottom: "30%", left: "5%", color: "bg-orange-400" }
    ]
  }
];

export default function PhotoBooth() {
  return (
    <section className="min-h-screen w-full relative py-32 flex flex-col items-center overflow-hidden bg-transparent">
      <div className="section-fade-bottom" />
      {/* Photobox Header/Machine - Refined for 3D look */}
      <div className="relative z-50 mb-12 flex flex-col items-center">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className="relative bg-gradient-to-b from-[#2e1065] via-[#1e1b4b] to-[#0f172a] p-6 md:p-10 rounded-t-[40px] md:rounded-t-[50px] shadow-[0_-15px_60px_rgba(139,92,246,0.3),inset_0_4px_10px_rgba(255,255,255,0.1)] w-[95vw] max-w-3xl flex flex-col items-center border-t border-x border-white/10"
        >
          {/* Machine Details */}
          <div className="absolute top-4 left-8 md:top-6 md:left-12 w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/50 blur-[2px] animate-pulse" />
          <div className="absolute top-4 right-8 md:top-6 md:right-12 w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/50 blur-[2px] animate-pulse" />
          
          <div className="flex flex-col items-center gap-1 md:gap-2">
            <motion.h2 
              animate={{ 
                textShadow: ["0 0 10px #a855f7", "0 0 30px #a855f7", "0 0 10px #a855f7"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-sans font-black italic text-4xl md:text-7xl text-white tracking-tighter uppercase"
            >
              COSMIC
            </motion.h2>
            <span className="font-sans font-light text-sm md:text-2xl text-blue-300 tracking-[0.4em] md:tracking-[0.6em] uppercase -mt-1 md:-mt-2">
              Photobox
            </span>
          </div>

          {/* Scanner Light Effect */}
          <motion.div 
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 left-0 w-1/3 h-[2px] bg-cyan-400 blur-sm opacity-50"
          />
        </motion.div>
        
        {/* Machine Slot/Mouth */}
        <div className="relative h-8 md:h-12 w-[95vw] max-w-3xl bg-[#020617] rounded-b-2xl md:rounded-b-3xl border-b-4 md:border-b-8 border-[#1e1b4b] shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80" />
          {/* Inner slot shadow */}
          <div className="absolute top-0 inset-x-0 h-4 bg-black/60 blur-md" />
        </div>
      </div>

      {/* Photo Strips Container */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 px-4 relative z-40 -mt-4 md:-mt-6">
        {STRIPS.map((strip, idx) => (
          <motion.div
            key={strip.id}
            drag
            dragConstraints={{ top: -150, bottom: 200, left: -100, right: 100 }}
            initial={{ y: -800, opacity: 0, rotate: (idx - 1) * 3 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              damping: 15, 
              stiffness: 80, 
              delay: idx * 0.5 
            }}
            whileHover={{ scale: 1.02, rotate: 0, zIndex: 100 }}
            className="bg-[#fdfdfd] p-2 md:p-3 pb-0 shadow-[0_30px_70px_rgba(0,0,0,0.6)] w-[85vw] max-w-[320px] md:w-80 cursor-grab active:cursor-grabbing relative border-x border-gray-100"
          >
            {/* Top punch hole */}
            <div className="w-full flex justify-center py-2">
              <div className="w-3 h-3 rounded-full bg-gray-200 shadow-inner" />
            </div>

            {/* Photos with classic photobooth styling */}
            <div className="flex flex-col gap-3">
              {strip.photos.map((photo, pIdx) => (
                <div key={pIdx} className="w-full aspect-[4/3] bg-stone-100 overflow-hidden relative group/photo">
                  <img src={photo} alt="Memory" className="w-full h-full object-cover grayscale-[10%] contrast-[1.1]" />
                  {/* Glossy overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-40 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Bottom Signature Section */}
            <div className="py-8 px-4 flex flex-col items-center gap-6">
              <div className={`${strip.color} px-6 py-2 rounded-full shadow-lg transform -rotate-1 ring-4 ring-white/20`}>
                <span className="font-handwritten text-white text-xl md:text-2xl whitespace-nowrap drop-shadow-md">
                  {strip.title}
                </span>
              </div>
              
              {/* Distinctive Checkered Tail */}
              <div className="w-full h-12 opacity-90 border-t-2 border-gray-100" style={{
                backgroundImage: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)',
                backgroundSize: '24px 24px'
              }} />
            </div>

            {/* Stickers Overlay */}
            {strip.stickers.map((sticker, sIdx) => (
              <motion.div
                key={sIdx}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 1.5 + sIdx * 0.1 }}
                className="absolute z-10 pointer-events-none"
                style={{ 
                  top: sticker.top, 
                  bottom: sticker.bottom, 
                  left: sticker.left, 
                  right: sticker.right 
                }}
              >
                {sticker.text ? (
                  <div className={`${sticker.color} px-3 py-1 rounded-lg shadow-md transform -rotate-12 border border-black/10`}>
                    <span className="font-handwritten text-xs font-bold text-black whitespace-nowrap">
                      {sticker.text}
                    </span>
                  </div>
                ) : (
                  <span className={sticker.size}>{sticker.emoji}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-20 text-center space-y-4"
      >
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-gold">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/60">
            Printing memories from the universe...
          </span>
        </div>
      </motion.div>
    </section>
  );
}
