import { useState, useMemo } from 'react'
import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { deriveChild, formatIndex } from '../../crypto/hdkey.js'
import { bytesToHex } from '../../crypto/format.js'
import StepCard from '../common/StepCard.jsx'
import TreeView from '../../tree/TreeView.jsx'

export default function Step4DerivationTree() {
  const { t } = useI18n()
  const { master } = useWallet()
  const [hardened, setHardened] = useState(false)

  // Side-by-side comparison: derive index 0 both normal and hardened from master.
  const compare = useMemo(() => {
    const normal = deriveChild(master, 0, false)
    const hard = deriveChild(master, 0, true)
    return {
      normal: { label: formatIndex(0, false), fp: bytesToHex(normal.publicKey).slice(0, 16) },
      hard: { label: formatIndex(0, true), fp: bytesToHex(hard.publicKey).slice(0, 16) },
    }
  }, [master])

  return (
    <StepCard id="step4" num={4} titleKey="step4.title" tagKey="step4.tag" descKey="step4.desc">
      <div className="row" style={{ marginBottom: 12 }}>
        <div className="seg">
          <button className={!hardened ? 'active' : ''} onClick={() => setHardened(false)}>
            {t('common.normal')} (i)
          </button>
          <button className={hardened ? 'active' : ''} onClick={() => setHardened(true)}>
            {t('common.hardened')} (i′)
          </button>
        </div>
        <span className="muted">{t('step4.hint')}</span>
      </div>

      <TreeView master={master} hardened={hardened} key={hardened} />

      {/* Normal vs hardened comparison panel */}
      <div className="compare">
        <div className="compare-title">{t('step4.compareTitle')}</div>
        <p className="step-desc" style={{ marginTop: 4 }}>
          {t('step4.compareDesc')}
        </p>
        <div className="compare-grid">
          <div className="compare-card normal">
            <div className="compare-head">
              <span className="mono">m/{compare.normal.label}</span>
              <span className="badge ok">✓ {t('step4.normalBadge')}</span>
            </div>
            <div className="mono fp">{compare.normal.fp}…</div>
          </div>
          <div className="compare-card hard">
            <div className="compare-head">
              <span className="mono">m/{compare.hard.label}</span>
              <span className="badge warn">🔒 {t('step4.hardenedBadge')}</span>
            </div>
            <div className="mono fp">{compare.hard.fp}…</div>
          </div>
        </div>
      </div>
    </StepCard>
  )
}
