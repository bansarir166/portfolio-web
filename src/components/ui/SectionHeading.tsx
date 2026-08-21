import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/motion'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: Props) {
  return (
    <motion.div
      className={`mb-12 max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
      variants={fadeUp()}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </motion.div>
  )
}
