import { motion } from 'framer-motion'
import { useMouseParallax } from '@/hooks/useMouseParallax'

export function FloatingGeometry() {
  const offset = useMouseParallax(18)

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-[18%] right-[8%] h-40 w-40 rounded-[2rem] border border-white/25 bg-white/10 backdrop-blur-sm md:h-52 md:w-52"
        style={{ x: offset.x, y: offset.y }}
      />
      <motion.div
        className="absolute bottom-[22%] right-[22%] h-24 w-24 rotate-12 border border-teal-soft/40 bg-teal/20 md:h-32 md:w-32"
        style={{ x: offset.x * -0.6, y: offset.y * -0.6 }}
      />
      <motion.div
        className="absolute top-[38%] right-[38%] h-3 w-3 rounded-full bg-teal-soft"
        style={{ x: offset.x * 1.4, y: offset.y * 1.4 }}
      />
    </div>
  )
}
