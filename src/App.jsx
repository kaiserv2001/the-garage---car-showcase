import { useState, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import HeroSection from './components/HeroSection'
import FeaturedCars from './components/FeaturedCars'
import CarDetailPanel from './components/CarDetailPanel'
import GallerySection from './components/GallerySection'
import WelcomeScreen from './components/WelcomeScreen'
import { useSound } from './hooks/useSound'
import './index.css'

function App() {
  const [selectedCar, setSelectedCar] = useState(null)
  const [welcomed, setWelcomed] = useState(false)
  const [muted, setMuted] = useState(false)
  const audioRef = useRef(null)

  const playHover = useSound('/audio/menu.mp3', 0.50)

  const handleEnter = useCallback(() => {
    setWelcomed(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.05
      audioRef.current.play().catch(() => {})
    }
  }, [])

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !muted
      setMuted(m => !m)
    }
  }, [muted])

  return (
    <div className="min-h-screen bg-black text-white">
      <audio ref={audioRef} src="/audio/bgmusic.mp3" loop />

      <AnimatePresence>
        {!welcomed && <WelcomeScreen key="welcome" onEnter={handleEnter} onHover={playHover} />}
      </AnimatePresence>


      {welcomed && (
        <button
          onClick={toggleMute}
          onMouseEnter={playHover}
          className="fixed top-5 right-5 z-50 p-2.5 rounded-full transition-colors duration-200 hover:bg-white/10"
          style={{ border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(0,0,0,0.5)' }}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted
            ? <VolumeX className="w-4 h-4 text-gray-400" />
            : <Volume2 className="w-4 h-4 text-gray-400" />
          }
        </button>
      )}

      <HeroSection onHover={playHover} />
      <FeaturedCars onSelect={setSelectedCar} onHover={playHover} />
      <GallerySection onSelect={setSelectedCar} onHover={playHover} />
      <footer className="border-t border-white/[0.05] py-8 text-center">
        <p className="text-gray-700 text-xs tracking-[0.4em] uppercase">Curated automotive showcase</p>
      </footer>
      <CarDetailPanel car={selectedCar} onClose={() => setSelectedCar(null)} onHover={playHover} />
    </div>
  )
}

export default App
