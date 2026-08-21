import { useRef, type ReactNode, type MouseEvent, type RefObject } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  type = 'button',
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 18 })
  const springY = useSpring(y, { stiffness: 220, damping: 18 })

  const handleMove = (e: MouseEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.22)
    y.set(dy * 0.22)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  if (href) {
    return (
      <motion.a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={`inline-flex items-center justify-center gap-2 ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ x: springX, y: springY }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.button>
  )
}
