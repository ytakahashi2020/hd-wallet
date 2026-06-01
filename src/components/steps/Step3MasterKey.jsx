import { useI18n } from '../../i18n/I18nContext.jsx'
import { useWallet } from '../../state/WalletContext.jsx'
import { bytesToHex } from '../../crypto/format.js'
import StepCard from '../common/StepCard.jsx'
import HexValue from '../common/HexValue.jsx'

export default function Step3MasterKey() {
  const { t } = useI18n()
  const { master, seed, passphrase, mnemonic } = useWallet()
  const flashKey = `${mnemonic}|${passphrase}`

  // The HMAC-SHA512 output (64 bytes) splits into left 32 = private key and
  // right 32 = chain code. Show the whole thing, then the two halves it feeds.
  const left = bytesToHex(master.privateKey)
  const right = bytesToHex(master.chainCode)

  return (
    <StepCard id="step3" num={3} titleKey="step3.title" tagKey="step3.tag" descKey="step3.desc">
      <div className="label-line" style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>
        {t('step3.split')}
      </div>

      {/* The 64-byte HMAC output, halves colour-coded where they will go. */}
      <div className="hexbox" style={{ marginBottom: 6 }} key={`out-${flashKey}`}>
        <div className="meta">
          <span className="label">HMAC-SHA512 · 64 {t('common.bytes')}</span>
        </div>
        <div className="hex flash">
          <span className="hl-left">{left}</span>
          <span className="hl-right">{right}</span>
        </div>
      </div>

      {/* The split arrow */}
      <div className="split-arrows">
        <span className="hl-left">↙ {t('step3.leftHalf')}</span>
        <span className="hl-right">{t('step3.rightHalf')} ↘</span>
      </div>

      <div className="split-grid">
        <HexValue label={t('common.privateKey')} bytes={master.privateKey} flashKey={flashKey} />
        <HexValue label={t('common.chainCode')} bytes={master.chainCode} flashKey={flashKey} />
      </div>

      <div style={{ marginTop: 12 }}>
        <HexValue label={t('common.publicKey')} bytes={master.publicKey} dim flashKey={flashKey} />
      </div>
    </StepCard>
  )
}
