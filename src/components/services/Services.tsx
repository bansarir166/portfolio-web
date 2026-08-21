import { motion } from 'framer-motion'
import { FiCompass, FiLayers, FiLayout, FiServer } from 'react-icons/fi'
import { services, servicesMeta } from '@/data/portfolio'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import type { IconType } from 'react-icons'

const serviceMeta: Record<
  (typeof services)[number]['tone'],
  { Icon: IconType; ring: string }
> = {
  blue: {
    Icon: FiLayers,
    ring: 'bg-blue-50 text-blue-600',
  },
  green: {
    Icon: FiServer,
    ring: 'bg-emerald-50 text-emerald-600',
  },
  purple: {
    Icon: FiLayout,
    ring: 'bg-violet-50 text-violet-600',
  },
  orange: {
    Icon: FiCompass,
    ring: 'bg-orange-50 text-orange-600',
  },
}

export function Services() {
  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden bg-[#eef2f6] py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 20%, rgba(37,99,235,0.07), transparent 40%), radial-gradient(circle at 88% 78%, rgba(15,26,28,0.04), transparent 38%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          className="mb-12 max-w-2xl"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            variants={fadeUp()}
            className="text-sm font-medium tracking-[0.18em] text-accent uppercase"
          >
            {servicesMeta.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp()}
            className="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl md:text-5xl"
          >
            {servicesMeta.title}
          </motion.h2>
          <motion.span
            variants={fadeUp()}
            className="mt-4 block h-[3px] w-14 rounded-full bg-accent"
          />
          <motion.p
            variants={fadeUp()}
            className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
          >
            {servicesMeta.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-4 sm:grid-cols-2"
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {services.map((service) => {
            const { Icon, ring } = serviceMeta[service.tone]
            return (
              <motion.article
                key={service.title}
                variants={fadeUp()}
                className="rounded-2xl border border-white/80 bg-white/95 p-7 shadow-[0_14px_40px_-28px_rgba(15,26,28,0.3)] transition-shadow hover:shadow-[0_22px_50px_-24px_rgba(15,26,28,0.4)] md:p-8"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${ring}`}
                >
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {service.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
