import { useI18n } from '../../i18n/I18nContext.jsx'

// Shared wrapper for each step: numbered badge, title, tag, description.
export default function StepCard({ id, num, titleKey, tagKey, descKey, children }) {
  const { t } = useI18n()
  return (
    <section className="step" id={id}>
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
