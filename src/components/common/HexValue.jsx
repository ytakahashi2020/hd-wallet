import { useState, useCallback } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { bytesToHex } from '../../crypto/format.js'

// Displays a hex/string value in monospace with a copy button. Accepts either a
// `bytes` (Uint8Array) or a raw `value` string. `flashKey` can be passed so the
// box flashes whenever the upstream value changes.
export default function HexValue({ label, bytes, value, flashKey, dim }) {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const text = value != null ? value : bytes ? bytesToHex(bytes) : ''

  const onCopy = useCallback(() => {
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }, [text])

  return (
    <div className="hexbox">
      {label && (
        <div className="meta">
          <span className="label">{label}</span>
          <button className="copy-btn" onClick={onCopy}>
            {copied ? t('common.copied') : t('common.copy')}
          </button>
        </div>
      )}
      <div key={flashKey} className={`hex ${dim ? 'dim' : ''} ${flashKey != null ? 'flash' : ''}`}>
        {text}
      </div>
    </div>
  )
}
