import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { projects, projectsMeta } from '@/data/portfolio'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'





type Project = (typeof projects)[number]

function ProjectCard({ project }: { project: Project }) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)

  useEffect(() => {
    const el = textRef.current
    if (!el || expanded) return

    const measure = () => {
      const full = document.createElement('p')
      full.className = 'text-sm leading-relaxed sm:text-base'
      full.style.cssText =
        'position:absolute;visibility:hidden;pointer-events:none;height:auto;'
      full.style.width = `${el.clientWidth}px`
      full.textContent = project.description
      el.parentElement?.appendChild(full)
      const lineHeight = parseFloat(getComputedStyle(full).lineHeight)
      setOverflows(full.getBoundingClientRect().height > lineHeight * 3 + 1)
      full.remove()
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [expanded, project.description])

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_14px_40px_-28px_rgba(15,26,28,0.3)]">
      <div className="relative h-44 overflow-hidden md:h-64">
        <img
          src={project.image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-2xl font-semibold text-ink">
          {project.title}
        </h3>
        <div className="relative mt-3">
          <p
            ref={textRef}
            className={`text-sm leading-relaxed text-muted sm:text-base ${
              expanded ? '' : 'line-clamp-3'
            }`}
          >
            {project.description}
            {expanded && overflows ? (
              <>
                {' '}
                <button
                  type="button"
                  className="font-semibold text-accent"
                  aria-expanded
                  onClick={() => setExpanded(false)}
                >
                  Read less
                </button>
              </>
            ) : null}
          </p>
          {!expanded && overflows ? (
            <button
              type="button"
              className="absolute right-0 bottom-0 bg-[linear-gradient(to_right,transparent,white_0.7rem)] pl-4 text-sm leading-relaxed sm:text-base"
              aria-expanded={false}
              onClick={() => setExpanded(true)}
            >
              <span className="text-muted">...</span>{' '}
              <span className="font-semibold text-accent">Read more</span>
            </button>
          ) : null}
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-[#eef2f6]/90 px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-4 border-t border-line pt-3">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-accent"
          >
            Live demo <FiArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    const observer = new ResizeObserver(updateArrows)
    observer.observe(el)
    el.addEventListener('scroll', updateArrows, { passive: true })
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', updateArrows)
    }
  }, [updateArrows])

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = [...el.children] as HTMLElement[]
    if (cards.length === 0) return

    const viewLeft = el.getBoundingClientRect().left
    const current = cards.reduce((closest, card) =>
      Math.abs(card.getBoundingClientRect().left - viewLeft) <
      Math.abs(closest.getBoundingClientRect().left - viewLeft)
        ? card
        : closest,
    )
    const next = cards[cards.indexOf(current) + direction]
    if (!next) return

    const delta =
      next.getBoundingClientRect().left - el.getBoundingClientRect().left
    el.scrollBy({ left: delta, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      id="projects"
      className="section-pad relative overflow-hidden bg-[#eef2f6] py-24 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(circle at 14% 18%, rgba(37,99,235,0.07), transparent 40%), radial-gradient(circle at 90% 75%, rgba(15,26,28,0.04), transparent 38%)',
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
            {projectsMeta.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp()}
            className="mt-3 font-display text-3xl leading-tight font-semibold text-ink sm:text-4xl md:text-5xl"
          >
            {projectsMeta.title}
          </motion.h2>
          <motion.span
            variants={fadeUp()}
            className="mt-4 block h-[3px] w-14 rounded-full bg-accent"
          />
          <motion.p
            variants={fadeUp()}
            className="mt-6 text-base leading-relaxed text-muted sm:text-lg"
          >
            {projectsMeta.description}
          </motion.p>
        </motion.div>

        <div>
        <motion.div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto overscroll-x-contain pb-4 snap-x snap-mandatory [overflow-anchor:none] md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp()}
              className="snap-start flex-shrink-0 w-[min(32rem,86vw)] md:w-[32rem]"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              aria-label="Previous project"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <FiArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <FiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
