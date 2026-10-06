import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { profile } from '@/data/portfolio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeUp, viewportOnce } from '@/lib/motion'

export function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSending(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      })

      const data = (await response.json().catch(() => null)) as {
        message?: string
      } | null

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to send message. Please try again.')
      }

      setSent(true)
      form.reset()
    } catch (err) {
      console.error('Email error:', err)
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to send message. Please try again.',
      )
    } finally {
      setSending(false)
    }
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
          onSubmit={handleSubmit}
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
              {error ? (
                <p className="text-sm text-red-500" role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors disabled:opacity-60 sm:w-auto"
              >
                {sending ? 'Sending…' : 'Send message'}
                <FiSend size={16} />
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
