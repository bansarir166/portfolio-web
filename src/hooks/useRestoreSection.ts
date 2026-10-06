import { useLayoutEffect } from 'react'
import { scrollRestore } from '@/lib/scrollRestore'

const NAV_OFFSET = 88

function withInstantScroll(scroll: () => void) {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  scroll()
  root.style.scrollBehavior = previous
}

function restorePosition() {
  const { isReload, initialHash } = scrollRestore

  if (isReload) {
    withInstantScroll(() => window.scrollTo(0, 0))
    return
  }

  if (!initialHash) return
  const target = document.getElementById(initialHash.slice(1))
  if (!target) return
  withInstantScroll(() => target.scrollIntoView({ block: 'start' }))
}

function currentSectionId() {
  const sections = document.querySelectorAll<HTMLElement>('main section[id]')
  const nearBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 4

  if (nearBottom && sections.length > 0) {
    return sections[sections.length - 1].id
  }

  let current = 'top'

  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= NAV_OFFSET + 2) current = section.id
  })

  return current
}

function syncHash() {
  const id = currentSectionId()
  const nextHash = id === 'top' ? '' : `#${id}`
  if (window.location.hash === nextHash) return

  const url = `${window.location.pathname}${window.location.search}${nextHash}`
  history.replaceState(null, '', url)
}

export function useRestoreSection() {
  useLayoutEffect(() => {
    let restoring = true
    restorePosition()
    syncHash()

    let frame = 0
    const onScroll = () => {
      if (restoring) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(syncHash)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    const release = requestAnimationFrame(() => {
      restoring = false
    })

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(release)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
}
