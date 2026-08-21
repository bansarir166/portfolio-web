/** Soft ambient follow — kept intentionally subtle (no neon glow). */
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function CursorGlow() {
  const reduced = usePrefersReducedMotion()
  const [pos, setPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  if (reduced) return null

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden md:block"
    >
      <div
        className="absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl transition-transform duration-300 ease-out"
        style={{ left: pos.x, top: pos.y }}
      />
    </div>
  )
}
