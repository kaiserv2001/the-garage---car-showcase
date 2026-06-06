import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CarCard({ car, index, isActive, onHover, onSelect, onHoverSound }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      transformTemplate={(_, generated) => `perspective(900px) ${generated}`}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: isActive ? 0 : -12,
        scale: isActive ? 1.06 : 0.97,
      }}
      transition={{
        opacity: { duration: 0.6, delay: index * 0.08 },
        y: { duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
        rotateY: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        scale: { duration: 0.4 },
      }}
      onHoverStart={() => { onHover(car.id); onHoverSound?.() }}
      onHoverEnd={() => onHover(null)}
      onClick={() => onSelect(car)}
      className="relative flex-shrink-0"
      style={{
        width: isActive ? '280px' : '200px',
        minWidth: isActive ? '280px' : '200px',
        height: '320px',
        cursor: 'pointer',
        transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), min-width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* ── Glow layer (blurred gradient behind the card) ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-18px',
          borderRadius: '24px',
          background: car.gradient,
          filter: 'blur(38px)',
          opacity: isActive ? 0.42 : 0.14,
          transition: 'opacity 0.5s ease',
        }}
      />

      {/* ── Foreground card with gradient border ── */}
      <div
        className="relative w-full h-full z-10 overflow-hidden"
        style={{
          borderRadius: '10px',
          border: '1.5px solid transparent',
          background: `linear-gradient(#0f0f0f, #0f0f0f) padding-box, ${car.gradient} border-box`,
          boxShadow: isActive
            ? `0 8px 40px ${car.color}35, 0 0 0 1px ${car.color}20`
            : '0 4px 20px rgba(0,0,0,0.6)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Skeleton */}
        {!loaded && <div className="absolute inset-0 bg-[#111] animate-pulse" />}

        {/* Car image */}
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="absolute inset-0 w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          onError={(e) => { e.currentTarget.style.opacity = '0.3'; setLoaded(true) }}
          style={{
            opacity: loaded ? 1 : 0,
            transform: isActive ? 'scale(1.07)' : 'scale(1)',
            transition: 'opacity 0.4s ease, transform 0.5s ease',
          }}
        />

        {/* Dark gradient overlay — preserves text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Subtle gradient tint at top from car color */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${car.color}18 0%, transparent 40%)`,
            opacity: isActive ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[10px] tracking-[0.3em] text-gray-400 uppercase mb-1">{car.brand}</p>
          <h3
            className="font-black tracking-tight leading-tight"
            style={{ fontSize: isActive ? '1.25rem' : '1.125rem', transition: 'font-size 0.3s ease' }}
          >
            {car.model}
          </h3>

          {/* Tagline — hover only */}
          <p
            className="text-[11px] text-gray-400 mt-1 leading-relaxed overflow-hidden"
            style={{
              opacity: isActive ? 1 : 0,
              maxHeight: isActive ? '40px' : '0',
              transform: isActive ? 'translateY(0)' : 'translateY(6px)',
              transition: 'all 0.3s ease 0.05s',
            }}
          >
            {car.tagline}
          </p>

          {/* Spec chips — hover only */}
          <div
            className="flex gap-1 mt-2 flex-wrap"
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'translateY(0)' : 'translateY(8px)',
              transition: 'all 0.3s ease 0.1s',
            }}
          >
            {[car.horsepower, car.topSpeed, car.zeroToSixty].map((val) => (
              <span
                key={val}
                className="text-[9px] font-semibold px-2 py-[3px] tracking-wider"
                style={{
                  background: `${car.color}18`,
                  color: car.color,
                  border: `1px solid ${car.color}50`,
                }}
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
