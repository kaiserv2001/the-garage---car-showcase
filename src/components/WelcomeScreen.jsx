import { motion } from 'framer-motion'

export default function WelcomeScreen({ onEnter, onHover }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: '#000' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-xs tracking-[0.5em] text-gray-600 uppercase mb-4">Welcome to</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-3">
          THE GARAGE
        </h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-16">
          A cinematic automotive showcase
        </p>

        <motion.button
          onClick={onEnter}
          onMouseEnter={onHover}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="px-12 py-4 text-xs font-bold tracking-[0.4em] uppercase text-black transition-opacity hover:opacity-90"
          style={{ background: '#fff' }}
        >
          Enter
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
