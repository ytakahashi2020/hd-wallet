import { useI18n } from '../../i18n/I18nContext.jsx'

export default function LanguageToggle() {
  const { t, toggle } = useI18n()
  return (
    <button className="lang-btn" onClick={toggle} aria-label="Switch language">
      {t('lang.toggle')}
    </button>
  )
}
