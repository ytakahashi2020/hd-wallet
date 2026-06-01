import { useEffect, useState } from 'react'

// Fixed vertical dots (1..6) that track the step in view and jump on click.
const STEPS = [1, 2, 3, 4, 5, 6]

export default function StepNav() {
  const [active, setActive] = useState(1)

  useEffect(() => {
    const sections = STEPS.map((n) => document.getElementById(`step${n}`)).filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry nearest the top that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          const n = Number(visible[0].target.id.replace('step', ''))
          setActive(n)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="step-nav" aria-label="Steps">
      {STEPS.map((n) => (
        <a
          key={n}
          href={`#step${n}`}
          className={`step-nav-dot ${active === n ? 'active' : ''}`}
          aria-label={`Step ${n}`}
        >
          <span className="step-nav-num">{n}</span>
        </a>
      ))}
    </nav>
  )
}
