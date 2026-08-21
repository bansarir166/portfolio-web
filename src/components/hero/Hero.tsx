import { motion } from 'framer-motion'
import {
  FiArrowDown,
  FiArrowRight,
  FiBriefcase,
  FiCalendar,
  FiUsers,
} from 'react-icons/fi'
import { FaAws, FaGithub } from 'react-icons/fa'
import {
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from 'react-icons/si'
import heroPortrait from '@/assets/hero.png'
import { heroStats, heroTech, profile } from '@/data/portfolio'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { fadeUp, staggerContainer } from '@/lib/motion'
import type { IconType } from 'react-icons'

const techIcons: Record<(typeof heroTech)[number], IconType> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  TypeScript: SiTypescript,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  AWS: FaAws,
}

const orbitIcons = [
  {
    label: 'React',
    Icon: SiReact,
    className: 'right-[-2%] top-[4%] text-[#61DAFB]',
    delay: 0.35,
    floatDelay: '0s',
  },
  {
    label: 'TypeScript',
    Icon: SiTypescript,
    className: 'right-[-6%] top-[36%] text-[#3178C6]',
    delay: 0.45,
    floatDelay: '1.2s',
  },
  {
    label: 'Node.js',
    Icon: SiNodedotjs,
    className: 'bottom-[16%] right-[-2%] text-[#339933]',
    delay: 0.55,
    floatDelay: '2.4s',
  },
  {
    label: 'Next.js',
    Icon: SiNextdotjs,
    className: 'left-[-6%] top-[40%] text-ink',
    delay: 0.4,
    floatDelay: '0.8s',
  },
  {
    label: 'MongoDB',
    Icon: SiMongodb,
    className: 'bottom-[16%] left-[-4%] text-[#47A248]',
    delay: 0.5,
    floatDelay: '1.8s',
  },
] as const

const statMeta = {
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
  orange: {
    Icon: FaGithub,
    ring: 'bg-orange-50 text-orange-600',
  },
} as const

function DotGrid() {
  return (
    <div
      className="absolute right-2 top-2 grid grid-cols-5 gap-1.5 opacity-40"
      aria-hidden
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <span key={i} className="h-1 w-1 rounded-full bg-slate-400" />
      ))}
    </div>
  )
}

function OrbitRings() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-[42%] h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      {[100, 78, 58].map((size) => (
        <div
          key={size}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300/70"
          style={{ width: `${size}%`, height: `${size}%` }}
        />
      ))}
    </div>
  )
}

function CodeSnippet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -left-10 top-[10%] z-20 w-[9.5rem] overflow-hidden rounded-2xl bg-[#1e2430] p-3 shadow-[0_16px_40px_-18px_rgba(15,26,28,0.55)] sm:-left-10 sm:w-[10.5rem]"
    >
      <div className="mb-2 flex items-center gap-1.5 text-[10px] text-white/55">
        <span className="font-mono">&lt;/&gt;</span>
        <span>code</span>
      </div>
      <pre className="font-mono text-[10px] leading-relaxed">
        <code>
          <span className="text-pink-400">const</span>{' '}
          <span className="text-sky-300">dev</span>{' '}
          <span className="text-white/70">=</span>{' '}
          <span className="text-amber-300">{`{`}</span>
          {'\n'}
          {'  '}
          <span className="text-violet-300">skills</span>
          <span className="text-white/70">:</span>{' '}
          <span className="text-emerald-300">[...]</span>
          {'\n'}
          <span className="text-amber-300">{`}`}</span>
        </code>
      </pre>
    </motion.div>
  )
}

