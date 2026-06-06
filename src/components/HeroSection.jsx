import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

function HeroSection() {
  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-8 md:px-16 lg:px-24"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-4"
        >
          Luxury Garage
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none"
        >
          THE GARAGE
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-300 mt-4 mb-8 max-w-lg"
        >
          Explore performance machines in motion.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
          <button
            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border-2 border-white text-white font-semibold tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Explore Cars
          </button>
          <button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 text-gray-300 font-semibold tracking-wider uppercase hover:text-white transition-colors duration-300"
          >
            View Collection →
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </motion.div>
    </section>
  )
}

export default HeroSection
