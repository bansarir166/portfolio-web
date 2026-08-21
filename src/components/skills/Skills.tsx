import { motion } from 'framer-motion'
import { FiCloud, FiCode, FiServer } from 'react-icons/fi'
import {
  SiDocker,
  SiGraphql,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { skillGroups, skillsMeta } from '@/data/portfolio'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import type { IconType } from 'react-icons'

const icons = [
  { Icon: SiReact, label: 'React' },
  { Icon: SiTypescript, label: 'TypeScript' },
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiNodedotjs, label: 'Node.js' },
  { Icon: SiPostgresql, label: 'PostgreSQL' },
  { Icon: SiMongodb, label: 'MongoDB' },
  { Icon: SiTailwindcss, label: 'Tailwind' },
  { Icon: SiGraphql, label: 'GraphQL' },
  { Icon: FaAws, label: 'AWS' },
  { Icon: SiDocker, label: 'Docker' },
]

const groupMeta: Record<
  (typeof skillGroups)[number]['tone'],
  { Icon: IconType; ring: string; dot: string }
> = {
  blue: {
    Icon: FiCode,
    ring: 'bg-blue-50 text-blue-600',
    dot: 'bg-blue-500',
  },
  green: {
    Icon: FiServer,
    ring: 'bg-emerald-50 text-emerald-600',
    dot: 'bg-emerald-500',
  },
  purple: {
    Icon: FiCloud,
    ring: 'bg-violet-50 text-violet-600',
    dot: 'bg-violet-500',
  },
}

export function Skills() {
  return (
    <section
      id="skills"
      className="section-pad relative overflow-hidden bg-white py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(37,99,235,0.06), transparent 38%), radial-gradient(circle at 10% 80%, rgba(15,26,28,0.03), transparent 36%)',
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
            Skills
          </motion.p>
          <motion.h2
            variants={fadeUp()}
            className="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl md:text-5xl"
          >
            {skillsMeta.title}
          </motion.h2>
          <motion.span
            variants={fadeUp()}
            className="mt-4 block h-[3px] w-14 rounded-full bg-accent"
          />
          <motion.p
            variants={fadeUp()}
            className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
          >
            {skillsMeta.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="mb-12 flex flex-wrap gap-2.5"
          variants={staggerContainer(0.04)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {icons.map(({ Icon, label }) => (
            <motion.div
              key={label}
              variants={fadeUp()}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-[#eef2f6]/80 px-3.5 py-2 text-sm text-ink-soft shadow-sm"
              title={label}
            >
              <Icon size={15} aria-hidden />
              <span>{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {skillGroups.map((group) => {
            const { Icon, ring, dot } = groupMeta[group.tone]
            return (
              <motion.div
                key={group.title}
                variants={fadeUp()}
                className="rounded-2xl border border-line bg-[#eef2f6]/70 p-6 shadow-[0_14px_40px_-28px_rgba(15,26,28,0.25)] md:p-7"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${ring}`}
                  >
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {group.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {group.description}
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 border-t border-line pt-5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-ink-soft sm:text-base"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
