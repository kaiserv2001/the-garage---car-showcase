import { useRef, useCallback } from 'react'

export function useSound(src, volume = 0.4) {
  const poolRef = useRef([])
  const INDEX = 3 // pool size to allow rapid repeats

  const play = useCallback(() => {
    if (poolRef.current.length < INDEX) {
      const a = new Audio(src)
      a.volume = volume
      poolRef.current.push(a)
    }
    const audio = poolRef.current.find(a => a.paused || a.ended)
    if (audio) {
      audio.currentTime = 0
      audio.play().catch(() => {})
    } else {
      const a = new Audio(src)
      a.volume = volume
      a.play().catch(() => {})
    }
  }, [src, volume])

  return play
}
