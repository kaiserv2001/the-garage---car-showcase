import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap, Gauge, Timer, Weight, Cpu, Workflow, Globe, Calendar } from 'lucide-react'

export default function CarDetailPanel({ car, onClose, onHover }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => { setLoaded(false) }, [car])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while panel is open
  useEffect(() => {
    if (car) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [car])

  const mainSpecs = [
    { Icon: Zap,    label: 'Horsepower', value: car?.horsepower },
    { Icon: Gauge,  label: 'Top Speed',  value: car?.topSpeed },
    { Icon: Timer,  label: '0–60 MPH',   value: car?.zeroToSixty },
    { Icon: Weight, label: 'Weight',     value: car?.weight },
  ]

  const detailSpecs = [
    { Icon: Cpu,      label: 'Engine',       value: car?.engine },
    { Icon: Workflow, label: 'Torque',        value: car?.torque },
    { Icon: Zap,      label: 'Drivetrain',    value: car?.drivetrain },
    { Icon: Globe,    label: 'Origin',        value: car?.country },
    { Icon: Calendar, label: 'Production',    value: car?.productionYears },
  ]

  return (
    <AnimatePresence>
      {car && (
        <motion.div
          className="fixed inset-0 z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* ── MOBILE layout: stacked ── */}
          <motion.div
            className="flex flex-col md:hidden w-full h-full bg-[#0d0d0d] overflow-hidden"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 280 }}
          >
            {/* Mobile image */}
            <div className="relative flex-shrink-0" style={{ height: '42vh' }}>
              <MobileImage car={car} loaded={loaded} setLoaded={setLoaded} onClose={onClose} onHover={onHover} />
            </div>
            {/* Mobile content */}
            <div className="flex-1 overflow-y-auto">
              <PanelContent car={car} mainSpecs={mainSpecs} detailSpecs={detailSpecs} onClose={onClose} onHover={onHover} />
            </div>
          </motion.div>

          {/* ── DESKTOP layout: split ── */}
          <motion.div
            className="hidden md:flex w-full h-full bg-[#0d0d0d]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Left — hero image */}
            <div className="relative w-[48%] flex-shrink-0 overflow-hidden">
{!loaded && <div className="absolute inset-0 bg-[#111] animate-pulse z-10" />}
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover"
                onLoad={() => setLoaded(true)}
                onError={(e) => { e.currentTarget.style.opacity = '0.3'; setLoaded(true) }}
                style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
              />
              {/* Bottom fade into panel bg */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0d0d0d]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />

              {/* Car name watermark on image */}
              <div className="absolute bottom-10 left-8 right-8">
                <p className="text-xs tracking-[0.4em] uppercase font-semibold mb-1"
                  style={{ color: car.color }}>
                  {car.brand}
                </p>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-none text-white drop-shadow-2xl">
                  {car.model}
                </h2>
              </div>

              {/* Accent top line */}
              <div className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${car.color}, transparent)` }} />
            </div>

            {/* Right — scrollable content */}
            <div className="flex-1 overflow-y-auto relative">
              <PanelContent car={car} mainSpecs={mainSpecs} detailSpecs={detailSpecs} onClose={onClose} onHover={onHover} desktop />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Shared mobile image block ── */
function MobileImage({ car, loaded, setLoaded, onClose, onHover }) {
  return (
    <>
{!loaded && <div className="absolute inset-0 bg-[#111] animate-pulse" />}
      <img
        src={car.image}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-full object-cover"
        onLoad={() => setLoaded(true)}
        onError={(e) => { e.currentTarget.style.opacity = '0.3'; setLoaded(true) }}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: `linear-gradient(to right, transparent, ${car.color}, transparent)` }} />
      <button onClick={onClose} onMouseEnter={onHover}
        className="absolute top-4 right-4 p-2 rounded-full transition-colors duration-200 hover:bg-black/90 z-10"
        style={{ background: 'rgba(0,0,0,0.6)' }}>
        <X className="w-5 h-5 text-white" />
      </button>
    </>
  )
}

/* ── Shared content block (mobile + desktop right column) ── */
function PanelContent({ car, mainSpecs, detailSpecs, onClose, onHover, desktop }) {
  return (
    <motion.div
      className="px-6 md:px-10 lg:px-14 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.45 }}
    >
      {/* Desktop close button */}
      {desktop && (
        <div className="flex justify-end mb-6">
          <button onClick={onClose} onMouseEnter={onHover}
            className="p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      )}

      {/* Mobile: brand + model header */}
      <div className="md:hidden mb-6">
        <p className="text-xs tracking-[0.4em] uppercase font-semibold mb-1" style={{ color: car.color }}>
          {car.brand}
        </p>
        <h2 className="text-4xl font-black tracking-tight">{car.model}</h2>
      </div>

      {/* Tagline */}
      <p className="text-gray-500 text-sm italic mb-8">{car.tagline}</p>

      {/* ── 4 main stat cards ── */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {mainSpecs.map(({ Icon, label, value }) => (
          <div key={label}
            className="rounded-lg p-4"
            style={{ background: `${car.color}0d`, border: `1px solid ${car.color}25` }}>
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-3.5 h-3.5" style={{ color: car.color }} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500">{label}</p>
            </div>
            <p className="text-2xl font-black" style={{ color: car.color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Detail specs list ── */}
      <div className="mb-8 rounded-lg overflow-hidden"
        style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        {detailSpecs.map(({ Icon, label, value }, i) => (
          <div key={label}
            className="flex items-center gap-4 px-4 py-3"
            style={{ borderBottom: i < detailSpecs.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
            <Icon className="w-4 h-4 flex-shrink-0 text-gray-600" />
            <p className="text-xs uppercase tracking-widest text-gray-600 w-24 flex-shrink-0">{label}</p>
            <p className="text-sm text-gray-200 font-medium">{value}</p>
          </div>
        ))}
      </div>

      {/* ── Description ── */}
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-600 mb-3">About</p>
        <p className="text-gray-300 leading-[1.8] text-[14px]">{car.description}</p>
      </div>

      {/* ── CTAs ── */}
      <div className="flex gap-3 flex-wrap">
        <button
          onMouseEnter={onHover}
          className="px-7 py-3 font-semibold tracking-wider uppercase text-xs transition-opacity hover:opacity-80"
          style={{ background: car.color, color: '#000' }}>
          Configure
        </button>
        <button
          onMouseEnter={onHover}
          className="px-7 py-3 text-gray-400 font-semibold tracking-wider uppercase text-xs hover:text-white transition-colors duration-300"
          style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
          Learn More
        </button>
      </div>

      {/* Origin badge */}
      <p className="mt-10 text-[10px] tracking-[0.3em] text-gray-700 uppercase">
        {car.country} · {car.productionYears}
      </p>
    </motion.div>
  )
}
