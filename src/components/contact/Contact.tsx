import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { profile } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { fadeUp, viewportOnce } from '@/lib/motion'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="section-pad relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something lasting."
            description="Tell me about your product, timeline, and goals. I usually reply within one business day."
          />

          <motion.ul
            className="space-y-5"
            variants={fadeUp()}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <li className="flex items-start gap-3 text-ink-soft">
              <FiMail className="mt-1 shrink-0 text-accent" size={18} />
              <a
                href={`mailto:${profile.email}`}
                className="transition-colors hover:text-accent"
              >
                {profile.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-ink-soft">
              <FiMapPin className="mt-1 shrink-0 text-accent" size={18} />
              <span>{profile.location}</span>
            </li>
          </motion.ul>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="rounded-2xl border border-line bg-surface p-6 md:p-8"
          variants={fadeUp()}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {sent ? (
            <div className="flex min-h-64 flex-col items-start justify-center">
              <p className="font-display text-2xl font-semibold text-ink">
                Message received.
              </p>
              <p className="mt-3 text-muted">
                Thanks for reaching out — I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                className="mt-6 text-sm font-medium text-accent underline-offset-4 hover:underline"
                onClick={() => setSent(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink-soft">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="w-full rounded-md border border-line bg-bg px-3.5 py-3 text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-ink-soft">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="w-full rounded-md border border-line bg-bg px-3.5 py-3 text-ink outline-none transition-colors focus:border-accent"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink-soft">
                  Subject
                </span>
                <input
                  required
                  name="subject"
                  className="w-full rounded-md border border-line bg-bg px-3.5 py-3 text-ink outline-none transition-colors focus:border-accent"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-ink-soft">
                  Message
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="w-full resize-y rounded-md border border-line bg-bg px-3.5 py-3 text-ink outline-none transition-colors focus:border-accent"
                />
              </label>
              <MagneticButton
                type="submit"
                className="w-full rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
              >
                Send message
                <FiSend size={16} />
              </MagneticButton>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
