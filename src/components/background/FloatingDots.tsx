export function FloatingDots() {
  const dots = [
    { top: '18%', left: '8%', size: 6, delay: '0s' },
    { top: '42%', left: '88%', size: 8, delay: '1.2s' },
    { top: '72%', left: '14%', size: 5, delay: '2.4s' },
    { top: '28%', left: '62%', size: 7, delay: '0.8s' },
    { top: '85%', left: '70%', size: 6, delay: '1.8s' },
  ]

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-drift absolute rounded-full bg-teal/25"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
          }}
        />
      ))}
    </div>
  )
}
