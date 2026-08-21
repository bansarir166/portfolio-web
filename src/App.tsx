import { lazy, Suspense } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CursorGlow } from '@/components/layout/CursorGlow'
import { BackToTop } from '@/components/layout/BackToTop'
import { GradientMesh } from '@/components/background/GradientMesh'
import { FloatingDots } from '@/components/background/FloatingDots'
import { Hero } from '@/components/hero/Hero'

const About = lazy(() =>
  import('@/components/about/About').then((m) => ({ default: m.About })),
)
const Skills = lazy(() =>
  import('@/components/skills/Skills').then((m) => ({ default: m.Skills })),
)
const Projects = lazy(() =>
  import('@/components/projects/Projects').then((m) => ({ default: m.Projects })),
)
const Experience = lazy(() =>
  import('@/components/experience/Experience').then((m) => ({ default: m.Experience })),
)
const Services = lazy(() =>
  import('@/components/services/Services').then((m) => ({ default: m.Services })),
)
const Testimonials = lazy(() =>
  import('@/components/testimonials/Testimonials').then((m) => ({
    default: m.Testimonials,
  })),
)
const Contact = lazy(() =>
  import('@/components/contact/Contact').then((m) => ({ default: m.Contact })),
)

function SectionFallback() {
  return (
    <div className="section-pad mx-auto max-w-7xl py-24" aria-hidden>
      <div className="h-40 animate-pulse rounded-2xl border border-line bg-surface" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <GradientMesh />
      <FloatingDots />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
