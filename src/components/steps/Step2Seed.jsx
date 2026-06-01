import { useMemo } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { mnemonicToSeed } from '../../crypto/seed.js'
import { bitDiffRatio } from '../../crypto/format.js'
import StepCard from '../common/StepCard.jsx'
import HexValue from '../common/HexValue.jsx'

export default function Step2Seed() {
  const { t } = useI18n()
  const { mnemonic, passphrase, setPassphrase, seed } = useWallet()

  // Compare current seed against the seed with an empty passphrase to show how
  // a single character flips ~half the bits (avalanche effect).
  const baseSeed = useMemo(() => mnemonicToSeed(mnemonic, ''), [mnemonic])
  const diff = useMemo(() => bitDiffRatio(baseSeed, seed), [baseSeed, seed])
  const pct = Math.round(diff * 100)

  return (
    <StepCard id="step2" num={2} titleKey="step2.title" tagKey="step2.tag" descKey="step2.desc">
      <div style={{ marginBottom: 16, maxWidth: 420 }}>
        <div className="field-label">{t('step2.passphrase')}</div>
        <input
          className="text-input"
          type="text"
          value={passphrase}
          placeholder={t('step2.passphrasePlaceholder')}
          onChange={(e) => setPassphrase(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: 18, maxWidth: 420 }}>
        <div
          className="field-label"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <span>{t('step2.avalanche')}</span>
          <span style={{ fontFamily: 'var(--mono)', color: 'var(--magenta)' }}>{pct}%</span>
        </div>
        <div className="meter">
          <span style={{ width: `${pct}%` }} />
        </div>
      </div>

      <HexValue label={`${t('step2.seedLabel')} · 64 ${t('common.bytes')}`} bytes={seed} flashKey={`${mnemonic}|${passphrase}`} />
    </StepCard>
  )
}
