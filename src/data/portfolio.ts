import logo from "../assets/logo.png";
import qoodo from "../assets/qoodo.png";
import lal10 from "../assets/lal10.png";
import infra from "../assets/infra.png";
import noura from "../assets/noura.jpg";

export const profile = {
  name: 'Bansri Rakholiya',
  image: logo,
  role: 'Full Stack Web Developer',
  tagline:
    'I build scalable web applications and exceptional digital experiences using modern technologies.',
  email: 'bansari1660@gmail.com',
  location: 'Available worldwide · Remote',
  resumeUrl: '#',
  socials: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://x.com',
  },
}

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
]

export const heroTech = [
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'MongoDB',
  'PostgreSQL',
  'AWS',
] as const

export const heroStats = [
  { value: '3+', label: 'Years Experience', tone: 'blue' },
  { value: '15+', label: 'Projects Completed', tone: 'green' },
  { value: '10+', label: 'Happy Clients', tone: 'purple' },
  { value: '250+', label: 'GitHub Contributions', tone: 'orange' },
] as const

export const about = {
  title: 'Building software that feels intentional.',
  intro:
    'I am a full stack developer who cares as much about how a product feels as how it performs under load. Over the last few years I have helped startups and product teams turn ambiguous briefs into shipped software.',
  focus:
    'My sweet spot sits at the intersection of React architectures, Node services, and thoughtful UX — clean systems that stay maintainable as they grow.',
  focusChips: [
    'React architectures',
    'Node services',
    'Product UX',
    'Maintainable systems',
  ],
  highlights: [
    { value: '2+', label: 'Years shipping products', tone: 'blue' },
    { value: '15+', label: 'Projects delivered', tone: 'green' },
    { value: '10+', label: 'Teams collaborated with', tone: 'purple' },
  ],
}

export const skillsMeta = {
  title: 'A stack chosen for speed, clarity, and scale.',
  description:
    'I work across the full product surface — UI systems, APIs, data, and deployment — with a bias toward maintainable architecture.',
}

export const skillGroups = [
  {
    title: 'Frontend',
    tone: 'blue',
    description: 'Interfaces that feel fast, clear, and consistent.',
    skills: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'Vite',
    ],
  },
  {
    title: 'Backend',
    tone: 'green',
    description: 'APIs and data models built to scale cleanly.',
    skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    title: 'Cloud & Tools',
    tone: 'purple',
    description: 'Delivery, hosting, and the glue that keeps shipping smooth.',
    skills: ['AWS', 'Docker', 'CI/CD', 'GraphQL', 'REST APIs', 'Git'],
  },
] as const

export const projectsMeta = {
  eyebrow: 'Selected work',
  title: 'Products built end to end.',
  description:
    'A few recent engagements where I owned architecture, implementation, and polish across the stack.',
}

export const projects = [
  {
    title: 'NOURA — Premium Dry Fruits',
    description:
      'NOURA is a premium dry-fruit house, presented as a calm editorial storefront. Shoppers browse curated collections of almonds, pistachios, cashews, and dates, choose a pack size, and build a gift box with a live preview, a personal note, and a running total.',
    tags: ['Next.js', 'React'],
    image: noura,
    live: 'https://dryfruit-web.vercel.app/',
    accent: '#1c1917',
  },
  {
    title: 'Lal10 – Manufacturing & Supply Chain Platform',
    description:
      'Product analytics suite with custom event pipelines, live dashboards, and role-based access for growing SaaS teamsA modern, premium B2B manufacturing platform showcasing apparel, fabrics, home textiles, global sourcing, and end-to-end supply chain solutions. Designed with a clean, visual-first experience and engaging sections to highlight products, processes, statistics, and global reach .',
    tags: ['React', 'NestJS', 'Redis', 'AWS'],
    image: lal10,
    live: 'https://www.lal10.com/',
    repo: 'https://github.com',
    accent: '#0f1a1c',
  },
  {
    title: 'Smart quality management',
    description:
      'A compliance platform that pairs blockchain-backed records with AI assistance, so food-safety and workplace-standards teams can log, verify, and audit quality data without paperwork.',
    tags: ['TypeScript', 'WebSockets', 'MongoDB', 'Docker'],
    image: qoodo,
    live: 'https://www.qoodo.io/',
    // repo: 'https://github.com',
    accent: '#4f46e5',
  },
  {
    title: 'Infratech Solution',
    description:
      'A professional technology website built to present Infratech Solution’s digital services through a modern interface, smooth animations, responsive layouts, and a clean visual design focused on business growth and innovation.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: infra,
    live: 'https://infratechsolution.co',
    // repo: 'https://github.com',
    accent: '#2563eb',
  },
  // {
  //   title: 'Harbor Health',
  //   description:
  //     'Patient-facing portal and clinician tools with secure auth, appointment flows, and accessible UI patterns.',
  //   tags: ['React', 'Express', 'PostgreSQL', 'JWT'],
  //   live: 'https://example.com',
  //   repo: 'https://github.com',
  //   accent: '#0ea5e9',
  // },
]

