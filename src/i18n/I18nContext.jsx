import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { messages } from './messages.js'

const I18nContext = createContext(null)

const STORAGE_KEY = 'hdwallet.lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ja' || saved === 'en') return saved
  } catch {
    /* localStorage unavailable */
  }
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('ja')) {
    return 'ja'
  }
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
  }, [lang])

  // t(key, vars) — looks up the string and fills {placeholders}.
  const t = useCallback(
    (key, vars) => {
      let str = messages[lang]?.[key] ?? messages.en[key] ?? key
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replaceAll(`{${k}}`, String(v))
        }
      }
      return str
    },
    [lang],
  )

  const toggle = useCallback(() => setLang((l) => (l === 'en' ? 'ja' : 'en')), [])

  return (
    <I18nContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
