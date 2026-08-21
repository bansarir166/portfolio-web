import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'
import { navLinks, profile } from '@/data/portfolio'

const socials = [
  { icon: FiGithub, href: profile.socials.github, label: 'GitHub' },
  { icon: FiLinkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
  { icon: FiTwitter, href: profile.socials.twitter, label: 'Twitter' },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink text-white">
      <div className="section-pad mx-auto flex max-w-7xl flex-col gap-10 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.name}
          </p>
          <p className="mt-3 max-w-sm text-white/65">{profile.role}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-block text-teal-soft transition-colors hover:text-white"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="section-pad mx-auto max-w-7xl border-t border-white/10 py-5 text-sm text-white/45">
        © {new Date().getFullYear()} {profile.name}. Crafted with care.
      </div>
    </footer>
  )
}
