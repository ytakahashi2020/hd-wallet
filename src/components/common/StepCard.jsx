import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'

// Shared wrapper for each step: numbered badge, title, tag, description.
// When an upstream input changes (revision), steps below the source flash in a
// staggered cascade so the deterministic "everything downstream recomputed"
// effect is visible regardless of scroll position.
export default function StepCard({ id, num, titleKey, tagKey, descKey, children }) {
  const { t } = useI18n()
  const { revision } = useWallet()
  const [cascade, setCascade] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setCascade(false)
    // re-trigger on next frame
    const raf = requestAnimationFrame(() => setCascade(true))
    return () => cancelAnimationFrame(raf)
  }, [revision])

  return (
    <section
      className={`step ${cascade ? 'cascade' : ''}`}
      id={id}
      style={{ '--cascade-delay': `${num * 90}ms` }}
      onAnimationEnd={() => setCascade(false)}
    >
      <div className="step-head">
        <span className="step-num">{num}</span>
        <h3>{t(titleKey)}</h3>
        {tagKey && <span className="tag">{t(tagKey)}</span>}
      </div>
      <p className="step-desc">{t(descKey)}</p>
      {children}
    </section>
  )
}
