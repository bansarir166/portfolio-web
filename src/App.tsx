import { About } from '@/components/about/About'
import { Contact } from '@/components/contact/Contact'
import { Experience } from '@/components/experience/Experience'
import { Hero } from '@/components/hero/Hero'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CursorGlow } from '@/components/layout/CursorGlow'
import { BackToTop } from '@/components/layout/BackToTop'
import { GradientMesh } from '@/components/background/GradientMesh'
import { FloatingDots } from '@/components/background/FloatingDots'
import { Projects } from '@/components/projects/Projects'
import { Services } from '@/components/services/Services'
import { Skills } from '@/components/skills/Skills'
import { Testimonials } from '@/components/testimonials/Testimonials'
import { useRestoreSection } from '@/hooks/useRestoreSection'

export default function App() {
  useRestoreSection()

  return (
    <>
      <GradientMesh />
      <FloatingDots />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
