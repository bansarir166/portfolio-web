import { motion } from 'framer-motion'
import {
  FiAward,
  FiBriefcase,
  FiCode,
  FiUsers,
} from 'react-icons/fi'
import { experienceMeta, experienceStats } from '@/data/portfolio'
import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import type { IconType } from 'react-icons'

const statIcons: Record<(typeof experienceStats)[number]['icon'], IconType> = {
  briefcase: FiBriefcase,
  code: FiCode,
  users: FiUsers,
  award: FiAward,
}

export function Experience() {
  return (
    <section
      id="experience"
      className="section-pad relative overflow-hidden bg-[#f7f8f9] py-24 md:py-32"
    >
      {/* Dot patterns */}
      <div
        className="pointer-events-none absolute top-8 right-6 h-40 w-40 opacity-40 md:right-16"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(15,26,28,0.18) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />
      <div
        className="pointer-events-none absolute bottom-16 left-4 h-36 w-36 opacity-35 md:left-10"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(15,26,28,0.16) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 xl:gap-20">
          {/* Left: intro + stats */}
          <motion.div
            className="self-start"
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div
              variants={fadeUp()}
              className="flex items-center gap-3"
            >
              <span className="h-px w-8 bg-accent" />
              <p className="text-sm font-semibold tracking-[0.18em] text-accent uppercase">
                {experienceMeta.eyebrow}
              </p>
            </motion.div>

            <motion.h2
              variants={fadeUp()}
              className="mt-4 font-display text-4xl leading-tight font-bold tracking-tight text-ink sm:text-5xl"
            >
              {experienceMeta.titleBefore}{' '}
              <span className="text-accent">
                {experienceMeta.titleAccent}{' '}
                <span aria-hidden>🚀</span>
              </span>
            </motion.h2>

            <motion.p
              variants={fadeUp()}
              className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              {experienceMeta.description}
            </motion.p>

            <motion.div
              variants={fadeUp()}
              className="mt-8 rounded-2xl border border-white bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,26,28,0.35)] sm:p-6"
            >
              <ul className="space-y-5">
                {experienceStats.map((stat) => {
                  const Icon = statIcons[stat.icon]
                  return (
                    <li key={stat.label} className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                        <Icon size={18} aria-hidden />
                      </span>
                      <div>
                        <p className="font-display text-2xl font-bold tracking-tight text-ink">
                          {stat.value}
                        </p>
                        <p className="text-sm text-muted">{stat.label}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: timeline */}
          <ExperienceTimeline />
        </div>

        <motion.div
          className="mt-12 flex justify-center md:mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* <MagneticButton
            href={profile.resumeUrl}
            className="rounded-xl border-2 border-accent bg-white px-7 py-3.5 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
          >
            <FiDownload size={16} />
            Download Resume
          </MagneticButton> */}
        </motion.div>
      </div>
    </section>
  )
}