function CurvedArrow() {
  return (
    <svg
      className="pointer-events-none absolute right-[18%] top-[2%] z-10 h-16 w-16 text-accent/70 sm:h-20 sm:w-20"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M12 58 C 18 28, 42 12, 68 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M58 12 L68 18 L62 28"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 36 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex w-full max-w-[34rem] flex-col lg:mx-0 lg:max-w-none"
    >
      {/* Portrait stage — height capped so stats stay inside the hero viewport */}
      <div className="relative mx-auto aspect-[4/5] h-[min(26rem,calc(100svh-17rem))] w-auto max-w-full sm:h-[min(30rem,calc(100svh-15rem))] lg:h-[min(34rem,calc(100svh-13rem))] xl:h-[min(36rem,calc(100svh-12rem))]">
        {/* Soft blue halo */}
        <div
          className="absolute left-1/2 top-[42%] h-[75%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(147,197,253,0.55)_0%,rgba(191,219,254,0.28)_42%,transparent_70%)]"
          aria-hidden
        />

        <OrbitRings />
        <DotGrid />
        <CurvedArrow />
        <CodeSnippet />

        {/* Portrait — fades into stats below */}
        <div className="absolute inset-x-[16%] bottom-0 top-[2%] z-10 overflow-hidden">
          <img
            src={heroPortrait}
            alt={`${profile.name} — ${profile.role}`}
            className="h-full w-full object-cover object-[center_8%] [mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)]"
            fetchPriority="high"
          />
        </div>

        {/* Floating tech cards */}
        {orbitIcons.map(({ label, Icon, className, delay, floatDelay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-20 ${className}`}
          >
            <div
              className="animate-drift flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white shadow-[0_12px_30px_-12px_rgba(15,26,28,0.35)] sm:h-12 sm:w-12 lg:h-14 lg:w-14"
              style={{ animationDelay: floatDelay }}
            >
              <Icon size={24} aria-label={label} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats card in document flow so it never gets clipped */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-30 -mt-10 w-full shrink-0 sm:-mt-12"
      >
        <div className="grid grid-cols-2 gap-y-3 rounded-[1.35rem] border border-white/90 bg-white px-2.5 py-3.5 shadow-[0_18px_50px_-22px_rgba(15,26,28,0.35)] sm:grid-cols-4 sm:gap-y-0 sm:px-1.5 sm:py-4 md:px-2 md:py-5">
          {heroStats.map((stat, index) => {
            const { Icon, ring } = statMeta[stat.tone]
            return (
              <div
                key={stat.label}
                className={`flex min-w-0 items-center gap-2 px-1.5 sm:px-2 ${
                  index < heroStats.length - 1
                    ? 'sm:border-r sm:border-line'
                    : ''
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${ring} sm:h-9 sm:w-9 md:h-10 md:w-10`}
                >
                  <Icon size={15} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-base font-bold tracking-tight text-ink sm:text-lg md:text-xl">
                    {stat.value}
                  </p>
                  <p className="text-[10px] leading-snug text-muted sm:text-[11px] md:text-xs">
                    {stat.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-x-hidden bg-[#f4f6f8]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(219,234,254,0.65),transparent_55%)]" />

      <div className="section-pad relative z-10 mx-auto grid min-h-[100svh] max-w-7xl items-center gap-8 pb-16 pt-24 sm:gap-10 sm:pb-20 sm:pt-28 lg:grid-cols-2 lg:gap-8 lg:pb-14 lg:pt-24 xl:gap-12">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="max-w-xl"
        >
          <motion.p
            variants={fadeUp()}
            className="text-base font-medium text-ink-soft sm:text-lg"
          >
            <span aria-hidden>👋</span> Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={fadeUp(0.04)}
            className="mt-2 font-display text-5xl leading-[1.05] font-bold tracking-tight text-ink sm:text-6xl lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.div variants={fadeUp(0.08)} className="mt-3">
            <p className="text-2xl font-bold text-accent sm:text-3xl lg:text-[2.35rem]">
              {profile.role}
            </p>
            <span className="mt-3 block h-[3px] w-14 rounded-full bg-accent" />
          </motion.div>

          <motion.p
            variants={fadeUp(0.12)}
            className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp(0.16)}
            className="mt-7 flex max-w-lg flex-wrap gap-2.5"
          >
            {heroTech.map((label) => {
              const Icon = techIcons[label]
              return (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 px-3 py-1.5 text-sm text-ink-soft shadow-sm"
                >
                  <Icon size={14} aria-hidden />
                  {label}
                </span>
              )
            })}
          </motion.div>

          <motion.div
            variants={fadeUp(0.2)}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#projects"
              className="rounded-xl bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-ink-soft"
            >
              View My Work
              <FiArrowRight size={16} />
            </MagneticButton>
            {/* <MagneticButton
              href={profile.resumeUrl}
              className="rounded-xl border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-ink/25 hover:bg-white"
            >
              <FiDownload size={16} />
              Download Resume
            </MagneticButton> */}
          </motion.div>
        </motion.div>

        <HeroVisual />
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        aria-label="Scroll to about"
        className="absolute bottom-3 left-1/2 z-20 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border border-line bg-white/90 text-ink-soft shadow-sm transition-colors hover:text-accent sm:bottom-4 sm:h-10 sm:w-10 lg:bottom-5"
      >
        <FiArrowDown className="animate-drift" size={18} />
      </motion.a>
    </section>
  )
}
