import { useMemo, useState } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { entropyToWordGroups, isValidMnemonic, englishWordlist } from '../../crypto/mnemonic.js'
import StepCard from '../common/StepCard.jsx'

export default function Step1Mnemonic() {
  const { t } = useI18n()
  const { mnemonic, strengthBits, regenerate, setWordCount } = useWallet()

  const [showBits, setShowBits] = useState(false)
  const [cascadeRun, setCascadeRun] = useState(false)

  function pingCascade() {
    setCascadeRun(false)
    requestAnimationFrame(() => setCascadeRun(true))
  }
  // Local "what-if" tampering: a typo applied to a copy of the phrase, used to
  // demonstrate checksum detection. It never touches the real wallet mnemonic.
  const [tampered, setTampered] = useState(null) // { words: string[], at: number } | null

  const words = useMemo(() => mnemonic.trim().split(/\s+/), [mnemonic])
  const { groups } = useMemo(() => entropyToWordGroups(mnemonic), [mnemonic])

  const displayWords = tampered ? tampered.words : words
  const valid = tampered ? isValidMnemonic(displayWords.join(' ')) : true

  // Replace one word with a different valid wordlist word (a plausible typo)
  // so the phrase stays well-formed but the checksum no longer matches.
  function tamper(i) {
    const idx = englishWordlist.indexOf(words[i])
    const replacement = englishWordlist[(idx + 1) % englishWordlist.length]
    const next = [...words]
    next[i] = replacement
    setTampered({ words: next, at: i })
  }

  function restore() {
    setTampered(null)
  }

  return (
    <StepCard id="step1" num={1} titleKey="step1.title" tagKey="step1.tag" descKey="step1.desc">
      <div className="row" style={{ marginBottom: 14 }}>
        <div className="seg">
          <button
            className={strengthBits === 128 ? 'active' : ''}
            onClick={() => {
              restore()
              setWordCount(128)
            }}
          >
            {t('step1.words12')}
          </button>
          <button
            className={strengthBits === 256 ? 'active' : ''}
            onClick={() => {
              restore()
              setWordCount(256)
            }}
          >
            {t('step1.words24')}
          </button>
        </div>
        <button
          className="btn"
          onClick={() => {
            restore()
            regenerate()
            pingCascade()
          }}
        >
          ⟳ {t('common.regenerate')}
        </button>
        <span
          className={`cascade-dots ${cascadeRun ? 'run' : ''}`}
          onAnimationEnd={() => setCascadeRun(false)}
          title={t('step1.cascadeHint')}
        >
          <i /><i /><i /><i /><i /><i />
        </span>
      </div>

      <div className="muted" style={{ marginBottom: 10 }}>
        {t('step1.tamperHint')}
      </div>

      <div className="words" key={mnemonic}>
        {displayWords.map((w, i) => {
          const isTampered = tampered && tampered.at === i
          return (
            <button
              className={`word word-btn pop-in ${isTampered ? 'tampered' : ''}`}
              style={{ animationDelay: `${i * 16}ms` }}
              key={i}
              onClick={() => (isTampered ? restore() : tamper(i))}
              title={isTampered ? t('step1.restore') : ''}
            >
              <span className="n">{i + 1}</span>
              <span className="w">{w}</span>
            </button>
          )
        })}
      </div>

      {/* Checksum validity badge */}
      <div className={`checksum-badge ${valid ? 'ok' : 'bad'}`} key={`v-${valid}-${tampered?.at}`}>
        <span>{valid ? '✓' : '✕'}</span>
        <span>{valid ? t('step1.valid') : t('step1.invalid')}</span>
        {tampered && (
          <button className="copy-btn" style={{ marginLeft: 'auto' }} onClick={restore}>
            ⟲ {t('step1.restore')}
          </button>
        )}
      </div>

      {/* Collapsible bit view — entropy vs checksum bits */}
      <button className="copy-btn" style={{ marginTop: 16 }} onClick={() => setShowBits((s) => !s)}>
        {showBits ? '▾ ' + t('step1.hideBits') : '▸ ' + t('step1.showBits')}
      </button>

      {showBits && (
        <div className="fade-up" style={{ marginTop: 12 }}>
          <div className="bit-legend">
            <span>
              <i className="swatch entropy" /> {t('step1.legendEntropy')}
            </span>
            <span>
              <i className="swatch checksum" /> {t('step1.legendChecksum')}
            </span>
          </div>
          <div className="bit-groups" key={`bits-${mnemonic}`}>
            {groups.map((g, i) => (
              <span className="bit-group" key={i} title={`#${i + 1} "${g.word}"`}>
                {g.bits.map((b, j) => (
                  <span key={j} className={b.checksum ? 'cbit' : 'ebit'}>
                    {b.bit}
                  </span>
                ))}
              </span>
            ))}
          </div>
          <div className="muted" style={{ marginTop: 8 }}>
            {t('step1.checksumNote')}
          </div>
        </div>
      )}
    </StepCard>
  )
}
