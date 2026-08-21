import { motion } from 'framer-motion'
import { FiBriefcase, FiCode, FiMapPin } from 'react-icons/fi'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { experience } from '@/data/portfolio'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import type { IconType } from 'react-icons'

const roleIcons: Record<(typeof experience)[number]['icon'], IconType> = {
  briefcase: FiBriefcase,
  building: HiOutlineBuildingOffice2,
  code: FiCode,
}

export function ExperienceTimeline() {
  return (
    <motion.ol
      className="relative space-y-6 pl-2 md:pl-0"
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Timeline spine */}
      <span
        className="absolute top-1 bottom-6 left-[1.35rem] w-0.5 bg-accent/35 md:left-[1.45rem]"
        aria-hidden
      />

      {experience.map((item) => {
        const Icon = roleIcons[item.icon]
        return (
          <motion.li
            key={item.company}
            variants={fadeUp()}
            className="relative flex gap-4 md:gap-5"
          >
            <span className="relative z-10 mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_0_6px_rgba(37,99,235,0.12)]">
              <Icon size={18} aria-hidden />
            </span>

            <article className="min-w-0 flex-1 rounded-2xl border border-white bg-white p-5 shadow-[0_14px_40px_-24px_rgba(15,26,28,0.3)] sm:p-6 md:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-semibold tracking-wide text-accent uppercase">
                  {item.period}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2f4] px-3 py-1 text-xs font-medium text-ink-soft">
                  <FiMapPin size={12} className="text-muted" aria-hidden />
                  {item.location}
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                {item.role}
              </h3>
              <p className="mt-1.5 text-base font-semibold text-accent">
                {item.company}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {item.summary}
              </p>

              <ul className="mt-5 flex flex-wrap justify-end gap-2">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-accent-soft/70 px-2.5 py-1 text-xs font-medium text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </motion.li>
        )
      })}
    </motion.ol>
  )
}
