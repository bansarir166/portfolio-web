import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { projects, projectsMeta } from '@/data/portfolio'
import { TiltCard } from '@/components/ui/TiltCard'
import { fadeUp, staggerContainer, viewportOnce } from '@/lib/motion'
import vedifyImage from '@/assets/vedify.webp'

export function Projects() {
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

        <motion.div
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={fadeUp()}
              className="snap-start flex-shrink-0 w-[min(30rem,82vw)] md:w-[28rem]"
            >
              <TiltCard className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/95 shadow-[0_14px_40px_-28px_rgba(15,26,28,0.3)] transition-shadow hover:shadow-[0_22px_50px_-24px_rgba(15,26,28,0.4)]">
                  <div
                    className="relative flex h-44 items-end overflow-hidden p-6 md:h-56"
                  >
                    <img
                      src={vedifyImage}
                      alt=""
                      aria-hidden
                      className="absolute inset-0 h-full w-full object-fit "
                    />
                    <div
                      className="absolute inset-0 z-0 opacity-25"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 20% 20%, white 0.6px, transparent 0.6px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
              
             
                  </div>

                  <div className="flex flex-1 flex-col p-4 md:p-4">
                    <h3 className="font-display text-2xl font-semibold text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                      {project.description}
                    </p>

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
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
