import { useState } from 'react'
import HeroSection from './components/HeroSection'
import FeaturedCars from './components/FeaturedCars'
import CarDetailPanel from './components/CarDetailPanel'
import GallerySection from './components/GallerySection'
import './index.css'

function App() {
  const [selectedCar, setSelectedCar] = useState(null)
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <FeaturedCars onSelect={setSelectedCar} />
      <GallerySection onSelect={setSelectedCar} />
      <footer className="border-t border-white/[0.05] py-8 text-center">
        <p className="text-gray-700 text-xs tracking-[0.4em] uppercase">Curated automotive showcase</p>
      </footer>
      <CarDetailPanel car={selectedCar} onClose={() => setSelectedCar(null)} />
    </div>
  )
}
export default App
