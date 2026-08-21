import { motion } from 'framer-motion'
import { testimonials } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'

export function Testimonials() {
  return (
    <section id="testimonials" className="section-pad relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Kind words"
          title="Trusted by founders and product teams."
        />

        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((t) => (
            <motion.blockquote
              key={t.name}
              variants={fadeUp()}
              className="flex h-full flex-col border-t-2 border-accent bg-surface/70 p-6 md:p-7 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(37,99,235,0.35)]"
            >
              <p className="flex-1 text-base leading-relaxed text-ink-soft">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <cite className="not-italic">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {t.title}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