export const experienceMeta = {
  eyebrow: 'Experience',
  titleBefore: 'My journey',
  titleAccent: 'so far',
  description:
    'A path from frontend craftsmanship to leading full stack product work.',
}

export const experienceStats = [
  { value: '3+', label: 'Years of Experience', icon: 'briefcase' },
  { value: '20+', label: 'Projects Completed', icon: 'code' },
  { value: '10+', label: 'Happy Clients', icon: 'users' },
  { value: '3', label: 'Companies Worked', icon: 'award' },
] as const

export const experience = [
  {
    role: ' Full Stack Developer',
    company: 'Infratech Solution',
    period: '2023 — 2026',
    location: 'Surat, India',
    summary:
      'Leading architecture for a multi-tenant SaaS platform. Mentoring engineers, owning API design, and shipping features that cut page load by 40%.',
    tags: ['React', 'Node.js', 'TypeScript', 'AWS', 'PostgreSQL', 'Docker'],
    icon: 'briefcase',
  },
  {
    role: 'Full Stack Developer',
    company: 'Enacle Infotech',
    period: '2023 — 2023',
    location: 'Surat, India',
    summary:
      'Built customer-facing apps and internal tools end-to-end. Introduced design systems and CI pipelines that shortened release cycles.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'GitHub Actions'],
    icon: 'building',
  },
  // {
  //   role: 'Frontend Developer',
  //   company: 'Studio Meridian',
  //   period: '2018 — 2020',
  //   location: 'Surat, India',
  //   summary:
  //     'Crafted interactive marketing sites and dashboards. Partnered closely with design to turn prototypes into production-ready React apps.',
  //   tags: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'WordPress', 'Figma'],
  //   icon: 'code',
  // },
] as const

export const servicesMeta = {
  eyebrow: 'Services',
  title: 'How I can help your team.',
  description:
    'Flexible engagement — short consulting sprints or longer product partnerships.',
}

export const services = [
  {
    title: 'Product Engineering',
    description:
      'From discovery to launch — I help define scope, choose the stack, and build the features that move your metrics.',
    tone: 'blue',
  },
  {
    title: 'API & Backend Systems',
    description:
      'Secure, well-documented APIs and data models that scale with your users without becoming a maintenance trap.',
    tone: 'green',
  },
  {
    title: 'Frontend Architecture',
    description:
      'Component systems, performance budgets, and accessible interfaces that feel fast and stay consistent across the product.',
    tone: 'purple',
  },
  {
    title: 'Technical Consulting',
    description:
      'Code reviews, stack audits, and hands-on pairing when you need clarity on architecture or delivery risks.',
    tone: 'orange',
  },
] as const

export const testimonials = [
  {
    quote:
      'Bansri ships with rare clarity. Our MVP went from sketch to production in weeks — and the codebase is still a joy to work in.',
    name: 'Maya Chen',
    title: 'Founder, Northline',
  },
  {
    quote:
      'Equal parts craft and pragmatism. He elevated our frontend standards and made the backend easier for the whole team to own.',
    name: 'Jordan Blake',
    title: 'CTO, Pulse Analytics',
  },
  {
    quote:
      'Communication was excellent. Deadlines held, edge cases were handled early, and the final product exceeded expectations.',
    name: 'Samira Ortiz',
    title: 'Product Lead, Harbor Health',
  },
]
