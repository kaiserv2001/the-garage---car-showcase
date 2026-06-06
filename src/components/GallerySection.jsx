import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { cars } from '../data/cars'

const FILTERS = ['All', 'Supercars', 'JDM', 'European', 'American', 'BMW', 'Porsche', 'Apollo', 'Pagani', 'Chevrolet']

function matchesFilter(car, filter) {
  if (filter === 'All') return true
  const categoryFilters = ['Supercars', 'JDM', 'European', 'American']
  if (categoryFilters.includes(filter)) return car.category === filter.toLowerCase()
  return car.brand === filter
}

function GalleryCard({ car, onSelect }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.28 }}
      onClick={() => onSelect(car)}
      className="relative overflow-hidden cursor-pointer group"
      style={{ aspectRatio: '16/10', border: '1px solid #1a1a1a' }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-[#111] animate-pulse" />
      )}
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        onLoad={() => setLoaded(true)}
        onError={(e) => { e.currentTarget.style.opacity = '0.3'; setLoaded(true) }}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease, transform 0.5s ease' }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent group-hover:from-black/90 transition-all duration-300" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-1">{car.brand}</p>
        <h3 className="text-xl font-black tracking-tight">{car.model}</h3>
        <p
          className="text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wider"
          style={{ color: car.color }}
        >
          {car.horsepower} · {car.topSpeed} · {car.zeroToSixty}
        </p>
      </div>

      {/* Accent corner brackets */}
      <div
        className="absolute top-3 left-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderTop: `2px solid ${car.color}`, borderLeft: `2px solid ${car.color}` }}
      />
      <div
        className="absolute top-3 right-3 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ borderTop: `2px solid ${car.color}`, borderRight: `2px solid ${car.color}` }}
      />
    </motion.div>
  )
}

export default function GallerySection({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState('All')

  const availableFilters = FILTERS.filter(f =>
    f === 'All' || cars.some(car => matchesFilter(car, f))
  )

  const filtered = cars.filter(car => matchesFilter(car, activeFilter))

  return (
    <section id="collection" className="py-24 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="mb-12">
        <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-2">Browse</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">THE COLLECTION</h2>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-10">
        {availableFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-200"
            style={{
              background: activeFilter === filter ? '#fff' : 'transparent',
              color: activeFilter === filter ? '#000' : '#666',
              border: activeFilter === filter ? '1px solid #fff' : '1px solid #2a2a2a',
            }}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <LayoutGroup>
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map(car => (
              <GalleryCard key={car.id} car={car} onSelect={onSelect} />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <p className="text-gray-700 text-xs mt-6 tracking-wider uppercase">
        Showing {filtered.length} of {cars.length} vehicles
      </p>
    </section>
  )
}
