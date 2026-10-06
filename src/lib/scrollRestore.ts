type ScrollRestoreState = {
  isReload: boolean
  initialHash: string
}

export const scrollRestore: ScrollRestoreState = {
  isReload: false,
  initialHash: '',
}

const nav = performance.getEntriesByType('navigation')[0] as
  | PerformanceNavigationTiming
  | undefined

scrollRestore.isReload = nav?.type === 'reload'
// A refresh should open on the first section. Drop any hash left from scrolling
// so the browser does not jump back to that section once it renders.
scrollRestore.initialHash = scrollRestore.isReload ? '' : window.location.hash

try {
  sessionStorage.removeItem('portfolio-scroll-y')
} catch {
  // sessionStorage can throw in private mode; refresh still starts at the top.
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

if (scrollRestore.isReload) {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search)
  }
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.style.scrollBehavior = previous
}
