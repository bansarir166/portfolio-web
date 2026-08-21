import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useMouseParallax(strength = 12) {
  const reduced = usePrefersReducedMotion()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reduced) return

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength
      const y = (e.clientY / window.innerHeight - 0.5) * strength
      setOffset({ x, y })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, strength])

  return offset
}
