import { useState, useRef, useEffect, useCallback } from 'react'
import { cars } from '../data/cars'
import CarCard from './CarCard'

export default function FeaturedCars({ onSelect, onHover }) {
  const [activeId, setActiveId] = useState(null)
  const scrollRef = useRef(null)
  const speedRef = useRef(0)
  const rafRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const el = scrollRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const w = rect.width
    const zone = 160 // px from each edge that triggers scroll

    if (x < zone) {
      speedRef.current = -((zone - x) / zone) * 12
    } else if (x > w - zone) {
      speedRef.current = ((zone - (w - x)) / zone) * 12
    } else {
      speedRef.current = 0
    }
  }, [])

  const stopScroll = useCallback(() => {
    speedRef.current = 0
  }, [])

  useEffect(() => {
    const tick = () => {
      if (scrollRef.current && speedRef.current !== 0) {
        scrollRef.current.scrollLeft += speedRef.current
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <section id="featured" className="py-24">
      <div className="px-4 md:px-8 mb-12">
        <p className="text-xs tracking-[0.4em] text-gray-500 uppercase mb-2">Our Collection</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">FEATURED MACHINES</h2>
      </div>

      <div className="relative">
        {/* Left edge fade + scroll hint */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-4 w-24 z-10"
          style={{ background: 'linear-gradient(to right, #000 10%, transparent)' }}
        />
        {/* Right edge fade + scroll hint */}
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-4 w-24 z-10"
          style={{ background: 'linear-gradient(to left, #000 10%, transparent)' }}
        />

        {/* Unified scrollable card strip */}
        <div
          ref={scrollRef}
          className="hide-scrollbar flex gap-4 lg:gap-5 overflow-x-auto px-4 md:px-8 pb-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={stopScroll}
        >
          {cars.map((car, index) => (
            <CarCard
              key={car.id}
              car={car}
              index={index}
              isActive={activeId === car.id}
              onHover={setActiveId}
              onSelect={onSelect}
              onHoverSound={onHover}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
