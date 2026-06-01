import { useMemo } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { entropyToWordGroups } from '../../crypto/mnemonic.js'
import StepCard from '../common/StepCard.jsx'

export default function Step1Mnemonic() {
  const { t } = useI18n()
  const { mnemonic, strengthBits, regenerate, setWordCount } = useWallet()

  const { groups } = useMemo(() => entropyToWordGroups(mnemonic), [mnemonic])
  const lastIndex = groups.length - 1

  return (
    <StepCard
      id="step1"
      num={1}
      titleKey="step1.title"
      tagKey="step1.tag"
      descKey="step1.desc"
    >
      <div className="row" style={{ marginBottom: 18 }}>
        <div className="seg">
          <button
            className={strengthBits === 128 ? 'active' : ''}
            onClick={() => setWordCount(128)}
          >
            {t('step1.words12')}
          </button>
          <button
            className={strengthBits === 256 ? 'active' : ''}
            onClick={() => setWordCount(256)}
          >
            {t('step1.words24')}
          </button>
        </div>
        <button className="btn" onClick={() => regenerate()}>
          ⟳ {t('common.regenerate')}
        </button>
      </div>

      <div className="words" key={mnemonic}>
        {groups.map((g, i) => (
          <div
            className={`word pop-in ${i === lastIndex ? 'checksum' : ''}`}
            style={{ animationDelay: `${i * 18}ms` }}
            key={i}
          >
            <span className="n">{i + 1}</span>
            <span className="w">{g.word}</span>
          </div>
        ))}
      </div>

      <div className="label-line">{t('step1.entropyHint')}</div>

      {/* 11-bit groups: each word's wordlist index in binary. */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          fontFamily: 'var(--mono)',
          fontSize: '0.72rem',
        }}
        key={`bits-${mnemonic}`}
      >
        {groups.map((g, i) => (
          <span
            key={i}
            title={`#${i + 1} "${g.word}" → index ${g.index}`}
            style={{
              padding: '3px 7px',
              borderRadius: 6,
              background: 'var(--bg)',
              border: '1px solid var(--border-soft)',
              color: i === lastIndex ? 'var(--amber)' : 'var(--text-dim)',
            }}
          >
            {g.bits}
          </span>
        ))}
      </div>
      <div className="muted" style={{ marginTop: 8 }}>
        {t('step1.checksumNote')}
      </div>
    </StepCard>
  )
}
