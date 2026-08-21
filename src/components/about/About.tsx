import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiMapPin,
  FiUsers,
} from 'react-icons/fi'
import { about, profile } from '@/data/portfolio'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import type { IconType } from 'react-icons'

const ABOUT_IMAGE =
  'https://images.unsplash.com/photo-1522252234503-e356532cafd5?auto=format&fit=crop&w=1200&q=80'

const highlightMeta: Record<
  (typeof about.highlights)[number]['tone'],
  { Icon: IconType; ring: string }
> = {
  blue: {
    Icon: FiCalendar,
    ring: 'bg-blue-50 text-blue-600',
  },
  green: {
    Icon: FiBriefcase,
    ring: 'bg-emerald-50 text-emerald-600',
  },
  purple: {
    Icon: FiUsers,
    ring: 'bg-violet-50 text-violet-600',
  },
}

export function About() {
  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden bg-[#eef2f6] py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 20%, rgba(37,99,235,0.07), transparent 40%), radial-gradient(circle at 88% 70%, rgba(15,26,28,0.04), transparent 38%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Portrait */}
          <motion.div
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            variants={fadeUp()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/80 bg-white shadow-[0_18px_50px_-28px_rgba(15,26,28,0.35)]">
              <img
                src={ABOUT_IMAGE}
                alt={`${profile.name} at work`}
                className="aspect-[4/5] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#eef2f6]/70 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-5 left-5 right-5 sm:left-6 sm:right-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/95 px-3.5 py-2 text-sm text-ink-soft shadow-sm backdrop-blur-sm">
                <FiMapPin className="text-accent" size={14} aria-hidden />
                {profile.location}
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              variants={fadeUp()}
              className="text-sm font-medium tracking-[0.18em] text-accent uppercase"
            >
              About
            </motion.p>

            <motion.h2
              variants={fadeUp()}
              className="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl md:text-5xl"
            >
              {about.title}
            </motion.h2>
            <motion.span
              variants={fadeUp()}
              className="mt-4 block h-[3px] w-14 rounded-full bg-accent"
            />

            <motion.p
              variants={fadeUp()}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {about.intro}
            </motion.p>
            <motion.p
              variants={fadeUp()}
              className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            >
              {about.focus}
            </motion.p>

            <motion.div
              variants={fadeUp()}
              className="mt-7 flex max-w-xl flex-wrap gap-2.5"
            >
              {about.focusChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-line bg-white/90 px-3 py-1.5 text-sm text-ink-soft shadow-sm"
                >
                  {chip}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp()} className="mt-9">
              <MagneticButton
                href="#contact"
                className="rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink-soft"
              >
                Let&apos;s talk
                <FiArrowRight size={16} />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Highlight stats */}
        <motion.ul
          className="mt-14 grid gap-4 sm:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {about.highlights.map((item) => {
            const { Icon, ring } = highlightMeta[item.tone]
            return (
              <motion.li
                key={item.label}
                variants={fadeUp()}
                className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/95 px-5 py-5 shadow-[0_14px_40px_-28px_rgba(15,26,28,0.3)]"
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${ring}`}
                >
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-display text-2xl font-bold tracking-tight text-ink md:text-[1.65rem]">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted">{item.label}</p>
                </div>
              </motion.li>
            )
          })}
        </motion.ul>
      </div>
    </section>
  )
}
